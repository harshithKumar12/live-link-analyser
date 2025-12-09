# 📡 Live Link Analyzer  
*A fast, lightweight, AI-assisted website diagnostic tool built with Vite + TypeScript.*

---

## 📁 Project Structure

live-link-analyzer/
├── src/
│ ├── components/
│ │ ├── MetricCard.tsx
│ │ ├── RadialProgress.tsx
│ │ └── StatusBadge.tsx
│ ├── services/
│ │ └── geminiService.ts
│ ├── App.tsx
│ └── index.tsx
├── .gitignore
├── index.html
├── README.md
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
---

## 🎯 Purpose & Overview

**Live Link Analyzer** is a web-based utility that performs a comprehensive, instant health scan of any URL — covering SEO, performance, security, tracking scripts, and tech-stack detection.  
It uses a headless browser and parsing logic on the backend (or utility layer) and presents user-friendly metrics and AI-generated summaries on the frontend.

You provide a URL, and get a full report in seconds — no database needed, no signup, just immediate diagnostics.

---

## ✅ Core Features & Analysis Points

- **SEO Health Check**  
  - Title / meta description detection (flags missing or non-optimal)  
  - Canonical URL detection  
  - Robots.txt / meta-robots compliance check  
  - Basic broken link detection (internal / external, 4xx errors)  

- **Performance Scan**  
  - Load time measurement  
  - Core Web Vitals simulation (e.g. LCP, TTFB)  
  - Image size detection (flag large images / non-optimal formats)  

- **Security Header Check**  
  - HTTPS enforcement  
  - Detection of headers such as:  
    - Strict-Transport-Security (HSTS)  
    - X-Content-Type-Options  
    - Content-Security-Policy (CSP) (flag if missing or weak)  

- **Tracking & Third-Party Script Detection**  
  - Lists third-party script domains found in `<script src="...">` tags  
  - Highlights common trackers (e.g. Google Analytics / GTM, Facebook Pixel)  

- **Tech-Stack Detection**  
  - Attempts to recognize CMS / platform (WordPress, Shopify, Next.js, etc.)  
  - Detects server technology, frontend framework or libraries if possible  

- **AI-Generated Summary** (via `/services/geminiService.ts`)  
  - Produces a human-readable summary of findings  
  - Provides prioritized improvement suggestions  
  - Converts raw metrics and warnings into actionable insights  

---

## 🧩 How It Works — High Level Flow

1. Frontend (React + Vite) sends a URL to an analysis function.  
2. Backend / Utility fetches the page HTML and HTTP response headers (via headless browser or fetch).  
3. The parser inspects SEO tags, page metadata, image assets, links, performance metrics, security headers, and scripts.  
4. Results are compiled into a JSON-structure.  
5. The AI service (`geminiService.ts`) ingests the JSON and returns a summarized, user-friendly report.  
6. Frontend displays:  
   - Metric cards (`MetricCard.tsx`)  
   - Radial progress indicators (`RadialProgress.tsx`)  
   - Status badges (`StatusBadge.tsx`)  
   - The AI summary and recommendations  

---

## 🚀 Why This Project Is Valuable

- **Instant & All-In-One** — Combines SEO, performance, security, tracking and tech-stack checks in one tool.  
- **No Database or Sign-up Required** — Simple URL input → instant result — ideal for quick audits.  
- **Developer & Non-Developer Friendly** — Offers raw data for technical users; friendly summaries for non-tech stakeholders.  
- **Privacy & Transparency Focused** — Reveals hidden trackers and security misconfigurations.  
- **Lightweight & Fast** — Built with Vite + TS, minimal dependencies, fast load time and rendering.  
- **Easy to Extend** — Modular design makes it easy to add more checks or metrics later.  

---

## 💡 Potential Use Cases

- Quick audits of your own website before deployment  
- SEO / marketing checks for clients or competitors  
- Security & performance pre-checks for web projects  
- Education tool to understand what makes a “healthy” website  
- Freelance / agency report generator — no overhead  

---

## 🛠 Tech Stack & Tools

- **Frontend:** Vite + TypeScript + React  
- **UI Components:** MetricCard.tsx, RadialProgress.tsx, StatusBadge.tsx  
- **AI Summary Service:** services/geminiService.ts  
- **Build Tools:** Vite config, TypeScript settings  
- **No database or backend server required** (stateless); analysis done per-request  

---

## 📄 How to Use / Run Locally

1. Clone the repo  
2. Run `npm install` (or `yarn`)  
3. Run `npm run dev` (or `yarn dev`)  
4. Open the UI in browser → paste in a URL → view report  

---

## 🧭 How to Extend / Customize

- Add more metrics (e.g. Lighthouse-style audits, accessibility checks)  
- Expand tech stack detection logic  
- Improve AI summary prompts or switch AI model  
- Add PDF/CSV export of reports  
- Integrate history or project-wide audits (optional local storage)  

---

## 📝 Remark on Data Handling & Storage

This tool is **stateless** — there is **no database or persistent storage**.  
Each URL scan is processed on demand, and results are only kept in-memory (frontend state).  
This keeps the tool lightweight and privacy-friendly.

---

## 🎯 Conclusion

**Live Link Analyzer** provides a clean, efficient, and powerful way to audit any website in seconds.  
It merges technical depth with user-friendly reporting — making it useful for developers, marketers, freelancers, agencies, or anyone interested in web health.

Whether you want to check SEO, performance, security, or just get a quick site snapshot — this tool delivers.  
