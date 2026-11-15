import type { Language } from '../types/galakidd';

export interface Translations {
  brandName: string;
  tagline: string;
  languageLabel: string;
  soundOn: string;
  soundMuted: string;
  languages: Record<Language, string>;
  nav: {
    dashboard: string;
    simulator: string;
    nasa: string;
    badges: string;
    settings: string;
    signOut: string;
    signIn: string;
  };
  welcome: {
    badgeText: string;
    heroTitle: string;
    heroSubtitle: string;
    signUp: string;
    signIn: string;
    continueGuest: string;
    childSafetyTitle: string;
    childSafetyBody: string;
    previewLabel: string;
    stagesPreview: {
      pre: string;
      in: string;
      post: string;
    };
  };
  auth: {
    signUpTitle: string;
    signInTitle: string;
    astronautName: string;
    astronautPlaceholder: string;
    guardianName: string;
    guardianPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    rememberMe: string;
    guardianConsent: string;
    privacyNote: string;
    submitSignUp: string;
    submitSignIn: string;
    switchToSignIn: string;
    switchToSignUp: string;
    backToWelcome: string;
    forgotPasswordLink: string;
    forgotPasswordTitle: string;
    forgotPasswordBody: string;
    externalAuthNote: string;
    errors: {
      GUARDIAN_CONSENT_REQUIRED: string;
      INVALID_EMAIL: string;
      PASSWORD_TOO_SHORT: string;
      NAMES_REQUIRED: string;
      EMAIL_EXISTS: string;
      INVALID_CREDENTIALS: string;
      NETWORK_ERROR: string;
    };
  };
  dashboard: {
    welcomeBack: string;
    guestBadge: string;
    accountBadge: string;
    currentMission: string;
    missionProgress: string;
    completedActivities: string;
    quizScore: string;
    badgesEarned: string;
    continueMission: string;
    resumeActivity: string;
    exploreSpace: string;
    upgradeGuestTitle: string;
    upgradeGuestBody: string;
    createAccountBtn: string;
    galaxyMapTitle: string;
    galaxyMapSubtitle: string;
    stageLocked: string;
    stageUnlocked: string;
    stageCompleted: string;
    openStage: string;
    completePreviousTip: string;
    stages: {
      PRE_FLIGHT: { title: string; subtitle: string; desc: string };
      IN_FLIGHT: { title: string; subtitle: string; desc: string };
      POST_FLIGHT: { title: string; subtitle: string; desc: string };
    };
  };
  activityView: {
    backToStage: string;
    completedLabel: string;
    inProgressLabel: string;
    stepSimulation: string;
    stepQuiz: string;
    markComplete: string;
    nextActivity: string;
    simulationNotice: string;
    nasaSourceLabel: string;
    novaSays: string;
    checklistUnlockedLaunch: string;
    launchRocketBtn: string;
  };
  quiz: {
    title: string;
    questionOf: string;
    selectAnswer: string;
    checkAnswer: string;
    tryAgain: string;
    nextQuestion: string;
    finishQuiz: string;
    correctTitle: string;
    incorrectTitle: string;
    whyCorrect: string;
    whyIncorrect: string;
    scienceConcept: string;
    quizCompleteTitle: string;
    quizScoreSummary: string;
    firstTryAccuracy: string;
    finalQuizTitle: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    disclaimer: string;
    dashboardHeading: string;
    oxygen: string;
    water: string;
    food: string;
    energy: string;
    missionTime: string;
    commsLink: string;
    commsNominal: string;
    commsDelayed: string;
    controlsHeading: string;
    solarAngle: string;
    electrolysisRate: string;
    waterRecycling: string;
    active: string;
    paused: string;
    resetSim: string;
    microgravityTitle: string;
    microgravitySubtitle: string;
    dropObjects: string;
    gravityEnv: {
      earth: string;
      moon: string;
      iss: string;
    };
    objects: {
      feather: string;
      waterDrop: string;
      wrench: string;
    };
    stationMapTitle: string;
    stationMapSubtitle: string;
    statusNominal: string;
    statusLow: string;
  };
  badges: {
    title: string;
    subtitle: string;
    earned: string;
    locked: string;
    certificateTitle: string;
    certificateSubtitle: string;
    printCertificate: string;
  };
  settings: {
    title: string;
    profileSection: string;
    astronautCallsign: string;
    guardianEmail: string;
    saveProfile: string;
    profileSaved: string;
    languageSection: string;
    securitySection: string;
    currentPassword: string;
    newPassword: string;
    updatePassword: string;
    passwordUpdated: string;
    progressSection: string;
    resetProgress: string;
    resetConfirm: string;
    confirmResetBtn: string;
    cancelBtn: string;
    syncStatusLocal: string;
    syncStatusCloud: string;
  };
  adSlot: {
    label: string;
    notice: string;
  };
  novaGuide: {
    name: string;
    role: string;
    minimize: string;
    expand: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    brandName: 'GalaKidd',
    tagline: 'Interactive Astronaut Life Simulator',
    languageLabel: 'Language',
    soundOn: 'Sound On',
    soundMuted: 'Muted',
    languages: { en: 'English', ar: 'العربية', fr: 'Français' },
    nav: {
      dashboard: 'Mission Map',
      simulator: 'Space Simulator',
      nasa: 'NASA Science',
      badges: 'Badges & Awards',
      settings: 'Settings',
      signOut: 'Sign Out',
      signIn: 'Sign In',
    },
    welcome: {
      badgeText: 'Ages 7–12 Educational Space Program',
      heroTitle: 'Train, live in orbit, and return home like a real astronaut.',
      heroSubtitle:
        'Step inside an interactive astronaut simulator. Prepare your spacesuit, run life-support systems aboard the orbital station, and pilot your capsule safely back to Earth.',
      signUp: 'Create Parent-Managed Account',
      signIn: 'Sign In',
      continueGuest: 'Continue as Guest',
      childSafetyTitle: 'Built for Young Explorers & Parent Peace of Mind',
      childSafetyBody:
        'Guest explorers can complete every mission right away with progress saved on this device. Creating an account requires parent or guardian consent and collects only a nickname and parent email—no addresses or unnecessary personal data.',
      previewLabel: 'Three-Stage Astronaut Journey',
      stagesPreview: {
        pre: 'Pre-Flight Training',
        in: 'In-Flight Station Life',
        post: 'Post-Flight Return',
      },
    },
    auth: {
      signUpTitle: 'Create Young Explorer Account',
      signInTitle: 'Sign In to Mission Control',
      astronautName: 'Astronaut Nickname (Callsign)',
      astronautPlaceholder: 'e.g. Captain Leo',
      guardianName: 'Parent or Guardian Name',
      guardianPlaceholder: 'e.g. Sarah Miller',
      email: 'Parent or Guardian Email',
      emailPlaceholder: 'parent@example.com',
      password: 'Password (min. 8 characters)',
      passwordPlaceholder: 'Create a strong password',
      rememberMe: 'Keep me signed in on this device',
      guardianConsent:
        'I am the parent or legal guardian and give permission to create this educational account and sync mission progress.',
      privacyNote:
        'We never ask for a child’s home address, phone number, or birth date. Progress syncs securely to your account.',
      submitSignUp: 'Create Account & Launch',
      submitSignIn: 'Sign In',
      switchToSignIn: 'Already have an account? Sign In',
      switchToSignUp: 'Need a parent-managed account? Sign Up',
      backToWelcome: 'Back to Welcome',
      forgotPasswordLink: 'Forgot password?',
      forgotPasswordTitle: 'Account Password Recovery',
      forgotPasswordBody:
        'Because this standalone environment does not send external emails automatically, a signed-in parent can update the password inside Settings. If you are locked out, you can continue in Guest mode or create a new parent-managed account.',
      externalAuthNote:
        'Note: Email & password accounts and Guest local saving are active. External Google Sign-In and SMS codes are disabled because external identity services were not enabled.',
      errors: {
        GUARDIAN_CONSENT_REQUIRED: 'Parent or guardian consent is required before creating an account.',
        INVALID_EMAIL: 'Please enter a valid parent or guardian email address.',
        PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
        NAMES_REQUIRED: 'Please enter both an astronaut nickname and a parent/guardian name.',
        EMAIL_EXISTS: 'An account with this email already exists. Try signing in instead.',
        INVALID_CREDENTIALS: 'Incorrect email or password. Please check and try again.',
        NETWORK_ERROR: 'Connection issue while contacting Mission Control. Please try again.',
      },
    },
    dashboard: {
      welcomeBack: 'Welcome aboard, Astronaut',
      guestBadge: 'Guest Explorer (Saved Locally)',
      accountBadge: 'Cloud Synced Account',
      currentMission: 'Current Stage',
      missionProgress: 'Overall Mission Progress',
      completedActivities: 'Activities Completed',
      quizScore: 'Quiz Mastery Score',
      badgesEarned: 'Mission Badges',
      continueMission: 'Continue Mission',
      resumeActivity: 'Resume Where You Left Off',
      exploreSpace: 'Open Space Simulator',
      upgradeGuestTitle: 'Save Your Progress Across Devices',
      upgradeGuestBody:
        'You are exploring as a Guest! Ask a parent or guardian to create a free account anytime to sync your badges and scores across devices.',
      createAccountBtn: 'Save to Account',
      galaxyMapTitle: 'Interactive Galaxy Mission Map',
      galaxyMapSubtitle: 'Complete each mission stage to unlock the next chapter of your spaceflight.',
      stageLocked: 'Locked',
      stageUnlocked: 'Unlocked',
      stageCompleted: 'Stage Complete',
      openStage: 'Enter Stage',
      completePreviousTip: 'Complete all activities in the previous stage to unlock.',
      stages: {
        PRE_FLIGHT: {
          title: 'Stage 1: Pre-Flight',
          subtitle: 'Astronaut Training & Launch Prep',
          desc: 'Select your EVA suit, build orbital fitness, pack space nutrition, verify oxygen/water tanks, and pass the launch checklist.',
        },
        IN_FLIGHT: {
          title: 'Stage 2: In-Flight',
          subtitle: 'Living Aboard the Space Station',
          desc: 'Sleep in microgravity, recycle water, manage oxygen & waste, exercise, observe Earth, and handle training alerts.',
        },
        POST_FLIGHT: {
          title: 'Stage 3: Post-Flight',
          subtitle: 'Re-Entry, Recovery & Certification',
          desc: 'Prepare for undocking, pilot atmospheric re-entry, readjust to 1g gravity, complete medical debrief, and earn your Astronaut Certificate.',
        },
      },
    },
    activityView: {
      backToStage: 'Back to Stage Overview',
      completedLabel: 'Completed',
      inProgressLabel: 'Interactive Mission',
      stepSimulation: '1. Interactive Training',
      stepQuiz: '2. Science Check',
      markComplete: 'Complete Activity',
      nextActivity: 'Next Activity',
      simulationNotice: 'Educational Simulation — Simplified model based on NASA astronaut training concepts.',
      nasaSourceLabel: 'NASA Scientific Reference',
      novaSays: 'Commander Nova Tip',
      checklistUnlockedLaunch: 'All pre-flight checks verified! Your spacecraft is ready for liftoff.',
      launchRocketBtn: 'Launch to Orbit',
    },
    quiz: {
      title: 'Mission Science Check',
      questionOf: 'Question',
      selectAnswer: 'Choose the best scientific answer:',
      checkAnswer: 'Submit Answer',
      tryAgain: 'Try Again',
      nextQuestion: 'Next Question',
      finishQuiz: 'Complete Science Check',
      correctTitle: 'Great Scientific Thinking!',
      incorrectTitle: 'Not Quite — Let’s Explore Why!',
      whyCorrect: 'Why this is right:',
      whyIncorrect: 'Why this choice doesn’t work:',
      scienceConcept: 'Space Science Principle:',
      quizCompleteTitle: 'Science Check Passed!',
      quizScoreSummary: 'Questions Answered Correctly',
      firstTryAccuracy: 'First-Try Accuracy',
      finalQuizTitle: 'Final Comprehensive Astronaut Exam',
    },
    simulator: {
      title: 'Interactive Spacecraft Command Simulator',
      subtitle: 'Experiment with life-support resources, microgravity physics, and space station modules.',
      disclaimer: 'Educational Simulation Only — Simplified learning model, not actual spacecraft flight telemetry.',
      dashboardHeading: 'Spacecraft Life-Support Console',
      oxygen: 'Cabin Oxygen (O₂)',
      water: 'Potable Water',
      food: 'Crew Food Rations',
      energy: 'Solar & Battery Power',
      missionTime: 'Simulation Elapsed Time',
      commsLink: 'Mission Control Link',
      commsNominal: 'Connected',
      commsDelayed: 'Orbital Pass Delay',
      controlsHeading: 'Interactive Resource Controls',
      solarAngle: 'Solar Array Tracking Angle',
      electrolysisRate: 'Oxygen Electrolysis Rate',
      waterRecycling: 'Water Recovery Loop',
      active: 'Active',
      paused: 'Paused',
      resetSim: 'Reset Simulation',
      microgravityTitle: 'Microgravity Physics Lab',
      microgravitySubtitle: 'Compare how objects fall or float in Earth gravity (1.0g), Moon gravity (0.16g), and Orbit (0g).',
      dropObjects: 'Release Objects',
      gravityEnv: {
        earth: 'Earth (1.0g)',
        moon: 'Moon (0.16g)',
        iss: 'ISS Orbit (0g Microgravity)',
      },
      objects: {
        feather: 'Feather',
        waterDrop: 'Water Sphere',
        wrench: 'Steel Wrench',
      },
      stationMapTitle: 'Interactive Space Station Explorer',
      stationMapSubtitle: 'Click any module to inspect how astronauts live and work inside.',
      statusNominal: 'Nominal',
      statusLow: 'Low — Adjust Controls',
    },
    badges: {
      title: 'Mission Badges & Astronaut Certificate',
      subtitle: 'Track every achievement earned across your training, orbital flight, and Earth return.',
      earned: 'Earned',
      locked: 'Locked',
      certificateTitle: 'Official GalaKidd Junior Astronaut Certificate',
      certificateSubtitle: 'Complete all three stages to unlock your printable astronaut certificate.',
      printCertificate: 'Print Certificate',
    },
    settings: {
      title: 'Mission Settings & Account',
      profileSection: 'Astronaut Profile',
      astronautCallsign: 'Astronaut Nickname',
      guardianEmail: 'Parent/Guardian Email',
      saveProfile: 'Save Profile',
      profileSaved: 'Profile updated!',
      languageSection: 'Language & Layout (EN / AR / FR)',
      securitySection: 'Parent Account Security',
      currentPassword: 'Current Password',
      newPassword: 'New Password (min. 8 characters)',
      updatePassword: 'Update Password',
      passwordUpdated: 'Password updated successfully!',
      progressSection: 'Mission Progress Data',
      resetProgress: 'Reset All Mission Progress',
      resetConfirm: 'Are you sure you want to reset your completed activities, quiz scores, and badges?',
      confirmResetBtn: 'Yes, Reset Mission',
      cancelBtn: 'Cancel',
      syncStatusLocal: 'Saving locally on this browser (Guest mode)',
      syncStatusCloud: 'Synced securely to your parent-managed GalaKidd account',
    },
    adSlot: {
      label: 'Optional Sponsor Space (Child-Safe)',
      notice:
        'Reserved banner zone for future COPPA/GDPR-K compliant educational partners. GalaKidd never shows ads during missions, quizzes, or learning activities.',
    },
    novaGuide: {
      name: 'Commander Nova',
      role: 'Your Astronaut Guide',
      minimize: 'Hide Guide',
      expand: 'Ask Nova',
    },
  },
  ar: {
    brandName: 'جالا كيد',
    tagline: 'محاكي حياة رواد الفضاء التفاعلي',
    languageLabel: 'اللغة',
    soundOn: 'الصوت مفعل',
    soundMuted: 'صامت',
    languages: { en: 'English', ar: 'العربية', fr: 'Français' },
    nav: {
      dashboard: 'خريطة المهمة',
      simulator: 'محاكي الفضاء',
      nasa: 'علوم ناسا',
      badges: 'الأوسمة والشهادة',
      settings: 'الإعدادات',
      signOut: 'تسجيل الخروج',
      signIn: 'تسجيل الدخول',
    },
    welcome: {
      badgeText: 'برنامج تعليمي للفضاء للأعمار ٧–١٢ سنة',
      heroTitle: 'تدرّب، وعِش في المدار، وعُد إلى الأرض كرائد فضاء حقيقي.',
      heroSubtitle:
        'ادخل إلى محاكي رواد الفضاء التفاعلي. جهّز بدلتك الفضائية، وأدِر أنظمة دعم الحياة على متن المحطة المدارية، وقُد كبسولتك بأمان نحو الأرض.',
      signUp: 'إنشاء حساب بإشراف ولي الأمر',
      signIn: 'تسجيل الدخول',
      continueGuest: 'المتابعة كضيف',
      childSafetyTitle: 'مصمم للمستكشفين الصغار وراحة بال الأهل',
      childSafetyBody:
        'يمكن للضيوف تجربة جميع المهام فوراً مع حفظ التقدم على هذا الجهاز. يتطلب إنشاء الحساب موافقة ولي الأمر ولا يجمع سوى اللقب وبريد ولي الأمر دون أي بيانات شخصية غير ضرورية.',
      previewLabel: 'رحلة رائد الفضاء من ثلاث مراحل',
      stagesPreview: {
        pre: 'ما قبل الإطلاق',
        in: 'الحياة في المدار',
        post: 'العودة إلى الأرض',
      },
    },
    auth: {
      signUpTitle: 'إنشاء حساب مستكشف الفضاء',
      signInTitle: 'تسجيل الدخول إلى مركز التحكم',
      astronautName: 'لقب رائد الفضاء',
      astronautPlaceholder: 'مثال: القائد كريم',
      guardianName: 'اسم ولي الأمر',
      guardianPlaceholder: 'مثال: سارة أحمد',
      email: 'البريد الإلكتروني لولي الأمر',
      emailPlaceholder: 'parent@example.com',
      password: 'كلمة المرور (٨ أحرف على الأقل)',
      passwordPlaceholder: 'أنشئ كلمة مرور قوية',
      rememberMe: 'ابقَ مسجلاً على هذا الجهاز',
      guardianConsent:
        'أنا ولي الأمر القانوني وأوافق على إنشاء هذا الحساب التعليمي ومزامنة تقدم المهمة.',
      privacyNote:
        'نحن لا نطلب أبداً عنوان المنزل أو رقم الهاتف أو تاريخ الميلاد للطفل. يتم حفظ التقدم بأمان.',
      submitSignUp: 'إنشاء الحساب والانطلاق',
      submitSignIn: 'تسجيل الدخول',
      switchToSignIn: 'هل لديك حساب بالفعل؟ سجل الدخول',
      switchToSignUp: 'تحتاج إلى حساب بإشراف ولي الأمر؟ أنشئ حساباً',
      backToWelcome: 'العودة إلى الترحيب',
      forgotPasswordLink: 'نسيت كلمة المرور؟',
      forgotPasswordTitle: 'استعادة كلمة مرور الحساب',
      forgotPasswordBody:
        'نظراً لأن هذه البيئة المستقلة لا ترسل رسائل بريد إلكتروني تلقائياً، يمكن لولي الأمر تحديث كلمة المرور من الإعدادات بعد تسجيل الدخول، أو المتابعة كضيف أو إنشاء حساب جديد.',
      externalAuthNote:
        'ملاحظة: تسجيل البريد وكلمة المرور ووضع الضيف يعملان بشكل فعلي. تم تعطيل دخول جوجل ورسائل SMS لعدم تفعيل مزود هوية خارجي.',
      errors: {
        GUARDIAN_CONSENT_REQUIRED: 'موافقة ولي الأمر مطلوبة قبل إنشاء الحساب.',
        INVALID_EMAIL: 'يرجى إدخال بريد إلكتروني صحيح لولي الأمر.',
        PASSWORD_TOO_SHORT: 'يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل.',
        NAMES_REQUIRED: 'يرجى إدخال لقب رائد الفضاء واسم ولي الأمر.',
        EMAIL_EXISTS: 'يوجد حساب مسجل بهذا البريد بالفعل. جرّب تسجيل الدخول.',
        INVALID_CREDENTIALS: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
        NETWORK_ERROR: 'تعذر الاتصال بمركز التحكم. يرجى المحاولة مرة أخرى.',
      },
    },
    dashboard: {
      welcomeBack: 'أهلاً بك على متن المركبة يا رائد الفضاء',
      guestBadge: 'مستكشف ضيف (محفوظ محلياً)',
      accountBadge: 'حساب متزامن سحابياً',
      currentMission: 'المرحلة الحالية',
      missionProgress: 'تقدم المهمة الكلي',
      completedActivities: 'الأنشطة المكتملة',
      quizScore: 'نتيجة الاختبارات',
      badgesEarned: 'أوسمة المهمة',
      continueMission: 'مواصلة المهمة',
      resumeActivity: 'استئناف من حيث توقفت',
      exploreSpace: 'فتح محاكي الفضاء',
      upgradeGuestTitle: 'احفظ تقدمك عبر الأجهزة',
      upgradeGuestBody:
        'أنت تستكشف الآن كضيف! اطلب من ولي أمرك إنشاء حساب مجاني لحفظ أوسمتك ونتائجك ومزامنتها في أي وقت.',
      createAccountBtn: 'حفظ في حساب',
      galaxyMapTitle: 'خريطة المجرة التفاعلية للمهمة',
      galaxyMapSubtitle: 'أكمل كل مرحلة لفتح الفصل التالي من رحلتك الفضائية.',
      stageLocked: 'مقفلة',
      stageUnlocked: 'متاحة',
      stageCompleted: 'المرحلة مكتملة',
      openStage: 'ابدأ المرحلة',
      completePreviousTip: 'أكمل جميع أنشطة المرحلة السابقة لفتح هذه المرحلة.',
      stages: {
        PRE_FLIGHT: {
          title: 'المرحلة ١: ما قبل الإطلاق',
          subtitle: 'تدريب رائد الفضاء والاستعداد',
          desc: 'اختر بدلة الفضاء، وتدرّب بدنياً، وحضّر طعام الفضاء، وافحص خزانات الأكسجين والماء، وأكمل قائمة الإطلاق.',
        },
        IN_FLIGHT: {
          title: 'المرحلة ٢: أثناء الرحلة',
          subtitle: 'الحياة اليومية على محطة الفضاء',
          desc: 'نم في انعدام الجاذبية، وأعد تدوير المياه، وراقب الأكسجين، وتمرّن رياضياً، وراقب الأرض، وتدرّب على الطوارئ.',
        },
        POST_FLIGHT: {
          title: 'المرحلة ٣: ما بعد الرحلة',
          subtitle: 'العودة إلى الأرض والتقييم',
          desc: 'استعد للانفصال، وقُد هبوط العودة عبر الغلاف الجوي، وتكيّف مع جاذبية الأرض، واحصل على شهادة رائد الفضاء.',
        },
      },
    },
    activityView: {
      backToStage: 'العودة إلى المرحلة',
      completedLabel: 'مكتمل',
      inProgressLabel: 'نشاط تفاعلي',
      stepSimulation: '١. المحاكاة التفاعلية',
      stepQuiz: '٢. التحقق العلمي',
      markComplete: 'إتمام النشاط',
      nextActivity: 'النشاط التالي',
      simulationNotice: 'محاكاة تعليمية — نموذج مبسط مبني على مفاهيم تدريب ناسا لرواد الفضاء.',
      nasaSourceLabel: 'مرجع ناسا العلمي',
      novaSays: 'نصيحة القائدة نوفا',
      checklistUnlockedLaunch: 'تم التحقق من جميع الفحوصات! المركبة جاهزة للإطلاق إلى المدار.',
      launchRocketBtn: 'إطلاق الصاروخ إلى المدار',
    },
    quiz: {
      title: 'اختبار الفهم العلمي',
      questionOf: 'السؤال',
      selectAnswer: 'اختر الإجابة العلمية الصحيحة:',
      checkAnswer: 'تحقق من الإجابة',
      tryAgain: 'حاول مرة أخرى',
      nextQuestion: 'السؤال التالي',
      finishQuiz: 'إنهاء الاختبار العلمي',
      correctTitle: 'تفكير علمي رائع!',
      incorrectTitle: 'ليست دقيقة بعد — لنكتشف السبب!',
      whyCorrect: 'لماذا هذه الإجابة صحيحة:',
      whyIncorrect: 'لماذا لا ينجح هذا الاختيار:',
      scienceConcept: 'المبدأ العلمي الفضائي:',
      quizCompleteTitle: 'تم اجتياز الاختبار العلمي!',
      quizScoreSummary: 'الإجابات الصحيحة',
      firstTryAccuracy: 'الدقة من المحاولة الأولى',
      finalQuizTitle: 'الاختبار الشامل النهائي لرائد الفضاء',
    },
    simulator: {
      title: 'محاكي قيادة المركبة الفضائية التفاعلي',
      subtitle: 'جرّب إدارة موارد دعم الحياة، وفيزياء الجاذبية الصغرى، واستكشاف وحدات المحطة.',
      disclaimer: 'محاكاة تعليمية فقط — نموذج تدريبي مبسط وليس بيانات رحلة فضائية حقيقية.',
      dashboardHeading: 'لوحة دعم الحياة في المركبة',
      oxygen: 'الأكسجين (O₂)',
      water: 'المياه الصالحة للشرب',
      food: 'مؤونة الطعام',
      energy: 'الطاقة الشمسية والبطاريات',
      missionTime: 'زمن المحاكاة المنقضي',
      commsLink: 'اتصال مركز التحكم',
      commsNominal: 'متصل',
      commsDelayed: 'تأخير مداري',
      controlsHeading: 'أدوات التحكم التفاعلية بالموارد',
      solarAngle: 'زاوية الألواح الشمسية',
      electrolysisRate: 'معدل تحليل الماء لإنتاج الأكسجين',
      waterRecycling: 'حلقة إعادة تدوير المياه',
      active: 'نشط',
      paused: 'متوقف مؤقتاً',
      resetSim: 'إعادة ضبط المحاكي',
      microgravityTitle: 'مختبر فيزياء الجاذبية الصغرى',
      microgravitySubtitle: 'قارن سقوط الأجسام أو طفوها على الأرض (1.0g) والقمر (0.16g) وفي المدار (0g).',
      dropObjects: 'إفلات الأجسام',
      gravityEnv: {
        earth: 'الأرض (1.0g)',
        moon: 'القمر (0.16g)',
        iss: 'مدار المحطة (0g)',
      },
      objects: {
        feather: 'ريشة',
        waterDrop: 'قطرة ماء',
        wrench: 'مفتاح فولاذي',
      },
      stationMapTitle: 'مستكشف محطة الفضاء التفاعلي',
      stationMapSubtitle: 'اضغط على أي وحدة للتعرف على كيفية عملها وحياة الرواد داخلها.',
      statusNominal: 'مستقر',
      statusLow: 'منخفض — اضبط الموارد',
    },
    badges: {
      title: 'أوسمة المهمة وشهادة رائد الفضاء',
      subtitle: 'تابع جميع الإنجازات التي حققتها خلال التدريب والرحلة المدارية والعودة للأرض.',
      earned: 'مكتسب',
      locked: 'مقفل',
      certificateTitle: 'شهادة رائد الفضاء الصغير الرسمية من جالا كيد',
      certificateSubtitle: 'أكمل المراحل الثلاث لفتح شهادتك القابلة للطباعة.',
      printCertificate: 'طباعة الشهادة',
    },
    settings: {
      title: 'إعدادات المهمة والحساب',
      profileSection: 'ملف رائد الفضاء',
      astronautCallsign: 'لقب رائد الفضاء',
      guardianEmail: 'بريد ولي الأمر',
      saveProfile: 'حفظ الملف',
      profileSaved: 'تم تحديث الملف!',
      languageSection: 'اللغة والاتجاه (EN / AR / FR)',
      securitySection: 'أمان حساب ولي الأمر',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة (٨ أحرف على الأقل)',
      updatePassword: 'تحديث كلمة المرور',
      passwordUpdated: 'تم تحديث كلمة المرور بنجاح!',
      progressSection: 'بيانات تقدم المهمة',
      resetProgress: 'إعادة ضبط جميع المهام',
      resetConfirm: 'هل أنت متأكد من رغبتك في مسح الأنشطة المكتملة ونتائج الاختبارات والأوسمة؟',
      confirmResetBtn: 'نعم، أعد الضبط',
      cancelBtn: 'إلغاء',
      syncStatusLocal: 'يتم الحفظ محلياً على هذا المتصفح (وضع الضيف)',
      syncStatusCloud: 'متزامن بأمان مع حساب ولي الأمر في جالا كيد',
    },
    adSlot: {
      label: 'مساحة راعٍ تعليمي اختيارية (آمنة للأطفال)',
      notice:
        'منطقة مخصصة لشركاء تعليميين متوافقين مع معايير سلامة الأطفال. لا تعرض جالا كيد أي إعلانات أثناء المهام أو الاختبارات.',
    },
    novaGuide: {
      name: 'القائدة نوفا',
      role: 'مرشدتك الفضائية',
      minimize: 'إخفاء المرشدة',
      expand: 'اسأل نوفا',
    },
  },
  fr: {
    brandName: 'GalaKidd',
    tagline: 'Simulateur Interactif de Vie d’Astronaute',
    languageLabel: 'Langue',
    soundOn: 'Son activé',
    soundMuted: 'Muet',
    languages: { en: 'English', ar: 'العربية', fr: 'Français' },
    nav: {
      dashboard: 'Carte de Mission',
      simulator: 'Simulateur Spatial',
      nasa: 'Sciences NASA',
      badges: 'Badges & Diplôme',
      settings: 'Paramètres',
      signOut: 'Déconnexion',
      signIn: 'Connexion',
    },
    welcome: {
      badgeText: 'Programme Spatial Éducatif 7–12 ans',
      heroTitle: 'Entraîne-toi, vis en orbite et reviens sur Terre comme un vrai astronaute.',
      heroSubtitle:
        'Explore un simulateur spatial interactif. Choisis ton scaphandre, gère les systèmes de survie de la station orbitale et pilote ta capsule jusqu’à l’amerrissage.',
      signUp: 'Créer un compte géré par un parent',
      signIn: 'Se connecter',
      continueGuest: 'Continuer en mode Invité',
      childSafetyTitle: 'Conçu pour la sécurité des enfants et la tranquillité des parents',
      childSafetyBody:
        'Les explorateurs invités peuvent faire toutes les missions sans inscription (sauvegarde locale). La création de compte demande l’accord d’un parent et ne collecte qu’un surnom et l’e-mail parental.',
      previewLabel: 'Un voyage spatial en trois étapes',
      stagesPreview: {
        pre: 'Pré-vol',
        in: 'Vie en orbite',
        post: 'Retour sur Terre',
      },
    },
    auth: {
      signUpTitle: 'Créer un compte Jeune Explorateur',
      signInTitle: 'Connexion au Centre de Contrôle',
      astronautName: 'Surnom d’astronaute',
      astronautPlaceholder: 'ex. Capitaine Léo',
      guardianName: 'Nom du parent ou tuteur',
      guardianPlaceholder: 'ex. Claire Martin',
      email: 'E-mail du parent ou tuteur',
      emailPlaceholder: 'parent@exemple.fr',
      password: 'Mot de passe (min. 8 caractères)',
      passwordPlaceholder: 'Choisissez un mot de passe sûr',
      rememberMe: 'Rester connecté sur cet appareil',
      guardianConsent:
        'Je suis le parent ou tuteur légal et j’autorise la création de ce compte éducatif et la synchronisation de la progression.',
      privacyNote:
        'Nous ne demandons jamais l’adresse postale, le téléphone ou la date de naissance de l’enfant.',
      submitSignUp: 'Créer le compte et décoller',
      submitSignIn: 'Se connecter',
      switchToSignIn: 'Déjà un compte ? Se connecter',
      switchToSignUp: 'Besoin d’un compte parental ? S’inscrire',
      backToWelcome: 'Retour à l’accueil',
      forgotPasswordLink: 'Mot de passe oublié ?',
      forgotPasswordTitle: 'Récupération du mot de passe',
      forgotPasswordBody:
        'Cet environnement autonome n’envoie pas d’e-mails externes automatiquement. Un parent connecté peut modifier le mot de passe dans Paramètres, ou continuer en mode Invité.',
      externalAuthNote:
        'Info : Les comptes e-mail/mot de passe et le mode Invité sont actifs. La connexion Google et les SMS ne sont pas activés sans fournisseur externe.',
      errors: {
        GUARDIAN_CONSENT_REQUIRED: 'L’accord d’un parent ou tuteur est requis avant l’inscription.',
        INVALID_EMAIL: 'Veuillez saisir une adresse e-mail parentale valide.',
        PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères.',
        NAMES_REQUIRED: 'Veuillez indiquer un surnom d’astronaute et le nom du parent.',
        EMAIL_EXISTS: 'Un compte existe déjà avec cet e-mail. Essayez de vous connecter.',
        INVALID_CREDENTIALS: 'E-mail ou mot de passe incorrect.',
        NETWORK_ERROR: 'Problème de connexion au serveur. Veuillez réessayer.',
      },
    },
    dashboard: {
      welcomeBack: 'Bienvenue à bord, Astronaute',
      guestBadge: 'Explorateur Invité (Sauvegarde locale)',
      accountBadge: 'Compte Synchronisé',
      currentMission: 'Étape actuelle',
      missionProgress: 'Progression globale',
      completedActivities: 'Activités terminées',
      quizScore: 'Score aux quiz',
      badgesEarned: 'Badges gagnés',
      continueMission: 'Continuer la mission',
      resumeActivity: 'Reprendre là où tu t’es arrêté',
      exploreSpace: 'Ouvrir le Simulateur',
      upgradeGuestTitle: 'Sauvegarde ta progression sur tous tes appareils',
      upgradeGuestBody:
        'Tu explores en mode Invité ! Demande à un parent de créer un compte gratuit pour synchroniser tes badges et tes scores.',
      createAccountBtn: 'Enregistrer sur un compte',
      galaxyMapTitle: 'Carte Galactique Interactive',
      galaxyMapSubtitle: 'Termine chaque étape pour débloquer la suite de ton aventure spatiale.',
      stageLocked: 'Verrouillée',
      stageUnlocked: 'Débloquée',
      stageCompleted: 'Étape terminée',
      openStage: 'Ouvrir l’étape',
      completePreviousTip: 'Termine toutes les activités de l’étape précédente pour débloquer.',
      stages: {
        PRE_FLIGHT: {
          title: 'Étape 1 : Pré-vol',
          subtitle: 'Entraînement & Préparation',
          desc: 'Choisis ta combinaison EVA, entraîne ton corps, prépare les repas spatiaux, vérifie oxygène et eau, et valide la check-list.',
        },
        IN_FLIGHT: {
          title: 'Étape 2 : En vol',
          subtitle: 'Vivre à bord de la station spatiale',
          desc: 'Dors en micropesanteur, recycle l’eau, gère l’oxygène et les déchets, fais du sport, observe la Terre et gère les alertes.',
        },
        POST_FLIGHT: {
          title: 'Étape 3 : Post-vol',
          subtitle: 'Retour sur Terre & Diplôme',
          desc: 'Prépare le retour, pilote la rentrée atmosphérique, réadapte-toi à la gravité 1g, passe le bilan médical et obtiens ton diplôme.',
        },
      },
    },
    activityView: {
      backToStage: 'Retour à l’étape',
      completedLabel: 'Terminé',
      inProgressLabel: 'Mission interactive',
      stepSimulation: '1. Entraînement interactif',
      stepQuiz: '2. Vérification scientifique',
      markComplete: 'Valider l’activité',
      nextActivity: 'Activité suivante',
      simulationNotice: 'Simulation éducative — Modèle simplifié inspiré des entraînements de la NASA.',
      nasaSourceLabel: 'Référence scientifique NASA',
      novaSays: 'Conseil de la Commandante Nova',
      checklistUnlockedLaunch: 'Toutes les vérifications sont validées ! Prêt pour le décollage.',
      launchRocketBtn: 'Lancer la fusée en orbite',
    },
    quiz: {
      title: 'Quiz Scientifique de Mission',
      questionOf: 'Question',
      selectAnswer: 'Choisis la meilleure explication scientifique :',
      checkAnswer: 'Valider la réponse',
      tryAgain: 'Réessayer',
      nextQuestion: 'Question suivante',
      finishQuiz: 'Terminer le quiz',
      correctTitle: 'Excellent raisonnement scientifique !',
      incorrectTitle: 'Pas tout à fait — Voyons pourquoi !',
      whyCorrect: 'Pourquoi c’est exact :',
      whyIncorrect: 'Pourquoi cette option ne fonctionne pas :',
      scienceConcept: 'Principe scientifique spatial :',
      quizCompleteTitle: 'Quiz réussi !',
      quizScoreSummary: 'Questions réussies',
      firstTryAccuracy: 'Précision au 1er essai',
      finalQuizTitle: 'Examen Final Complet d’Astronaute',
    },
    simulator: {
      title: 'Simulateur Interactif de Commandement Spatial',
      subtitle: 'Expérimente la gestion des ressources de survie, la micropesanteur et les modules de la station.',
      disclaimer: 'Simulation éducative uniquement — Modèle pédagogique simplifié, pas de vraies mesures de vol.',
      dashboardHeading: 'Console de survie du vaisseau',
      oxygen: 'Oxygène cabine (O₂)',
      water: 'Eau potable',
      food: 'Rations alimentaires',
      energy: 'Énergie solaire & batteries',
      missionTime: 'Temps écoulé de simulation',
      commsLink: 'Liaison Centre de Contrôle',
      commsNominal: 'Connectée',
      commsDelayed: 'Délai orbital',
      controlsHeading: 'Contrôles interactifs des ressources',
      solarAngle: 'Orientation des panneaux solaires',
      electrolysisRate: 'Taux d’électrolyse d’oxygène',
      waterRecycling: 'Circuit de recyclage d’eau',
      active: 'Actif',
      paused: 'En pause',
      resetSim: 'Réinitialiser',
      microgravityTitle: 'Laboratoire de micropesanteur',
      microgravitySubtitle: 'Compare la chute des objets sur Terre (1,0g), sur la Lune (0,16g) et en orbite (0g).',
      dropObjects: 'Lâcher les objets',
      gravityEnv: {
        earth: 'Terre (1,0g)',
        moon: 'Lune (0,16g)',
        iss: 'Orbite ISS (0g)',
      },
      objects: {
        feather: 'Plume',
        waterDrop: 'Goutte d’eau',
        wrench: 'Clé en acier',
      },
      stationMapTitle: 'Explorateur de la station spatiale',
      stationMapSubtitle: 'Clique sur chaque module pour découvrir son rôle à bord.',
      statusNominal: 'Nominal',
      statusLow: 'Bas — Ajuster',
    },
    badges: {
      title: 'Badges de Mission & Diplôme d’Astronaute',
      subtitle: 'Retrouve toutes tes récompenses gagnées pendant l’entraînement, le vol et le retour.',
      earned: 'Obtenu',
      locked: 'Verrouillé',
      certificateTitle: 'Diplôme Officiel de Jeune Astronaute GalaKidd',
      certificateSubtitle: 'Termine les trois étapes pour débloquer ton diplôme imprimable.',
      printCertificate: 'Imprimer le diplôme',
    },
    settings: {
      title: 'Paramètres & Compte',
      profileSection: 'Profil d’astronaute',
      astronautCallsign: 'Surnom d’astronaute',
      guardianEmail: 'E-mail du parent',
      saveProfile: 'Enregistrer',
      profileSaved: 'Profil mis à jour !',
      languageSection: 'Langue et affichage (EN / AR / FR)',
      securitySection: 'Sécurité du compte parental',
      currentPassword: 'Mot de passe actuel',
      newPassword: 'Nouveau mot de passe (min. 8 caractères)',
      updatePassword: 'Mettre à jour',
      passwordUpdated: 'Mot de passe modifié avec succès !',
      progressSection: 'Données de progression',
      resetProgress: 'Réinitialiser toute la progression',
      resetConfirm: 'Es-tu sûr de vouloir effacer tes activités terminées, scores et badges ?',
      confirmResetBtn: 'Oui, réinitialiser',
      cancelBtn: 'Annuler',
      syncStatusLocal: 'Sauvegardé localement sur ce navigateur (Mode Invité)',
      syncStatusCloud: 'Synchronisé avec votre compte parental GalaKidd',
    },
    adSlot: {
      label: 'Espace Partenaire Éducatif Optionnel',
      notice:
        'Zone réservée aux partenaires éducatifs conformes à la protection des enfants. GalaKidd n’affiche jamais de publicité pendant les missions ou les quiz.',
    },
    novaGuide: {
      name: 'Commandante Nova',
      role: 'Ta guide astronaute',
      minimize: 'Masquer',
      expand: 'Aide de Nova',
    },
  },
};
