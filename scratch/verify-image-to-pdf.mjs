import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SCRATCH_DIR = path.resolve('scratch/test-images');
if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

async function generateTestImages() {
  console.log('🎨 Generating test images...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const specs = [
    { name: 'doc-1-invoice.jpg', w: 400, h: 600, color: '#e0f2fe', label: 'Page 1: Invoice' },
    { name: 'doc-2-receipt.png', w: 500, h: 300, color: '#fef3c7', label: 'Page 2: Receipt' },
    { name: 'doc-3-idcard.jpg', w: 600, h: 400, color: '#dcfce7', label: 'Page 3: ID Card' },
    { name: 'doc-4-letter.png', w: 500, h: 700, color: '#f3e8ff', label: 'Page 4: Letter' },
    { name: 'doc-5-diagram.webp', w: 450, h: 450, color: '#ffedd5', label: 'Page 5: Diagram' },
    { name: 'doc-6-extra1.jpg', w: 400, h: 400, color: '#fce7f3', label: 'Page 6: Extra 1' },
    { name: 'doc-7-extra2.png', w: 400, h: 400, color: '#ccfbf1', label: 'Page 7: Extra 2' },
    { name: 'doc-large-3000px.jpg', w: 3000, h: 3200, color: '#e2e8f0', label: 'High-Res 3000px Scan' },
  ];

  for (const s of specs) {
    const filePath = path.join(SCRATCH_DIR, s.name);
    await page.setContent(`<canvas id="c" width="${s.w}" height="${s.h}"></canvas>`);
    const dataUrl = await page.evaluate(({ w, h, color, label, name }) => {
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(label, 30, 60);
      ctx.fillStyle = '#64748b';
      ctx.font = '16px sans-serif';
      ctx.fillText(`${w}x${h} test image for client-side PDF`, 30, 90);
      return c.toDataURL(name.endsWith('.png') ? 'image/png' : name.endsWith('.webp') ? 'image/webp' : 'image/jpeg', 0.85);
    }, s);

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
  }

  // Also create 15 more small images for 20+ batch test
  for (let i = 8; i <= 23; i++) {
    const fname = `batch-doc-${i}.jpg`;
    const fpath = path.join(SCRATCH_DIR, fname);
    await page.setContent(`<canvas id="c" width="300" height="300"></canvas>`);
    const dataUrl = await page.evaluate((idx) => {
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(`Batch Item #${idx}`, 30, 50);
      return c.toDataURL('image/jpeg', 0.7);
    }, i);
    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(fpath, Buffer.from(base64, 'base64'));
  }

  await browser.close();
  console.log('✅ Generated sample test images in scratch/test-images');
}

async function runTests() {
  await generateTestImages();

  console.log('\n🚀 Starting E2E Playwright verification for /image-to-pdf...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    acceptDownloads: true,
  });

  const page = await context.newPage();

  // Track network requests
  const networkRequests = [];
  page.on('request', req => {
    const url = req.url();
    networkRequests.push({ url, method: req.method() });
  });

  let passCount = 0;
  let totalTests = 0;
  function assert(cond, msg) {
    totalTests++;
    if (cond) {
      passCount++;
      console.log(`  ✅ PASS: ${msg}`);
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // 1. Load Page
  console.log('\n--- Test 1: Page Load & Initial State ---');
  await page.goto('http://localhost:4321/image-to-pdf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const title = await page.title();
  assert(title.includes('Image to PDF') || title.includes('PDF'), `Page title contains Image to PDF: "${title}"`);

  const privacyBadge = await page.textContent('body');
  assert(privacyBadge.includes('Processed on your device') || privacyBadge.includes('never uploaded'), 'Privacy badge is displayed');

  const dropzoneVisible = await page.isVisible('#pdf-dropzone');
  assert(dropzoneVisible, 'Dropzone is visible initially');

  const workspaceHidden = await page.$eval('#pdf-workspace', el => el.classList.contains('hidden'));
  assert(workspaceHidden, 'Workspace section is hidden before uploading images');

  // 2. Upload 5 Images
  console.log('\n--- Test 2: Upload 5 Images ---');
  const initialFive = [
    path.join(SCRATCH_DIR, 'doc-1-invoice.jpg'),
    path.join(SCRATCH_DIR, 'doc-2-receipt.png'),
    path.join(SCRATCH_DIR, 'doc-3-idcard.jpg'),
    path.join(SCRATCH_DIR, 'doc-4-letter.png'),
    path.join(SCRATCH_DIR, 'doc-5-diagram.webp'),
  ];

  // Record network requests before upload
  const requestsBefore = networkRequests.length;

  const fileInput = await page.$('#pdf-file-input');
  await fileInput.setInputFiles(initialFive);
  await page.waitForTimeout(1000);

  const workspaceVisible = await page.isVisible('#pdf-workspace');
  assert(workspaceVisible, 'Workspace is now visible after file upload');

  const cardsCount = await page.$$eval('.pdf-card', cards => cards.length);
  assert(cardsCount === 5, `5 thumbnail cards are rendered (got ${cardsCount})`);

  // Verify Zero Network Requests during upload
  const newRequests = networkRequests.slice(requestsBefore);
  const externalUploads = newRequests.filter(r => r.method === 'POST' || !r.url.includes('localhost'));
  assert(externalUploads.length === 0, `Zero network uploads during image loading (${newRequests.length} requests, 0 external/POST)`);

  // 3. Verify Card Features: Badges, Filenames
  console.log('\n--- Test 3: Multi-Image Thumbnail Cards ---');
  const firstBadge = await page.$eval('.pdf-card:first-child .page-badge', el => el.textContent.trim());
  assert(firstBadge === '1', `First card has badge 1 (got "${firstBadge}")`);

  const fifthBadge = await page.$eval('.pdf-card:nth-child(5) .page-badge', el => el.textContent.trim());
  assert(fifthBadge === '5', `Fifth card has badge 5 (got "${fifthBadge}")`);

  const cardName = await page.$eval('.pdf-card:first-child .card-filename', el => el.textContent.trim());
  assert(cardName.includes('doc-1-invoice'), `Card filename displayed: "${cardName}"`);

  // 4. Download PDF Button shows page count
  console.log('\n--- Test 4: Download Button State & Live Estimate ---');
  const downloadBtnText = await page.$eval('#pdf-download-btn-text', el => el.textContent.trim());
  assert(downloadBtnText.includes('5'), `Download button displays 5 pages: "${downloadBtnText}"`);

  const liveSizeText = await page.$eval('#pdf-est-size', el => el.textContent.trim());
  assert(liveSizeText.startsWith('≈') && (liveSizeText.includes('KB') || liveSizeText.includes('MB')), `Live estimated size displayed: "${liveSizeText}"`);

  // 5. Reorder: Arrow Buttons
  console.log('\n--- Test 5: Reorder with Move Buttons ---');
  const origFirst = await page.$eval('.pdf-card:first-child .card-filename', el => el.textContent.trim());
  // Click move right on first card
  await page.click('.pdf-card:first-child .btn-move-right');
  await page.waitForTimeout(300);

  const newFirst = await page.$eval('.pdf-card:first-child .card-filename', el => el.textContent.trim());
  assert(newFirst !== origFirst, `Card moved right successfully (first card is now "${newFirst}")`);

  // 6. Rotate 90°
  console.log('\n--- Test 6: 90° Rotation ---');
  await page.click('.pdf-card:first-child .btn-rotate');
  await page.waitForTimeout(300);
  const rotatedDeg = await page.$eval('.pdf-card:first-child', el => el.getAttribute('data-rotation'));
  assert(rotatedDeg === '90', `Card rotated 90 degrees (rotation = ${rotatedDeg})`);

  // 7. Auto-Enhance Document Filter
  console.log('\n--- Test 7: Auto-Enhance Document Filter ---');
  const initialEnhance = await page.$eval('.pdf-card:first-child', el => el.getAttribute('data-enhanced'));
  assert(initialEnhance === 'false', 'Initial enhance is false');
  await page.click('.pdf-card:first-child .btn-enhance');
  await page.waitForTimeout(300);
  const afterEnhance = await page.$eval('.pdf-card:first-child', el => el.getAttribute('data-enhanced'));
  assert(afterEnhance === 'true', 'Auto-enhance toggled to true');

  // 8. Quick Actions Toolbar
  console.log('\n--- Test 8: Quick Actions Toolbar ---');
  // Rotate all
  await page.click('#pdf-tb-rotate-all');
  await page.waitForTimeout(300);
  const rotations = await page.$$eval('.pdf-card', cards => cards.map(c => c.getAttribute('data-rotation')));
  assert(rotations.every(r => r !== '0'), 'Rotate all rotated every card');

  // Sort by name
  await page.click('#pdf-tb-sort');
  await page.waitForTimeout(300);
  const sortedNames = await page.$$eval('.pdf-card .card-filename', els => els.map(e => e.textContent.trim()));
  const isSorted = sortedNames.slice().sort((a, b) => a.localeCompare(b)).every((n, i) => n === sortedNames[i]);
  assert(isSorted, `Cards sorted alphabetically by filename: ${sortedNames.join(', ')}`);

  // Reverse order
  await page.click('#pdf-tb-reverse');
  await page.waitForTimeout(300);
  const reversedNames = await page.$$eval('.pdf-card .card-filename', els => els.map(e => e.textContent.trim()));
  assert(reversedNames[0] === sortedNames[sortedNames.length - 1], 'Reverse order inverted card list');

  // 9. Delete & Undo Delete
  console.log('\n--- Test 9: Delete & Single-Level Undo ---');
  const countBeforeDel = await page.$$eval('.pdf-card', cards => cards.length);
  await page.click('.pdf-card:first-child .btn-delete');
  await page.waitForTimeout(300);

  const countAfterDel = await page.$$eval('.pdf-card', cards => cards.length);
  assert(countAfterDel === countBeforeDel - 1, `Card deleted (count changed from ${countBeforeDel} to ${countAfterDel})`);

  // Check toast appeared with Undo button
  const toastVisible = await page.isVisible('#pdf-toast');
  assert(toastVisible, 'Toast appeared after deletion');
  const undoVisible = await page.isVisible('#pdf-toast-undo');
  assert(undoVisible, 'Undo button is visible in toast');

  // Click undo
  await page.click('#pdf-toast-undo');
  await page.waitForTimeout(300);
  const countAfterUndo = await page.$$eval('.pdf-card', cards => cards.length);
  assert(countAfterUndo === countBeforeDel, `Undo restored image (count back to ${countAfterUndo})`);

  // 10. Collapsible Options Panel & Live Preview
  console.log('\n--- Test 10: Options Panel & Live PDF Preview ---');
  const details = await page.$('#pdf-options-details');
  await page.click('#pdf-options-details summary');
  await page.waitForTimeout(300);
  const isOpen = await details.evaluate(el => el.hasAttribute('open'));
  assert(isOpen, 'Options collapsible opened on summary click');

  // Select Page Size: Letter
  await page.click('.pdf-opt-btn[data-opt="pageSize"][data-val="letter"]');
  await page.waitForTimeout(200);
  const isLetterActive = await page.$eval('.pdf-opt-btn[data-opt="pageSize"][data-val="letter"]', el => el.classList.contains('active'));
  assert(isLetterActive, 'Page size Letter selected');

  // Select Orientation: Landscape
  await page.click('.pdf-opt-btn[data-opt="orientation"][data-val="landscape"]');
  await page.waitForTimeout(200);

  // Select Margins: Small (5mm)
  await page.click('.pdf-opt-btn[data-opt="margin"][data-val="5"]');
  await page.waitForTimeout(200);

  // Select Image Fit: Fill
  await page.click('.pdf-opt-btn[data-opt="imageFit"][data-val="fill"]');
  await page.waitForTimeout(200);

  // Select Background: Black
  await page.click('.pdf-opt-btn[data-opt="bgColor"][data-val="#111315"]');
  await page.waitForTimeout(200);

  // Select Quality: Medium
  await page.click('.pdf-opt-btn[data-opt="quality"][data-val="medium"]');
  await page.waitForTimeout(300);

  // Verify live preview canvas updated
  const previewHasPixels = await page.evaluate(() => {
    const canvas = document.getElementById('pdf-preview-canvas');
    if (!canvas) return false;
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
    return pixel[3] > 0; // has alpha/color
  });
  assert(previewHasPixels, 'Live PDF Preview canvas rendered page layout');

  // Reset to A4 / Auto / Medium margin / Contain / White background
  await page.click('.pdf-opt-btn[data-opt="pageSize"][data-val="a4"]');
  await page.click('.pdf-opt-btn[data-opt="orientation"][data-val="auto"]');
  await page.click('.pdf-opt-btn[data-opt="margin"][data-val="12"]');
  await page.click('.pdf-opt-btn[data-opt="imageFit"][data-val="contain"]');
  await page.click('.pdf-opt-btn[data-opt="bgColor"][data-val="#ffffff"]');
  await page.waitForTimeout(300);

  // 11. Download PDF (End-to-End Generation with jsPDF)
  console.log('\n--- Test 11: End-to-End PDF Download ---');
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 15000 }),
    page.click('#pdf-download-btn'),
  ]);

  const downloadPath = await download.path();
  const downloadName = download.suggestedFilename();
  assert(downloadName.endsWith('.pdf'), `Downloaded filename has .pdf extension: "${downloadName}"`);

  const stats = fs.statSync(downloadPath);
  assert(stats.size > 5000, `Downloaded PDF has valid size (> 5KB, got ${stats.size} bytes)`);

  // Verify PDF header %PDF in downloaded file
  const pdfHeader = fs.readFileSync(downloadPath, { encoding: 'ascii', flag: 'r' }).slice(0, 5);
  assert(pdfHeader === '%PDF-', `Downloaded file has valid PDF header "%PDF-" (got "${pdfHeader}")`);

  // Post-download cross-link funnel to compressor
  const postDownloadFunnel = await page.isVisible('#pdf-funnel-card');
  assert(postDownloadFunnel, 'Post-download funnel to /image-compressor is visible');

  // 12. Re-Add More Images After First Download
  console.log('\n--- Test 12: Re-Add More Images Anytime ---');
  const extraImages = [
    path.join(SCRATCH_DIR, 'doc-6-extra1.jpg'),
    path.join(SCRATCH_DIR, 'doc-7-extra2.png'),
  ];
  await fileInput.setInputFiles(extraImages);
  await page.waitForTimeout(600);

  const countAfterReadd = await page.$$eval('.pdf-card', cards => cards.length);
  assert(countAfterReadd === 7, `Re-adding 2 images updated total cards to 7 (got ${countAfterReadd})`);

  const updatedBtnText = await page.$eval('#pdf-download-btn-text', el => el.textContent.trim());
  assert(updatedBtnText.includes('7'), `Download button updated to 7 pages: "${updatedBtnText}"`);

  // 13. Memory Safety & 20+ Images Batch Processing
  console.log('\n--- Test 13: 20+ Images Batch Processing & Memory Safety ---');
  const batchFiles = [];
  for (let i = 8; i <= 23; i++) {
    batchFiles.push(path.join(SCRATCH_DIR, `batch-doc-${i}.jpg`));
  }
  batchFiles.push(path.join(SCRATCH_DIR, 'doc-large-3000px.jpg'));

  await fileInput.setInputFiles(batchFiles);
  await page.waitForTimeout(1000);

  const totalBatchCards = await page.$$eval('.pdf-card', cards => cards.length);
  assert(totalBatchCards >= 24, `24+ images loaded smoothly (got ${totalBatchCards})`);

  // Download batch PDF
  console.log('Generating 24-page PDF...');
  const [batchDownload] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    page.click('#pdf-download-btn'),
  ]);

  const batchDownloadPath = await batchDownload.path();
  const batchStats = fs.statSync(batchDownloadPath);
  assert(batchStats.size > 20000, `Batch PDF generated successfully (${batchStats.size} bytes)`);

  // 14. RTL Arabic Test
  console.log('\n--- Test 14: RTL Arabic (/ar/image-to-pdf) ---');
  await page.goto('http://localhost:4321/ar/image-to-pdf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const htmlDir = await page.$eval('html', el => el.getAttribute('dir'));
  assert(htmlDir === 'rtl', `Arabic page has dir="rtl" (got "${htmlDir}")`);

  const arabicTitle = await page.title();
  assert(arabicTitle.length > 0, `Arabic title rendered: "${arabicTitle}"`);

  // Test 360px viewport responsiveness & zero horizontal overflow
  console.log('\n--- Test 15: 360px Viewport Zero-Overflow Audit ---');
  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(300);

  const overflowInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  assert(overflowInfo.scrollWidth <= 360, `Zero horizontal overflow on 360px RTL: scrollWidth=${overflowInfo.scrollWidth}, clientWidth=${overflowInfo.clientWidth}`);

  // Test LTR at 360px as well
  await page.goto('http://localhost:4321/image-to-pdf', { waitUntil: 'domcontentloaded' });
  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(300);

  const ltrOverflowInfo = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  assert(ltrOverflowInfo.scrollWidth <= 360, `Zero horizontal overflow on 360px LTR: scrollWidth=${ltrOverflowInfo.scrollWidth}, clientWidth=${ltrOverflowInfo.clientWidth}`);

  await browser.close();

  console.log('\n===============================================');
  console.log(`🎉 ALL ${passCount}/${totalTests} E2E TESTS PASSED SUCCESSFULLY!`);
  console.log('===============================================\n');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
