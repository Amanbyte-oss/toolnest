import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UI_DIR = path.resolve(__dirname, '../src/i18n/ui');
const EN_PATH = path.join(UI_DIR, 'en.json');

const TARGET_LANGS = ['pt', 'id', 'ar'];

function loadJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to read or parse JSON file: ${filePath}`);
    console.error(err);
    process.exit(1);
  }
}

function getLeafKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, val] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(getLeafKeys(val, currentPath));
    } else {
      keys.push(currentPath);
    }
  }
  return keys;
}

function getValueByPath(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

console.log('🔍 Running i18n-check: Comparing en.json keys against pt, id, and ar...');

const enDict = loadJson(EN_PATH);
const enKeys = getLeafKeys(enDict);
console.log(`Found ${enKeys.length} translation keys in en.json.`);

let totalErrors = 0;

for (const lang of TARGET_LANGS) {
  const langPath = path.join(UI_DIR, `${lang}.json`);
  if (!fs.existsSync(langPath)) {
    console.error(`❌ Missing dictionary file for language "${lang}": ${langPath}`);
    totalErrors++;
    continue;
  }

  const langDict = loadJson(langPath);
  const missingKeys = [];
  const emptyKeys = [];

  for (const key of enKeys) {
    const val = getValueByPath(langDict, key);
    if (val === undefined) {
      missingKeys.push(key);
    } else if (typeof val === 'string' && val.trim() === '') {
      emptyKeys.push(key);
    }
  }

  if (missingKeys.length > 0 || emptyKeys.length > 0) {
    totalErrors += missingKeys.length + emptyKeys.length;
    console.error(`\n❌ [${lang.toUpperCase()}] Found translation discrepancies:`);
    if (missingKeys.length > 0) {
      console.error(`  - Missing keys (${missingKeys.length}):`);
      for (const k of missingKeys) {
        console.error(`      * ${k}`);
      }
    }
    if (emptyKeys.length > 0) {
      console.error(`  - Empty string keys (${emptyKeys.length}):`);
      for (const k of emptyKeys) {
        console.error(`      * ${k}`);
      }
    }
  } else {
    console.log(`✅ [${lang.toUpperCase()}] 100% key parity verified (${enKeys.length}/${enKeys.length} keys).`);
  }
}

if (totalErrors > 0) {
  console.error(`\n💥 Translation verification failed with ${totalErrors} missing or empty key(s).`);
  process.exit(1);
} else {
  console.log('\n✨ All translation dictionaries have 100% key parity and no empty strings!');
  process.exit(0);
}
