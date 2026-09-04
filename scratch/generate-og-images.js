import fs from 'fs';
import path from 'path';

const ogDir = path.resolve('public/og');
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}

const cards = [
  {
    file: 'home.svg',
    badge: 'TOOLNEST PLATFORM',
    title: 'Free, Private Online Web Utilities',
    desc: 'Instant, client-side tools for everyday decisions, calculations, and countdowns. Zero tracking, no sign-ups.',
    icon: '🛠️',
  },
  {
    file: 'age-calculator.svg',
    badge: 'CHRONOLOGICAL ACCURACY',
    title: 'How Old Am I? Exact Age Calculator',
    desc: 'Calculate your exact age in years, months, days, and seconds. Discover life milestones and upcoming birthdays.',
    icon: '🎂',
  },
  {
    file: 'birthday-facts.svg',
    badge: 'MILESTONES & TRIVIA',
    title: 'Birthday Facts, Zodiac & Milestones',
    desc: 'Uncover your western zodiac sign, birthstone, birth flower, generational cohort, and famous birthdays.',
    icon: '🎉',
  },
  {
    file: 'decision-wheel.svg',
    badge: 'INTERACTIVE PHYSICS',
    title: 'Spin the Wheel — Random Decision Spinner',
    desc: 'Customizable decision wheel with realistic deceleration physics and AI preset generation. Spin to decide.',
    icon: '🎡',
  },
  {
    file: 'random-picker.svg',
    badge: 'CRYPTOGRAPHIC FAIRNESS',
    title: 'Random Name Picker & Giveaway Winner Selector',
    desc: 'Pick 1 to 10 unique winners with verifiable cryptographic randomness, duplicate removal, and instant results.',
    icon: '🎯',
  },
  {
    file: 'countdown.svg',
    badge: 'REAL-TIME TIMERS',
    title: 'Online Countdown Timer — Share Event Clocks',
    desc: 'Generate live ticking countdown clocks for holidays, birthdays, and product drops with zero-database share links.',
    icon: '⏳',
  },
  {
    file: 'name-meaning.svg',
    badge: 'ETYMOLOGY & AI INSIGHTS',
    title: 'Name Meaning Finder & Origins Search',
    desc: 'Search 200+ baby name origins, cultural meanings, popularity scores, and unlock personalized AI insights.',
    icon: '📖',
  },
  {
    file: 'names.svg',
    badge: 'A–Z NAME DIRECTORY',
    title: 'Baby Names Directory A–Z — Meanings & Roots',
    desc: 'Explore curated names alphabetically. Filter by origin, gender, and popularity with detailed etymology.',
    icon: '📚',
  },
  {
    file: 'about.svg',
    badge: 'PLATFORM MISSION',
    title: 'About ToolNest — Fast, Private Web Utilities',
    desc: 'Our mission: lightning-fast, zero-tracking client-side tools engineered with transparent mathematics.',
    icon: '✨',
  },
  {
    file: 'contact.svg',
    badge: 'GET IN TOUCH',
    title: 'Contact ToolNest — Support & Inquiries',
    desc: 'Questions, suggestions, or bug reports? Reach out to the ToolNest development team.',
    icon: '💬',
  },
];

for (const card of cards) {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="20%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#312E81" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#111315" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366F1"/>
      <stop offset="50%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#EC4899"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="#111315"/>
  <rect width="1200" height="630" fill="url(#bgGlow)"/>

  <!-- Subtle Blueprint Grid -->
  <g stroke="#2A2E33" stroke-width="1" stroke-opacity="0.3">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Card Surface Container -->
  <rect x="80" y="70" width="1040" height="490" rx="28" fill="#1B1E21" stroke="#2A2E33" stroke-width="2" filter="url(#shadow)"/>
  <rect x="80" y="70" width="1040" height="6" fill="url(#accentLine)" rx="3"/>

  <!-- Top Badge Row -->
  <g transform="translate(130, 130)">
    <rect x="0" y="0" width="46" height="46" rx="14" fill="#26292D" stroke="#374151" stroke-width="1.5"/>
    <text x="23" y="30" font-family="-apple-system, system-ui, sans-serif" font-size="22" text-anchor="middle" dominant-baseline="middle">${card.icon}</text>
    
    <rect x="62" y="6" width="${card.badge.length * 9.5 + 24}" height="32" rx="16" fill="#312E81" fill-opacity="0.6" stroke="#6366F1" stroke-width="1.2"/>
    <text x="${62 + (card.badge.length * 9.5 + 24) / 2}" y="23" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="800" fill="#EEF2FF" text-anchor="middle" dominant-baseline="middle" letter-spacing="1">${card.badge}</text>
  </g>

  <!-- Title (split if long) -->
  <text x="130" y="245" font-family="-apple-system, system-ui, sans-serif" font-size="44" font-weight="900" fill="#F9FAFB" letter-spacing="-1">
    ${card.title}
  </text>

  <!-- Description -->
  <text x="130" y="320" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="400" fill="#9CA3AF">
    ${card.desc}
  </text>

  <!-- Footer Watermark -->
  <g transform="translate(130, 480)">
    <circle cx="10" cy="10" r="6" fill="#10B981"/>
    <text x="26" y="15" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#F9FAFB">ToolNest</text>
    <text x="106" y="15" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="400" fill="#6B7280">•  toolnest.pages.dev  •  100% Client-Side  •  Zero Tracking</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(ogDir, card.file), svg, 'utf8');
  console.log(`Generated public/og/${card.file}`);
}
