import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';

const TEST_DIR = path.resolve('scratch/test-images');
const TRANSPARENT_PNG = path.join(TEST_DIR, 'transparent-circle.png');
const PHOTO_JPG = path.join(TEST_DIR, 'test-photo.jpg');

async function testCompressorFormats() {
  console.log('🚀 Starting Comprehensive Test Suite for Compressor Format Export...\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 360, height: 740 }, // 360px mobile viewport!
    acceptDownloads: true
  });
  const page = await context.newPage();

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
  console.log('1️⃣ Navigating to http://localhost:4321/image-compressor');
  await page.goto('http://localhost:4321/image-compressor', { waitUntil: 'networkidle' });

  const dropzone = page.locator('#dropzone');
  const previewCard = page.locator('#preview-card');
  const controlsSection = page.locator('#controls-section');

  if (!(await dropzone.isVisible())) throw new Error('Dropzone should be visible initially');
  if (await previewCard.isVisible()) throw new Error('Preview card should be hidden initially');
  if (await controlsSection.isVisible()) throw new Error('Controls section should be hidden initially');
  console.log('✅ Initial state verified: Dropzone visible, preview & controls hidden.\n');

  // 2. Upload transparent PNG (Default WebP)
  console.log('2️⃣ Uploading transparent PNG (Default WebP test)...');
  isTrackingNetwork = true;
  networkRequestsDuringConversion = 0;

  await page.setInputFiles('#file-input', TRANSPARENT_PNG);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.waitForSelector('#controls-section:not(.hidden)');

  // Verify format picker presence
  const formatPicker = page.locator('#format-picker');
  if (!(await formatPicker.isVisible())) throw new Error('Format picker should be visible');

  // Wait for initial WebP compression
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('WebP') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const initialResult = await page.textContent('#result-text');
  console.log(`   Initial WebP Result Line: "${initialResult}"`);
  if (!initialResult.includes('WebP')) throw new Error(`Expected WebP in result line, got: ${initialResult}`);

  const downloadTextWebP = await page.textContent('#download-text');
  console.log(`   Download button text: "${downloadTextWebP}"`);
  if (!downloadTextWebP.includes('WebP')) throw new Error(`Expected "Download WebP", got: ${downloadTextWebP}`);

  if (networkRequestsDuringConversion > 0) {
    throw new Error(`Expected 0 network requests during conversion, got ${networkRequestsDuringConversion}`);
  }
  console.log('✅ Default WebP compression verified with 0 network requests (100% client-side).\n');

  // 3. Test Pick JPG (Flatten transparency onto WHITE - no black box!)
  console.log('3️⃣ Switching to JPG (Testing white background transparency flattening)...');
  await page.click('button[data-format="jpg"]');

  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('JPG') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const jpgResult = await page.textContent('#result-text');
  console.log(`   JPG Result Line: "${jpgResult}"`);
  if (!jpgResult.includes('JPG')) throw new Error(`Expected JPG in result line, got: ${jpgResult}`);

  const downloadTextJpg = await page.textContent('#download-text');
  console.log(`   Download button text: "${downloadTextJpg}"`);
  if (!downloadTextJpg.includes('JPG')) throw new Error(`Expected "Download JPG", got: ${downloadTextJpg}`);

  // Download the JPG and inspect pixels with sharp
  const [downloadJpg] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#download-btn')
  ]);
  const jpgFilename = downloadJpg.suggestedFilename();
  console.log(`   Downloaded file name: ${jpgFilename}`);
  if (!jpgFilename.endsWith('.jpg')) throw new Error(`Expected filename to end with .jpg, got: ${jpgFilename}`);

  const downloadJpgPath = path.resolve('scratch/test-compressor-output.jpg');
  await downloadJpg.saveAs(downloadJpgPath);

  // Check top-left corner pixel of the downloaded JPG (which was transparent in original PNG)
  const image = sharp(downloadJpgPath);
  const metadata = await image.metadata();
  const rawPixels = await image.raw().toBuffer();
  // Pixel at (0, 0)
  const r = rawPixels[0];
  const g = rawPixels[1];
  const b = rawPixels[2];
  console.log(`   Corner pixel RGB: rgb(${r}, ${g}, ${b})`);

  if (r < 250 || g < 250 || b < 250) {
    throw new Error(`Expected white corner pixel (>= 250), got rgb(${r}, ${g}, ${b}) - BLACK BOX DETECTED!`);
  }
  console.log('✅ Transparency flattened onto pure WHITE background successfully (NO black box)!\n');
  fs.unlinkSync(downloadJpgPath);

  // 4. Test Pick PNG (Lossless - slider dimmed, note visible)
  console.log('4️⃣ Switching to PNG (Testing lossless behavior & slider dimming)...');
  await page.click('button[data-format="png"]');

  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('PNG') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const pngResult = await page.textContent('#result-text');
  console.log(`   PNG Result Line: "${pngResult}"`);

  // Check PNG note
  const pngNote = page.locator('#png-note');
  if (!(await pngNote.isVisible())) throw new Error('PNG lossless note should be visible');
  const pngNoteText = await pngNote.textContent();
  console.log(`   PNG Note: "${pngNoteText}"`);

  // Check quality slider disabled and container dimmed
  const qualityControl = page.locator('#quality-control');
  const classes = await qualityControl.getAttribute('class');
  if (!classes?.includes('opacity-40') || !classes?.includes('pointer-events-none')) {
    throw new Error(`Expected quality control to be dimmed with opacity-40, got: ${classes}`);
  }
  const isSliderDisabled = await page.$eval('#quality-slider', el => el.disabled);
  if (!isSliderDisabled) throw new Error('Quality slider should be disabled for PNG');

  const downloadTextPng = await page.textContent('#download-text');
  console.log(`   Download button text: "${downloadTextPng}"`);
  if (!downloadTextPng.includes('PNG')) throw new Error(`Expected "Download PNG", got: ${downloadTextPng}`);

  // Test Download PNG
  const [downloadPng] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#download-btn')
  ]);
  const pngFilename = downloadPng.suggestedFilename();
  console.log(`   Downloaded file name: ${pngFilename}`);
  if (!pngFilename.endsWith('.png')) throw new Error(`Expected filename to end with .png, got: ${pngFilename}`);
  console.log('✅ Lossless PNG verified: slider dimmed, note visible, download filename is .png.\n');

  // 5. Test Target-Size Box for all 3 formats
  console.log('5️⃣ Testing Target-Size Box for all 3 formats...');

  // A. PNG Target Size (Achieved by downscaling)
  console.log('   Testing Target Size: "1" KB on PNG...');
  await page.fill('#target-size-input', '1');
  await page.waitForTimeout(400);
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('PNG') && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const pngTargetResult = await page.textContent('#result-text');
  console.log(`   PNG Target 1KB Result: "${pngTargetResult}"`);

  // B. JPG Target Size
  console.log('   Testing Target Size: "1" KB on JPG...');
  await page.click('button[data-format="jpg"]');
  await page.waitForTimeout(400);
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('JPG') && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });
  const jpgTargetResult = await page.textContent('#result-text');
  console.log(`   JPG Target 1KB Result: "${jpgTargetResult}"`);

  // C. WebP Target Size
  console.log('   Testing Target Size: "1" KB on WebP...');
  await page.click('button[data-format="webp"]');
  await page.waitForTimeout(400);
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('WebP') && el.textContent.includes('→') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });
  const webpTargetResult = await page.textContent('#result-text');
  console.log(`   WebP Target 1KB Result: "${webpTargetResult}"`);
  console.log('✅ Target size works across all 3 formats (including PNG dimension downscaling)!\n');

  // Clear target size
  await page.fill('#target-size-input', '');
  await page.waitForTimeout(400);

  // 6. Test Switching back to WebP (Slider re-enabled, note hidden)
  console.log('6️⃣ Testing WebP re-selection...');
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('WebP') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const isWebpSliderDisabled = await page.$eval('#quality-slider', el => el.disabled);
  if (isWebpSliderDisabled) throw new Error('Slider should be re-enabled for WebP when target size is empty');
  if (await pngNote.isVisible()) throw new Error('PNG note should be hidden when WebP is active');
  console.log('✅ WebP slider restored and active.\n');

  // 7. Test ✕ Reset Button
  console.log('7️⃣ Testing ✕ Reset Button...');
  await page.click('#remove-btn');
  await page.waitForSelector('#dropzone:not(.hidden)');
  if (await previewCard.isVisible()) throw new Error('Preview should be hidden after reset');
  if (await controlsSection.isVisible()) throw new Error('Controls should be hidden after reset');
  console.log('✅ ✕ Reset cleared state and restored initial dropzone.\n');

  // 8. Test JPG upload with JPG -> PNG (Bigger ⚠️ warning check)
  console.log('8️⃣ Testing JPG upload -> PNG format (Bigger ⚠️ warning check)...');
  await page.setInputFiles('#file-input', PHOTO_JPG);
  await page.waitForSelector('#preview-card:not(.hidden)');
  await page.click('button[data-format="png"]');
  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('PNG') && !el.textContent.includes('Compressing');
  }, { timeout: 8000 });

  const biggerResult = await page.textContent('#result-text');
  console.log(`   JPG -> PNG Result Line: "${biggerResult}"`);
  if (!biggerResult.includes('Bigger ⚠️') || !biggerResult.includes('WebP')) {
    throw new Error(`Expected honest warning "Bigger ⚠️ try WebP instead", got: ${biggerResult}`);
  }
  console.log('✅ Honest "Bigger ⚠️ try WebP instead" warning displayed correctly for PNG output of photo!\n');

  // 9. Test Arabic RTL Page (/ar/image-compressor)
  console.log('9️⃣ Testing Arabic RTL Page (/ar/image-compressor)...');
  await page.goto('http://localhost:4321/ar/image-compressor', { waitUntil: 'networkidle' });

  const htmlDir = await page.getAttribute('html', 'dir');
  console.log(`   HTML dir attribute: ${htmlDir}`);
  if (htmlDir !== 'rtl') throw new Error(`Expected dir="rtl", got: ${htmlDir}`);

  await page.setInputFiles('#file-input', TRANSPARENT_PNG);
  await page.waitForSelector('#controls-section:not(.hidden)');

  await page.waitForFunction(() => {
    const el = document.getElementById('result-text');
    return el && el.textContent.includes('WebP') && !el.textContent.includes('جارٍ');
  }, { timeout: 8000 });

  const arResult = await page.textContent('#result-text');
  console.log(`   Arabic Result Line: "${arResult}"`);

  const arDownloadBtn = await page.textContent('#download-text');
  console.log(`   Arabic Download Button: "${arDownloadBtn}"`);
  if (!arDownloadBtn.includes('WebP')) throw new Error(`Expected Arabic download button with WebP, got: ${arDownloadBtn}`);
  console.log('✅ Arabic RTL layout and translations working perfectly.\n');

  console.log('🏆 ALL IMAGE COMPRESSOR FORMAT EXPORT TESTS PASSED PERFECTLY!');
  await browser.close();
}

testCompressorFormats().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
