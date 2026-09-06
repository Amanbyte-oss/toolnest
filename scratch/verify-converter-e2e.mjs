import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';

const TEST_DIR = path.resolve('scratch/test-images');
const SAMPLE_PNG = path.join(TEST_DIR, 'sample-photo.png');
const TRANSPARENT_PNG = path.join(TEST_DIR, 'transparent-circle.png');
const PHOTO_JPG = path.join(TEST_DIR, 'test-photo.jpg');
const SAMPLE_GIF = path.join(TEST_DIR, 'sample.gif');

async function testConverter() {
  console.log('🚀 Starting Comprehensive End-to-End Test for Image Converter...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 740 }, // Strict 360px mobile viewport!
    acceptDownloads: true
  });
  const page = await context.newPage();

  // Track network requests during conversion
  let networkRequestsDuringConversion = 0;
  let isTrackingNetwork = false;

  page.on('request', req => {
    if (isTrackingNetwork) {
      const url = req.url();
      if (!url.startsWith('blob:') && !url.startsWith('data:')) {
        console.log(`⚠️ Network request detected: ${url}`);
        networkRequestsDuringConversion++;
      }
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Console Error] ${msg.text()}`);
  });

  // 1. Initial Page Load
  console.log('1️⃣ Navigating to http://localhost:4321/image-converter');
  await page.goto('http://localhost:4321/image-converter', { waitUntil: 'networkidle' });

  const dropzone = page.locator('#dropzone');
  const previewCard = page.locator('#preview-card');
  const controlsSection = page.locator('#controls-section');

  if (!(await dropzone.isVisible())) throw new Error('Dropzone should be visible initially');
  if (await previewCard.isVisible()) throw new Error('Preview card should be hidden initially');
  if (await controlsSection.isVisible()) throw new Error('Controls section should be hidden initially');
  console.log('✅ Initial state verified: Dropzone visible, preview & controls hidden.\n');

  // 2. Test PNG → WebP (Smaller ✅) + Network requests check
  console.log('2️⃣ Testing PNG → WebP (Default WebP conversion)...');
  isTrackingNetwork = true;
  networkRequestsDuringConversion = 0;

  await page.setInputFiles('#file-input', SAMPLE_PNG);
  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 8000 });
  
  const fileName = await page.textContent('#file-name');
  const formatSize = await page.textContent('#format-size');
  console.log(`   Preview loaded: ${fileName} — ${formatSize}`);
  if (!formatSize.includes('PNG')) throw new Error(`Expected PNG format in label, got: ${formatSize}`);

  // Wait for WebP conversion to finish
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('Converting');
  }, { timeout: 8000 });

  const webpResult = await page.textContent('#result-text');
  console.log(`   Result Line: "${webpResult}"`);
  if (!webpResult.includes('PNG →') || !webpResult.includes('WebP') || !webpResult.includes('smaller ✅')) {
    throw new Error(`Unexpected result text: ${webpResult}`);
  }
  console.log('✅ PNG → WebP converted successfully and smaller ✅.');

  if (networkRequestsDuringConversion > 0) {
    throw new Error(`Expected 0 network requests during conversion, got ${networkRequestsDuringConversion}`);
  }
  console.log('✅ Zero network requests confirmed (100% client-side).\n');
  isTrackingNetwork = false;

  // Reset for next test
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');

  // 3. Test PNG with transparency → JPG (White background, NO black box!)
  console.log('3️⃣ Testing PNG with transparency → JPG (Flatten transparency onto WHITE)...');
  await page.setInputFiles('#file-input', TRANSPARENT_PNG);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.click('button[data-format="jpg"]');
  
  // Wait for JPG conversion
  await page.waitForTimeout(400);
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('JPG') && !el.textContent.includes('Converting');
  }, { timeout: 8000 });

  const jpgResult = await page.textContent('#result-text');
  console.log(`   Result Line: "${jpgResult}"`);

  // Download the JPG to inspect pixels
  const [downloadJpg] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#download-btn')
  ]);
  const downloadedJpgPath = path.resolve('scratch/test-transparent-output.jpg');
  await downloadJpg.saveAs(downloadedJpgPath);
  console.log(`   Downloaded JPG: ${downloadJpg.suggestedFilename()}`);
  if (!downloadJpg.suggestedFilename().endsWith('.jpg')) {
    throw new Error(`Expected .jpg extension, got ${downloadJpg.suggestedFilename()}`);
  }

  // Inspect pixels using sharp to verify transparent corner became WHITE, NOT BLACK
  const jpgImg = sharp(downloadedJpgPath);
  const { data: rawPixels, info } = await jpgImg.raw().toBuffer({ resolveWithObject: true });
  // Corner at (10, 10):
  const cornerIdx = (10 * info.width + 10) * info.channels;
  const r = rawPixels[cornerIdx];
  const g = rawPixels[cornerIdx + 1];
  const b = rawPixels[cornerIdx + 2];
  console.log(`   Corner pixel RGB (where original was transparent): rgb(${r}, ${g}, ${b})`);
  // Pure white is 255. In JPEG compression, typically 250-255. A black box would be 0!
  if (r < 240 || g < 240 || b < 240) {
    throw new Error(`Black box detected! Expected white background (>240), got rgb(${r}, ${g}, ${b})`);
  }
  console.log('✅ Transparency flattened onto WHITE background successfully (NO black box)!\n');

  // 4. Test Quality Slider & PNG Lossless Note
  console.log('4️⃣ Testing Quality Slider & PNG Lossless Note...');
  const qualityControl = page.locator('#quality-control');
  const pngNote = page.locator('#png-note');

  // Currently on JPG: slider should be visible, note hidden
  if (await qualityControl.getAttribute('class').then(c => c.includes('hidden'))) {
    throw new Error('Quality slider should be visible for JPG');
  }
  if (!await pngNote.getAttribute('class').then(c => c.includes('hidden'))) {
    throw new Error('PNG lossless note should be hidden for JPG');
  }

  // Switch to PNG
  console.log('   Switching format to PNG...');
  await page.click('button[data-format="png"]');
  await page.waitForTimeout(300);

  // Now slider should be hidden, note visible!
  if (!await qualityControl.getAttribute('class').then(c => c.includes('hidden'))) {
    throw new Error('Quality slider should be HIDDEN when PNG is selected');
  }
  if (await pngNote.getAttribute('class').then(c => c.includes('hidden'))) {
    throw new Error('PNG lossless note should be VISIBLE when PNG is selected');
  }
  const noteText = await pngNote.textContent();
  console.log(`   PNG note displayed: "${noteText.trim()}"`);
  console.log('✅ Quality slider correctly hidden for PNG and lossless note displayed.\n');

  // 5. Test ✕ Reset Button
  console.log('5️⃣ Testing ✕ Reset Button...');
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  if (await previewCard.isVisible()) throw new Error('Preview card should be hidden after reset');
  if (await controlsSection.isVisible()) throw new Error('Controls section should be hidden after reset');
  console.log('✅ Reset button cleared state and restored dropzone.\n');

  // 6. Test JPG → PNG (Bigger ⚠️ Warning)
  console.log('6️⃣ Testing JPG → PNG (Bigger ⚠️ warning check)...');
  await page.setInputFiles('#file-input', PHOTO_JPG);
  await page.waitForSelector('#preview-card:not(.hidden)');
  
  // Switch to PNG
  await page.click('button[data-format="png"]');
  await page.waitForTimeout(400);
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('PNG') && !el.textContent.includes('Converting');
  }, { timeout: 8000 });

  const jpgToPngResult = await page.textContent('#result-text');
  console.log(`   Result Line: "${jpgToPngResult}"`);
  if (!jpgToPngResult.includes('Bigger ⚠️') || !jpgToPngResult.includes('try WebP instead')) {
    throw new Error(`Expected "Bigger ⚠️ try WebP instead", got: ${jpgToPngResult}`);
  }
  console.log('✅ Honest "Bigger ⚠️ try WebP instead" warning displayed for JPG → PNG.\n');

  // 7. Test GIF → WebP
  console.log('7️⃣ Testing GIF → WebP...');
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');

  await page.setInputFiles('#file-input', SAMPLE_GIF);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('GIF →') && !el.textContent.includes('Converting');
  }, { timeout: 8000 });

  const gifResult = await page.textContent('#result-text');
  console.log(`   Result Line: "${gifResult}"`);
  if (!gifResult.includes('GIF →') || !gifResult.includes('WebP')) {
    throw new Error(`Expected GIF → WebP conversion, got: ${gifResult}`);
  }
  console.log('✅ GIF → WebP converted successfully.\n');

  // 8. Test Clipboard Paste (Ctrl+V)
  console.log('8️⃣ Testing Clipboard Paste (Ctrl+V)...');
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');

  const imgBuffer = fs.readFileSync(PHOTO_JPG);
  const base64Img = imgBuffer.toString('base64');
  
  await page.evaluate(async (b64) => {
    const res = await fetch(`data:image/jpeg;base64,${b64}`);
    const blob = await res.blob();
    const file = new File([blob], 'pasted-photo.jpg', { type: 'image/jpeg' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(pasteEvent);
  }, base64Img);

  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 5000 });
  const pastedFileName = await page.textContent('#file-name');
  console.log(`   Pasted image loaded: ${pastedFileName}`);
  console.log('✅ Clipboard paste working.\n');

  // 9. Test Arabic RTL Mirroring (/ar/image-converter)
  console.log('9️⃣ Testing Arabic RTL Page (/ar/image-converter)...');
  await page.goto('http://localhost:4321/ar/image-converter', { waitUntil: 'networkidle' });
  const htmlDir = await page.getAttribute('html', 'dir');
  console.log(`   HTML dir: ${htmlDir}`);
  if (htmlDir !== 'rtl') throw new Error(`Expected dir="rtl", got: ${htmlDir}`);
  const title = await page.textContent('h1');
  console.log(`   Arabic Title: ${title}`);

  await page.setInputFiles('#file-input', TRANSPARENT_PNG);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('جارٍ');
  }, { timeout: 8000 });
  const arResult = await page.textContent('#result-text');
  console.log(`   Arabic Result Line: "${arResult}"`);
  console.log('✅ Arabic RTL layout and translations working perfectly.\n');

  await browser.close();
  console.log('🏆 ALL IMAGE CONVERTER VERIFICATION TESTS PASSED PERFECTLY!');
}

testConverter().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
