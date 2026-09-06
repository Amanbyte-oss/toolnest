import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const TEST_IMG = path.resolve('scratch/test-images/test-photo.jpg');

async function testCompressor() {
  console.log('🚀 Starting end-to-end verification of Image Compressor...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // Test mobile first!
    acceptDownloads: true
  });
  const page = await context.newPage();

  // Listen for console logs and errors
  page.on('console', msg => console.log(`[Browser Console] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.error(`[Browser Error]:`, err));

  // 1. Load the page
  console.log('1️⃣ Navigating to http://localhost:4321/image-compressor');
  await page.goto('http://localhost:4321/image-compressor', { waitUntil: 'networkidle' });

  // Verify dropzone is visible and preview is hidden
  const dropzone = page.locator('#dropzone');
  const previewCard = page.locator('#preview-card');
  const controlsSection = page.locator('#controls-section');

  if (!(await dropzone.isVisible())) throw new Error('Dropzone should be visible initially');
  if (await previewCard.isVisible()) throw new Error('Preview card should be hidden initially');
  if (await controlsSection.isVisible()) throw new Error('Controls section should be hidden initially');
  console.log('✅ Initial state verified: Dropzone is visible, preview & controls are hidden.');

  // 2. Upload a JPG
  console.log('2️⃣ Uploading JPG image...');
  await page.setInputFiles('#file-input', TEST_IMG);

  // Preview shows & dropzone is replaced
  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 5000 });
  if (await dropzone.isVisible()) throw new Error('Dropzone should be replaced (hidden) after image upload');
  
  const fileName = await page.textContent('#file-name');
  const origSize = await page.textContent('#original-size');
  console.log(`✅ Upload successful: ${fileName} (${origSize})`);
  if (!fileName.includes('test-photo.jpg')) throw new Error(`Filename mismatch: ${fileName}`);

  // Wait for initial compression result
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 6000 });

  let resultText = await page.textContent('#result-text');
  console.log(`✅ Initial compression result: ${resultText}`);

  // 3. Drag Quality Slider
  console.log('3️⃣ Adjusting Quality Slider to 30%...');
  const slider = page.locator('#quality-slider');
  await slider.fill('30');
  await slider.dispatchEvent('input');

  const qualityVal = await page.textContent('#quality-val');
  console.log(`✅ Live quality label updated: ${qualityVal}`);
  if (qualityVal !== '30%') throw new Error(`Quality label expected 30%, got ${qualityVal}`);

  // Wait for debounce re-compression
  await page.waitForTimeout(600);
  let sliderResult = await page.textContent('#result-text');
  console.log(`✅ Re-compression with 30% quality: ${sliderResult}`);

  // 4. Type "100" in Target Size
  console.log('4️⃣ Typing "100" in Target Size input...');
  const targetInput = page.locator('#target-size-input');
  await targetInput.fill('100');

  // Verify slider is dimmed
  const qualityControl = page.locator('#quality-control');
  const qClass = await qualityControl.getAttribute('class');
  if (!qClass.includes('opacity-40') || !qClass.includes('pointer-events-none')) {
    throw new Error(`Slider should be dimmed when target size is active: ${qClass}`);
  }
  console.log('✅ Slider is visually dimmed and disabled during target mode.');

  // Wait for binary search compression
  await page.waitForTimeout(800);
  let targetResult = await page.textContent('#result-text');
  console.log(`✅ Target 100 KB result: ${targetResult}`);

  // Test smaller target "20" KB
  console.log('   Testing aggressive target "20" KB...');
  await targetInput.fill('20');
  await page.waitForTimeout(1000);
  let smallTargetResult = await page.textContent('#result-text');
  console.log(`✅ Target 20 KB result: ${smallTargetResult}`);

  // Empty target size box -> returns control to slider
  console.log('   Clearing target size box...');
  await targetInput.fill('');
  await page.waitForTimeout(600);
  const qClassRestored = await qualityControl.getAttribute('class');
  if (qClassRestored.includes('opacity-40') || qClassRestored.includes('pointer-events-none')) {
    throw new Error(`Slider should be re-enabled when target size is cleared: ${qClassRestored}`);
  }
  let restoredResult = await page.textContent('#result-text');
  console.log(`✅ Target cleared, returned to slider control: ${restoredResult}`);

  // 5. Test Download Button
  console.log('5️⃣ Testing Download Button...');
  const downloadPromise = page.waitForEvent('download', { timeout: 5000 });
  await page.click('#download-btn');
  const download = await downloadPromise;
  const suggestedFilename = download.suggestedFilename();
  console.log(`✅ Download triggered with filename: ${suggestedFilename}`);
  if (suggestedFilename !== 'test-photo-compressed.webp') {
    throw new Error(`Expected test-photo-compressed.webp, got ${suggestedFilename}`);
  }
  const downloadPath = path.resolve('scratch/downloaded-test.webp');
  await download.saveAs(downloadPath);
  const downloadedStat = fs.statSync(downloadPath);
  console.log(`✅ Downloaded file size: ${downloadedStat.size} bytes`);
  if (downloadedStat.size <= 0) throw new Error('Downloaded file is empty!');

  // 6. Test ✕ Reset Button
  console.log('6️⃣ Testing ✕ Reset Button...');
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  if (await previewCard.isVisible()) throw new Error('Preview card should be hidden after reset');
  if (await controlsSection.isVisible()) throw new Error('Controls section should be hidden after reset');
  console.log('✅ Reset successful: Clean UI restored to initial state.');

  // 7. Test Paste (Ctrl+V)
  console.log('7️⃣ Testing Paste (Ctrl+V)...');
  const imgBuffer = fs.readFileSync(TEST_IMG);
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
  console.log(`✅ Paste successful: ${pastedFileName} preview visible and recompressing!`);

  // 8. Test Arabic RTL route
  console.log('8️⃣ Testing Arabic RTL Page (/ar/image-compressor)...');
  await page.goto('http://localhost:4321/ar/image-compressor', { waitUntil: 'networkidle' });
  await page.setInputFiles('#file-input', TEST_IMG);
  await page.waitForSelector('#preview-card:not(.hidden)', { timeout: 5000 });
  const arResultText = await page.textContent('#result-text');
  console.log(`✅ Arabic RTL compression result: ${arResultText}`);

  await browser.close();
  console.log('\n🎉 ALL END-TO-END VERIFICATION CHECKS PASSED PERFECTLY!');
}

testCompressor().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
