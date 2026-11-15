import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import type { AuthUser, Language, MissionProgress } from './src/types/galakidd.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'galakidd_store.json');
const COOKIE_NAME = 'galakidd_session';

interface StoredUser {
  id: string;
  astronautName: string;
  guardianName: string;
  email: string;
  passwordHash: string;
  salt: string;
  language: Language;
  guardianConsentAt: string;
  createdAt: string;
}

interface StoreData {
  sessionSecret: string;
  users: StoredUser[];
  progressByUser: Record<string, MissionProgress>;
}

function createDefaultProgress(astronautName = 'Explorer', language: Language = 'en'): MissionProgress {
  return {
    language,
    astronautName,
    selectedSuit: 'eva_spacewalk',
    completedActivities: [],
    quizRecords: {},
    unlockedStages: ['PRE_FLIGHT'],
    earnedBadges: [],
    lastActivityId: null,
    launchCompleted: false,
    missionCompleted: false,
    simulator: {
      oxygen: 96,
      water: 92,
      food: 95,
      energy: 88,
      missionSeconds: 0,
      commsActive: true,
      solarAngle: 45,
      recyclingActive: true,
      electrolysisRate: 65,
    },
    updatedAt: new Date().toISOString(),
  };
}

function loadStore(): StoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial: StoreData = {
      sessionSecret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
      users: [],
      progressByUser: {},
    };
    saveStore(initial);
    return initial;
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    return {
      sessionSecret: process.env.SESSION_SECRET || parsed.sessionSecret || crypto.randomBytes(32).toString('hex'),
      users: Array.isArray(parsed.users) ? parsed.users : [],
      progressByUser: parsed.progressByUser && typeof parsed.progressByUser === 'object' ? parsed.progressByUser : {},
    };
  } catch {
    return {
      sessionSecret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
      users: [],
      progressByUser: {},
    };
  }
}

function saveStore(data: StoreData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempPath = `${STORE_PATH}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, STORE_PATH);
}

let store: StoreData = loadStore();

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const storedBuf = Buffer.from(storedHash, 'hex');
  if (derived.length !== storedBuf.length) return false;
  return crypto.timingSafeEqual(derived, storedBuf);
}

function signSessionToken(userId: string, expiresAtMs: number): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp: expiresAtMs }), 'utf8').toString('base64url');
  const sig = crypto.createHmac('sha256', store.sessionSecret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string): string | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', store.sessionSecret).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { uid?: string; exp?: number };
    if (!parsed.uid || !parsed.exp || Date.now() > parsed.exp) {
      return null;
    }
    return parsed.uid;
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = decodeURIComponent(part.slice(idx + 1).trim());
    cookies[key] = val;
  }
  return cookies;
}

function setSessionCookie(res: Response, req: Request, token: string, rememberMe: boolean): void {
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (rememberMe) {
    parts.push(`Max-Age=${60 * 60 * 24 * 14}`);
  }
  if (isHttps) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSessionCookie(res: Response): void {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function toPublicUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    astronautName: user.astronautName,
    guardianName: user.guardianName,
    email: user.email,
    language: user.language,
    createdAt: user.createdAt,
  };
}

interface AuthedRequest extends Request {
  authUser?: StoredUser;
}

function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const userId = verifySessionToken(token);
  if (!userId) {
    clearSessionCookie(res);
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }
  const user = store.users.find((u) => u.id === userId);
  if (!user) {
    clearSessionCookie(res);
    res.status(401).json({ error: 'Account not found' });
    return;
  }
  req.authUser = user;
  next();
}

const app = express();
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Auth capability info (honest runtime capabilities)
app.get('/api/auth/capabilities', (_req, res) => {
  res.json({
    emailPassword: true,
    guestMode: true,
    googleSignIn: false,
    phoneSmsOtp: false,
    emailDeliveryConfigured: false,
  });
});

// Register parent-managed child account
app.post('/api/auth/register', (req, res) => {
  const body = req.body as {
    email?: string;
    password?: string;
    astronautName?: string;
    guardianName?: string;
    guardianConsent?: boolean;
    language?: Language;
    rememberMe?: boolean;
    initialProgress?: MissionProgress;
  };

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';
  const astronautName = (body.astronautName || '').trim().slice(0, 32);
  const guardianName = (body.guardianName || '').trim().slice(0, 48);
  const language: Language = body.language === 'ar' || body.language === 'fr' ? body.language : 'en';

  if (!body.guardianConsent) {
    res.status(400).json({ error: 'GUARDIAN_CONSENT_REQUIRED' });
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'INVALID_EMAIL' });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: 'PASSWORD_TOO_SHORT' });
    return;
  }
  if (!astronautName || !guardianName) {
    res.status(400).json({ error: 'NAMES_REQUIRED' });
    return;
  }
  if (store.users.some((u) => u.email === email)) {
    res.status(409).json({ error: 'EMAIL_EXISTS' });
    return;
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const now = new Date().toISOString();
  const user: StoredUser = {
    id: crypto.randomUUID(),
    astronautName,
    guardianName,
    email,
    passwordHash,
    salt,
    language,
    guardianConsentAt: now,
    createdAt: now,
  };

  const progress = body.initialProgress
    ? {
        ...createDefaultProgress(astronautName, language),
        ...body.initialProgress,
        astronautName,
        language,
        updatedAt: now,
      }
    : createDefaultProgress(astronautName, language);

  store.users.push(user);
  store.progressByUser[user.id] = progress;
  saveStore(store);

  const rememberMe = body.rememberMe !== false;
  const expiresAt = Date.now() + (rememberMe ? 14 : 1) * 24 * 60 * 60 * 1000;
  const token = signSessionToken(user.id, expiresAt);
  setSessionCookie(res, req, token, rememberMe);

  res.status(201).json({
    user: toPublicUser(user),
    progress,
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const body = req.body as { email?: string; password?: string; rememberMe?: boolean };
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  const user = store.users.find((u) => u.email === email);
  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    return;
  }

  const rememberMe = body.rememberMe !== false;
  const expiresAt = Date.now() + (rememberMe ? 14 : 1) * 24 * 60 * 60 * 1000;
  const token = signSessionToken(user.id, expiresAt);
  setSessionCookie(res, req, token, rememberMe);

  const progress = store.progressByUser[user.id] || createDefaultProgress(user.astronautName, user.language);
  res.json({
    user: toPublicUser(user),
    progress,
  });
});

// Logout
app.post('/api/auth/logout', (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

// Current session user
app.get('/api/auth/me', (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[COOKIE_NAME];
  if (!token) {
    res.json({ user: null, progress: null });
    return;
  }
  const userId = verifySessionToken(token);
  if (!userId) {
    clearSessionCookie(res);
    res.json({ user: null, progress: null });
    return;
  }
  const user = store.users.find((u) => u.id === userId);
  if (!user) {
    clearSessionCookie(res);
    res.json({ user: null, progress: null });
    return;
  }
  const progress = store.progressByUser[user.id] || createDefaultProgress(user.astronautName, user.language);
  res.json({ user: toPublicUser(user), progress });
});

// Change password when signed in (parent-managed security)
app.post('/api/auth/change-password', requireAuth, (req: AuthedRequest, res) => {
  const user = req.authUser!;
  const body = req.body as { currentPassword?: string; newPassword?: string };
  if (!body.currentPassword || !verifyPassword(body.currentPassword, user.salt, user.passwordHash)) {
    res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    return;
  }
  if (!body.newPassword || body.newPassword.length < 8) {
    res.status(400).json({ error: 'PASSWORD_TOO_SHORT' });
    return;
  }
  const newSalt = crypto.randomBytes(16).toString('hex');
  user.salt = newSalt;
  user.passwordHash = hashPassword(body.newPassword, newSalt);
  saveStore(store);
  res.json({ ok: true });
});

// Update profile (astronaut callsign / language)
app.patch('/api/auth/profile', requireAuth, (req: AuthedRequest, res) => {
  const user = req.authUser!;
  const body = req.body as { astronautName?: string; language?: Language };
  if (typeof body.astronautName === 'string' && body.astronautName.trim()) {
    user.astronautName = body.astronautName.trim().slice(0, 32);
  }
  if (body.language === 'en' || body.language === 'ar' || body.language === 'fr') {
    user.language = body.language;
  }
  if (store.progressByUser[user.id]) {
    store.progressByUser[user.id].astronautName = user.astronautName;
    store.progressByUser[user.id].language = user.language;
  }
  saveStore(store);
  res.json({ user: toPublicUser(user) });
});

// Sync mission progress for registered user
app.get('/api/progress', requireAuth, (req: AuthedRequest, res) => {
  const user = req.authUser!;
  const progress = store.progressByUser[user.id] || createDefaultProgress(user.astronautName, user.language);
  res.json({ progress });
});

app.put('/api/progress', requireAuth, (req: AuthedRequest, res) => {
  const user = req.authUser!;
  const incoming = req.body?.progress as Partial<MissionProgress> | undefined;
  if (!incoming || typeof incoming !== 'object') {
    res.status(400).json({ error: 'INVALID_PROGRESS' });
    return;
  }
  const existing = store.progressByUser[user.id] || createDefaultProgress(user.astronautName, user.language);
  const merged: MissionProgress = {
    ...existing,
    ...incoming,
    astronautName: (incoming.astronautName || existing.astronautName).slice(0, 32),
    updatedAt: new Date().toISOString(),
  };
  user.language = merged.language;
  user.astronautName = merged.astronautName;
  store.progressByUser[user.id] = merged;
  saveStore(store);
  res.json({ progress: merged });
});

// Verified NASA educational reference telemetry & open educational facts
app.get('/api/nasa/education', (_req, res) => {
  res.json({
    issReferenceSpecs: {
      averageAltitudeKm: 408,
      orbitalSpeedKmPerSec: 7.66,
      orbitalPeriodMinutes: 92.9,
      sunrisesPerDay: 16,
      waterRecoveryTargetPercent: 98,
      source: 'NASA International Space Station Facts & Figures',
      sourceUrl: 'https://www.nasa.gov/international-space-station/facts-and-figures/',
    },
    sources: [
      {
        id: 'nasa_stem',
        name: 'NASA STEM Engagement',
        url: 'https://www.nasa.gov/learning-resources/',
      },
      {
        id: 'nasa_space_place',
        name: 'NASA Space Place',
        url: 'https://spaceplace.nasa.gov/',
      },
      {
        id: 'nasa_iss',
        name: 'NASA International Space Station',
        url: 'https://www.nasa.gov/international-space-station/',
      },
      {
        id: 'nasa_earth_obs',
        name: 'NASA Earth Observatory',
        url: 'https://earthobservatory.nasa.gov/',
      },
    ],
  });
});

async function startServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GalaKidd server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
