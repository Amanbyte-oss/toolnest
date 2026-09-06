import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:4321';

async function runTests() {
  console.log('🧪 Starting Playwright Live Interaction Tests...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition, desc) {
    if (condition) {
      console.log(`  ✅ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${desc}`);
      failed++;
    }
  }

  try {
    // 1. Contact Form Verification
    console.log('\n--- 1. Testing Contact Form (/contact) ---');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded' });

    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const subjectSelect = page.locator('#contact-subject');
    const messageInput = page.locator('#contact-message');
    const submitBtn = page.locator('#contact-submit-btn');
    const botcheck = page.locator('#botcheck');

    assert(await nameInput.isVisible(), 'Name input is visible');
    assert(await emailInput.isVisible(), 'Email input is visible');
    assert(await subjectSelect.isVisible(), 'Subject dropdown is visible');
    assert(await messageInput.isVisible(), 'Message textarea is visible');
    assert(await botcheck.count() > 0, 'Honeypot field is present in DOM');
    assert(!(await botcheck.isVisible()), 'Honeypot field is invisible to users');

    // Test inline validation
    await submitBtn.click();
    const nameError = page.locator('#name-error');
    assert(await nameError.isVisible(), 'Inline validation error triggers for required name');

    // Fill valid name, invalid email
    await nameInput.fill('Jane Doe');
    await submitBtn.click();
    const emailError = page.locator('#email-error');
    assert(await emailError.isVisible(), 'Inline validation error triggers for invalid email');

    // Fill valid email, missing subject
    await emailInput.fill('jane@example.com');
    await submitBtn.click();
    const subjectError = page.locator('#subject-error');
    assert(await subjectError.isVisible(), 'Inline validation error triggers for missing subject');

    // Select subject, short message
    await subjectSelect.selectOption('Suggestion');
    await messageInput.fill('Short');
    await submitBtn.click();
    const messageError = page.locator('#message-error');
    assert(await messageError.isVisible(), 'Inline validation error triggers for message < 10 chars');

    // Fill valid message and test submission flow
    await messageInput.fill('I would love to see an SVG optimizer tool added to ToolNest!');
    // Intercept submit
    await page.route('https://api.web3forms.com/submit', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      });
    });
    await submitBtn.click();
    const successMsg = page.locator('#contact-success-msg');
    await page.waitForTimeout(500);
    assert(await successMsg.isVisible(), 'Contact form displays friendly confirmation success state');

    // 2. FAQ Search & Accordion
    console.log('\n--- 2. Testing FAQ Page (/faq) ---');
    await page.goto(`${BASE_URL}/faq`, { waitUntil: 'domcontentloaded' });

    const faqSearch = page.locator('#faq-search-input');
    assert(await faqSearch.isVisible(), 'FAQ search filter is visible');

    const firstDetails = page.locator('.faq-accordion-item').first();
    const firstSummary = firstDetails.locator('summary');
    assert(!(await firstDetails.getAttribute('open')), 'Accordion item starts closed');

    await firstSummary.click();
    await page.waitForTimeout(200);
    assert(await firstDetails.getAttribute('open') !== null, 'Accordion item opens on click');

    // Test live search
    await faqSearch.fill('offline');
    await page.waitForTimeout(300);
    const visibleFaqs = await page.locator('.faq-accordion-item:not(.hidden)').count();
    assert(visibleFaqs > 0, `Search for "offline" found ${visibleFaqs} matching questions`);

    // 3. 404 Page Live Search
    console.log('\n--- 3. Testing 404 Page (/404) ---');
    await page.goto(`${BASE_URL}/404`, { waitUntil: 'domcontentloaded' });
    const notfoundSearch = page.locator('#notfound-search');
    assert(await notfoundSearch.isVisible(), '404 page search input is visible');
    await notfoundSearch.fill('compress');
    await page.waitForTimeout(200);
    const visibleCards = await page.locator('.notfound-tool-card:not(.hidden)').count();
    assert(visibleCards >= 1, `404 search filters tool cards (found ${visibleCards})`);

    // 4. Desktop Navigation Categorized Tools Dropdown
    console.log('\n--- 4. Testing Desktop Navigation Dropdown ---');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    const toolsBtn = page.locator('#tools-dropdown-btn');
    const toolsMenu = page.locator('#tools-dropdown-menu');

    assert(await toolsBtn.isVisible(), 'Desktop tools dropdown button is visible');
    assert(!(await toolsMenu.isVisible()), 'Tools dropdown menu is initially closed');

    await toolsBtn.click();
    await page.waitForTimeout(200);
    assert(await toolsMenu.isVisible(), 'Tools dropdown menu opens on click');
    const categoryHeaders = await toolsMenu.locator('.text-accent').count();
    assert(categoryHeaders >= 2, 'Tools menu contains both Image Tools & Utilities categories');

    // 5. Footer Newsletter Subscription
    console.log('\n--- 5. Testing Footer Newsletter Form ---');
    const newsletterEmail = page.locator('#newsletter-email');
    const newsletterBtn = page.locator('#newsletter-submit-btn');

    await newsletterBtn.click();
    const newsletterErr = page.locator('#newsletter-error');
    assert(await newsletterErr.isVisible(), 'Newsletter shows error for empty email');

    await newsletterEmail.fill('user@example.com');
    await newsletterBtn.click();
    await page.waitForTimeout(200);
    const newsletterSuccess = page.locator('#newsletter-success');
    assert(await newsletterSuccess.isVisible(), 'Newsletter shows friendly confirmation on valid email');

    // 6. Mobile Drawer at 360px
    console.log('\n--- 6. Testing Mobile Drawer (360px) ---');
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    const mobileToggle = page.locator('#mobile-menu-toggle');
    const mobileDrawer = page.locator('#mobile-drawer');

    assert(await mobileToggle.isVisible(), 'Mobile hamburger button is visible at 360px');
    await mobileToggle.click();
    await page.waitForTimeout(300);
    assert(await mobileDrawer.isVisible(), 'Mobile drawer slides in and is visible');

    const drawerImageCat = mobileDrawer.locator('text=Image & Document Tools');
    const drawerUtilCat = mobileDrawer.locator('text=Calculators & Utilities');
    assert(await drawerImageCat.isVisible(), 'Drawer displays Image & Document Tools category');
    assert(await drawerUtilCat.isVisible(), 'Drawer displays Calculators & Utilities category');

    const drawerClose = page.locator('#mobile-menu-close');
    await drawerClose.click();
    await page.waitForTimeout(300);

    // 7. Portuguese 404 test
    console.log('\n--- 7. Testing Localized 404 (/pt/404) ---');
    await page.goto(`${BASE_URL}/pt/404`, { waitUntil: 'domcontentloaded' });
    const h1Text = await page.locator('h1').textContent();
    assert(h1Text.length > 0, `PT 404 heading renders: "${h1Text.trim()}"`);

  } catch (err) {
    console.error('Test threw an exception:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log(`\n================================`);
  console.log(`PLAYWRIGHT TEST RESULTS: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL LIVE PLAYWRIGHT TESTS PASSED!');
  }
}

runTests();
