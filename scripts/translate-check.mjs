#!/usr/bin/env node

/**
 * scripts/translate-check.mjs
 * Validation script that checks translation dictionaries against en.json single source of truth.
 * Ensures 100% key parity across all namespaces and languages.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UI_DIR = path.resolve(__dirname, '../src/i18n/ui');

const TARGET_LANGS = ['pt', 'id', 'ar'];

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to read or parse JSON at ${filePath}:`, err.message);
    process.exit(1);
  }
}

/**
 * Recursively flatten nested keys into dot-separated paths
 * e.g. { common: { nav: { home: "Home" } } } -> ["common.nav.home"]
 */
function getLeafKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys = keys.concat(getLeafKeys(v, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

function getValueByPath(obj, dotPath) {
  const parts = dotPath.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

console.log('🌐 Validating i18n dictionaries against single source of truth (en.json)...\n');

const enFile = path.join(UI_DIR, 'en.json');
if (!fs.existsSync(enFile)) {
  console.error(`❌ Source dictionary en.json not found at ${enFile}`);
  process.exit(1);
}

const enData = loadJson(enFile);
const enKeys = getLeafKeys(enData);
console.log(`ℹ️  Found ${enKeys.length} total translation keys in en.json across ${Object.keys(enData).length} namespaces.\n`);

let totalMissing = 0;

for (const lang of TARGET_LANGS) {
  const langFile = path.join(UI_DIR, `${lang}.json`);
  if (!fs.existsSync(langFile)) {
    console.error(`❌ Dictionary for ${lang} not found at ${langFile}`);
    totalMissing++;
    continue;
  }

  const langData = loadJson(langFile);
  const missingKeys = [];

  for (const key of enKeys) {
    const val = getValueByPath(langData, key);
    if (val === undefined || val === null || val === '') {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    console.error(`❌ [${lang.toUpperCase()}] Missing or empty keys (${missingKeys.length}):`);
    missingKeys.slice(0, 15).forEach((k) => console.error(`   - ${k}`));
    if (missingKeys.length > 15) {
      console.error(`   ... and ${missingKeys.length - 15} more.`);
    }
    totalMissing += missingKeys.length;
  } else {
    console.log(`✅ [${lang.toUpperCase()}] 100% complete (${enKeys.length}/${enKeys.length} keys verified).`);
  }
}

console.log('\n--------------------------------------------------');
if (totalMissing > 0) {
  console.error(`❌ Translation validation failed! Total missing/empty keys: ${totalMissing}`);
  process.exit(1);
} else {
  console.log('🎉 All language dictionaries match en.json with 100% key parity!');
  process.exit(0);
}
