import fs from 'fs';
import path from 'path';
import {
  CURRENCIES,
  Language,
  ROUTE_PAIRS,
  SITE_CONFIG,
  ToolId,
} from '../src/data/config';
import { LegalPageContent, SITE_CONTENT } from '../src/data/siteContent';
import { TOOL_LIST, TOOLS_DATA } from '../src/data/toolsContent';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeBoth(relPath: string, content: string) {
  const rootTarget = path.join(ROOT_DIR, relPath);
  const publicTarget = path.join(PUBLIC_DIR, relPath);
  ensureDir(rootTarget);
  ensureDir(publicTarget);
  fs.writeFileSync(rootTarget, content, 'utf8');
  fs.writeFileSync(publicTarget, content, 'utf8');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================================
 * 1. CSS/STYLES.CSS
 * ========================================================================== */
const STYLES_CSS = `/* ==========================================================================
   CalculaFácil — Complete Production Stylesheet (HTML5 / CSS3)
   Mobile-first (320px+), WCAG AA Accessible, Tabular Numerals, Zero Clutter
   ========================================================================== */

:root {
  --bg-canvas: #f8fafc;
  --bg-surface: #ffffff;
  --bg-muted: #f1f5f9;
  --bg-accent-soft: #eff6ff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --border-strong: #cbd5e1;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --accent-text: #1e40af;
  --success: #047857;
  --warning: #b45309;
  --danger: #b91c1c;
  --danger-bg: #fef2f2;
  --danger-border: #fecaca;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-canvas);
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main, section, article, header, footer, div {
  min-width: 0;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  color: var(--text-primary);
  margin-top: 0;
  line-height: 1.25;
  overflow-wrap: break-word;
}

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tabular-nums, .mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 0.875rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

/* Header & Navigation */
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid var(--border-color);
}

.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.625rem 0;
}

@media (min-width: 640px) {
  .header-inner {
    flex-wrap: nowrap;
    height: 4rem;
    padding: 0;
    gap: 1rem;
  }
}

.brand-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-primary);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

@media (min-width: 640px) {
  .brand-logo {
    font-size: 1.15rem;
  }
}

.brand-logo:hover {
  text-decoration: none;
}

.main-nav {
  display: none;
  align-items: center;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .main-nav {
    display: flex;
  }
}

.main-nav a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
}

.main-nav a:hover, .main-nav a.active {
  color: var(--accent);
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.desktop-lang {
  display: none;
}

@media (min-width: 640px) {
  .desktop-lang {
    display: inline-flex;
  }
}

.mobile-lang-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.45rem;
  border-top: 1px solid var(--bg-muted);
}

@media (min-width: 640px) {
  .mobile-lang-row {
    display: none;
  }
}

.mobile-lang-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
}

.lang-switcher {
  display: inline-flex;
  background: var(--bg-muted);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.15rem;
}

.mobile-lang-row .lang-switcher {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex: 1;
  max-width: 14rem;
}

.lang-link {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.275rem 0.55rem;
  border-radius: 0.35rem;
  color: var(--text-secondary);
  white-space: nowrap;
  text-align: center;
}

.lang-link:hover {
  text-decoration: none;
  color: var(--text-primary);
}

.lang-link.active {
  background: var(--accent);
  color: #ffffff;
}

.mobile-menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.25rem;
  padding: 0 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-nav {
  display: none;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 0.75rem 1rem;
}

.mobile-nav.open {
  display: block;
}

.mobile-nav a {
  display: block;
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Hero Section */
.hero {
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  padding: 2.25rem 0 2.5rem;
  text-align: center;
}

@media (min-width: 640px) {
  .hero {
    padding: 3.25rem 0 3.5rem;
  }
}

.hero-kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 auto 0.875rem;
}

.kicker-item {
  white-space: nowrap;
}

.kicker-sep {
  color: var(--border-strong);
}

.hero h1 {
  font-size: clamp(1.65rem, 5.2vw, 3rem);
  line-height: 1.18;
  max-width: 42rem;
  margin: 0 auto 0.875rem;
  text-wrap: balance;
}

.heading-clause {
  display: inline-block;
}

.hero-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 38rem;
  margin: 0 auto 1.5rem;
  text-wrap: pretty;
}

@media (min-width: 640px) {
  .hero-subtitle {
    font-size: 1.0625rem;
    margin-bottom: 1.75rem;
  }
}

.search-box {
  max-width: 34rem;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  height: 2.875rem;
  padding: 0 1rem;
  font-size: 0.9375rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--bg-canvas);
  color: var(--text-primary);
}

.search-input:focus {
  background: var(--bg-surface);
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.hero-tools-nav {
  max-width: 56rem;
  margin: 1.5rem auto 0;
}

.hero-tools-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin: 0 0 0.5rem;
}

.hero-tools-tray {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.4rem;
  background: var(--bg-muted);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
}

@media (min-width: 640px) {
  .hero-tools-tray {
    gap: 0.5rem;
    padding: 0.5rem;
  }
}

.hero-tool-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  max-width: 100%;
  overflow-wrap: break-word;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

@media (min-width: 640px) {
  .hero-tool-btn {
    padding: 0.45rem 0.75rem;
  }
}

.hero-tool-btn:hover {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
  text-decoration: none;
}

/* Sections & Cards */
.section {
  padding: 2rem 0;
}

@media (min-width: 640px) {
  .section {
    padding: 2.5rem 0;
  }
}

.section-header {
  margin-bottom: 1.25rem;
}

.section-header h2 {
  font-size: 1.375rem;
  margin-bottom: 0.35rem;
}

@media (min-width: 640px) {
  .section-header h2 {
    font-size: 1.5rem;
  }
}

.section-header p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.125rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.125rem;
}

@media (min-width: 640px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  min-width: 0;
  width: 100%;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.15s ease;
}

@media (min-width: 640px) {
  .card {
    padding: 1.5rem;
  }
}

.card:hover {
  border-color: var(--accent);
}

.card-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.card h3 {
  font-size: 1.0625rem;
  margin-bottom: 0.5rem;
  line-height: 1.35;
}

.card h3 a {
  color: var(--text-primary);
}

.card h3 a:hover {
  color: var(--accent);
  text-decoration: none;
}

.card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1.125rem;
  overflow-wrap: break-word;
}

.card-footer {
  padding-top: 0.875rem;
  border-top: 1px solid var(--bg-muted);
  font-size: 0.875rem;
  font-weight: 600;
}

/* Filter Tabs */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  height: 2.25rem;
  padding: 0 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
}

.filter-btn.active {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

/* Breadcrumbs */
.breadcrumb {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 1.25rem 0 0.875rem;
  overflow-wrap: break-word;
}

.breadcrumb a {
  color: var(--text-secondary);
}

/* Calculator Box */
.calc-panel {
  min-width: 0;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .calc-panel {
    padding: 2rem;
  }
}

.currency-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

@media (min-width: 640px) {
  .currency-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.125rem;
}

@media (min-width: 640px) {
  .form-grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .form-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.375rem;
}

.form-control {
  width: 100%;
  max-width: 100%;
  height: 2.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  color: var(--text-primary);
}

textarea.form-control {
  height: auto;
  min-height: 10rem;
  font-family: var(--font-body);
  line-height: 1.6;
}

.form-control:focus {
  border-color: var(--accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.calc-actions {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
}

@media (min-width: 640px) {
  .calc-actions {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
}

.btn-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
}

@media (min-width: 640px) {
  .btn-group {
    display: flex;
    flex-wrap: wrap;
    width: auto;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  padding: 0 0.875rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  text-align: center;
}

@media (min-width: 640px) {
  .btn {
    font-size: 0.875rem;
    padding: 0 1rem;
  }
}

.btn-primary {
  background: var(--accent);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-surface);
  border-color: var(--border-strong);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background: var(--bg-muted);
}

.btn-subtle {
  background: var(--bg-muted);
  border-color: var(--border-color);
  color: var(--text-primary);
  width: 100%;
}

@media (min-width: 640px) {
  .btn-subtle {
    width: auto;
  }
}

.copy-toast {
  position: fixed;
  bottom: 1.25rem;
  left: 1rem;
  right: 1rem;
  z-index: 60;
  background: #0f172a;
  color: #ffffff;
  border: 1px solid #334155;
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.copy-toast.visible {
  display: flex;
}

@media (min-width: 640px) {
  .copy-toast {
    left: auto;
    right: 1.5rem;
    max-width: 22rem;
  }
}

.results-area {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.875rem;
}

@media (min-width: 640px) {
  .results-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

.result-box {
  min-width: 0;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  background: var(--bg-canvas);
  border: 1px solid var(--border-color);
}

.result-box.highlight {
  background: var(--bg-accent-soft);
  border-color: #bfdbfe;
}

.result-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.result-value {
  display: block;
  margin-top: 0.25rem;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
  overflow-wrap: break-word;
}

@media (min-width: 640px) {
  .result-value {
    font-size: 1.35rem;
  }
}

.result-box.highlight .result-value {
  color: var(--accent-hover);
}

.error-box {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  background: var(--danger-bg);
  border: 1px solid var(--danger-border);
  color: var(--danger);
  font-size: 0.875rem;
  font-weight: 600;
  overflow-wrap: break-word;
}

.formula-box {
  background: #0f172a;
  color: #f8fafc;
  padding: 1rem;
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  overflow-x: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin: 0.75rem 0 1rem;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-top: 1rem;
  max-height: 24rem;
  overflow-y: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.data-table th, .data-table td {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--border-color);
  text-align: right;
}

.data-table th:first-child, .data-table td:first-child {
  text-align: left;
}

.data-table th {
  background: var(--bg-muted);
  font-weight: 600;
  position: sticky;
  top: 0;
}

.ad-placeholder {
  margin: 2.5rem auto;
  max-width: 52rem;
  padding: 1.25rem;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-muted);
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.notice-box {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-canvas);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

/* Footer */
.site-footer {
  margin-top: auto;
  background: var(--bg-surface);
  border-top: 1px solid var(--border-color);
  padding: 3rem 0 2rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1.2fr 2fr 1fr;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .footer-links-2col {
    grid-template-columns: repeat(2, 1fr);
  }
}

.footer-bottom {
  margin-top: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}
`;

/* ============================================================================
 * 2. JS/LANGUAGE.JS
 * ========================================================================== */
const LANGUAGE_JS = `/**
 * CalculaFácil — Language & Currency Preference Manager (Vanilla JS)
 * Uses localStorage only for optional language and currency preferences with safe fallbacks.
 */
(function () {
  var STORAGE_LANG_KEY = '${SITE_CONFIG.storageKeys.language}';
  var STORAGE_CURR_KEY = '${SITE_CONFIG.storageKeys.currency}';

  function safeGet(key) {
    try {
      if (window.localStorage) return window.localStorage.getItem(key);
    } catch (e) {}
    return null;
  }

  function safeSet(key, val) {
    try {
      if (window.localStorage) window.localStorage.setItem(key, val);
    } catch (e) {}
  }

  window.HF_Preferences = {
    getLanguage: function () {
      var htmlLang = document.documentElement.lang;
      if (htmlLang === 'en' || htmlLang === 'es') return htmlLang;
      return safeGet(STORAGE_LANG_KEY) || 'es';
    },
    setLanguage: function (lang) {
      if (lang === 'es' || lang === 'en') {
        safeSet(STORAGE_LANG_KEY, lang);
      }
    },
    getCurrency: function () {
      return safeGet(STORAGE_CURR_KEY) || 'EUR';
    },
    setCurrency: function (curr) {
      safeSet(STORAGE_CURR_KEY, curr);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var currentLang = document.documentElement.lang === 'en' ? 'en' : 'es';
    window.HF_Preferences.setLanguage(currentLang);

    var langLinks = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < langLinks.length; i++) {
      langLinks[i].addEventListener('click', function () {
        var target = this.getAttribute('data-set-lang');
        if (target) window.HF_Preferences.setLanguage(target);
      });
    }
  });
})();
`;

/* ============================================================================
 * 3. JS/CALCULATORS.JS
 * ========================================================================== */
const CALCULATORS_JS = `/**
 * CalculaFácil — Complete Vanilla JavaScript Calculator Engines
 * Implements all 10 tools with full validation, multi-currency formatting,
 * reducing-balance loan EMI amortization, salary frequency conversion, and live text counters.
 */
(function () {
  var CURRENCIES = ${JSON.stringify(CURRENCIES)};

  function parseNum(raw) {
    if (raw === null || raw === undefined) return NaN;
    var s = String(raw).trim();
    if (!s) return NaN;
    if (s.indexOf(',') !== -1 && s.indexOf('.') === -1) {
      s = s.replace(',', '.');
    } else {
      s = s.replace(/,/g, '');
    }
    var n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  }

  function formatNumber(val, lang, decimals) {
    if (!Number.isFinite(val)) return '—';
    var d = typeof decimals === 'number' ? decimals : 2;
    var loc = lang === 'en' ? 'en-US' : 'es-ES';
    try {
      return new Intl.NumberFormat(loc, {
        minimumFractionDigits: d,
        maximumFractionDigits: d
      }).format(val);
    } catch (e) {
      return val.toFixed(d);
    }
  }

  function formatCurrency(val, code, lang) {
    if (!Number.isFinite(val)) return '—';
    var info = CURRENCIES[0];
    for (var i = 0; i < CURRENCIES.length; i++) {
      if (CURRENCIES[i].code === code) {
        info = CURRENCIES[i];
        break;
      }
    }
    var loc = lang === 'en' ? info.localeEn : info.localeEs;
    try {
      var numStr = new Intl.NumberFormat(loc, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(val);
      return numStr + ' ' + info.code + ' (' + info.symbol + ')';
    } catch (e) {
      return val.toFixed(2) + ' ' + info.code;
    }
  }

  function formatPercent(val, lang) {
    if (!Number.isFinite(val)) return '—';
    return formatNumber(val, lang, 2) + '%';
  }

  window.HF_Calculators = {
    parseNum: parseNum,
    formatNumber: formatNumber,
    formatCurrency: formatCurrency,
    formatPercent: formatPercent,

    profitMargin: function (costRaw, sellingRaw) {
      var cost = parseNum(costRaw);
      var selling = parseNum(sellingRaw);
      if (isNaN(cost) || isNaN(selling)) {
        return { ok: false, es: 'Introduce valores numéricos válidos para el coste y el precio de venta.', en: 'Please enter valid numeric values for cost price and selling price.' };
      }
      if (cost < 0 || selling < 0) {
        return { ok: false, es: 'El coste y el precio de venta no pueden ser negativos.', en: 'Cost price and selling price cannot be negative.' };
      }
      if (selling === 0) {
        return { ok: false, es: 'El precio de venta debe ser mayor que cero para calcular el margen.', en: 'Selling price must be greater than zero to calculate profit margin.' };
      }
      var profit = selling - cost;
      var margin = (profit / selling) * 100;
      var markup = cost > 0 ? (profit / cost) * 100 : null;
      return { ok: true, profit: profit, margin: margin, markup: markup, cost: cost, selling: selling };
    },

    sellingPrice: function (costRaw, marginRaw) {
      var cost = parseNum(costRaw);
      var margin = parseNum(marginRaw);
      if (isNaN(cost) || isNaN(margin)) {
        return { ok: false, es: 'Introduce un coste y un margen deseado válidos.', en: 'Please enter a valid product cost and desired profit margin.' };
      }
      if (cost <= 0) {
        return { ok: false, es: 'El coste del producto debe ser mayor que cero.', en: 'Product cost must be greater than zero.' };
      }
      if (margin < 0 || margin >= 100) {
        return { ok: false, es: 'El margen deseado debe ser mayor o igual a 0% y estrictamente menor del 100%.', en: 'Desired profit margin must be between 0% and strictly less than 100%.' };
      }
      var selling = cost / (1 - margin / 100);
      var profit = selling - cost;
      var markup = (profit / cost) * 100;
      return { ok: true, selling: selling, profit: profit, margin: margin, markup: markup, cost: cost };
    },

    breakEven: function (fixedRaw, varRaw, sellRaw) {
      var fixed = parseNum(fixedRaw);
      var variable = parseNum(varRaw);
      var selling = parseNum(sellRaw);
      if (isNaN(fixed) || isNaN(variable) || isNaN(selling)) {
        return { ok: false, es: 'Introduce valores numéricos válidos en los tres campos.', en: 'Please enter valid numbers in all three fields.' };
      }
      if (fixed < 0 || variable < 0 || selling <= 0) {
        return { ok: false, es: 'Los costes no pueden ser negativos y el precio de venta debe ser mayor que cero.', en: 'Costs cannot be negative and selling price must be greater than zero.' };
      }
      if (selling <= variable) {
        return { ok: false, es: 'Cálculo imposible: el precio de venta por unidad debe ser mayor que el coste variable por unidad.', en: 'Calculation impossible: selling price per unit must be greater than variable cost per unit.' };
      }
      var cm = selling - variable;
      var exactUnits = fixed / cm;
      var units = Math.ceil(exactUnits);
      var revenue = units * selling;
      return { ok: true, units: units, exactUnits: exactUnits, revenue: revenue, cm: cm };
    },

    hourlyCost: function (costRaw, hoursRaw, dayHoursRaw) {
      var cost = parseNum(costRaw);
      var hours = parseNum(hoursRaw);
      var dayHours = String(dayHoursRaw || '').trim() === '' ? 8 : parseNum(dayHoursRaw);
      if (isNaN(cost) || isNaN(hours) || isNaN(dayHours)) {
        return { ok: false, es: 'Introduce un coste total y un número de horas válidos.', en: 'Please enter valid total cost and total hours.' };
      }
      if (cost < 0 || hours <= 0 || dayHours <= 0 || dayHours > 24) {
        return { ok: false, es: 'El coste no puede ser negativo y las horas deben ser mayores que cero.', en: 'Cost cannot be negative and hours must be greater than zero.' };
      }
      var hourly = cost / hours;
      var daily = hourly * dayHours;
      return { ok: true, hourly: hourly, daily: daily, dayHours: dayHours };
    },

    commission: function (salesRaw, rateRaw) {
      var sales = parseNum(salesRaw);
      var rate = parseNum(rateRaw);
      if (isNaN(sales) || isNaN(rate) || sales < 0 || rate < 0) {
        return { ok: false, es: 'Introduce ventas y porcentaje de comisión válidos (no negativos).', en: 'Please enter valid non-negative sales and commission percentage.' };
      }
      var comm = (sales * rate) / 100;
      return { ok: true, commission: comm, totalWith: sales + comm, netAfter: sales - comm };
    },

    discount: function (priceRaw, rateRaw) {
      var price = parseNum(priceRaw);
      var rate = parseNum(rateRaw);
      if (isNaN(price) || isNaN(rate) || price < 0 || rate < 0 || rate > 100) {
        return { ok: false, es: 'Introduce un precio válido y un descuento entre 0% y 100%.', en: 'Please enter a valid price and a discount between 0% and 100%.' };
      }
      var disc = (price * rate) / 100;
      return { ok: true, discount: disc, finalPrice: price - disc, savedPercent: rate };
    },

    wordCount: function (text) {
      var raw = text || '';
      var trimmed = raw.trim();
      var words = trimmed === '' ? 0 : trimmed.split(/\\s+/).filter(Boolean).length;
      var chars = raw.length;
      var noSpaces = raw.replace(/\\s/g, '').length;
      var sentences = trimmed === '' ? 0 : trimmed.split(/[.!?]+/).map(function (s) { return s.trim(); }).filter(Boolean).length;
      var paragraphs = trimmed === '' ? 0 : raw.split(/\\r?\\n+/).map(function (p) { return p.trim(); }).filter(Boolean).length;
      return { words: words, chars: chars, noSpaces: noSpaces, sentences: sentences, paragraphs: paragraphs };
    },

    charCount: function (text, limitRaw) {
      var raw = text || '';
      var trimmed = raw.trim();
      var lim = parseNum(limitRaw);
      var limit = Number.isFinite(lim) && lim > 0 ? Math.floor(lim) : 155;
      var chars = raw.length;
      var noSpaces = raw.replace(/\\s/g, '').length;
      var words = trimmed === '' ? 0 : trimmed.split(/\\s+/).filter(Boolean).length;
      var remaining = limit - chars;
      return { chars: chars, noSpaces: noSpaces, words: words, limit: limit, remaining: remaining, exceeded: chars > limit };
    },

    bankLoan: function (pRaw, rRaw, dRaw, unit, feeRaw) {
      var p = parseNum(pRaw);
      var annualRate = parseNum(rRaw);
      var dur = parseNum(dRaw);
      var fee = String(feeRaw || '').trim() === '' ? 0 : parseNum(feeRaw);
      if (isNaN(p) || isNaN(annualRate) || isNaN(dur) || isNaN(fee) || p <= 0 || annualRate < 0 || dur <= 0 || fee < 0) {
        return { ok: false, es: 'Introduce importe (>0), interés (>=0) y plazo (>0) válidos.', en: 'Please enter valid principal (>0), interest rate (>=0), and duration (>0).' };
      }
      var n = unit === 'years' ? Math.round(dur * 12) : Math.round(dur);
      if (n < 1 || n > 600) {
        return { ok: false, es: 'El plazo debe estar entre 1 y 600 meses.', en: 'Duration must be between 1 and 600 months.' };
      }
      var r = annualRate / 12 / 100;
      var emi = annualRate === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      var schedule = [];
      var bal = p;
      var totalInt = 0;
      for (var m = 1; m <= n; m++) {
        var open = bal;
        var intPaid = annualRate === 0 ? 0 : open * r;
        var prinPaid = m === n ? open : emi - intPaid;
        var pay = prinPaid + intPaid;
        var rem = Math.max(0, open - prinPaid);
        totalInt += intPaid;
        schedule.push({ month: m, open: open, pay: pay, prin: prinPaid, int: intPaid, rem: rem });
        bal = rem;
      }
      var totalRepay = p + totalInt;
      return { ok: true, emi: emi, principal: p, totalInterest: totalInt, totalRepay: totalRepay, fee: fee, totalCost: totalRepay + fee, months: n, schedule: schedule };
    },

    salary: function (amtRaw, freq, hDayRaw, dWeekRaw, bonusRaw, dedRaw) {
      var amt = parseNum(amtRaw);
      var hDay = parseNum(hDayRaw);
      var dWeek = parseNum(dWeekRaw);
      var bonus = String(bonusRaw || '').trim() === '' ? 0 : parseNum(bonusRaw);
      var ded = String(dedRaw || '').trim() === '' ? 0 : parseNum(dedRaw);
      if (isNaN(amt) || isNaN(hDay) || isNaN(dWeek) || isNaN(bonus) || isNaN(ded) || amt <= 0 || hDay <= 0 || hDay > 24 || dWeek <= 0 || dWeek > 7 || bonus < 0 || ded < 0) {
        return { ok: false, es: 'Introduce salario (>0), horas/día (1-24) y días/semana (1-7) válidos.', en: 'Please enter valid salary (>0), hours/day (1-24), and days/week (1-7).' };
      }
      var daysYear = dWeek * 52;
      var hoursYear = hDay * dWeek * 52;
      var multMap = { hourly: hoursYear, daily: daysYear, weekly: 52, biweekly: 26, monthly: 12, annual: 1 };
      var mult = multMap[freq] || 12;
      var grossAnn = amt * mult;
      var bonusAnn = bonus * mult;
      var dedAnn = ded * mult;
      var netAnn = grossAnn + bonusAnn - dedAnn;
      return {
        ok: true,
        grossAnnual: grossAnn,
        grossMonthly: grossAnn / 12,
        grossBiweekly: grossAnn / 26,
        grossWeekly: grossAnn / 52,
        grossDaily: grossAnn / daysYear,
        grossHourly: grossAnn / hoursYear,
        bonusAnnual: bonusAnn,
        dedAnnual: dedAnn,
        netAnnual: netAnn,
        netMonthly: netAnn / 12,
        netBiweekly: netAnn / 26,
        netWeekly: netAnn / 52,
        netDaily: netAnn / daysYear,
        netHourly: netAnn / hoursYear
      };
    }
  };
})();
`;

/* ============================================================================
 * 4. JS/APP.JS
 * ========================================================================== */
const APP_JS = `/**
 * CalculaFácil — Main Interactive UI Controller (Vanilla JS)
 */
document.addEventListener('DOMContentLoaded', function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  var C = window.HF_Calculators;
  var P = window.HF_Preferences;

  // 1. Mobile Menu Toggle
  var menuBtn = document.getElementById('mobile-menu-toggle');
  var mobileNav = document.getElementById('mobile-nav-drawer');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // 2. Homepage Search & Category Filter
  var searchInput = document.getElementById('static-tool-search');
  var filterBtns = document.querySelectorAll('[data-filter-cat]');
  var toolCards = document.querySelectorAll('[data-tool-card]');
  var activeCat = 'all';

  function filterCatalog() {
    var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    for (var i = 0; i < toolCards.length; i++) {
      var card = toolCards[i];
      var cat = card.getAttribute('data-tool-cat');
      var text = (card.textContent || '').toLowerCase();
      var matchCat = activeCat === 'all' || cat === activeCat;
      var matchQ = !q || text.indexOf(q) !== -1;
      card.style.display = matchCat && matchQ ? '' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCatalog);
  }
  for (var f = 0; f < filterBtns.length; f++) {
    filterBtns[f].addEventListener('click', function () {
      activeCat = this.getAttribute('data-filter-cat') || 'all';
      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }
      this.classList.add('active');
      filterCatalog();
    });
  }

  // 3. Tool Calculator Binding
  var calcRoot = document.getElementById('hf-calculator-root');
  if (!calcRoot || !C) return;

  var toolId = calcRoot.getAttribute('data-tool-id');
  var currencySelect = document.getElementById('hf-currency-select');
  var currentCurrency = P ? P.getCurrency() : 'EUR';
  if (currencySelect) {
    currencySelect.value = currentCurrency;
    currencySelect.addEventListener('change', function () {
      currentCurrency = this.value;
      if (P) P.setCurrency(currentCurrency);
      runCalculation();
    });
  }

  var errorBox = document.getElementById('hf-calc-error');
  var resultsBox = document.getElementById('hf-calc-results');
  var lastCopySummary = '';

  function showError(msg) {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = 'block';
    }
    if (resultsBox) resultsBox.style.display = 'none';
    lastCopySummary = '';
  }

  function showResults() {
    if (errorBox) errorBox.style.display = 'none';
    if (resultsBox) resultsBox.style.display = 'block';
  }

  function setVal(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setInput(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val;
  }

  function runCalculation() {
    if (toolId === 'profit-margin') {
      var r = C.profitMargin(getVal('in-cost'), getVal('in-selling'));
      if (!r.ok) return showError(lang === 'en' ? r.en : r.es);
      showResults();
      setVal('out-profit', C.formatCurrency(r.profit, currentCurrency, lang));
      setVal('out-margin', C.formatPercent(r.margin, lang));
      setVal('out-markup', r.markup !== null ? C.formatPercent(r.markup, lang) : 'N/A');
      lastCopySummary = 'Profit: ' + C.formatCurrency(r.profit, currentCurrency, lang) + ' | Margin: ' + C.formatPercent(r.margin, lang);
    } else if (toolId === 'selling-price') {
      var r2 = C.sellingPrice(getVal('in-cost'), getVal('in-margin'));
      if (!r2.ok) return showError(lang === 'en' ? r2.en : r2.es);
      showResults();
      setVal('out-selling', C.formatCurrency(r2.selling, currentCurrency, lang));
      setVal('out-profit', C.formatCurrency(r2.profit, currentCurrency, lang));
      setVal('out-markup', C.formatPercent(r2.markup, lang));
      lastCopySummary = 'Selling Price: ' + C.formatCurrency(r2.selling, currentCurrency, lang) + ' | Profit: ' + C.formatCurrency(r2.profit, currentCurrency, lang);
    } else if (toolId === 'break-even') {
      var r3 = C.breakEven(getVal('in-fixed'), getVal('in-variable'), getVal('in-selling'));
      if (!r3.ok) return showError(lang === 'en' ? r3.en : r3.es);
      showResults();
      setVal('out-units', C.formatNumber(r3.units, lang, 0));
      setVal('out-revenue', C.formatCurrency(r3.revenue, currentCurrency, lang));
      setVal('out-cm', C.formatCurrency(r3.cm, currentCurrency, lang));
      lastCopySummary = 'Break-Even Units: ' + r3.units + ' | Revenue: ' + C.formatCurrency(r3.revenue, currentCurrency, lang);
    } else if (toolId === 'hourly-cost') {
      var r4 = C.hourlyCost(getVal('in-cost'), getVal('in-hours'), getVal('in-dayhours'));
      if (!r4.ok) return showError(lang === 'en' ? r4.en : r4.es);
      showResults();
      setVal('out-hourly', C.formatCurrency(r4.hourly, currentCurrency, lang));
      setVal('out-daily', C.formatCurrency(r4.daily, currentCurrency, lang));
      lastCopySummary = 'Hourly Cost: ' + C.formatCurrency(r4.hourly, currentCurrency, lang) + ' | Daily Cost: ' + C.formatCurrency(r4.daily, currentCurrency, lang);
    } else if (toolId === 'commission') {
      var r5 = C.commission(getVal('in-sales'), getVal('in-rate'));
      if (!r5.ok) return showError(lang === 'en' ? r5.en : r5.es);
      showResults();
      setVal('out-commission', C.formatCurrency(r5.commission, currentCurrency, lang));
      setVal('out-total', C.formatCurrency(r5.totalWith, currentCurrency, lang));
      setVal('out-net', C.formatCurrency(r5.netAfter, currentCurrency, lang));
      lastCopySummary = 'Commission: ' + C.formatCurrency(r5.commission, currentCurrency, lang);
    } else if (toolId === 'discount') {
      var r6 = C.discount(getVal('in-price'), getVal('in-rate'));
      if (!r6.ok) return showError(lang === 'en' ? r6.en : r6.es);
      showResults();
      setVal('out-final', C.formatCurrency(r6.finalPrice, currentCurrency, lang));
      setVal('out-discount', C.formatCurrency(r6.discount, currentCurrency, lang));
      setVal('out-saved', C.formatPercent(r6.savedPercent, lang));
      lastCopySummary = 'Final Price: ' + C.formatCurrency(r6.finalPrice, currentCurrency, lang) + ' | Saved: ' + C.formatCurrency(r6.discount, currentCurrency, lang);
    } else if (toolId === 'word-counter') {
      var r7 = C.wordCount(getVal('in-text'));
      showResults();
      setVal('out-words', String(r7.words));
      setVal('out-chars', String(r7.chars));
      setVal('out-nospaces', String(r7.noSpaces));
      setVal('out-sentences', String(r7.sentences));
      setVal('out-paragraphs', String(r7.paragraphs));
      lastCopySummary = 'Words: ' + r7.words + ' | Characters: ' + r7.chars + ' | Sentences: ' + r7.sentences;
    } else if (toolId === 'character-counter') {
      var r8 = C.charCount(getVal('in-text'), getVal('in-limit'));
      showResults();
      setVal('out-chars', String(r8.chars));
      setVal('out-nospaces', String(r8.noSpaces));
      setVal('out-words', String(r8.words));
      setVal('out-remaining', String(r8.remaining));
      if (r8.exceeded && errorBox) {
        errorBox.textContent = lang === 'en'
          ? 'Character limit exceeded by ' + Math.abs(r8.remaining) + ' characters.'
          : 'Límite de caracteres superado por ' + Math.abs(r8.remaining) + ' caracteres.';
        errorBox.style.display = 'block';
      } else if (errorBox) {
        errorBox.style.display = 'none';
      }
      lastCopySummary = 'Characters: ' + r8.chars + ' | Remaining: ' + r8.remaining;
    } else if (toolId === 'bank-loan') {
      var r9 = C.bankLoan(getVal('in-principal'), getVal('in-rate'), getVal('in-duration'), getVal('in-unit'), getVal('in-fee'));
      if (!r9.ok) return showError(lang === 'en' ? r9.en : r9.es);
      showResults();
      setVal('out-emi', C.formatCurrency(r9.emi, currentCurrency, lang));
      setVal('out-principal', C.formatCurrency(r9.principal, currentCurrency, lang));
      setVal('out-interest', C.formatCurrency(r9.totalInterest, currentCurrency, lang));
      setVal('out-repay', C.formatCurrency(r9.totalRepay, currentCurrency, lang));
      setVal('out-fee', C.formatCurrency(r9.fee, currentCurrency, lang));
      setVal('out-totalcost', C.formatCurrency(r9.totalCost, currentCurrency, lang));
      var tbody = document.getElementById('out-schedule-body');
      if (tbody) {
        var rowsHtml = '';
        for (var k = 0; k < r9.schedule.length; k++) {
          var row = r9.schedule[k];
          rowsHtml += '<tr><td>' + row.month + '</td><td class="mono">' + C.formatNumber(row.open, lang, 2) + '</td><td class="mono">' + C.formatNumber(row.pay, lang, 2) + '</td><td class="mono">' + C.formatNumber(row.prin, lang, 2) + '</td><td class="mono">' + C.formatNumber(row.int, lang, 2) + '</td><td class="mono">' + C.formatNumber(row.rem, lang, 2) + '</td></tr>';
        }
        tbody.innerHTML = rowsHtml;
      }
      lastCopySummary = 'EMI: ' + C.formatCurrency(r9.emi, currentCurrency, lang) + ' | Total Repayment: ' + C.formatCurrency(r9.totalRepay, currentCurrency, lang);
    } else if (toolId === 'salary') {
      var r10 = C.salary(getVal('in-amount'), getVal('in-freq'), getVal('in-hday'), getVal('in-dweek'), getVal('in-bonus'), getVal('in-ded'));
      if (!r10.ok) return showError(lang === 'en' ? r10.en : r10.es);
      showResults();
      setVal('out-gross-annual', C.formatCurrency(r10.grossAnnual, currentCurrency, lang));
      setVal('out-gross-monthly', C.formatCurrency(r10.grossMonthly, currentCurrency, lang));
      setVal('out-gross-weekly', C.formatCurrency(r10.grossWeekly, currentCurrency, lang));
      setVal('out-gross-daily', C.formatCurrency(r10.grossDaily, currentCurrency, lang));
      setVal('out-gross-hourly', C.formatCurrency(r10.grossHourly, currentCurrency, lang));
      setVal('out-net-annual', C.formatCurrency(r10.netAnnual, currentCurrency, lang));
      setVal('out-net-monthly', C.formatCurrency(r10.netMonthly, currentCurrency, lang));
      setVal('out-net-hourly', C.formatCurrency(r10.netHourly, currentCurrency, lang));
      lastCopySummary = 'Gross Annual: ' + C.formatCurrency(r10.grossAnnual, currentCurrency, lang) + ' | Net Annual: ' + C.formatCurrency(r10.netAnnual, currentCurrency, lang);
    }
  }

  var inputs = calcRoot.querySelectorAll('input, select, textarea');
  for (var m = 0; m < inputs.length; m++) {
    inputs[m].addEventListener('input', runCalculation);
    inputs[m].addEventListener('change', runCalculation);
  }

  var calcBtn = document.getElementById('hf-btn-calc');
  if (calcBtn) calcBtn.addEventListener('click', runCalculation);

  var resetBtn = document.getElementById('hf-btn-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      for (var x = 0; x < inputs.length; x++) {
        if (inputs[x].id !== 'hf-currency-select' && inputs[x].tagName !== 'SELECT') {
          inputs[x].value = '';
        }
      }
      runCalculation();
    });
  }

  var copyBtn = document.getElementById('hf-btn-copy');
  var copyToast = document.getElementById('hf-copy-toast');
  var copyToastTimer = null;
  if (copyBtn) {
    var origCopyLabel = copyBtn.textContent;
    copyBtn.addEventListener('click', function () {
      if (!lastCopySummary) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastCopySummary).catch(function () {});
      }
      copyBtn.textContent = lang === 'en' ? 'Copied to clipboard' : '¡Copiado al portapapeles!';
      if (copyToast) {
        copyToast.classList.add('visible');
      }
      if (copyToastTimer) clearTimeout(copyToastTimer);
      copyToastTimer = setTimeout(function () {
        copyBtn.textContent = origCopyLabel;
        if (copyToast) {
          copyToast.classList.remove('visible');
        }
      }, 2600);
    });
  }

  runCalculation();
});
`;

/* ============================================================================
 * 5. HTML LAYOUT & PAGE TEMPLATES
 * ========================================================================== */
function renderStaticLayout(opts: {
  lang: Language;
  title: string;
  description: string;
  esPath: string;
  enPath: string;
  schemaJson: string;
  bodyHtml: string;
}): string {
  const { lang, title, description, esPath, enPath, schemaJson, bodyHtml } = opts;
  const s = SITE_CONTENT[lang];
  const canonical = `${SITE_CONFIG.domain}${lang === 'es' ? esPath : enPath}`;
  const esFull = `${SITE_CONFIG.domain}${esPath}`;
  const enFull = `${SITE_CONFIG.domain}${enPath}`;
  const homeUrl = lang === 'es' ? '/es/index.html' : '/en/index.html';
  const toolsUrl = lang === 'es' ? '/es/herramientas/index.html' : '/en/tools/index.html';
  const aboutUrl = lang === 'es' ? '/es/sobre-nosotros.html' : '/en/about.html';
  const contactUrl = lang === 'es' ? '/es/contacto.html' : '/en/contact.html';
  const privacyUrl = lang === 'es' ? '/es/politica-privacidad.html' : '/en/privacy-policy.html';
  const termsUrl = lang === 'es' ? '/es/terminos-condiciones.html' : '/en/terms-and-conditions.html';
  const disclaimerUrl = lang === 'es' ? '/es/aviso-legal.html' : '/en/legal-disclaimer.html';

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="application-name" content="${SITE_CONFIG.siteName}" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="es" href="${esFull}" />
  <link rel="alternate" hreflang="en" href="${enFull}" />
  <link rel="alternate" hreflang="x-default" href="${esFull}" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_CONFIG.siteName}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/styles.css" />
  <script type="application/ld+json">${schemaJson}</script>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a href="${homeUrl}" class="brand-logo">${SITE_CONFIG.siteName}</a>
      <nav class="main-nav" aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">
        <a href="${homeUrl}">${escapeHtml(s.nav.home)}</a>
        <a href="${toolsUrl}">${escapeHtml(s.nav.allTools)}</a>
        <a href="${homeUrl}#categories">${escapeHtml(s.nav.categories)}</a>
        <a href="${aboutUrl}">${escapeHtml(s.nav.about)}</a>
        <a href="${contactUrl}">${escapeHtml(s.nav.contact)}</a>
      </nav>
      <div class="header-actions">
        <div class="lang-switcher desktop-lang" role="group" aria-label="${lang === 'es' ? 'Selector de idioma' : 'Language selector'}">
          <a href="${esPath}" data-set-lang="es" class="lang-link ${lang === 'es' ? 'active' : ''}">ES · Español</a>
          <a href="${enPath}" data-set-lang="en" class="lang-link ${lang === 'en' ? 'active' : ''}">EN · English</a>
        </div>
        <button type="button" id="mobile-menu-toggle" class="mobile-menu-btn" aria-expanded="false">
          ${lang === 'es' ? 'Menú' : 'Menu'}
        </button>
      </div>
      <div class="mobile-lang-row">
        <span class="mobile-lang-label">${lang === 'es' ? 'Idioma' : 'Language'}</span>
        <div class="lang-switcher" role="group" aria-label="${lang === 'es' ? 'Selector de idioma' : 'Language selector'}">
          <a href="${esPath}" data-set-lang="es" class="lang-link ${lang === 'es' ? 'active' : ''}">ES · Español</a>
          <a href="${enPath}" data-set-lang="en" class="lang-link ${lang === 'en' ? 'active' : ''}">EN · English</a>
        </div>
      </div>
    </div>
    <nav id="mobile-nav-drawer" class="mobile-nav" aria-label="${lang === 'es' ? 'Menú móvil' : 'Mobile menu'}">
      <a href="${homeUrl}">${escapeHtml(s.nav.home)}</a>
      <a href="${toolsUrl}">${escapeHtml(s.nav.allTools)}</a>
      <a href="${homeUrl}#categories">${escapeHtml(s.nav.categories)}</a>
      <a href="${aboutUrl}">${escapeHtml(s.nav.about)}</a>
      <a href="${contactUrl}">${escapeHtml(s.nav.contact)}</a>
    </nav>
  </header>

  <main>
    ${bodyHtml}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <strong class="brand-logo">${SITE_CONFIG.siteName}</strong>
          <p style="margin-top:0.5rem;font-weight:600;color:var(--accent);">${escapeHtml(s.tagline)}</p>
          <p>${escapeHtml(s.footer.description)}</p>
          <p style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(s.footer.noRegistrationNote)}</p>
        </div>
        <div>
          <h2 style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(s.footer.toolsColumn)}</h2>
          <ul class="footer-links footer-links-2col">
            ${TOOL_LIST.map((t) => `<li><a href="${t[lang].url}">${escapeHtml(t[lang].name)}</a></li>`).join('\n            ')}
          </ul>
        </div>
        <div>
          <h2 style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(s.footer.legalColumn)}</h2>
          <ul class="footer-links">
            <li><a href="${aboutUrl}">${escapeHtml(s.footer.aboutLink)}</a></li>
            <li><a href="${contactUrl}">${escapeHtml(s.footer.contactLink)}</a></li>
            <li><a href="${privacyUrl}">${escapeHtml(s.footer.privacyLink)}</a></li>
            <li><a href="${termsUrl}">${escapeHtml(s.footer.termsLink)}</a></li>
            <li><a href="${disclaimerUrl}">${escapeHtml(s.footer.disclaimerLink)}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${escapeHtml(s.footer.copyright)}</span>
        <span>${lang === 'es' ? 'Contacto:' : 'Contact:'} <strong class="mono">${SITE_CONFIG.contactEmail}</strong></span>
      </div>
    </div>
  </footer>

  <script src="/js/language.js"></script>
  <script src="/js/calculators.js"></script>
  <script src="/js/app.js"></script>
</body>
</html>`;
}

function renderToolCalculatorHtml(toolId: ToolId, lang: Language): string {
  const s = SITE_CONTENT[lang];
  const currencyOptions = CURRENCIES.map(
    (c) => `<option value="${c.code}">${escapeHtml(lang === 'es' ? c.nameEs : c.nameEn)}</option>`
  ).join('');

  const currencyHeader = TOOLS_DATA[toolId].hasCurrency
    ? `<div class="currency-bar">
        <div>
          <label for="hf-currency-select" style="font-weight:600;font-size:0.8125rem;display:block;">${escapeHtml(s.calculatorUI.currencyLabel)}</label>
          <span style="font-size:0.75rem;color:var(--text-muted);">${escapeHtml(s.calculatorUI.currencyNote)}</span>
        </div>
        <select id="hf-currency-select" class="form-control" style="max-width:16rem;">
          ${currencyOptions}
        </select>
      </div>`
    : '';

  const actionRow = `<div class="calc-actions">
      <div class="btn-group">
        <button type="button" id="hf-btn-calc" class="btn btn-primary">${escapeHtml(s.calculatorUI.calculateBtn)}</button>
        <button type="button" id="hf-btn-reset" class="btn btn-secondary">${escapeHtml(s.calculatorUI.resetBtn)}</button>
      </div>
      <button type="button" id="hf-btn-copy" class="btn btn-subtle">${escapeHtml(s.calculatorUI.copyResultsBtn)}</button>
    </div>
    <div id="hf-copy-toast" class="copy-toast" role="status" aria-live="polite">
      <span>&#10003; ${lang === 'es' ? 'Copiado al portapapeles (Copied to clipboard)' : 'Copied to clipboard'}</span>
    </div>`;

  if (toolId === 'profit-margin') {
    return `<div id="hf-calculator-root" data-tool-id="profit-margin" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label for="in-cost">${lang === 'es' ? 'Precio de coste' : 'Cost price'}</label>
          <input id="in-cost" type="number" step="any" min="0" value="60" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-selling">${lang === 'es' ? 'Precio de venta' : 'Selling price'}</label>
          <input id="in-selling" type="number" step="any" min="0" value="100" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Beneficio neto' : 'Profit amount'}</span><span id="out-profit" class="result-value">40,00 EUR (€)</span></div>
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Margen de beneficio (%)' : 'Profit margin (%)'}</span><span id="out-margin" class="result-value">40,00%</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Recargo / Markup (%)' : 'Markup (%)'}</span><span id="out-markup" class="result-value">66,67%</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'selling-price') {
    return `<div id="hf-calculator-root" data-tool-id="selling-price" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label for="in-cost">${lang === 'es' ? 'Coste del producto' : 'Product cost'}</label>
          <input id="in-cost" type="number" step="any" min="0" value="70" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-margin">${lang === 'es' ? 'Margen de beneficio deseado (%)' : 'Desired profit margin (%)'}</label>
          <input id="in-margin" type="number" step="any" min="0" max="99.99" value="30" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Precio de venta recomendado' : 'Recommended selling price'}</span><span id="out-selling" class="result-value">100,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Beneficio por unidad' : 'Profit amount'}</span><span id="out-profit" class="result-value">30,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Recargo / Markup (%)' : 'Markup (%)'}</span><span id="out-markup" class="result-value">42,86%</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'break-even') {
    return `<div id="hf-calculator-root" data-tool-id="break-even" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-3">
        <div class="form-group">
          <label for="in-fixed">${lang === 'es' ? 'Costes fijos' : 'Fixed costs'}</label>
          <input id="in-fixed" type="number" step="any" min="0" value="3000" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-variable">${lang === 'es' ? 'Coste variable por unidad' : 'Variable cost per unit'}</label>
          <input id="in-variable" type="number" step="any" min="0" value="15" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-selling">${lang === 'es' ? 'Precio de venta por unidad' : 'Selling price per unit'}</label>
          <input id="in-selling" type="number" step="any" min="0" value="40" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Unidades de equilibrio' : 'Break-even units'}</span><span id="out-units" class="result-value">120</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Ingresos de equilibrio' : 'Break-even revenue'}</span><span id="out-revenue" class="result-value">4.800,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Margen de contribución unitario' : 'Contribution margin per unit'}</span><span id="out-cm" class="result-value">25,00 EUR (€)</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'hourly-cost') {
    return `<div id="hf-calculator-root" data-tool-id="hourly-cost" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-3">
        <div class="form-group">
          <label for="in-cost">${lang === 'es' ? 'Coste total' : 'Total cost'}</label>
          <input id="in-cost" type="number" step="any" min="0" value="2400" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-hours">${lang === 'es' ? 'Horas totales' : 'Total hours'}</label>
          <input id="in-hours" type="number" step="any" min="0.1" value="160" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-dayhours">${lang === 'es' ? 'Horas por día' : 'Hours per day'}</label>
          <input id="in-dayhours" type="number" step="any" min="0.5" max="24" value="8" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Coste por hora' : 'Cost per hour'}</span><span id="out-hourly" class="result-value">15,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Coste por día' : 'Cost per day'}</span><span id="out-daily" class="result-value">120,00 EUR (€)</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'commission') {
    return `<div id="hf-calculator-root" data-tool-id="commission" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label for="in-sales">${lang === 'es' ? 'Ventas totales' : 'Total sales'}</label>
          <input id="in-sales" type="number" step="any" min="0" value="5000" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-rate">${lang === 'es' ? 'Porcentaje de comisión (%)' : 'Commission percentage (%)'}</label>
          <input id="in-rate" type="number" step="any" min="0" value="6" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Importe de comisión' : 'Commission amount'}</span><span id="out-commission" class="result-value">300,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Total incluyendo comisión' : 'Total including commission'}</span><span id="out-total" class="result-value">5.300,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Neto descontando comisión' : 'Net after commission'}</span><span id="out-net" class="result-value">4.700,00 EUR (€)</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'discount') {
    return `<div id="hf-calculator-root" data-tool-id="discount" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-2">
        <div class="form-group">
          <label for="in-price">${lang === 'es' ? 'Precio original' : 'Original price'}</label>
          <input id="in-price" type="number" step="any" min="0" value="120" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-rate">${lang === 'es' ? 'Porcentaje de descuento (%)' : 'Discount percentage (%)'}</label>
          <input id="in-rate" type="number" step="any" min="0" max="100" value="25" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Precio final' : 'Final price'}</span><span id="out-final" class="result-value">90,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Importe descontado' : 'Discount amount'}</span><span id="out-discount" class="result-value">30,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Porcentaje ahorrado' : 'Percentage saved'}</span><span id="out-saved" class="result-value">25,00%</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'word-counter') {
    const sample =
      lang === 'es'
        ? 'CalculaFácil ofrece calculadoras gratuitas de negocios, finanzas y texto.'
        : 'CalculaFácil provides free everyday calculators for business, finance, and text.';
    return `<div id="hf-calculator-root" data-tool-id="word-counter" class="calc-panel">
      <div class="form-group">
        <label for="in-text">${lang === 'es' ? 'Escribe o pega tu texto aquí' : 'Type or paste your text below'}</label>
        <textarea id="in-text" rows="6" class="form-control">${escapeHtml(sample)}</textarea>
      </div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Palabras' : 'Words'}</span><span id="out-words" class="result-value">${lang === 'es' ? '9' : '10'}</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Caracteres (con espacios)' : 'Characters (with spaces)'}</span><span id="out-chars" class="result-value">${lang === 'es' ? '73' : '80'}</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Caracteres (sin espacios)' : 'Characters (no spaces)'}</span><span id="out-nospaces" class="result-value">${lang === 'es' ? '65' : '71'}</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Frases' : 'Sentences'}</span><span id="out-sentences" class="result-value">1</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Párrafos' : 'Paragraphs'}</span><span id="out-paragraphs" class="result-value">1</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'character-counter') {
    const sample =
      lang === 'es'
        ? 'Calcula fácil. Herramientas gratis para tu día a día.'
        : 'Calculate easily. Free tools for everyday life.';
    return `<div id="hf-calculator-root" data-tool-id="character-counter" class="calc-panel">
      <div class="form-group" style="max-width:16rem;margin-bottom:1rem;">
        <label for="in-limit">${lang === 'es' ? 'Límite de caracteres' : 'Character limit'}</label>
        <input id="in-limit" type="number" min="1" value="155" class="form-control" />
      </div>
      <div class="form-group">
        <label for="in-text">${lang === 'es' ? 'Tu texto' : 'Your text'}</label>
        <textarea id="in-text" rows="5" class="form-control">${escapeHtml(sample)}</textarea>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Caracteres totales' : 'Total characters'}</span><span id="out-chars" class="result-value">${lang === 'es' ? '53' : '47'}</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Sin espacios' : 'Excluding spaces'}</span><span id="out-nospaces" class="result-value">${lang === 'es' ? '45' : '41'}</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Palabras' : 'Words'}</span><span id="out-words" class="result-value">${lang === 'es' ? '9' : '7'}</span></div>
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Caracteres restantes' : 'Remaining characters'}</span><span id="out-remaining" class="result-value">${lang === 'es' ? '102' : '108'}</span></div>
        </div>
      </div>
      ${actionRow}
    </div>`;
  }

  if (toolId === 'bank-loan') {
    return `<div id="hf-calculator-root" data-tool-id="bank-loan" class="calc-panel">
      ${currencyHeader}
      <div class="form-grid form-grid-3">
        <div class="form-group">
          <label for="in-principal">${lang === 'es' ? 'Importe del préstamo' : 'Loan amount'}</label>
          <input id="in-principal" type="number" step="any" min="1" value="10000" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-rate">${lang === 'es' ? 'Interés anual (%)' : 'Annual interest rate (%)'}</label>
          <input id="in-rate" type="number" step="any" min="0" value="6" class="form-control" />
        </div>
        <div class="form-group">
          <label for="in-duration">${lang === 'es' ? 'Plazo' : 'Loan duration'}</label>
          <div style="display:flex;gap:0.5rem;">
            <input id="in-duration" type="number" step="1" min="1" value="3" class="form-control" />
            <select id="in-unit" class="form-control" style="max-width:7.5rem;">
              <option value="years">${lang === 'es' ? 'Años' : 'Years'}</option>
              <option value="months">${lang === 'es' ? 'Meses' : 'Months'}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="in-fee">${lang === 'es' ? 'Comisión de apertura (opcional)' : 'Processing fee (optional)'}</label>
          <input id="in-fee" type="number" step="any" min="0" value="100" class="form-control" />
        </div>
      </div>
      <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
      <div id="hf-calc-results" class="results-area">
        <div class="results-grid">
          <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Cuota mensual (EMI)' : 'Monthly installment (EMI)'}</span><span id="out-emi" class="result-value">304,22 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Importe original' : 'Original loan amount'}</span><span id="out-principal" class="result-value">10.000,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Total intereses' : 'Total interest payable'}</span><span id="out-interest" class="result-value">951,90 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Devolución total' : 'Total repayment'}</span><span id="out-repay" class="result-value">10.951,90 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Comisión apertura' : 'Processing fee'}</span><span id="out-fee" class="result-value">100,00 EUR (€)</span></div>
          <div class="result-box"><span class="result-label">${lang === 'es' ? 'Coste total estimado con comisión' : 'Total estimated cost with fee'}</span><span id="out-totalcost" class="result-value">11.051,90 EUR (€)</span></div>
        </div>
        <div class="notice-box">
          ${lang === 'es'
            ? 'Aviso: Este cálculo emplea el método de saldo decreciente y NO constituye una cotización bancaria oficial. Los pagos reales pueden variar por comisiones bancarias, seguros, impuestos y condiciones específicas de cada entidad.'
            : 'Notice: This calculation uses the reducing-balance EMI formula and is NOT an official bank quotation. Actual bank payments may differ due to bank fees, insurance, taxes, rate changes, and bank-specific terms.'}
        </div>
        <details style="margin-top:1rem;">
          <summary style="cursor:pointer;font-weight:600;font-size:0.9rem;color:var(--accent);">
            ${lang === 'es' ? 'Ver tabla de amortización mensual completa' : 'View full monthly amortization table'}
          </summary>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${lang === 'es' ? 'Mes' : 'Month'}</th>
                  <th>${lang === 'es' ? 'Saldo inicial' : 'Opening balance'}</th>
                  <th>${lang === 'es' ? 'Cuota mensual' : 'Monthly payment'}</th>
                  <th>${lang === 'es' ? 'Capital pagado' : 'Principal paid'}</th>
                  <th>${lang === 'es' ? 'Intereses' : 'Interest paid'}</th>
                  <th>${lang === 'es' ? 'Saldo pendiente' : 'Remaining balance'}</th>
                </tr>
              </thead>
              <tbody id="out-schedule-body"></tbody>
            </table>
          </div>
        </details>
      </div>
      ${actionRow}
    </div>`;
  }

  // Salary Calculator
  return `<div id="hf-calculator-root" data-tool-id="salary" class="calc-panel">
    ${currencyHeader}
    <div class="form-grid form-grid-3">
      <div class="form-group">
        <label for="in-amount">${lang === 'es' ? 'Importe del salario bruto' : 'Salary amount'}</label>
        <input id="in-amount" type="number" step="any" min="1" value="2500" class="form-control" />
      </div>
      <div class="form-group">
        <label for="in-freq">${lang === 'es' ? 'Frecuencia de pago' : 'Payment frequency'}</label>
        <select id="in-freq" class="form-control">
          <option value="hourly">${lang === 'es' ? 'Por hora' : 'Hourly'}</option>
          <option value="daily">${lang === 'es' ? 'Diario' : 'Daily'}</option>
          <option value="weekly">${lang === 'es' ? 'Semanal' : 'Weekly'}</option>
          <option value="biweekly">${lang === 'es' ? 'Quincenal / Bisemanal' : 'Biweekly'}</option>
          <option value="monthly" selected>${lang === 'es' ? 'Mensual' : 'Monthly'}</option>
          <option value="annual">${lang === 'es' ? 'Anual' : 'Annual'}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="in-hday">${lang === 'es' ? 'Horas de trabajo por día' : 'Working hours per day'}</label>
        <input id="in-hday" type="number" step="any" min="0.5" max="24" value="8" class="form-control" />
      </div>
      <div class="form-group">
        <label for="in-dweek">${lang === 'es' ? 'Días de trabajo por semana' : 'Working days per week'}</label>
        <input id="in-dweek" type="number" step="any" min="1" max="7" value="5" class="form-control" />
      </div>
      <div class="form-group">
        <label for="in-bonus">${lang === 'es' ? 'Ingresos extra / bonos (opcional)' : 'Additional income / bonuses (optional)'}</label>
        <input id="in-bonus" type="number" step="any" min="0" value="100" class="form-control" />
      </div>
      <div class="form-group">
        <label for="in-ded">${lang === 'es' ? 'Deducciones manuales (opcional)' : 'Manual deductions (optional)'}</label>
        <input id="in-ded" type="number" step="any" min="0" value="450" class="form-control" />
      </div>
    </div>
    <div id="hf-calc-error" class="error-box" style="display:none;" role="alert"></div>
    <div id="hf-calc-results" class="results-area">
      <div class="results-grid">
        <div class="result-box"><span class="result-label">${lang === 'es' ? 'Salario bruto anual' : 'Gross annual salary'}</span><span id="out-gross-annual" class="result-value">30.000,00 EUR (€)</span></div>
        <div class="result-box"><span class="result-label">${lang === 'es' ? 'Salario bruto mensual' : 'Gross monthly salary'}</span><span id="out-gross-monthly" class="result-value">2.500,00 EUR (€)</span></div>
        <div class="result-box"><span class="result-label">${lang === 'es' ? 'Salario bruto semanal' : 'Gross weekly salary'}</span><span id="out-gross-weekly" class="result-value">576,92 EUR (€)</span></div>
        <div class="result-box"><span class="result-label">${lang === 'es' ? 'Salario bruto diario' : 'Gross daily salary'}</span><span id="out-gross-daily" class="result-value">115,38 EUR (€)</span></div>
        <div class="result-box"><span class="result-label">${lang === 'es' ? 'Salario bruto por hora' : 'Gross hourly salary'}</span><span id="out-gross-hourly" class="result-value">14,42 EUR (€)</span></div>
        <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Salario neto anual estimado' : 'Estimated net annual salary'}</span><span id="out-net-annual" class="result-value">25.800,00 EUR (€)</span></div>
        <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Salario neto mensual estimado' : 'Estimated net monthly salary'}</span><span id="out-net-monthly" class="result-value">2.150,00 EUR (€)</span></div>
        <div class="result-box highlight"><span class="result-label">${lang === 'es' ? 'Salario neto por hora estimado' : 'Estimated net hourly salary'}</span><span id="out-net-hourly" class="result-value">12,40 EUR (€)</span></div>
      </div>
      <div class="notice-box">
        ${lang === 'es'
          ? 'Aviso sobre impuestos: Las deducciones se introducen de forma manual. El salario neto real depende de tu país, legislación fiscal, cotizaciones sociales y retenciones de tu empresa. Este cálculo no es un recibo de nómina oficial.'
          : 'Tax notice: Deductions are manually entered by the user. Actual take-home pay depends on country, tax laws, social contributions, benefits, and employer deductions. Estimated net salary is not an official payroll result.'}
      </div>
    </div>
    ${actionRow}
  </div>`;
}

function generateHomeHtml(lang: Language): string {
  const s = SITE_CONTENT[lang];
  const pair = ROUTE_PAIRS[0];
  const popular = TOOL_LIST.filter((t) => t.popular);

  const renderCard = (tId: ToolId) => {
    const tool = TOOLS_DATA[tId];
    const loc = tool[lang];
    const catName = s.categories[tool.category].name;
    return `<article class="card" data-tool-card="${tool.id}" data-tool-cat="${tool.category}">
      <div>
        <div class="card-meta">${escapeHtml(catName)}</div>
        <h3><a href="${loc.url}">${escapeHtml(loc.name)}</a></h3>
        <p>${escapeHtml(loc.shortDescription)}</p>
      </div>
      <div class="card-footer">
        <a href="${loc.url}">${escapeHtml(s.calculatorUI.openToolCta)} &rarr;</a>
      </div>
    </article>`;
  };

  const kickerItems = s.home.kicker
    .split('·')
    .map((part, idx, arr) => `<span class="kicker-item">${escapeHtml(part.trim())}${idx < arr.length - 1 ? ' · ' : ''}</span>`)
    .join('');

  const h1Html =
    lang === 'es'
      ? '<span class="heading-clause">Calcula&nbsp;fácil.</span> <span class="heading-clause">Herramientas gratis para tu día a&nbsp;día.</span>'
      : '<span class="heading-clause">Calculate&nbsp;easily.</span> <span class="heading-clause">Free tools for everyday&nbsp;life.</span>';

  const body = `
    <section class="hero">
      <div class="container">
        <p class="hero-kicker">${kickerItems}</p>
        <h1>${h1Html}</h1>
        <p class="hero-subtitle">${escapeHtml(s.home.subtitle)}</p>
        <div class="search-box">
          <label for="static-tool-search" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">${escapeHtml(s.home.searchLabel)}</label>
          <input id="static-tool-search" type="search" class="search-input" placeholder="${escapeHtml(s.home.searchPlaceholder)}" />
        </div>
        <nav class="hero-tools-nav" aria-label="${lang === 'es' ? 'Navegación rápida de las 10 herramientas' : 'Quick navigation for all 10 tools'}">
          <p class="hero-tools-label">${lang === 'es' ? 'Acceso directo a las 10 calculadoras:' : 'Quick access to all 10 calculators:'}</p>
          <div class="hero-tools-tray">
            ${TOOL_LIST.map((tool) => `<a href="${tool[lang].url}" class="hero-tool-btn">${escapeHtml(tool[lang].name)}</a>`).join('\n            ')}
          </div>
        </nav>
      </div>
    </section>

    <div class="container">
      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.home.popularTitle)}</h2>
          <p>${escapeHtml(s.home.popularSubtitle)}</p>
        </div>
        <div class="grid-3">
          ${popular.map((t) => renderCard(t.id)).join('\n          ')}
        </div>
      </section>

      <section id="categories" class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.home.categoriesTitle)}</h2>
          <p>${escapeHtml(s.home.categoriesSubtitle)}</p>
        </div>
        <div class="grid-3">
          ${(['business', 'finance', 'text'] as const)
            .map((c) => {
              const cat = s.categories[c];
              return `<div class="card"><div><h3>${escapeHtml(cat.name)}</h3><p>${escapeHtml(cat.description)}</p></div></div>`;
            })
            .join('\n          ')}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.home.allToolsTitle)}</h2>
          <p>${escapeHtml(s.home.allToolsSubtitle)}</p>
        </div>
        <div class="filter-bar">
          <button type="button" class="filter-btn active" data-filter-cat="all">${escapeHtml(s.home.filterAll)}</button>
          <button type="button" class="filter-btn" data-filter-cat="business">${escapeHtml(s.categories.business.name)}</button>
          <button type="button" class="filter-btn" data-filter-cat="finance">${escapeHtml(s.categories.finance.name)}</button>
          <button type="button" class="filter-btn" data-filter-cat="text">${escapeHtml(s.categories.text.name)}</button>
        </div>
        <div class="grid-3">
          ${TOOL_LIST.map((t) => renderCard(t.id)).join('\n          ')}
        </div>
      </section>

      <aside class="ad-placeholder" aria-label="${escapeHtml(s.calculatorUI.adPlaceholderLabel)}">
        <strong>${escapeHtml(s.calculatorUI.adPlaceholderLabel)}</strong>
        <div>${escapeHtml(s.calculatorUI.adPlaceholderNote)}</div>
      </aside>

      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.home.howItWorksTitle)}</h2>
          <p>${escapeHtml(s.home.howItWorksSubtitle)}</p>
        </div>
        <div class="grid-3">
          ${s.home.howItWorksSteps
            .map(
              (st) =>
                `<div class="card"><div><h3>${escapeHtml(st.title)}</h3><p>${escapeHtml(st.description)}</p></div></div>`
            )
            .join('\n          ')}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.home.faqTitle)}</h2>
          <p>${escapeHtml(s.home.faqSubtitle)}</p>
        </div>
        <div class="grid-2">
          ${s.home.faqs
            .map(
              (f) =>
                `<div class="card"><div><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></div></div>`
            )
            .join('\n          ')}
        </div>
      </section>
    </div>
  `;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.siteName,
    url: `${SITE_CONFIG.domain}${lang === 'es' ? pair.esPath : pair.enPath}`,
    inLanguage: lang,
    description: s.home.metaDescription,
  });

  return renderStaticLayout({
    lang,
    title: s.home.seoTitle,
    description: s.home.metaDescription,
    esPath: pair.esPath,
    enPath: pair.enPath,
    schemaJson: schema,
    bodyHtml: body,
  });
}

function generateAllToolsDirectoryHtml(lang: Language): string {
  const s = SITE_CONTENT[lang];
  const pair = ROUTE_PAIRS[1];
  const homeUrl = lang === 'es' ? '/es/index.html' : '/en/index.html';

  const body = `
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${homeUrl}">${escapeHtml(s.nav.home)}</a> / <span>${escapeHtml(s.nav.allTools)}</span>
      </nav>
      <section class="section" style="padding-top:0.5rem;">
        <div class="section-header">
          <h1>${escapeHtml(s.allToolsPage.h1)}</h1>
          <p>${escapeHtml(s.allToolsPage.subtitle)}</p>
        </div>
        <div style="margin-bottom:1.5rem;max-width:28rem;">
          <input id="static-tool-search" type="search" class="search-input" placeholder="${escapeHtml(s.home.searchPlaceholder)}" />
        </div>
        <div class="filter-bar">
          <button type="button" class="filter-btn active" data-filter-cat="all">${escapeHtml(s.home.filterAll)}</button>
          <button type="button" class="filter-btn" data-filter-cat="business">${escapeHtml(s.categories.business.name)}</button>
          <button type="button" class="filter-btn" data-filter-cat="finance">${escapeHtml(s.categories.finance.name)}</button>
          <button type="button" class="filter-btn" data-filter-cat="text">${escapeHtml(s.categories.text.name)}</button>
        </div>
        <div class="grid-3">
          ${TOOL_LIST.map((tool) => {
            const loc = tool[lang];
            return `<article class="card" data-tool-card="${tool.id}" data-tool-cat="${tool.category}">
              <div>
                <div class="card-meta">${escapeHtml(s.categories[tool.category].name)}</div>
                <h2><a href="${loc.url}" style="font-size:1.15rem;color:var(--text-primary);">${escapeHtml(loc.name)}</a></h2>
                <p>${escapeHtml(loc.shortDescription)}</p>
              </div>
              <div class="card-footer">
                <a href="${loc.url}">${escapeHtml(s.calculatorUI.openToolCta)} &rarr;</a>
              </div>
            </article>`;
          }).join('\n          ')}
        </div>
      </section>
    </div>
  `;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: s.allToolsPage.seoTitle,
    url: `${SITE_CONFIG.domain}${lang === 'es' ? pair.esPath : pair.enPath}`,
    inLanguage: lang,
    description: s.allToolsPage.metaDescription,
  });

  return renderStaticLayout({
    lang,
    title: s.allToolsPage.seoTitle,
    description: s.allToolsPage.metaDescription,
    esPath: pair.esPath,
    enPath: pair.enPath,
    schemaJson: schema,
    bodyHtml: body,
  });
}

function generateToolPageHtml(toolId: ToolId, lang: Language): string {
  const s = SITE_CONTENT[lang];
  const tool = TOOLS_DATA[toolId];
  const loc = tool[lang];
  const homeUrl = lang === 'es' ? '/es/index.html' : '/en/index.html';
  const toolsUrl = lang === 'es' ? '/es/herramientas/index.html' : '/en/tools/index.html';

  const body = `
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${homeUrl}">${escapeHtml(s.nav.home)}</a> /
        <a href="${toolsUrl}">${escapeHtml(s.nav.allTools)}</a> /
        <span>${escapeHtml(loc.name)}</span>
      </nav>

      <header style="margin-bottom:1.5rem;">
        <div class="card-meta">${escapeHtml(s.categories[tool.category].name)}</div>
        <h1>${escapeHtml(loc.h1)}</h1>
        <p style="color:var(--text-secondary);max-width:48rem;">${escapeHtml(loc.introParagraph)}</p>
      </header>

      ${renderToolCalculatorHtml(toolId, lang)}

      <div class="grid-2" style="margin-bottom:2rem;">
        <section class="card">
          <div>
            <h2>${escapeHtml(loc.instructionsTitle)}</h2>
            <ol style="padding-left:1.25rem;color:var(--text-secondary);font-size:0.9375rem;">
              ${loc.instructions.map((st) => `<li style="margin-bottom:0.5rem;">${escapeHtml(st)}</li>`).join('')}
            </ol>
            <h3 style="margin-top:1.25rem;">${escapeHtml(loc.exampleTitle)}</h3>
            <p>${escapeHtml(loc.exampleText)}</p>
          </div>
        </section>

        <section class="card">
          <div>
            <h2>${escapeHtml(loc.formulaTitle)}</h2>
            <div class="formula-box">
              ${loc.formulaBlock.map((f) => `<div>${escapeHtml(f)}</div>`).join('')}
            </div>
            <p>${escapeHtml(loc.formulaExplanation)}</p>
          </div>
        </section>
      </div>

      <aside class="ad-placeholder" aria-label="${escapeHtml(s.calculatorUI.adPlaceholderLabel)}">
        <strong>${escapeHtml(s.calculatorUI.adPlaceholderLabel)}</strong>
        <div>${escapeHtml(s.calculatorUI.adPlaceholderNote)}</div>
      </aside>

      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.calculatorUI.faqHeading)}</h2>
        </div>
        <div class="grid-2">
          ${loc.faqs
            .map(
              (f) =>
                `<div class="card"><div><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></div></div>`
            )
            .join('\n          ')}
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2>${escapeHtml(s.calculatorUI.relatedToolsHeading)}</h2>
        </div>
        <div class="grid-3">
          ${tool.relatedTools
            .map((relId) => {
              const rel = TOOLS_DATA[relId][lang];
              return `<article class="card">
                <div>
                  <h3><a href="${rel.url}">${escapeHtml(rel.name)}</a></h3>
                  <p>${escapeHtml(rel.shortDescription)}</p>
                </div>
                <div class="card-footer"><a href="${rel.url}">${escapeHtml(s.calculatorUI.openToolCta)} &rarr;</a></div>
              </article>`;
            })
            .join('\n          ')}
        </div>
      </section>
    </div>
  `;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: loc.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        url: `${SITE_CONFIG.domain}${loc.url}`,
        inLanguage: lang,
        description: loc.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: loc.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  });

  return renderStaticLayout({
    lang,
    title: loc.seoTitle,
    description: loc.metaDescription,
    esPath: tool.es.url,
    enPath: tool.en.url,
    schemaJson: schema,
    bodyHtml: body,
  });
}

function generateLegalPageHtml(
  pageKey: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer',
  lang: Language
): string {
  const s = SITE_CONTENT[lang];
  const page: LegalPageContent = s.legalPages[pageKey];
  const esUrl = SITE_CONTENT.es.legalPages[pageKey].url;
  const enUrl = SITE_CONTENT.en.legalPages[pageKey].url;
  const homeUrl = lang === 'es' ? '/es/index.html' : '/en/index.html';

  const body = `
    <div class="container" style="max-width:52rem;">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${homeUrl}">${escapeHtml(s.nav.home)}</a> / <span>${escapeHtml(page.h1)}</span>
      </nav>
      <article class="card" style="margin:1rem 0 3rem;padding:2rem;">
        <p class="card-meta">${lang === 'es' ? 'Última actualización:' : 'Last updated:'} ${escapeHtml(page.lastUpdated)}</p>
        <h1>${escapeHtml(page.h1)}</h1>
        <p style="font-size:1rem;">${escapeHtml(page.intro)}</p>
        ${page.sections
          .map(
            (sec) => `
          <section style="margin-top:1.5rem;">
            <h2 style="font-size:1.25rem;">${escapeHtml(sec.heading)}</h2>
            ${sec.paragraphs.map((p) => `<p style="font-size:0.95rem;">${escapeHtml(p)}</p>`).join('')}
          </section>`
          )
          .join('')}
      </article>
    </div>
  `;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.seoTitle,
    url: `${SITE_CONFIG.domain}${page.url}`,
    inLanguage: lang,
    description: page.metaDescription,
  });

  return renderStaticLayout({
    lang,
    title: page.seoTitle,
    description: page.metaDescription,
    esPath: esUrl,
    enPath: enUrl,
    schemaJson: schema,
    bodyHtml: body,
  });
}

/* ============================================================================
 * 6. ROBOTS.TXT & SITEMAP.XML
 * ========================================================================== */
const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: ${SITE_CONFIG.domain}/sitemap.xml
`;

function generateSitemapXml(): string {
  const entries = ROUTE_PAIRS.map((pair) => {
    const esLoc = `${SITE_CONFIG.domain}${pair.esPath}`;
    const enLoc = `${SITE_CONFIG.domain}${pair.enPath}`;
    return `  <url>
    <loc>${esLoc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esLoc}" />
    <changefreq>weekly</changefreq>
    <priority>${pair.pageType === 'home' ? '1.0' : pair.pageType === 'tool' ? '0.9' : '0.7'}</priority>
  </url>
  <url>
    <loc>${enLoc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esLoc}" />
    <changefreq>weekly</changefreq>
    <priority>${pair.pageType === 'home' ? '1.0' : pair.pageType === 'tool' ? '0.9' : '0.7'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

/* ============================================================================
 * EXECUTE GENERATION
 * ========================================================================== */
function main() {
  writeBoth('css/styles.css', STYLES_CSS);
  writeBoth('js/language.js', LANGUAGE_JS);
  writeBoth('js/calculators.js', CALCULATORS_JS);
  writeBoth('js/app.js', APP_JS);
  writeBoth('robots.txt', ROBOTS_TXT);
  writeBoth('sitemap.xml', generateSitemapXml());

  // Homepages
  writeBoth('es/index.html', generateHomeHtml('es'));
  writeBoth('en/index.html', generateHomeHtml('en'));

  // All Tools Directories
  writeBoth('es/herramientas/index.html', generateAllToolsDirectoryHtml('es'));
  writeBoth('en/tools/index.html', generateAllToolsDirectoryHtml('en'));

  // All 10 Tools in ES and EN
  for (const tool of TOOL_LIST) {
    writeBoth(tool.es.url.replace(/^\//, ''), generateToolPageHtml(tool.id, 'es'));
    writeBoth(tool.en.url.replace(/^\//, ''), generateToolPageHtml(tool.id, 'en'));
  }

  // Legal & Trust Pages in ES and EN
  const legalKeys: ('about' | 'contact' | 'privacy' | 'terms' | 'disclaimer')[] = [
    'about',
    'contact',
    'privacy',
    'terms',
    'disclaimer',
  ];
  for (const key of legalKeys) {
    const esRel = SITE_CONTENT.es.legalPages[key].url.replace(/^\//, '');
    const enRel = SITE_CONTENT.en.legalPages[key].url.replace(/^\//, '');
    writeBoth(esRel, generateLegalPageHtml(key, 'es'));
    writeBoth(enRel, generateLegalPageHtml(key, 'en'));
  }

  console.log('Successfully generated all 34 bilingual static HTML pages, CSS, JS, robots.txt, and sitemap.xml.');
}

main();
