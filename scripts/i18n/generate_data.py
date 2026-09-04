# -*- coding: utf-8 -*-
"""
Generator script for scripts/i18n/mod_data.py
Translates birthstones, birth flowers, generations, zodiac, life path, related links, and name detail narratives across en, pt, id, ar.
"""

import json

DATA = {
    'birthstones': {
        '1': {
            'name': {'en': 'Garnet', 'pt': 'Granada', 'id': 'Garnet', 'ar': 'العقيق الأحمر (الغرناط)'},
            'meaning': {
                'en': 'Symbolizes protection, vitality, and enduring friendship.',
                'pt': 'Simboliza proteção, vitalidade e amizade duradoura.',
                'id': 'Melambangkan perlindungan, vitalitas, dan persahabatan sejati.',
                'ar': 'يرمز إلى الحماية، والحيوية، وعلاقات الصداقة الراسخة.',
            },
        },
        '2': {
            'name': {'en': 'Amethyst', 'pt': 'Ametista', 'id': 'Ametis', 'ar': 'الجمشت (الأماثيست)'},
            'meaning': {
                'en': 'Symbolizes peace, clarity, and inner strength.',
                'pt': 'Simboliza paz, clareza mental e força interior.',
                'id': 'Melambangkan kedamaian, kejernihan pikiran, dan keteguhan batin.',
                'ar': 'يرمز إلى السلام والصفاء الذهني والقوة الروحية الداخلية.',
            },
        },
        '3': {
            'name': {'en': 'Aquamarine', 'pt': 'Água-Marinha', 'id': 'Akuamarin', 'ar': 'الزبرجد الأزرق (أكوامارين)'},
            'meaning': {
                'en': 'Symbolizes courage, tranquility, and safe travels.',
                'pt': 'Simboliza coragem, tranquilidade e viagens seguras.',
                'id': 'Melambangkan keberanian, ketenangan, dan keselamatan perjalanan.',
                'ar': 'يرمز إلى الشجاعة والسكينة والرحلات الآمنة والسلامة.',
            },
        },
        '4': {
            'name': {'en': 'Diamond', 'pt': 'Diamante', 'id': 'Berlian', 'ar': 'الألماس'},
            'meaning': {
                'en': 'Symbolizes eternal love, strength, and invincibility.',
                'pt': 'Simboliza amor eterno, força inabalável e invencibilidade.',
                'id': 'Melambangkan cinta abadi, kekuatan, dan keteguhan tak terpatahkan.',
                'ar': 'يرمز إلى الحب الأبدي والصلابة والخلود والعزة.',
            },
        },
        '5': {
            'name': {'en': 'Emerald', 'pt': 'Esmeralda', 'id': 'Zamrud', 'ar': 'الزمرد'},
            'meaning': {
                'en': 'Symbolizes rebirth, growth, wisdom, and patience.',
                'pt': 'Simboliza renascimento, crescimento, sabedoria e paciência.',
                'id': 'Melambangkan kelahiran kembali, pertumbuhan, kebijaksanaan, dan kesabaran.',
                'ar': 'يرمز إلى التجدد والنمو والحكمة والصبر والازدهار.',
            },
        },
        '6': {
            'name': {'en': 'Pearl', 'pt': 'Pérola', 'id': 'Mutiara', 'ar': 'اللؤلؤ'},
            'meaning': {
                'en': 'Symbolizes purity, innocence, and timeless wisdom.',
                'pt': 'Simboliza pureza, inocência e sabedoria atemporal.',
                'id': 'Melambangkan kemurnian, keanggunan, dan kebijaksanaan abadi.',
                'ar': 'يرمز إلى النقاء والبراءة والوقار والحكمة الخالدة.',
            },
        },
        '7': {
            'name': {'en': 'Ruby', 'pt': 'Rubi', 'id': 'Rubi', 'ar': 'الياقوت الأحمر'},
            'meaning': {
                'en': 'Symbolizes passion, energy, courage, and vitality.',
                'pt': 'Simboliza paixão, energia, coragem e vitalidade.',
                'id': 'Melambangkan gairah, energi, keberanian, dan semangat hidup.',
                'ar': 'يرمز إلى الشغف والطاقة المتجددة والشجاعة والحيوية.',
            },
        },
        '8': {
            'name': {'en': 'Peridot', 'pt': 'Peridoto', 'id': 'Peridot', 'ar': 'الزبرجد الزيتوني'},
            'meaning': {
                'en': 'Symbolizes harmony, good fortune, and positive energy.',
                'pt': 'Simboliza harmonia, boa sorte e energia positiva.',
                'id': 'Melambangkan keharmonisan, keberuntungan, dan energi positif.',
                'ar': 'يرمز إلى التناغم وحسن الطالع والطاقة الإيجابية.',
            },
        },
        '9': {
            'name': {'en': 'Sapphire', 'pt': 'Safira', 'id': 'Safir', 'ar': 'الياقوت الأزرق (الزفير)'},
            'meaning': {
                'en': 'Symbolizes wisdom, loyalty, truth, and nobility.',
                'pt': 'Simboliza sabedoria, lealdade, verdade e nobreza.',
                'id': 'Melambangkan kebijaksanaan, kesetiaan, kebenaran, dan kemuliaan.',
                'ar': 'يرمز إلى الحكمة والوفاء والصدق والنبل الرفيع.',
            },
        },
        '10': {
            'name': {'en': 'Opal', 'pt': 'Opala', 'id': 'Opal', 'ar': 'الأوبال (عين الهر)'},
            'meaning': {
                'en': 'Symbolizes creativity, hope, spontaneity, and fidelity.',
                'pt': 'Simboliza criatividade, esperança, espontaneidade e fidelidade.',
                'id': 'Melambangkan kreativitas, harapan, spontanitas, dan ketulusan.',
                'ar': 'يرمز إلى الإبداع والأمل والتلقائية والإخلاص.',
            },
        },
        '11': {
            'name': {'en': 'Topaz', 'pt': 'Topázio', 'id': 'Topas', 'ar': 'التوباز (الياقوت الأصفر)'},
            'meaning': {
                'en': 'Symbolizes warmth, empathy, healing, and strength.',
                'pt': 'Simboliza calor humano, empatia, cura e força.',
                'id': 'Melambangkan kehangatan, empati, pemulihan, dan kekuatan.',
                'ar': 'يرمز إلى الدفء والتعاطف والشفاء والقوة النفسية.',
            },
        },
        '12': {
            'name': {'en': 'Turquoise', 'pt': 'Turquesa', 'id': 'Pirus', 'ar': 'الفيروز'},
            'meaning': {
                'en': 'Symbolizes protection, success, luck, and calm.',
                'pt': 'Simboliza proteção, sucesso, sorte e serenidade.',
                'id': 'Melambangkan perlindungan, kesuksesan, keberuntungan, dan ketenangan.',
                'ar': 'يرمز إلى الحماية والنجاح والتوفيق والسكينة والطمأنينة.',
            },
        },
    },
    'birthFlowers': {
        '1': {
            'name': {'en': 'Carnation', 'pt': 'Cravo', 'id': 'Anyelir', 'ar': 'القرنفل'},
            'meaning': {
                'en': 'Symbolizes admiration, deep devotion, and unconditional love.',
                'pt': 'Simboliza admiração, profunda devoção e amor incondicional.',
                'id': 'Melambangkan kekaguman, kesetiaan mendalam, dan kasih sayang tulus.',
                'ar': 'يرمز إلى الإعجاب والوفاء الصادق والمحبة الخالصة.',
            },
        },
        '2': {
            'name': {'en': 'Violet', 'pt': 'Violeta', 'id': 'Violet', 'ar': 'البنفسج'},
            'meaning': {
                'en': 'Symbolizes modesty, spiritual faithfulness, and quiet beauty.',
                'pt': 'Simboliza modéstia, fidelidade espiritual e beleza delicada.',
                'id': 'Melambangkan kesederhanaan, ketulusan spiritual, dan keindahan anggun.',
                'ar': 'يرمز إلى التواضع والوفاء والجمال الهادئ والوقار.',
            },
        },
        '3': {
            'name': {'en': 'Daffodil', 'pt': 'Narciso', 'id': 'Bakung Kuning', 'ar': 'النرجس'},
            'meaning': {
                'en': 'Symbolizes new beginnings, vibrant hope, and joyous rebirth.',
                'pt': 'Simboliza novos começos, esperança vibrante e alegre renascimento.',
                'id': 'Melambangkan awal baru, harapan cerah, dan kelahiran kembali yang penuh sukacita.',
                'ar': 'يرمز إلى البدايات الجديدة والأمل المشرق والتجدد المبهج.',
            },
        },
        '4': {
            'name': {'en': 'Daisy', 'pt': 'Margarida', 'id': 'Aster Daisy', 'ar': 'الأقحوان (الديزي)'},
            'meaning': {
                'en': 'Symbolizes innocence, joyful simplicity, and secret affection.',
                'pt': 'Simboliza inocência, simplicidade alegre e afeto verdadeiro.',
                'id': 'Melambangkan kepolosan, kesederhanaan ceria, dan kasih sayang tulus.',
                'ar': 'يرمز إلى البراءة والبساطة المبهجة والمشاعر النقية.',
            },
        },
        '5': {
            'name': {'en': 'Lily of the Valley', 'pt': 'Lírio-do-Vale', 'id': 'Bakung Lembah', 'ar': 'زنبق الوادي'},
            'meaning': {
                'en': 'Symbolizes the return of happiness, humility, and sweet grace.',
                'pt': 'Simboliza o retorno da felicidade, humildade e doce delicadeza.',
                'id': 'Melambangkan kembalinya kebahagiaan, kerendahan hati, dan keanggunan lembut.',
                'ar': 'يرمز إلى عودة السعادة والتواضع والنعمة والبهجة العذبة.',
            },
        },
        '6': {
            'name': {'en': 'Rose', 'pt': 'Rosa', 'id': 'Mawar', 'ar': 'الورد'},
            'meaning': {
                'en': 'Symbolizes profound romance, enduring passion, and honor.',
                'pt': 'Simboliza romance profundo, paixão duradoura e honra.',
                'id': 'Melambangkan romansa mendalam, gairah abadi, dan kehormatan.',
                'ar': 'يرمز إلى الرومانسية الدافئة والمودة العميقة والرفعة.',
            },
        },
        '7': {
            'name': {'en': 'Larkspur', 'pt': 'Esporinha', 'id': 'Larkspur', 'ar': 'العائق (لاركسبور)'},
            'meaning': {
                'en': 'Symbolizes openness of heart, lighthearted laughter, and positivity.',
                'pt': 'Simboliza coração aberto, riso alegre e atitude positiva.',
                'id': 'Melambangkan kehangatan hati, tawa riang, dan pikiran positif.',
                'ar': 'يرمز إلى انفتاح القلب والمرح والبهجة الإيجابية.',
            },
        },
        '8': {
            'name': {'en': 'Gladiolus', 'pt': 'Gladíolo', 'id': 'Gladiol', 'ar': 'السوسن (الدلبوث)'},
            'meaning': {
                'en': 'Symbolizes strength of character, moral integrity, and remembrance.',
                'pt': 'Simboliza força de caráter, integridade moral e lembrança sincera.',
                'id': 'Melambangkan keteguhan karakter, integritas moral, dan kenangan indah.',
                'ar': 'يرمز إلى قوة الشخصية والنزاهة الأخلاقية والوفاء والذكرى الطيبة.',
            },
        },
        '9': {
            'name': {'en': 'Aster', 'pt': 'Áster', 'id': 'Aster', 'ar': 'زهرة النجمة (أستر)'},
            'meaning': {
                'en': 'Symbolizes delicate elegance, patience, and poetic affection.',
                'pt': 'Simboliza elegância delicada, paciência e afeto poético.',
                'id': 'Melambangkan keanggunan halus, kesabaran, dan kasih sayang puitis.',
                'ar': 'يرمز إلى الأناقة الرقيقة والصبر والمودة الشاعرية.',
            },
        },
        '10': {
            'name': {'en': 'Marigold', 'pt': 'Cravo-de-Defunto (Calêndula)', 'id': 'Marigold (Bunga Tahi Ayam)', 'ar': 'القطيفة (المخملية)'},
            'meaning': {
                'en': 'Symbolizes radiant warmth, passionate ambition, and inner drive.',
                'pt': 'Simboliza calor radiante, ambição calorosa e motivação interior.',
                'id': 'Melambangkan kehangatan cerah, ambisi penuh semangat, dan tekad kuat.',
                'ar': 'يرمز إلى الدفء المتألق والطموح الوقاد والعزيمة الداخلية.',
            },
        },
        '11': {
            'name': {'en': 'Chrysanthemum', 'pt': 'Crisântemo', 'id': 'Krisan', 'ar': 'الأقحوان الذهبي (الكيزانتموم)'},
            'meaning': {
                'en': 'Symbolizes longevity, lasting friendship, and steady cheer.',
                'pt': 'Simboliza longevidade, amizade sincera e alegria constante.',
                'id': 'Melambangkan umur panjang, persahabatan erat, dan keceriaan abadi.',
                'ar': 'يرمز إلى طول العمر والصداقة الدائمة والبهجة المستمرة.',
            },
        },
        '12': {
            'name': {'en': 'Holly', 'pt': 'Azevinho', 'id': 'Holly', 'ar': 'البَهشِيّة (الهولي)'},
            'meaning': {
                'en': 'Symbolizes festive optimism, domestic happiness, and goodwill.',
                'pt': 'Simboliza otimismo festivo, felicidade no lar e boas intenções.',
                'id': 'Melambangkan optimisme perayaan, kebahagiaan keluarga, dan niat baik.',
                'ar': 'يرمز إلى التفاؤل والبهجة العائلية والمودة وحسن النية.',
            },
        },
    },
    'generations': [
        {
            'name': {
                'en': 'Silent Generation',
                'pt': 'Geração Silenciosa',
                'id': 'Generasi Silent',
                'ar': 'الجيل الصامت',
            },
            'shortName': {
                'en': 'Silent',
                'pt': 'Silenciosa',
                'id': 'Silent',
                'ar': 'الصامت',
            },
            'startYear': 1928,
            'endYear': 1945,
            'description': {
                'en': 'Known for resilience, strong work ethic, and civic duty.',
                'pt': 'Conhecida pela resiliência, forte ética profissional e dever cívico.',
                'id': 'Dikenal atas ketangguhan, etos kerja tinggi, dan dedikasi sosial.',
                'ar': 'عُرف هذا الجيل بالصمود، وأخلاقيات العمل الصارمة، والشعور العميق بالواجب.',
            },
        },
        {
            'name': {
                'en': 'Baby Boomers',
                'pt': 'Baby Boomers',
                'id': 'Baby Boomers',
                'ar': 'جيل طفرة المواليد (بيبي بومرز)',
            },
            'shortName': {
                'en': 'Boomers',
                'pt': 'Boomers',
                'id': 'Boomers',
                'ar': 'بومرز',
            },
            'startYear': 1946,
            'endYear': 1964,
            'description': {
                'en': 'Defined by post-war optimism, cultural transformation, and ambition.',
                'pt': 'Marcada pelo otimismo pós-guerra, transformações culturais e ambição.',
                'id': 'Ditandai oleh optimisme pascaperang, revolusi budaya, dan ambisi besar.',
                'ar': 'تميز بالتفاؤل بمرحلة ما بعد الحرب، والتحولات الثقافية والطموح الاقتصادي.',
            },
        },
        {
            'name': {
                'en': 'Generation X',
                'pt': 'Geração X',
                'id': 'Generasi X',
                'ar': 'الجيل إكس (جيل X)',
            },
            'shortName': {
                'en': 'Gen X',
                'pt': 'Geração X',
                'id': 'Gen X',
                'ar': 'جين إكس',
            },
            'startYear': 1965,
            'endYear': 1980,
            'description': {
                'en': 'Characterized by self-reliance, adaptability, and balance.',
                'pt': 'Caracterizada por autossuficiência, grande adaptabilidade e equilíbrio.',
                'id': 'Dicirikan oleh kemandirian kuat, kemampuan adaptasi, dan keseimbangan hidup.',
                'ar': 'اتسم بالاعتماد على النفس، والمرونة العالية في التكيف، والتوازن العملي.',
            },
        },
        {
            'name': {
                'en': 'Millennials',
                'pt': 'Millennials (Geração Y)',
                'id': 'Milenial (Generasi Y)',
                'ar': 'جيل الألفية (جيل Y)',
            },
            'shortName': {
                'en': 'Millennials',
                'pt': 'Millennials',
                'id': 'Milenial',
                'ar': 'الألفية',
            },
            'startYear': 1981,
            'endYear': 1996,
            'description': {
                'en': 'Digital pioneers known for purpose-driven values and collaboration.',
                'pt': 'Pioneiros da era digital conhecidos por valores com propósito e colaboração.',
                'id': 'Pelopor era digital yang menjunjung nilai kebermaknaan dan kolaborasi.',
                'ar': 'رواد عصر الإنترنت الأوائل، وتميزوا بالبحث عن الشغف والمعنى والتعاون.',
            },
        },
        {
            'name': {
                'en': 'Generation Z',
                'pt': 'Geração Z',
                'id': 'Generasi Z',
                'ar': 'الجيل زد (جيل Z)',
            },
            'shortName': {
                'en': 'Gen Z',
                'pt': 'Geração Z',
                'id': 'Gen Z',
                'ar': 'جين زد',
            },
            'startYear': 1997,
            'endYear': 2012,
            'description': {
                'en': 'Digital natives championing authenticity, social impact, and creativity.',
                'pt': 'Nativos digitais que valorizam autenticidade, impacto social e criatividade.',
                'id': 'Generasi melek digital yang mengedepankan keaslian, dampak sosial, dan kreativitas.',
                'ar': 'أبناء العالم الرقمي الأصلاء، والمدافعون عن الأصالة والأثر المجتمعي والإبداع.',
            },
        },
        {
            'name': {
                'en': 'Generation Alpha',
                'pt': 'Geração Alfa',
                'id': 'Generasi Alfa',
                'ar': 'الجيل ألفا (جيل Alpha)',
            },
            'shortName': {
                'en': 'Gen Alpha',
                'pt': 'Geração Alfa',
                'id': 'Gen Alfa',
                'ar': 'جين ألفا',
            },
            'startYear': 2013,
            'endYear': 2025,
            'description': {
                'en': 'Tech-immersed generation shaping the AI-driven connected era.',
                'pt': 'Geração imersa em tecnologia que lidera a era conectada por inteligência artificial.',
                'id': 'Generasi yang tumbuh bersama kecerdasan buatan dan dunia terhubung seutuhnya.',
                'ar': 'جيل نشأ محاطاً بالذكاء الاصطناعي والتكنولوجيا الفائقة في عالم فائق الاتصال.',
            },
        },
    ],
    'zodiac': {
        'aries': {
            'name': {'en': 'Aries', 'pt': 'Áries', 'id': 'Aries', 'ar': 'الحمل'},
            'element': {'en': 'Fire', 'pt': 'Fogo', 'id': 'Api', 'ar': 'ناري'},
            'traits': {
                'en': ['Bold', 'Energetic', 'Courageous', 'Passionate'],
                'pt': ['Corajoso', 'Enérgico', 'Destemido', 'Apaixonado'],
                'id': ['Pemberani', 'Energik', 'Tangguh', 'Penuh Semangat'],
                'ar': ['شجاع', 'مفعم بالطاقة', 'مقدام', 'شغوف'],
            },
        },
        'taurus': {
            'name': {'en': 'Taurus', 'pt': 'Touro', 'id': 'Taurus', 'ar': 'الثور'},
            'element': {'en': 'Earth', 'pt': 'Terra', 'id': 'Tanah', 'ar': 'ترابي'},
            'traits': {
                'en': ['Reliable', 'Patient', 'Practical', 'Devoted'],
                'pt': ['Confiável', 'Paciente', 'Prático', 'Dedicado'],
                'id': ['Dapat Diandalkan', 'Sabar', 'Praktis', 'Setia'],
                'ar': ['موثوق', 'صبور', 'عملي', 'مخلص'],
            },
        },
        'gemini': {
            'name': {'en': 'Gemini', 'pt': 'Gêmeos', 'id': 'Gemini', 'ar': 'الجوزاء'},
            'element': {'en': 'Air', 'pt': 'Ar', 'id': 'Udara', 'ar': 'هوائي'},
            'traits': {
                'en': ['Adaptable', 'Curious', 'Witty', 'Expressive'],
                'pt': ['Adaptável', 'Curioso', 'Espirituoso', 'Expressivo'],
                'id': ['Mudah Beradaptasi', 'Penasaran', 'Cerdas', 'Ekspresif'],
                'ar': ['مرن', 'فضولي المعرفة', 'ذكي ومرح', 'معبّر'],
            },
        },
        'cancer': {
            'name': {'en': 'Cancer', 'pt': 'Câncer', 'id': 'Cancer', 'ar': 'السرطان'},
            'element': {'en': 'Water', 'pt': 'Água', 'id': 'Air', 'ar': 'مائي'},
            'traits': {
                'en': ['Intuitive', 'Empathetic', 'Protective', 'Caring'],
                'pt': ['Intuitivo', 'Empático', 'Protetor', 'Carinhoso'],
                'id': ['Intuitif', 'Empatis', 'Protektif', 'Penyayang'],
                'ar': ['حدسي', 'متعاطف', 'محب ومخلص', 'حنون'],
            },
        },
        'leo': {
            'name': {'en': 'Leo', 'pt': 'Leão', 'id': 'Leo', 'ar': 'الأسد'},
            'element': {'en': 'Fire', 'pt': 'Fogo', 'id': 'Api', 'ar': 'ناري'},
            'traits': {
                'en': ['Confident', 'Generous', 'Charismatic', 'Ambitious'],
                'pt': ['Confiante', 'Generoso', 'Carismático', 'Ambicioso'],
                'id': ['Percaya Diri', 'Murah Hati', 'Karismatik', 'Ambisius'],
                'ar': ['واثق النفس', 'كريم', 'ذو كاريزما', 'طموح'],
            },
        },
        'virgo': {
            'name': {'en': 'Virgo', 'pt': 'Virgem', 'id': 'Virgo', 'ar': 'العذراء'},
            'element': {'en': 'Earth', 'pt': 'Terra', 'id': 'Tanah', 'ar': 'ترابي'},
            'traits': {
                'en': ['Analytical', 'Detail-Oriented', 'Helpful', 'Modest'],
                'pt': ['Analítico', 'Detalhista', 'Prestativo', 'Modesto'],
                'id': ['Analitis', 'Teliti', 'Suka Membantu', 'Rendah Hati'],
                'ar': ['تحليلي', 'دقيق الملاحظة', 'خدوم', 'متواضع'],
            },
        },
        'libra': {
            'name': {'en': 'Libra', 'pt': 'Libra', 'id': 'Libra', 'ar': 'الميزان'},
            'element': {'en': 'Air', 'pt': 'Ar', 'id': 'Udara', 'ar': 'هوائي'},
            'traits': {
                'en': ['Diplomatic', 'Fair-Minded', 'Charming', 'Artistic'],
                'pt': ['Diplomático', 'Justo', 'Charmoso', 'Artístico'],
                'id': ['Diplomatis', 'Adil', 'Menawan', 'Artistik'],
                'ar': ['دبلوماسي', 'منصف وعادل', 'جذاب', 'ذواق للفن'],
            },
        },
        'scorpio': {
            'name': {'en': 'Scorpio', 'pt': 'Escorpião', 'id': 'Scorpio', 'ar': 'العقرب'},
            'element': {'en': 'Water', 'pt': 'Água', 'id': 'Air', 'ar': 'مائي'},
            'traits': {
                'en': ['Intense', 'Resourceful', 'Passionate', 'Loyal'],
                'pt': ['Intenso', 'Engenhoso', 'Apaixonado', 'Leal'],
                'id': ['Tegas', 'Banyak Akal', 'Penuh Gairah', 'Setia'],
                'ar': ['عميق النظرة', 'واسع الحيلة', 'شغوف', 'وفي مخلص'],
            },
        },
        'sagittarius': {
            'name': {'en': 'Sagittarius', 'pt': 'Sagitário', 'id': 'Sagitarius', 'ar': 'القوس'},
            'element': {'en': 'Fire', 'pt': 'Fogo', 'id': 'Api', 'ar': 'ناري'},
            'traits': {
                'en': ['Optimistic', 'Adventurous', 'Philosophical', 'Free-Spirited'],
                'pt': ['Otimista', 'Aventureiro', 'Filosófico', 'Espírito Livre'],
                'id': ['Optimis', 'Suka Petualangan', 'Filosofis', 'Bebas'],
                'ar': ['متفائل', 'مغامر', 'فلسفي التفكير', 'حر الطليعة'],
            },
        },
        'capricorn': {
            'name': {'en': 'Capricorn', 'pt': 'Capricórnio', 'id': 'Capricorn', 'ar': 'الجدي'},
            'element': {'en': 'Earth', 'pt': 'Terra', 'id': 'Tanah', 'ar': 'ترابي'},
            'traits': {
                'en': ['Disciplined', 'Ambitious', 'Patient', 'Strategic'],
                'pt': ['Disciplinado', 'Ambicioso', 'Paciente', 'Estratégico'],
                'id': ['Disiplin', 'Ambisius', 'Sabar', 'Strategis'],
                'ar': ['منضبط', 'طموح', 'صبور', 'استراتيجي التخطيط'],
            },
        },
        'aquarius': {
            'name': {'en': 'Aquarius', 'pt': 'Aquário', 'id': 'Aquarius', 'ar': 'الدلو'},
            'element': {'en': 'Air', 'pt': 'Ar', 'id': 'Udara', 'ar': 'هوائي'},
            'traits': {
                'en': ['Innovative', 'Independent', 'Humanitarian', 'Visionary'],
                'pt': ['Inovador', 'Independente', 'Humanitário', 'Visionário'],
                'id': ['Inovatif', 'Mandiri', 'Humanis', 'Visioner'],
                'ar': ['مبتكر', 'مستقل الفكر', 'إنساني المبدأ', 'صاحب رؤية'],
            },
        },
        'pisces': {
            'name': {'en': 'Pisces', 'pt': 'Peixes', 'id': 'Pisces', 'ar': 'الحوت'},
            'element': {'en': 'Water', 'pt': 'Água', 'id': 'Air', 'ar': 'مائي'},
            'traits': {
                'en': ['Compassionate', 'Imaginative', 'Intuitive', 'Gentle'],
                'pt': ['Compassivo', 'Imaginativo', 'Intuitivo', 'Gentil'],
                'id': ['Penuh Welas Asih', 'Imajinatif', 'Intuitif', 'Lembut'],
                'ar': ['رقيق المشاعر', 'واسع الخيال', 'شديد الحدس', 'وديع'],
            },
        },
    },
    'lifePath': {
        '1': {
            'title': {'en': 'The Leader', 'pt': 'O Líder', 'id': 'Sang Pemimpin', 'ar': 'القائد الملهم'},
            'traits': {'en': 'Independent, Innovative, Ambitious', 'pt': 'Independente, Inovador, Ambicioso', 'id': 'Mandiri, Inovatif, Ambisius', 'ar': 'مستقل، مبتكر، طموح'},
            'summary': {
                'en': 'Pioneering spirits driven to break new ground, embrace self-reliance, and lead with original vision.',
                'pt': 'Pioneiros impulsionados a desbravar novos caminhos, confiar em si mesmos e liderar com visão autêntica.',
                'id': 'Jiwa perintis yang terdorong membuka jalan baru, mandiri, dan memimpin dengan visi orisinal.',
                'ar': 'رواد مستقلون يسعون دائماً لفتح آفاق جديدة والاعتماد على النفس والقيادة برؤية فريدة.',
            },
        },
        '2': {
            'title': {'en': 'The Peacemaker', 'pt': 'O Pacificador', 'id': 'Sang Penengah Damai', 'ar': 'صانع السلام'},
            'traits': {'en': 'Diplomatic, Empathetic, Intuitive', 'pt': 'Diplomático, Empático, Intuitivo', 'id': 'Diplomatis, Empatis, Intuitif', 'ar': 'دبلوماسي، متعاطف، بديهي'},
            'summary': {
                'en': 'Natural mediators and compassionate listeners who thrive by fostering harmony and deep partnerships.',
                'pt': 'Mediadores natos e ouvintes atentos que prosperam cultivando a harmonia e parcerias verdadeiras.',
                'id': 'Penengah alami dan pendengar setia yang bertumbuh dengan menciptakan harmoni serta kerja sama erat.',
                'ar': 'وسطاء بالفطرة ومستمعون متعاطفون يزدهرون بنشر التوافق والسلام وبناء الشراكات العميقة.',
            },
        },
        '3': {
            'title': {'en': 'The Creative', 'pt': 'O Criativo', 'id': 'Sang Kreator', 'ar': 'المبدع الفنان'},
            'traits': {'en': 'Expressive, Optimistic, Charismatic', 'pt': 'Expressivo, Otimista, Carismático', 'id': 'Ekspresif, Optimis, Karismatik', 'ar': 'معبّر، متفائل، صاحب كاريزما'},
            'summary': {
                'en': 'Joyful communicators and artistic souls with a gift for storytelling, humor, and inspiring others.',
                'pt': 'Comunicadores carismáticos e almas artísticas com dom para contar histórias, encantar e inspirar.',
                'id': 'Pribadi menyenangkan dan berjiwa seni dengan bakat bercerita, humor, serta menginspirasi orang lain.',
                'ar': 'متحدثون ملهمون وأرواح فنية تمتلك موهبة السرد والتأثير وإشاعة البهجة والإلهام.',
            },
        },
        '4': {
            'title': {'en': 'The Builder', 'pt': 'O Construtor', 'id': 'Sang Pembangun', 'ar': 'البنّاء المخلص'},
            'traits': {'en': 'Disciplined, Practical, Trustworthy', 'pt': 'Disciplinado, Prático, Confiável', 'id': 'Disiplin, Praktis, Terpercaya', 'ar': 'منضبط، عملي، جدير بالثقة'},
            'summary': {
                'en': 'Steadfast foundations of society who construct lasting value through methodical effort and integrity.',
                'pt': 'Pilares sólidos que constroem realizações duradouras por meio de trabalho metódico e integridade.',
                'id': 'Pondasi kokoh masyarakat yang membangun nilai abadi melalui usaha terencana dan integritas.',
                'ar': 'أركان المجتمع الراسخة الذين يشيدون إنجازات مستدامة بالجهد المنظم والنزاهة العالية.',
            },
        },
        '5': {
            'title': {'en': 'The Adventurer', 'pt': 'O Aventureiro', 'id': 'Sang Petualang', 'ar': 'المغامر الحر'},
            'traits': {'en': 'Adaptable, Freedom-loving, Curious', 'pt': 'Adaptável, Amante da Liberdade, Curioso', 'id': 'Fleksibel, Berjiwa Bebas, Penasaran', 'ar': 'مرن، عاشق للحرية، شغوف بالاستكشاف'},
            'summary': {
                'en': 'Dynamic free spirits who thrive on versatile exploration, cultural discovery, and transformative change.',
                'pt': 'Espíritos livres e dinâmicos que se realizam explorando o mundo, culturas diversas e transformações.',
                'id': 'Pribadi dinamis berjiwa bebas yang berkembang lewat penjelajahan, keragaman budaya, dan perubahan.',
                'ar': 'أرواح حرة وديناميكية تنجح من خلال الاستكشاف والتنوع الثقافي والتغيير الإيجابي المتجدد.',
            },
        },
        '6': {
            'title': {'en': 'The Nurturer', 'pt': 'O Protetor', 'id': 'Sang Pengayom', 'ar': 'الراعي الحنون'},
            'traits': {'en': 'Compassionate, Protective, Responsible', 'pt': 'Compassivo, Protetor, Responsável', 'id': 'Penuh Kasih, Melindungi, Bertanggung Jawab', 'ar': 'رحيم، حامٍ، مسؤول'},
            'summary': {
                'en': 'Heart-centered guardians focused on family, community wellness, emotional healing, and domestic beauty.',
                'pt': 'Guardiões afetuosos dedicados à família, ao bem-estar coletivo, ao cuidado e à harmonia do lar.',
                'id': 'Penjaga berhati tulus yang fokus pada keluarga, kesejahteraan bersama, dan kehangatan rumah tangga.',
                'ar': 'حماة أوفياء يضعون العائلة والمجتمع والترابط الأسري والعاطفي في صميم أولوياتهم.',
            },
        },
        '7': {
            'title': {'en': 'The Seeker', 'pt': 'O Buscador', 'id': 'Sang Pencari Kebenaran', 'ar': 'الباحث عن الحقيقة'},
            'traits': {'en': 'Analytical, Introspective, Spiritual', 'pt': 'Analítico, Introspectivo, Espiritual', 'id': 'Analitis, Introspektif, Spiritual', 'ar': 'تحليلي، متأمل، روحاني'},
            'summary': {
                'en': 'Truth-seekers and philosophical thinkers drawn to unraveling life’s mysteries, sciences, and higher knowledge.',
                'pt': 'Pensadores filosóficos e analíticos atraídos por desvendar os mistérios da vida, da ciência e da sabedoria.',
                'id': 'Pemikir mendalam yang tertarik menyingkap misteri kehidupan, ilmu pengetahuan, dan kebenaran hakiki.',
                'ar': 'فلاسفة وباحثون شغوفون بسبر أغوار الحياة، وفهم العلوم والمعارف الروحية العميقة.',
            },
        },
        '8': {
            'title': {'en': 'The Powerhouse', 'pt': 'O Realizador', 'id': 'Sang Eksekutif', 'ar': 'صاحب الإنجاز والريادة'},
            'traits': {'en': 'Authoritative, Ambitious, Strategic', 'pt': 'Confiante, Ambicioso, Estratégico', 'id': 'Berwibawa, Ambisius, Strategis', 'ar': 'حاسم، طموح، استراتيجي'},
            'summary': {
                'en': 'Goal-oriented visionaries with an innate understanding of material success, executive strategy, and empowerment.',
                'pt': 'Visionários focados em metas, com talento nato para gestão estratégica, liderança e realizações concretas.',
                'id': 'Visioner berorientasi target dengan pemahaman tajam akan kepemimpinan strategis dan kesuksesan nyata.',
                'ar': 'قادة استراتيجيون يمتلكون فهماً عميقاً لتحقيق الأهداف وإدارة المشاريع وصناعة النجاح الملموس.',
            },
        },
        '9': {
            'title': {'en': 'The Humanitarian', 'pt': 'O Humanitário', 'id': 'Sang Humanis', 'ar': 'الإنساني المعطاء'},
            'traits': {'en': 'Altruistic, Broad-minded, Empathetic', 'pt': 'Altruísta, Mente Aberta, Empático', 'id': 'Altruis, Berwawasan Luas, Penuh Empati', 'ar': 'إيثاري، واسع الأفق، رحيم'},
            'summary': {
                'en': 'Selfless world-citizens dedicated to universal compassion, artistic wisdom, and uplifting global consciousness.',
                'pt': 'Cidadãos do mundo dedicados à compaixão universal, sabedoria artística e evolução coletiva.',
                'id': 'Insan berjiwa mulia yang mengabdikan diri pada kasih sayang universal dan kemajuan kemanusiaan.',
                'ar': 'أصحاب رسالة إنسانية مكرسون لنشر التراحم والعدالة ورفعة الوعي الإنساني حول العالم.',
            },
        },
        '11': {
            'title': {'en': 'The Master Intuitive', 'pt': 'O Mestre Intuitivo', 'id': 'Sang Guru Intuitif (Master 11)', 'ar': 'المعلم البديهي (الرقم السيد 11)'},
            'traits': {'en': 'Illuminated, Visionary, Inspiring', 'pt': 'Iluminado, Visionário, Inspirador', 'id': 'Tercerahkan, Visioner, Menginspirasi', 'ar': 'مستنير، ملهم، صاحب بصيرة'},
            'summary': {
                'en': 'A rare Master Number carrying profound spiritual intuition, heightened sensitivity, and prophetic insight.',
                'pt': 'Um Número Mestre raro que carrega profunda intuição espiritual, alta sensibilidade e visão inspiradora.',
                'id': 'Angka Master langka yang membawa intuisi spiritual mendalam, kepekaan batin, dan pandangan visioner.',
                'ar': 'رقم سيد نادر يتمتع أصحابه بحدس روحي استثنائي وبصيرة نفاذة وقدرة على إلهام الآخرين.',
            },
        },
        '22': {
            'title': {'en': 'The Master Builder', 'pt': 'O Mestre Construtor', 'id': 'Sang Pembangun Agung (Master 22)', 'ar': 'البنّاء الأعظم (الرقم السيد 22)'},
            'traits': {'en': 'Visionary, Pragmatic, Transformative', 'pt': 'Visionário, Pragmático, Transformador', 'id': 'Visioner, Pragmatis, Transformatif', 'ar': 'صاحب رؤية، واقعي، مغير للواقع'},
            'summary': {
                'en': 'A powerful Master Number capable of translating grand global ideals into tangible, world-changing structures.',
                'pt': 'Um poderoso Número Mestre capaz de transformar grandes ideais globais em estruturas reais e transformadoras.',
                'id': 'Angka Master luar biasa yang mampu mewujudkan cita-cita besar menjadi karya nyata pembawa perubahan.',
                'ar': 'رقم سيد يمتلك قدرة فريدة على تحويل الأفكار الكبرى إلى مشاريع وكيانات ملموسة تغير العالم للأفضل.',
            },
        },
        '33': {
            'title': {'en': 'The Master Teacher', 'pt': 'O Mestre Educador', 'id': 'Sang Guru Agung (Master 33)', 'ar': 'المعلم المرشد (الرقم السيد 33)'},
            'traits': {'en': 'Compassionate, Guiding, Selfless', 'pt': 'Compassivo, Guia, Desprendido', 'id': 'Penuh Welas Asih, Pembimbing, Tulus', 'ar': 'شديد الرحمة، مرشد، متفانٍ'},
            'summary': {
                'en': 'The pinnacle Master Number embodying supreme empathy, spiritual mentorship, and selfless devotion to humanity.',
                'pt': 'O mais elevado Número Mestre, personificando empatia sublime, mentoria espiritual e devoção altruísta.',
                'id': 'Puncak Angka Master yang mewujudkan empati tertinggi, bimbingan kebajikan, dan ketulusan bagi sesama.',
                'ar': 'أعلى الأرقام السيدة مرتبة، ويجسد قمة التراحم والتوجيه الروحي والتفاني النبيل في خدمة البشرية.',
            },
        },
    },
}

with open('scripts/i18n/mod_data.py', 'w', encoding='utf-8') as f:
    f.write('# -*- coding: utf-8 -*-\n')
    f.write('"""\nModule: Localized datasets for birthstones, birth flowers, generations, zodiac, and life path for en, pt, id, ar.\n"""\n\n')
    f.write('DATA_MODELS = ' + repr(DATA) + '\n')

print("Successfully wrote scripts/i18n/mod_data.py")
