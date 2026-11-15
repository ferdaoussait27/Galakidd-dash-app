import type { Language } from '../types/galakidd';

export interface QuizQuestion {
  id: string;
  difficulty: 1 | 2 | 3;
  question: Record<Language, string>;
  options: Record<Language, [string, string, string, string]>;
  correctIndex: number;
  correctExplanation: Record<Language, string>;
  optionExplanations: Record<Language, [string, string, string, string]>;
  scienceConcept: Record<Language, string>;
}

export const QUIZ_BANK: Record<string, QuizQuestion> = {
  q_suit_1: {
    id: 'q_suit_1',
    difficulty: 1,
    question: {
      en: 'Why does an astronaut’s spacewalk helmet have a thin gold-coated visor?',
      ar: 'لماذا تحتوي خوذة السير في الفضاء على واقٍ زجاجي مطلي بطبقة ذهبية رقيقة؟',
      fr: 'Pourquoi le casque de sortie spatiale possède-t-il une fine visière dorée ?',
    },
    options: {
      en: [
        'To look stylish in space photos',
        'To reflect blinding sunlight and harmful radiation',
        'To magnify distant stars like a telescope',
        'To keep rain off the helmet glass',
      ],
      ar: [
        'ليبدو مظهر الرائد أنيقاً في الصور',
        'لعكس ضوء الشمس الشديد والإشعاعات الضارة',
        'لتكبير النجوم البعيدة مثل التلسكوب',
        'لحماية الزجاج من المطر',
      ],
      fr: [
        'Pour être élégant sur les photos spatiales',
        'Pour réfléchir la lumière solaire intense et les radiations nocives',
        'Pour grossir les étoiles comme un télescope',
        'Pour protéger le casque de la pluie',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'In space there is no atmosphere to filter sunlight. The thin gold coating acts like super sunglasses, reflecting intense solar glare and infrared/UV radiation while still letting the astronaut see clearly.',
      ar: 'في الفضاء لا يوجد غلاف جوي يرشّح أشعة الشمس، فتعمل طبقة الذهب الرقيقة كنظارة شمسية فائقة تعكس الوهج الشديد والأشعة الضارة مع السماح بالرؤية بوضوح.',
      fr: 'Dans l’espace, aucune atmosphère ne filtre le Soleil. La fine couche d’or réfléchit l’éblouissement solaire et les radiations nocives tout en laissant voir clairement.',
    },
    optionExplanations: {
      en: [
        'Gold is chosen for engineering safety, not decoration.',
        'Correct! Gold reflects harsh sunlight and radiation.',
        'The visor is flat/curved clear polycarbonate, not a magnifying lens.',
        'There is no weather or rain in the vacuum of space!',
      ],
      ar: [
        'يُستخدم الذهب لأسباب هندسية وقائية وليس للزينة.',
        'صحيح! الذهب يعكس أشعة الشمس الحادة والإشعاعات.',
        'الواقي لا يعمل كعدسة مكبرة مثل التلسكوب.',
        'لا توجد أمطار أو طقس في فراغ الفضاء!',
      ],
      fr: [
        'L’or est choisi pour la sécurité, pas pour l’esthétique.',
        'Exact ! L’or réfléchit la lumière intense et les radiations.',
        'La visière n’est pas une lentille grossissante.',
        'Il n’y a ni pluie ni météo dans le vide spatial !',
      ],
    },
    scienceConcept: {
      en: 'Electromagnetic Radiation & Thermal Protection',
      ar: 'الإشعاع الكهرومغناطيسي والحماية الحرارية',
      fr: 'Rayonnement solaire et protection thermique',
    },
  },
  q_training_1: {
    id: 'q_training_1',
    difficulty: 1,
    question: {
      en: 'Why do astronauts practice spacewalk repairs inside a giant swimming pool on Earth?',
      ar: 'لماذا يتدرب رواد الفضاء على إصلاح الأعطال داخل حوض سباحة ضخم على الأرض؟',
      fr: 'Pourquoi les astronautes s’entraînent-ils dans une grande piscine sur Terre ?',
    },
    options: {
      en: [
        'To wash dust off their spacesuits',
        'Because water buoyancy helps simulate floating in microgravity',
        'To practice swimming between rockets',
        'Because space is filled with liquid water',
      ],
      ar: [
        'لغسل الغبار عن بدلات الفضاء',
        'لأن طفو الماء يحاكي الشعور بالطفو في الجاذبية الصغرى',
        'للتدرب على السباحة بين الصواريخ',
        'لأن الفضاء مليء بالماء السائل',
      ],
      fr: [
        'Pour nettoyer leurs combinaisons',
        'Parce que la flottabilité de l’eau simule l’apesanteur',
        'Pour apprendre à nager entre les fusées',
        'Parce que l’espace est rempli d’eau liquide',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'In NASA’s Neutral Buoyancy Laboratory, weights and floats balance the astronaut’s suit underwater so they neither sink nor float up—closely mimicking how tools and bodies behave in microgravity.',
      ar: 'في مختبر الطفو المحايد التابع لناسا، تُضبط الأوزان ليطفو الرائد في منتصف الماء دون غرق أو صعود، مما يحاكي بدقة الحركة في الجاذبية الصغرى.',
      fr: 'Au laboratoire de flottabilité neutre, des flotteurs équilibrent la combinaison sous l’eau pour reproduire les mouvements en micropesanteur.',
    },
    optionExplanations: {
      en: [
        'Suits are maintained in cleanrooms, not washed in pools.',
        'Correct! Neutral buoyancy mimics weightlessness for hours of practice.',
        'Astronauts move using handrails, not swimming strokes.',
        'Outer space is a near-perfect vacuum, not liquid water.',
      ],
      ar: [
        'تُصان البدلات في غرف معقمة وليس بغسلها في المسبح.',
        'صحيح! الطفو المحايد يحاكي انعدام الوزن للتدريب الواقعي.',
        'يتحرك الرواد في الفضاء بالتمسك بالمقابض لا بالسباحة.',
        'الفضاء الخارجي فراغ وليس ماءً سائلاً.',
      ],
      fr: [
        'Les combinaisons sont entretenues en salle blanche.',
        'Exact ! La flottabilité neutre imite l’apesanteur.',
        'En sortie spatiale, on se déplace avec des poignées, sans nager.',
        'L’espace est un vide presque total.',
      ],
    },
    scienceConcept: {
      en: 'Buoyancy & Microgravity Simulation',
      ar: 'الطفو المحايد ومحاكاة الجاذبية الصغرى',
      fr: 'Flottabilité neutre et simulation d’apesanteur',
    },
  },
  q_food_1: {
    id: 'q_food_1',
    difficulty: 1,
    question: {
      en: 'Why do astronauts eat tortillas instead of regular crumbly bread on the Space Station?',
      ar: 'لماذا يفضّل رواد الفضاء خبز التورتيلا بدلاً من الخبز العادي في المحطة؟',
      fr: 'Pourquoi les astronautes préfèrent-ils les tortillas au pain normal dans l’ISS ?',
    },
    options: {
      en: [
        'Bread turns blue in zero gravity',
        'Floating crumbs can get into eyes or clog air vents and electronics',
        'Tortillas make the rocket fly faster',
        'Regular bread weighs 100 kilograms in orbit',
      ],
      ar: [
        'يتحول لون الخبز إلى الأزرق في الفضاء',
        'الفتات الطافي قد يدخل العيون أو يسد فتحات الهواء والأجهزة',
        'التورتيلا تجعل الصاروخ يطير أسرع',
        'وزن الخبز العادي يصبح ١٠٠ كجم في المدار',
      ],
      fr: [
        'Le pain devient bleu en apesanteur',
        'Les miettes flottantes peuvent gêner les yeux et boucher les filtres',
        'Les tortillas font voler la fusée plus vite',
        'Le pain pèse 100 kg en orbite',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'In microgravity, crumbs do not fall to the floor! They float everywhere and can irritate astronauts’ eyes or get pulled into sensitive ventilation filters and electronics.',
      ar: 'في انعدام الجاذبية لا يسقط الفتات على الأرض، بل يطفو في كل مكان وقد يؤذي العيون أو ينسحب داخل مرشحات الهواء والأجهزة الحساسة.',
      fr: 'En micropesanteur, les miettes ne tombent pas au sol : elles flottent et risquent d’entrer dans les yeux ou les ventilateurs.',
    },
    optionExplanations: {
      en: [
        'Bread color does not change in microgravity.',
        'Correct! Low-crumb tortillas keep cabin air and equipment safe.',
        'Food inside the cabin doesn’t propel the spacecraft.',
        'Mass stays the same; weight actually drops to near zero in orbit.',
      ],
      ar: [
        'لا يتغير لون الخبز بسبب انعدام الجاذبية.',
        'صحيح! التورتيلا تحمي هواء المقصورة والمعدات من الفتات.',
        'الطعام داخل المقصورة لا يؤثر على سرعة المركبة.',
        'الكتلة لا تزيد بل ينعدم الوزن الظاهري في المدار.',
      ],
      fr: [
        'La couleur du pain ne change pas en orbite.',
        'Exact ! Les tortillas sans miettes protègent l’équipage et les filtres.',
        'La nourriture ne propulse pas la fusée.',
        'La masse reste identique ; le poids apparent est nul en orbite.',
      ],
    },
    scienceConcept: {
      en: 'Microgravity Particle Control & Space Nutrition',
      ar: 'التحكم بالجسيمات في الجاذبية الصغرى',
      fr: 'Gestion des particules en micropesanteur',
    },
  },
  q_oxywater_1: {
    id: 'q_oxywater_1',
    difficulty: 1,
    question: {
      en: 'What gas must spacecraft scrubbers continuously remove from cabin air so astronauts stay healthy?',
      ar: 'ما الغاز الذي يجب على منقيات الهواء إزالته باستمرار من مقصورة المركبة للحفاظ على صحة الرواد؟',
      fr: 'Quel gaz les filtres du vaisseau doivent-ils éliminer en continu de l’air cabine ?',
    },
    options: {
      en: ['Oxygen (O₂)', 'Carbon dioxide (CO₂)', 'Water vapor', 'Helium'],
      ar: ['الأكسجين (O₂)', 'ثاني أكسيد الكربون (CO₂)', 'بخار الماء', 'الهيليوم'],
      fr: ['Oxygène (O₂)', 'Dioxyde de carbone (CO₂)', 'Vapeur d’eau', 'Hélium'],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'Every time we breathe out, our lungs release carbon dioxide (CO₂). In a sealed spacecraft, too much CO₂ makes astronauts dizzy and unwell, so scrubbers capture it continuously.',
      ar: 'في كل مرة نزفر فيها نُخرج غاز ثاني أكسيد الكربون. داخل مركبة مغلقة، تراكمه يسبب الدوار والخطر، لذا تلتقطه المنقيات باستمرار.',
      fr: 'À chaque expiration, nous rejetons du CO₂. Dans un vaisseau fermé, son accumulation est dangereuse : les filtres le capturent en permanence.',
    },
    optionExplanations: {
      en: [
        'Astronauts need oxygen to breathe—we add oxygen, not remove it!',
        'Correct! Exhaled CO₂ must be scrubbed from closed cabin air.',
        'Excess humidity is collected and recycled into drinking water, though CO₂ is the toxic gas to scrub.',
        'Helium is not produced by human breathing.',
      ],
      ar: [
        'الأكسجين ضروري للتنفس، نحن ننتجه ولا نزيله!',
        'صحيح! يجب إزالة ثاني أكسيد الكربون الناتج عن التنفس.',
        'رطوبة الهواء تُجمع وتُعاد تدويرها كماء شرب، لكن الخطر التنفسي هو تراكم CO₂.',
        'الإنسان لا يزفر غاز الهيليوم.',
      ],
      fr: [
        'Nous avons besoin d’oxygène pour vivre, on ne l’élimine pas !',
        'Exact ! Le CO₂ expiré doit être capturé dans un air confiné.',
        'La vapeur d’eau est récupérée pour le recyclage, mais le gaz toxique à filtrer est le CO₂.',
        'Les humains n’expirent pas d’hélium.',
      ],
    },
    scienceConcept: {
      en: 'Closed-Loop Atmospheric Control',
      ar: 'التحكم بالغلاف الجوي المغلق',
      fr: 'Contrôle atmosphérique en circuit fermé',
    },
  },
  q_safety_1: {
    id: 'q_safety_1',
    difficulty: 1,
    question: {
      en: 'Why do smoke and hot air behave differently during a fire drill in microgravity?',
      ar: 'لماذا يتصرف الدخان والهواء الساخن بشكل مختلف أثناء تدريبات الحريق في الجاذبية الصغرى؟',
      fr: 'Pourquoi la fumée se comporte-t-elle différemment en micropesanteur ?',
    },
    options: {
      en: [
        'Hot air does not rise upward, so smoke spreads in all directions',
        'Smoke immediately freezes into ice crystals',
        'Smoke sinks straight to the bottom wall',
        'Fire turns invisible only on Tuesdays',
      ],
      ar: [
        'الهواء الساخن لا يرتفع للأعلى، فيتوزع الدخان في كل الاتجاهات',
        'يتجمد الدخان فوراً إلى بلورات ثلجية',
        'يهبط الدخان مباشرة إلى الجدار السفلي',
        'النار تصبح غير مرئية',
      ],
      fr: [
        'L’air chaud ne monte pas, donc la fumée se répand partout',
        'La fumée gèle instantanément en cristaux de glace',
        'La fumée coule tout droit vers le plancher',
        'Le feu devient invisible',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'On Earth, warm air rises because gravity pulls cooler, denser air down (convection). Without gravity’s pull, hot air and smoke drift outward in all directions, so airflow sensors detect them.',
      ar: 'على الأرض يرتفع الهواء الساخن بسبب الحمل الحراري المرتبط بالجاذبية. في غياب الوزن الظاهري، ينتشر الدخان في جميع الاتجاهات وتلتقطه أجهزة الاستشعار المرتبطة بالمراوح.',
      fr: 'Sur Terre, l’air chaud monte par convection grâce à la gravité. Sans elle, la fumée s’étend dans toutes les directions vers les capteurs.',
    },
    optionExplanations: {
      en: [
        'Correct! Without buoyancy-driven convection, smoke spreads radially.',
        'Fire produces heat, so smoke does not freeze into ice.',
        'Nothing sinks "down" because there is no up or down in microgravity.',
        'Flames are still visible (often as small blue spheres in microgravity).',
      ],
      ar: [
        'صحيح! بدون الجاذبية لا يوجد حمل حراري يرفع الدخان للأعلى.',
        'الدخان ساخن ولا يتجمد إلى ثلج.',
        'لا يسقط الدخان للأسفل لعدم وجود أعلى وأسفل في المدار.',
        'اللهب يظل مرئياً ويشكّل كرة زرقاء صغيرة في المدار.',
      ],
      fr: [
        'Exact ! Sans convection gravitationnelle, la fumée se disperse partout.',
        'La fumée chaude ne se transforme pas en glace.',
        'Il n’y a ni haut ni bas en orbite.',
        'Les flammes restent visibles (souvent sous forme de petites sphères bleues).',
      ],
    },
    scienceConcept: {
      en: 'Convection & Spacecraft Fire Safety',
      ar: 'الحمل الحراري والسلامة من الحرائق',
      fr: 'Convection et sécurité incendie spatiale',
    },
  },
  q_checklist_1: {
    id: 'q_checklist_1',
    difficulty: 1,
    question: {
      en: 'How fast must a rocket travel to stay in orbit around Earth at Space Station altitude (~408 km)?',
      ar: 'ما السرعة التي يحتاجها الصاروخ للبقاء في مدار حول الأرض على ارتفاع المحطة (~٤٠٨ كم)؟',
      fr: 'À quelle vitesse doit voyager un vaisseau pour rester en orbite vers 408 km d’altitude ?',
    },
    options: {
      en: [
        'About 100 km/h (like a highway car)',
        'About 28,000 km/h (7.66 km/s)',
        'About 500 km/h (like a propeller plane)',
        '0 km/h (rockets hover completely still)',
      ],
      ar: [
        'نحو ١٠٠ كم/ساعة (مثل السيارة)',
        'نحو ٢٨,٠٠٠ كم/ساعة (٧.٦٦ كم/ثانية)',
        'نحو ٥٠٠ كم/ساعة (مثل الطائرة المروحية)',
        '٠ كم/ساعة (تقف ساكنة في السماء)',
      ],
      fr: [
        'Environ 100 km/h (comme une voiture)',
        'Environ 28 000 km/h (7,66 km/s)',
        'Environ 500 km/h (comme un avion à hélices)',
        '0 km/h (la station reste immobile)',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'Orbiting is like falling toward Earth while moving sideways so fast (~28,000 km/h) that Earth’s curved surface drops away beneath you at the exact same rate!',
      ar: 'الدوران في المدار يشبه السقوط نحو الأرض مع حركة جانبية فائقة السرعة (~٢٨,٠٠٠ كم/ساعة) تجعل انحناء الأرض يبتعد تحتك بنفس معدل سقوطك!',
      fr: 'Être en orbite, c’est tomber vers la Terre tout en avançant latéralement si vite (~28 000 km/h) que la courbure de la Terre s’éloigne au même rythme !',
    },
    optionExplanations: {
      en: [
        'At 100 km/h, gravity would pull the rocket straight back down in seconds.',
        'Correct! Orbital velocity at ISS altitude is ~7.66 km/s (~28,000 km/h).',
        'Airplanes need air for lift and move far too slowly to stay in orbit.',
        'Without huge sideways speed, gravity pulls any spacecraft right back to Earth.',
      ],
      ar: [
        'بسرعة ١٠٠ كم/س ستسحب الجاذبية الصاروخ للأرض فوراً.',
        'صحيح! السرعة المدارية تبلغ نحو ٢٨,٠٠٠ كم/ساعة.',
        'هذه السرعة أبطأ بكثير من السرعة اللازمة للبقاء في المدار.',
        'إذا توقفت المركبة عن الحركة الجانبية فستسقط نحو الأرض فوراً.',
      ],
      fr: [
        'À 100 km/h, la gravité ferait retomber la fusée immédiatement.',
        'Exact ! La vitesse orbitale est d’environ 28 000 km/h.',
        'C’est beaucoup trop lent pour compenser la gravité.',
        'Sans grande vitesse latérale, le vaisseau retomberait sur Terre.',
      ],
    },
    scienceConcept: {
      en: 'Orbital Velocity & Free Fall',
      ar: 'السرعة المدارية والسقوط الحر',
      fr: 'Vitesse orbitale et chute libre',
    },
  },
  q_sleep_1: {
    id: 'q_sleep_1',
    difficulty: 2,
    question: {
      en: 'Why must astronauts turn on a quiet ventilation fan next to their head while sleeping?',
      ar: 'لماذا يجب تشغيل مروحة تهوية هادئة بجانب رأس رائد الفضاء أثناء النوم؟',
      fr: 'Pourquoi les astronautes allument-ils un ventilateur près de leur tête pour dormir ?',
    },
    options: {
      en: [
        'To prevent exhaled carbon dioxide from pooling in a bubble around their face',
        'To blow the Space Station faster around Earth',
        'To keep snow from falling inside the cabin',
        'Because sleeping bags overheat without wind turbines',
      ],
      ar: [
        'لمنع تجمع غاز ثاني أكسيد الكربون الناتج عن الزفير حول الوجه',
        'لدفع محطة الفضاء بسرعة أكبر حول الأرض',
        'لمنع تساقط الثلج داخل المقصورة',
        'لأن أكياس النوم تعمل بتوربينات الرياح',
      ],
      fr: [
        'Pour éviter que le CO₂ expiré forme une bulle autour de leur visage',
        'Pour propulser l’ISS plus vite autour de la Terre',
        'Pour empêcher la neige de tomber dans la cabine',
        'Parce que les sacs de couchage ont besoin de vent',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'On Earth, warm breath rises away from your face. In microgravity, exhaled CO₂ stays right where you breathed it out unless fans gently circulate fresh cabin air.',
      ar: 'على الأرض يرتفع هواء الزفير الدافئ بعيداً عن وجهك. في انعدام الجاذبية يبقى حول رأسك ما لم تحركه المراوح وتجلب هواءً متجدداً.',
      fr: 'Sans convection en micropesanteur, l’air expiré reste autour du visage si les ventilateurs ne font pas circuler l’air.',
    },
    optionExplanations: {
      en: [
        'Correct! Airflow clears exhaled CO₂ bubbles in microgravity.',
        'Internal cabin fans cannot push the spacecraft forward.',
        'Station temperature is climate-controlled; there is no snow inside.',
        'Fans circulate air for breathing safety, not to power sleeping bags.',
      ],
      ar: [
        'صحيح! تدفق الهواء يبعد فقاعة ثاني أكسيد الكربون عن الوجه.',
        'المراوح الداخلية لا تدفع المحطة في الفضاء.',
        'درجة حرارة المحطة معتدلة ولا يتكون ثلج بداخلها.',
        'الهدف الرئيسي هو تجديد هواء التنفس.',
      ],
      fr: [
        'Exact ! La ventilation disperse le CO₂ expiré.',
        'Un ventilateur interne ne déplace pas la station.',
        'La température intérieure est contrôlée, sans neige.',
        'Le rôle essentiel est de renouveler l’air respiré.',
      ],
    },
    scienceConcept: {
      en: 'Air Circulation in Microgravity',
      ar: 'تدوير الهواء في الجاذبية الصغرى',
      fr: 'Circulation de l’air en micropesanteur',
    },
  },
  q_eat_1: {
    id: 'q_eat_1',
    difficulty: 2,
    question: {
      en: 'What shape does a drop of water naturally form when released in microgravity?',
      ar: 'ما الشكل الذي تتخذه قطرة الماء تلقائياً عند تركها تطفو في الجاذبية الصغرى؟',
      fr: 'Quelle forme prend naturellement une goutte d’eau libre en micropesanteur ?',
    },
    options: {
      en: ['A flat pancake', 'A round sphere', 'A sharp cube', 'A tall triangle'],
      ar: ['قرص مسطح', 'كرة مستديرة', 'مكعب حاد', 'مثلث طويل'],
      fr: ['Une crêpe plate', 'Une sphère ronde', 'Un cube pointu', 'Un long triangle'],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'Water molecules attract one another equally in every direction (surface tension). Without gravity squashing the drop flat, surface tension pulls it into a neat sphere!',
      ar: 'تتجاذب جزيئات الماء في كل الاتجاهات بالتساوي (التوتر السطحي). وبدون الجاذبية التي تسطّحها، تتكور القطرة لتصبح كرة مثالية!',
      fr: 'Les molécules d’eau s’attirent dans toutes les directions (tension superficielle) : sans gravité pour l’aplatir, la goutte devient sphérique !',
    },
    optionExplanations: {
      en: [
        'Water flattens into puddles on Earth because gravity pulls it down.',
        'Correct! Surface tension pulls free-floating liquids into spheres.',
        'Liquids don’t have rigid crystal faces like cubes.',
        'Surface tension minimizes surface area into a sphere, not a triangle.',
      ],
      ar: [
        'تتسطح المياه على الأرض بسبب سحب الجاذبية.',
        'صحيح! التوتر السطحي يجمع السائل في شكل كرة.',
        'السوائل لا تشكل حوافاً مكعبة صلبة.',
        'الشكل ذو أقل مساحة سطح هو الكرة وليس المثلث.',
      ],
      fr: [
        'Sur Terre, la gravité aplatit l’eau en flaque.',
        'Exact ! La tension superficielle forme une sphère.',
        'Un liquide ne forme pas d’arêtes cubiques.',
        'Une sphère minimise la surface, pas un triangle.',
      ],
    },
    scienceConcept: {
      en: 'Surface Tension in Microgravity',
      ar: 'التوتر السطحي في الجاذبية الصغرى',
      fr: 'Tension superficielle en apesanteur',
    },
  },
  q_exercise_1: {
    id: 'q_exercise_1',
    difficulty: 2,
    question: {
      en: 'Why must astronauts exercise for about 2 hours every day aboard the Space Station?',
      ar: 'لماذا يجب على رواد الفضاء ممارسة الرياضة لنحو ساعتين يومياً على متن المحطة؟',
      fr: 'Pourquoi les astronautes doivent-ils faire environ 2 heures de sport par jour ?',
    },
    options: {
      en: [
        'To generate electricity to run the lights',
        'Because without gravity’s load, muscles weaken and bones lose density',
        'To make the space station heavier',
        'Because jumping makes them reach the Moon faster',
      ],
      ar: [
        'لتوليد الكهرباء لإضاءة المحطة',
        'لأنه بدون مقاومة الجاذبية تضعف العضلات وتقل كثافة العظام',
        'لجعل محطة الفضاء أثقل وزناً',
        'لأن القفز يجعلهم يصلون للقمر أسرع',
      ],
      fr: [
        'Pour produire l’électricité de l’éclairage',
        'Car sans gravité, les muscles s’affaiblissent et les os perdent en densité',
        'Pour alourdir la station spatiale',
        'Pour sauter jusqu’à la Lune',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'Every step on Earth challenges your bones and muscles against gravity. In microgravity, your body stops getting that workout unless you use resistance machines and harnessed treadmills.',
      ar: 'كل خطوة على الأرض تقوّي عظامك وعضلاتك بمقاومة الجاذبية. في المدار يفقد الجسم هذا التحدي الطبيعي فتضعف العظام والعضلات دون تمارين مقاومة يومية.',
      fr: 'Sur Terre, la gravité stimule os et muscles. En apesanteur, il faut s’entraîner chaque jour pour éviter la fonte musculaire et osseuse.',
    },
    optionExplanations: {
      en: [
        'The ISS gets its electrical power from huge solar arrays.',
        'Correct! Daily exercise protects bone mineral density and muscle strength.',
        'Exercise does not increase spacecraft mass.',
        'The ISS stays in Earth orbit and does not travel to the Moon.',
      ],
      ar: [
        'تستمد المحطة كهرباءها من الألواح الشمسية الضخمة.',
        'صحيح! التمارين اليومية تحمي العظام والعضلات من الضعف.',
        'التمرين لا يزيد كتلة المركبة.',
        'المحطة تدور حول الأرض ولا تتجه إلى القمر.',
      ],
      fr: [
        'L’ISS est alimentée par ses grands panneaux solaires.',
        'Exact ! Le sport protège la densité osseuse et les muscles.',
        'Faire du sport ne change pas la masse de la station.',
        'L’ISS reste en orbite autour de la Terre.',
      ],
    },
    scienceConcept: {
      en: 'Human Physiology in Microgravity',
      ar: 'فسيولوجيا الإنسان في الفضاء',
      fr: 'Physiologie humaine en micropesanteur',
    },
  },
  q_oxygen_1: {
    id: 'q_oxygen_1',
    difficulty: 2,
    question: {
      en: 'How does the Space Station’s Oxygen Generation System create fresh oxygen gas (O₂)?',
      ar: 'كيف ينتج نظام توليد الأكسجين في المحطة غاز الأكسجين النقي (O₂)؟',
      fr: 'Comment le système de l’ISS fabrique-t-il du gaz oxygène (O₂) ?',
    },
    options: {
      en: [
        'By opening windows to scoop air from outer space',
        'By using electricity to split water molecules (H₂O) into hydrogen and oxygen',
        'By melting moon rocks into oxygen',
        'By burning wood inside the lab',
      ],
      ar: [
        'بفتح النوافذ لإدخال الهواء من الفضاء الخارجي',
        'باستخدام الكهرباء لفصل جزيئات الماء (H₂O) إلى هيدروجين وأكسجين',
        'بصهر صخور القمر وتحويلها لأكسجين',
        'بإشعال الحطب داخل المختبر',
      ],
      fr: [
        'En ouvrant les fenêtres pour capter l’air de l’espace',
        'En utilisant l’électricité pour séparer l’eau (H₂O) en hydrogène et oxygène',
        'En faisant fondre des roches lunaires',
        'En brûlant du bois dans le laboratoire',
      ],
    },
    correctIndex: 1,
    correctExplanation: {
      en: 'Electrolysis passes electric current from the solar arrays through water (H₂O), splitting it into breathable oxygen (O₂) for the crew and hydrogen gas (H₂).',
      ar: 'يمرّر التحليل الكهربائي تياراً من الألواح الشمسية عبر الماء (H₂O) ليفصله إلى أكسجين (O₂) يتنفسه الطاقم وهيدروجين.',
      fr: 'L’électrolyse utilise l’électricité solaire pour décomposer l’eau (H₂O) en oxygène respirable (O₂) et en hydrogène.',
    },
    optionExplanations: {
      en: [
        'Outer space is a vacuum with no breathable air!',
        'Correct! Electrolysis splits H₂O into O₂ and H₂.',
        'The ISS does not mine Moon rocks.',
        'Burning consumes oxygen and is dangerous inside a spacecraft.',
      ],
      ar: [
        'الفضاء الخارجي فراغ لا يحتوي على هواء للتنفس!',
        'صحيح! التحليل الكهربائي يفصل الماء إلى أكسجين وهيدروجين.',
        'لا توجد صخور قمرية تُصهر على المحطة.',
        'الاحتراق يستهلك الأكسجين ويشكل خطراً داخل المركبة.',
      ],
      fr: [
        'L’espace est un vide sans air respirable !',
        'Exact ! L’électrolyse sépare H₂O en O₂ et H₂.',
        'L’ISS ne fait pas fondre de roches lunaires.',
        'Brûler consommerait l’oxygène et serait très dangereux.',
      ],
    },
    scienceConcept: {
      en: 'Water Electrolysis Chemistry',
      ar: 'كيمياء التحليل الكهربائي للماء',
      fr: 'Électrolyse de l’eau',
    },
  },
  q_water_1: {
    id: 'q_water_1',
    difficulty: 2,
    question: {
      en: 'Roughly what percentage of water is NASA’s Space Station system able to recycle and reuse?',
      ar: 'ما النسبة التقريبية للمياه التي ينجح نظام محطة الفضاء الدولية في إعادة تدويرها؟',
      fr: 'Quel pourcentage d’eau environ le système de l’ISS réussit-il à recycler ?',
    },
    options: {
      en: ['About 10%', 'About 35%', 'Up to ~98%', '0% (all water is thrown away)'],
      ar: ['نحو ١٠٪', 'نحو ٣٥٪', 'تصل إلى ٩٨٪ تقريباً', '٠٪ (تُرمى كل المياه)'],
      fr: ['Environ 10 %', 'Environ 35 %', 'Jusqu’à ~98 %', '0 % (toute l’eau est jetée)'],
    },
    correctIndex: 2,
    correctExplanation: {
      en: 'NASA’s Water Recovery System captures cabin humidity (from breath and sweat) and wastewater, purifying up to ~98% into ultra-clean drinking water!',
      ar: 'يجمع نظام استعادة المياه رطوبة المقصورة ومياه الصرف وينقّي ما يصل إلى ٩٨٪ منها لتعود مياه شرب نقية جداً!',
      fr: 'Le système WRS de la NASA récupère l’humidité de l’air et les eaux usées pour recycler jusqu’à ~98 % d’eau potable !',
    },
    optionExplanations: {
      en: [
        '10% would require launching thousands of extra liters on rockets.',
        '35% is far below what modern closed-loop life support achieves.',
        'Correct! Up to ~98% water recovery reduces costly cargo launches.',
        'Throwing water away would make long space missions impossible.',
      ],
      ar: [
        'نسبة ١٠٪ تعني الحاجة لإطلاق آلاف اللترات المكلفة بالصواريخ.',
        'نسبة ٣٥٪ أقل بكثير مما تحققه أنظمة دعم الحياة الحديثة.',
        'صحيح! استعادة حتى ٩٨٪ توفر تكاليف الشحن الفضائي.',
        'التخلص من الماء يجعل البقاء الطويل في الفضاء مستحيلاً.',
      ],
      fr: [
        '10 % obligerait à lancer beaucoup trop d’eau par fusée.',
        '35 % est bien inférieur aux performances réelles de l’ISS.',
        'Exact ! Environ 98 % de récupération permet de vivre en orbite.',
        'Jeter toute l’eau rendrait les missions impossibles.',
      ],
    },
    scienceConcept: {
      en: 'Closed-Loop Water Conservation',
      ar: 'الحفاظ على المياه في الدائرة المغلقة',
      fr: 'Recyclage de l’eau en boucle fermée',
    },
  },
  q_waste_1: {
    id: 'q_waste_1',
    difficulty: 2,
    question: {
      en: 'How do space station toilets work when there is no gravity to pull waste downward?',
      ar: 'كيف تعمل مراحيض محطة الفضاء عند عدم وجود جاذبية لسحب الفضلات للأسفل؟',
      fr: 'Comment fonctionnent les toilettes spatiales sans gravité pour attirer vers le bas ?',
    },
    options: {
      en: [
        'They use gentle airflow suction instead of gravity',
        'They open a hatch directly into open space during use',
        'They use giant magnets',
        'Astronauts hold their breath for 6 months',
      ],
      ar: [
        'تستخدم شفطاً لطيفاً بتيار الهواء بدلاً من الجاذبية',
        'تفتح كوّة مباشرة نحو الفضاء أثناء الاستخدام',
        'تستخدم مغناطيسات عملاقة',
        'يمتنع الرواد عن دخول الحمام لمدة ٦ أشهر',
      ],
      fr: [
        'Elles utilisent une aspiration d’air douce au lieu de la gravité',
        'Elles ouvrent une trappe directement sur le vide spatial',
        'Elles utilisent des aimants géants',
        'Les astronautes se retiennent pendant 6 mois',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Space toilets use controlled airflow suction to pull liquid and solid waste cleanly into separate sealed containers—liquid is recycled into water, and solid waste is sealed for cargo disposal.',
      ar: 'تعتمد مراحيض الفضاء على تيار هواء شفاط لطيف لتوجيه السوائل والمخلفات الصلبة إلى حاويات مغلقة؛ يُعاد تدوير السائل وتُغلق المخلفات الصلبة لشحنها.',
      fr: 'Les toilettes spatiales utilisent un flux d’air aspirant vers des réservoirs fermés : les liquides sont recyclés et les solides scellés.',
    },
    optionExplanations: {
      en: [
        'Correct! Suction airflow replaces gravity in microgravity plumbing.',
        'Opening the cabin to vacuum would depressurize the entire station!',
        'Biological waste and water are not magnetic.',
        'Humans need healthy daily routines in space just like on Earth!',
      ],
      ar: [
        'صحيح! تيار الهواء الشفاط يعوّض غياب الجاذبية.',
        'فتح الكوة نحو الفراغ سيفقد المحطة ضغطها الهوائي فوراً!',
        'المواد الحيوية والماء لا تنجذب للمغناطيس.',
        'يحتاج الإنسان لقضاء حاجته بانتظام لصحة سليمة.',
      ],
      fr: [
        'Exact ! Le flux d’air remplace la gravité.',
        'Ouvrir sur le vide viderait tout l’air de la station !',
        'Les déchets organiques ne sont pas magnétiques.',
        'Le corps humain fonctionne chaque jour en orbite comme sur Terre.',
      ],
    },
    scienceConcept: {
      en: 'Airflow Containment in Microgravity',
      ar: 'الاحتواء بتدفق الهواء',
      fr: 'Confinement par flux d’air',
    },
  },
  q_comms_1: {
    id: 'q_comms_1',
    difficulty: 2,
    question: {
      en: 'Why is there a noticeable delay of several minutes when sending a radio message to Mars, compared to less than 1 second for the ISS?',
      ar: 'لماذا يستغرق إرسال رسالة لاسلكية إلى المريخ عدة دقائق بينما يصل للمحطة الدولية في أقل من ثانية؟',
      fr: 'Pourquoi un message radio vers Mars prend-il plusieurs minutes contre moins d’une seconde pour l’ISS ?',
    },
    options: {
      en: [
        'Mars is hundreds of thousands of times farther away, and radio waves have a top speed (the speed of light)',
        'Radio waves get tired and slow down halfway to Mars',
        'Sound travels faster through Mars dust',
        'Space Station astronauts type faster',
      ],
      ar: [
        'المريخ أبعد بمئات الآلاف من المرات، وموجات الراديو تسير بسرعة قصوى ثابتة هي سرعة الضوء',
        'تتعب موجات الراديو وتبطؤ في منتصف الطريق',
        'الصوت ينتقل أسرع في غبار المريخ',
        'رواد المحطة يكتبون أسرع على لوحة المفاتيح',
      ],
      fr: [
        'Mars est infiniment plus loin et les ondes radio voyagent à une vitesse maximale : celle de la lumière',
        'Les ondes radio se fatiguent et ralentissent en chemin',
        'Le son voyage plus vite dans la poussière martienne',
        'Les astronautes de l’ISS tapent plus vite',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Radio signals travel at the speed of light (~300,000 km/s). Because the ISS is ~408 km away, signals bounce to satellites and back in under a second. Mars is 55 to 400 million km away, taking 3 to 22 minutes one way!',
      ar: 'تسير إشارات الراديو بسرعة الضوء (~٣٠٠,٠٠٠ كم/ث). المحطة تبعد ٤٠٨ كم فتصل الإشارة في أقل من ثانية، أما المريخ فيبعد عشرات أو مئات الملايين من الكيلومترات فتستغرق الإشارة ٣ إلى ٢٢ دقيقة!',
      fr: 'Les ondes radio avancent à ~300 000 km/s. L’ISS est très proche, mais Mars est à des millions de kilomètres : le signal met 3 à 22 minutes !',
    },
    optionExplanations: {
      en: [
        'Correct! Light speed is fast, yet cosmic distances are vast.',
        'Electromagnetic waves never tire or lose speed in a vacuum.',
        'Radio uses light waves, not sound waves (sound can’t travel through space vacuum).',
        'The delay comes from signal travel distance, not typing speed.',
      ],
      ar: [
        'صحيح! سرعة الضوء هائلة لكن المسافات الكونية شاسعة جداً.',
        'الموجات الكهرومغناطيسية لا تتعب ولا تتباطأ في الفراغ.',
        'الراديو موجات ضوئية غير مرئية وليس صوتاً (الصوت لا ينتقل في الفراغ).',
        'التأخير ناتج عن المسافة الفلكية وليس سرعة الكتابة.',
      ],
      fr: [
        'Exact ! Même à la vitesse de la lumière, les distances planétaires sont immenses.',
        'Les ondes ne se fatiguent jamais dans le vide.',
        'On utilise des ondes radio (lumière), car le son ne traverse pas le vide.',
        'Le délai vient de la distance astronomique.',
      ],
    },
    scienceConcept: {
      en: 'Speed of Light & Deep Space Communication Delay',
      ar: 'سرعة الضوء وتأخر الاتصالات الفضائية',
      fr: 'Vitesse de la lumière et délais spatiaux',
    },
  },
  q_earth_1: {
    id: 'q_earth_1',
    difficulty: 2,
    question: {
      en: 'When astronauts look out the ISS Cupola window, why is the thin blue line around Earth so important to study?',
      ar: 'عندما ينظر الرواد من نافذة القبة المدارية، لماذا يُعد الشريط الأزرق الرقيق حول الأرض مهماً جداً؟',
      fr: 'Depuis la Cupola, pourquoi la fine ligne bleue autour de la Terre est-elle si précieuse ?',
    },
    options: {
      en: [
        'It is Earth’s thin atmosphere that holds our air and shields life from harsh space radiation',
        'It is a giant blue ring of ice around the equator',
        'It is paint left on the Cupola glass',
        'It is the shadow of the Moon',
      ],
      ar: [
        'إنه الغلاف الجوي الرقيق الذي يحفظ هواءنا ويحمي الحياة من إشعاعات الفضاء',
        'إنه حزام عملاق من الجليد الأزرق حول خط الاستواء',
        'إنه طلاء أزرق على زجاج القبة',
        'إنه ظل القمر على المحيط',
      ],
      fr: [
        'C’est notre fine atmosphère qui retient l’air et protège la vie des radiations spatiales',
        'C’est un anneau de glace bleue autour de l’équateur',
        'C’est de la peinture sur la vitre de la Cupola',
        'C’est l’ombre de la Lune',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'That glowing blue edge is Earth’s atmosphere! Though it looks paper-thin from orbit, it contains the oxygen we breathe, regulates climate, and blocks harmful solar UV radiation.',
      ar: 'تلك الحافة الزرقاء المتوهجة هي غلاف الأرض الجوي! رغم أنه يبدو رقيقاً جداً من المدار، إلا أنه يضم الأكسجين الذي نتنفسه وينظم المناخ ويحمينا من الإشعاعات.',
      fr: 'Ce liseré bleu est notre atmosphère : elle retient l’air respirable, régule le climat et bloque les rayons ultraviolets.',
    },
    optionExplanations: {
      en: [
        'Correct! Blue light scatters in the thin atmospheric gases surrounding Earth.',
        'Earth does not have an equatorial ice ring like Saturn’s rings.',
        'Cupola windows are crystal-clear optical glass.',
        'The blue glow surrounds the entire sunlit limb of Earth.',
      ],
      ar: [
        'صحيح! تتشتت الموجات الزرقاء في غازات الغلاف الجوي الرقيق المحيط بالأرض.',
        'لا تمتلك الأرض حلقات جليدية مثل زحل.',
        'زجاج القبة شفاف تماماً ومصنوع للتصوير الدقيق.',
        'التوهج الأزرق يحيط بكوكب الأرض كله من الفضاء.',
      ],
      fr: [
        'Exact ! La lumière bleue est diffusée par les gaz de l’atmosphère.',
        'La Terre n’a pas d’anneaux de glace comme Saturne.',
        'Les hublots de la Cupola sont parfaitement transparents.',
        'Ce halo entoure toute la planète éclairée.',
      ],
    },
    scienceConcept: {
      en: 'Earth’s Atmosphere & Planetary Observation',
      ar: 'الغلاف الجوي ومراقبة كوكب الأرض',
      fr: 'Atmosphère terrestre et observation spatiale',
    },
  },
  q_emergency_1: {
    id: 'q_emergency_1',
    difficulty: 2,
    question: {
      en: 'In an orbital debris warning simulation, what is the standard precautionary action for the crew?',
      ar: 'في محاكاة تحذير اقتراب حطام مداري، ما الإجراء الاحترازي القياسي للطاقم؟',
      fr: 'Lors d’une alerte simulée de débris spatial proche, quelle est la précaution standard ?',
    },
    options: {
      en: [
        'Put on seatbelts inside the docked crew return spacecraft until the pass is clear',
        'Go outside on a spacewalk to catch the debris with a net',
        'Turn off all computers and sleep',
        'Open the airlock to let the debris pass through',
      ],
      ar: [
        'الانتقال إلى مركبة العودة الملتحمة وربط الأحزمة حتى يمر الخطر بسلام',
        'الخروج للسير في الفضاء لصيد الحطام بشبكة',
        'إطفاء جميع الحواسيب والنوم',
        'فتح غرفة معادلة الضغط ليمر الحطام داخل المحطة',
      ],
      fr: [
        'Se réfugier attaché dans le vaisseau de retour amarré jusqu’à la fin de l’alerte',
        'Sortir en scaphandre attraper le débris avec un filet',
        'Éteindre tous les ordinateurs et aller dormir',
        'Ouvrir le sas pour laisser passer le débris',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Wait calmly inside the docked crew capsule! That way, in the rare case a small piece of debris hits the station, the crew is already safely inside their lifeboat spacecraft ready to return if needed.',
      ar: 'الاحتماء بهدوء داخل مركبة العودة الملتحمة يضمن أن الطاقم داخل "قارب النجاة" الجاهز للانفصال والعودة للأرض إذا لزم الأمر.',
      fr: 'Attendre dans le vaisseau amarré place l’équipage dans son « canot de sauvetage », prêt à se détacher si nécessaire.',
    },
    optionExplanations: {
      en: [
        'Correct! Crew capsules act as lifeboats during debris conjunction alerts.',
        'Orbital debris travels at ~28,000 km/h—far too fast to approach safely.',
        'Mission Control and crews stay alert and monitor station telemetry.',
        'Opening an airlock would vent all cabin air into space.',
      ],
      ar: [
        'صحيح! كبسولة العودة تعمل كقارب نجاة احترازي.',
        'يسير الحطام الفضائي بسرعة ٢٨,٠٠٠ كم/س ولا يمكن الاقتراب منه.',
        'يبقى الطاقم متأهباً وعلى تواصل مستمر مع مركز التحكم.',
        'فتح الباب للخارج يفرّغ المحطة من الهواء.',
      ],
      fr: [
        'Exact ! La capsule sert de refuge sécurisé.',
        'Les débris filent à ~28 000 km/h : il est impossible de les attraper.',
        'L’équipage reste vigilant en liaison avec le contrôle au sol.',
        'Ouvrir le sas ferait fuir tout l’air de la station.',
      ],
    },
    scienceConcept: {
      en: 'Spacecraft Safety & Conjunction Precautions',
      ar: 'سلامة المركبة واحتياطات الحطام المداري',
      fr: 'Sécurité orbitale et précautions',
    },
  },
  q_return_1: {
    id: 'q_return_1',
    difficulty: 2,
    question: {
      en: 'Why must astronauts strap down every camera, tablet, and science box before undocking for Earth return?',
      ar: 'لماذا يجب تثبيت كل كاميرا وصندوق عينات بإحكام قبل الانفصال للعودة إلى الأرض؟',
      fr: 'Pourquoi faut-il sangler chaque caméra et boîte avant le retour sur Terre ?',
    },
    options: {
      en: [
        'Because strong braking forces during re-entry would turn loose objects into flying projectiles',
        'Because cameras shrink if they aren’t strapped down',
        'So the items float out the window',
        'Because Velcro stops working in space',
      ],
      ar: [
        'لأن قوى الكبح الشديدة أثناء العودة ستحوّل أي جسم غير مثبت إلى مقذوف طائر داخل الكبسولة',
        'لأن الكاميرات تنكمش إذا لم تُربط',
        'حتى لا تطير عبر النوافذ المفتوحة',
        'لأن الفيلكرو يتوقف عن العمل في الفضاء',
      ],
      fr: [
        'Car le freinage violent de la rentrée transformerait tout objet libre en projectile',
        'Parce que les caméras rétrécissent si on ne les attache pas',
        'Pour éviter qu’elles sortent par la fenêtre',
        'Parce que le Velcro ne marche pas dans l’espace',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'During re-entry, Earth’s atmosphere slows the capsule dramatically, creating up to 4g of deceleration. Anything loose would slam forward inside the cabin!',
      ar: 'أثناء اختراق الغلاف الجوي يبطئ الهواء الكبسولة بقوة تباطؤ تصل إلى 4g، مما يجعل أي جسم طليق يندفع بقوة خطرة داخل المقصورة.',
      fr: 'Lors de la rentrée, l’air freine la capsule jusqu’à 4g : tout objet non attaché serait projeté avec force.',
    },
    optionExplanations: {
      en: [
        'Correct! Deceleration during re-entry requires strict stowage.',
        'Equipment size never changes during re-entry.',
        'Capsule windows are permanently sealed.',
        'Velcro works great in orbit, though heavy loads need strong straps for 4g.',
      ],
      ar: [
        'صحيح! قوى التباطؤ تتطلب تثبيتاً محكماً لكل المعدات.',
        'لا يتغير حجم الأجهزة بسبب السفر الفضائي.',
        'نوافذ الكبسولة محكمة الإغلاق تماماً.',
        'الفيلكرو يعمل جيداً في المدار، لكن أحمال العودة تتطلب أحزمة قوية.',
      ],
      fr: [
        'Exact ! La décélération impose de tout arrimer solidement.',
        'La taille des objets ne change pas.',
        'Les hublots restent hermétiquement fermés.',
        'Le Velcro fonctionne très bien, mais les forces de 4g demandent des sangles.',
      ],
    },
    scienceConcept: {
      en: 'Inertia & Deceleration Forces',
      ar: 'القصور الذاتي وقوى التباطؤ',
      fr: 'Inertie et décélération',
    },
  },
  q_landing_prep_1: {
    id: 'q_landing_prep_1',
    difficulty: 3,
    question: {
      en: 'What protects a returning spacecraft from melting during fiery atmospheric re-entry at 1,650°C?',
      ar: 'ما الجزء الذي يحمي المركبة العائدة من الانصهار عند احتكاكها بالغلاف الجوي بحرارة ١٦٥٠ درجة مئوية؟',
      fr: 'Qu’est-ce qui protège la capsule contre les 1 650 °C de la rentrée atmosphérique ?',
    },
    options: {
      en: [
        'An ablative heat shield on the bottom of the capsule',
        'Giant ice cubes taped to the nose',
        'Opening the parachutes while still in outer space',
        'Turning on the cabin air conditioner to maximum',
      ],
      ar: [
        'درع حراري متآكل في قاعدة الكبسولة',
        'مكعبات ثلج عملاقة مثبتة في المقدمة',
        'فتح المظلات في الفضاء قبل دخول الغلاف الجوي',
        'تشغيل مكيف الهواء داخل المقصورة على أعلى درجة',
      ],
      fr: [
        'Un bouclier thermique ablatif sous la capsule',
        'Des glaçons géants fixés à l’avant',
        'L’ouverture des parachutes encore dans l’espace',
        'La climatisation réglée au maximum',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'The blunt heat shield compresses air ahead of the capsule and uses special ablative materials that char and vaporize in thin layers, carrying the intense heat away from the astronauts.',
      ar: 'يواجه الدرع الحراري المفلطح موجة الهواء الساخنة، وتتفحم طبقاته المصممة خصيصاً ببطء لتبديد الحرارة الهائلة بعيداً عن الرواد بالداخل.',
      fr: 'Le bouclier thermique ablatif se consume lentement en surface pour évacuer la chaleur extrême loin de l’équipage.',
    },
    optionExplanations: {
      en: [
        'Correct! Heat shields absorb and carry away extreme re-entry heat.',
        'Ice would melt and boil away instantly.',
        'Parachutes only work where air is dense; opening them too early or fast would shred them.',
        'An AC unit cannot handle 1,650°C external plasma.',
      ],
      ar: [
        'صحيح! الدرع الحراري يمتص ويشتت حرارة الاحتكاك الهائلة.',
        'سينصهر الثلج ويتبخر في ثوانٍ معدودة.',
        'المظلات تحتاج لهواء كثيف وقد تتمزق إذا فُتحت قبل تجاوز ذروة الحرارة.',
        'مكيف المقصورة لا يستطيع تبريد بلازما خارجية بهذه الحرارة.',
      ],
      fr: [
        'Exact ! Le bouclier thermique absorbe et dissipe cette chaleur intense.',
        'La glace fondrait instantanément.',
        'Les parachutes se déchireraient s’ils s’ouvraient trop tôt à vitesse hypersonique.',
        'Une climatisation ne peut pas contrer un plasma à 1 650 °C.',
      ],
    },
    scienceConcept: {
      en: 'Atmospheric Friction & Ablative Heat Shields',
      ar: 'الاحتكاك الجوي والدروع الحرارية',
      fr: 'Frottement atmosphérique et bouclier thermique',
    },
  },
  q_landing_sim_1: {
    id: 'q_landing_sim_1',
    difficulty: 3,
    question: {
      en: 'Why do spacecraft deploy smaller drogue parachutes BEFORE opening the three giant main parachutes?',
      ar: 'لماذا تطلق المركبة مظلات التوجيه الصغيرة أولاً قبل فتح المظلات الرئيسية الثلاث العملاقة؟',
      fr: 'Pourquoi déploie-t-on d’abord des petits parachutes extracteurs avant les trois grands ?',
    },
    options: {
      en: [
        'To stabilize the capsule and slow it down gently so the main chutes don’t rip',
        'To signal whales in the ocean',
        'Because the main chutes are only for decoration',
        'To make the capsule fly back up to space',
      ],
      ar: [
        'لتثبيت توازن الكبسولة وتبطئتها تدريجياً حتى لا تتمزق المظلات الرئيسية',
        'لإرسال إشارات للحيتان في المحيط',
        'لأن المظلات الرئيسية للزينة فقط',
        'لدفع الكبسولة للعودة إلى الفضاء',
      ],
      fr: [
        'Pour stabiliser et ralentir la capsule afin de ne pas déchirer les grands parachutes',
        'Pour faire signe aux baleines dans l’océan',
        'Car les grands parachutes sont décoratifs',
        'Pour remonter vers l’espace',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Even after plasma re-entry, the capsule falls at hundreds of km/h. Drogue chutes steady the capsule and slow it safely before the huge main chutes open for a gentle splashdown.',
      ar: 'حتى بعد تجاوز الغلاف الجوي العلوي تكون سرعة السقوط مئات الكيلومترات في الساعة، لذا تهيئ المظلات التوجيهية السرعة والاستقرار لفتح المظلات الرئيسية بأمان.',
      fr: 'Les parachutes extracteurs stabilisent et freinent d’abord la capsule pour que les grands parachutes principaux s’ouvrent sans se déchirer.',
    },
    optionExplanations: {
      en: [
        'Correct! Staged parachutes protect the canopy and crew from sudden jolts.',
        'Recovery ships use radar and radio beacons to locate the capsule.',
        'The three main chutes carry the full weight for safe splashdown.',
        'Parachutes create aerodynamic drag to slow descent, not upward rocket thrust.',
      ],
      ar: [
        'صحيح! التدرج في فتح المظلات يحمي القماش والطاقم من الصدمات.',
        'تستخدم سفن الإنقاذ الرادار واللاسلكي لتحديد موقع الكبسولة.',
        'المظلات الرئيسية هي التي تحمل وزن الكبسولة عند الهبوط.',
        'المظلات تبطئ الهبوط ولا تطلق المركبة للأعلى.',
      ],
      fr: [
        'Exact ! L’ouverture par étapes évite les chocs brusques.',
        'Les navires utilisent le radar et les balises radio.',
        'Les trois grands parachutes assurent l’amerrissage en douceur.',
        'Un parachute freine la descente, il ne propulse pas vers le haut.',
      ],
    },
    scienceConcept: {
      en: 'Aerodynamic Drag & Staged Recovery',
      ar: 'المقاومة الهوائية والاستعادة المتدرجة',
      fr: 'Traînée aérodynamique et récupération',
    },
  },
  q_gravity_1: {
    id: 'q_gravity_1',
    difficulty: 3,
    question: {
      en: 'Why do astronauts often feel dizzy or heavy for the first days back on Earth?',
      ar: 'لماذا يشعر رواد الفضاء بالدوار أو الثقل في الأيام الأولى بعد عودتهم إلى الأرض؟',
      fr: 'Pourquoi les astronautes se sentent-ils étourdis ou lourds les premiers jours sur Terre ?',
    },
    options: {
      en: [
        'Their inner-ear balance system and blood circulation are readjusting from 0g back to Earth’s 1g gravity',
        'Earth’s gravity doubles every time a rocket lands',
        'They forgot how to speak English or Arabic',
        'Their spacesuits turned into heavy lead',
      ],
      ar: [
        'لأن نظام التوازن في الأذن الداخلية والدورة الدموية يعيدان التكيف من انعدام الجاذبية إلى جاذبية الأرض 1g',
        'لأن جاذبية الأرض تتضاعف عند هبوط كل صاروخ',
        'لأنهم نسوا لغاتهم في الفضاء',
        'لأن بدلاتهم تحولت إلى معدن الرصاص',
      ],
      fr: [
        'Leur oreille interne et leur circulation sanguine se réadaptent de 0g à 1g',
        'La gravité terrestre double à chaque atterrissage',
        'Ils ont oublié comment parler',
        'Leur combinaison s’est transformée en plomb',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'After months without gravity pulling blood downward or stimulating the inner-ear balance sensors, it takes a few days of gentle rehabilitation for the body to feel completely steady at 1g again.',
      ar: 'بعد شهور من الطفو دون سحب الجاذبية للدم أو تنبيه مستقبلات التوازن بالأذن الداخلية، يحتاج الجسم بضعة أيام من التأهيل ليستعيد توازنه الطبيعي في جاذبية 1g.',
      fr: 'Après des mois en 0g, l’oreille interne et le système circulatoire ont besoin de quelques jours de rééducation pour retrouver l’équilibre à 1g.',
    },
    optionExplanations: {
      en: [
        'Correct! Neurovestibular (balance) and cardiovascular systems quickly readapt with rehab.',
        'Earth’s gravity remains constant at 1g (9.81 m/s²).',
        'Astronauts communicate clearly with recovery teams right after landing.',
        'Suits do not change material; the astronaut’s own body simply feels Earth’s normal pull again.',
      ],
      ar: [
        'صحيح! يستعيد الجهاز الدهليزي والقلب توازنهما سريعاً بالتأهيل.',
        'جاذبية الأرض ثابتة دائماً عند 1g.',
        'يتواصل الرواد بشكل طبيعي تماماً فور الهبوط.',
        'لا تتغير مادة البدلة، بل يشعر الجسم بوزنه الطبيعي مجدداً.',
      ],
      fr: [
        'Exact ! L’équilibre et la circulation se réadaptent avec la rééducation.',
        'La gravité terrestre reste toujours égale à 1g.',
        'Les astronautes parlent normalement dès l’amerrissage.',
        'La combinaison ne change pas : c’est le corps qui ressent à nouveau son poids.',
      ],
    },
    scienceConcept: {
      en: 'Vestibular Balance & Gravity Readaptation',
      ar: 'توازن الأذن الداخلية والتكيف مع الجاذبية',
      fr: 'Système vestibulaire et réadaptation à 1g',
    },
  },
  q_final_1: {
    id: 'q_final_1',
    difficulty: 3,
    question: {
      en: 'Comprehensive Exam (1/4): Which statement about gravity aboard the International Space Station is scientifically TRUE?',
      ar: 'الاختبار الشامل (١/٤): أي عبارة حول الجاذبية على متن محطة الفضاء الدولية صحيحة علمياً؟',
      fr: 'Examen final (1/4) : Quelle affirmation sur la gravité à bord de l’ISS est scientifiquement VRAIE ?',
    },
    options: {
      en: [
        'Earth’s gravity is still ~90% as strong there; astronauts float because they are in continuous free fall around Earth',
        'There is 0.00% gravity outside Earth’s clouds',
        'The Space Station uses giant anti-gravity magnets to float',
        'Astronauts float because the cabin is filled with helium gas',
      ],
      ar: [
        'جاذبية الأرض هناك لا تزال نحو ٩٠٪ من قوتها، ويطفو الرواد لأنهم في حالة سقوط حر مستمر حول الأرض',
        'الجاذبية تساوي ٠٪ تماماً بمجرد تجاوز السحب',
        'تستخدم المحطة مغناطيسات مضادة للجاذبية لتطفو',
        'يطفو الرواد لأن المقصورة مملوءة بغاز الهيليوم',
      ],
      fr: [
        'La gravité terrestre y vaut encore ~90 % ; les astronautes flottent car ils sont en chute libre continue autour de la Terre',
        'La gravité est totalement nulle au-dessus des nuages',
        'L’ISS utilise des aimants antigravité géants',
        'Les astronautes flottent car la cabine est remplie d’hélium',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'That is one of the coolest facts in space science! Gravity reaches far into space—it’s what keeps the ISS (and the Moon!) in orbit. Astronauts are weightless because they fall sideways around Earth at 28,000 km/h.',
      ar: 'هذه من أروع حقائق علوم الفضاء! تمتد الجاذبية بعيداً وهي التي تُبقي المحطة (والقمر!) في مدارهما. ينعدم الوزن الظاهري لأن الرواد والمحطة يسقطون باستمرار حول انحناء الأرض.',
      fr: 'La gravité garde l’ISS (et la Lune !) en orbite. L’apesanteur vient du fait que la station et l’équipage tombent ensemble autour de la Terre.',
    },
    optionExplanations: {
      en: [
        'Correct! Orbit is continuous free fall powered by high sideways velocity.',
        'At 408 km altitude, Earth’s gravitational pull is still ~89–90% of surface gravity.',
        'Anti-gravity magnets do not exist; orbital physics keeps the ISS aloft.',
        'Cabin air is nitrogen and oxygen—just like Earth’s air.',
      ],
      ar: [
        'صحيح! المدار هو سقوط حر مستمر بفضل السرعة الجانبية العالية.',
        'على ارتفاع ٤٠٨ كم تبقى جاذبية الأرض قريبة من ٩٠٪.',
        'لا توجد مغناطيسات مضادة للجاذبية؛ فيزياء المدار هي السبب.',
        'هواء المحطة يتكون من النيتروجين والأكسجين مثل الأرض.',
      ],
      fr: [
        'Exact ! L’orbite est une chute libre continue grâce à la vitesse tangentielle.',
        'À 408 km, la gravité vaut encore presque 90 % de celle au sol.',
        'Les aimants antigravité n’existent pas.',
        'L’air à bord est composé d’azote et d’oxygène.',
      ],
    },
    scienceConcept: {
      en: 'Orbital Mechanics & Free Fall',
      ar: 'ميكانيكا المدارات والسقوط الحر',
      fr: 'Mécanique orbitale et chute libre',
    },
  },
  q_final_2: {
    id: 'q_final_2',
    difficulty: 3,
    question: {
      en: 'Comprehensive Exam (2/4): How do the Oxygen Generation System and Water Recovery System work together aboard the station?',
      ar: 'الاختبار الشامل (٢/٤): كيف يتكامل نظام توليد الأكسجين ونظام استعادة المياه على متن المحطة؟',
      fr: 'Examen final (2/4) : Comment les systèmes d’oxygène et d’eau coopèrent-ils à bord ?',
    },
    options: {
      en: [
        'Clean recycled water feeds electrolysis to produce breathable oxygen, while cabin humidity is captured back into water',
        'They throw used water into space and import oxygen from Mars',
        'They freeze oxygen into drinking ice',
        'They run on gasoline generators',
      ],
      ar: [
        'الماء النقي المُعاد تدويره يغذي التحليل الكهربائي لإنتاج الأكسجين، بينما تُجمع رطوبة المقصورة وتُعاد إلى ماء',
        'يرمون الماء المستعمل في الفضاء ويستوردون الأكسجين من المريخ',
        'يجمدون الأكسجين ليصبح ماء شرب',
        'يعملان بمولدات البنزين',
      ],
      fr: [
        'L’eau recyclée alimente l’électrolyse pour créer de l’O₂, et l’humidité de l’air redevient de l’eau potable',
        'On jette l’eau usée dans l’espace et on importe de l’O₂ de Mars',
        'On gèle l’oxygène pour en faire de l’eau',
        'Ils fonctionnent avec des générateurs à essence',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Aboard the ISS, life support forms a smart closed loop: recycled water is split into oxygen for breathing, and moisture breathed out by astronauts is captured and cleaned back into water!',
      ar: 'تشكل أنظمة دعم الحياة حلقة ذكية مغلقة: يُفصل الماء المنقى لإنتاج الأكسجين، وتُجمع رطوبة التنفس والتعرق لتنقى وتعود ماءً للشرب!',
      fr: 'À bord, la boucle est fermée : l’eau recyclée produit de l’oxygène par électrolyse, et l’humidité expirée redevient de l’eau pure !',
    },
    optionExplanations: {
      en: [
        'Correct! Closed-loop recycling links water recovery and oxygen generation.',
        'Throwing water away would quickly empty the station’s reserves.',
        'Oxygen (O₂) and water (H₂O) are different chemical substances.',
        'Solar panels power the station cleanly without burning fossil fuels.',
      ],
      ar: [
        'صحيح! الدائرة المغلقة تربط إعادة تدوير الماء بإنتاج الأكسجين.',
        'رمي الماء سيستنفد مخزون المحطة سريعاً.',
        'الأكسجين والماء مادتان كيميائيتان مختلفتان.',
        'الألواح الشمسية هي مصدر الكهرباء النظيف في المحطة.',
      ],
      fr: [
        'Exact ! La boucle fermée relie recyclage de l’eau et production d’O₂.',
        'Jeter l’eau viderait vite les réserves.',
        'L’oxygène (O₂) et l’eau (H₂O) sont des molécules différentes.',
        'Les panneaux solaires alimentent toute la station.',
      ],
    },
    scienceConcept: {
      en: 'Closed-Loop Ecological Life Support',
      ar: 'دعم الحياة البيئي المغلق',
      fr: 'Système de survie en boucle fermée',
    },
  },
  q_final_3: {
    id: 'q_final_3',
    difficulty: 3,
    question: {
      en: 'Comprehensive Exam (3/4): How many sunrises do astronauts aboard the International Space Station witness every 24 hours?',
      ar: 'الاختبار الشامل (٣/٤): كم شروقاً للشمس يشاهده رواد الفضاء على المحطة الدولية كل ٢٤ ساعة؟',
      fr: 'Examen final (3/4) : Combien de levers de soleil les astronautes de l’ISS voient-ils en 24 heures ?',
    },
    options: {
      en: ['1 sunrise', '4 sunrises', 'About 16 sunrises', '0 sunrises'],
      ar: ['شروق واحد', '٤ شروقات', 'نحو ١٦ شروقاً', '٠ شروق'],
      fr: ['1 lever de soleil', '4 levers de soleil', 'Environ 16 levers de soleil', '0 lever de soleil'],
    },
    correctIndex: 2,
    correctExplanation: {
      en: 'Because the ISS orbits Earth once every ~93 minutes, astronauts experience roughly 16 orbits—and 16 sunrises and sunsets—every single day!',
      ar: 'لأن المحطة تدور حول الأرض مرة كل ٩٣ دقيقة تقريباً، يمر الرواد بنحو ١٦ دورة يومياً ويشهدون ١٦ شروقاً و١٦ غروباً كل ٢٤ ساعة!',
      fr: 'Comme l’ISS fait le tour de la Terre en ~93 minutes, l’équipage voit environ 16 levers et couchers de soleil chaque jour !',
    },
    optionExplanations: {
      en: [
        'People on Earth’s surface see 1 sunrise every 24 hours.',
        '4 orbits would take about 6 hours per orbit—much slower than ISS orbital speed.',
        'Correct! 24 hours ÷ ~93 minutes ≈ 15.5–16 sunrises per day.',
        'Sunlight reaches the station every time it passes the sunlit side of Earth.',
      ],
      ar: [
        'على سطح الأرض نرى شروقاً واحداً كل ٢٤ ساعة.',
        '٤ دورات تعني سرعة مدارية أبطأ بكثير من سرعة المحطة.',
        'صحيح! ٢٤ ساعة ÷ ٩٣ دقيقة ≈ ١٦ شروقاً يومياً.',
        'تصل أشعة الشمس إلى المحطة في كل مرة تمر فيها بالجانب المضيء للأرض.',
      ],
      fr: [
        'Sur Terre, nous voyons 1 lever de soleil par jour.',
        '4 orbites correspondraient à une orbite beaucoup plus lente.',
        'Exact ! 24 h ÷ 93 min ≈ 16 levers de soleil par jour.',
        'La station reçoit le Soleil à chaque passage côté jour.',
      ],
    },
    scienceConcept: {
      en: 'Orbital Period & Day-Night Cycles',
      ar: 'الفترة المدارية ودورات الليل والنهار',
      fr: 'Période orbitale et cycles jour-nuit',
    },
  },
  q_final_4: {
    id: 'q_final_4',
    difficulty: 3,
    question: {
      en: 'Comprehensive Exam (4/4): Why do scientists study astronauts before, during, and after space missions?',
      ar: 'الاختبار الشامل (٤/٤): لماذا يفحص العلماء رواد الفضاء قبل الرحلة وأثناءها وبعد العودة؟',
      fr: 'Examen final (4/4) : Pourquoi étudie-t-on la santé des astronautes avant, pendant et après le vol ?',
    },
    options: {
      en: [
        'To learn how the human body adapts to space and design safer journeys to the Moon and Mars',
        'To check if astronauts grew taller wings',
        'Because astronauts aren’t allowed to eat vegetables on Earth',
        'To measure how heavy clouds are',
      ],
      ar: [
        'لمعرفة كيفية تكيف جسم الإنسان مع الفضاء وتصميم رحلات أكثر أماناً إلى القمر والمريخ',
        'للتأكد مما إذا نمت لهم أجنحة في الفضاء',
        'لأن الرواد ممنوعون من أكل الخضار على الأرض',
        'لقياس وزن الغيوم',
      ],
      fr: [
        'Pour comprendre l’adaptation du corps humain et préparer des voyages sûrs vers la Lune et Mars',
        'Pour vérifier si des ailes leur ont poussé',
        'Parce qu’ils n’ont pas le droit de manger de légumes sur Terre',
        'Pour peser les nuages',
      ],
    },
    correctIndex: 0,
    correctExplanation: {
      en: 'Studying crew health before, during, and after orbit helps NASA doctors improve exercise, nutrition, and medical tools for future deep-space explorers AND creates medical spin-offs that help patients on Earth!',
      ar: 'دراسة صحة الرواد تساعد أطباء ناسا على تطوير التمارين والتغذية والرعاية الطبية لرحلات القمر والمريخ، كما تثمر تقنيات طبية تفيد المرضى على الأرض!',
      fr: 'Ces suivis médicaux permettent de protéger les futurs explorateurs vers la Lune et Mars et font aussi progresser la médecine sur Terre !',
    },
    optionExplanations: {
      en: [
        'Correct! Space medicine protects astronauts and advances healthcare on Earth.',
        'Astronauts actually stretch slightly taller (a few cm) in microgravity because spinal discs relax, not wings!',
        'Fresh fruits and vegetables are delivered to the ISS whenever cargo ships arrive!',
        'Weather satellites study clouds; crew evaluations study human physiology.',
      ],
      ar: [
        'صحيح! طب الفضاء يحمي الرواد ويطور الطب على الأرض أيضاً.',
        'يزداد طول الرائد سنتيمترات قليلة مؤقتاً بسبب تمدد العمود الفقري لا أكثر.',
        'تصل الفواكه والخضار الطازجة مع مركبات الشحن لرواد المحطة!',
        'الأقمار المناخية تدرس الغيوم، أما الفحوصات الطبية فتدرس صحة الإنسان.',
      ],
      fr: [
        'Exact ! La médecine spatiale protège l’équipage et fait avancer la santé sur Terre.',
        'Les astronautes grandissent juste de quelques centimètres en 0g car la colonne se détend !',
        'Des fruits et légumes frais arrivent régulièrement par vaisseau cargo.',
        'Les satellites météo étudient les nuages ; le bilan médical étudie le corps humain.',
      ],
    },
    scienceConcept: {
      en: 'Space Medicine & Future Exploration',
      ar: 'طب الفضاء واستكشاف المستقبل',
      fr: 'Médecine spatiale et exploration future',
    },
  },
};
