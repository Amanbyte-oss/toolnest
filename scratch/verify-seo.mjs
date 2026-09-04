import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!filePath.includes('_astro') && !filePath.includes('_worker')) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files to validate in dist/`);

let errors = 0;
let warnings = 0;

const pageStats = [];

for (const file of htmlFiles) {
  const relPath = path.relative(DIST_DIR, file);
  const content = fs.readFileSync(file, 'utf-8');

  // Skip noindex view page from strict checks
  if (relPath.includes('countdown/view')) {
    continue;
  }

  // 1. Title tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // 2. Meta description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) || content.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i);
  const desc = descMatch ? descMatch[1].trim() : null;

  // 3. Canonical
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

  // 4. H1 tag
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];

  // 5. OG Image
  const ogImgMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  const ogImg = ogImgMatch ? ogImgMatch[1].trim() : null;

  // 6. JSON-LD scripts
  const jsonLdMatches = content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi) || [];
  const schemas = [];
  const idSet = new Set();
  let duplicateIds = 0;

  for (const script of jsonLdMatches) {
    const rawJson = script.replace(/<script\s+type=["']application\/ld\+json["']>/i, '').replace(/<\/script>/i, '').trim();
    try {
      const parsed = JSON.parse(rawJson);
      schemas.push(parsed);

      // Check duplicate @ids
      function scanIds(obj) {
        if (!obj || typeof obj !== 'object') return;
        // An entity definition has both @id and @type, whereas a reference only has @id
        if (obj['@id'] && obj['@type']) {
          if (idSet.has(obj['@id'])) {
            duplicateIds++;
          } else {
            idSet.add(obj['@id']);
          }
        }
        for (const key of Object.keys(obj)) {
          if (typeof obj[key] === 'object') scanIds(obj[key]);
        }
      }
      scanIds(parsed);
    } catch (e) {
      console.error(`[ERROR] JSON-LD Parse failure in ${relPath}: ${e.message}`);
      errors++;
    }
  }

  if (!title) {
    console.error(`[ERROR] Missing <title> in ${relPath}`);
    errors++;
  } else if (title.length > 60) {
    // Only warn if slightly over
    warnings++;
  }

  if (!desc) {
    console.error(`[ERROR] Missing meta description in ${relPath}`);
    errors++;
  }

  if (!canonical) {
    console.error(`[ERROR] Missing canonical link in ${relPath}`);
    errors++;
  }

  if (h1Matches.length === 0) {
    console.error(`[ERROR] Missing <h1> in ${relPath}`);
    errors++;
  } else if (h1Matches.length > 1) {
    console.error(`[ERROR] Multiple <h1> (${h1Matches.length}) in ${relPath}`);
    errors++;
  }

  if (!ogImg) {
    console.error(`[ERROR] Missing og:image in ${relPath}`);
    errors++;
  }

  if (duplicateIds > 0) {
    console.error(`[ERROR] ${duplicateIds} duplicate @id(s) found in ${relPath}`);
    errors++;
  }

  pageStats.push({
    file: relPath,
    titleLen: title ? title.length : 0,
    descLen: desc ? desc.length : 0,
    h1Count: h1Matches.length,
    schemasCount: schemas.length,
    ogImg,
  });
}

// Summary on primary pages
const keyPages = [
  'index.html',
  'age-calculator/index.html',
  'birthday-facts/index.html',
  'decision-wheel/index.html',
  'random-picker/index.html',
  'countdown/index.html',
  'name-meaning/index.html',
  'names/index.html',
  'name/emma/index.html',
  'name/liam/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy-policy/index.html',
];

console.log('\n--- KEY PAGES AUDIT ---');
for (const stat of pageStats.filter((s) => keyPages.includes(s.file))) {
  console.log(
    `${stat.file.padEnd(30)} | Title: ${String(stat.titleLen).padStart(2)} chars | Desc: ${String(stat.descLen).padStart(3)} chars | H1: ${stat.h1Count} | Schemas: ${stat.schemasCount} | OG: ${stat.ogImg}`
  );
}

// Check JS bundle sizes
console.log('\n--- CLIENT JS BUNDLE SIZES ---');
const astroDir = path.join(DIST_DIR, '_astro');
if (fs.existsSync(astroDir)) {
  const jsFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.js'));
  let totalBytes = 0;
  for (const js of jsFiles) {
    const size = fs.statSync(path.join(astroDir, js)).size;
    totalBytes += size;
    console.log(`  ${js.padEnd(40)} ${(size / 1024).toFixed(1)} KB`);
  }
  console.log(`Total Client JS (uncompressed): ${(totalBytes / 1024).toFixed(1)} KB (target gzipped <30KB)`);
}

console.log(`\nAudit finished: ${errors} errors, ${warnings} warnings across ${htmlFiles.length} pages.`);
process.exit(errors > 0 ? 1 : 0);
