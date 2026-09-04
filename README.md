# ToolNest — Mobile-First Multi-Tool Platform

A fast, privacy-friendly, mobile-first multi-tool website built with **Astro** (static output) and **Tailwind CSS** using a custom **Slate Grey** design system.

- **Zero Backend / Zero Database**: Fully static architecture with client-side vanilla JavaScript.
- **Edge Deployment**: Optimized for zero-configuration deployment on **Cloudflare Pages**.
- **Mobile-First Responsive Design**: Engineered for 375px+ screens with touch targets exceeding 48x48px and anti-zoom inputs.
- **Slate Grey Theme**: Modern SaaS aesthetic with class-based light/dark mode and zero flash of unstyled content (anti-FOUC).

---

## Project Structure

```
├── public/
│   ├── favicon.svg          # Custom SVG favicon
│   └── robots.txt           # Crawler instructions & sitemap link
├── src/
│   ├── components/
│   │   ├── Footer.astro     # Responsive multi-column footer
│   │   ├── Header.astro     # Sticky blurred header, theme toggle, mobile drawer
│   │   ├── Seo.astro        # Meta tags, OpenGraph, Twitter, and JSON-LD schema
│   │   └── ToolCard.astro   # Interactive tool card component
│   ├── data/                # Data directory for future JSON resources
│   ├── layouts/
│   │   └── Base.astro       # HTML5 shell, anti-FOUC script, SEO, and container
│   ├── pages/
│   │   └── index.astro      # Main tools index and sandbox
│   └── styles/
│       └── global.css       # Design tokens, Tailwind layers, component utilities
├── astro.config.mjs         # Astro configuration with static output & integrations
├── package.json             # Scripts & dependencies
├── tailwind.config.mjs      # Custom Slate Grey theme tokens & dark mode
└── tsconfig.json            # TypeScript path aliases and strict configuration
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 3. Build for Production
```bash
npm run build
```
This outputs a fully static build into the `dist/` directory, including an automatically generated `sitemap-index.xml` and `sitemap-0.xml`.

### 4. Preview the Production Build Locally
```bash
npm run preview
```

---

## Cloudflare Pages Deployment

### Option A: Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository and configure the build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: `18.x` or higher (Set environment variable `NODE_VERSION = 20` if prompted)
4. Click **Save and Deploy**.

### Option B: Cloudflare Wrangler CLI (Direct Upload)
```bash
npm run build
npx wrangler pages deploy dist --project-name=toolnest
```

---

## AI Preset Generator & Native Astro API Route

ToolNest includes an AI-powered preset generator for the **Decision Wheel** powered by Google's **Gemini 3.7 Flash** model via a native Astro API route (`src/pages/api/generate-options.js`) using `@astrojs/cloudflare`.

All content pages remain 100% prerendered and static, while `/api/generate-options` runs dynamically in both local dev and on Cloudflare Pages.

### 1. Local Development (`npm run dev`)
Create a `.env` file in the project root:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```
Run the Astro dev server:
```bash
npm run dev
```
The API route is automatically served at `http://localhost:4321/api/generate-options` and reads `import.meta.env.GEMINI_API_KEY`.

### 2. Cloudflare Pages Deployment (Production)
1. Go to **Cloudflare Dashboard** > **Workers & Pages** > Select your **ToolNest** project.
2. Navigate to **Settings** > **Environment variables**.
3. Click **Add variable**:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key from [Google AI Studio](https://aistudio.google.com/)
   - **Environment**: Production (and Preview if desired)
4. Click **Save and Deploy**. The key is securely passed via `locals.runtime.env.GEMINI_API_KEY` and is **never** bundled into client code.

### 3. Testing Simulated Cloudflare Runtime Locally
To test the built Cloudflare worker bundle with environment variables locally:
```bash
# 1. Build the production assets
npm run build

# 2. Run Wrangler Pages local dev server
npx wrangler pages dev dist
```

---

## Design System: "Slate Grey" Tokens

| Token | Light Mode | Dark Mode | Description |
| :--- | :--- | :--- | :--- |
| **Page Background** | `#F4F5F7` | `#111315` | Soft grey (never pure white), deep graphite |
| **Surface** | `#FFFFFF` | `#1B1E21` | Card and drawer surface |
| **Border** | `#E5E7EB` | `#2A2E33` | Subtle perimeter borders |
| **Primary Accent** | `#6366F1` | `#6366F1` | Muted indigo (used for <10% of page) |
| **Text Primary** | `#1F2937` | `#F9FAFB` | Headings & primary body copy |
| **Text Secondary** | `#6B7280` | `#9CA3AF` | Captions, muted text, descriptions |
| **Input Background** | `#F9FAFB` | `#26292D` | Form fields (16px minimum font size) |
| **Success / Warning / Error** | `#10B981` / `#F59E0B` / `#EF4444` | State indicators |

---

## Mobile-First & Performance Standards
- **375px+ baseline**: Verified on 320px minimum without horizontal overflow.
- **Accessible Tap Targets**: 48x48px touch targets on buttons and mobile drawers.
- **Zero FOUC Theme Switching**: Instant detection via inline script in `<head>`.
- **Vanilla JavaScript**: Zero heavy client frameworks (no React / Vue).
# toolnest
