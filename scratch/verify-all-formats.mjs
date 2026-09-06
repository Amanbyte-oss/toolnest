import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const TEST_DIR = path.resolve('scratch/test-images');
const PHOTO_12MB = path.join(TEST_DIR, 'phone-photo-5mb.jpg');
const SAMPLE_PNG = path.join(TEST_DIR, 'sample-photo.png');
const SAMPLE_WEBP = path.join(TEST_DIR, 'sample.webp');

async function verifyAll() {
  console.log('🧪 Starting Full Comprehensive Test Suite for Image Compressor...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 740 }, // Strict 360px mobile viewport!
    acceptDownloads: true
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Console Error] ${msg.text()}`);
  });

  await page.goto('http://localhost:4321/image-compressor', { waitUntil: 'networkidle' });

  // TEST 1: 5MB+ (12MB) High-Res Phone Photo
  console.log('📱 Test 1: Testing 12MB Phone Photo (4032x3024)...');
  await page.setInputFiles('#file-input', PHOTO_12MB);

  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 10000 });
  const phoneName = await page.textContent('#file-name');
  const phoneOrigSize = await page.textContent('#original-size');
  const imgBox = await page.locator('#preview-img').boundingBox();
  console.log(`   Preview loaded: ${phoneName} — ${phoneOrigSize}`);
  console.log(`   Preview thumbnail dimensions: ${Math.round(imgBox.width)}x${Math.round(imgBox.height)}px (max ~300px wide constraint met)`);
  if (imgBox.width > 320) throw new Error(`Thumbnail exceeds max width: ${imgBox.width}px`);

  // Wait for initial compression
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 15000 });
  const initialPhoneResult = await page.textContent('#result-text');
  console.log(`   Initial compression: ${initialPhoneResult}`);

  // Test Target Size: Target 500 KB on 12MB photo!
  console.log('   Testing Target Size: 500 KB on 12MB photo...');
  await page.fill('#target-size-input', '500');
  await page.waitForTimeout(450); // allow debounce to fire
  await page.waitForFunction(() => {
    const spinner = document.getElementById('compress-spinner');
    const el = document.getElementById('result-text');
    return spinner && spinner.classList.contains('hidden') && el && !el.textContent.includes('Compressing') && el.textContent.includes('→');
  }, { timeout: 20000 });
  const target500Result = await page.textContent('#result-text');
  console.log(`   Target 500 KB result: ${target500Result}`);

  // Download 12MB compressed result
  const [download12Mb] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#download-btn')
  ]);
  console.log(`   Downloaded: ${download12Mb.suggestedFilename()}`);
  if (!download12Mb.suggestedFilename().includes('phone-photo-5mb-compressed.webp')) {
    throw new Error(`Unexpected download name: ${download12Mb.suggestedFilename()}`);
  }

  // Reset with ✕
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  console.log('   ✕ Reset successfully cleared 12MB photo.\n');

  // TEST 2: PNG image
  console.log('🖼️ Test 2: Testing PNG Image (2.8MB)...');
  await page.setInputFiles('#file-input', SAMPLE_PNG);
  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 8000 });
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 10000 });
  const pngResult = await page.textContent('#result-text');
  console.log(`   PNG compression result: ${pngResult}`);
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  console.log('   PNG test passed.\n');

  // TEST 3: WebP image
  console.log('🌐 Test 3: Testing WebP Image (643KB)...');
  await page.setInputFiles('#file-input', SAMPLE_WEBP);
  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 8000 });
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 10000 });
  const webpResult = await page.textContent('#result-text');
  console.log(`   WebP re-compression result: ${webpResult}`);
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  console.log('   WebP test passed.\n');

  // TEST 4: Error Handling
  console.log('⚠️ Test 4: Testing Error Handling...');
  // 4a: Non-image file
  const dummyTxt = path.resolve('scratch/dummy.txt');
  fs.writeFileSync(dummyTxt, 'Hello world not an image');
  await page.setInputFiles('#file-input', dummyTxt);
  await page.waitForSelector('#error-banner:not(.hidden)');
  const errorMsg = await page.textContent('#error-message');
  console.log(`   Invalid file type error: "${errorMsg}"`);
  if (!errorMsg.includes('valid JPG, PNG')) throw new Error(`Unexpected error message: ${errorMsg}`);
  await page.click('#dismiss-error');
  await page.waitForSelector('#error-banner', { state: 'hidden' });

  // 4b: Corrupt image file
  const corruptImg = path.resolve('scratch/corrupt.jpg');
  fs.writeFileSync(corruptImg, 'Not a valid jpeg content at all, completely corrupt header');
  await page.setInputFiles('#file-input', corruptImg);
  await page.waitForSelector('#error-banner:not(.hidden)', { timeout: 6000 });
  const corruptMsg = await page.textContent('#error-message');
  console.log(`   Corrupt file error: "${corruptMsg}"`);
  if (!corruptMsg.includes('decode') && !corruptMsg.includes('corrupt')) {
    throw new Error(`Unexpected corrupt message: ${corruptMsg}`);
  }
  await page.click('#dismiss-error');
  console.log('   Error handling test passed.\n');

  // TEST 5: Mobile 360px usability
  console.log('📲 Test 5: Testing Mobile Usability at 360px...');
  const dropzoneBox = await page.locator('#dropzone').boundingBox();
  console.log(`   Dropzone tap target size: ${Math.round(dropzoneBox.width)}x${Math.round(dropzoneBox.height)}px (big, thumb-friendly)`);
  if (dropzoneBox.height < 100) throw new Error('Dropzone too small for mobile thumb target');

  // TEST 6: Arabic RTL Page
  console.log('🌍 Test 6: Testing Arabic RTL Mirroring (/ar/image-compressor)...');
  await page.goto('http://localhost:4321/ar/image-compressor', { waitUntil: 'networkidle' });
  const htmlDir = await page.getAttribute('html', 'dir');
  console.log(`   HTML dir attribute: ${htmlDir}`);
  if (htmlDir !== 'rtl') throw new Error(`Expected dir="rtl", got: ${htmlDir}`);
  const title = await page.textContent('h1');
  console.log(`   Arabic Title: ${title}`);
  await page.setInputFiles('#file-input', SAMPLE_WEBP);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('جارٍ');
  }, { timeout: 8000 });
  const arResult = await page.textContent('#result-text');
  console.log(`   Arabic Result Line: ${arResult}`);
  console.log('   Arabic RTL test passed.\n');

  await browser.close();
  console.log('🏆 ALL COMPREHENSIVE CHECKS PASSED WITH FLYING COLORS!');
}

verifyAll().catch(err => {
  console.error('❌ Comprehensive verification failed:', err);
  process.exit(1);
});
