import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

async function testErrors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('[Console]', msg.type(), msg.text()));

  await page.goto('http://localhost:4321/image-compressor');
  console.log('Page loaded');

  // Test 4a: Non-image
  console.log('Testing non-image...');
  const dummyTxt = path.resolve('scratch/dummy.txt');
  fs.writeFileSync(dummyTxt, 'Text file');
  await page.setInputFiles('#file-input', dummyTxt);
  console.log('Input set to dummy.txt');
  await page.waitForSelector('#error-banner:not(.hidden)');
  console.log('Error banner visible:', await page.textContent('#error-message'));

  await page.click('#dismiss-error');
  await page.waitForSelector('#error-banner.hidden');
  console.log('Error dismissed');

  // Test 4b: Corrupt image
  console.log('Testing corrupt image...');
  const corruptImg = path.resolve('scratch/corrupt.jpg');
  fs.writeFileSync(corruptImg, 'Not a valid jpeg content');
  await page.setInputFiles('#file-input', corruptImg);
  console.log('Input set to corrupt.jpg');

  // Check error banner
  await page.waitForSelector('#error-banner:not(.hidden)');
  console.log('Corrupt error banner visible:', await page.textContent('#error-message'));

  await browser.close();
  console.log('Done!');
}

testErrors().catch(console.error);
