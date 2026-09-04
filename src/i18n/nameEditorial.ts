import type { Lang } from './utils';

export interface NameEntry {
  name: string;
  slug: string;
  gender: 'male' | 'female' | 'unisex';
  origin: string;
  meaning: string;
  popularity: 'very high' | 'high' | 'medium';
  famous: string[];
  similar: string[];
}

function getVariantIndex(name: string, salt: number, count: number): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i) + salt) | 0;
  }
  return Math.abs(hash) % count;
}

const GENDER_DESCRIPTORS: Record<Lang, Record<string, string>> = {
  en: {
    female: 'feminine',
    male: 'masculine',
    unisex: 'versatile gender-neutral',
  },
  pt: {
    female: 'feminino',
    male: 'masculino',
    unisex: 'unissex versátil',
  },
  id: {
    female: 'feminin',
    male: 'maskulin',
    unisex: 'uniseks yang fleksibel',
  },
  ar: {
    female: 'مؤنثاً',
    male: 'مذكراً',
    unisex: 'محايداً ملائماً للجنسين',
  },
};

const ORIGIN_HISTORIES: Record<Lang, Record<string, string>> = {
  en: {
    German: 'has deep historical branches within Germanic traditions, conveying an air of enduring poise and classical character',
    Latin: 'originates in classical antiquity, retaining a timeless melodiousness celebrated across European and Mediterranean cultures',
    Greek: 'carries profound philosophical and mythological heritage, echoing ancient principles of virtue and enlightenment',
    Hebrew: 'is steeped in rich historical narratives and biblical literature, bearing spiritual significance that transcends centuries',
    Irish: 'embodies the poetic lore and spirited resilience of Gaelic culture, renowned for lyrical cadence and charm',
    Italian: 'reflects Romance elegance and vibrant warmth, distinguished by musical phonetics and artistic prestige',
    French: 'exudes timeless sophistication and understated grace, widely cherished across centuries of continental literature',
    Spanish: 'carries lively warmth and proud cultural lineage, resonating across vibrant Spanish-speaking communities worldwide',
    English: 'draws from storied Anglo-Saxon and Old English heritage, combining pastoral warmth with steadfast distinction',
    Norse: 'derives from heroic Scandinavian folklore, evoking strength, adventurous curiosity, and natural beauty',
    Arabic: 'radiates poetic majesty and deep linguistic nuance, symbolizing cherished aspirations and dignity',
    Scottish: 'carries the storied resilience of the Highlands, marked by rugged authenticity and traditional honor',
    Celtic: 'draws on mystical ancient folklore, celebrating kinship with the natural elements and heroic legend',
    Slavic: 'radiates warmth, gentle fortitude, and a rich lineage celebrated across Eastern and Central European traditions',
    Swahili: 'celebrates purposeful intention, melodic joy, and community pride originating from East African traditions',
    Japanese: 'embraces poetic harmony, nature-inspired grace, and profound cultural reverence',
    Persian: 'is steeped in royal elegance, classical poetry, and celestial symbolism celebrated across ancient dynasties',
    Polynesian: 'echoes ocean voyages, natural wonder, and communal reverence woven deeply through Pacific heritage',
    Dutch: 'carries steadfast optimism, warm simplicity, and historical maritime prestige',
  },
  pt: {
    German: 'possui profundas ramificações nas tradições germânicas, transmitindo serenidade duradoura e caráter clássico',
    Latin: 'origina-se na antiguidade clássica, preservando uma musicalidade atemporal celebrada nas culturas europeia e mediterrânea',
    Greek: 'carrega profunda herança filosófica e mitológica, ecoando princípios ancestrais de virtude e sabedoria',
    Hebrew: 'está impregnado de ricas narrativas históricas e literárias, com significado espiritual que atravessa séculos',
    Irish: 'personifica o folclore poético e a resiliência gaélica, célebre pela cadência lírica e charme singular',
    Italian: 'reflete elegância latina e calor vibrante, distinguindo-se por uma fonética musical e prestígio artístico',
    French: 'exala sofisticação atemporal e graça sutil, amplamente apreciada na literatura continental ao longo dos séculos',
    Spanish: 'traz um calor contagiante e linhagem cultural nobre, ressoando em comunidades de língua espanhola no mundo todo',
    English: 'provém do patrimônio anglo-saxônico, unindo acolhimento pastoral e distinção marcante',
    Norse: 'deriva do lendário folclore escandinavo, evocando força interior, curiosidade e beleza natural',
    Arabic: 'irradia majestade poética e profundidade linguística, simbolizando aspirações nobres e dignidade',
    Scottish: 'carrega a resiliência das Terras Altas, marcada por autenticidade rústica e honra tradicional',
    Celtic: 'bebe do místico folclore antigo, celebrando a comunhão com a natureza e lendas heróicas',
    Slavic: 'irradia generosidade, gentileza e uma rica tradição celebrada no leste e centro da Europa',
    Swahili: 'celebra intenção com propósito, melodia alegre e orgulho comunitário do leste africano',
    Japanese: 'abraça harmonia poética, elegância inspirada na natureza e profundo respeito cultural',
    Persian: 'é envolto em nobreza régia, poesia clássica e simbolismos celestiais de dinastias ancestrais',
    Polynesian: 'ecoa viagens oceânicas, admiração pela natureza e respeito comunitário das ilhas do Pacífico',
    Dutch: 'expressa otimismo resoluto, simplicidade acolhedora e histórico prestígio marítimo',
  },
  id: {
    German: 'memiliki akar historis mendalam dalam tradisi Jermanik, memancarkan ketenangan abadi dan karakter klasik',
    Latin: 'berasal dari zaman klasik kuno, mempertahankan keindahan merdu yang dihargai di seluruh budaya Eropa dan Mediterania',
    Greek: 'membawa warisan filosofis dan mitologis yang mendalam, mencerminkan nilai-nilai kebajikan dan pencerahan kuno',
    Hebrew: 'kaya akan narasi sejarah dan literatur klasik, memiliki signifikansi spiritual yang melintasi berbagai abad',
    Irish: 'mewujudkan kisah puitis dan ketangguhan budaya Gaelik, terkenal dengan irama lirik dan pesonanya',
    Italian: 'mencerminkan keanggunan Romantik dan kehangatan yang dinamis, dibedakan oleh fonetik musikal dan martabat seni',
    French: 'memancarkan kecanggihan abadi dan keanggunan bersahaja, dicintai dalam kesusastraan kontinental',
    Spanish: 'membawa kehangatan hidup dan garis keturunan budaya yang bangga di komunitas berbahasa Spanyol dunia',
    English: 'berasal dari warisan Anglo-Saxon dan Inggris Kuno, memadukan kehangatan alam dengan kehormatan sejati',
    Norse: 'berasal dari cerita rakyat Skandinavia yang heroik, membangkitkan kekuatan, keberanian, dan keindahan alam',
    Arabic: 'memancarkan keindahan puitis dan nuansa bahasa yang kaya, melambangkan harapan mulia dan martabat luhur',
    Scottish: 'membawa ketangguhan kisah Tanah Tinggi (Highlands), ditandai dengan keaslian alami dan kehormatan tradisi',
    Celtic: 'mengambil inspirasi dari cerita rakyat kuno mistis, merayakan ikatan dengan unsur alam dan legenda heroik',
    Slavic: 'memancarkan kehangatan, keteguhan hati yang lembut, serta tradisi luhur Eropa Timur dan Tengah',
    Swahili: 'merayakan niat penuh makna, keceriaan melodi, dan kebanggaan komunitas Afrika Timur',
    Japanese: 'merangkul keharmonisan puitis, keanggunan yang terinspirasi alam, dan penghormatan budaya yang mendalam',
    Persian: 'sarat dengan keanggunan kerajaan, puisi klasik, dan simbolisme langit dari dinasti kuno',
    Polynesian: 'menggemakan pelayaran samudera, keajaiban alam, dan rasa hormat komunitas Pasifik',
    Dutch: 'membawa optimisme teguh, kesederhanaan hangat, dan prestise maritim bersejarah',
  },
  ar: {
    German: 'يمتلك جذوراً تاريخية عميقة في التقاليد الجرمانية، مما يمنحه هيبة راسخة وطابعاً كلاسيكياً عريقاً',
    Latin: 'ينحدر من العصور اللاتينية الكلاسيكية، محتفظاً بنغمة موسيقية خالدة ومحبوبة في الثقافات الأوروبية والمتوسطية',
    Greek: 'يحمل إرثاً فلسفياً وأسطورياً عميقاً يعكس مبادئ الفضيلة والتنوير اليوناني القديم',
    Hebrew: 'يمتلئ بالقصص التاريخية والأدبية العريقة، ويحمل دلالات روحية استمرت عبر القرون',
    Irish: 'يجسد التراث الشعري وروح العزيمة في الثقافة الغيلية الأيرلندية، المعروفة بعذوبة الإيقاع وجاذبيته',
    Italian: 'يعكس الأناقة الإيطالية والدفء الإنساني المتميز بالنطق الموسيقي والذوق الفني الرفيع',
    French: 'يفيض بالرقي الخالد والنعومة الهادئة التي احتفى بها الأدب الأوروبي على مر العصور',
    Spanish: 'يحمل دفئاً مفعماً بالحياة وأصالة ثقافية فخورة تتردد أصداؤها في المجتمعات الناطقة بالإسبانية حول العالم',
    English: 'يستمد جذوره من التراث الإنجليزي والأنجلوسكسوني العريق، جامعاً بين البساطة الرفيعة والأصالة الثابتة',
    Norse: 'ينبع من الأساطير الإسكندنافية البطولية، مستحضراً معاني القوة والشجاعة وحب استكشاف الطبيعة',
    Arabic: 'يشع ببلاغة شعرية راقية ودقة لغوية فريدة، معبراً عن أسمى الأمنيات والشهامة والكرامة',
    Scottish: 'يحمل عراقة المرتفعات الاسكتلندية وصمودها، متسماً بالأصالة والشرف التراثي الراسخ',
    Celtic: 'يستند إلى الأساطير السلتية القديمة، محتفياً بالترابط مع عناصر الطبيعة والبطولات التاريخية',
    Slavic: 'يبعث على الدفء والثبات اللطيف، محاطاً بتراث غني يُحتفى به في شرق ووسط أوروبا',
    Swahili: 'يعبر عن النوايا الطيبة والإشراق اللحني واعتزاز المجتمع في شرق أفريقيا',
    Japanese: 'يتسم بالانسجام الشعري والرقة المستوحاة من الطبيعة والاحترام الثقافي العميق',
    Persian: 'يزخر بالأناقة الملكية والأدب الفارسي الرفيع والرموز الفلكية المحتفية بالعصور التاريخية',
    Polynesian: 'يردد صدى الرحلات البحرية وعجائب المحيطات والتضامن الاجتماعي المنسوج في تراث جزر الهادئ',
    Dutch: 'يعكس التفاؤل الصادق والبساطة الدافئة والتاريخ البحري المرموق',
  },
};

const DEFAULT_ORIGIN: Record<Lang, string> = {
  en: 'carries a distinctive linguistic tradition renowned for melodious timbre and timeless dignity',
  pt: 'carrega uma tradição linguística distinta, famosa por sua melodia harmoniosa e dignidade atemporal',
  id: 'membawa tradisi linguistik khas yang terkenal dengan irama merdu dan martabat yang abadi',
  ar: 'يحمل تقليداً لغوياً مميزاً يشتهر بعذوبة جرسه الصوتي وهيبته الخالدة',
};

export function generateEditorial(item: NameEntry, lang: Lang = 'en') {
  const genderDescriptor =
    GENDER_DESCRIPTORS[lang]?.[item.gender] || GENDER_DESCRIPTORS.en[item.gender];

  const v1 = getVariantIndex(item.name, 1, 3);
  const v2 = getVariantIndex(item.name, 2, 3);
  const v3 = getVariantIndex(item.name, 3, 3);

  const originMap = ORIGIN_HISTORIES[lang] || ORIGIN_HISTORIES.en;
  const originText = originMap[item.origin] || (DEFAULT_ORIGIN[lang] || DEFAULT_ORIGIN.en);

  let openingSentence = '';
  let culturalSentence = '';
  let p2 = '';

  if (lang === 'pt') {
    const intros = [
      `O nome ${item.name} é um célebre prenome ${genderDescriptor} de origem ${item.origin}, tradicionalmente significando "${item.meaning}".`,
      `Com raízes nas ricas tradições de herança ${item.origin}, ${item.name} é um nome ${genderDescriptor} marcante que expressa a definição clássica de "${item.meaning}".`,
      `Carregando o significado histórico de "${item.meaning}", ${item.name} floresce há séculos como um querido nome ${genderDescriptor} de linhagem ${item.origin}.`,
    ];
    openingSentence = intros[v1];

    const culturals = [
      `Etimologicamente, reflete um conceito expressivo que ${originText}. Ao longo das gerações, famílias escolhem ${item.name} por seu equilíbrio fonético e profundidade cultural.`,
      `Linguisticamente, seu significado original oferece uma narrativa rica que ${originText}. A harmonia de suas sílabas conecta tradições ancestrais e sensibilidades modernas.`,
      `Historicamente valorizado através dos tempos, este nome ${originText}. Sua clareza de pronúncia e etimologia inspiradora fazem dele uma escolha apreciada além de fronteiras.`,
    ];
    culturalSentence = culturals[v2];

    const popMap: Record<string, string[]> = {
      'very high': [
        `Nos registros contemporâneos, ${item.name} desfruta de popularidade muito alta, destacando-se com frequência nas primeiras posições de rankings globais.`,
        `Com presença muito expressiva em certidões de nascimento pelo mundo, ${item.name} é um dos nomes mais acolhidos da atualidade, evocando empatia e presença cativante.`,
        `Com destaque muito alto nas preferências modernas, ${item.name} é admirado pela combinação perfeita entre elegância acessível e nobreza tradicional.`,
      ],
      high: [
        `Na onomástica moderna, ${item.name} ostenta alta popularidade, alcançando harmonia entre familiaridade acolhedora e personalidade marcante.`,
        `Apresentando alta frequência de escolha hoje, ${item.name} é o favorito de pais que buscam um equilíbrio entre tradição e contemporaneidade.`,
        `Com forte classificação demográfica, ${item.name} mantém presença elegante sem perder a sensação de singularidade e charme.`,
      ],
      medium: [
        `Com popularidade média e equilibrada, ${item.name} é uma escolha refinada que se destaca com bom gosto em qualquer época.`,
        `Mantendo uma frequência média consistente, ${item.name} atrai quem busca um nome autêntico e sofisticado com ressonância histórica.`,
        `Nas estatísticas atuais, ${item.name} representa uma opção de prestígio e distinção duradoura.`,
      ],
    };
    const arr = popMap[item.popularity] || popMap.high;
    p2 = arr[v3];
  } else if (lang === 'id') {
    const intros = [
      `Nama ${item.name} adalah nama ${genderDescriptor} populer yang berakar dari tradisi ${item.origin}, secara tradisional bermakna "${item.meaning}".`,
      `Berakar dari sejarah luhur ${item.origin}, ${item.name} adalah nama ${genderDescriptor} istimewa dengan makna klasik "${item.meaning}".`,
      `Membawa pesan historis "${item.meaning}", ${item.name} telah lama dicintai sebagai nama ${genderDescriptor} dari garis keturunan ${item.origin}.`,
    ];
    openingSentence = intros[v1];

    const culturals = [
      `Secara etimologis, nama ini mencerminkan konsep bermakna yang ${originText}. Dari generasi ke generasi, para orang tua memilih ${item.name} karena keindahan lafal dan kedalaman maknanya.`,
      `Secara bahasa, akar katanya menghadirkan narasi abadi yang ${originText}. Keseimbangan iramanya mampu menjembatani nilai tradisional dan rasa modern dengan anggun.`,
      `Dihargai secara historis lintas masa, nama ini ${originText}. Kejelasan suku katanya menjadikannya pilihan favorit yang melintasi batas wilayah.`,
    ];
    culturalSentence = culturals[v2];

    const popMap: Record<string, string[]> = {
      'very high': [
        `Dalam catatan kependudukan modern, ${item.name} memiliki tingkat popularitas yang sangat tinggi dan konsisten berada di jajaran teratas grafik nama global.`,
        `Saat ini menikmati frekuensi sangat tinggi di berbagai negara, ${item.name} adalah salah satu nama yang paling banyak dipilih karena memancarkan kehangatan dan wibawa.`,
        `Dengan peringkat yang sangat tinggi hari ini, ${item.name} dipuji secara luas berkat keanggunannya yang ramah dan bernilai historis.`,
      ],
      high: [
        `Dalam penamaan masa kini, ${item.name} memiliki popularitas tinggi yang seimbang antara keakraban universal dan keunikan karakter.`,
        `Menyandang peringkat popularitas tinggi, ${item.name} banyak dipilih keluarga yang menginginkan nama yang mapan sekaligus modern.`,
        `Dengan peringkat demografis yang kuat, ${item.name} tetap tampil bergaya tanpa terkesan berlebihan.`,
      ],
      medium: [
        `Memegang tingkat popularitas menengah yang terhormat, ${item.name} adalah pilihan berkelas yang tampil anggun di setiap masa.`,
        `Dengan peringkat menengah yang stabil, ${item.name} sangat cocok bagi yang menyukai nama klasik dengan nuansa keanggunan tersendiri.`,
        `Dalam tren modern, ${item.name} menghadirkan pilihan yang tulus dan bermakna mendalam.`,
      ],
    };
    const arr = popMap[item.popularity] || popMap.high;
    p2 = arr[v3];
  } else if (lang === 'ar') {
    const intros = [
      `يُعد اسم ${item.name} اسماً شخصياً ${genderDescriptor} شهيراً تعود أصوله إلى التراث ${item.origin}، ويحمل في معناه التقليدي دلالة "${item.meaning}".`,
      `ينحدر اسم ${item.name} من التقاليد العريقة ذات الأصل ${item.origin}، وهو اسم ${genderDescriptor} متميز يجسد المعنى الكلاسيكي "${item.meaning}".`,
      `حاملاً الدلالة التاريخية العميقة "${item.meaning}"، حظي اسم ${item.name} بحضور محبب عبر الأجيال كاسم ${genderDescriptor} من سلالة ${item.origin}.`,
    ];
    openingSentence = intros[v1];

    const culturals = [
      `لغوياً، يعكس الاسم مفهوماً مؤثراً ${originText}. وعلى مر التحولات الاجتماعية، أقبل الآباء دوماً على اختيار اسم ${item.name} لتناغم حروفه وعمقه التراثي.`,
      `من حيث الاشتقاق اللغوي، يمنح الجذر الأصلي معنى بديعاً ${originText}. كما أن إيقاعه الصوتي المتزن يجعله جسراً يربط بين الأصالة الكلاسيكية والروح العصرية.`,
      `نال هذا الاسم تقديراً تاريخياً مستمراً عبر العصور، إذ إنه ${originText}. وتجعل مخارج حروفه الصريحة منه اسماً أثيراً عابراً للحدود.`,
    ];
    culturalSentence = culturals[v2];

    const popMap: Record<string, string[]> = {
      'very high': [
        `في سجلات الأسماء الحديثة، يتمتع اسم ${item.name} بشعبية عالية جداً، ويحتل باستمرار مراتب متقدمة في الإحصاءات العالمية.`,
        `يحظى اسم ${item.name} بانتشار واسع جداً بين المواليد الجدد حول العالم، وهو من أكثر الأسماء قبولاً ومحبة لما يوحيه من إشراق وجاذبية.`,
        `بفضل انتشاره العالي جداً اليوم، يلقى اسم ${item.name} احتفاءً كبيراً لجمعه بين السلاسة العصرية والهيبة الأصيلة.`,
      ],
      high: [
        `في اختيارات الأسماء المعاصرة، يحظى اسم ${item.name} بشعبية عالية تحقق توازناً جميلاً بين الألفة الواسعة والتميز الواضح.`,
        `يحمل اسم ${item.name} تقييماً مرتفعاً في شعبيته اليوم، ويفضله الكثيرون كاسم عريق يواكب متطلبات الحاضر.`,
        `بمكانته المتقدمة في السجلات، يحافظ اسم ${item.name} على بريقه الجذاب دون أن يفقد فرادته وأناقته.`,
      ],
      medium: [
        `يحتل اسم ${item.name} مرتبة انتشار متوسطة ومميزة، ليكون خياراً راقياً يتألق باعتدال وهدوء بعيداً عن التكرار الشائع.`,
        `بشعبية متوسطة ومستقرة، يجذب اسم ${item.name} العائلات الباحثة عن اسم كلاسيكي متفرد وذي رونق خاص.`,
        `في التفضيلات الحديثة، يمثل اسم ${item.name} خياراً عميقاً وصادقاً يرتبط بأصالة تاريخية فريدة.`,
      ],
    };
    const arr = popMap[item.popularity] || popMap.high;
    p2 = arr[v3];
  } else {
    // English default
    const intros = [
      `The name ${item.name} is a celebrated ${genderDescriptor} personal name rooted in ${item.origin} heritage, traditionally signifying "${item.meaning}".`,
      `Rooted in storied ${item.origin} traditions, ${item.name} is a distinctive ${genderDescriptor} name that carries the classic definition of "${item.meaning}".`,
      `Carrying the historic translation of "${item.meaning}", ${item.name} has long flourished as a beloved ${genderDescriptor} name of ${item.origin} lineage.`,
    ];
    openingSentence = intros[v1];

    const culturals = [
      `Etymologically, it reflects an evocative concept that ${originText}. Throughout generational naming shifts, parents have continually gravitated toward ${item.name} for its balanced phonetics and cultural depth.`,
      `Linguistically, the root meaning offers an enduring narrative that ${originText}. Its rhythmic balance allows it to bridge historical customs and modern sensibilities with remarkable ease.`,
      `Historically prized across generations, the moniker ${originText}. Its clear syllables and evocative etymology make it an enduring favorite across borders.`,
    ];
    culturalSentence = culturals[v2];

    const popMap: Record<string, string[]> = {
      'very high': [
        `In contemporary naming registries, ${item.name} commands a very high popularity rating, consistently ranking near the top of global charts. Those who carry the name often project an aura of effortless charisma, creativity, and natural presence.`,
        `Currently enjoying very high frequency across international birth records, ${item.name} is one of the most embraced names of our era. It evokes qualities of warmth, intellectual poise, and leadership.`,
        `With its very high popularity standing today, ${item.name} is celebrated worldwide for its accessible elegance. It combines contemporary style with ancestral distinction.`,
      ],
      high: [
        `In modern nomenclature, ${item.name} holds a high popularity standing, striking a harmonious balance between universal familiarity and distinctive character. It conveys quiet confidence and gracious warmth.`,
        `Bearing a high popularity rating today, ${item.name} is widely favored by parents seeking a name that feels both established and contemporary. Its bearers are frequently associated with curiosity, empathy, and resilience.`,
        `With a strong, high ranking on demographic charts, ${item.name} maintains a stylish presence without feeling overused, radiating timeless dignity and charm.`,
      ],
      medium: [
        `Holding a distinguished medium popularity standing, ${item.name} is a refined choice that stands out tastefully from crowded trend cycles. It suggests an artistic spirit and steadfast individuality.`,
        `With a steady medium popularity rating, ${item.name} appeals to families desiring a classic name that retains an air of exclusivity and quiet sophistication.`,
        `In modern naming registries, ${item.name} enjoys an enduring medium frequency, representing an authentic, thoughtful choice with historical resonance.`,
      ],
    };
    const arr = popMap[item.popularity] || popMap.high;
    p2 = arr[v3];
  }

  const p1 = `${openingSentence} ${culturalSentence}`;
  return { p1, p2, openingSentence };
}

export function getNameDetailFaqs(item: NameEntry, lang: Lang = 'en') {
  if (lang === 'pt') {
    const popPt = item.popularity === 'very high' ? 'muito alta' : item.popularity === 'high' ? 'alta' : 'média';
    return [
      {
        question: `Qual é o significado do nome ${item.name}?`,
        answer: `O nome ${item.name} tem origem ${item.origin} e tradicionalmente significa "${item.meaning}".`,
      },
      {
        question: `Quão popular é o nome ${item.name} hoje em dia?`,
        answer: `${item.name} atualmente mantém uma classificação de popularidade ${popPt} entre nomes de bebês no mundo todo.`,
      },
      {
        question: 'Deseja análises mais profundas? Desbloqueie a análise por IA',
        answer: 'Você pode clicar no botão "Desbloquear Análise com IA" nesta página para gerar interpretações personalizadas, incluindo arquétipos psicológicos, estilo e curiosidades históricas.',
      },
    ];
  }
  if (lang === 'id') {
    const popId = item.popularity === 'very high' ? 'sangat tinggi' : item.popularity === 'high' ? 'tinggi' : 'menengah';
    return [
      {
        question: `Apa arti dari nama ${item.name}?`,
        answer: `Nama ${item.name} berasal dari tradisi ${item.origin} dan secara tradisional bermakna "${item.meaning}".`,
      },
      {
        question: `Seberapa populer nama ${item.name} saat ini?`,
        answer: `${item.name} saat ini memiliki peringkat popularitas ${popId} di antara nama-nama bayi kontemporer di seluruh dunia.`,
      },
      {
        question: 'Ingin wawasan yang lebih mendalam? Buka analisis nama dengan AI',
        answer: 'Anda dapat mengklik tombol "Buka Wawasan AI" di halaman ini untuk menghasilkan interpretasi kaya dan personal yang didukung oleh Google Gemini.',
      },
    ];
  }
  if (lang === 'ar') {
    const popAr = item.popularity === 'very high' ? 'عالية جداً' : item.popularity === 'high' ? 'عالية' : 'متوسطة';
    return [
      {
        question: `ما هو معنى اسم ${item.name}؟`,
        answer: `اسم ${item.name} من أصل ${item.origin} ويعني في التقاليد اللغوية "${item.meaning}".`,
      },
      {
        question: `ما مدى انتشار وشعبية اسم ${item.name} اليوم؟`,
        answer: `يحظى اسم ${item.name} حالياً بتصنيف شعبية ${popAr} بين أسماء المواليد المعاصرة حول العالم.`,
      },
      {
        question: 'هل ترغب في معرفة المزيد؟ افتح التحليل المتقدم بالذكاء الاصطناعي',
        answer: 'يمكنك النقر على زر "فتح تحليلات الذكاء الاصطناعي" في هذه الصفحة لإنشاء تحليلات شخصية ومعلومات تاريخية إضافية بدعم من Google Gemini.',
      },
    ];
  }

  // English
  return [
    {
      question: `What does the name ${item.name} mean?`,
      answer: `The name ${item.name} is of ${item.origin} origin and traditionally signifies "${item.meaning}".`,
    },
    {
      question: `How popular is the name ${item.name} today?`,
      answer: `${item.name} currently holds a ${item.popularity} popularity rating among contemporary baby names worldwide.`,
    },
    {
      question: 'Want deeper insights? Unlock AI analysis of any name',
      answer: `You can click the "Unlock AI Insights" button on this page to generate rich, personalized interpretations—including personality traits, psychological archetypes, style classification, and unique historical fun facts powered by Google Gemini.`,
    },
  ];
}
