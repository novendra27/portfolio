# Adi Novendra Putra — Software Engineering Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-adino.my.id-0ea5e9.svg?style=flat-square&logo=vercel&logoColor=white)](https://adino.my.id)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE.svg?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)

> Official personal engineering portfolio of **Adi Novendra Putra, S.Kom.** (`@novendra27`), Fullstack Developer & Software Engineer. Built with strict software engineering discipline, Core Web Vitals 100/100, and an architectural blueprint design system.

[🌐 Live Production](https://adino.my.id) · [🇮🇩 Bahasa Indonesia](https://adino.my.id) · [🇬🇧 English](https://adino.my.id/en/)

---

## 🏛️ Architectural Highlights

* **Zero-JavaScript by Default**: Built on **Astro** in Static Site Generation (SSG) mode for instant loading speeds and zero hydration overhead.
* **Architectural Blueprint Design**:
  * *Dark Mode Only*: Palette based on `#090d16` (Deep Blackish Slate).
  * *Crisp 1px Borders*: Subtle borders (`border-white/10`) with signature **corner crosshairs (`+`)** on structural intersection points.
  * *Unified Typography*: **Geist Sans** and **Geist Mono** for high-density, technical readability.
* **Native Bilingual Routing (i18n)**:
  * Default locale (Bahasa Indonesia): `/`
  * Secondary locale (English): `/en/`
  * Fast, segmented control **Language Switcher** `[ ID | EN ]` retaining page sub-routes.
* **Clean Architecture & Repository Adapter Pattern**:
  * **Phase 1**: `StaticRepository` serving in-memory relational joins across 11 domain entities.
  * **Phase 2 Ready**: Drop-in `NotionRepository` via the unified `IRepository` contract without modifying UI components.
* **4-Pillar Discovery (SEO, GEO, AEO, AI SEO)**:
  * **Schema.org JSON-LD**: Comprehensive `Person`, `WebSite`, `FAQPage`, and `SoftwareApplication` graphs.
  * **AI Agents & LLM Discovery**: Standard [`/llms.txt`](https://adino.my.id/llms.txt), [`/llms-id.txt`](https://adino.my.id/llms-id.txt), and [`/llms-full.txt`](https://adino.my.id/llms-full.txt) endpoints following [llmstxt.org](https://llmstxt.org).
  * **Permissive Crawlers**: Configured `robots.txt` supporting GPTBot, ClaudeBot, and PerplexityBot.
  * **Localized XML Sitemaps**: Dynamic `@astrojs/sitemap` with `xhtml:link` hreflang pairs.

---

## 📁 Project Directory Structure

```text
portfolio/
├── public/
│   ├── favicon.svg           # Minimal architectural favicon
│   ├── images/               # Production WebP image assets
│   └── robots.txt            # Search engine & AI bot permissions
├── src/
│   ├── assets/               # Bundled visual assets & optimized images
│   ├── components/           # Architectural UI components
│   │   ├── sections/         # 8 Core content sections (Hero, Architecture, Projects, etc.)
│   │   └── seo/              # JSON-LD structured data components
│   ├── data/                 # Relational static datasets (11 entities)
│   ├── domain/               # Domain Layer (Zod validation schemas & types)
│   ├── i18n/                 # UI dictionary and translation helpers
│   ├── layouts/              # BaseLayout.astro (SEO, Header, BottomNav, Footer)
│   ├── lib/                  # Infrastructure & Data Layer (Repository pattern)
│   ├── pages/                # Astro file-based routes & dynamic text endpoints
│   └── styles/               # Global CSS & Tailwind directives
├── astro.config.mjs          # Astro configuration (Tailwind, Sitemap, i18n)
├── tailwind.config.mjs       # Centralized architectural design tokens
└── tsconfig.json             # TypeScript strict configuration with path aliases
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20+` or `v22+`
* **npm**: `v10+` or `v11+`

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/novendra27/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:4321/](http://localhost:4321/) for the Indonesian version, or [http://localhost:4321/en/](http://localhost:4321/en/) for the English version.

---

## 🔨 Build & Production Verification

```bash
# Type-check with Astro diagnostics
npm run check

# Compile static site (SSG)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment (Vercel)

This project is configured for seamless deployment on **Vercel** with zero-configuration SSG output:
1. Connect the GitHub repository `novendra27/portfolio`.
2. Framework Preset: **Astro**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Production Domain: `https://adino.my.id`.

---

## 📄 License & Credits

* **Author**: [Adi Novendra Putra](https://www.linkedin.com/in/adi-novendra) (`@novendra27`)
* **License**: MIT License
