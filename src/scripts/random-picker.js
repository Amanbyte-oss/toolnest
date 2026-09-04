/**
 * Random Picker engine: parsing, cryptographically secure selection,
 * Fisher-Yates shuffle, and duplicate analysis.
 */

/**
 * Parses raw text input into clean list of items.
 * Handles both newline-separated and comma-separated formats.
 */
export function parseItems(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  const lines = rawText.split('\n');
  const items = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.includes(',')) {
      const parts = trimmedLine.split(',');
      for (const p of parts) {
        const trimmedP = p.trim();
        if (trimmedP) items.push(trimmedP);
      }
    } else {
      items.push(trimmedLine);
    }
  }

  return items;
}

/**
 * Analyzes duplicates in items list.
 */
export function analyzeDuplicates(items, caseInsensitive = true) {
  const seen = new Set();
  const unique = [];
  let duplicateCount = 0;

  for (const item of items) {
    const key = caseInsensitive ? item.toLowerCase() : item;
    if (seen.has(key)) {
      duplicateCount++;
    } else {
      seen.add(key);
      unique.push(item);
    }
  }

  return {
    totalCount: items.length,
    uniqueCount: unique.length,
    duplicateCount,
    unique,
  };
}

/**
 * Cryptographically secure pseudo-random float in [0, 1)
 */
export function getCryptoRandom() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

/**
 * Cryptographically secure integer in [min, max)
 */
export function getCryptoRandomInt(min, max) {
  return Math.floor(getCryptoRandom() * (max - min)) + min;
}

/**
 * Fisher–Yates shuffle using cryptographically secure random values
 */
export function shuffleList(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = getCryptoRandomInt(0, i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Selects k distinct winners from items without replacement
 */
export function pickWinners(items, count = 1) {
  if (!items || items.length === 0) return [];
  const k = Math.min(Math.max(1, count), items.length);
  const shuffled = shuffleList(items);
  return shuffled.slice(0, k);
}

/**
 * Removes winners from raw text, preserving newline format
 */
export function removeWinnersFromText(rawText, winners, caseInsensitive = true) {
  const items = parseItems(rawText);
  const winnerKeys = new Set(winners.map((w) => (caseInsensitive ? w.toLowerCase() : w)));
  const remaining = items.filter((item) => {
    const key = caseInsensitive ? item.toLowerCase() : item;
    return !winnerKeys.has(key);
  });
  return remaining.join('\n');
}
