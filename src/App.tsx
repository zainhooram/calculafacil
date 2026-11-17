/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  FileText,
  Globe,
  HelpCircle,
  Landmark,
  Menu,
  Search,
  ShieldCheck,
  TrendingUp,
  X,
} from 'lucide-react';
import { CalculatorWidget } from './components/CalculatorWidgets';
import {
  CategoryId,
  CurrencyCode,
  getInitialCurrency,
  Language,
  resolveRouteFromPath,
  ROUTE_PAIRS,
  RoutePair,
  safeSetStorage,
  SITE_CONFIG,
  ToolId,
} from './data/config';
import { LegalPageContent, SITE_CONTENT } from './data/siteContent';
import { TOOL_LIST, TOOLS_DATA } from './data/toolsContent';

export default function App() {
  const initialResolved = useMemo(
    () =>
      resolveRouteFromPath(
        typeof window !== 'undefined' ? window.location.pathname : '/'
      ),
    []
  );

  const [currentRoute, setCurrentRoute] = useState<RoutePair>(
    initialResolved.route
  );
  const [lang, setLang] = useState<Language>(initialResolved.lang);
  const [currency, setCurrency] = useState<CurrencyCode>(() =>
    getInitialCurrency()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(
    'all'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const strings = SITE_CONTENT[lang];

  // Navigate to a route pair in a given language
  const navigateTo = (
    routeId: string,
    targetLang: Language = lang,
    hash?: string
  ) => {
    const found =
      ROUTE_PAIRS.find((r) => r.id === routeId) || ROUTE_PAIRS[0];
    setCurrentRoute(found);
    setLang(targetLang);
    safeSetStorage(SITE_CONFIG.storageKeys.language, targetLang);
    setMobileMenuOpen(false);

    const newPath = targetLang === 'es' ? found.esPath : found.enPath;
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState(
          {},
          '',
          hash ? `${newPath}#${hash}` : newPath
        );
      } catch {
        // Ignore history errors in sandboxed iframes
      }
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Switch between Spanish and English preserving the exact equivalent page
  const handleLanguageChange = (newLang: Language) => {
    if (newLang === lang) return;
    navigateTo(currentRoute.id, newLang);
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    safeSetStorage(SITE_CONFIG.storageKeys.currency, newCurrency);
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const resolved = resolveRouteFromPath(window.location.pathname);
      setCurrentRoute(resolved.route);
      setLang(resolved.lang);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Dynamically synchronize <head> SEO tags, canonical, hreflang, and JSON-LD
  useEffect(() => {
    document.documentElement.lang = lang;

    let seoTitle = strings.home.seoTitle;
    let metaDescription = strings.home.metaDescription;
    const esUrl = `${SITE_CONFIG.domain}${currentRoute.esPath}`;
    const enUrl = `${SITE_CONFIG.domain}${currentRoute.enPath}`;
    const canonicalUrl = lang === 'es' ? esUrl : enUrl;

    let schemaObj: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.siteName,
      url: canonicalUrl,
      inLanguage: lang,
      description: metaDescription,
    };

    if (currentRoute.pageType === 'all-tools') {
      seoTitle = strings.allToolsPage.seoTitle;
      metaDescription = strings.allToolsPage.metaDescription;
    } else if (currentRoute.pageType === 'tool' && currentRoute.toolId) {
      const tool = TOOLS_DATA[currentRoute.toolId][lang];
      seoTitle = tool.seoTitle;
      metaDescription = tool.metaDescription;
      schemaObj = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            name: tool.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            url: canonicalUrl,
            inLanguage: lang,
            description: tool.metaDescription,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: currency,
            },
          },
          {
            '@type': 'FAQPage',
            mainEntity: tool.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          },
        ],
      };
    } else if (
      currentRoute.pageType === 'about' ||
      currentRoute.pageType === 'contact' ||
      currentRoute.pageType === 'privacy' ||
      currentRoute.pageType === 'terms' ||
      currentRoute.pageType === 'disclaimer'
    ) {
      const legalPage = strings.legalPages[currentRoute.pageType];
      seoTitle = legalPage.seoTitle;
      metaDescription = legalPage.metaDescription;
    }

    document.title = seoTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', metaDescription);
    setMeta('meta[property="og:site_name"]', 'content', SITE_CONFIG.siteName);
    setMeta('meta[property="og:title"]', 'content', seoTitle);
    setMeta('meta[property="og:description"]', 'content', metaDescription);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', seoTitle);
    setMeta('meta[name="twitter:description"]', 'content', metaDescription);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('link[rel="alternate"][hreflang="es"]', 'href', esUrl);
    setMeta('link[rel="alternate"][hreflang="en"]', 'href', enUrl);
    setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', esUrl);

    const schemaScript = document.getElementById('schema-jsonld');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schemaObj);
    }
  }, [currentRoute, lang, strings, currency]);

  // Filter tools by search query & category
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOOL_LIST.filter((tool) => {
      const matchesCat =
        selectedCategory === 'all' || tool.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const t = tool[lang];
      return (
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        tool.id.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, lang]);

  const popularTools = useMemo(
    () => TOOL_LIST.filter((t) => t.popular),
    []
  );

  const getCategoryIcon = (cat: CategoryId) => {
    if (cat === 'business')
      return <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />;
    if (cat === 'finance')
      return <Landmark className="w-4 h-4 text-blue-600 shrink-0" />;
    return <FileText className="w-4 h-4 text-blue-600 shrink-0" />;
  };

  // Optional AdSense-ready placeholder container (well separated from calculator inputs/buttons)
  const renderAdPlaceholder = (slotId: string) => (
    <aside
      aria-label={strings.calculatorUI.adPlaceholderLabel}
      data-ad-slot-placeholder={slotId}
      className="my-10 mx-auto max-w-4xl border border-dashed border-slate-300 rounded-lg bg-slate-100/70 px-4 py-5 text-center"
    >
      <p className="text-xs font-semibold text-slate-500">
        {strings.calculatorUI.adPlaceholderLabel}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {strings.calculatorUI.adPlaceholderNote}
      </p>
    </aside>
  );

  // Prevent single-word trailing orphans on headings and descriptions
  const preventOrphanWord = (text: string) =>
    text.replace(/\s+(\S+)\s*$/, '\u00A0$1');

  // Tool Card Component (Zero-pill metadata discipline: unboxed text with · separators)
  const renderToolCard = (toolId: ToolId) => {
    const tool = TOOLS_DATA[toolId];
    const t = tool[lang];
    const catName = strings.categories[tool.category].name;

    return (
      <article
        key={tool.id}
        className="group min-w-0 w-full bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-blue-600 transition-colors flex flex-col justify-between"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2.5">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              {getCategoryIcon(tool.category)}
              <span>{catName}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {tool.hasCurrency
                ? lang === 'es'
                  ? 'Multimoneda'
                  : 'Multi-currency'
                : lang === 'es'
                ? 'Tiempo real'
                : 'Live count'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug break-words">
            <a
              href={t.url}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(tool.id, lang);
              }}
              className="focus:outline-none focus-visible:underline"
            >
              {t.name}
            </a>
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words">
            {preventOrphanWord(t.shortDescription)}
          </p>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <a
            href={t.url}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(tool.id, lang);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            <span>{strings.calculatorUI.openToolCta}</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </article>
    );
  };

  /* ==========================================================================
   * PAGE RENDERERS
   * ======================================================================== */
  const renderHomePage = () => {
    const kickerParts = strings.home.kicker
      .split('·')
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <div>
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-10 sm:py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-slate-500 mb-3.5">
              {kickerParts.map((part, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                  )}
                  <span className="whitespace-nowrap">{part}</span>
                </React.Fragment>
              ))}
            </div>

            <h1 className="hero-heading-balance font-bold tracking-tight text-slate-900 max-w-2xl mx-auto">
              {lang === 'es' ? (
                <>
                  <span className="inline-block">Calcula&nbsp;fácil.</span>{' '}
                  <span className="inline-block">
                    Herramientas gratis para tu día a&nbsp;día.
                  </span>
                </>
              ) : (
                <>
                  <span className="inline-block">Calculate&nbsp;easily.</span>{' '}
                  <span className="inline-block">
                    Free tools for everyday&nbsp;life.
                  </span>
                </>
              )}
            </h1>

            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty-wrap">
              {preventOrphanWord(strings.home.subtitle)}
            </p>

            {/* Search Bar */}
            <div className="mt-6 sm:mt-8 max-w-xl mx-auto">
              <label htmlFor="home-tool-search" className="sr-only">
                {strings.home.searchLabel}
              </label>
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 sm:left-4 pointer-events-none" />
                <input
                  id="home-tool-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  placeholder={strings.home.searchPlaceholder}
                  className="w-full h-11 sm:h-12 pl-10 sm:pl-12 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={strings.home.clearSearch}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Prominent All-10 Tools Quick Navigation Bar (styled like the ES / EN selector) */}
            <nav
              aria-label={
                lang === 'es'
                  ? 'Navegación rápida de las 10 herramientas'
                  : 'Quick navigation for all 10 tools'
              }
              className="mt-6 sm:mt-7 max-w-4xl mx-auto"
            >
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'es'
                  ? 'Acceso directo a las 10 calculadoras:'
                  : 'Quick access to all 10 calculators:'}
              </p>
              <div className="p-1.5 sm:p-2 bg-slate-100 border border-slate-200 rounded-xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {TOOL_LIST.map((tool) => {
                  const t = tool[lang];
                  return (
                    <a
                      key={tool.id}
                      href={t.url}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(tool.id, lang);
                      }}
                      className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-white text-slate-700 border border-slate-200/90 shadow-2xs hover:bg-blue-600 hover:text-white hover:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors text-center leading-snug max-w-full break-words"
                    >
                      {t.name}
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Popular Calculators Section (hidden while actively searching so user sees search results immediately) */}
        {!searchQuery && (
          <section aria-labelledby="popular-heading">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <h2
                  id="popular-heading"
                  className="text-2xl font-bold text-slate-900"
                >
                  {strings.home.popularTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {strings.home.popularSubtitle}
                </p>
              </div>
              <a
                href={
                  lang === 'es'
                    ? '/es/herramientas/index.html'
                    : '/en/tools/index.html'
                }
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('all-tools', lang);
                }}
                className="text-sm font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
              >
                <span>{strings.nav.allTools} (10)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularTools.map((tool) => renderToolCard(tool.id))}
            </div>
          </section>
        )}

        {/* Categories Overview */}
        <section id="categories-section" aria-labelledby="categories-heading">
          <div className="mb-6">
            <h2
              id="categories-heading"
              className="text-2xl font-bold text-slate-900"
            >
              {strings.home.categoriesTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {strings.home.categoriesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {(['business', 'finance', 'text'] as CategoryId[]).map((catId) => {
              const cat = strings.categories[catId];
              const count = TOOL_LIST.filter(
                (t) => t.category === catId
              ).length;
              const isSelected = selectedCategory === catId;
              return (
                <button
                  key={catId}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(isSelected ? 'all' : catId)
                  }
                  className={`text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-base font-bold text-slate-900">
                      {getCategoryIcon(catId)}
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-500">
                      {count} {lang === 'es' ? 'herramientas' : 'tools'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* All 10 Tools Section */}
        <section id="all-tools-section" aria-labelledby="all-tools-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2
                id="all-tools-heading"
                className="text-2xl font-bold text-slate-900"
              >
                {strings.home.allToolsTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {strings.home.allToolsSubtitle}
              </p>
            </div>

            {/* Interactive Segmented Category Filter */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {strings.home.filterAll}
              </button>
              {(['business', 'finance', 'text'] as CategoryId[]).map((cId) => (
                <button
                  key={cId}
                  type="button"
                  onClick={() => setSelectedCategory(cId)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cId
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {strings.categories[cId].name}
                </button>
              ))}
            </div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <p className="text-sm text-slate-600">
                {strings.home.searchNoResults}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 h-10 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 cursor-pointer"
              >
                {strings.home.clearSearch}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => renderToolCard(tool.id))}
            </div>
          )}
        </section>

        {renderAdPlaceholder('home-mid-banner')}

        {/* How to Use Section */}
        <section
          aria-labelledby="how-it-works-heading"
          className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
        >
          <div className="max-w-2xl mb-8">
            <h2
              id="how-it-works-heading"
              className="text-2xl font-bold text-slate-900"
            >
              {strings.home.howItWorksTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {strings.home.howItWorksSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strings.home.howItWorksSteps.map((step) => (
              <div key={step.title} className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Homepage FAQs */}
        <section aria-labelledby="home-faq-heading">
          <div className="mb-6">
            <h2
              id="home-faq-heading"
              className="text-2xl font-bold text-slate-900"
            >
              {strings.home.faqTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {strings.home.faqSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {strings.home.faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <h3 className="text-base font-bold text-slate-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    );
  };

  const renderAllToolsPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-4">
        <a
          href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home', lang);
          }}
          className="hover:text-slate-900"
        >
          {strings.nav.home}
        </a>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">
          {strings.nav.allTools}
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {strings.allToolsPage.h1}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
          {strings.allToolsPage.subtitle}
        </p>
      </div>

      {/* Search + Category Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={strings.home.searchPlaceholder}
            aria-label={strings.home.searchLabel}
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {strings.home.filterAll}
          </button>
          {(['business', 'finance', 'text'] as CategoryId[]).map((cId) => (
            <button
              key={cId}
              type="button"
              onClick={() => setSelectedCategory(cId)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cId
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {strings.categories[cId].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((t) => renderToolCard(t.id))}
      </div>

      {renderAdPlaceholder('directory-bottom-banner')}
    </div>
  );

  const renderToolPage = (toolId: ToolId) => {
    const toolDef = TOOLS_DATA[toolId];
    const t = toolDef[lang];
    const cat = strings.categories[toolDef.category];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4"
        >
          <a
            href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home', lang);
            }}
            className="hover:text-slate-900"
          >
            {strings.nav.home}
          </a>
          <span>/</span>
          <a
            href={
              lang === 'es'
                ? '/es/herramientas/index.html'
                : '/en/tools/index.html'
            }
            onClick={(e) => {
              e.preventDefault();
              navigateTo('all-tools', lang);
            }}
            className="hover:text-slate-900"
          >
            {strings.nav.allTools}
          </a>
          <span>/</span>
          <span className="text-slate-800 font-medium break-words">
            {t.name}
          </span>
        </nav>

        {/* Tool Header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              {getCategoryIcon(toolDef.category)}
              <span>{cat.name}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'es'
                ? 'Cálculo instantáneo en navegador'
                : 'Instant browser calculation'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight break-words">
            {t.h1}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {t.introParagraph}
          </p>
        </header>

        {/* Interactive Calculator Component */}
        <section aria-label={t.name} className="mb-10">
          <CalculatorWidget
            toolId={toolId}
            lang={lang}
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
          />
        </section>

        {/* Instructions, Formula & Example Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Instructions + Example */}
          <section className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {t.instructionsTitle}
              </h2>
              <ol className="space-y-2.5 text-sm text-slate-600 list-decimal list-inside leading-relaxed">
                {t.instructions.map((step, i) => (
                  <li key={i} className="break-words">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {t.exampleTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed break-words">
                {t.exampleText}
              </p>
            </div>
          </section>

          {/* Formula & Method */}
          <section className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {t.formulaTitle}
              </h2>
              <div className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm space-y-2 overflow-x-auto max-w-full">
                {t.formulaBlock.map((line, idx) => (
                  <div key={idx} className="break-words whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed break-words">
                {t.formulaExplanation}
              </p>
            </div>
          </section>
        </div>

        {/* Optional AdSense Container — placed safely away from calculator controls */}
        {renderAdPlaceholder(`tool-${toolId}-content-ad`)}

        {/* Tool FAQs */}
        <section aria-labelledby="tool-faq-heading" className="mb-12">
          <h2
            id="tool-faq-heading"
            className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>{strings.calculatorUI.faqHeading}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.faqs.map((faq) => (
              <div
                key={faq.question}
                className="min-w-0 bg-white border border-slate-200 rounded-xl p-5 sm:p-6"
              >
                <h3 className="text-base font-bold text-slate-900 break-words">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section aria-labelledby="related-tools-heading">
          <h2
            id="related-tools-heading"
            className="text-xl font-bold text-slate-900 mb-4"
          >
            {strings.calculatorUI.relatedToolsHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {toolDef.relatedTools.map((relId) => renderToolCard(relId))}
          </div>
        </section>
      </div>
    );
  };

  const renderLegalPage = (pageContent: LegalPageContent) => (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-4">
        <a
          href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('home', lang);
          }}
          className="hover:text-slate-900"
        >
          {strings.nav.home}
        </a>
        <span className="mx-2">/</span>
        <span className="text-slate-800 font-medium">{pageContent.h1}</span>
      </nav>

      <article className="bg-white border border-slate-200 rounded-xl p-5 sm:p-10">
        <header className="pb-6 border-b border-slate-200">
          <p className="text-xs text-slate-500 mb-2">
            {lang === 'es' ? 'Última actualización:' : 'Last updated:'}{' '}
            {pageContent.lastUpdated}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">
            {pageContent.h1}
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {pageContent.intro}
          </p>
        </header>

        <div className="mt-6 space-y-6">
          {pageContent.sections.map((sec) => (
            <section key={sec.heading} className="space-y-2.5">
              <h2 className="text-lg font-bold text-slate-900 break-words">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-600 leading-relaxed break-words"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Responsive Header: 1 row on >= 640px, 2 compact rows on < 640px so logo and language selector never overflow even at 320px */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6">
          {/* Primary Header Row */}
          <div className="h-13 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
            {/* Zone 1: Brand Logo & Name */}
            <a
              href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home', lang);
              }}
              className="text-base sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2"
            >
              <Calculator className="w-5 h-5 text-blue-600 shrink-0" />
              <span>{SITE_CONFIG.siteName}</span>
            </a>

            {/* Zone 2: Desktop Navigation Links */}
            <nav
              aria-label={
                lang === 'es' ? 'Navegación principal' : 'Main navigation'
              }
              className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600"
            >
              <a
                href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('home', lang);
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                  currentRoute.id === 'home'
                    ? 'text-blue-700 font-semibold'
                    : ''
                }`}
              >
                {strings.nav.home}
              </a>
              <a
                href={
                  lang === 'es'
                    ? '/es/herramientas/index.html'
                    : '/en/tools/index.html'
                }
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('all-tools', lang);
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                  currentRoute.id === 'all-tools' ||
                  currentRoute.pageType === 'tool'
                    ? 'text-blue-700 font-semibold'
                    : ''
                }`}
              >
                {strings.nav.allTools}
              </a>
              <a
                href="#categories-section"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('home', lang, 'categories-section');
                }}
                className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                {strings.nav.categories}
              </a>
              <a
                href={
                  lang === 'es' ? '/es/sobre-nosotros.html' : '/en/about.html'
                }
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('about', lang);
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                  currentRoute.id === 'about'
                    ? 'text-blue-700 font-semibold'
                    : ''
                }`}
              >
                {strings.nav.about}
              </a>
              <a
                href={lang === 'es' ? '/es/contacto.html' : '/en/contact.html'}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('contact', lang);
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                  currentRoute.id === 'contact'
                    ? 'text-blue-700 font-semibold'
                    : ''
                }`}
              >
                {strings.nav.contact}
              </a>
            </nav>

            {/* Zone 3: Language Selector (visible inline on >= 640px) + Mobile Menu Button */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                role="group"
                aria-label={
                  lang === 'es' ? 'Selector de idioma' : 'Language selector'
                }
                className="hidden sm:inline-flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => handleLanguageChange('es')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    lang === 'es'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  ES · Español
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    lang === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  EN · English
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={lang === 'es' ? 'Abrir menú' : 'Open menu'}
                className="md:hidden h-9 w-9 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Second Row (< 640px): Full-width accessible Spanish/English selector that never clips at 320px */}
          <div className="sm:hidden pb-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 inline-flex items-center gap-1 shrink-0">
              <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{lang === 'es' ? 'Idioma:' : 'Language:'}</span>
            </span>
            <div
              role="group"
              aria-label={
                lang === 'es' ? 'Selector de idioma móvil' : 'Mobile language selector'
              }
              className="grid grid-cols-2 gap-1 p-0.5 bg-slate-100 border border-slate-200 rounded-lg flex-1 max-w-56"
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('es')}
                className={`py-1 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center whitespace-nowrap ${
                  lang === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                ES · Español
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`py-1 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer text-center whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                EN · English
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label={lang === 'es' ? 'Menú móvil' : 'Mobile menu'}
            className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2"
          >
            <a
              href={lang === 'es' ? '/es/index.html' : '/en/index.html'}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home', lang);
              }}
              className="block py-2 text-sm font-semibold text-slate-800"
            >
              {strings.nav.home}
            </a>
            <a
              href={
                lang === 'es'
                  ? '/es/herramientas/index.html'
                  : '/en/tools/index.html'
              }
              onClick={(e) => {
                e.preventDefault();
                navigateTo('all-tools', lang);
              }}
              className="block py-2 text-sm font-semibold text-slate-800"
            >
              {strings.nav.allTools}
            </a>
            <a
              href="#categories-section"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home', lang, 'categories-section');
              }}
              className="block py-2 text-sm font-semibold text-slate-800"
            >
              {strings.nav.categories}
            </a>
            <a
              href={
                lang === 'es' ? '/es/sobre-nosotros.html' : '/en/about.html'
              }
              onClick={(e) => {
                e.preventDefault();
                navigateTo('about', lang);
              }}
              className="block py-2 text-sm font-semibold text-slate-800"
            >
              {strings.nav.about}
            </a>
            <a
              href={lang === 'es' ? '/es/contacto.html' : '/en/contact.html'}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact', lang);
              }}
              className="block py-2 text-sm font-semibold text-slate-800"
            >
              {strings.nav.contact}
            </a>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute.pageType === 'home' && renderHomePage()}
        {currentRoute.pageType === 'all-tools' && renderAllToolsPage()}
        {currentRoute.pageType === 'tool' &&
          currentRoute.toolId &&
          renderToolPage(currentRoute.toolId)}
        {currentRoute.pageType === 'about' &&
          renderLegalPage(strings.legalPages.about)}
        {currentRoute.pageType === 'contact' &&
          renderLegalPage(strings.legalPages.contact)}
        {currentRoute.pageType === 'privacy' &&
          renderLegalPage(strings.legalPages.privacy)}
        {currentRoute.pageType === 'terms' &&
          renderLegalPage(strings.legalPages.terms)}
        {currentRoute.pageType === 'disclaimer' &&
          renderLegalPage(strings.legalPages.disclaimer)}
      </main>

      {/* Trustworthy Bilingual Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand & Mission */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Calculator className="w-5 h-5 text-blue-600 shrink-0" />
                <span>{SITE_CONFIG.siteName}</span>
              </div>
              <p className="text-xs font-semibold text-blue-700">
                {strings.tagline}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {strings.footer.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{strings.footer.noRegistrationNote}</span>
              </div>
            </div>

            {/* All 10 Tools Links */}
            <div className="md:col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                {strings.footer.toolsColumn}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                {TOOL_LIST.map((tool) => (
                  <li key={tool.id}>
                    <a
                      href={tool[lang].url}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(tool.id, lang);
                      }}
                      className="hover:text-blue-700 transition-colors"
                    >
                      {tool[lang].name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust, Legal & Language Links */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  {strings.footer.legalColumn}
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>
                    <a
                      href={
                        lang === 'es'
                          ? '/es/sobre-nosotros.html'
                          : '/en/about.html'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('about', lang);
                      }}
                      className="hover:text-blue-700"
                    >
                      {strings.footer.aboutLink}
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        lang === 'es'
                          ? '/es/contacto.html'
                          : '/en/contact.html'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('contact', lang);
                      }}
                      className="hover:text-blue-700"
                    >
                      {strings.footer.contactLink}
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        lang === 'es'
                          ? '/es/politica-privacidad.html'
                          : '/en/privacy-policy.html'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('privacy', lang);
                      }}
                      className="hover:text-blue-700"
                    >
                      {strings.footer.privacyLink}
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        lang === 'es'
                          ? '/es/terminos-condiciones.html'
                          : '/en/terms-and-conditions.html'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('terms', lang);
                      }}
                      className="hover:text-blue-700"
                    >
                      {strings.footer.termsLink}
                    </a>
                  </li>
                  <li>
                    <a
                      href={
                        lang === 'es'
                          ? '/es/aviso-legal.html'
                          : '/en/legal-disclaimer.html'
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('disclaimer', lang);
                      }}
                      className="hover:text-blue-700"
                    >
                      {strings.footer.disclaimerLink}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>{strings.footer.languagesColumn}</span>
                </h2>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <a
                    href={currentRoute.esPath}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLanguageChange('es');
                    }}
                    className={
                      lang === 'es'
                        ? 'text-blue-700 font-bold underline'
                        : 'text-slate-600 hover:text-slate-900'
                    }
                  >
                    Español (/es/)
                  </a>
                  <span className="text-slate-300">·</span>
                  <a
                    href={currentRoute.enPath}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLanguageChange('en');
                    }}
                    className={
                      lang === 'en'
                        ? 'text-blue-700 font-bold underline'
                        : 'text-slate-600 hover:text-slate-900'
                    }
                  >
                    English (/en/)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>{strings.footer.copyright}</p>
            <p>
              {lang === 'es' ? 'Contacto:' : 'Contact:'}{' '}
              <span className="font-mono text-slate-700">
                {SITE_CONFIG.contactEmail}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
