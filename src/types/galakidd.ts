export type Language = 'en' | 'ar' | 'fr';

export type StageId = 'PRE_FLIGHT' | 'IN_FLIGHT' | 'POST_FLIGHT';

export type SuitId = 'launch_entry' | 'eva_spacewalk' | 'station_flight';

export type ActivityId =
  | 'pre_suit'
  | 'pre_training'
  | 'pre_food'
  | 'pre_oxygen_water'
  | 'pre_safety'
  | 'pre_checklist'
  | 'in_sleep'
  | 'in_eat_drink'
  | 'in_exercise'
  | 'in_oxygen'
  | 'in_water'
  | 'in_waste'
  | 'in_comms'
  | 'in_earth'
  | 'in_emergency'
  | 'post_return_prep'
  | 'post_landing_prep'
  | 'post_landing_sim'
  | 'post_gravity'
  | 'post_evaluation'
  | 'post_certificate';

export interface SimulatorState {
  oxygen: number;
  water: number;
  food: number;
  energy: number;
  missionSeconds: number;
  commsActive: boolean;
  solarAngle: number;
  recyclingActive: boolean;
  electrolysisRate: number;
}

export interface QuizAnswerRecord {
  questionId: string;
  selectedIndex: number;
  attempts: number;
  correctOnFirstTry: boolean;
  completed: boolean;
}

export interface MissionProgress {
  language: Language;
  astronautName: string;
  selectedSuit: SuitId;
  completedActivities: ActivityId[];
  quizRecords: Record<string, QuizAnswerRecord>;
  unlockedStages: StageId[];
  earnedBadges: string[];
  lastActivityId: ActivityId | null;
  launchCompleted: boolean;
  missionCompleted: boolean;
  simulator: SimulatorState;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  astronautName: string;
  guardianName: string;
  email: string;
  language: Language;
  createdAt: string;
}

export type AppRoute =
  | 'welcome'
  | 'dashboard'
  | 'stage_preflight'
  | 'stage_inflight'
  | 'stage_postflight'
  | 'activity'
  | 'simulator'
  | 'nasa_resources'
  | 'badges'
  | 'settings';
