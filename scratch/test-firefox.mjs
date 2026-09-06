import { firefox } from 'playwright';

async function run() {
  const browser = await firefox.launch({
    executablePath: '/usr/bin/firefox',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/image-compressor');
  const title = await page.title();
  console.log('Page Title:', title);
  await browser.close();
}

run().catch(console.error);
