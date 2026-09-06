import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://toolnest.pages.dev';
const LOCALES = ['en', 'pt', 'id', 'ar'];

const ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/image-to-pdf', priority: '0.9', changefreq: 'weekly' },
  { path: '/image-compressor', priority: '0.9', changefreq: 'weekly' },
  { path: '/image-converter', priority: '0.9', changefreq: 'weekly' },
  { path: '/age-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: '/birthday-facts', priority: '0.9', changefreq: 'weekly' },
  { path: '/random-picker', priority: '0.9', changefreq: 'weekly' },
  { path: '/countdown', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.7', changefreq: 'monthly' },
  { path: '/terms-of-service', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'weekly' },
  { path: '/sitemap-page', priority: '0.6', changefreq: 'weekly' },
];

function getUrl(routePath, lang) {
  if (lang === 'en') {
    return `${SITE_URL}${routePath || '/'}`;
  }
  return `${SITE_URL}/${lang}${routePath || '/'}`;
}

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

for (const route of ROUTES) {
  for (const lang of LOCALES) {
    const loc = getUrl(route.path, lang);

    xml += `  <url>\n`;
    xml += `    <loc>${loc}</loc>\n`;

    // Reciprocal hreflang alternates
    for (const altLang of LOCALES) {
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${getUrl(route.path, altLang)}" />\n`;
    }
    // x-default points to English
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl(route.path, 'en')}" />\n`;

    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
}

xml += `</urlset>\n`;

// Also generate sitemap-index.xml
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

// Write to public/ and dist/ (if exists)
fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
fs.writeFileSync(path.resolve('public/sitemap-index.xml'), indexXml);

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
  fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml);
  if (fs.existsSync(path.join(distDir, 'en/index.html')) && !fs.existsSync(path.join(distDir, 'index.html'))) {
    fs.copyFileSync(path.join(distDir, 'en/index.html'), path.join(distDir, 'index.html'));
  }
}

console.log(`✅ Generated XML sitemaps with reciprocal hreflang for ${ROUTES.length} routes × 4 languages (${ROUTES.length * 4} total entries)!`);
