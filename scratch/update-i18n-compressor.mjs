import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UI_DIR = path.resolve(__dirname, '../src/i18n/ui');

const data = {
  en: {
    title: 'Free Online Image Compressor',
    subtitle: 'Compress JPG, PNG, and WebP images 100% on your device. Fast, private, zero server uploads.',
    privacyBadge: '100% Client-Side • Nothing Leaves Your Device',
    dropzone: {
      tapOrDrop: 'Tap or drop image here',
      clickOrPaste: 'Click to browse or paste with Ctrl+V'
    },
    controls: {
      quality: 'Quality',
      targetPlaceholder: 'Target size, e.g. 100 KB',
      targetLabel: 'Target size (optional)',
      downloadBtn: 'Download Compressed WebP',
      saved: 'Saved',
      biggerWarning: 'Bigger ⚠️ try a lower quality or use target size',
      closestPossible: 'Closest possible: {size} (target {target} KB)',
      compressing: 'Compressing...'
    },
    preview: {
      remove: 'Remove image and start over'
    },
    errors: {
      invalidType: 'Please select a valid JPG, PNG, WebP, or AVIF image.',
      corruptFile: 'Could not decode this image file. It may be corrupt or unreadable.'
    }
  },
  pt: {
    title: 'Compressor de Imagens Online Grátis',
    subtitle: 'Comprima imagens JPG, PNG e WebP 100% no seu dispositivo. Rápido, privado e sem envio para servidores.',
    privacyBadge: '100% no seu dispositivo • Nada é enviado à nuvem',
    dropzone: {
      tapOrDrop: 'Toque ou solte a imagem aqui',
      clickOrPaste: 'Clique para escolher ou cole com Ctrl+V'
    },
    controls: {
      quality: 'Qualidade',
      targetPlaceholder: 'Tamanho alvo, ex: 100 KB',
      targetLabel: 'Tamanho alvo (opcional)',
      downloadBtn: 'Baixar WebP Comprimido',
      saved: 'Economia de',
      biggerWarning: 'Maior ⚠️ tente uma qualidade menor ou use o tamanho alvo',
      closestPossible: 'Menor possível: {size} (alvo {target} KB)',
      compressing: 'Comprimindo...'
    },
    preview: {
      remove: 'Remover imagem e recomeçar'
    },
    errors: {
      invalidType: 'Selecione uma imagem JPG, PNG, WebP ou AVIF válida.',
      corruptFile: 'Não foi possível ler o arquivo de imagem. Pode estar corrompido.'
    }
  },
  id: {
    title: 'Kompres Foto & Gambar Online Gratis',
    subtitle: 'Kecilkan ukuran foto JPG, PNG & WebP 100% di perangkat Anda. Cepat, privat, tanpa upload ke server.',
    privacyBadge: '100% di Perangkat Anda • Tidak Ada yang Diunggah',
    dropzone: {
      tapOrDrop: 'Ketuk atau letakkan foto di sini',
      clickOrPaste: 'Klik untuk memilih atau tempel dengan Ctrl+V'
    },
    controls: {
      quality: 'Kualitas',
      targetPlaceholder: 'Target ukuran, misal 100 KB',
      targetLabel: 'Target ukuran (opsional)',
      downloadBtn: 'Unduh WebP Hasil Kompres',
      saved: 'Hemat',
      biggerWarning: 'Lebih besar ⚠️ coba turunkan kualitas atau gunakan target ukuran',
      closestPossible: 'Paling mendekati: {size} (target {target} KB)',
      compressing: 'Mengompres...'
    },
    preview: {
      remove: 'Hapus foto dan mulai ulang'
    },
    errors: {
      invalidType: 'Harap pilih berkas gambar JPG, PNG, WebP, atau AVIF yang valid.',
      corruptFile: 'Berkas gambar tidak dapat dibaca atau rusak.'
    }
  },
  ar: {
    title: 'ضاغط الصور المجاني عبر الإنترنت',
    subtitle: 'اضغط صور JPG و PNG و WebP بنسبة 100% على جهازك. سريع وآمن وبدون رفع أي ملف لخوادم خارجية.',
    privacyBadge: 'معالجة محلية 100% على جهازك • لا يتم رفع أي شيء',
    dropzone: {
      tapOrDrop: 'اضغط أو أسقط الصورة هنا',
      clickOrPaste: 'انقر للاختيار أو الصق بواسطة Ctrl+V'
    },
    controls: {
      quality: 'الجودة',
      targetPlaceholder: 'الحجم المستهدف، مثلاً 100 كيلوبايت',
      targetLabel: 'الحجم المستهدف (اختياري)',
      downloadBtn: 'تنزيل صورة WebP المضغوطة',
      saved: 'تم توفير',
      biggerWarning: 'الحجم أكبر ⚠️ جرب تقليل الجودة أو حدد حجماً مستهدفاً',
      closestPossible: 'أقرب حجم ممكن: {size} (المستهدف {target} كيلوبايت)',
      compressing: 'جارٍ الضغط...'
    },
    preview: {
      remove: 'إزالة الصورة والبدء من جديد'
    },
    errors: {
      invalidType: 'يرجى اختيار صورة صالحة بصيغة JPG أو PNG أو WebP أو AVIF.',
      corruptFile: 'تعذر فك ترميز ملف الصورة؛ قد يكون تالفاً أو غير صالح.'
    }
  }
};

for (const lang of ['en', 'pt', 'id', 'ar']) {
  const filePath = path.join(UI_DIR, `${lang}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  dict.compressor = data[lang];
  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${lang}.json`);
}
