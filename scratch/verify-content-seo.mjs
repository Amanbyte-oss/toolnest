import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

const pagesToAudit = [
  {
    path: 'age-calculator/index.html',
    title: 'Age Calculator',
    primary: 'age calculator by date of birth',
    secondaries: [
      'how old am I',
      'calculate my age',
      'age in days/months',
      'half birthday calculator',
      'chronological age',
      'age at a specific date',
    ],
  },
  {
    path: 'birthday-facts/index.html',
    title: 'Birthday Facts',
    primary: 'what day of the week was I born',
    secondaries: [
      'my zodiac sign by birthday',
      'birthstone by month',
      'birthday personality',
      'life path number',
      'golden birthday meaning',
      'half birthday',
    ],
  },
  {
    path: 'decision-wheel/index.html',
    title: 'Decision Wheel',
    primary: 'spin the wheel',
    secondaries: [
      'wheel spinner',
      'random wheel generator',
      'yes or no wheel',
      'what to eat for dinner decider',
      'classroom wheel',
      'prize wheel online',
      'wheel of names alternative',
    ],
  },
  {
    path: 'random-picker/index.html',
    title: 'Random Picker',
    primary: 'random name picker',
    secondaries: [
      'name picker for teachers',
      'giveaway winner picker',
      'raffle drawer online',
      'random team picker',
      'list randomizer',
    ],
  },
  {
    path: 'countdown/index.html',
    title: 'Countdown',
    primary: 'countdown timer online free',
    secondaries: [
      'share countdown link',
      'event countdown',
      'days until calculator',
      'birthday countdown',
      'new year countdown live',
    ],
  },
  {
    path: 'name-meaning/index.html',
    title: 'Name Meaning',
    primary: 'name meaning',
    secondaries: [
      'what does my name mean',
      'name origin finder',
      'names that mean',
      'most popular names',
    ],
  },
  {
    path: 'names/index.html',
    title: 'Names Directory',
    primary: 'name meanings list',
    secondaries: [
      'baby name ideas',
      'unique boy names',
      'unique girl names',
    ],
  },
];

console.log('🔍 Auditing Content SEO, Word Counts & Schema Parity across ToolNest...\n');

const results = [];
let totalErrors = 0;

for (const p of pagesToAudit) {
  const filePath = path.join(DIST, p.path);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${p.path}`);
    totalErrors++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // Strip out HTML tags, script, style tags
  const cleanBody = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Specifically extract educational content words
  // On each tool page, find text from the first educational section to the footer
  let belowToolText = '';
  const eduStart = html.search(/id="(?:how-it-works|educational-content|how-math-works|use-cases|zodiac-table|features-heading)/i);
  if (eduStart !== -1) {
    const footerStart = html.search(/<footer\b/i);
    const subHtml = footerStart !== -1 ? html.slice(eduStart, footerStart) : html.slice(eduStart);
    belowToolText = subHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    belowToolText = cleanBody;
  }

  const words = belowToolText ? belowToolText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // Extract FAQs from JSON-LD
  const jsonLdMatch = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  let faqSchemaQuestions = [];
  for (const m of jsonLdMatch) {
    try {
      const data = JSON.parse(m[1]);
      if (data['@type'] === 'FAQPage' && Array.isArray(data.mainEntity)) {
        faqSchemaQuestions = data.mainEntity.map((q) => q.name);
      }
    } catch {}
  }

  // Check keyword matches in page
  const lowerHtml = html.toLowerCase();
  const primaryFound = lowerHtml.includes(p.primary.toLowerCase());
  const secondariesFound = p.secondaries.map(kw => {
    const cleanKw = kw.replace(/\[x\]/i, '').trim().toLowerCase();
    return { kw, found: lowerHtml.includes(cleanKw) };
  });

  const passedWordCount = wordCount >= 500;
  if (!passedWordCount) {
    console.warn(`⚠️ Warning: ${p.title} has ${wordCount} words below tool (target: 500+)`);
  }

  results.push({
    title: p.title,
    path: '/' + p.path.replace('/index.html', ''),
    wordCount,
    passedWordCount,
    faqCount: faqSchemaQuestions.length,
    primary: p.primary,
    primaryFound,
    secondaries: secondariesFound,
  });
}

console.table(
  results.map(r => ({
    Page: r.title,
    Route: r.path,
    'Content Words': r.wordCount,
    'Target 500+': r.passedWordCount ? '✅' : '❌',
    'FAQ Count': r.faqCount,
    'Primary KW': r.primaryFound ? `✅ ${r.primary}` : `❌ ${r.primary}`,
    'Secondary KWs': `${r.secondaries.filter(s => s.found).length}/${r.secondaries.length} Found (${r.secondaries.filter(s => !s.found).map(s => s.kw).join(', ') || 'All matched'})`,
  }))
);

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tested pages evaluated successfully!');
}
