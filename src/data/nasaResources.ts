import type { Language } from '../types/galakidd';

export interface NasaArticle {
  id: string;
  category: Record<Language, string>;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  keyFact: Record<Language, string>;
  sourceName: string;
  sourceUrl: string;
}

export const NASA_ARTICLES: NasaArticle[] = [
  {
    id: 'nasa_iss_life',
    category: { en: 'Space Station', ar: 'محطة الفضاء', fr: 'Station Spatiale' },
    title: {
      en: 'Living & Working on the International Space Station',
      ar: 'العيش والعمل على متن محطة الفضاء الدولية',
      fr: 'Vivre et travailler à bord de l’ISS',
    },
    summary: {
      en: 'Orbiting about 408 km above Earth at 28,000 km/h, astronauts live inside pressurized modules where every drop of water and breath of air is carefully managed.',
      ar: 'تدور المحطة على ارتفاع ٤٠٨ كم تقريباً بسرعة ٢٨,٠٠٠ كم/ساعة، ويعيش فيها الرواد داخل وحدات مضغوطة تُدار فيها كل قطرة ماء ونفس هواء بدقة.',
      fr: 'En orbite à environ 408 km à 28 000 km/h, les astronautes vivent dans des modules pressurisés où air et eau sont gérés avec précision.',
    },
    keyFact: {
      en: 'The ISS completes one full orbit around Earth every ~93 minutes—giving crews 16 sunrises every 24 hours.',
      ar: 'تتم المحطة دورة كاملة حول الأرض كل ٩٣ دقيقة تقريباً، مما يمنح الطاقم ١٦ شروقاً للشمس كل ٢٤ ساعة.',
      fr: 'L’ISS fait le tour de la Terre en environ 93 minutes, offrant 16 levers de soleil toutes les 24 heures.',
    },
    sourceName: 'NASA International Space Station Facts & Figures',
    sourceUrl: 'https://www.nasa.gov/international-space-station/facts-and-figures/',
  },
  {
    id: 'nasa_microgravity',
    category: { en: 'Physics', ar: 'الفيزياء', fr: 'Physique' },
    title: {
      en: 'What Is Microgravity?',
      ar: 'ما هي الجاذبية الصغرى؟',
      fr: 'Qu’est-ce que la micropesanteur ?',
    },
    summary: {
      en: 'Gravity in low Earth orbit is still about 90% as strong as on Earth’s surface! Astronauts float because both they and the space station are in continuous free fall around Earth.',
      ar: 'الجاذبية في المدار الأرضي المنخفض لا تزال نحو ٩٠٪ من قوتها على الأرض! يطفو الرواد لأنهم والمحطة في حالة سقوط حر مستمر حول الأرض.',
      fr: 'La gravité en orbite basse vaut encore 90 % de celle sur Terre ! Les astronautes flottent car ils sont en chute libre continue autour de la planète.',
    },
    keyFact: {
      en: 'NASA uses drop towers, parabolic flights, and the ISS to study how flames, water droplets, and cells behave without weight.',
      ar: 'تستخدم ناسا أبراج السقوط والطيران المكافئ والمحطة الدولية لدراسة سلوك اللهب والماء والخلايا في غياب الوزن الظاهري.',
      fr: 'La NASA étudie comment les flammes, gouttes d’eau et cellules se comportent en l’absence de poids apparent.',
    },
    sourceName: 'NASA — What Is Microgravity? (Grades 5–8)',
    sourceUrl: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-microgravity-grades-5-8/',
  },
  {
    id: 'nasa_water_loop',
    category: { en: 'Life Support', ar: 'دعم الحياة', fr: 'Survie' },
    title: {
      en: 'Closed-Loop Water & Oxygen Systems (ECLSS)',
      ar: 'أنظمة إعادة تدوير المياه وإنتاج الأكسجين',
      fr: 'Systèmes d’eau et d’oxygène en boucle fermée',
    },
    summary: {
      en: 'On long missions, resupplying water from Earth is too expensive. NASA’s Environmental Control and Life Support System cleans cabin humidity and wastewater back into drinking water.',
      ar: 'في المهمات الطويلة يصعب شحن كميات كبيرة من الماء، لذا ينقّي نظام دعم الحياة في ناسا رطوبة المقصورة ومياه الصرف لتصبح صالحة للشرب.',
      fr: 'Le système ECLSS de la NASA purifie la condensation et les eaux usées pour les transformer en eau potable pure.',
    },
    keyFact: {
      en: 'In 2023, NASA’s ISS Environmental Control and Life Support System achieved roughly 98% water recovery.',
      ar: 'في عام ٢٠٢٣، حقق نظام دعم الحياة في محطة الفضاء الدولية نسبة استعادة للمياه بلغت نحو ٩٨٪.',
      fr: 'En 2023, le système ECLSS de l’ISS a atteint un taux de récupération d’eau d’environ 98 %.',
    },
    sourceName: 'NASA Water Recovery Milestone',
    sourceUrl: 'https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/',
  },
  {
    id: 'nasa_earth_obs',
    category: { en: 'Earth Science', ar: 'علوم الأرض', fr: 'Sciences de la Terre' },
    title: {
      en: 'Observing Our Planet from Space',
      ar: 'مراقبة كوكبنا من الفضاء',
      fr: 'Observer notre planète depuis l’espace',
    },
    summary: {
      en: 'From the 7-window Cupola and Earth-observing satellites, NASA tracks hurricanes, ocean currents, coral reefs, and changing forests to help communities on the ground.',
      ar: 'من القبة الزجاجية والأقمار الصناعية، تراقب ناسا الأعاصير وتيارات المحيطات والشعاب المرجانية والغابات لمساعدة البشر على الأرض.',
      fr: 'Depuis la Cupola et les satellites d’observation, la NASA suit ouragans, océans, récifs et forêts pour protéger la Terre.',
    },
    keyFact: {
      en: 'Astronaut photography from orbit has captured millions of Earth images used in hurricane forecasting and disaster response.',
      ar: 'التقط رواد الفضاء ملايين الصور للأرض من المدار تُستخدم في التنبؤ بالأعاصير والاستجابة للكوارث.',
      fr: 'Les photographies prises par les astronautes aident à suivre les ouragans et les catastrophes naturelles.',
    },
    sourceName: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov/',
  },
];
