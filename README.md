# ToolNest

> Free online micro-tools that just work — no signup, no ads-blocking your screen, nothing leaves your browser.

🌐 **Live Website**: [https://toolnest.pages.dev](https://toolnest.pages.dev)  
[![100% Free](https://img.shields.io/badge/Cost-100%25_Free-emerald?style=flat-square)](https://toolnest.pages.dev) [![No Sign-up](https://img.shields.io/badge/Sign--up-None_Required-blue?style=flat-square)](https://toolnest.pages.dev) [![Privacy-first](https://img.shields.io/badge/Privacy-100%25_Local-indigo?style=flat-square)](https://toolnest.pages.dev/privacy-policy)

---

## What is ToolNest?

ToolNest is a friendly suite of everyday micro-tools designed to get out of your way. Whether you are settling where to eat dinner, picking a giveaway winner, or looking up what day of the week you were born, ToolNest gives you instant, beautiful answers without logins, trackers, or paywalls.

---

## The Tools

### 🎂 Birthday Facts
Discover fascinating astrological details, life milestones, and fun trivia about any birthday.
- Look up your zodiac sign, element, birthstone, and native birth flower
- Find out the exact day of the week you arrived and your lifetime statistics
- Generate a beautiful, downloadable birthday card to share with friends

### ⚖️ Age Calculator
Calculate your exact chronological age with down-to-the-second live accuracy.
- Break down age into total years, months, weeks, days, hours, and seconds
- See a live countdown to your next birthday and key milestone ages
- Easily calculate exact date differences between any two calendar events

### 🎡 Decision Wheel
Can't decide? Put your choices on an interactive wheel and let fate take a spin.
- Smooth spinning physics with satisfying sound effects and confetti celebrations
- Generate instant idea presets using the built-in AI helper (*"Movie night"*, *"Dinner ideas"*)
- Share customized wheels directly with friends and coworkers via link

### 🎲 Random Picker
Draw transparent, fair results for contests, classrooms, and game nights.
- Pick random winners with or without repetition from any custom list
- Select students fairly or decide the order of turns in study groups
- Split names automatically into balanced, randomized teams

### ⏳ Countdown
Create a real-time countdown clock for birthdays, holidays, product drops, or events.
- Live ticking display of days, hours, minutes, and seconds remaining
- Share your countdown via link so others can watch the clock tick together
- Export a high-resolution portrait card image formatted for social sharing

### 🏷️ Name Meanings
Explore the origins, history, and deeper meanings behind names from all around the world.
- Browse 200+ curated names with phonetic pronunciations and cultural origins
- Generate tailored AI insights on popularity trends, companion names, and personality vibes
- Search and filter by gender, letter, and heritage to find the perfect name

---

## Why ToolNest?

- **Everything runs in YOUR browser**: Inputs, names, and lists never leave your device or touch a database.
- **Fast on slow phones**: Lightweight pages load instantly without heavy bloated frameworks or tracking scripts.
- **Dark mode, mobile-first, free forever**: Built to look stunning on any screen with responsive touch controls.
- **AI features run server-side**: Optional AI idea generation runs via stateless functions; your data is never stored.

---

## Frequently Asked Questions

**Is it really free?**  
Yes, 100% free. No subscriptions, paywalls, or hidden catches.

**Do you store my data?**  
Never. Your inputs stay strictly inside your browser. We don't have user accounts or tracking cookies.

**Can I use the wheel/picker for my classroom or giveaway?**  
Absolutely! Teachers, streamers, and organizers use ToolNest daily for unbiased random selections.

**How do I share my countdown?**  
Click "Share" to copy a direct link, or click "Share as Image" to download a crisp card for WhatsApp or Instagram.

---

## Links

- **Website**: [toolnest.pages.dev](https://toolnest.pages.dev) | **Privacy Policy**: [toolnest.pages.dev/privacy-policy](https://toolnest.pages.dev/privacy-policy) | **Contact / Issues**: [GitHub Issues](https://github.com/Amanbyte-oss/toolnest/issues)

---

<details>
<summary><strong>🛠️ For Developers (Tech Stack & Setup)</strong></summary>

### Tech Stack
Built with **Astro** (SSG + SSR adapter), **Tailwind CSS** (Slate Grey design system), **Cloudflare Workers** (`wrangler.jsonc`), and **Google Gemini API** for optional AI features.

### Local Development
```bash
git clone https://github.com/Amanbyte-oss/toolnest.git && cd toolnest
npm install
cp .env.example .env          # Optional: add your GEMINI_API_KEY from Google AI Studio
npm run dev                   # Starts dev server on http://localhost:4321
npm run build                 # Builds static site & Worker bundle to dist/
npx wrangler deploy --dry-run # Validates Cloudflare deployment configuration
```

### Environment Variables
| Variable | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Powers AI option generator & name insights ([Google AI Studio](https://aistudio.google.com/)). Never commit this key! |

*For production on Cloudflare, add `GEMINI_API_KEY` as an encrypted Secret in Workers & Pages → Settings → Variables & Secrets.*

### Structure & License
Modular repository (`src/pages`, `src/components`, `src/scripts`, `src/styles`). Distributed under the [MIT License](LICENSE).
</details>
