import type { ActivityId, Language, StageId } from '../types/galakidd';

export interface ActivityMeta {
  id: ActivityId;
  stage: StageId;
  order: number;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  novaTip: Record<Language, string>;
  scienceFact: Record<Language, string>;
  nasaSource: string;
  nasaUrl: string;
  quizIds: string[];
}

export interface BadgeDef {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  stage: StageId | 'ALL';
}

export const STAGE_ACTIVITY_MAP: Record<StageId, ActivityId[]> = {
  PRE_FLIGHT: [
    'pre_suit',
    'pre_training',
    'pre_food',
    'pre_oxygen_water',
    'pre_safety',
    'pre_checklist',
  ],
  IN_FLIGHT: [
    'in_sleep',
    'in_eat_drink',
    'in_exercise',
    'in_oxygen',
    'in_water',
    'in_waste',
    'in_comms',
    'in_earth',
    'in_emergency',
  ],
  POST_FLIGHT: [
    'post_return_prep',
    'post_landing_prep',
    'post_landing_sim',
    'post_gravity',
    'post_evaluation',
    'post_certificate',
  ],
};

export const ACTIVITIES: Record<ActivityId, ActivityMeta> = {
  pre_suit: {
    id: 'pre_suit',
    stage: 'PRE_FLIGHT',
    order: 1,
    title: {
      en: 'Choose an Astronaut Suit',
      ar: 'اختيار بدلة رائد الفضاء',
      fr: 'Choisir une combinaison spatiale',
    },
    summary: {
      en: 'Inspect protective layers, pressurized gloves, boots, and gold visors to choose the right suit for spacewalks and launch.',
      ar: 'افحص الطبقات الواقية والقفازات المضغوطة والأحذية والواقي الذهبي لاختيار البدلة المناسبة للسير في الفضاء والإطلاق.',
      fr: 'Inspecte les couches protectrices, gants pressurisés, bottes et visière dorée pour choisir la bonne combinaison.',
    },
    novaTip: {
      en: 'Space has no air and extreme temperatures from -157°C in shadow to +121°C in sunlight. Every layer of your suit acts like a tiny personal spacecraft!',
      ar: 'الفضاء بلا هواء وتتراوح حرارته من -157°م في الظل إلى +121°م في الشمس. كل طبقة في بدلتك تعمل كمركبة فضائية مصغّرة تحميك!',
      fr: 'L’espace n’a pas d’air et subit des températures de -157 °C à +121 °C. Chaque couche de ta combinaison agit comme un mini vaisseau spatial !',
    },
    scienceFact: {
      en: 'NASA’s Extravehicular Mobility Unit (EMU) has 14 protective layers, including thermal micrometeoroid shielding and a water-cooled undergarment.',
      ar: 'تتكون بدلة السير في الفضاء (EMU) التابعة لناسا من ١٤ طبقة واقية، تشمل درعاً حرارياً ومضاداً للنيازك الدقيقة وملابس تبريد مائية.',
      fr: 'La combinaison EVA (EMU) de la NASA compte 14 couches protectrices, dont un bouclier thermique anti-micrométéorites et un sous-vêtement refroidi par eau.',
    },
    nasaSource: 'NASA Spacesuits & Spacewalks',
    nasaUrl: 'https://www.nasa.gov/learning-resources/for-kids-and-students/what-is-a-spacesuit-grades-5-8/',
    quizIds: ['q_suit_1'],
  },
  pre_training: {
    id: 'pre_training',
    stage: 'PRE_FLIGHT',
    order: 2,
    title: {
      en: 'Physical Training Lab',
      ar: 'مختبر التدريب البدني',
      fr: 'Entraînement physique',
    },
    summary: {
      en: 'Test balance, coordination, and strength training so your body is ready for rocket launch forces and microgravity.',
      ar: 'اختبر تدريبات التوازن والتنسيق والقوة لتجهيز جسمك لقوى تسارع الإطلاق وانعدام الجاذبية.',
      fr: 'Teste l’équilibre, la coordination et la force musculaire pour préparer ton corps au décollage et à l’apesanteur.',
    },
    novaTip: {
      en: 'During launch, astronauts feel up to 3g—three times Earth’s gravity! Training your core, heart, and balance keeps you sharp.',
      ar: 'أثناء الإطلاق يشعر الرواد بجاذبية تصل إلى ٣ أضعاف جاذبية الأرض! تقوية القلب والتوازن تجعلك مستعداً تماماً.',
      fr: 'Au décollage, les astronautes ressentent jusqu’à 3g ! Entraîner ton cœur, tes muscles et ton équilibre te garde en forme.',
    },
    scienceFact: {
      en: 'NASA astronaut candidates train underwater in the Neutral Buoyancy Laboratory and practice cardiovascular and strength conditioning for up to 2 years.',
      ar: 'يتدرب مرشحو رواد الفضاء في ناسا تحت الماء في مختبر الطفو المحايد ويخضعون لتدريبات قلبية وعضلية لمدة تصل إلى عامين.',
      fr: 'Les candidats astronautes de la NASA s’entraînent sous l’eau au Neutral Buoyancy Laboratory et suivent un programme sportif intensif.',
    },
    nasaSource: 'NASA Astronaut Selection & Training',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/astronauts/astronaut-training/',
    quizIds: ['q_training_1'],
  },
  pre_food: {
    id: 'pre_food',
    stage: 'PRE_FLIGHT',
    order: 3,
    title: {
      en: 'Food & Nutrition Packing',
      ar: 'تجهيز الغذاء والتغذية',
      fr: 'Alimentation & nutrition spatiale',
    },
    summary: {
      en: 'Build a balanced space menu and learn why crumbs and messy liquids are dangerous inside a spacecraft.',
      ar: 'صمّم قائمة طعام فضائية متوازنة وتعلّم لماذا يشكل فتات الطعام والسوائل المكشوفة خطراً داخل المركبة.',
      fr: 'Compose un menu spatial équilibré et découvre pourquoi les miettes flottantes sont dangereuses à bord.',
    },
    novaTip: {
      en: 'Instead of crumbly sliced bread, astronauts love tortillas! Tortillas don’t create floating crumbs that can clog air filters.',
      ar: 'بدلاً من الخبز الذي يتفتت، يفضّل رواد الفضاء خبز التورتيلا لأنه لا ينثر فتاتاً قد يسد فلاتر الهواء!',
      fr: 'À la place du pain qui fait des miettes, les astronautes utilisent des tortillas pour ne pas boucher les filtres à air !',
    },
    scienceFact: {
      en: 'Space food is packaged in thermostabilized pouches, freeze-dried packs (rehydrated with water), or natural low-crumb forms to stay fresh for months.',
      ar: 'يُعبأ طعام الفضاء في عبوات معقمة حرارياً أو مجففة بالتجميد (يُضاف لها الماء) أو أطعمة طبيعية قليلة الفتات لتدوم لشهور.',
      fr: 'Les repas spatiaux sont thermostabilisés, lyophilisés (réhydratés à l’eau) ou naturels sans miettes pour se conserver des mois.',
    },
    nasaSource: 'NASA Space Food Systems',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/space-food-and-nutrition/',
    quizIds: ['q_food_1'],
  },
  pre_oxygen_water: {
    id: 'pre_oxygen_water',
    stage: 'PRE_FLIGHT',
    order: 4,
    title: {
      en: 'Oxygen & Water Supplies',
      ar: 'فحص إمدادات الأكسجين والماء',
      fr: 'Réserves d’oxygène et d’eau',
    },
    summary: {
      en: 'Inspect spacecraft oxygen tanks, carbon dioxide scrubbers, and clean water storage before launch.',
      ar: 'افحص خزانات الأكسجين ومنقيات ثاني أكسيد الكربون وخزانات المياه النظيفة قبل الإقلاع.',
      fr: 'Vérifie les réservoirs d’oxygène, les filtres à CO₂ et les réserves d’eau potable avant le lancement.',
    },
    novaTip: {
      en: 'Water is heavy to launch on a rocket, so astronauts pack just enough for launch and rely on recycling systems once in orbit.',
      ar: 'الماء ثقيل جداً عند الإطلاق بالصاروخ، لذا نحمل الكمية اللازمة فقط ثم نعتمد على إعادة التدوير في المدار.',
      fr: 'L’eau est très lourde à lancer en fusée : on emporte le nécessaire et on la recycle ensuite en orbite.',
    },
    scienceFact: {
      en: 'Aboard the ISS, cabin air mimics Earth’s atmosphere at roughly 21% oxygen and 79% nitrogen at sea-level pressure (101.3 kPa).',
      ar: 'على متن محطة الفضاء الدولية، يحاكي هواء المقصورة جو الأرض بنسبة ٢١٪ أكسجين و٧٩٪ نيتروجين تقريباً.',
      fr: 'À bord de l’ISS, l’air cabine reproduit l’atmosphère terrestre avec environ 21 % d’oxygène et 79 % d’azote.',
    },
    nasaSource: 'NASA Environmental Control & Life Support',
    nasaUrl: 'https://www.nasa.gov/international-space-station/space-station-eclss/',
    quizIds: ['q_oxywater_1'],
  },
  pre_safety: {
    id: 'pre_safety',
    stage: 'PRE_FLIGHT',
    order: 5,
    title: {
      en: 'Spacecraft Safety Systems',
      ar: 'أنظمة السلامة في المركبة',
      fr: 'Sécurité du vaisseau spatial',
    },
    summary: {
      en: 'Explore fire extinguishers, emergency breathing masks, hatch seals, and match the right response to safety drills.',
      ar: 'تعرّف على طفايات الحريق وأقنعة التنفس الطارئة وأختام الفتحات وطابق المعدات المناسبة لكل حالة طارئة.',
      fr: 'Découvre les extincteurs, masques respiratoires et joints d’écoutille pour réussir les exercices de sécurité.',
    },
    novaTip: {
      en: 'In microgravity, hot air doesn’t rise like on Earth! Smoke spreads in all directions, so smoke detectors and airflow fans are vital.',
      ar: 'في انعدام الجاذبية لا يرتفع الهواء الساخن للأعلى كما في الأرض! لذلك تنتشر الأدخنة في كل اتجاه وتعد أجهزة الاستشعار ضرورية.',
      fr: 'En micropesanteur, l’air chaud ne monte pas ! Les détecteurs de fumée et ventilateurs sont donc essentiels.',
    },
    scienceFact: {
      en: 'Astronauts train extensively for three top spacecraft emergencies: fire, cabin depressurization, and toxic ammonia leaks.',
      ar: 'يتدرب رواد الفضاء مكثفاً على ثلاث حالات طوارئ رئيسية: الحريق، وفقدان الضغط، وتسرب الأمونيا.',
      fr: 'Les astronautes s’entraînent face aux trois urgences majeures : incendie, dépressurisation et fuite toxique.',
    },
    nasaSource: 'NASA Crew Safety & Training',
    nasaUrl: 'https://www.nasa.gov/international-space-station/',
    quizIds: ['q_safety_1'],
  },
  pre_checklist: {
    id: 'pre_checklist',
    stage: 'PRE_FLIGHT',
    order: 6,
    title: {
      en: 'Final Launch Checklist',
      ar: 'قائمة التحقق النهائية للإطلاق',
      fr: 'Check-list finale avant lancement',
    },
    summary: {
      en: 'Verify every pre-flight training step and unlock the rocket launch sequence to reach orbit!',
      ar: 'تحقق من إتمام كل تدريبات ما قبل الإطلاق وافتح تسلسل إطلاق الصاروخ نحو المدار!',
      fr: 'Valide chaque étape de préparation et débloque la séquence de lancement vers l’orbite !',
    },
    novaTip: {
      en: 'Real NASA flight directors perform a Go/No-Go poll with every engineering station before lighting the rocket engines.',
      ar: 'يجري مديرو الطيران في ناسا استطلاعاً شاملاً مع كل فرق الهندسة للتأكد من جاهزية كل نظام قبل إشعال المحركات.',
      fr: 'Avant le décollage, le directeur de vol vérifie le « Go/No-Go » avec chaque équipe technique.',
    },
    scienceFact: {
      en: 'To reach low Earth orbit at ~408 km altitude, a rocket must accelerate to roughly 28,000 km/h (7.66 km/s).',
      ar: 'للوصول إلى المدار الأرضي المنخفض على ارتفاع ٤٠٨ كم تقريباً، يجب أن يتسارع الصاروخ إلى نحو ٢٨,٠٠٠ كم/ساعة.',
      fr: 'Pour atteindre l’orbite basse (~408 km), une fusée doit accélérer jusqu’à environ 28 000 km/h (7,66 km/s).',
    },
    nasaSource: 'NASA Launch Services Program',
    nasaUrl: 'https://www.nasa.gov/launch-services-program/',
    quizIds: ['q_checklist_1'],
  },
  in_sleep: {
    id: 'in_sleep',
    stage: 'IN_FLIGHT',
    order: 1,
    title: {
      en: 'Sleeping in Microgravity',
      ar: 'النوم في الجاذبية الصغرى',
      fr: 'Dormir en micropesanteur',
    },
    summary: {
      en: 'Secure your sleeping bag in the crew quarters, turn on cabin airflow, and discover why there is no "up" or "down" in orbit.',
      ar: 'ثبّت كيس النوم داخل مقصورة الطاقم، وشغّل مروحة التهوية، واكتشف لماذا لا يوجد أعلى أو أسفل في المدار.',
      fr: 'Attache ton sac de couchage à la paroi, active la ventilation et découvre pourquoi il n’y a ni haut ni bas en orbite.',
    },
    novaTip: {
      en: 'Don’t forget the ventilation fan! Without gravity, warm exhaled carbon dioxide would stay around your face unless fans keep air moving.',
      ar: 'لا تنسَ تشغيل مروحة التهوية! بدون الجاذبية قد يتجمع ثاني أكسيد الكربون حول وجهك إذا لم تتحرك المراوح.',
      fr: 'N’oublie pas la ventilation ! Sans gravité, le CO₂ expiré resterait autour de ta tête sans circulation d’air.',
    },
    scienceFact: {
      en: 'ISS astronauts see 16 sunrises and 16 sunsets every 24 hours, so they use window shades and sleep masks to keep a steady sleep schedule.',
      ar: 'يشاهد رواد المحطة ١٦ شروقاً و١٦ غروباً كل ٢٤ ساعة، لذا يستخدمون أقنعة العين وحواجز النوافذ للحفاظ على جدول نوم منتظم.',
      fr: 'Les astronautes voient 16 levers et couchers de soleil par jour et utilisent des masques pour dormir régulièrement.',
    },
    nasaSource: 'NASA Sleeping in Space',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/sleeping-in-space/',
    quizIds: ['q_sleep_1'],
  },
  in_eat_drink: {
    id: 'in_eat_drink',
    stage: 'IN_FLIGHT',
    order: 2,
    title: {
      en: 'Eating & Drinking in Orbit',
      ar: 'الأكل والشرب في المدار',
      fr: 'Manger et boire en orbite',
    },
    summary: {
      en: 'Rehydrate space meals, secure trays with Velcro and magnets, and test how water forms floating spheres.',
      ar: 'أضف الماء للوجبات المجففة، وثبّت الصينية بالفيلكرو والمغناطيس، وشاهد كيف يتكور الماء في الفضاء.',
      fr: 'Réhydrate des repas spatiaux, fixe ton plateau avec du Velcro et observe les sphères d’eau flottantes.',
    },
    novaTip: {
      en: 'Surface tension pulls floating water into a shimmering sphere in microgravity—that’s why we drink through sealed straw pouches!',
      ar: 'التوتر السطحي يسحب الماء الطافي ليشكّل كرة لامعة! لذلك يشرب الرواد من أكياس مغلقة مزودة بقشّة.',
      fr: 'La tension superficielle forme des sphères d’eau flottantes : on boit donc avec une paille depuis des sachets fermés !',
    },
    scienceFact: {
      en: 'Because fluids shift upward in microgravity, astronauts’ noses feel slightly stuffy, making spicy sauces and bold flavors extra popular in orbit.',
      ar: 'بسبب صعود سوائل الجسم للأعلى في الجاذبية الصغرى، يشعر الرواد باحتقان خفيف، لذا يفضلون الصلصات والنكهات القوية.',
      fr: 'Les fluides remontant vers la tête, l’odorat diminue un peu en orbite : les astronautes adorent les plats épicés !',
    },
    nasaSource: 'NASA Eating in Space',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/eating-in-space/',
    quizIds: ['q_eat_1'],
  },
  in_exercise: {
    id: 'in_exercise',
    stage: 'IN_FLIGHT',
    order: 3,
    title: {
      en: 'Orbital Exercise Lab',
      ar: 'التمارين الرياضية في الفضاء',
      fr: 'Sport en apesanteur',
    },
    summary: {
      en: 'Use the treadmill harness, stationary cycle, and resistance trainer to protect muscles and bones in zero gravity.',
      ar: 'استخدم حزام جهاز المشي والدراجة الثابتة وجهاز المقاومة لحماية عضلاتك وعظامك في انعدام الجاذبية.',
      fr: 'Utilise le tapis roulant à harnais, le vélo et l’appareil de résistance pour protéger muscles et os.',
    },
    novaTip: {
      en: 'On Earth, walking fights gravity all day. In orbit, without 2 hours of daily exercise, astronauts can lose ~1% of bone density per month!',
      ar: 'على الأرض تقاوم الجاذبية طوال اليوم. في المدار، بدون ساعتين من الرياضة يومياً، قد يفقد الرائد نحو ١٪ من كثافة العظام شهرياً!',
      fr: 'Sans 2 heures de sport par jour en orbite, les astronautes peuvent perdre environ 1 % de densité osseuse par mois !',
    },
    scienceFact: {
      en: 'On the ISS, astronauts exercise ~2 hours every day using ARED (vacuum cylinder resistance), CEVIS (bike), and T2 (bungee-harness treadmill).',
      ar: 'يتمرن رواد المحطة حوالي ساعتين يومياً باستخدام أجهزة ARED وCEVIS وجهاز المشي المزود بأحزمة التثبيت T2.',
      fr: 'Sur l’ISS, l’équipage s’entraîne environ 2 heures par jour sur ARED, CEVIS et le tapis T2 à sangles.',
    },
    nasaSource: 'NASA Exercising in Space',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/exercising-in-space/',
    quizIds: ['q_exercise_1'],
  },
  in_oxygen: {
    id: 'in_oxygen',
    stage: 'IN_FLIGHT',
    order: 4,
    title: {
      en: 'Breathing & Oxygen Generation',
      ar: 'التنفس وإنتاج الأكسجين',
      fr: 'Respiration et production d’oxygène',
    },
    summary: {
      en: 'Balance water electrolysis and carbon dioxide scrubbers to keep the space station air safe to breathe.',
      ar: 'وازن بين التحليل الكهربائي للماء ومنقيات ثاني أكسيد الكربون للحفاظ على هواء المحطة نقياً للتنفس.',
      fr: 'Équilibre l’électrolyse de l’eau et l’élimination du CO₂ pour maintenir un air respirable à bord.',
    },
    novaTip: {
      en: 'Electricity from our solar panels splits water molecules (H₂O) into breathable oxygen (O₂) and hydrogen!',
      ar: 'كهرباء الألواح الشمسية تفصل جزيئات الماء (H₂O) إلى أكسجين نتنفسه (O₂) وهيدروجين!',
      fr: 'L’électricité solaire sépare l’eau (H₂O) en oxygène respirable (O₂) et en hydrogène !',
    },
    scienceFact: {
      en: 'The ISS Oxygen Generation System uses electrolysis of water, while the Carbon Dioxide Removal Assembly (CDRA) captures exhaled CO₂.',
      ar: 'يستخدم نظام توليد الأكسجين بالمحطة التحليل الكهربائي للماء، بينما يلتقط نظام CDRA ثاني أكسيد الكربون الناتج عن الزفير.',
      fr: 'Le système OGS de l’ISS produit de l’oxygène par électrolyse de l’eau tandis que le système CDRA capture le CO₂.',
    },
    nasaSource: 'NASA Space Place — Breathing in Space',
    nasaUrl: 'https://www.nasa.gov/international-space-station/space-station-eclss/',
    quizIds: ['q_oxygen_1'],
  },
  in_water: {
    id: 'in_water',
    stage: 'IN_FLIGHT',
    order: 5,
    title: {
      en: 'Water Recycling Loop',
      ar: 'نظام إعادة تدوير المياه',
      fr: 'Recyclage de l’eau en orbite',
    },
    summary: {
      en: 'Route moisture from breath, sweat, and wash water through multi-stage filtration to recover pure drinking water.',
      ar: 'مرّر رطوبة التنفس والتعرق ومياه الغسيل عبر مراحل الترشيح والتنقية لاستعادة مياه شرب نقية.',
      fr: 'Filtre l’humidité de l’air, la sueur et les eaux usées à travers plusieurs étages pour produire de l’eau pure.',
    },
    novaTip: {
      en: 'Not a single drop goes to waste! The ISS recovers up to 98% of all water aboard—even moisture from astronauts’ breath.',
      ar: 'لا تضيع قطرة واحدة! تستعيد محطة الفضاء الدولية حتى ٩٨٪ من جميع المياه على متنها، حتى بخار التنفس.',
      fr: 'Aucune goutte n’est perdue ! L’ISS récupère jusqu’à 98 % de l’eau à bord, même l’humidité de la respiration.',
    },
    scienceFact: {
      en: 'NASA’s Water Recovery System combines rotary distillation, multi-filtration beds, catalytic oxidation, and iodine treatment.',
      ar: 'يجمع نظام استعادة المياه في ناسا بين التقطير الدوار، وطبقات الترشيح المتعددة، والأكسدة الحفزية، والتعقيم باليود.',
      fr: 'Le système WRS de la NASA combine distillation, lits de filtration, oxydation catalytique et désinfection.',
    },
    nasaSource: 'NASA Water Recovery System',
    nasaUrl: 'https://www.nasa.gov/missions/station/iss-research/nasa-achieves-water-recovery-milestone-on-international-space-station/',
    quizIds: ['q_water_1'],
  },
  in_waste: {
    id: 'in_waste',
    stage: 'IN_FLIGHT',
    order: 6,
    title: {
      en: 'Spacecraft Waste Management',
      ar: 'إدارة النفايات في الفضاء',
      fr: 'Gestion des déchets spatiaux',
    },
    summary: {
      en: 'Sort dry trash, wet food wrappers, recyclable materials, and sealed canisters safely in microgravity.',
      ar: 'افرز النفايات الجافة وأغلفة الطعام الرطبة والمواد القابلة للتدوير والعبوات المغلقة بأمان في انعدام الجاذبية.',
      fr: 'Trie déchets secs, emballages humides et conteneurs hermétiques en toute sécurité en micropesanteur.',
    },
    novaTip: {
      en: 'Space toilets don’t use gravity—they use gentle suction airflow, like a quiet vacuum cleaner, to keep everything cleanly contained!',
      ar: 'مراحيض الفضاء لا تعتمد على الجاذبية بل على تيار هواء شفاط لطيف للحفاظ على النظافة والاحتواء التام!',
      fr: 'Les toilettes spatiales utilisent une aspiration d’air douce au lieu de la gravité pour tout contenir proprement !',
    },
    scienceFact: {
      en: 'Solid waste and trash are sealed inside uncrewed cargo spacecraft, which safely burn up in Earth’s upper atmosphere after undocking.',
      ar: 'تُجمع النفايات الصلبة داخل مركبات شحن غير مأهولة تحترق بأمان في الطبقات العليا من الغلاف الجوي عند انفصالها.',
      fr: 'Les déchets compacts sont chargés dans des vaisseaux cargo automatiques qui se consument dans la haute atmosphère.',
    },
    nasaSource: 'NASA Waste Management in Space',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/',
    quizIds: ['q_waste_1'],
  },
  in_comms: {
    id: 'in_comms',
    stage: 'IN_FLIGHT',
    order: 7,
    title: {
      en: 'Communication with Earth',
      ar: 'الاتصال مع الأرض',
      fr: 'Communication avec la Terre',
    },
    summary: {
      en: 'Send a radio message via relay satellites and compare signal travel times from the ISS, the Moon, and Mars.',
      ar: 'أرسل رسالة لاسلكية عبر أقمار التتابع وقارن زمن وصول الإشارة من المحطة والقمر والمريخ.',
      fr: 'Envoie un message radio par satellite relais et compare les délais depuis l’ISS, la Lune et Mars.',
    },
    novaTip: {
      en: 'Radio waves travel at the speed of light (300,000 km/s). Even at that incredible speed, Mars is so far that messages take minutes!',
      ar: 'تنتقل موجات الراديو بسرعة الضوء (٣٠٠,٠٠٠ كم/ث). ومع ذلك فإن المريخ بعيد جداً لدرجة أن الرسالة تستغرق دقائق!',
      fr: 'Les ondes radio voyagent à la vitesse de la lumière (300 000 km/s), mais vers Mars le message prend plusieurs minutes !',
    },
    scienceFact: {
      en: 'The ISS communicates with Mission Control in Houston via NASA’s Tracking and Data Relay Satellite (TDRS) network at high-orbit ~35,786 km.',
      ar: 'تتصل محطة الفضاء بمركز التحكم في هيوستن عبر شبكة أقمار التتبع ونقل البيانات (TDRS) في المدار الجغرافي الثابت.',
      fr: 'L’ISS communique avec Houston grâce au réseau de satellites relais TDRS de la NASA.',
    },
    nasaSource: 'NASA Space Communications & Navigation',
    nasaUrl: 'https://www.nasa.gov/directorates/somd/space-communications-navigation-program/',
    quizIds: ['q_comms_1'],
  },
  in_earth: {
    id: 'in_earth',
    stage: 'IN_FLIGHT',
    order: 8,
    title: {
      en: 'Observing Earth from the Cupola',
      ar: 'رصد الأرض من القبة الزجاجية',
      fr: 'Observer la Terre depuis la Cupola',
    },
    summary: {
      en: 'Inspect cyclones, coral reefs, desert dust plumes, and Earth’s thin blue atmosphere through the orbital cupola window.',
      ar: 'تأمل الأعاصير والشعاب المرجانية وعواصف الصحراء والغلاف الجوي الأزرق الرقيق من نافذة القبة المدارية.',
      fr: 'Identifie cyclones, récifs coralliens, poussières désertiques et fine atmosphère bleue depuis la Cupola.',
    },
    novaTip: {
      en: 'Looking out the 7-window Cupola, you notice Earth’s atmosphere is as thin as the skin on an apple—protecting all life below!',
      ar: 'من نافذة القبة ذات السبع واجهات، يبدو الغلاف الجوي رقيقاً مثل قشرة تفاحة تحمي كل أشكال الحياة على الأرض!',
      fr: 'Depuis la Cupola à 7 fenêtres, l’atmosphère semble aussi fine que la peau d’une pomme protégeant la Terre !',
    },
    scienceFact: {
      en: 'Astronauts photograph hurricanes, melting glaciers, city lights, and deforestation to help NASA Earth scientists study climate and weather.',
      ar: 'يلتقط رواد الفضاء صوراً للأعاصير والأنهار الجليدية وأضواء المدن لمساعدة علماء ناسا في دراسة المناخ والطقس.',
      fr: 'Les astronautes photographient ouragans et récifs pour aider les scientifiques de la NASA à étudier notre planète.',
    },
    nasaSource: 'NASA Earth Observatory & ISS Cupola',
    nasaUrl: 'https://earthobservatory.nasa.gov/',
    quizIds: ['q_earth_1'],
  },
  in_emergency: {
    id: 'in_emergency',
    stage: 'IN_FLIGHT',
    order: 9,
    title: {
      en: 'Simulated Station Alerts',
      ar: 'محاكاة تنبيهات الطوارئ',
      fr: 'Simulation d’alertes à bord',
    },
    summary: {
      en: 'Practice calm, child-friendly decision-making for smoke alerts, solar power dips, and orbital debris warnings.',
      ar: 'تدرّب بهدوء على اتخاذ القرار الصحيح عند تنبيه الدخان أو انخفاض الطاقة الشمسية أو تحذير الحطام الفضائي.',
      fr: 'Entraîne-toi calmement à réagir face à une alerte fumée, une baisse d’énergie ou un débris spatial.',
    },
    novaTip: {
      en: 'Remember: this is an educational training simulation! Real astronauts always follow Mission Control checklists and stay calm step by step.',
      ar: 'تذكّر: هذه محاكاة تدريبية تعليمية! يتبع رواد الفضاء الحقيقيون قوائم مركز التحكم بهدوء خطوة بخطوة.',
      fr: 'Rappel : ceci est une simulation éducative ! En vrai, l’équipage suit calmement les procédures de Houston.',
    },
    scienceFact: {
      en: 'When orbital debris approaches too closely, ISS crews shelter briefly inside their docked crew spacecraft as a standard safety precaution.',
      ar: 'عند اقتراب حطام مداري، يحتمي طاقم المحطة مؤقتاً داخل مركبة العودة الملتحمة كإجراء احترازي قياسي.',
      fr: 'Si un débris s’approche, l’équipage se réfugie par précaution dans le vaisseau de retour amarré.',
    },
    nasaSource: 'NASA ISS Operations & Safety',
    nasaUrl: 'https://www.nasa.gov/international-space-station/',
    quizIds: ['q_emergency_1'],
  },
  post_return_prep: {
    id: 'post_return_prep',
    stage: 'POST_FLIGHT',
    order: 1,
    title: {
      en: 'Return Undocking Preparation',
      ar: 'الاستعداد للانفصال والعودة',
      fr: 'Préparation au désamarrage',
    },
    summary: {
      en: 'Pack science samples safely, verify return capsule thrusters and pressure seals, and prepare for undocking.',
      ar: 'احزم العينات العلمية بأمان، وتأكد من أختام الضغط ومحركات كبسولة العودة استعداداً للانفصال.',
      fr: 'Range les échantillons scientifiques, vérifie les joints et moteurs de la capsule avant le départ.',
    },
    novaTip: {
      en: 'Anything left loose inside the capsule would fly forward during braking and re-entry, so every camera and sample box is strapped tight!',
      ar: 'أي جسم غير مثبت داخل الكبسولة سيندفع بقوة أثناء التباطؤ والعودة، لذلك نربط كل كاميرا وصندوق عينات بإحكام!',
      fr: 'Tout objet non attaché volerait pendant le freinage : chaque boîte d’expérience est solidement sanglée !',
    },
    scienceFact: {
      en: 'Before undocking, crews run leak checks on the hatch seals and stow delicate biological experiments in cooled lockers.',
      ar: 'قبل الانفصال، يختبر الطاقم إحكام إغلاق الكوة ويحفظون التجارب الحيوية الحساسة في حافظات مبردة.',
      fr: 'Avant de quitter la station, l’équipage vérifie l’étanchéité de l’écoutille et sécurise les expériences.',
    },
    nasaSource: 'NASA Return from Space',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/',
    quizIds: ['q_return_1'],
  },
  post_landing_prep: {
    id: 'post_landing_prep',
    stage: 'POST_FLIGHT',
    order: 2,
    title: {
      en: 'Re-Entry Stages Explorer',
      ar: 'مراحل العودة عبر الغلاف الجوي',
      fr: 'Les étapes de la rentrée',
    },
    summary: {
      en: 'Explore how the deorbit burn, heat shield plasma, and parachutes slow a spacecraft from 28,000 km/h to a gentle landing.',
      ar: 'استكشف كيف يبطئ احتراق الخروج من المدار والدرع الحراري والمظلات المركبة من ٢٨,٠٠٠ كم/س إلى هبوط آمن.',
      fr: 'Découvre comment le freinage orbital, le bouclier thermique et les parachutes ralentissent la capsule.',
    },
    novaTip: {
      en: 'Air friction slows the capsule down and turns the air around the heat shield into glowing plasma at over 1,600°C!',
      ar: 'احتكاك الهواء يبطئ الكبسولة ويحوّل الهواء حول الدرع الحراري إلى بلازما متوهجة تفوق حرارتها ١٦٠٠ درجة مئوية!',
      fr: 'Le frottement de l’air freine la capsule et chauffe le bouclier thermique à plus de 1 600 °C !',
    },
    scienceFact: {
      en: 'An ablative heat shield protects the astronauts inside by charring and carrying extreme heat away from the cabin.',
      ar: 'يحمي الدرع الحراري المتآكل رواد الفضاء في الداخل عن طريق امتصاص الحرارة الشديدة وتبديدها بعيداً عن المقصورة.',
      fr: 'Le bouclier thermique ablatif évacue la chaleur extrême pour garder les astronautes au frais à l’intérieur.',
    },
    nasaSource: 'NASA Space Place — Heat Shields',
    nasaUrl: 'https://spaceplace.nasa.gov/',
    quizIds: ['q_landing_prep_1'],
  },
  post_landing_sim: {
    id: 'post_landing_sim',
    stage: 'POST_FLIGHT',
    order: 3,
    title: {
      en: 'Animated Landing Simulation',
      ar: 'محاكاة الهبوط المداري',
      fr: 'Simulation d’atterrissage',
    },
    summary: {
      en: 'Pilot the capsule descent, monitor altitude and heat shield temperature, and deploy parachutes at the safe altitude window.',
      ar: 'قُد هبوط الكبسولة، وراقب الارتفاع وحرارة الدرع الحراري، وافتح المظلات في الارتفاع الآمن للهبوط.',
      fr: 'Pilote la descente, surveille l’altitude et déploie les parachutes au bon moment pour amerrir en douceur.',
    },
    novaTip: {
      en: 'Wait until you pass through peak heating and reach the parachute deployment zone below 10 km altitude before opening the chutes!',
      ar: 'انتظر حتى تتجاوز ذروة الحرارة وتصل إلى منطقة فتح المظلات تحت ارتفاع ١٠ كم قبل إطلاقها!',
      fr: 'Attends de passer le pic de chaleur et d’atteindre la zone sous 10 km d’altitude avant d’ouvrir les parachutes !',
    },
    scienceFact: {
      en: 'Drogue chutes stabilize the capsule first at high altitude, followed by three giant main orange-and-white parachutes for splashdown.',
      ar: 'تستقر الكبسولة أولاً بمظلات التوجيه على ارتفاع عالٍ، ثم تفتح ثلاث مظلات رئيسية عملاقة برتقالية وبيضاء للهبوط على الماء.',
      fr: 'Des parachutes extracteurs stabilisent la capsule avant l’ouverture des trois grands parachutes principaux.',
    },
    nasaSource: 'NASA Orion & Crew Recovery',
    nasaUrl: 'https://www.nasa.gov/missions/artemis/orion/',
    quizIds: ['q_landing_sim_1'],
  },
  post_gravity: {
    id: 'post_gravity',
    stage: 'POST_FLIGHT',
    order: 4,
    title: {
      en: 'Readjusting to Earth’s Gravity',
      ar: 'التكيّف مع جاذبية الأرض',
      fr: 'Réadaptation à la gravité 1g',
    },
    summary: {
      en: 'Explore how astronauts’ balance, muscles, and blood circulation readjust after months of floating in 0g.',
      ar: 'تعرّف على كيفية استعادة توازن الرواد وعضلاتهم ودورتهم الدموية بعد شهور من الطفو في انعدام الجاذبية.',
      fr: 'Découvre comment l’équilibre, les muscles et la circulation sanguine se réadaptent après des mois en 0g.',
    },
    novaTip: {
      en: 'Right after landing, even lifting your arm or a glass of water feels heavy because your inner ear and muscles are re-learning 1g!',
      ar: 'بعد الهبوط مباشرة، حتى رفع ذراعك أو كوب ماء يبدو ثقيلاً لأن الأذن الداخلية والعضلات تعيد تعلم الجاذبية!',
      fr: 'Juste après l’atterrissage, même lever un bras paraît lourd car ton oreille interne réapprend la gravité terrestre !',
    },
    scienceFact: {
      en: 'NASA rehabilitation specialists guide returning astronauts through balance, walking, and strength exercises for several weeks after landing.',
      ar: 'يساعد أخصائيو التأهيل في ناسا رواد الفضاء العائدين بتمارين التوازن والمشي والقوة لعدة أسابيع بعد الهبوط.',
      fr: 'Des spécialistes de la NASA accompagnent les astronautes pendant plusieurs semaines pour retrouver équilibre et force.',
    },
    nasaSource: 'NASA Human Research Program',
    nasaUrl: 'https://www.nasa.gov/hrp/',
    quizIds: ['q_gravity_1'],
  },
  post_evaluation: {
    id: 'post_evaluation',
    stage: 'POST_FLIGHT',
    order: 5,
    title: {
      en: 'Post-Flight Medical & Science Debrief',
      ar: 'التقييم الطبي والعلمي بعد الرحلة',
      fr: 'Bilan médical et scientifique',
    },
    summary: {
      en: 'Review astronaut health metrics, mission observations, and take the Final Comprehensive Astronaut Exam.',
      ar: 'راجع المؤشرات الصحية للرائد وملاحظات المهمة وخُض الاختبار الشامل النهائي لرائد الفضاء.',
      fr: 'Analyse les données médicales et scientifiques de la mission et passe l’examen final complet.',
    },
    novaTip: {
      en: 'Every flight teaches scientists how to protect future explorers traveling to the Moon and Mars!',
      ar: 'كل رحلة فضائية تعلّم العلماء كيف يحمون رواد المستقبل المسافرين إلى القمر والمريخ!',
      fr: 'Chaque mission aide les scientifiques à protéger les futurs explorateurs vers la Lune et Mars !',
    },
    scienceFact: {
      en: 'By comparing pre-flight and post-flight medical scans, NASA learns how spaceflight affects bones, vision, and the cardiovascular system.',
      ar: 'بمقارنة الفحوصات الطبية قبل الرحلة وبعدها، تفهم ناسا كيف يؤثر الفضاء على العظام والبصر والقلب.',
      fr: 'En comparant les examens avant et après le vol, la NASA comprend comment protéger les os, les yeux et le cœur.',
    },
    nasaSource: 'NASA Twins & Crew Health Studies',
    nasaUrl: 'https://www.nasa.gov/humans-in-space/',
    quizIds: ['q_final_1', 'q_final_2', 'q_final_3'],
  },
  post_certificate: {
    id: 'post_certificate',
    stage: 'POST_FLIGHT',
    order: 6,
    title: {
      en: 'Mission Achievements & Certificate',
      ar: 'إنجازات المهمة وشهادة رائد الفضاء',
      fr: 'Récompenses et Diplôme d’Astronaute',
    },
    summary: {
      en: 'Celebrate your completed journey across Pre-Flight, In-Flight, and Post-Flight and view your personalized astronaut certificate.',
      ar: 'احتفل بإتمام رحلتك عبر مراحل ما قبل الإطلاق والرحلة والعودة واحصل على شهادة رائد الفضاء الخاصة بك.',
      fr: 'Célèbre ton voyage complet à travers les trois étapes et découvre ton diplôme personnalisé d’astronaute.',
    },
    novaTip: {
      en: 'Congratulations, Commander! You completed the entire GalaKidd astronaut adventure from Earth launch pad to splashdown!',
      ar: 'تهانينا أيها القائد! لقد أتممت مغامرة رائد الفضاء الكاملة من منصة الإطلاق حتى الهبوط على الأرض!',
      fr: 'Félicitations, Commandant ! Tu as accompli toute l’aventure GalaKidd, du décollage jusqu’à l’amerrissage !',
    },
    scienceFact: {
      en: 'Every real NASA astronaut starts with curiosity, science learning, and teamwork—just like you did today.',
      ar: 'كل رائد فضاء حقيقي في ناسا يبدأ بالفضول وتعلم العلوم والعمل الجماعي، تماماً كما فعلت اليوم.',
      fr: 'Chaque véritable astronaute commence par la curiosité, les sciences et l’esprit d’équipe !',
    },
    nasaSource: 'NASA STEM Engagement',
    nasaUrl: 'https://www.nasa.gov/learning-resources/',
    quizIds: ['q_final_4'],
  },
};

export const BADGES: BadgeDef[] = [
  {
    id: 'badge_suit_specialist',
    title: { en: 'EVA Suit Specialist', ar: 'خبير بدلات الفضاء', fr: 'Spécialiste Scaphandre' },
    description: {
      en: 'Selected and inspected protective astronaut suit gear.',
      ar: 'اختار وفحص طبقات ومعدات بدلة الفضاء الواقية.',
      fr: 'A sélectionné et inspecté l’équipement du scaphandre.',
    },
    stage: 'PRE_FLIGHT',
  },
  {
    id: 'badge_launch_ready',
    title: { en: 'Launch Ready Cadet', ar: 'مستعد للإطلاق', fr: 'Cadet Prêt au Décollage' },
    description: {
      en: 'Completed all 6 Pre-Flight training activities and rocket liftoff.',
      ar: 'أتم جميع أنشطة ما قبل الإطلاق الستة وانطلق إلى المدار.',
      fr: 'A terminé les 6 activités Pré-vol et décollé vers l’orbite.',
    },
    stage: 'PRE_FLIGHT',
  },
  {
    id: 'badge_life_support',
    title: { en: 'Life-Support Engineer', ar: 'مهندس دعم الحياة', fr: 'Ingénieur Survie' },
    description: {
      en: 'Mastered cabin oxygen electrolysis and 98% water recycling.',
      ar: 'أتقن إنتاج الأكسجين بالتحليل الكهربائي وإعادة تدوير المياه.',
      fr: 'A maîtrisé la production d’oxygène et le recyclage de l’eau.',
    },
    stage: 'IN_FLIGHT',
  },
  {
    id: 'badge_earth_observer',
    title: { en: 'Cupola Earth Watcher', ar: 'راصد الأرض المداري', fr: 'Observateur de la Terre' },
    description: {
      en: 'Identified planetary weather, oceans, and atmosphere from orbit.',
      ar: 'رصد الطقس والمحيطات والغلاف الجوي للأرض من المدار.',
      fr: 'A identifié océans, cyclones et atmosphère depuis la Cupola.',
    },
    stage: 'IN_FLIGHT',
  },
  {
    id: 'badge_orbital_crew',
    title: { en: 'Orbital Crew Veteran', ar: 'بطل الحياة المدارية', fr: 'Vétéran de l’Orbite' },
    description: {
      en: 'Completed all 9 In-Flight space station life simulations.',
      ar: 'أتم جميع محاكيات الحياة اليومية التسعة على محطة الفضاء.',
      fr: 'A accompli les 9 simulations de vie à bord de la station.',
    },
    stage: 'IN_FLIGHT',
  },
  {
    id: 'badge_safe_splashdown',
    title: { en: 'Re-Entry Pilot', ar: 'طيار العودة الآمنة', fr: 'Pilote de Rentrée' },
    description: {
      en: 'Safely piloted atmospheric re-entry and parachute splashdown.',
      ar: 'قاد العودة عبر الغلاف الجوي والهبوط بالمظلات بأمان.',
      fr: 'A piloté avec succès la rentrée atmosphérique et l’amerrissage.',
    },
    stage: 'POST_FLIGHT',
  },
  {
    id: 'badge_science_ace',
    title: { en: 'NASA Science Ace', ar: 'نجم علوم الفضاء', fr: 'As des Sciences Spatiales' },
    description: {
      en: 'Answered 10 or more science quiz questions accurately.',
      ar: 'أجاب بشكل صحيح على ١٠ أسئلة علمية أو أكثر.',
      fr: 'A réussi 10 questions scientifiques ou plus.',
    },
    stage: 'ALL',
  },
  {
    id: 'badge_junior_commander',
    title: { en: 'Junior Astronaut Commander', ar: 'قائد رائد فضاء صغير', fr: 'Commandant Junior' },
    description: {
      en: 'Completed the full Pre-Flight, In-Flight, and Post-Flight journey!',
      ar: 'أتم الرحلة الكاملة عبر المراحل الثلاث بنجاح!',
      fr: 'A accompli l’aventure complète Pré-vol, En vol et Post-vol !',
    },
    stage: 'ALL',
  },
];
