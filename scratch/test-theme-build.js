import fs from 'fs';
import path from 'path';

const pagesToTest = [
  'dist/index.html',
  'dist/age-calculator/index.html',
  'dist/birthday-facts/index.html',
  'dist/decision-wheel/index.html',
  'dist/random-picker/index.html',
  'dist/countdown/index.html',
  'dist/countdown/view/index.html',
  'dist/name-meaning/index.html',
  'dist/names/index.html',
  'dist/name/emma/index.html',
  'dist/about/index.html',
  'dist/privacy-policy/index.html',
  'dist/404.html',
];

console.log('🔍 Starting comprehensive theme verification across all pages...\n');

let failed = false;

for (const relPath of pagesToTest) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing file: ${relPath}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(fullPath, 'utf8');

  // Check 1: Anti-FOUC script present in <head>
  if (!html.includes('toolnest_theme') || !html.includes('no-transition')) {
    console.error(`❌ ${relPath}: Missing centralized anti-FOUC script with toolnest_theme check`);
    failed = true;
  }

  // Check 2: Theme-color meta tag
  if (!html.includes('id="theme-color-meta"')) {
    console.error(`❌ ${relPath}: Missing theme-color meta tag`);
    failed = true;
  }

  // Check 3: Desktop Header Theme Toggle button
  if (!html.includes('id="theme-toggle"')) {
    console.error(`❌ ${relPath}: Missing #theme-toggle button in header`);
    failed = true;
  }

  // Check 4: Sun and Moon icons with transform animations
  if (!html.includes('theme-icon-sun') || !html.includes('theme-icon-moon')) {
    console.error(`❌ ${relPath}: Missing sun/moon SVG icons in #theme-toggle`);
    failed = true;
  }

  // Check 5: Mobile drawer theme toggle switch
  if (!html.includes('id="drawer-theme-toggle"')) {
    console.error(`❌ ${relPath}: Missing #drawer-theme-toggle in mobile drawer`);
    failed = true;
  }

  console.log(`✅ ${relPath} passed all theme checks.`);
}

// Check theme-toggle.js
const themeToggleScript = fs.readFileSync('src/scripts/theme-toggle.js', 'utf8');
if (
  themeToggleScript.includes('toolnest_theme') &&
  themeToggleScript.includes('themechange') &&
  themeToggleScript.includes('matchMedia') &&
  themeToggleScript.includes('data-theme-bound')
) {
  console.log('\n✅ src/scripts/theme-toggle.js contains all required functionality (toolnest_theme, themechange, matchMedia, double-binding protection).');
} else {
  console.error('\n❌ src/scripts/theme-toggle.js is missing required features.');
  failed = true;
}

if (failed) {
  console.error('\n🚨 Theme verification failed!');
  process.exit(1);
} else {
  console.log('\n🎉 All theme verification checks passed successfully!');
}
