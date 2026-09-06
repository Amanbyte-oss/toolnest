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
        name: '🎯 Random Picker',
        desc: 'Draw one or multiple winners fairly from any custom list of options.',
        anchor: 'Draw giveaway winners with the random picker',
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
        name: '🎯 Sorteador de Nomes',
        desc: 'Sorteie um ou vários ganhadores de forma justa e sem repetições.',
        anchor: 'Realize sorteios justos com o sorteador de nomes',
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
        name: '🎯 Pengacak Pilihan',
        desc: 'Pilih satu atau banyak pemenang secara adil dari daftar pilihan Anda.',
        anchor: 'Undi pemenang give away secara acak dan adil',
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
        name: '🎯 القرعة العشوائية',
        desc: 'اختر فائزاً أو أكثر بنزاهة تامة من أي قائمة خيارات مخصصة.',
        anchor: 'أجرِ قرعة نزيهة لتحديد الفائزين بسهولة',
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
        name: '🎯 Random Picker',
        desc: 'Draw one or multiple winners fairly from any custom list of options.',
        anchor: 'Draw giveaway winners with the random picker',
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
        name: '🎯 Sorteador de Nomes',
        desc: 'Sorteie um ou vários ganhadores de forma justa e sem repetições.',
        anchor: 'Realize sorteios justos com o sorteador de nomes',
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
        name: '🎯 Pengacak Pilihan',
        desc: 'Pilih satu atau banyak pemenang secara adil dari daftar pilihan Anda.',
        anchor: 'Undi pemenang give away secara acak dan adil',
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
        name: '🎯 القرعة العشوائية',
        desc: 'اختر فائزاً أو أكثر بنزاهة تامة من أي قائمة خيارات مخصصة.',
        anchor: 'أجرِ قرعة نزيهة لتحديد الفائزين بسهولة',
      },
    ],
  },
  'random-picker': {
    en: [
      {
        name: '⏳ Countdown Timer',
        desc: 'Count down to raffle deadlines, live giveaways, and product drops.',
        anchor: 'Count down to your next live giveaway or raffle',
      },
      {
        name: '🗜️ Image Compressor',
        desc: 'Compress JPG, PNG, and WebP images client-side with zero uploads.',
        anchor: 'Compress images securely in your browser',
      },
      {
        name: '🎉 Birthday Facts',
        desc: 'Discover zodiac traits, birthstones, and famous historical birthdays.',
        anchor: 'Discover zodiac traits and famous birthdays',
      },
    ],
    pt: [
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Faça contagem regressiva para prazos de sorteios e lançamentos.',
        anchor: 'Faça contagem regressiva para seu próximo sorteio ao vivo',
      },
      {
        name: '🗜️ Compressor de Imagens',
        desc: 'Comprima imagens JPG, PNG e WebP direto no navegador sem upload.',
        anchor: 'Comprima imagens com privacidade total',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra traços do zodíaco, pedras de nascimento e aniversários famosos.',
        anchor: 'Descubra traços do zodíaco e aniversários famosos',
      },
    ],
    id: [
      {
        name: '⏳ Hitung Mundur',
        desc: 'Hitung mundur batas waktu undian, giveaway live, dan peluncuran produk.',
        anchor: 'Hitung mundur giveaway atau undian langsung Anda berikutnya',
      },
      {
        name: '🗜️ Kompresor Gambar',
        desc: 'Kompres gambar JPG, PNG, dan WebP di browser tanpa unggah ke server.',
        anchor: 'Kompres gambar secara privat di peramban',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Ketahui karakter zodiak, batu kelahiran, dan tokoh sejarah terkenal.',
        anchor: 'Ketahui karakter zodiak dan ulang tahun tokoh terkenal',
      },
    ],
    ar: [
      {
        name: '⏳ العداد التنازلي',
        desc: 'عد تنازلي للمواعيد النهائية للسحوبات والهدايا الحية وإطلاق المنتجات.',
        anchor: 'قم بالعد التنازلي للسحب القادم أو المسابقة المباشرة',
      },
      {
        name: '🗜️ ضاغط الصور',
        desc: 'ضغط صور JPG وPNG وWebP داخل المتصفح بدون أي رفع للخادم وبخصوصية كاملة.',
        anchor: 'اضغط صورك بأمان وسرعة داخل متصفحك',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف سمات الأبراج الفلكية وأحجار الميلاد ومشاهير التاريخ.',
        anchor: 'اكتشف سمات البرج الفلكي وأعياد ميلاد المشاهير',
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
        name: '🗜️ Image Compressor',
        desc: 'Compress images securely in browser with zero server uploads.',
        anchor: 'Compress images securely in your browser',
      },
    ],
    pt: [
      {
        name: '🎂 Calculadora de Idade',
        desc: 'Calcule o tempo de vida transcorrido e veja sua idade cronológica exata.',
        anchor: 'Calcule idade cronológica exata e estatísticas de vida',
      },
      {
        name: '🎉 Fatos de Aniversário',
        desc: 'Descubra o dia da semana em que nasceu, signo e geração.',
        anchor: 'Descubra seu dia de nascimento e geração',
      },
      {
        name: '🗜️ Compressor de Imagens',
        desc: 'Comprima imagens com total segurança no navegador sem upload.',
        anchor: 'Comprima imagens com privacidade total',
      },
    ],
    id: [
      {
        name: '🎂 Kalkulator Usia',
        desc: 'Hitung waktu kehidupan yang telah berlalu dan ketahui usia persis Anda.',
        anchor: 'Hitung umur kronologis akurat dan statistik hidup',
      },
      {
        name: '🎉 Fakta Hari Lahir',
        desc: 'Temukan hari lahir Anda, zodiak, dan generasi kelahiran Anda.',
        anchor: 'Ketahui hari lahir Anda dan generasi kelahiran',
      },
      {
        name: '🗜️ Kompresor Gambar',
        desc: 'Kompres gambar dengan aman di peramban tanpa unggah ke server.',
        anchor: 'Kompres gambar secara privat di peramban',
      },
    ],
    ar: [
      {
        name: '🎂 حاسبة العمر الدقيق',
        desc: 'احسب الوقت المنقضي من حياتك وتعرف على عمرك الزمني بدقة متناهية.',
        anchor: 'احسب العمر الزمني الدقيق وإحصائيات حياتك',
      },
      {
        name: '🎉 حقائق يوم الميلاد',
        desc: 'اكتشف يوم الأسبوع الذي ولدت فيه، وبرجك الفلكي، وجيلك العمري.',
        anchor: 'تعرف على يوم ولادتك وجيلك الزمني',
      },
      {
        name: '🗜️ ضاغط الصور',
        desc: 'ضغط صورك بأمان تام داخل المتصفح بدون إرسالها إلى أي خوادم.',
        anchor: 'اضغط صورك بأمان وسرعة داخل متصفحك',
      },
    ],
  },
  'image-compressor': {
    en: [
      {
        name: '🔄 Image Converter',
        desc: 'Convert images between WebP, JPG, and PNG formats client-side.',
        anchor: 'Convert image formats instantly in browser',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Track deadlines, product launches, or special events in real time.',
        anchor: 'Set a live countdown clock for your events',
      },
      {
        name: '🎯 Random Picker',
        desc: 'Draw winners fairly from lists with cryptographic randomness.',
        anchor: 'Pick giveaway winners with fair random algorithm',
      },
    ],
    pt: [
      {
        name: '🔄 Conversor de Imagens',
        desc: 'Converta imagens entre WebP, JPG e PNG direto no navegador.',
        anchor: 'Converta formatos de imagem com rapidez',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Acompanhe prazos, lançamentos de produtos ou eventos em tempo real.',
        anchor: 'Crie uma contagem regressiva ao vivo para seus eventos',
      },
      {
        name: '🎯 Sorteador de Nomes',
        desc: 'Sorteie ganhadores de forma justa com aleatoriedade criptográfica.',
        anchor: 'Sorteie nomes e opções com algoritmo seguro',
      },
    ],
    id: [
      {
        name: '🔄 Konverter Gambar',
        desc: 'Ubah format gambar antara WebP, JPG, dan PNG langsung di browser.',
        anchor: 'Ubah format gambar secara instan di peramban',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Pantau batas waktu, peluncuran produk, atau acara spesial secara langsung.',
        anchor: 'Buat jam hitung mundur langsung untuk acara Anda',
      },
      {
        name: '🎯 Pengacak Pilihan',
        desc: 'Undi pemenang secara adil menggunakan algoritma kriptografi acak.',
        anchor: 'Pilih nama atau opsi dengan pengacak adil',
      },
    ],
    ar: [
      {
        name: '🔄 محول صيغ الصور',
        desc: 'تحويل الصور بين صيغ WebP وJPG وPNG داخل المتصفح بدون رفع ملفات.',
        anchor: 'حول صيغ الصور فورياً وبخصوصية تامة',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'تابع المواعيد النهائية وإطلاق المنتجات والفعاليات في الوقت الفعلي.',
        anchor: 'أنشئ عداً تنازلياً مباشراً لفعالياتك ومناسباتك',
      },
      {
        name: '🎯 القرعة العشوائية',
        desc: 'اختر الفائزين بنزاهة تامة باستخدام خوارزميات التشفير العشوائي.',
        anchor: 'أجرِ قرعة نزيهة لتحديد الفائزين بسهولة',
      },
    ],
  },
  'image-converter': {
    en: [
      {
        name: '🗜️ Image Compressor',
        desc: 'Compress images to target file sizes or reduce footprint up to 90%.',
        anchor: 'Compress your converted images for smaller sizes',
      },
      {
        name: '⏳ Countdown Timer',
        desc: 'Track deadlines, product launches, or special events in real time.',
        anchor: 'Set a live countdown clock for your events',
      },
      {
        name: '🎯 Random Picker',
        desc: 'Draw winners fairly from lists with cryptographic randomness.',
        anchor: 'Pick giveaway winners with fair random algorithm',
      },
    ],
    pt: [
      {
        name: '🗜️ Compressor de Imagens',
        desc: 'Comprima imagens para um tamanho alvo ou reduza o peso em até 90%.',
        anchor: 'Comprima suas imagens convertidas para menor tamanho',
      },
      {
        name: '⏳ Contagem Regressiva',
        desc: 'Acompanhe prazos, lançamentos de produtos ou eventos em tempo real.',
        anchor: 'Crie uma contagem regressiva ao vivo para seus eventos',
      },
      {
        name: '🎯 Sorteador de Nomes',
        desc: 'Sorteie ganhadores de forma justa com aleatoriedade criptográfica.',
        anchor: 'Sorteie nomes e opções com algoritmo seguro',
      },
    ],
    id: [
      {
        name: '🗜️ Kompresor Gambar',
        desc: 'Kompres gambar ke target ukuran tertentu atau hemat memori hingga 90%.',
        anchor: 'Kompres gambar yang telah dikonversi agar lebih ringan',
      },
      {
        name: '⏳ Hitung Mundur',
        desc: 'Pantau batas waktu, peluncuran produk, atau acara spesial secara langsung.',
        anchor: 'Buat jam hitung mundur langsung untuk acara Anda',
      },
      {
        name: '🎯 Pengacak Pilihan',
        desc: 'Undi pemenang secara adil menggunakan algoritma kriptografi acak.',
        anchor: 'Pilih nama atau opsi dengan pengacak adil',
      },
    ],
    ar: [
      {
        name: '🗜️ ضاغط الصور',
        desc: 'ضغط الصور لحجم ملف محدد أو تقليل الحجم بنسبة تصل إلى 90%.',
        anchor: 'اضغط صورك بعد تحويلها لتصغير حجمها وحفظ الذاكرة',
      },
      {
        name: '⏳ العداد التنازلي',
        desc: 'تابع المواعيد النهائية وإطلاق المنتجات والفعاليات في الوقت الفعلي.',
        anchor: 'أنشئ عداً تنازلياً مباشراً لفعالياتك ومناسباتك',
      },
      {
        name: '🎯 القرعة العشوائية',
        desc: 'اختر الفائزين بنزاهة تامة باستخدام خوارزميات التشفير العشوائي.',
        anchor: 'أجرِ قرعة نزيهة لتحديد الفائزين بسهولة',
      },
    ],
  },
};

const DEFAULT_HREFS: Record<string, string[]> = {
  'image-compressor': ['/image-converter', '/countdown', '/random-picker'],
  'image-converter': ['/image-compressor', '/countdown', '/random-picker'],
  'age-calculator': ['/birthday-facts', '/countdown', '/random-picker'],
  'birthday-facts': ['/age-calculator', '/countdown', '/random-picker'],
  'random-picker': ['/countdown', '/image-compressor', '/birthday-facts'],
  'countdown': ['/birthday-facts', '/age-calculator', '/image-compressor'],
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
