import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UI_DIR = path.resolve(__dirname, '../src/i18n/ui');

const data = {
  en: {
    nav: 'Image Compressor',
    meta: {
      title: 'Free Image Compressor — Compress JPG, PNG, WebP Online (No Upload)',
      description: 'Compress JPG, PNG, WebP, and AVIF images directly in your browser. 100% private, client-side compression with quality control, batch resize, and no file uploads.'
    },
    compressor: {
      title: 'Free Online Image Compressor',
      subtitle: 'Compress JPG, PNG, WebP & AVIF images 100% on your device. Fast, private, zero server uploads.',
      privacyBadge: '100% Client-Side • Nothing Leaves Your Device',
      privacyBadgeDesc: 'Images are processed entirely in your browser using Canvas & WebAssembly',
      keyTakeaways: {
        title: 'Quick Answer & Key Takeaways',
        kt1: 'Zero Uploads: All compression runs 100% on your device. Your sensitive photos never touch any server or cloud.',
        kt2: 'Smart Presets & Target Size: Reduce sizes by 70–80% with Smart Compress, or hit exact form limits like "Under 100 KB".',
        kt3: 'Batch Processing & ZIP: Compress multiple images at once and download them individually or as a single ZIP archive.'
      },
      dropzone: {
        title: 'Drag & drop images here',
        subtitle: 'or browse from your device, paste from clipboard (Ctrl+V), or take a photo',
        browseBtn: 'Browse Files',
        cameraBtn: 'Take Photo',
        pasteHint: 'Tip: Press Ctrl+V (or Cmd+V) anywhere on the page to paste',
        dragOverText: 'Drop images to start compressing...',
        supportedFormats: 'Supports JPG, PNG, WebP, AVIF up to 50MB each'
      },
      controls: {
        outputFormat: 'Output Format',
        formatWebpDesc: 'Best compression & modern web standard',
        formatJpegDesc: 'Universal compatibility for legacy devices',
        formatPngDesc: 'Lossless graphics with transparency',
        modeLabel: 'Compression Mode',
        modeSmart: 'Smart Compress (~75%)',
        modeManual: 'Custom Quality',
        modeTarget: 'Target File Size',
        qualityLabel: 'Image Quality',
        presetsLabel: 'Presets',
        presetHigh: 'High Quality (90%)',
        presetBalanced: 'Balanced (75%)',
        presetSmall: 'Small Size (55%)',
        presetExtreme: 'Extreme Email (35%)',
        targetSizeLabel: 'Desired Max File Size',
        targetSizeHint: 'Binary searches quality & downscales if needed to hit exact size',
        kbUnit: 'KB',
        mbUnit: 'MB',
        resizeHeading: 'Resize Dimensions (Optional)',
        enableResize: 'Enable image resizing',
        maxWidth: 'Max Width',
        maxHeight: 'Max Height',
        keepAspect: 'Keep aspect ratio',
        scalePresets: 'Quick Scale',
        stripExif: 'Strip EXIF & GPS metadata',
        stripExifHint: 'Removes camera info and location tags for privacy and extra savings',
        applyToAll: 'Re-compress All',
        qualityEstimatedSavings: 'Estimated savings: ~{savings}%'
      },
      batch: {
        queueTitle: 'Compression Queue',
        processing: 'Compressing image {current} of {total}...',
        allDone: 'All {total} images compressed successfully!',
        downloadAllZip: 'Download All (ZIP)',
        zipping: 'Creating ZIP archive...',
        clearAll: 'Clear All',
        totalSaved: 'Total Saved'
      },
      results: {
        original: 'Original',
        compressed: 'Compressed',
        savedBadge: 'Saved {percent}%',
        dimensions: 'Dimensions',
        quality: 'Quality',
        download: 'Download',
        share: 'Share',
        remove: 'Remove',
        compareSlider: 'Compare Quality',
        dragToCompare: 'Drag slider to compare Before / After',
        before: 'Before',
        after: 'After',
        noSavings: 'Already optimal'
      },
      recent: {
        title: 'Recent Compressions (In-Memory)',
        desc: 'Kept in browser memory during this session only. Cleared on refresh to protect your privacy.',
        empty: 'No images compressed in this session yet.'
      },
      errors: {
        invalidType: 'Unsupported file format. Please select JPG, PNG, WebP, or AVIF.',
        fileTooLarge: 'Image file is too large to process in browser memory (over 50MB).',
        corruptFile: 'Could not decode image file. It may be corrupt or unreadable.',
        noImagesInClipboard: 'No image found in clipboard. Copy an image first.',
        zipFailed: 'Failed to create ZIP file. Please download files individually.'
      },
      howTo: {
        title: 'How to Compress Images Online for Free in 3 Steps',
        subtitle: 'A quick guide to reducing image file size in your browser with zero quality compromise.',
        s1Title: 'Upload or paste your images',
        s1Desc: 'Drag and drop your photos, click Browse Files, paste from your clipboard with Ctrl+V, or snap a photo on mobile.',
        s2Title: 'Choose quality, format, or target size',
        s2Desc: 'Select Smart Compress, adjust the quality slider, or specify an exact size limit like "Under 100 KB" for job or visa forms.',
        s3Title: 'Compare quality and download',
        s3Desc: 'Use the interactive before/after slider to verify crisp visual quality, then download individual files or a combined ZIP.'
      }
    },
    faq: [
      {
        q: 'Are my images uploaded to any server or cloud storage?',
        a: 'Never. All compression, resizing, and format conversion happens 100% locally inside your browser using the HTML5 Canvas API and modern WebAssembly. Your photos never leave your device, ensuring total privacy.'
      },
      {
        q: 'Is this online image compressor free to use with no limits?',
        a: 'Yes! ToolNest Image Compressor is completely free, unlimited, and requires no account registration, credit card, or watermarking. You can compress as many files as you need.'
      },
      {
        q: 'Which output format provides the smallest file size?',
        a: 'WebP typically delivers 25–35% smaller file sizes than JPEG at equivalent visual quality. We set WebP as the default output format for maximum compression, but you can also select JPEG or PNG.'
      },
      {
        q: 'How does the Target File Size mode work?',
        a: 'Target Size mode uses a smart binary search algorithm that repeatedly compresses the image to converge on your desired file size (e.g., under 100 KB or 50 KB), automatically adjusting quality and dimensions to guarantee compliance with strict upload limits.'
      },
      {
        q: 'Does compressing images strip EXIF metadata and GPS locations?',
        a: 'Yes, by default metadata stripping is enabled. The tool removes embedded camera models, timestamps, exposure settings, and sensitive GPS geolocation coordinates for enhanced privacy and smaller file size.'
      },
      {
        q: 'How much file size reduction can I expect without noticeable quality loss?',
        a: 'Most photographs achieve between 60% and 80% file size reduction with our Balanced and Smart Compress presets while remaining visually indistinguishable from the original to the human eye.'
      }
    ]
  },
  pt: {
    nav: 'Compressor de Imagens',
    meta: {
      title: 'Compressor de Imagens Grátis — Reduzir JPG, PNG, WebP Online',
      description: 'Comprima imagens JPG, PNG, WebP e AVIF diretamente no navegador. 100% privado, no dispositivo, sem upload para servidores.'
    },
    compressor: {
      title: 'Compressor de Imagens Online Grátis',
      subtitle: 'Comprima imagens JPG, PNG, WebP e AVIF 100% no seu dispositivo. Rápido, privado e sem envio para servidores.',
      privacyBadge: '100% no seu dispositivo • Nada é enviado à nuvem',
      privacyBadgeDesc: 'As imagens são processadas totalmente no seu navegador via Canvas e WebAssembly',
      keyTakeaways: {
        title: 'Resposta Rápida & Principais Destaques',
        kt1: 'Zero Uploads: Toda a compressão roda 100% no seu navegador. Suas fotos nunca passam por servidores.',
        kt2: 'Modos Inteligentes & Tamanho Alvo: Reduza o tamanho em 70–80% ou atinja limites exatos como "Abaixo de 100 KB".',
        kt3: 'Processamento em Lote & ZIP: Comprima várias imagens juntas e baixe individualmente ou em um arquivo ZIP.'
      },
      dropzone: {
        title: 'Arraste e solte imagens aqui',
        subtitle: 'ou procure no dispositivo, cole da área de transferência (Ctrl+V) ou tire uma foto',
        browseBtn: 'Escolher Arquivos',
        cameraBtn: 'Tirar Foto',
        pasteHint: 'Dica: Pressione Ctrl+V (ou Cmd+V) em qualquer lugar para colar',
        dragOverText: 'Solte as imagens para iniciar a compressão...',
        supportedFormats: 'Suporta JPG, PNG, WebP, AVIF de até 50MB cada'
      },
      controls: {
        outputFormat: 'Formato de Saída',
        formatWebpDesc: 'Melhor compressão e padrão moderno da web',
        formatJpegDesc: 'Compatibilidade universal com aparelhos antigos',
        formatPngDesc: 'Gráficos sem perdas com transparência',
        modeLabel: 'Modo de Compressão',
        modeSmart: 'Compressão Inteligente (~75%)',
        modeManual: 'Qualidade Personalizada',
        modeTarget: 'Tamanho Alvo de Arquivo',
        qualityLabel: 'Qualidade da Imagem',
        presetsLabel: 'Predefinições',
        presetHigh: 'Alta Qualidade (90%)',
        presetBalanced: 'Equilibrado (75%)',
        presetSmall: 'Tamanho Pequeno (55%)',
        presetExtreme: 'E-mail Extremo (35%)',
        targetSizeLabel: 'Tamanho Máximo Desejado',
        targetSizeHint: 'Busca binária de qualidade e redimensiona se necessário para atingir o tamanho exato',
        kbUnit: 'KB',
        mbUnit: 'MB',
        resizeHeading: 'Redimensionar Dimensões (Opcional)',
        enableResize: 'Ativar redimensionamento',
        maxWidth: 'Largura Máx.',
        maxHeight: 'Altura Máx.',
        keepAspect: 'Manter proporção original',
        scalePresets: 'Escala Rápida',
        stripExif: 'Remover metadados EXIF e GPS',
        stripExifHint: 'Remove informações de câmera e localização para mais privacidade e menor tamanho',
        applyToAll: 'Recomprimir Tudo',
        qualityEstimatedSavings: 'Economia estimada: ~{savings}%'
      },
      batch: {
        queueTitle: 'Fila de Compressão',
        processing: 'Comprimindo imagem {current} de {total}...',
        allDone: 'Todas as {total} imagens foram comprimidas com sucesso!',
        downloadAllZip: 'Baixar Tudo (ZIP)',
        zipping: 'Criando arquivo ZIP...',
        clearAll: 'Limpar Tudo',
        totalSaved: 'Total Economizado'
      },
      results: {
        original: 'Original',
        compressed: 'Comprimido',
        savedBadge: 'Economia de {percent}%',
        dimensions: 'Dimensões',
        quality: 'Qualidade',
        download: 'Baixar',
        share: 'Compartilhar',
        remove: 'Remover',
        compareSlider: 'Comparar Qualidade',
        dragToCompare: 'Arraste para comparar Antes / Depois',
        before: 'Antes',
        after: 'Depois',
        noSavings: 'Já otimizado'
      },
      recent: {
        title: 'Compressões Recentes (Na Memória)',
        desc: 'Mantidas apenas nesta sessão do navegador. Apagadas ao recarregar a página para sua privacidade.',
        empty: 'Nenhuma imagem comprimida nesta sessão ainda.'
      },
      errors: {
        invalidType: 'Formato não suportado. Selecione JPG, PNG, WebP ou AVIF.',
        fileTooLarge: 'Arquivo muito grande para processar na memória do navegador (mais de 50MB).',
        corruptFile: 'Não foi possível ler o arquivo de imagem. Pode estar corrompido.',
        noImagesInClipboard: 'Nenhuma imagem encontrada na área de transferência.',
        zipFailed: 'Falha ao criar arquivo ZIP. Baixe as imagens individualmente.'
      },
      howTo: {
        title: 'Como Comprimir Imagens Online Grátis em 3 Passos',
        subtitle: 'Guia rápido para diminuir o tamanho de imagens no navegador sem perder qualidade visível.',
        s1Title: 'Envie ou cole suas imagens',
        s1Desc: 'Arraste suas fotos, clique em Escolher Arquivos, cole com Ctrl+V ou capture com a câmera no celular.',
        s2Title: 'Escolha qualidade, formato ou tamanho alvo',
        s2Desc: 'Selecione Compressão Inteligente, ajuste o controle de qualidade ou defina um limite como "Abaixo de 100 KB".',
        s3Title: 'Compare a qualidade e baixe',
        s3Desc: 'Use o comparador interativo antes/depois para checar a nitidez e baixe os arquivos ou um pacote ZIP.'
      }
    },
    faq: [
      {
        q: 'Minhas imagens são enviadas para algum servidor ou nuvem?',
        a: 'Nunca. Toda a compressão, redimensionamento e conversão de formato ocorrem 100% no seu navegador via Canvas e WebAssembly. Suas fotos nunca deixam o seu dispositivo.'
      },
      {
        q: 'Este compressor de imagens online é gratuito e sem limites?',
        a: 'Sim! O Compressor de Imagens do ToolNest é totalmente gratuito, ilimitado, sem necessidade de cadastro ou marca d’água. Comprima quantas fotos quiser.'
      },
      {
        q: 'Qual formato gera o menor tamanho de arquivo?',
        a: 'O WebP normalmente entrega tamanhos de 25% a 35% menores que o JPEG com qualidade visual equivalente. Usamos WebP como padrão, mas você também pode optar por JPEG ou PNG.'
      },
      {
        q: 'Como funciona o modo de Tamanho Alvo de Arquivo?',
        a: 'O modo Tamanho Alvo utiliza busca binária para convergir no tamanho desejado (ex.: menos de 100 KB ou 50 KB), ajustando automaticamente qualidade e dimensões para formulários e inscrições.'
      },
      {
        q: 'A compressão remove metadados EXIF e dados de GPS?',
        a: 'Sim, a remoção de metadados vem ativada por padrão. Informações de modelo de câmera, data e localização geográfica por GPS são eliminadas para sua segurança.'
      },
      {
        q: 'Quanto de redução de tamanho posso esperar sem perder qualidade visível?',
        a: 'A grande maioria das fotos alcança entre 60% e 80% de redução com os modos Inteligente e Equilibrado, permanecendo praticamente idênticas ao olho humano.'
      }
    ]
  },
  id: {
    nav: 'Kompres Foto',
    meta: {
      title: 'Kompres Foto Gratis — Kecilkan Ukuran JPG, PNG, WebP Online',
      description: 'Kompres gambar JPG, PNG, WebP, dan AVIF langsung di browser. 100% privat di perangkat Anda tanpa upload ke server.'
    },
    compressor: {
      title: 'Kompres Foto & Gambar Online Gratis',
      subtitle: 'Kecilkan ukuran foto JPG, PNG, WebP & AVIF 100% di perangkat Anda. Cepat, privat, tanpa upload ke server.',
      privacyBadge: '100% di Perangkat Anda • Tidak Ada yang Diunggah',
      privacyBadgeDesc: 'Gambar diproses sepenuhnya di browser menggunakan Canvas & WebAssembly',
      keyTakeaways: {
        title: 'Jawaban Cepat & Poin Utama',
        kt1: 'Tanpa Upload: Semua kompresi berjalan 100% di browser Anda. Foto pribadi tidak pernah terkirim ke server.',
        kt2: 'Preset Pintar & Target Ukuran: Kurangi ukuran 70–80% atau sesuaikan batas formulir seperti "Di bawah 100 KB".',
        kt3: 'Proses Sekaligus & Unduh ZIP: Kompres banyak foto sekaligus dan unduh satu per satu atau dalam format ZIP.'
      },
      dropzone: {
        title: 'Tarik & lepas foto di sini',
        subtitle: 'atau pilih dari perangkat, tempel dari clipboard (Ctrl+V), atau ambil foto langsung',
        browseBtn: 'Pilih Berkas',
        cameraBtn: 'Ambil Foto',
        pasteHint: 'Tips: Tekan Ctrl+V (atau Cmd+V) di mana saja untuk menempelkan foto',
        dragOverText: 'Lepaskan foto untuk mulai mengompres...',
        supportedFormats: 'Mendukung JPG, PNG, WebP, AVIF hingga 50MB per berkas'
      },
      controls: {
        outputFormat: 'Format Keluaran',
        formatWebpDesc: 'Kompresi terbaik & standar web masa kini',
        formatJpegDesc: 'Kompatibilitas universal untuk semua perangkat',
        formatPngDesc: 'Grafik lossless dengan transparansi',
        modeLabel: 'Mode Kompresi',
        modeSmart: 'Kompres Pintar (~75%)',
        modeManual: 'Kualitas Kustom',
        modeTarget: 'Target Ukuran Berkas',
        qualityLabel: 'Kualitas Gambar',
        presetsLabel: 'Preset Cepat',
        presetHigh: 'Kualitas Tinggi (90%)',
        presetBalanced: 'Seimbang (75%)',
        presetSmall: 'Ukuran Kecil (55%)',
        presetExtreme: 'Ekstrem Email (35%)',
        targetSizeLabel: 'Target Ukuran Maksimal',
        targetSizeHint: 'Pencarian biner otomatis kualitas & resolusi agar pas dengan batas ukuran',
        kbUnit: 'KB',
        mbUnit: 'MB',
        resizeHeading: 'Ubah Resolusi / Dimensi (Opsional)',
        enableResize: 'Aktifkan pengubahan ukuran gambar',
        maxWidth: 'Lebar Maks.',
        maxHeight: 'Tinggi Maks.',
        keepAspect: 'Pertahankan rasio aspek',
        scalePresets: 'Skala Cepat',
        stripExif: 'Hapus metadata EXIF & GPS',
        stripExifHint: 'Hapus info kamera dan koordinat lokasi untuk privasi & hemat ukuran ekstra',
        applyToAll: 'Kompres Ulang Semua',
        qualityEstimatedSavings: 'Estimasi penghematan: ~{savings}%'
      },
      batch: {
        queueTitle: 'Antrean Kompresi',
        processing: 'Mengompres foto {current} dari {total}...',
        allDone: 'Semua {total} foto berhasil dikompres!',
        downloadAllZip: 'Unduh Semua (ZIP)',
        zipping: 'Membuat arsip ZIP...',
        clearAll: 'Hapus Semua',
        totalSaved: 'Total Penghematan'
      },
      results: {
        original: 'Asli',
        compressed: 'Hasil Kompres',
        savedBadge: 'Hemat {percent}%',
        dimensions: 'Resolusi',
        quality: 'Kualitas',
        download: 'Unduh',
        share: 'Bagikan',
        remove: 'Hapus',
        compareSlider: 'Bandingkan Kualitas',
        dragToCompare: 'Geser pembatas untuk bandingkan Sebelum / Sesudah',
        before: 'Sebelum',
        after: 'Sesudah',
        noSavings: 'Sudah optimal'
      },
      recent: {
        title: 'Riwayat Kompresi (Memori Sesi)',
        desc: 'Tersimpan di memori browser selama sesi ini saja. Dihapus saat refresh demi menjaga privasi Anda.',
        empty: 'Belum ada foto yang dikompres pada sesi ini.'
      },
      errors: {
        invalidType: 'Format berkas tidak didukung. Harap pilih JPG, PNG, WebP, atau AVIF.',
        fileTooLarge: 'Ukuran berkas terlalu besar untuk memori browser (lebih dari 50MB).',
        corruptFile: 'Berkas gambar tidak dapat dibaca atau rusak.',
        noImagesInClipboard: 'Tidak ada gambar yang ditemukan di clipboard.',
        zipFailed: 'Gagal membuat berkas ZIP. Silakan unduh foto satu per satu.'
      },
      howTo: {
        title: 'Cara Kompres Foto Online Gratis dalam 3 Langkah',
        subtitle: 'Panduan praktis mengecilkan ukuran gambar di browser tanpa mengurangi ketajaman visual.',
        s1Title: 'Unggah atau tempel foto Anda',
        s1Desc: 'Tarik & lepas foto, klik Pilih Berkas, tempel dengan Ctrl+V, atau potret langsung menggunakan kamera ponsel.',
        s2Title: 'Pilih kualitas, format, atau target ukuran',
        s2Desc: 'Pilih Kompres Pintar, geser slider kualitas, atau tentukan batas seperti "Di bawah 100 KB" untuk lamaran kerja/ujian.',
        s3Title: 'Bandingkan hasil dan unduh',
        s3Desc: 'Gunakan slider sebelum/sesudah untuk memastikan kualitas gambar tetap tajam, lalu unduh berkas atau arsip ZIP.'
      }
    },
    faq: [
      {
        q: 'Apakah foto saya diunggah ke server atau penyimpanan cloud?',
        a: 'Sama sekali tidak. Semua proses kompresi, ubah resolusi, dan konversi format berjalan 100% di browser Anda menggunakan HTML5 Canvas & WebAssembly. Foto Anda tidak pernah meninggalkan perangkat.'
      },
      {
        q: 'Apakah kompresor foto online ini gratis tanpa batas?',
        a: 'Ya! Kompresor Foto ToolNest gratis sepenuhnya tanpa batas jumlah, tanpa perlu mendaftar akun, dan tanpa watermark.'
      },
      {
        q: 'Format apa yang menghasilkan ukuran berkas paling kecil?',
        a: 'WebP biasanya 25–35% lebih kecil dibandingkan JPEG pada kualitas visual yang sama. Kami menjadikan WebP sebagai format standar, tetapi Anda juga dapat memilih JPEG atau PNG.'
      },
      {
        q: 'Bagaimana cara kerja mode Target Ukuran Berkas?',
        a: 'Mode Target Ukuran memakai algoritma pencarian biner untuk mencapai target ukuran persis (misal di bawah 100 KB atau 50 KB) yang sering diwajibkan portal instansi atau visa.'
      },
      {
        q: 'Apakah kompresi ini menghapus data EXIF dan lokasi GPS?',
        a: 'Ya, penghapusan metadata aktif secara default. Tipe kamera, waktu pemotretan, dan lokasi GPS dihapus demi privasi serta menghemat ukuran tambahan.'
      },
      {
        q: 'Berapa persen ukuran foto yang bisa dihemat tanpa merusak kualitas?',
        a: 'Sebagian besar foto berhasil dikurangi ukurannya antara 60% hingga 80% dengan preset Pintar atau Seimbang tanpa perbedaan yang kentara oleh mata manusia.'
      }
    ]
  },
  ar: {
    nav: 'ضغط الصور',
    meta: {
      title: 'ضاغط الصور المجاني — تقليل حجم JPG و PNG و WebP بدون رفع',
      description: 'اضغط صور JPG و PNG و WebP و AVIF مباشرة في متصفحك. خصوصية 100% على جهازك وبدون رفع الصور لأي خادم.'
    },
    compressor: {
      title: 'ضاغط الصور المجاني عبر الإنترنت',
      subtitle: 'اضغط صور JPG و PNG و WebP و AVIF بنسبة 100% على جهازك. سريع وآمن وبدون رفع أي ملف لخوادم خارجية.',
      privacyBadge: 'معالجة محلية 100% على جهازك • لا يتم رفع أي شيء',
      privacyBadgeDesc: 'تتم معالجة وضغط الصور بالكامل داخل المتصفح عبر Canvas و WebAssembly',
      keyTakeaways: {
        title: 'إجابة سريعة وأهم المزايا',
        kt1: 'بدون أي رفع: تتم جميع عمليات الضغط محلياً على جهازك، ولن تغادر صورك الحساسة متصفحك إطلاقاً.',
        kt2: 'أوضاع ذكية وحجم مستهدف: وفّر 70–80% من المساحة أو حدد حجماً أقصى مثل "أقل من 100 كيلوبايت" لنماذج التقديم.',
        kt3: 'ضغط جماعي وتنزيل ZIP: اضغط عدة صور دفعة واحدة ونزّلها فردياً أو في ملف مضغوط ZIP بنقرة واحدة.'
      },
      dropzone: {
        title: 'اسحب وأفلت الصور هنا',
        subtitle: 'أو تصفح من جهازك، أو الصق من الحافظة (Ctrl+V)، أو التقط صورة بالكاميرا',
        browseBtn: 'اختيار الصور',
        cameraBtn: 'التقاط صورة',
        pasteHint: 'تلميح: اضغط Ctrl+V (أو Cmd+V) في أي مكان بالصفحة للصق الصورة',
        dragOverText: 'أفلت الصور لبدء الضغط...',
        supportedFormats: 'يدعم صيغ JPG و PNG و WebP و AVIF حتى 50 ميغابايت لكل صورة'
      },
      controls: {
        outputFormat: 'صيغة الإخراج',
        formatWebpDesc: 'أفضل ضغط ومعيار الويب الحديث',
        formatJpegDesc: 'توافق شامل مع مختلف الأجهزة',
        formatPngDesc: 'رسومات بدون فقدان مع دعم الشفافية',
        modeLabel: 'وضع الضغط',
        modeSmart: 'ضغط ذكي (~75%)',
        modeManual: 'تخصيص الجودة',
        modeTarget: 'تحديد حجم الملف المستهدف',
        qualityLabel: 'جودة الصورة',
        presetsLabel: 'إعدادات جاهزة',
        presetHigh: 'جودة عالية (90%)',
        presetBalanced: 'متوازن (75%)',
        presetSmall: 'حجم صغير (55%)',
        presetExtreme: 'للبريد الإلكتروني (35%)',
        targetSizeLabel: 'أقصى حجم مطلوب للملف',
        targetSizeHint: 'بحث ثنائي ذكي يضبط الجودة والأبعاد للوصول للحجم المطلوب بدقة',
        kbUnit: 'كيلوبايت',
        mbUnit: 'ميغابايت',
        resizeHeading: 'تغيير أبعاد الصورة (اختياري)',
        enableResize: 'تفعيل تغيير الأبعاد',
        maxWidth: 'أقصى عرض',
        maxHeight: 'أقصى ارتفاع',
        keepAspect: 'الحفاظ على تناسق الأبعاد',
        scalePresets: 'نسب تصغير سريعة',
        stripExif: 'حذف بيانات EXIF وموقع GPS',
        stripExifHint: 'يزيل معلومات الكاميرا وإحداثيات الموقع لتعزيز الخصوصية وتوفير الحجم',
        applyToAll: 'إعادة ضغط الكل',
        qualityEstimatedSavings: 'التوفير المتوقع: ~{savings}%'
      },
      batch: {
        queueTitle: 'قائمة الضغط',
        processing: 'جارٍ ضغط الصورة {current} من {total}...',
        allDone: 'تم ضغط جميع الصور الـ {total} بنجاح!',
        downloadAllZip: 'تنزيل الكل (ملف ZIP)',
        zipping: 'جارٍ إنشاء الملف المضغوط ZIP...',
        clearAll: 'مسح الكل',
        totalSaved: 'إجمالي الحجم الموفّر'
      },
      results: {
        original: 'الأصلية',
        compressed: 'المضغوطة',
        savedBadge: 'وفّر {percent}%',
        dimensions: 'الأبعاد',
        quality: 'الجودة',
        download: 'تنزيل',
        share: 'مشاركة',
        remove: 'حذف',
        compareSlider: 'مقارنة الجودة',
        dragToCompare: 'اسحب الفاصل لمقارنة الصورة قبل وبعد الضغط',
        before: 'قبل',
        after: 'بعد',
        noSavings: 'محسنة مسبقاً'
      },
      recent: {
        title: 'الصور المضغوطة حديثاً (في الذاكرة)',
        desc: 'تحفظ في ذاكرة الجلسة فقط وتُمحى تلقائياً عند تحديث الصفحة حفاظاً على خصوصيتك.',
        empty: 'لم يتم ضغط أي صور في هذه الجلسة بعد.'
      },
      errors: {
        invalidType: 'صيغة الملف غير مدعومة. يُرجى اختيار JPG أو PNG أو WebP أو AVIF.',
        fileTooLarge: 'حجم الملف كبير جداً للمعالجة في ذاكرة المتصفح (أكثر من 50 ميغابايت).',
        corruptFile: 'تعذر فك ترميز ملف الصورة؛ قد يكون تالفاً أو غير صالح.',
        noImagesInClipboard: 'لم يتم العثور على أي صورة في الحافظة.',
        zipFailed: 'تعذر إنشاء ملف ZIP. يرجى تنزيل الصور فردياً.'
      },
      howTo: {
        title: 'كيف تضغط الصور مجاناً في 3 خطوات سهلة',
        subtitle: 'دليل سريع لتقليل حجم الصور في متصفحك دون التأثير على وضوحها.',
        s1Title: 'ارفع أو الصق صورك',
        s1Desc: 'اسحب الصور، أو اضغط اختيار الصور، أو الصق بـ Ctrl+V، أو التقط صورة بكاميرا الهاتف.',
        s2Title: 'اختر الجودة أو الصيغة أو الحجم المطلوب',
        s2Desc: 'اختر الضغط الذكي، أو اضبط شريط الجودة، أو حدد حداً أقصى مثل "أقل من 100 كيلوبايت" للتقديمات الرسمية.',
        s3Title: 'قارن الجودة ونزّل الملفات',
        s3Desc: 'استخدم فاصل المقارنة التفاعلي للتأكد من وضوح الصورة، ثم نزّل الصور فردياً أو كملف ZIP مجمّع.'
      }
    },
    faq: [
      {
        q: 'هل يتم رفع صوري إلى أي خادم أو سحابة إلكترونية؟',
        a: 'على الإطلاق. جميع عمليات الضغط وتغيير الأبعاد وتغيير الصيغة تتم محلياً بنسبة 100% داخل متصفحك عبر تقنيات Canvas و WebAssembly دون إرسال أي بايت عبر الإنترنت.'
      },
      {
        q: 'هل هذا الضاغط مجاني للاستخدام وبدون قيود؟',
        a: 'نعم! ضاغط صور ToolNest مجاني بالكامل وبدون أي قيود على عدد الصور، وبدون اشتراك أو علامات مائية.'
      },
      {
        q: 'ما هي الصيغة التي تعطي أقل حجم للملف؟',
        a: 'صيغة WebP توفر عادة حجماً أقل بنسبة 25–35% مقارنة بـ JPEG مع الحفاظ على نفس الجودة البصرية، لذلك اعتمدناها كصيغة افتراضية مع إمكانية اختيار JPEG أو PNG.'
      },
      {
        q: 'كيف يعمل وضع تحديد حجم الملف المستهدف؟',
        a: 'يعتمد هذا الوضع على خوارزمية بحث ثنائي ذكية تكرر ضغط الصورة للوصول بدقة للحجم المطلوب (مثلاً أقل من 100 أو 50 كيلوبايت) اللازم لمعاملات التأشيرات والمواقع الحكومية.'
      },
      {
        q: 'هل يؤدي ضغط الصور إلى إزالة بيانات EXIF ومواقع GPS؟',
        a: 'نعم، خيار إزالة البيانات الوصفية مفعّل افتراضياً لحذف نوع الكاميرا وتاريخ الالتقاط وإحداثيات الموقع الجغرافي لحماية خصوصيتك وتقليل الحجم.'
      },
      {
        q: 'ما هي نسبة تقليل الحجم المتوقعة دون فقدان الجودة؟',
        a: 'تصل نسبة تقليل الحجم في معظم الصور بين 60% و 80% في وضعي الضغط الذكي والمتوازن دون أي فرق ملحوظ للعين المجردة.'
      }
    ]
  }
};

for (const lang of ['en', 'pt', 'id', 'ar']) {
  const filePath = path.join(UI_DIR, `${lang}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const langData = data[lang];

  // 1. common.nav.imageCompressor
  dict.common = dict.common || {};
  dict.common.nav = dict.common.nav || {};
  dict.common.nav.imageCompressor = langData.nav;

  // 2. meta.imageCompressor
  dict.meta = dict.meta || {};
  dict.meta.imageCompressor = langData.meta;

  // 3. compressor namespace
  dict.compressor = langData.compressor;

  // 4. faq.compressor
  dict.faq = dict.faq || {};
  dict.faq.compressor = langData.faq;

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${lang}.json successfully.`);
}
