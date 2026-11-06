export type Language = 'es' | 'en';

export type CurrencyCode = 'EUR' | 'USD' | 'MXN' | 'ARS' | 'COP' | 'CLP' | 'GBP' | 'PKR';

export type ToolId =
  | 'profit-margin'
  | 'selling-price'
  | 'break-even'
  | 'hourly-cost'
  | 'commission'
  | 'discount'
  | 'word-counter'
  | 'character-counter'
  | 'bank-loan'
  | 'salary';

export type CategoryId = 'business' | 'finance' | 'text';

export type PageType =
  | 'home'
  | 'all-tools'
  | 'tool'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

/**
 * CENTRAL CONFIGURATION
 * Update `domain` and `contactEmail` in this single file when connecting
 * your production domain and official contact mailbox.
 */
export const SITE_CONFIG = {
  siteName: 'CalculaFácil',
  // Configurable temporary domain placeholder — replace in one place when domain is purchased
  domain: 'https://calculafacil.example.com',
  // Configurable contact email placeholder — no invented address, phone, or company registration
  contactEmail: 'contacto@calculafacil.example.com',
  defaultLanguage: 'es' as Language,
  defaultCurrency: 'EUR' as CurrencyCode,
  storageKeys: {
    language: 'hf_preferred_lang',
    currency: 'hf_preferred_currency',
    adPlaceholders: 'hf_show_ad_slots',
  },
};

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  localeEs: string;
  localeEn: string;
  nameEs: string;
  nameEn: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  {
    code: 'EUR',
    symbol: '€',
    localeEs: 'es-ES',
    localeEn: 'en-IE',
    nameEs: 'Euro (EUR €)',
    nameEn: 'Euro (EUR €)',
  },
  {
    code: 'USD',
    symbol: '$',
    localeEs: 'es-US',
    localeEn: 'en-US',
    nameEs: 'Dólar estadounidense (USD $)',
    nameEn: 'US Dollar (USD $)',
  },
  {
    code: 'MXN',
    symbol: '$',
    localeEs: 'es-MX',
    localeEn: 'en-US',
    nameEs: 'Peso mexicano (MXN $)',
    nameEn: 'Mexican Peso (MXN $)',
  },
  {
    code: 'ARS',
    symbol: '$',
    localeEs: 'es-AR',
    localeEn: 'en-US',
    nameEs: 'Peso argentino (ARS $)',
    nameEn: 'Argentine Peso (ARS $)',
  },
  {
    code: 'COP',
    symbol: '$',
    localeEs: 'es-CO',
    localeEn: 'en-US',
    nameEs: 'Peso colombiano (COP $)',
    nameEn: 'Colombian Peso (COP $)',
  },
  {
    code: 'CLP',
    symbol: '$',
    localeEs: 'es-CL',
    localeEn: 'en-US',
    nameEs: 'Peso chileno (CLP $)',
    nameEn: 'Chilean Peso (CLP $)',
  },
  {
    code: 'GBP',
    symbol: '£',
    localeEs: 'es-ES',
    localeEn: 'en-GB',
    nameEs: 'Libra esterlina (GBP £)',
    nameEn: 'British Pound (GBP £)',
  },
  {
    code: 'PKR',
    symbol: 'Rs',
    localeEs: 'es-ES',
    localeEn: 'en-PK',
    nameEs: 'Rupia pakistaní (PKR Rs)',
    nameEn: 'Pakistani Rupee (PKR Rs)',
  },
];

export interface RoutePair {
  id: string;
  pageType: PageType;
  toolId?: ToolId;
  esPath: string;
  enPath: string;
}

export const ROUTE_PAIRS: RoutePair[] = [
  {
    id: 'home',
    pageType: 'home',
    esPath: '/es/index.html',
    enPath: '/en/index.html',
  },
  {
    id: 'all-tools',
    pageType: 'all-tools',
    esPath: '/es/herramientas/index.html',
    enPath: '/en/tools/index.html',
  },
  {
    id: 'profit-margin',
    pageType: 'tool',
    toolId: 'profit-margin',
    esPath: '/es/herramientas/calculadora-margen-beneficio.html',
    enPath: '/en/tools/profit-margin-calculator.html',
  },
  {
    id: 'selling-price',
    pageType: 'tool',
    toolId: 'selling-price',
    esPath: '/es/herramientas/calculadora-precio-venta.html',
    enPath: '/en/tools/selling-price-calculator.html',
  },
  {
    id: 'break-even',
    pageType: 'tool',
    toolId: 'break-even',
    esPath: '/es/herramientas/calculadora-punto-equilibrio.html',
    enPath: '/en/tools/break-even-calculator.html',
  },
  {
    id: 'hourly-cost',
    pageType: 'tool',
    toolId: 'hourly-cost',
    esPath: '/es/herramientas/calculadora-coste-por-hora.html',
    enPath: '/en/tools/hourly-cost-calculator.html',
  },
  {
    id: 'commission',
    pageType: 'tool',
    toolId: 'commission',
    esPath: '/es/herramientas/calculadora-comisiones.html',
    enPath: '/en/tools/commission-calculator.html',
  },
  {
    id: 'discount',
    pageType: 'tool',
    toolId: 'discount',
    esPath: '/es/herramientas/calculadora-descuentos.html',
    enPath: '/en/tools/discount-calculator.html',
  },
  {
    id: 'word-counter',
    pageType: 'tool',
    toolId: 'word-counter',
    esPath: '/es/herramientas/contador-de-palabras.html',
    enPath: '/en/tools/word-counter.html',
  },
  {
    id: 'character-counter',
    pageType: 'tool',
    toolId: 'character-counter',
    esPath: '/es/herramientas/contador-de-caracteres.html',
    enPath: '/en/tools/character-counter.html',
  },
  {
    id: 'bank-loan',
    pageType: 'tool',
    toolId: 'bank-loan',
    esPath: '/es/herramientas/calculadora-prestamos.html',
    enPath: '/en/tools/bank-loan-calculator.html',
  },
  {
    id: 'salary',
    pageType: 'tool',
    toolId: 'salary',
    esPath: '/es/herramientas/calculadora-salario.html',
    enPath: '/en/tools/salary-calculator.html',
  },
  {
    id: 'about',
    pageType: 'about',
    esPath: '/es/sobre-nosotros.html',
    enPath: '/en/about.html',
  },
  {
    id: 'contact',
    pageType: 'contact',
    esPath: '/es/contacto.html',
    enPath: '/en/contact.html',
  },
  {
    id: 'privacy',
    pageType: 'privacy',
    esPath: '/es/politica-privacidad.html',
    enPath: '/en/privacy-policy.html',
  },
  {
    id: 'terms',
    pageType: 'terms',
    esPath: '/es/terminos-condiciones.html',
    enPath: '/en/terms-and-conditions.html',
  },
  {
    id: 'disclaimer',
    pageType: 'disclaimer',
    esPath: '/es/aviso-legal.html',
    enPath: '/en/legal-disclaimer.html',
  },
];

/**
 * Safe localStorage access with fallback when storage is unavailable
 */
export function safeGetStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch {
    // Ignore storage security/quota errors
  }
  return null;
}

export function safeSetStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage security/quota errors
  }
}

export function getInitialLanguage(pathname: string): Language {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  if (pathname.startsWith('/es/') || pathname === '/es') {
    return 'es';
  }
  const saved = safeGetStorage(SITE_CONFIG.storageKeys.language);
  if (saved === 'en' || saved === 'es') {
    return saved;
  }
  return SITE_CONFIG.defaultLanguage;
}

export function getInitialCurrency(): CurrencyCode {
  const saved = safeGetStorage(SITE_CONFIG.storageKeys.currency);
  if (saved && CURRENCIES.some((c) => c.code === saved)) {
    return saved as CurrencyCode;
  }
  return SITE_CONFIG.defaultCurrency;
}

export function resolveRouteFromPath(pathname: string): {
  route: RoutePair;
  lang: Language;
} {
  const normalized = pathname.trim().replace(/\/+$/, '') || '/';

  if (normalized === '/' || normalized === '/index.html') {
    const lang = getInitialLanguage(normalized);
    return { route: ROUTE_PAIRS[0], lang };
  }
  if (normalized === '/es' || normalized === '/es/index.html') {
    return { route: ROUTE_PAIRS[0], lang: 'es' };
  }
  if (normalized === '/en' || normalized === '/en/index.html') {
    return { route: ROUTE_PAIRS[0], lang: 'en' };
  }
  if (normalized === '/es/herramientas' || normalized === '/es/herramientas/index.html') {
    return { route: ROUTE_PAIRS[1], lang: 'es' };
  }
  if (normalized === '/en/tools' || normalized === '/en/tools/index.html') {
    return { route: ROUTE_PAIRS[1], lang: 'en' };
  }

  for (const pair of ROUTE_PAIRS) {
    const esWithoutHtml = pair.esPath.replace(/\.html$/, '');
    const enWithoutHtml = pair.enPath.replace(/\.html$/, '');
    if (normalized === pair.esPath || normalized === esWithoutHtml) {
      return { route: pair, lang: 'es' };
    }
    if (normalized === pair.enPath || normalized === enWithoutHtml) {
      return { route: pair, lang: 'en' };
    }
  }

  // Fallback to home in detected language
  const fallbackLang: Language = normalized.startsWith('/en') ? 'en' : 'es';
  return { route: ROUTE_PAIRS[0], lang: fallbackLang };
}
