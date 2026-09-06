import { getLocalizedPath, type Lang } from './utils';

export interface RelatedLink {
  name: string;
  href: string;
  desc: string;
  anchor: string;
}

const LOCALIZED_LINKS: Record<string, Record<Lang, { name: string; desc: string; anchor: string }[]>> = {
  'age-calculator': {
    en: [
      {
        name: '🎉 Birthday Facts',
        desc: 'Discover your western zodiac sign, birthstone, and famous birthdays.',
        anchor: 'Explore your birthday facts and historical milestones',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Track days, hours, and minutes until your next birthday or milestone.',
        anchor: 'Create a live countdown to your next birthday',
      },
      {
        name: '📖 Name Meanings',
        desc: 'Look up the etymology, cultural history, and meaning behind your name.',
        anchor: 'Look up your name meaning and cultural roots',
      },
    ],
    pt: [
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra seu signo do zodíaco, pedra de nascimento e aniversários de famosos.',
        anchor: 'Explore os fatos do seu aniversário e marcos históricos',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Acompanhe dias, horas e minutos até seu próximo aniversário ou grande marco.',
        anchor: 'Crie uma contagem ao vivo para o seu próximo aniversário',
      },
      {
        name: '📖 Significado dos Nomes',
        desc: 'Consulte a etimologia, história cultural e o significado por trás do seu nome.',
        anchor: 'Consulte o significado e raízes culturais do seu nome',
      },
    ],
    id: [
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Ketahui zodiak barat, batu kelahiran, dan ulang tahun tokoh ternama.',
        anchor: 'Jelajahi fakta hari kelahiran dan momen bersejarah Anda',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Pantau hari, jam, dan menit menuju perayaan ulang tahun berikutnya.',
        anchor: 'Buat jam hitung mundur menuju ulang tahun Anda',
      },
      {
        name: '📖 Arti Nama',
        desc: 'Telusuri etimologi, sejarah budaya, dan makna di balik nama Anda.',
        anchor: 'Cari arti nama dan akar budayanya',
      },
    ],
    ar: [
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف برجك الفلكي الغربي وحجر ميلادك والمشاهير المولودين في نفس يومك.',
        anchor: 'استكشف حقائق وتفاصيل يوم ميلادك والمحطات البارزة',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'تابع الأيام والساعات والدقائق المتبقية ليوم ميلادك القادم أو مناسبتك المهمة.',
        anchor: 'أنشئ عداً تنازلياً مباشراً ليوم ميلادك القادم',
      },
      {
        name: '📖 معاني الأسماء',
        desc: 'ابحث عن أصل اسمك ودلالاته وتاريخه اللغوي ومعانيه العميقة.',
        anchor: 'ابحث عن معنى اسمك وجذوره التراثية',
      },
    ],
  },
  'birthday-facts': {
    en: [
      {
        name: '🎂 Age Calculator',
        desc: 'Calculate your exact age in years, months, days, and lived seconds.',
        anchor: 'Calculate your exact age down to the second',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Start a live countdown clock for your upcoming birthday celebration.',
        anchor: 'Start a live countdown to your birthday',
      },
      {
        name: '📖 Name Meanings',
        desc: 'Discover baby name popularity rankings and origins.',
        anchor: 'Explore name origins and personality archetypes',
      },
    ],
    pt: [
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Calcule sua idade exata em anos, meses, dias e segundos vividos.',
        anchor: 'Calcule sua idade exata com precisão de segundos',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Inicie um cronômetro ao vivo para a sua próxima comemoração de aniversário.',
        anchor: 'Inicie uma contagem regressiva ao vivo para o seu aniversário',
      },
      {
        name: '📖 Significado dos Nomes',
        desc: 'Descubra a popularidade, ranking e origens dos nomes de bebês.',
        anchor: 'Explore origens de nomes e arquétipos de personalidade',
      },
    ],
    id: [
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Hitung umur tepat Anda dalam tahun, bulan, hari, dan detik hidup.',
        anchor: 'Hitung usia akurat Anda hingga hitungan detik',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Nyalakan jam hitung mundur untuk perayaan ulang tahun mendatang.',
        anchor: 'Mulai hitung mundur langsung menuju hari ulang tahun Anda',
      },
      {
        name: '📖 Arti Nama',
        desc: 'Ketahui ranking kepopuleran dan asal-usul nama bayi.',
        anchor: 'Telusuri asal-usul nama dan arketipe kepribadian',
      },
    ],
    ar: [
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'احسب عمرك الزمني بدقة السنوات والشهور والأيام والثواني الحية.',
        anchor: 'احسب عمرك الحقيقي بدقة متناهية حتى الثواني',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'شغّل ساعة عد تنازلي مباشرة لاحتفال يوم ميلادك القادم.',
        anchor: 'ابدأ عداً تنازلياً مباشراً ليوم ميلادك المرتقب',
      },
      {
        name: '📖 معاني الأسماء',
        desc: 'اكتشف معدلات شعبية وتصنيفات وأصول أسماء المواليد.',
        anchor: 'استكشف أصول الأسماء والسمات والأنماط الشخصية',
      },
    ],
  },
  'decision-wheel': {
    en: [
      {
        name: '🎯 Random Picker',
        desc: 'Draw one or multiple winners fairly from any custom list of options.',
        anchor: 'Draw giveaway winners with the random picker',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Set timed intervals, deadlines, or event countdowns in real time.',
        anchor: 'Set an event countdown timer',
      },
      {
        name: '🎂 Age Calculator',
        desc: 'Quickly determine chronological age and milestone dates.',
        anchor: 'Check chronological age and birth milestones',
      },
    ],
    pt: [
      {
        name: '🎯 Sorteador de Nomes',
        desc: 'Sorteie um ou vários ganhadores de forma justa a partir de qualquer lista.',
        anchor: 'Sorteie ganhadores de brindes com o sorteador de nomes',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Defina intervalos de tempo, prazos ou contagens para eventos em tempo real.',
        anchor: 'Defina um cronômetro de contagem para o seu evento',
      },
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Descubra rapidamente sua idade cronológica e datas de marcos importantes.',
        anchor: 'Confira sua idade cronológica e datas marcantes',
      },
    ],
    id: [
      {
        name: '🎯 Pengacak Nama Acak',
        desc: 'Undi satu atau beberapa pemenang secara adil dari daftar pilihan apa pun.',
        anchor: 'Tentukan pemenang undian dengan pengacak nama acak',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Atur batas waktu, deadline, atau hitung mundur acara secara langsung.',
        anchor: 'Pasang jam hitung mundur untuk acara Anda',
      },
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Ketahui usia kronologis dan tanggal pencapaian penting dengan cepat.',
        anchor: 'Periksa usia kronologis dan pencapaian hidup Anda',
      },
    ],
    ar: [
      {
        name: '🎯 قرعة الأسماء العشوائية',
        desc: 'اسحب فائزاً واحداً أو فائزين متعددين بنزاهة من أي قائمة أسماء.',
        anchor: 'اسحب الفائزين في المسابقات باستخدام قرعة الأسماء',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'اضبط مواعيد نهائية وساعات عد تنازلي لمناسباتك في الوقت الحقيقي.',
        anchor: 'اضبط ساعة عد تنازلي لموعد حدثك المرتقب',
      },
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'اعرف عمرك الزمني بدقة الأيام وتواريخ المحطات الحياتية الكبرى.',
        anchor: 'تحقق من عمرك الزمني ومحطات حياتك الأساسية',
      },
    ],
  },
  'random-picker': {
    en: [
      {
        name: '🎡 Decision Wheel',
        desc: 'Spin the customizable physics wheel for quick daily choices.',
        anchor: 'Spin the decision wheel for everyday choices',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Count down to raffle deadlines, live giveaways, and product drops.',
        anchor: 'Count down to your next live giveaway or raffle',
      },
      {
        name: '🎉 Birthday Facts',
        desc: 'Discover zodiac traits, birthstones, and famous historical birthdays.',
        anchor: 'Discover zodiac traits and famous birthdays',
      },
    ],
    pt: [
      {
        name: '🎡 Roleta de Decisões',
        desc: 'Gire a roleta personalizável com física suave para escolhas do dia a dia.',
        anchor: 'Gire a roleta de decisões para escolhas do cotidiano',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Faça contagem para encerramento de rifas, sorteios ao vivo e lançamentos.',
        anchor: 'Conte os minutos para o próximo sorteio ao vivo ou evento',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra traços do zodíaco, pedras de nascimento e famosos aniversariantes.',
        anchor: 'Descubra traços do zodíaco e aniversários de famosos',
      },
    ],
    id: [
      {
        name: '🎡 Roda Keputusan',
        desc: 'Putar roda animasi fisika untuk menentukan pilihan harian dengan cepat.',
        anchor: 'Putar roda keputusan untuk pilihan sehari-hari',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Hitung mundur batas akhir undian, giveaway langsung, dan peluncuran produk.',
        anchor: 'Hitung mundur waktu menuju giveaway atau undian berikutnya',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Ketahui karakter zodiak, batu kelahiran, dan hari lahir tokoh dunia.',
        anchor: 'Ketahui karakter zodiak dan ulang tahun tokoh terkenal',
      },
    ],
    ar: [
      {
        name: '🎡 عجلة القرارات',
        desc: 'دوّر العجلة التفاعلية بحركة فيزيائية ممتعة لحسم خياراتك اليومية.',
        anchor: 'دوّر عجلة القرارات لحسم خياراتك واختياراتك اليومية',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'احسب الوقت المتبقي لانتهاء السحوبات، والبث المباشر، وإطلاق المنتجات.',
        anchor: 'احسب الوقت المتبقي لسحبك القادم أو مسابقتك الحية',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف صفات الأبراج، وأحجار الميلاد، وتواريخ ميلاد مشاهير التاريخ.',
        anchor: 'اكتشف صفات الأبراج وأشهر الشخصيات المولودة في يومك',
      },
    ],
  },
  'countdown': {
    en: [
      {
        name: '🎂 Age Calculator',
        desc: 'Calculate elapsed life time and see your exact chronological age.',
        anchor: 'Calculate exact chronological age and life stats',
      },
      {
        name: '🎉 Birthday Facts',
        desc: 'Uncover the weekday you were born, zodiac sign, and generation.',
        anchor: 'Uncover your birthday weekday and generation',
      },
      {
        name: '🎡 Decision Wheel',
        desc: 'Randomize options and make fast decisions with a spinning wheel.',
        anchor: 'Spin the wheel to make fast team decisions',
      },
    ],
    pt: [
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Calcule o tempo de vida decorrido e veja sua idade cronológica exata.',
        anchor: 'Calcule sua idade cronológica exata e estatísticas de vida',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra o dia da semana do seu nascimento, signo e geração.',
        anchor: 'Descubra o dia da semana em que nasceu e sua geração',
      },
      {
        name: '🎡 Roleta de Decisões',
        desc: 'Embaralhe opções e tome decisões rápidas com a roleta interativa.',
        anchor: 'Gire a roleta para tomar decisões rápidas em grupo',
      },
    ],
    id: [
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Hitung waktu kehidupan Anda dan ketahui usia kronologis yang tepat.',
        anchor: 'Hitung usia kronologis tepat dan statistik kehidupan',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Ketahui hari kelahiran dalam sepekan, tanda zodiak, dan generasi Anda.',
        anchor: 'Ketahui hari kelahiran dan kelompok generasi Anda',
      },
      {
        name: '🎡 Roda Keputusan',
        desc: 'Acak pilihan dan buat keputusan cepat bersama roda putar.',
        anchor: 'Putar roda untuk mengambil keputusan kelompok secara cepat',
      },
    ],
    ar: [
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'احسب إجمالي أيام حياتك وتعرف على عمرك الزمني بدقة بالغة.',
        anchor: 'احسب عمرك الزمني الدقيق وإحصائيات حياتك المتنوعة',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف يوم الأسبوع الذي ولدت فيه، وبرجك الفلكي، والجيل الذي تنتمي إليه.',
        anchor: 'اكتشف يوم ميلادك في الأسبوع والجيل الذي تنتمي إليه',
      },
      {
        name: '🎡 عجلة القرارات',
        desc: 'نوّع الخيارات واتخذ قرارات سريعة ومحايدة مع عجلة القرارات.',
        anchor: 'دوّر العجلة لحسم القرارات الجماعية بسرعة ونزاهة',
      },
    ],
  },
  'name-meaning': {
    en: [
      {
        name: '📚 Baby Names A–Z',
        desc: 'Browse our curated alphabetical index of 200+ popular baby names.',
        anchor: 'Browse all 200+ curated baby names alphabetically',
      },
      {
        name: '🎉 Birthday Facts',
        desc: 'Check zodiac symbols, birthstones, and historical figures for any date.',
        anchor: 'Check zodiac signs and birthday facts',
      },
      {
        name: '🎂 Age Calculator',
        desc: 'Discover exact chronological age in years, months, and days.',
        anchor: 'Calculate chronological age and birthday milestones',
      },
    ],
    pt: [
      {
        name: '📚 Nomes de Bebê A–Z',
        desc: 'Navegue pelo nosso índice alfabético com mais de 200 nomes selecionados.',
        anchor: 'Navegue por todos os mais de 200 nomes de bebês em ordem alfabética',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Confira símbolos do zodíaco, pedras de nascimento e personalidades históricas.',
        anchor: 'Confira signos do zodíaco e curiosidades de aniversário',
      },
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Descubra sua idade cronológica exata em anos, meses e dias.',
        anchor: 'Calcule a idade cronológica e marcos de aniversário',
      },
    ],
    id: [
      {
        name: '📚 Direktori Nama Bayi A–Z',
        desc: 'Jelajahi indeks alfabet pilihan kami berisi 200+ nama bayi populer.',
        anchor: 'Jelajahi 200+ nama bayi pilihan secara alfabetis',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Cek lambang zodiak, batu kelahiran, dan tokoh sejarah untuk tanggal apa pun.',
        anchor: 'Periksa zodiak dan fakta hari kelahiran',
      },
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Ketahui usia kronologis persis dalam tahun, bulan, dan hari.',
        anchor: 'Hitung usia kronologis dan pencapaian hari lahir',
      },
    ],
    ar: [
      {
        name: '📚 دليل أسماء المواليد من الألف إلى الياء',
        desc: 'تصفح الدليل الأبجدي المنسق الذي يضم أكثر من 200 اسم شائع وعريق.',
        anchor: 'تصفح أكثر من 200 اسم مولود مصنفة أبجدياً',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'تحقق من رموز الأبراج، وأحجار الميلاد، والشخصيات التاريخية لأي تاريخ.',
        anchor: 'تعرف على الأبراج وحقائق يوم الميلاد المتنوعة',
      },
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'اكتشف عمرك الزمني الحقيقي بالسنوات والشهور والأيام بدقة.',
        anchor: 'احسب عمرك الزمني الدقيق ومحطات أعياد ميلادك',
      },
    ],
  },
  'names': {
    en: [
      {
        name: '✨ AI Name Meaning Finder',
        desc: 'Look up rare, unlisted, or modern names with AI personality insights.',
        anchor: 'Analyze any rare name with AI insights',
      },
      {
        name: '🎉 Birthday Facts',
        desc: 'Discover zodiac signs, birthstones, and famous historical birthdays.',
        anchor: 'Look up zodiac signs and famous namesakes',
      },
      {
        name: '🎂 Age Calculator',
        desc: 'Calculate exact chronological age and upcoming birthday countdowns.',
        anchor: 'Calculate exact age and upcoming birthdays',
      },
    ],
    pt: [
      {
        name: '✨ Buscador de Significado de Nomes com IA',
        desc: 'Consulte nomes raros ou modernos com percepções de personalidade por IA.',
        anchor: 'Analise qualquer nome raro com percepções de IA',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra signos do zodíaco, pedras de nascimento e personalidades históricas.',
        anchor: 'Consulte signos do zodíaco e xarás famosos',
      },
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Calcule a idade cronológica exata e a contagem regressiva para o próximo aniversário.',
        anchor: 'Calcule a idade exata e próximos aniversários',
      },
    ],
    id: [
      {
        name: '✨ Pencari Arti Nama Berbasis AI',
        desc: 'Cari nama langka atau modern dengan analisis karakter cerdas AI.',
        anchor: 'Analisis nama unik apa pun dengan wawasan AI',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Ketahui zodiak, batu kelahiran, dan tokoh sejarah dengan tanggal lahir sama.',
        anchor: 'Cari tahu zodiak dan tokoh terkenal senama',
      },
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Hitung usia kronologis persis dan hitung mundur ulang tahun berikutnya.',
        anchor: 'Hitung usia akurat dan ulang tahun yang akan datang',
      },
    ],
    ar: [
      {
        name: '✨ الباحث الذكي عن معاني الأسماء بالذكاء الاصطناعي',
        desc: 'ابحث عن الأسماء النادرة والحديثة مع تحليلات السمات الشخصية بالذكاء الاصطناعي.',
        anchor: 'حلل أي اسم نادر برؤى الذكاء الاصطناعي الفورية',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف الأبراج الفلكية، وأحجار الميلاد، ومشاهير التاريخ المولودين في يومك.',
        anchor: 'ابحث عن الأبراج الفلكية والشخصيات التاريخية الشهيرة',
      },
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'احسب عمرك الزمني بدقة والعد التنازلي ليوم ميلادك القادم.',
        anchor: 'احسب عمرك بدقة ومواعيد أعياد ميلادك المقبلة',
      },
    ],
  },
  'image-compressor': {
    en: [
      {
        name: '🔄 Image Converter',
        desc: 'Convert JPG, PNG, WebP, AVIF, GIF, and BMP directly in your browser.',
        anchor: 'Convert image formats with 100% privacy',
      },
      {
        name: '🎡 Decision Wheel',
        desc: 'Spin the wheel to make quick, unbiased choices or randomize ideas.',
        anchor: 'Make quick decisions with the interactive decision wheel',
      },
      {
        name: '🎲 Random Picker',
        desc: 'Pick contest winners, classroom students, or names without duplicates.',
        anchor: 'Draw random winners or split teams fairly',
      },
    ],
    pt: [
      {
        name: '🔄 Conversor de Imagens',
        desc: 'Converta JPG, PNG, WebP, AVIF, GIF e BMP direto no navegador.',
        anchor: 'Converta formatos de imagem com 100% de privacidade',
      },
      {
        name: '🎡 Roleta de Decisões',
        desc: 'Gire a roleta para tomar decisões rápidas e justas ou sortear ideias.',
        anchor: 'Tome decisões rápidas com a roleta interativa',
      },
      {
        name: '🎲 Sorteador Aleatório',
        desc: 'Sorteie ganhadores, equipes ou itens da lista sem repetições.',
        anchor: 'Sorteie nomes ou divida grupos de forma justa',
      },
    ],
    id: [
      {
        name: '🔄 Konversi Gambar',
        desc: 'Ubah format foto JPG, PNG, WebP, AVIF, GIF, dan BMP langsung di browser.',
        anchor: 'Ubah format gambar dengan privasi 100%',
      },
      {
        name: '🎡 Roda Keputusan',
        desc: 'Putar roda untuk menentukan pilihan acak secara adil dan cepat.',
        anchor: 'Ambil keputusan cepat dengan roda putar interaktif',
      },
      {
        name: '🎲 Pengacak Nama',
        desc: 'Pilih pemenang lomba, siswa kelas, atau daftar tanpa duplikat.',
        anchor: 'Pilih pemenang acak atau bagi tim secara adil',
      },
    ],
    ar: [
      {
        name: '🔄 محول الصور',
        desc: 'حول صور JPG و PNG و WebP و AVIF و GIF و BMP مباشرة في متصفحك.',
        anchor: 'حول صيغ الصور بخصوصية وأمان 100%',
      },
      {
        name: '🎡 عجلة القرارات',
        desc: 'قم بتدوير العجلة لاتخاذ قرارات سريعة وعادلة بين الخيارات والأنشطة.',
        anchor: 'اتخذ قرارات سريعة باستخدام عجلة الحظ التفاعلية',
      },
      {
        name: '🎲 السحب العشوائي',
        desc: 'اختر الفائزين في المسابقات أو قسّم الفرق دون أي تكرار.',
        anchor: 'اختر فائزين عشوائيين أو قسّم المجموعات بعدالة',
      },
    ],
  },
  'image-converter': {
    en: [
      {
        name: '🗜️ Image Compressor',
        desc: 'Compress JPG, PNG, and WebP images up to 80% with zero server uploads.',
        anchor: 'Compress your converted images for smaller file sizes',
      },
      {
        name: '🎡 Decision Wheel',
        desc: 'Spin the wheel to make quick, unbiased choices or randomize ideas.',
        anchor: 'Make quick decisions with the interactive decision wheel',
      },
      {
        name: '🎲 Random Picker',
        desc: 'Pick contest winners, classroom students, or names without duplicates.',
        anchor: 'Draw random winners or split teams fairly',
      },
    ],
    pt: [
      {
        name: '🗜️ Compressor de Imagens',
        desc: 'Comprima imagens JPG, PNG e WebP em até 80% sem envio para servidores.',
        anchor: 'Comprima suas imagens convertidas para tamanhos menores',
      },
      {
        name: '🎡 Roleta de Decisões',
        desc: 'Gire a roleta para tomar decisões rápidas e justas ou sortear ideias.',
        anchor: 'Tome decisões rápidas com a roleta interativa',
      },
      {
        name: '🎲 Sorteador Aleatório',
        desc: 'Sorteie ganhadores, equipes ou itens da lista sem repetições.',
        anchor: 'Sorteie nomes ou divida grupos de forma justa',
      },
    ],
    id: [
      {
        name: '🗜️ Kompres Foto',
        desc: 'Kecilkan ukuran foto JPG, PNG, dan WebP hingga 80% tanpa upload ke server.',
        anchor: 'Kompres foto hasil konversi agar hemat ukuran',
      },
      {
        name: '🎡 Roda Keputusan',
        desc: 'Putar roda untuk menentukan pilihan acak secara adil dan cepat.',
        anchor: 'Ambil keputusan cepat dengan roda putar interaktif',
      },
      {
        name: '🎲 Pengacak Nama',
        desc: 'Pilih pemenang lomba, siswa kelas, atau daftar tanpa duplikat.',
        anchor: 'Pilih pemenang acak atau bagi tim secara adil',
      },
    ],
    ar: [
      {
        name: '🗜️ ضغط الصور',
        desc: 'اضغط صور JPG و PNG و WebP بنسبة تصل إلى 80% بدون رفع أي ملف.',
        anchor: 'اضغط صورك المحولة للحصول على حجم ملف أصغر',
      },
      {
        name: '🎡 عجلة القرارات',
        desc: 'قم بتدوير العجلة لاتخاذ قرارات سريعة وعادلة بين الخيارات والأنشطة.',
        anchor: 'اتخذ قرارات سريعة باستخدام عجلة الحظ التفاعلية',
      },
      {
        name: '🎲 السحب العشوائي',
        desc: 'اختر الفائزين في المسابقات أو قسّم الفرق دون أي تكرار.',
        anchor: 'اختر فائزين عشوائيين أو قسّم المجموعات بعدالة',
      },
    ],
  },
};

// Aliases
LOCALIZED_LINKS['names-directory'] = LOCALIZED_LINKS['names'];

const DEFAULT_HREFS: Record<string, string[]> = {
  'image-compressor': ['/image-converter', '/decision-wheel', '/random-picker'],
  'image-converter': ['/image-compressor', '/decision-wheel', '/random-picker'],
  'age-calculator': ['/birthday-facts', '/countdown', '/name-meaning'],
  'birthday-facts': ['/age-calculator', '/countdown', '/name-meaning'],
  'decision-wheel': ['/random-picker', '/countdown', '/image-compressor'],
  'random-picker': ['/decision-wheel', '/image-compressor', '/birthday-facts'],
  'countdown': ['/image-compressor', '/birthday-facts', '/decision-wheel'],
  'name-meaning': ['/names', '/birthday-facts', '/age-calculator'],
  'names': ['/name-meaning', '/birthday-facts', '/age-calculator'],
  'names-directory': ['/name-meaning', '/birthday-facts', '/age-calculator'],
};

export function getLocalizedRelatedLinks(lang: Lang, toolKey: string): RelatedLink[] {
  const toolEntry = LOCALIZED_LINKS[toolKey] || LOCALIZED_LINKS['age-calculator'];
  const langItems = toolEntry[lang] || toolEntry.en;
  const hrefs = DEFAULT_HREFS[toolKey] || DEFAULT_HREFS['age-calculator'];

  return langItems.map((item, idx) => ({
    name: item.name,
    href: getLocalizedPath(hrefs[idx] || '/', lang),
    desc: item.desc,
    anchor: item.anchor,
  }));
}
