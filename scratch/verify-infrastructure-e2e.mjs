import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

console.log('🔍 Starting Comprehensive ToolNest Infrastructure Audit...\n');

let totalChecks = 0;
let passedChecks = 0;
const errors = [];

function check(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
  } else {
    errors.push(message);
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Collect all generated HTML files in dist/
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(DIST_DIR);
console.log(`📄 Found ${htmlFiles.length} HTML files generated in dist/\n`);

// 2. Build set of all internal routes for dead link checking
const knownRoutes = new Set();
for (const file of htmlFiles) {
  let relative = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  if (relative.endsWith('/index.html')) {
    relative = '/' + relative.slice(0, -'/index.html'.length);
  } else if (relative === 'index.html') {
    relative = '/';
  } else if (relative.endsWith('.html')) {
    relative = '/' + relative;
  }
  knownRoutes.add(relative || '/');
  if (relative && relative !== '/') {
    knownRoutes.add(relative + '/');
  }
}

// Also add all static assets from public/ and dist/
function addStaticFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      addStaticFiles(full);
    } else {
      const rel = '/' + path.relative(dir, full).replace(/\\/g, '/');
      knownRoutes.add(rel);
    }
  }
}
addStaticFiles(path.resolve('public'));
addStaticFiles(path.resolve('dist'));
knownRoutes.add('/404');
knownRoutes.add('/404/');
knownRoutes.add('/500');
knownRoutes.add('/500/');

// 3. Audit each HTML file
const deadLinks = [];
let auditedPages = 0;

for (const file of htmlFiles) {
  auditedPages++;
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(DIST_DIR, file);

  // Skip countdown view if it's dynamic
  const isCountdownViewer = relPath.includes('countdown/view');
  const is404 = relPath.includes('404');
  const is500 = relPath.includes('500');

  // A. Meta Title
  const hasTitle = /<title>[^<]+<\/title>/.test(content);
  check(hasTitle, `${relPath} must have a non-empty <title> tag`);

  // B. Meta Description
  const hasDesc = /<meta name="description" content="[^"]+"/.test(content);
  check(hasDesc, `${relPath} must have a non-empty <meta name="description"> tag`);

  // C. Canonical URL
  const hasCanonical = /<link rel="canonical" href="https:\/\/toolnest\.pages\.dev[^"]*"/.test(content);
  check(hasCanonical, `${relPath} must have an absolute <link rel="canonical"> tag`);

  // D. Hreflang alternates (on non-error, non-noindex pages)
  if (!is404 && !is500 && !isCountdownViewer) {
    const hasEnHreflang = /<link rel="alternate" hreflang="en"/.test(content);
    const hasPtHreflang = /<link rel="alternate" hreflang="pt"/.test(content);
    const hasIdHreflang = /<link rel="alternate" hreflang="id"/.test(content);
    const hasArHreflang = /<link rel="alternate" hreflang="ar"/.test(content);
    const hasDefaultHreflang = /<link rel="alternate" hreflang="x-default"/.test(content);

    check(hasEnHreflang, `${relPath} missing hreflang="en"`);
    check(hasPtHreflang, `${relPath} missing hreflang="pt"`);
    check(hasIdHreflang, `${relPath} missing hreflang="id"`);
    check(hasArHreflang, `${relPath} missing hreflang="ar"`);
    check(hasDefaultHreflang, `${relPath} missing hreflang="x-default"`);
  }

  // E. Open Graph & Twitter Cards
  const hasOgTitle = /<meta property="og:title"/.test(content);
  const hasOgDesc = /<meta property="og:description"/.test(content);
  const hasOgImage = /<meta property="og:image"/.test(content);
  const hasTwCard = /<meta name="twitter:card"/.test(content);

  check(hasOgTitle && hasOgDesc && hasOgImage, `${relPath} must have og:title, og:description, and og:image`);
  check(hasTwCard, `${relPath} must have twitter:card`);

  // F. Exactly ONE h1 heading
  const h1Matches = content.match(/<h1[\s>]/g);
  const h1Count = h1Matches ? h1Matches.length : 0;
  check(h1Count === 1, `${relPath} must have EXACTLY 1 <h1> heading (found ${h1Count})`);

  // G. Internal Link Validation (Dead links check)
  const linkRegex = /href="([^"#?]+)(#[^"]*)?(\?[^"]*)?"/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_astro/')) {
      const cleanHref = href.replace(/\/$/, '') || '/';
      const exists = knownRoutes.has(cleanHref) || knownRoutes.has(cleanHref + '/') || knownRoutes.has(href);
      if (!exists) {
        deadLinks.push({ from: relPath, to: href });
      }
    }
  }
}

// Report dead links
check(deadLinks.length === 0, `Zero dead internal links. Found: ${JSON.stringify(deadLinks)}`);

// 4. Verify Contact Form
const contactEn = fs.readFileSync(path.join(DIST_DIR, 'contact/index.html'), 'utf8');
check(contactEn.includes('name="name"'), 'Contact form has name field');
check(contactEn.includes('name="email"'), 'Contact form has email field');
check(contactEn.includes('name="subject"'), 'Contact form has subject dropdown');
check(contactEn.includes('name="message"'), 'Contact form has message textarea');
check(contactEn.includes('name="botcheck"'), 'Contact form has honeypot spam protection');
check(contactEn.includes('class="cf-turnstile"'), 'Contact form has Cloudflare Turnstile container');
check(contactEn.includes('mailto:hello@toolnest.dev'), 'Contact form has direct email link fallback');

// 5. Verify Newsletter Form
check(contactEn.includes('id="footer-newsletter-form"'), 'Footer has newsletter form');
check(contactEn.includes('id="newsletter-email"'), 'Newsletter form has email input');
check(contactEn.includes('privacy-policy'), 'Newsletter links to privacy policy');

// 6. Verify 404 Page & Search
const notFoundEn = fs.readFileSync(path.join(DIST_DIR, '404.html'), 'utf8');
check(notFoundEn.includes('id="notfound-search"'), '404 page has interactive tool search input');
check(notFoundEn.includes('/image-to-pdf'), '404 funnels to Image to PDF');
check(notFoundEn.includes('/image-compressor'), '404 funnels to Image Compressor');
check(notFoundEn.includes('/image-converter'), '404 funnels to Image Converter');
check(notFoundEn.includes('/age-calculator'), '404 funnels to Age Calculator');

// 7. Verify FAQ Page & FAQPage schema
const faqEn = fs.readFileSync(path.join(DIST_DIR, 'faq/index.html'), 'utf8');
check(faqEn.includes('"@type":"FAQPage"') || faqEn.includes('"@type": "FAQPage"'), 'FAQ page has FAQPage schema');
check(faqEn.includes('details class="faq-accordion-item'), 'FAQ page has native accordion elements');
check(faqEn.includes('id="faq-search-input"'), 'FAQ page has search filter');

// 8. Verify XML Sitemap
const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
check(sitemapContent.includes('<loc>https://toolnest.pages.dev/</loc>'), 'Sitemap includes homepage');
check(sitemapContent.includes('<loc>https://toolnest.pages.dev/about</loc>'), 'Sitemap includes /about');
check(sitemapContent.includes('<loc>https://toolnest.pages.dev/terms-of-service</loc>'), 'Sitemap includes /terms-of-service');
check(sitemapContent.includes('hreflang="x-default"'), 'Sitemap includes x-default hreflang');
check(sitemapContent.includes('hreflang="ar"'), 'Sitemap includes ar hreflang');

// 9. Verify Robots.txt
const robotsContent = fs.readFileSync(path.join(DIST_DIR, 'robots.txt'), 'utf8');
check(robotsContent.includes('User-agent: *'), 'robots.txt specifies User-agent: *');
check(robotsContent.includes('Allow: /'), 'robots.txt allows all');
check(robotsContent.includes('Sitemap: https://toolnest.pages.dev/sitemap.xml'), 'robots.txt points to sitemap.xml');

// 10. Verify BreadcrumbList schema on tool page
const toolEn = fs.readFileSync(path.join(DIST_DIR, 'image-to-pdf/index.html'), 'utf8');
check(toolEn.includes('"@type":"BreadcrumbList"') || toolEn.includes('"@type": "BreadcrumbList"'), 'Tool page has BreadcrumbList schema');
check(toolEn.includes('itemprop="itemListElement"'), 'Tool page has microdata breadcrumb UI');

// 11. Verify WebSite & SearchAction schema on homepage
const homeEn = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
check(homeEn.includes('"@type":"WebSite"') || homeEn.includes('"@type": "WebSite"'), 'Homepage has WebSite schema');
check(homeEn.includes('"potentialAction"') && homeEn.includes('"SearchAction"'), 'Homepage has SearchAction schema');

console.log(`\n======================================================`);
console.log(`AUDIT RESULTS: ${passedChecks}/${totalChecks} checks passed!`);
if (errors.length > 0) {
  console.log(`❌ Failures (${errors.length}):`);
  errors.forEach(e => console.log(' - ' + e));
  process.exit(1);
} else {
  console.log(`✨ ALL INFRASTRUCTURE CHECKS PASSED PERFECTLY! 100% SUCCESS!`);
}
