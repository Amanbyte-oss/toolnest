import fs from 'node:fs';
import path from 'node:path';

const UI_DIR = path.resolve('src/i18n/ui');

const enFile = path.join(UI_DIR, 'en.json');
const ptFile = path.join(UI_DIR, 'pt.json');
const idFile = path.join(UI_DIR, 'id.json');
const arFile = path.join(UI_DIR, 'ar.json');

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const pt = JSON.parse(fs.readFileSync(ptFile, 'utf8'));
const id = JSON.parse(fs.readFileSync(idFile, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arFile, 'utf8'));

// 1. common.nav updates
const navUpdates = {
  en: {
    terms: "Terms of Service",
    faq: "FAQ",
    sitemap: "HTML Sitemap",
    toolsDropdown: "Tools",
    imageCategory: "Image & Document Tools",
    utilityCategory: "Calculators & Utilities"
  },
  pt: {
    terms: "Termos de Uso",
    faq: "Perguntas Frequentes",
    sitemap: "Mapa do Site",
    toolsDropdown: "Ferramentas",
    imageCategory: "Ferramentas de Imagem e Documentos",
    utilityCategory: "Calculadoras e Utilitários"
  },
  id: {
    terms: "Syarat Layanan",
    faq: "Tanya Jawab",
    sitemap: "Peta Situs",
    toolsDropdown: "Alat",
    imageCategory: "Alat Gambar & Dokumen",
    utilityCategory: "Kalkulator & Utilitas"
  },
  ar: {
    terms: "شروط الخدمة",
    faq: "الأسئلة الشائعة",
    sitemap: "خريطة الموقع",
    toolsDropdown: "الأدوات",
    imageCategory: "أدوات الصور والمستندات",
    utilityCategory: "الحاسبات والأدوات العامة"
  }
};

// 2. meta updates
const metaUpdates = {
  en: {
    terms: {
      title: "Terms of Service — Legal Terms & Acceptable Use | ToolNest",
      description: "Read ToolNest's Terms of Service. Clear terms on our free client-side utilities, user content ownership, acceptable use, and limitation of liability."
    },
    faq: {
      title: "Frequently Asked Questions (FAQ) — File Privacy & Help | ToolNest",
      description: "Find answers to frequently asked questions about ToolNest: 100% client-side privacy, zero server file uploads, offline compatibility, and free tools."
    },
    sitemap: {
      title: "HTML Sitemap & Tool Directory | ToolNest",
      description: "Explore the complete directory of free client-side image tools, converters, calculators, and legal pages on ToolNest."
    },
    serverError: {
      title: "Server Error (500) | ToolNest",
      description: "An unexpected error occurred. Return to ToolNest homepage to access all free client-side utilities."
    }
  },
  pt: {
    terms: {
      title: "Termos de Uso — Diretrizes e Uso Aceitável | ToolNest",
      description: "Leia os Termos de Uso do ToolNest. Regras claras sobre nossas ferramentas gratuitas no navegador, propriedade dos seus arquivos e isenção de responsabilidade."
    },
    faq: {
      title: "Perguntas Frequentes (FAQ) — Privacidade e Ajuda | ToolNest",
      description: "Tire suas dúvidas sobre o ToolNest: privacidade 100% no dispositivo, processamento sem upload de arquivos, uso offline e ferramentas grátis."
    },
    sitemap: {
      title: "Mapa do Site HTML e Diretório de Ferramentas | ToolNest",
      description: "Explore o catálogo completo de ferramentas gratuitas de imagem, conversores, calculadoras e páginas institucionais no ToolNest."
    },
    serverError: {
      title: "Erro no Servidor (500) | ToolNest",
      description: "Ocorreu um erro inesperado. Volte à página inicial do ToolNest para acessar todas as ferramentas gratuitas."
    }
  },
  id: {
    terms: {
      title: "Syarat Layanan — Ketentuan Penggunaan Legal | ToolNest",
      description: "Baca Syarat Layanan ToolNest. Panduan jelas tentang penggunaan alat web gratis, kepemilikan data pengguna, dan batasan tanggung jawab."
    },
    faq: {
      title: "Pertanyaan Umum (FAQ) — Privasi File & Bantuan | ToolNest",
      description: "Temukan jawaban seputar ToolNest: privasi 100% di perangkat, tanpa unggah file ke server, fitur offline, dan utilitas gratis."
    },
    sitemap: {
      title: "Peta Situs HTML & Direktori Alat | ToolNest",
      description: "Jelajahi direktori lengkap alat gambar gratis, konverter, kalkulator, dan halaman informasi di ToolNest."
    },
    serverError: {
      title: "Kesalahan Server (500) | ToolNest",
      description: "Terjadi kesalahan yang tidak terduga. Kembali ke beranda ToolNest untuk mengakses seluruh utilitas gratis."
    }
  },
  ar: {
    terms: {
      title: "شروط الخدمة — الشروط القانونية والاستخدام العادل | ToolNest",
      description: "اقرأ شروط خدمة ToolNest. بنود واضحة حول استخدام أدواتنا المجانية داخل المتصفح، وملكية بيانات المستخدم، وحدود المسؤولية."
    },
    faq: {
      title: "الأسئلة الشائعة (FAQ) — خصوصية الملفات والمساعدة | ToolNest",
      description: "إجابات وافية لأهم الأسئلة الشائعة حول ToolNest: معالجة الملفات محلياً بدون خوادم، والعمل بدون إنترنت، واستخدام الأدوات مجاناً."
    },
    sitemap: {
      title: "خريطة الموقع ودليل الأدوات | ToolNest",
      description: "استعرض الدليل الشامل لكافة أدوات الصور والمستندات والحاسبات وصفحات الشفافية المتاحة على ToolNest."
    },
    serverError: {
      title: "خطأ في الخادم (500) | ToolNest",
      description: "حدث خطأ غير متوقع. عد إلى الصفحة الرئيسية لمواصلة استخدام أدوات ToolNest المجانية."
    }
  }
};

// 3. contact updates (subject options + retry error)
const contactUpdates = {
  en: {
    subjectPlaceholder: "Select a topic...",
    subjectBug: "Report a Bug",
    subjectSuggestion: "Feature Suggestion",
    subjectNewTool: "New Tool Idea",
    subjectOther: "General Inquiry / Other",
    errorRetry: "Unable to send message directly. Please try again or click the direct email link above."
  },
  pt: {
    subjectPlaceholder: "Selecione um assunto...",
    subjectBug: "Relatar um Erro",
    subjectSuggestion: "Sugestão de Recurso",
    subjectNewTool: "Ideia de Nova Ferramenta",
    subjectOther: "Dúvida Geral / Outro",
    errorRetry: "Não foi possível enviar a mensagem diretamente. Tente novamente ou use o link de e-mail direto acima."
  },
  id: {
    subjectPlaceholder: "Pilih topik pertanyaan...",
    subjectBug: "Laporkan Masalah / Bug",
    subjectSuggestion: "Saran Fitur Baru",
    subjectNewTool: "Ide Alat Baru",
    subjectOther: "Pertanyaan Umum / Lainnya",
    errorRetry: "Gagal mengirim pesan secara otomatis. Silakan coba lagi atau gunakan tautan email langsung di atas."
  },
  ar: {
    subjectPlaceholder: "اختر موضوع الرسالة...",
    subjectBug: "الإبلاغ عن خلل فني",
    subjectSuggestion: "اقتراح ميزة جديدة",
    subjectNewTool: "فكرة أداة جديدة",
    subjectOther: "استفسار عام / أخرى",
    errorRetry: "تعذر إرسال الرسالة تلقائياً. يرجى المحاولة مجدداً أو النقر على رابط البريد المباشر أعلاه."
  }
};

// 4. notFound updates (search input)
const notFoundUpdates = {
  en: {
    searchPlaceholder: "Search our free tools...",
    noToolsFound: "No tools match your search.",
    allTools: "Browse All Tools"
  },
  pt: {
    searchPlaceholder: "Pesquisar ferramentas gratuitas...",
    noToolsFound: "Nenhuma ferramenta encontrada.",
    allTools: "Ver Todas as Ferramentas"
  },
  id: {
    searchPlaceholder: "Cari alat gratis kami...",
    noToolsFound: "Tidak ada alat yang cocok dengan pencarian Anda.",
    allTools: "Jelajahi Semua Alat"
  },
  ar: {
    searchPlaceholder: "ابحث في أدواتنا المجانية...",
    noToolsFound: "لم يتم العثور على أدوات مطابقة لبحثك.",
    allTools: "استعراض كافة الأدوات"
  }
};

// 5. privacy additions (explicit client side, third party, rights)
const privacyUpdates = {
  en: {
    clientSideTitle: "6. Client-Side Processing Architecture",
    clientSideP: "Tools such as our Image Compressor, Image Converter, and Image to PDF converter execute 100% inside your web browser via HTML5 Canvas and WebAssembly. Your photos, documents, and files are never uploaded to any ToolNest server or third-party cloud. Processing occurs in your local device RAM and is cleared when you close the tab.",
    thirdPartiesTitle: "7. Third-Party Services & Advertising",
    thirdPartiesP: "ToolNest is hosted on Cloudflare Pages, utilizing distributed edge infrastructure to serve static web files securely. We may display privacy-compliant advertisements (such as Google AdSense) to maintain our free services. Third-party vendors may use cookies to serve non-intrusive ads based on aggregate visits.",
    aiTitle: "8. AI & External Text Processing",
    aiP: "If you interact with AI-assisted utilities on ToolNest, queries are processed via encrypted edge APIs (such as Gemini API or Groq). No personal files or identifying documents are ever used to train AI models or stored permanently.",
    rightsTitle: "9. Your Data Rights (GDPR, CCPA & LGPD)",
    rightsP: "Under global privacy regulations including the GDPR, CCPA, and LGPD, you have the right to access and delete your data. Because ToolNest does not maintain accounts or server databases, all activity history is stored strictly in your browser's localStorage. You can permanently wipe this data at any time by clicking 'Clear History' or clearing your browser cookies."
  },
  pt: {
    clientSideTitle: "6. Arquitetura de Processamento no Dispositivo",
    clientSideP: "Ferramentas como Compressor de Imagens, Conversor de Imagens e Imagem para PDF executam 100% no seu navegador via HTML5 Canvas e WebAssembly. Suas fotos e documentos nunca são enviados a nenhum servidor ou nuvem do ToolNest. O processamento ocorre na memória do seu dispositivo e é apagado ao fechar a aba.",
    thirdPartiesTitle: "7. Serviços de Terceiros e Publicidade",
    thirdPartiesP: "O ToolNest é hospedado no Cloudflare Pages para fornecer carregamento ultrarrápido e seguro. Podemos exibir anúncios compatíveis com a privacidade (como Google AdSense) para manter nossas ferramentas gratuitas. Provedores parceiros podem utilizar cookies para exibir anúncios relevantes.",
    aiTitle: "8. Inteligência Artificial e Processamento de Texto",
    aiP: "Caso utilize recursos de IA no ToolNest, as consultas são processadas através de conexões seguras e criptografadas (como Gemini ou Groq). Nenhum arquivo pessoal ou documento sensível é usado para treinar modelos de inteligência artificial.",
    rightsTitle: "9. Seus Direitos de Privacidade (LGPD e GDPR)",
    rightsP: "Sob a LGPD e o GDPR, você tem total controle sobre seus dados. Como o ToolNest não possui contas nem banco de dados de usuários, seu histórico fica gravado apenas no localStorage do seu navegador. Você pode apagá-lo a qualquer momento clicando em 'Limpar Histórico' ou limpando os dados do navegador."
  },
  id: {
    clientSideTitle: "6. Arsitektur Pemrosesan Sisi Klien",
    clientSideP: "Alat seperti Kompresor Gambar, Konverter Gambar, dan Gambar ke PDF berjalan 100% langsung di browser Anda melalui HTML5 Canvas dan WebAssembly. Foto dan dokumen Anda tidak pernah diunggah ke server ToolNest mana pun. Pemrosesan terjadi di memori perangkat Anda dan langsung hilang saat tab ditutup.",
    thirdPartiesTitle: "7. Layanan Pihak Ketiga & Iklan",
    thirdPartiesP: "ToolNest dihosting di Cloudflare Pages untuk menyajikan file statis secara cepat dan aman. Kami mungkin menampilkan iklan yang mematuhi privasi (seperti Google AdSense) untuk menjaga layanan tetap gratis bagi semua orang.",
    aiTitle: "8. Kecerdasan Buatan (AI) & Pengolahan Teks",
    aiP: "Jika Anda menggunakan utilitas berbantuan AI di ToolNest, kueri dikirim melalui API terenkripsi (seperti Gemini atau Groq). Tidak ada file atau dokumen pribadi yang disimpan permanen atau dipakai melatih model AI.",
    rightsTitle: "9. Hak Privasi Pengguna (GDPR & Regulasi Data)",
    rightsP: "Anda memiliki hak penuh untuk mengakses dan menghapus data Anda. Karena ToolNest tidak memiliki sistem akun atau database terpusat, riwayat alat hanya tersimpan di localStorage browser Anda dan dapat Anda hapus kapan pun dengan menekan tombol 'Hapus Riwayat'."
  },
  ar: {
    clientSideTitle: "6. بنية المعالجة المحلية داخل المتصفح",
    clientSideP: "تعمل أدوات ضغط الصور وتحويل الصيغ وتحويل الصور إلى PDF بنسبة 100% داخل متصفح جهازك باستخدام تقنيات HTML5 Canvas وWebAssembly. لا يتم رفع صورك أو مستنداتك نهائياً إلى أي خادم خارجي. تتم المعالجة في ذاكرة جهازك وتُحذف فور إغلاق الصفحة.",
    thirdPartiesTitle: "7. خدمات الطرف الثالث والإعلانات",
    thirdPartiesP: "تتم استضافة ToolNest على منصة Cloudflare Pages لتقديم استجابة فائقة السرعة وحماية متقدمة. قد نعرض إعلانات تتوافق مع معايير الخصوصية الصارمة (مثل Google AdSense) لضمان استمرار تقديم خدماتنا مجاناً للجميع.",
    aiTitle: "8. الذكاء الاصطناعي ومعالجة النصوص",
    aiP: "في حال تفاعلك مع أي أدوات مدعومة بالذكاء الاصطناعي على ToolNest، يتم نقل النصوص عبر واجهات برمجية مشفرة بالكامل (مثل Gemini أو Groq). لا يتم استخدام مستنداتك أو ملفاتك لتدريب نماذج الذكاء الاصطناعي إطلاقاً.",
    rightsTitle: "9. حقوق الخصوصية للمستخدم (GDPR وCCPA)",
    rightsP: "بموجب قوانين حماية البيانات الدولية، يحق لك الوصول إلى بياناتك ومسحها. نظراً لأن ToolNest لا يطلب حسابات ولا ينشئ قواعد بيانات للمستخدمين، فإن سجل النشاط يُحفظ محلياً في متصفحك فقط ويمكنك مسحه فوراً بالنقر على 'مسح السجل'."
  }
};

// 6. New Namespace: terms
const termsData = {
  en: {
    title: "Terms of Service | ToolNest",
    metaDesc: "Read the terms and conditions for using ToolNest free, client-side online tools.",
    badge: "Legal & Use Agreement",
    heading: "Terms of Service",
    lastUpdated: "Last updated: September 2026",
    subheading: "Clear, transparent rules for using ToolNest's free, client-side web utilities.",
    acceptanceTitle: "1. Acceptance of Terms",
    acceptanceP: "By accessing or using ToolNest (toolnest.pages.dev), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue using our web tools immediately.",
    freeServiceTitle: "2. Free Service & License",
    freeServiceP: "ToolNest provides free, client-side utilities for personal, professional, and educational use. We grant you a revocable, non-exclusive, non-transferable license to access and use the tools in accordance with these terms.",
    ownershipTitle: "3. Content Ownership & Privacy",
    ownershipP: "You retain 100% intellectual property ownership of all images, documents, numbers, and content you process on ToolNest. Because our tools operate 100% client-side inside your browser sandbox, your content is never copied, viewed, or stored on our servers.",
    acceptableUseTitle: "4. Acceptable Use",
    acceptableUseP: "You agree not to use ToolNest for unlawful activities, attempt to exploit or disrupt server infrastructure, or systematically scrape compiled assets without prior written consent.",
    disclaimerTitle: "5. Disclaimer of Warranties",
    disclaimerP: "All tools and calculations are provided 'as is' and 'as available' without warranties of any kind, either express or implied. While we strive for maximum accuracy, ToolNest does not guarantee uninterrupted or error-free calculations.",
    liabilityTitle: "6. Limitation of Liability",
    liabilityP: "In no event shall ToolNest, its operators, or contributors be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools.",
    changesTitle: "7. Modifications to Terms",
    changesP: "We reserve the right to update these terms at any time. Your continued use of ToolNest following any updates constitutes acceptance of the modified Terms of Service."
  },
  pt: {
    title: "Termos de Uso | ToolNest",
    metaDesc: "Leia os termos e condições para o uso das ferramentas online gratuitas do ToolNest.",
    badge: "Acordo Legal de Uso",
    heading: "Termos de Uso",
    lastUpdated: "Última atualização: Setembro de 2026",
    subheading: "Regras claras e transparentes para a utilização das ferramentas web gratuitas do ToolNest.",
    acceptanceTitle: "1. Aceitação dos Termos",
    acceptanceP: "Ao acessar ou utilizar o ToolNest (toolnest.pages.dev), você concorda com estes Termos de Uso. Caso discorde de qualquer cláusula, solicitamos que interrompa o uso do serviço imediatamente.",
    freeServiceTitle: "2. Serviço Gratuito e Licença de Uso",
    freeServiceP: "O ToolNest disponibiliza utilitários gratuitos para uso pessoal, profissional e educacional. Concedemos uma licença revogável, não exclusiva e intransferível para utilizar os recursos de acordo com estes termos.",
    ownershipTitle: "3. Propriedade dos Arquivos e Privacidade",
    ownershipP: "Você retém 100% da propriedade intelectual sobre todas as fotos, documentos e dados manipulados no ToolNest. Como nossas ferramentas rodam inteiramente no navegador do seu dispositivo, seus arquivos nunca são copiados ou enviados aos nossos servidores.",
    acceptableUseTitle: "4. Uso Aceitável",
    acceptableUseP: "Você concorda em não utilizar o ToolNest para atividades ilícitas, não tentar sobrecarregar ou violar a infraestrutura de rede e não realizar extrações automatizadas abusivas.",
    disclaimerTitle: "5. Isenção de Garantias",
    disclaimerP: "Todas as ferramentas são fornecidas 'como estão' e 'conforme disponíveis', sem garantias expressas ou implícitas. Embora prezem pela precisão técnica, não garantimos funcionamento ininterrupto ou livre de falhas eventuais.",
    liabilityTitle: "6. Limitação de Responsabilidade",
    liabilityP: "Em nenhuma hipótese o ToolNest ou seus desenvolvedores serão responsáveis por quaisquer danos indiretos decorrentes do uso ou da impossibilidade de uso das ferramentas.",
    changesTitle: "7. Alterações nos Termos",
    changesP: "Reservamo-nos o direito de atualizar estes termos a qualquer momento. O uso contínuo do site após alterações representa sua plena concordância com os novos termos."
  },
  id: {
    title: "Syarat Layanan | ToolNest",
    metaDesc: "Baca syarat dan ketentuan penggunaan alat online gratis sisi klien di ToolNest.",
    badge: "Perjanjian & Ketentuan Hukum",
    heading: "Syarat Layanan",
    lastUpdated: "Pembaruan terakhir: September 2026",
    subheading: "Ketentuan yang adil dan transparan untuk penggunaan berbagai utilitas web gratis di ToolNest.",
    acceptanceTitle: "1. Penerimaan Syarat",
    acceptanceP: "Dengan mengakses atau memakai ToolNest (toolnest.pages.dev), Anda setuju terikat pada Syarat Layanan ini. Jika Anda tidak menyetujui bagian mana pun, harap hentikan penggunaan alat kami segera.",
    freeServiceTitle: "2. Layanan Gratis & Lisensi",
    freeServiceP: "ToolNest menyediakan alat bantu gratis untuk keperluan pribadi, kerja, dan pendidikan. Kami memberi Anda lisensi non-eksklusif dan dapat dibatalkan untuk mengakses alat sesuai ketentuan ini.",
    ownershipTitle: "3. Kepemilikan Konten & Privasi",
    ownershipP: "Anda memegang 100% hak cipta atas seluruh gambar, dokumen, angka, dan konten yang diproses di ToolNest. Karena alat kami berjalan 100% di browser Anda, konten Anda tidak pernah disimpan atau diunggah ke server kami.",
    acceptableUseTitle: "4. Penggunaan yang Wajar",
    acceptableUseP: "Anda setuju untuk tidak memanfaatkan ToolNest untuk tindakan melawan hukum, merusak infrastruktur server, atau melakukan scraping otomatis tanpa izin tertulis.",
    disclaimerTitle: "5. Penafian Jaminan",
    disclaimerP: "Semua alat dan perhitungan disediakan 'sebagaimana adanya' tanpa jaminan apa pun, baik tersurat maupun tersirat. Kami tidak menjamin bahwa alat akan selalu bebas dari kesalahan sewaktu-waktu.",
    liabilityTitle: "6. Batasan Tanggung Jawab",
    liabilityP: "Dalam kondisi apa pun, ToolNest maupun pengelolanya tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan alat kami.",
    changesTitle: "7. Perubahan Ketentuan",
    changesP: "Kami berhak memperbarui ketentuan ini kapan pun. Melanjutkan penggunaan ToolNest setelah pembaruan berarti Anda menyetujui syarat layanan yang baru."
  },
  ar: {
    title: "شروط الخدمة | ToolNest",
    metaDesc: "تعرف على شروط وأحكام استخدام أدوات ToolNest المجانية والآمنة داخل المتصفح.",
    badge: "الاتفاقية القانونية وشروط الاستخدام",
    heading: "شروط الخدمة",
    lastUpdated: "آخر تحديث: سبتمبر 2026",
    subheading: "قواعد واضحة وشفافة لاستخدام أدوات وحاسبات ToolNest المجانية بكل أمان.",
    acceptanceTitle: "1. الموافقة على الشروط",
    acceptanceP: "بدخولك واستخدامك لموقع ToolNest (toolnest.pages.dev)، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام أدواتنا فوراً.",
    freeServiceTitle: "2. الخدمة المجانية والترخيص",
    freeServiceP: "يوفر ToolNest أدوات ويب مجانية تعمل على جانب العميل للأغراض الشخصية والمهنية والتعليمية. نمنحك ترخيصاً غير حصري وقابلاً للإلغاء لاستخدام هذه الأدوات وفقاً لهذه الشروط.",
    ownershipTitle: "3. ملكية المحتوى والخصوصية",
    ownershipP: "تحتفظ بكامل حقوق الملكية الفكرية (100%) لجميع الصور والمستندات والبيانات التي تعالجها عبر ToolNest. وبما أن أدواتنا تعمل بالكامل داخل متصفحك، فإن بياناتك لا تُنسخ ولا تُرفع إلى خوادمنا مطلقاً.",
    acceptableUseTitle: "4. الاستخدام المقبول",
    acceptableUseP: "تتعهد بعدم استخدام ToolNest لأي أغراض غير قانونية، وعدم محاولة تعطيل خوادم الموقع أو إجراء عمليات كشط آلي غير مصرح بها.",
    disclaimerTitle: "5. إخلاء المسؤولية عن الضمانات",
    disclaimerP: "تُقدم جميع الأدوات والحاسبات 'كما هي' و'حسب توفرها' دون أي ضمانات صريحة أو ضمنية. ورغم حرصنا على الدقة البالغة، لا نضمن خلو العمليات من الأخطاء العارضة.",
    liabilityTitle: "6. حدود المسؤولية",
    liabilityP: "لا يتحمل ToolNest أو القائمون عليه بأي حال من الأحوال أي مسؤولية عن أي أضرار غير مباشرة تنشأ عن استخدام الأدوات أو تعذر استخدامها.",
    changesTitle: "7. تعديل الشروط",
    changesP: "نحتفظ بالحق في تحديث هذه الشروط في أي وقت. ويعد استمرارك في استخدام ToolNest بعد التحديثات موافقة تامة على الشروط المعدلة."
  }
};

// 7. New Namespace: faqPage
const faqPageData = {
  en: {
    title: "Frequently Asked Questions (FAQ) | ToolNest",
    metaDesc: "Answers to common questions about ToolNest, file privacy, device compatibility, and offline usage.",
    badge: "Help & Answers",
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know about our privacy architecture, file security, and client-side utilities.",
    searchPlaceholder: "Search questions and topics...",
    noResults: "No questions match your search.",
    generalSection: "General & Privacy Questions",
    toolsSection: "Tool-Specific Questions",
    generalFaqs: [
      {
        q: "Is ToolNest completely free to use?",
        a: "Yes! Every single utility on ToolNest is 100% free with no hidden paywalls, no daily usage limits, and no credit card required."
      },
      {
        q: "Do you upload or store my photos, documents, or personal data?",
        a: "Never. All image compression, format conversion, PDF creation, and date calculations execute directly in your browser's memory using HTML5 Canvas and WebAssembly. Your files never leave your device."
      },
      {
        q: "Do I need to create an account or provide an email?",
        a: "No account or registration is ever needed. You can use every tool immediately on desktop, tablet, or mobile without logging in."
      },
      {
        q: "Can I use ToolNest offline without an active internet connection?",
        a: "Yes! Once a tool page has loaded in your browser, all client-side tools (such as Image to PDF, Image Compressor, Age Calculator, and Random Picker) run fully offline."
      },
      {
        q: "Are there any watermarks on downloaded images or PDFs?",
        a: "None whatsoever. All output files are clean and unmodified, with zero watermarks, headers, or branding."
      },
      {
        q: "Which browsers and operating systems are supported?",
        a: "ToolNest is fully compatible with all modern browsers including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge across Windows, macOS, Linux, iOS, and Android."
      }
    ]
  },
  pt: {
    title: "Perguntas Frequentes (FAQ) | ToolNest",
    metaDesc: "Respostas para dúvidas comuns sobre privacidade dos arquivos, compatibilidade e uso offline no ToolNest.",
    badge: "Central de Ajuda e Respostas",
    heading: "Perguntas Frequentes",
    subheading: "Tudo o que você precisa saber sobre nossa segurança, privacidade dos arquivos e ferramentas no navegador.",
    searchPlaceholder: "Pesquise por dúvidas ou tópicos...",
    noResults: "Nenhuma pergunta encontrada com estes termos.",
    generalSection: "Perguntas Gerais e de Privacidade",
    toolsSection: "Dúvidas Específicas sobre as Ferramentas",
    generalFaqs: [
      {
        q: "O ToolNest é totalmente gratuito?",
        a: "Sim! Todas as ferramentas do ToolNest são 100% gratuitas, sem limites diários ocultos e sem necessidade de cartão de crédito."
      },
      {
        q: "Vocês salvam ou enviam minhas fotos e documentos para a nuvem?",
        a: "Nunca. Toda a compressão de imagens, conversão de formatos, criação de PDFs e cálculos rodam na memória do seu navegador via HTML5 Canvas e WebAssembly. Seus arquivos jamais saem do seu aparelho."
      },
      {
        q: "Preciso criar conta ou fazer login para usar?",
        a: "Não é necessário criar conta nem informar e-mail. Você pode usar qualquer ferramenta instantaneamente no celular, tablet ou computador."
      },
      {
        q: "Posso usar o ToolNest offline sem internet?",
        a: "Sim! Após abrir a página da ferramenta, utilitários como Compressor de Imagens, Imagem para PDF e Calculadora de Idade funcionam perfeitamente sem conexão com a internet."
      },
      {
        q: "Existe alguma marca d'água nas imagens ou PDFs baixados?",
        a: "Absolutamente nenhuma. Seus arquivos são gerados limpos, sem marcas d'água, anúncios embutidos ou logotipos."
      },
      {
        q: "Quais navegadores e dispositivos são compatíveis?",
        a: "O ToolNest funciona em todos os navegadores modernos, incluindo Chrome, Safari, Firefox e Edge no Windows, macOS, Linux, Android e iOS."
      }
    ]
  },
  id: {
    title: "Tanya Jawab (FAQ) | ToolNest",
    metaDesc: "Jawaban atas pertanyaan umum tentang privasi file, kompatibilitas perangkat, dan fitur offline di ToolNest.",
    badge: "Bantuan & Informasi",
    heading: "Pertanyaan yang Sering Diajukan",
    subheading: "Segala hal yang perlu Anda ketahui mengenai keamanan file, privasi sisi klien, dan cara kerja alat kami.",
    searchPlaceholder: "Cari pertanyaan dan topik...",
    noResults: "Tidak ada pertanyaan yang sesuai dengan pencarian.",
    generalSection: "Pertanyaan Umum & Privasi",
    toolsSection: "Pertanyaan Khusus Alat",
    generalFaqs: [
      {
        q: "Apakah ToolNest benar-benar gratis?",
        a: "Ya! Semua alat di ToolNest 100% gratis tanpa biaya tersembunyi, tanpa batas kuota harian, dan tanpa kartu kredit."
      },
      {
        q: "Apakah foto dan dokumen saya diunggah ke server?",
        a: "Tidak pernah. Semua proses kompresi gambar, konversi format, pembuatan PDF, dan hitungan tanggal berlangsung di memori browser Anda. File tidak pernah meninggalkan perangkat."
      },
      {
        q: "Apakah saya harus membuat akun atau mendaftar?",
        a: "Tidak perlu membuat akun. Anda dapat langsung menggunakan seluruh alat di HP, tablet, maupun laptop tanpa login."
      },
      {
        q: "Bisakah ToolNest digunakan secara offline tanpa internet?",
        a: "Bisa! Begitu halaman alat selesai dimuat, alat seperti Gambar ke PDF, Kompresor Gambar, dan Kalkulator Umur dapat digunakan penuh tanpa koneksi internet."
      },
      {
        q: "Apakah ada watermark pada gambar atau PDF hasil unduhan?",
        a: "Sama sekali tidak ada watermark. Dokumen dan gambar Anda bersih tanpa watermark atau logo apa pun."
      },
      {
        q: "Browser dan sistem operasi apa saja yang didukung?",
        a: "ToolNest kompatibel dengan semua browser modern seperti Google Chrome, Safari, Firefox, dan Edge di Android, iOS, Windows, Mac, serta Linux."
      }
    ]
  },
  ar: {
    title: "الأسئلة الشائعة (FAQ) | ToolNest",
    metaDesc: "إجابات وافية لأهم الأسئلة حول خصوصية الملفات، والعمل بدون إنترنت، واستخدام أدوات ToolNest.",
    badge: "المساعدة والإجابات الشائعة",
    heading: "الأسئلة الشائعة",
    subheading: "كل ما تحتاج لمعرفته حول بنية الخصوصية، وأمان الملفات، واستخدام أدواتنا المباشرة في المتصفح.",
    searchPlaceholder: "ابحث في الأسئلة والمواضيع...",
    noResults: "لا توجد أسئلة تطابق بحثك الحالي.",
    generalSection: "أسئلة الخصوصية والاستخدام العام",
    toolsSection: "أسئلة خاصة بكل أداة",
    generalFaqs: [
      {
        q: "هل موقع ToolNest مجاني بالكامل؟",
        a: "نعم! جميع الأدوات على ToolNest مجانية بنسبة 100% دون أي رسوم خفية أو قيود يومية أو اشتراكات مطلوبة."
      },
      {
        q: "هل يتم رفع صوري أو مستنداتي إلى أي خوادم؟",
        a: "مستحيل. تتم عمليات ضغط الصور وتحويل الصيغ وتوليد ملفات PDF وحساب التواريخ محلياً في ذاكرة جهازك باستخدام تقنيات المتصفح الحديثة. لا تغادر ملفاتك جهازك أبداً."
      },
      {
        q: "هل يتطلب الموقع إنشاء حساب أو تسجيل الدخول؟",
        a: "لا يلزم إنشاء أي حساب أو إدخال بريد إلكتروني. يمكنك استخدام أي أداة مباشرة على الهاتف أو الحاسوب فور فتح الصفحة."
      },
      {
        q: "هل يمكنني استخدام أدوات ToolNest في وضع عدم الاتصال (بدون إنترنت)؟",
        a: "نعم! بمجرد فتح صفحة الأداة، يمكنك استخدام أدوات مثل تحويل الصور إلى PDF وضاغط الصور وحاسبة العمر دون اتصال نشط بالإنترنت."
      },
      {
        q: "هل توجد أي علامات مائية على الصور أو ملفات PDF الناتجة؟",
        a: "لا توجد أي علامات مائية على الإطلاق. تظل ملفاتك نظيفة تماماً وبكامل جودتها الأصلية بدون أي إعلانات أو شعارات."
      },
      {
        q: "ما هي المتصفحات والأجهزة المتوافقة مع الموقع؟",
        a: "يعمل ToolNest بسلاسة تامة على جميع المتصفحات الحديثة مثل Chrome وSafari وFirefox وEdge عبر الهواتف الذكية والأجهزة اللوحية والحواسيب."
      }
    ]
  }
};

// 8. New Namespace: sitemapPage
const sitemapPageData = {
  en: {
    title: "HTML Sitemap & Tool Directory | ToolNest",
    metaDesc: "Browse all free online tools, converters, calculators, and pages available on ToolNest.",
    badge: "Directory & Index",
    heading: "ToolNest Site Directory",
    subheading: "An organized catalog of every tool, calculator, converter, and informational page available on ToolNest.",
    catImages: "Image & Document Tools",
    catCalculators: "Calculators & Everyday Utilities",
    catTrust: "Trust, Company & Legal"
  },
  pt: {
    title: "Mapa do Site e Diretório de Ferramentas | ToolNest",
    metaDesc: "Navegue por todas as ferramentas gratuitas, conversores, calculadoras e páginas informativas no ToolNest.",
    badge: "Diretório e Índice",
    heading: "Diretório do ToolNest",
    subheading: "Um catálogo completo e organizado com todas as ferramentas, conversores e páginas do ToolNest.",
    catImages: "Ferramentas de Imagem e Documentos",
    catCalculators: "Calculadoras e Utilitários Diários",
    catTrust: "Informações Institucionais e Legais"
  },
  id: {
    title: "Peta Situs & Direktori Alat | ToolNest",
    metaDesc: "Jelajahi seluruh utilitas online gratis, konverter, kalkulator, dan halaman informasi di ToolNest.",
    badge: "Direktori & Indeks",
    heading: "Direktori Situs ToolNest",
    subheading: "Katalog lengkap berisi seluruh alat bantu gratis, konverter, kalkulator, dan informasi resmi di ToolNest.",
    catImages: "Alat Gambar & Dokumen",
    catCalculators: "Kalkulator & Utilitas Sehari-hari",
    catTrust: "Halaman Informasi & Ketentuan Legal"
  },
  ar: {
    title: "خريطة الموقع ودليل الأدوات | ToolNest",
    metaDesc: "استعرض الدليل الشامل لجميع أدوات الصور والمستندات والحاسبات وصفحات الشفافية المتاحة على ToolNest.",
    badge: "فهرس ودليل الموقع",
    heading: "دليل صفحات وأدوات ToolNest",
    subheading: "فهرس منظم وشامل لكافة الأدوات المجانية والمحولات والحاسبات والصفحات القانونية المتوفرة.",
    catImages: "أدوات الصور والمستندات",
    catCalculators: "الحاسبات والأدوات اليومية",
    catTrust: "الصفحات القانونية والشفافية"
  }
};

// 9. New Namespace: newsletter
const newsletterData = {
  en: {
    title: "Stay Updated with New Tools",
    desc: "Subscribe for occasional updates when we launch new free, private utilities. Zero spam.",
    placeholder: "Your email address...",
    button: "Subscribe",
    privacyNote: "Zero spam. Read our {privacyLink}.",
    privacyLinkLabel: "Privacy Policy",
    success: "🎉 Thank you! You're on the list for new tool releases.",
    error: "Please enter a valid email address.",
    alreadySubscribed: "You're already subscribed for updates!"
  },
  pt: {
    title: "Receba Novidades sobre Ferramentas",
    desc: "Inscreva-se para receber atualizações quando lançarmos novos utilitários gratuitos e privados. Sem spam.",
    placeholder: "Seu endereço de e-mail...",
    button: "Inscrever-se",
    privacyNote: "Sem spam. Leia nossa {privacyLink}.",
    privacyLinkLabel: "Política de Privacidade",
    success: "🎉 Obrigado! Você receberá novidades sobre novos lançamentos.",
    error: "Por favor, insira um e-mail válido.",
    alreadySubscribed: "Você já está cadastrado para receber novidades!"
  },
  id: {
    title: "Dapatkan Info Alat Terbaru",
    desc: "Daftar untuk info rilis utilitas gratis dan privat baru dari kami. Bebas spam selamanya.",
    placeholder: "Alamat email Anda...",
    button: "Langganan",
    privacyNote: "Bebas spam. Baca {privacyLink} kami.",
    privacyLinkLabel: "Kebijakan Privasi",
    success: "🎉 Terima kasih! Anda terdaftar untuk info alat baru.",
    error: "Silakan masukkan alamat email yang valid.",
    alreadySubscribed: "Anda sudah terdaftar dalam daftar notifikasi!"
  },
  ar: {
    title: "ابقَ على اطلاع بأحدث الأدوات",
    desc: "اشترك للحصول على إشعارات عند إطلاق أدوات مجانية وآمنة جديدة. بدون أي إعلانات مزعجة.",
    placeholder: "بريدك الإلكتروني...",
    button: "اشتراك",
    privacyNote: "نحترم خصوصيتك. طالع {privacyLink}.",
    privacyLinkLabel: "سياسة الخصوصية",
    success: "🎉 شكراً لك! ستتلقى تحديثات عند إطلاق أدوات جديدة.",
    error: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
    alreadySubscribed: "أنت مسجل بالفعل في قائمة التحديثات!"
  }
};

// 10. New Namespace: serverError
const serverErrorData = {
  en: {
    heading: "Server Error (500)",
    subtext: "Something unexpected happened on our end. Don't worry — our client-side tools run directly on your device and are working normally.",
    backHome: "Return to Homepage",
    exploreTools: "Explore Free Tools"
  },
  pt: {
    heading: "Erro no Servidor (500)",
    subtext: "Ocorreu uma instabilidade inesperada. Fique tranquilo — nossas ferramentas rodam direto no seu aparelho e continuam funcionando normalmente.",
    backHome: "Voltar para a Página Inicial",
    exploreTools: "Ver Ferramentas Gratuitas"
  },
  id: {
    heading: "Kesalahan Server (500)",
    subtext: "Terjadi kesalahan yang tidak terduga. Jangan khawatir — alat bantu kami berjalan langsung di perangkat Anda dan tetap berfungsi normal.",
    backHome: "Kembali ke Beranda",
    exploreTools: "Jelajahi Alat Gratis"
  },
  ar: {
    heading: "خطأ في الخادم (500)",
    subtext: "حدث خلل غير متوقع. لا تقلق — أدواتنا تعمل محلياً على جهازك مباشرة وتواصل العمل بشكل طبيعي.",
    backHome: "العودة إلى الرئيسية",
    exploreTools: "استكشاف الأدوات المجانية"
  }
};

// 11. New Namespace: offline
const offlineData = {
  en: {
    banner: "⚡ You are offline — ToolNest client-side tools continue to work without internet!",
    online: "Back online!"
  },
  pt: {
    banner: "⚡ Você está offline — as ferramentas do ToolNest continuam funcionando sem internet!",
    online: "Conexão restabelecida!"
  },
  id: {
    banner: "⚡ Anda sedang offline — alat sisi klien ToolNest tetap bekerja tanpa internet!",
    online: "Kembali online!"
  },
  ar: {
    banner: "⚡ أنت غير متصل بالإنترنت — تواصل أدوات ToolNest العمل محلياً بدون إنترنت!",
    online: "عادت شبكة الإنترنت!"
  }
};

const dicts = { en, pt, id, ar };
const langs = ['en', 'pt', 'id', 'ar'];

for (const lang of langs) {
  const d = dicts[lang];

  // 1. common.nav
  Object.assign(d.common.nav, navUpdates[lang]);

  // 2. meta
  Object.assign(d.meta, metaUpdates[lang]);

  // 3. contact
  Object.assign(d.contact, contactUpdates[lang]);

  // 4. notFound
  Object.assign(d.notFound, notFoundUpdates[lang]);

  // 5. privacy
  Object.assign(d.privacy, privacyUpdates[lang]);

  // 6. terms
  d.terms = termsData[lang];

  // 7. faqPage
  d.faqPage = faqPageData[lang];

  // 8. sitemapPage
  d.sitemapPage = sitemapPageData[lang];

  // 9. newsletter
  d.newsletter = newsletterData[lang];

  // 10. serverError
  d.serverError = serverErrorData[lang];

  // 11. offline
  d.offline = offlineData[lang];
}

fs.writeFileSync(enFile, JSON.stringify(en, null, 2) + '\n');
fs.writeFileSync(ptFile, JSON.stringify(pt, null, 2) + '\n');
fs.writeFileSync(idFile, JSON.stringify(id, null, 2) + '\n');
fs.writeFileSync(arFile, JSON.stringify(ar, null, 2) + '\n');

console.log('✅ Updated all 4 i18n dictionaries with infrastructure namespaces!');
