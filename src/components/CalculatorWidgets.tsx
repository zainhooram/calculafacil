import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Info,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import {
  CURRENCIES,
  CurrencyCode,
  Language,
  ToolId,
} from '../data/config';
import { SITE_CONTENT } from '../data/siteContent';
import {
  analyzeCharacters,
  analyzeWords,
  calculateBreakEven,
  calculateCommission,
  calculateDiscount,
  calculateHourlyCost,
  calculateLoanEMI,
  calculateProfitMargin,
  calculateSalary,
  calculateSellingPrice,
  formatCurrency,
  formatNumber,
  formatPercent,
  SalaryFrequency,
} from '../utils/calculators';

interface CalculatorWidgetProps {
  toolId: ToolId;
  lang: Language;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

export const CalculatorWidget: React.FC<CalculatorWidgetProps> = ({
  toolId,
  lang,
  currency,
  onCurrencyChange,
}) => {
  const ui = SITE_CONTENT[lang].calculatorUI;
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyText = (text: string) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else {
      try {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      } catch {
        // Ignore fallback copy errors
      }
    }
    setCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      copyTimerRef.current = null;
    }, 2600);
  };

  /* ==========================================================================
   * TOOL 1: PROFIT MARGIN CALCULATOR
   * ======================================================================== */
  const [pmCost, setPmCost] = useState('60');
  const [pmSelling, setPmSelling] = useState('100');

  /* ==========================================================================
   * TOOL 2: SELLING PRICE CALCULATOR
   * ======================================================================== */
  const [spCost, setSpCost] = useState('70');
  const [spMargin, setSpMargin] = useState('30');

  /* ==========================================================================
   * TOOL 3: BREAK-EVEN CALCULATOR
   * ======================================================================== */
  const [beFixed, setBeFixed] = useState('3000');
  const [beVariable, setBeVariable] = useState('15');
  const [beSelling, setBeSelling] = useState('40');

  /* ==========================================================================
   * TOOL 4: HOURLY COST CALCULATOR
   * ======================================================================== */
  const [hcTotalCost, setHcTotalCost] = useState('2400');
  const [hcTotalHours, setHcTotalHours] = useState('160');
  const [hcHoursPerDay, setHcHoursPerDay] = useState('8');

  /* ==========================================================================
   * TOOL 5: COMMISSION CALCULATOR
   * ======================================================================== */
  const [cmSales, setCmSales] = useState('5000');
  const [cmRate, setCmRate] = useState('6');

  /* ==========================================================================
   * TOOL 6: DISCOUNT CALCULATOR
   * ======================================================================== */
  const [dcOriginal, setDcOriginal] = useState('120');
  const [dcRate, setDcRate] = useState('25');

  /* ==========================================================================
   * TOOL 7: WORD COUNTER
   * ======================================================================== */
  const defaultWordSampleEs =
    'CalculaFácil ofrece calculadoras gratuitas de negocios, finanzas y texto.\nCada herramienta funciona directamente en tu navegador con total privacidad y precisión matemática.';
  const defaultWordSampleEn =
    'CalculaFácil provides free everyday calculators for business, finance, and text.\nEvery tool runs directly inside your browser with full privacy and mathematical accuracy.';
  const [wcText, setWcText] = useState(
    lang === 'es' ? defaultWordSampleEs : defaultWordSampleEn
  );

  /* ==========================================================================
   * TOOL 8: CHARACTER COUNTER
   * ======================================================================== */
  const defaultCharSampleEs =
    'Calcula fácil. Herramientas gratis para tu día a día. Calcula márgenes, precios de venta, préstamos bancarios y salarios al instante.';
  const defaultCharSampleEn =
    'Calculate easily. Free tools for everyday life. Calculate profit margins, selling prices, bank loan payments, and salaries instantly.';
  const [ccText, setCcText] = useState(
    lang === 'es' ? defaultCharSampleEs : defaultCharSampleEn
  );
  const [ccLimit, setCcLimit] = useState('155');

  /* ==========================================================================
   * TOOL 9: BANK LOAN / EMI CALCULATOR
   * ======================================================================== */
  const [lnPrincipal, setLnPrincipal] = useState('10000');
  const [lnRate, setLnRate] = useState('6');
  const [lnDuration, setLnDuration] = useState('3');
  const [lnUnit, setLnUnit] = useState<'months' | 'years'>('years');
  const [lnFee, setLnFee] = useState('100');
  const [showSchedule, setShowSchedule] = useState(false);

  /* ==========================================================================
   * TOOL 10: SALARY CALCULATOR
   * ======================================================================== */
  const [slAmount, setSlAmount] = useState('2500');
  const [slFreq, setSlFreq] = useState<SalaryFrequency>('monthly');
  const [slHoursDay, setSlHoursDay] = useState('8');
  const [slDaysWeek, setSlDaysWeek] = useState('5');
  const [slBonus, setSlBonus] = useState('100');
  const [slDeductions, setSlDeductions] = useState('450');

  // Shared Currency Bar
  const renderCurrencySelector = () => (
    <div className="mb-6 pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="min-w-0">
        <label
          htmlFor="calc-currency-select"
          className="block text-xs font-semibold text-slate-700 mb-1"
        >
          {ui.currencyLabel}
        </label>
        <p className="text-xs text-slate-500 leading-relaxed">{ui.currencyNote}</p>
      </div>
      <select
        id="calc-currency-select"
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
        className="w-full sm:w-auto max-w-full min-w-0 h-11 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:shrink-0"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {lang === 'es' ? c.nameEs : c.nameEn}
          </option>
        ))}
      </select>
    </div>
  );

  // Error Banner
  const renderError = (errorEs?: string, errorEn?: string) => (
    <div
      role="alert"
      className="mt-5 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-900"
    >
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <p className="text-sm font-medium break-words">
        {lang === 'es' ? errorEs : errorEn}
      </p>
    </div>
  );

  // Action Buttons Row + Temporary Copied to Clipboard Notification Toast
  const renderActionButtons = (
    onReset: () => void,
    onExample: () => void,
    copyPayload: string
  ) => (
    <div className="mt-6 pt-5 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="h-11 px-3 sm:px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span className="truncate">{ui.resetBtn}</span>
          </button>
          <button
            type="button"
            onClick={onExample}
            className="h-11 px-3 sm:px-4 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">{ui.loadExampleBtn}</span>
          </button>
        </div>

        {copyPayload && (
          <button
            type="button"
            onClick={() => handleCopyText(copyPayload)}
            className="w-full sm:w-auto h-11 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>
                  {lang === 'es'
                    ? '¡Copiado al portapapeles!'
                    : 'Copied to clipboard'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>{ui.copyResultsBtn}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Temporary 'Copied to clipboard' notification toast */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          data-testid="copy-toast"
          className="fixed bottom-5 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center justify-between gap-3 transition-all"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 inline-flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {lang === 'es'
                  ? 'Copiado al portapapeles (Copied to clipboard)'
                  : 'Copied to clipboard'}
              </p>
              <p className="text-[11px] text-slate-300 truncate">
                {lang === 'es'
                  ? 'El resumen de resultados está listo para pegar.'
                  : 'Calculation results are ready to paste.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCopied(false)}
            aria-label={lang === 'es' ? 'Cerrar notificación' : 'Dismiss notification'}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  /* ==========================================================================
   * RENDER BY TOOL ID
   * ======================================================================== */
  if (toolId === 'profit-margin') {
    const res = calculateProfitMargin(pmCost, pmSelling);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Margen de Beneficio — Coste: ${formatCurrency(d.costPrice, currency, lang)} | Venta: ${formatCurrency(d.sellingPrice, currency, lang)} | Beneficio: ${formatCurrency(d.profit, currency, lang)} | Margen: ${formatPercent(d.profitMarginPercent, lang)} | Recargo (Markup): ${d.markupPercent !== null ? formatPercent(d.markupPercent, lang) : 'N/A'}`
        : `Profit Margin — Cost: ${formatCurrency(d.costPrice, currency, lang)} | Selling Price: ${formatCurrency(d.sellingPrice, currency, lang)} | Profit: ${formatCurrency(d.profit, currency, lang)} | Margin: ${formatPercent(d.profitMarginPercent, lang)} | Markup: ${d.markupPercent !== null ? formatPercent(d.markupPercent, lang) : 'N/A'}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="pm-cost"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Precio de coste' : 'Cost price'} ({currency})
            </label>
            <input
              id="pm-cost"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={pmCost}
              onChange={(e) => setPmCost(e.target.value)}
              placeholder="60.00"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="pm-selling"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Precio de venta' : 'Selling price'} ({currency})
            </label>
            <input
              id="pm-selling"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={pmSelling}
              onChange={(e) => setPmSelling(e.target.value)}
              placeholder="100.00"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es' ? 'Beneficio neto por unidad' : 'Profit amount'}
                </span>
                <span
                  className={`mt-1 block text-xl font-bold font-mono tabular-nums ${
                    d.profit < 0 ? 'text-red-700' : 'text-slate-900'
                  }`}
                >
                  {formatCurrency(d.profit, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es'
                    ? 'Porcentaje de margen (sobre venta)'
                    : 'Profit margin percentage'}
                </span>
                <span
                  className={`mt-1 block text-2xl font-bold font-mono tabular-nums ${
                    d.profitMarginPercent < 0 ? 'text-red-700' : 'text-blue-700'
                  }`}
                >
                  {formatPercent(d.profitMarginPercent, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Porcentaje de recargo / Markup (sobre coste)'
                    : 'Markup percentage (on cost)'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {d.markupPercent !== null
                    ? formatPercent(d.markupPercent, lang)
                    : lang === 'es'
                    ? 'N/A (Coste 0)'
                    : 'N/A (Zero cost)'}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setPmCost('');
            setPmSelling('');
          },
          () => {
            setPmCost('60');
            setPmSelling('100');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'selling-price') {
    const res = calculateSellingPrice(spCost, spMargin);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Precio de Venta — Coste: ${formatCurrency(d.costPrice, currency, lang)} | Margen deseado: ${formatPercent(d.desiredMarginPercent, lang)} | Precio de venta recomendado: ${formatCurrency(d.recommendedSellingPrice, currency, lang)} | Beneficio: ${formatCurrency(d.profitAmount, currency, lang)} | Recargo (Markup): ${formatPercent(d.markupPercent, lang)}`
        : `Selling Price — Cost: ${formatCurrency(d.costPrice, currency, lang)} | Target Margin: ${formatPercent(d.desiredMarginPercent, lang)} | Recommended Selling Price: ${formatCurrency(d.recommendedSellingPrice, currency, lang)} | Profit: ${formatCurrency(d.profitAmount, currency, lang)} | Markup: ${formatPercent(d.markupPercent, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="sp-cost"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Coste del producto' : 'Product cost'} ({currency})
            </label>
            <input
              id="sp-cost"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={spCost}
              onChange={(e) => setSpCost(e.target.value)}
              placeholder="70.00"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="sp-margin"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Margen de beneficio deseado (%)'
                : 'Desired profit margin (%)'}
            </label>
            <input
              id="sp-margin"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              max="99.99"
              value={spMargin}
              onChange={(e) => setSpMargin(e.target.value)}
              placeholder="30"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es'
                    ? 'Precio de venta recomendado'
                    : 'Recommended selling price'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-blue-700">
                  {formatCurrency(d.recommendedSellingPrice, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es' ? 'Beneficio por unidad' : 'Profit amount'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.profitAmount, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Margen de beneficio (sobre venta)'
                    : 'Profit margin (on sales)'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatPercent(d.desiredMarginPercent, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Recargo equivalente / Markup (sobre coste)'
                    : 'Markup percentage (on cost)'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatPercent(d.markupPercent, lang)}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setSpCost('');
            setSpMargin('');
          },
          () => {
            setSpCost('70');
            setSpMargin('30');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'break-even') {
    const res = calculateBreakEven(beFixed, beVariable, beSelling);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Punto de Equilibrio — Unidades necesarias: ${d.breakEvenUnitsRoundedUp} uds | Ingresos de equilibrio: ${formatCurrency(d.breakEvenRevenue, currency, lang)} | Margen de contribución unitario: ${formatCurrency(d.contributionMarginPerUnit, currency, lang)}`
        : `Break-Even — Break-even units: ${d.breakEvenUnitsRoundedUp} units | Break-even revenue: ${formatCurrency(d.breakEvenRevenue, currency, lang)} | Contribution margin per unit: ${formatCurrency(d.contributionMarginPerUnit, currency, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="be-fixed"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Costes fijos totales' : 'Fixed costs'} ({currency})
            </label>
            <input
              id="be-fixed"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={beFixed}
              onChange={(e) => setBeFixed(e.target.value)}
              placeholder="3000"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="be-variable"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Coste variable por unidad'
                : 'Variable cost per unit'}{' '}
              ({currency})
            </label>
            <input
              id="be-variable"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={beVariable}
              onChange={(e) => setBeVariable(e.target.value)}
              placeholder="15"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="be-selling"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Precio de venta por unidad'
                : 'Selling price per unit'}{' '}
              ({currency})
            </label>
            <input
              id="be-selling"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={beSelling}
              onChange={(e) => setBeSelling(e.target.value)}
              placeholder="40"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es'
                    ? 'Unidades de punto de equilibrio'
                    : 'Break-even units'}
                </span>
                <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
                  {formatNumber(d.breakEvenUnitsRoundedUp, lang, 0)}{' '}
                  {lang === 'es' ? 'unidades' : 'units'}
                </span>
                <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                  {lang === 'es' ? 'Cálculo exacto:' : 'Exact:'}{' '}
                  {formatNumber(d.exactBreakEvenUnits, lang, 2)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Ingresos de punto de equilibrio'
                    : 'Break-even revenue'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.breakEvenRevenue, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Margen de contribución por unidad'
                    : 'Contribution margin per unit'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.contributionMarginPerUnit, currency, lang)}
                </span>
                <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                  {formatPercent(d.contributionMarginRatioPercent, lang)}{' '}
                  {lang === 'es' ? 'del precio' : 'of price'}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setBeFixed('');
            setBeVariable('');
            setBeSelling('');
          },
          () => {
            setBeFixed('3000');
            setBeVariable('15');
            setBeSelling('40');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'hourly-cost') {
    const res = calculateHourlyCost(hcTotalCost, hcTotalHours, hcHoursPerDay);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Coste por Hora — Coste total: ${formatCurrency(d.totalCost, currency, lang)} | Horas totales: ${formatNumber(d.totalHours, lang, 2)} h | Coste por hora: ${formatCurrency(d.costPerHour, currency, lang)} | Coste por día (${d.hoursPerDay} h): ${formatCurrency(d.costPerDay, currency, lang)}`
        : `Hourly Cost — Total cost: ${formatCurrency(d.totalCost, currency, lang)} | Total hours: ${formatNumber(d.totalHours, lang, 2)} hrs | Cost per hour: ${formatCurrency(d.costPerHour, currency, lang)} | Cost per day (${d.hoursPerDay} hrs): ${formatCurrency(d.costPerDay, currency, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="hc-cost"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Coste total' : 'Total cost'} ({currency})
            </label>
            <input
              id="hc-cost"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={hcTotalCost}
              onChange={(e) => setHcTotalCost(e.target.value)}
              placeholder="2400"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="hc-hours"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Horas totales' : 'Total hours'}
            </label>
            <input
              id="hc-hours"
              type="number"
              inputMode="decimal"
              step="any"
              min="0.1"
              value={hcTotalHours}
              onChange={(e) => setHcTotalHours(e.target.value)}
              placeholder="160"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="hc-dayhours"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Horas por jornada diaria (opcional)'
                : 'Hours per day (optional)'}
            </label>
            <input
              id="hc-dayhours"
              type="number"
              inputMode="decimal"
              step="any"
              min="0.5"
              max="24"
              value={hcHoursPerDay}
              onChange={(e) => setHcHoursPerDay(e.target.value)}
              placeholder="8"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es' ? 'Coste por hora' : 'Cost per hour'}
                </span>
                <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
                  {formatCurrency(d.costPerHour, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? `Coste por día (${d.hoursPerDay} h)`
                    : `Cost per day (${d.hoursPerDay} hrs)`}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.costPerDay, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es' ? 'Coste por minuto' : 'Cost per minute'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.costPerMinute, currency, lang)}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setHcTotalCost('');
            setHcTotalHours('');
            setHcHoursPerDay('8');
          },
          () => {
            setHcTotalCost('2400');
            setHcTotalHours('160');
            setHcHoursPerDay('8');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'commission') {
    const res = calculateCommission(cmSales, cmRate);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Comisión — Ventas: ${formatCurrency(d.totalSales, currency, lang)} | Tasa: ${formatPercent(d.commissionRate, lang)} | Importe de comisión: ${formatCurrency(d.commissionAmount, currency, lang)} | Total con comisión: ${formatCurrency(d.totalIncludingCommission, currency, lang)} | Neto descontando comisión: ${formatCurrency(d.netAfterCommission, currency, lang)}`
        : `Commission — Sales: ${formatCurrency(d.totalSales, currency, lang)} | Rate: ${formatPercent(d.commissionRate, lang)} | Commission amount: ${formatCurrency(d.commissionAmount, currency, lang)} | Total including commission: ${formatCurrency(d.totalIncludingCommission, currency, lang)} | Net after commission: ${formatCurrency(d.netAfterCommission, currency, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="cm-sales"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Ventas totales' : 'Total sales'} ({currency})
            </label>
            <input
              id="cm-sales"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={cmSales}
              onChange={(e) => setCmSales(e.target.value)}
              placeholder="5000"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="cm-rate"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Porcentaje de comisión (%)'
                : 'Commission percentage (%)'}
            </label>
            <input
              id="cm-rate"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={cmRate}
              onChange={(e) => setCmRate(e.target.value)}
              placeholder="6"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es' ? 'Importe de la comisión' : 'Commission amount'}
                </span>
                <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
                  {formatCurrency(d.commissionAmount, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Total incluyendo comisión'
                    : 'Total including commission'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.totalIncludingCommission, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Neto descontando comisión'
                    : 'Net after deducting commission'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.netAfterCommission, currency, lang)}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setCmSales('');
            setCmRate('');
          },
          () => {
            setCmSales('5000');
            setCmRate('6');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'discount') {
    const res = calculateDiscount(dcOriginal, dcRate);
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Descuento — Precio original: ${formatCurrency(d.originalPrice, currency, lang)} | Descuento (${formatPercent(d.percentageSaved, lang)}): ${formatCurrency(d.discountAmount, currency, lang)} | Precio final: ${formatCurrency(d.finalPrice, currency, lang)}`
        : `Discount — Original price: ${formatCurrency(d.originalPrice, currency, lang)} | Discount (${formatPercent(d.percentageSaved, lang)}): ${formatCurrency(d.discountAmount, currency, lang)} | Final price: ${formatCurrency(d.finalPrice, currency, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="dc-price"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Precio original' : 'Original price'} ({currency})
            </label>
            <input
              id="dc-price"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={dcOriginal}
              onChange={(e) => setDcOriginal(e.target.value)}
              placeholder="120.00"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="dc-rate"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Porcentaje de descuento (%)'
                : 'Discount percentage (%)'}
            </label>
            <input
              id="dc-rate"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              max="100"
              value={dcRate}
              onChange={(e) => setDcRate(e.target.value)}
              placeholder="25"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es' ? 'Precio final a pagar' : 'Final price'}
                </span>
                <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
                  {formatCurrency(d.finalPrice, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es' ? 'Importe ahorrado (Descuento)' : 'Discount amount'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-emerald-700">
                  {formatCurrency(d.discountAmount, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es' ? 'Porcentaje ahorrado' : 'Percentage saved'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatPercent(d.percentageSaved, lang)}
                </span>
              </div>
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setDcOriginal('');
            setDcRate('');
          },
          () => {
            setDcOriginal('120');
            setDcRate('25');
          },
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'word-counter') {
    const stats = analyzeWords(wcText);
    const copyStr =
      lang === 'es'
        ? `Contador de palabras — Palabras: ${stats.words} | Caracteres (con espacios): ${stats.characters} | Caracteres (sin espacios): ${stats.charactersNoSpaces} | Frases: ${stats.sentences} | Párrafos: ${stats.paragraphs}`
        : `Word Counter — Words: ${stats.words} | Characters (with spaces): ${stats.characters} | Characters (no spaces): ${stats.charactersNoSpaces} | Sentences: ${stats.sentences} | Paragraphs: ${stats.paragraphs}`;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200">
            <span className="block text-xs font-medium text-blue-900">
              {lang === 'es' ? 'Palabras' : 'Words'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
              {stats.words}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Caracteres' : 'Characters'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.characters}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Sin espacios' : 'No spaces'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.charactersNoSpaces}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Oraciones' : 'Sentences'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.sentences}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Párrafos' : 'Paragraphs'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.paragraphs}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="wc-textarea"
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            {lang === 'es'
              ? 'Escribe o pega tu texto aquí (recuento instantáneo)'
              : 'Type or paste your text below (live count)'}
          </label>
          <textarea
            id="wc-textarea"
            rows={7}
            value={wcText}
            onChange={(e) => setWcText(e.target.value)}
            placeholder={
              lang === 'es'
                ? 'Empieza a escribir o pega tu documento aquí...'
                : 'Start typing or paste your document here...'
            }
            className="w-full p-4 bg-white border border-slate-300 rounded-lg text-base text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {renderActionButtons(
          () => setWcText(''),
          () =>
            setWcText(lang === 'es' ? defaultWordSampleEs : defaultWordSampleEn),
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'character-counter') {
    const stats = analyzeCharacters(ccText, ccLimit);
    const copyStr =
      lang === 'es'
        ? `Contador de caracteres — Caracteres: ${stats.characters} | Sin espacios: ${stats.charactersNoSpaces} | Palabras: ${stats.words} | Límite: ${stats.limit} | Restantes: ${stats.remaining}`
        : `Character Counter — Characters: ${stats.characters} | No spaces: ${stats.charactersNoSpaces} | Words: ${stats.words} | Limit: ${stats.limit} | Remaining: ${stats.remaining}`;

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="mb-6 pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="w-full sm:w-64">
            <label
              htmlFor="cc-limit"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Límite máximo de caracteres'
                : 'Character limit'}
            </label>
            <input
              id="cc-limit"
              type="number"
              inputMode="numeric"
              min="1"
              max="100000"
              value={ccLimit}
              onChange={(e) => setCcLimit(e.target.value)}
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: '60 (SEO Title)', val: '60' },
              { label: '155 (Meta Desc)', val: '155' },
              { label: '160 (SMS)', val: '160' },
              { label: '280 (Post)', val: '280' },
            ].map((preset) => (
              <button
                key={preset.val}
                type="button"
                onClick={() => setCcLimit(preset.val)}
                className={`h-9 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  ccLimit === preset.val
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Caracteres totales' : 'Total characters'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.characters}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Sin espacios' : 'Excluding spaces'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.charactersNoSpaces}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="block text-xs font-medium text-slate-500">
              {lang === 'es' ? 'Palabras' : 'Words'}
            </span>
            <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-slate-900">
              {stats.words}
            </span>
          </div>
          <div
            className={`p-3.5 rounded-lg border ${
              stats.isExceeded
                ? 'bg-red-50 border-red-300'
                : 'bg-blue-50/70 border-blue-200'
            }`}
          >
            <span
              className={`block text-xs font-medium ${
                stats.isExceeded ? 'text-red-900' : 'text-blue-900'
              }`}
            >
              {lang === 'es' ? 'Caracteres restantes' : 'Remaining characters'}
            </span>
            <span
              className={`mt-1 block text-2xl font-bold font-mono tabular-nums ${
                stats.isExceeded ? 'text-red-700' : 'text-blue-700'
              }`}
            >
              {stats.remaining}
            </span>
          </div>
        </div>

        {/* Visual Progress & Status */}
        <div className="mb-5">
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all ${
                stats.isExceeded
                  ? 'bg-red-600'
                  : stats.usagePercent > 90
                  ? 'bg-amber-500'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(100, stats.usagePercent)}%` }}
            />
          </div>
          {stats.isExceeded && (
            <div
              role="alert"
              className="mt-3 p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-900 text-sm font-medium"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                {lang === 'es'
                  ? `Has superado el límite de ${stats.limit} caracteres por ${Math.abs(stats.remaining)} caracteres.`
                  : `You have exceeded the ${stats.limit}-character limit by ${Math.abs(stats.remaining)} characters.`}
              </span>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="cc-textarea"
            className="block text-sm font-semibold text-slate-800 mb-2"
          >
            {lang === 'es' ? 'Tu texto' : 'Your text'}
          </label>
          <textarea
            id="cc-textarea"
            rows={6}
            value={ccText}
            onChange={(e) => setCcText(e.target.value)}
            placeholder={
              lang === 'es'
                ? 'Escribe aquí para comprobar tu límite de caracteres...'
                : 'Type here to check your character limit...'
            }
            className={`w-full p-4 bg-white border rounded-lg text-base text-slate-900 leading-relaxed focus:outline-none focus:ring-2 ${
              stats.isExceeded
                ? 'border-red-400 focus:ring-red-600'
                : 'border-slate-300 focus:ring-blue-600'
            }`}
          />
        </div>

        {renderActionButtons(
          () => setCcText(''),
          () =>
            setCcText(lang === 'es' ? defaultCharSampleEs : defaultCharSampleEn),
          copyStr
        )}
      </div>
    );
  }

  if (toolId === 'bank-loan') {
    const res = calculateLoanEMI(
      lnPrincipal,
      lnRate,
      lnDuration,
      lnUnit,
      lnFee
    );
    const d = res.data;
    const copyStr = d
      ? lang === 'es'
        ? `Préstamo Bancario — Capital: ${formatCurrency(d.principal, currency, lang)} | Interés anual: ${formatPercent(d.annualInterestRate, lang)} | Plazo: ${d.totalMonths} meses | Cuota mensual (EMI): ${formatCurrency(d.monthlyInstallment, currency, lang)} | Total intereses: ${formatCurrency(d.totalInterestPayable, currency, lang)} | Devolución total: ${formatCurrency(d.totalRepayment, currency, lang)} | Comisión: ${formatCurrency(d.processingFee, currency, lang)} | Coste total estimado: ${formatCurrency(d.totalCostWithFee, currency, lang)}`
        : `Bank Loan — Principal: ${formatCurrency(d.principal, currency, lang)} | Annual Rate: ${formatPercent(d.annualInterestRate, lang)} | Term: ${d.totalMonths} months | Monthly EMI: ${formatCurrency(d.monthlyInstallment, currency, lang)} | Total Interest: ${formatCurrency(d.totalInterestPayable, currency, lang)} | Total Repayment: ${formatCurrency(d.totalRepayment, currency, lang)} | Processing Fee: ${formatCurrency(d.processingFee, currency, lang)} | Total Cost with Fee: ${formatCurrency(d.totalCostWithFee, currency, lang)}`
      : '';

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {renderCurrencySelector()}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label
              htmlFor="ln-principal"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Importe del préstamo' : 'Loan amount'} (
              {currency})
            </label>
            <input
              id="ln-principal"
              type="number"
              inputMode="decimal"
              step="any"
              min="1"
              value={lnPrincipal}
              onChange={(e) => setLnPrincipal(e.target.value)}
              placeholder="10000"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="ln-rate"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Interés anual (%)'
                : 'Annual interest rate (%)'}
            </label>
            <input
              id="ln-rate"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              max="200"
              value={lnRate}
              onChange={(e) => setLnRate(e.target.value)}
              placeholder="6"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="ln-duration"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Plazo del préstamo' : 'Loan duration'}
            </label>
            <div className="flex gap-2">
              <input
                id="ln-duration"
                type="number"
                inputMode="numeric"
                step="1"
                min="1"
                value={lnDuration}
                onChange={(e) => setLnDuration(e.target.value)}
                placeholder="3"
                className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                aria-label={
                  lang === 'es' ? 'Unidad de plazo' : 'Duration unit'
                }
                value={lnUnit}
                onChange={(e) =>
                  setLnUnit(e.target.value as 'months' | 'years')
                }
                className="h-11 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shrink-0"
              >
                <option value="years">
                  {lang === 'es' ? 'Años' : 'Years'}
                </option>
                <option value="months">
                  {lang === 'es' ? 'Meses' : 'Months'}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="ln-fee"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es'
                ? 'Comisión apertura (opcional)'
                : 'Processing fee (optional)'}{' '}
              ({currency})
            </label>
            <input
              id="ln-fee"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              value={lnFee}
              onChange={(e) => setLnFee(e.target.value)}
              placeholder="0"
              className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {!res.ok && renderError(res.errorEs, res.errorEn)}

        {res.ok && d && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h2 className="text-sm font-semibold text-slate-500 mb-4">
              {ui.resultsHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
                <span className="block text-xs font-medium text-blue-900">
                  {lang === 'es'
                    ? 'Cuota mensual fija (EMI)'
                    : 'Monthly installment (EMI)'}
                </span>
                <span className="mt-1 block text-2xl font-bold font-mono tabular-nums text-blue-700">
                  {formatCurrency(d.monthlyInstallment, currency, lang)}
                </span>
                <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                  {d.totalMonths}{' '}
                  {lang === 'es' ? 'cuotas mensuales' : 'monthly installments'}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Importe original del préstamo'
                    : 'Original loan amount'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.principal, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Total de intereses a pagar'
                    : 'Total interest payable'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.totalInterestPayable, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Devolución total (Capital + Intereses)'
                    : 'Total loan repayment'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.totalRepayment, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="block text-xs font-medium text-slate-500">
                  {lang === 'es'
                    ? 'Comisión de apertura / estudio'
                    : 'Processing fee'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.processingFee, currency, lang)}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-slate-100 border border-slate-300">
                <span className="block text-xs font-semibold text-slate-700">
                  {lang === 'es'
                    ? 'Coste total estimado (incluyendo comisión)'
                    : 'Total estimated cost including fee'}
                </span>
                <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                  {formatCurrency(d.totalCostWithFee, currency, lang)}
                </span>
              </div>
            </div>

            {/* Bank Disclaimer */}
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p>
                {lang === 'es'
                  ? 'Aviso importante: Este cálculo utiliza la fórmula estándar de saldo decreciente (amortización francesa) y NO constituye una cotización oficial de ningún banco. Las cuotas reales pueden variar por comisiones bancarias, seguros vinculados, impuestos, criterios de redondeo o cambios en los tipos de interés.'
                  : 'Important notice: This calculation uses the standard reducing-balance EMI formula and is NOT an official bank quotation. Actual bank payments may differ due to bank fees, insurance, taxes, rate changes, and bank-specific terms.'}
              </p>
            </div>

            {/* Amortization Schedule Toggle */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full sm:w-auto h-11 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {showSchedule ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>
                      {lang === 'es'
                        ? 'Ocultar tabla de amortización mensual'
                        : 'Hide monthly amortization table'}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>
                      {lang === 'es'
                        ? `Ver tabla de amortización mensual (${d.totalMonths} meses)`
                        : `View monthly amortization table (${d.totalMonths} months)`}
                    </span>
                  </>
                )}
              </button>

              {showSchedule && (
                <div className="mt-4 overflow-x-auto border border-slate-200 rounded-lg max-h-96 overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 font-semibold">
                          {lang === 'es' ? 'Mes' : 'Month'}
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          {lang === 'es' ? 'Saldo inicial' : 'Opening balance'}
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          {lang === 'es' ? 'Cuota mensual' : 'Monthly payment'}
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          {lang === 'es' ? 'Capital pagado' : 'Principal paid'}
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          {lang === 'es' ? 'Intereses pagados' : 'Interest paid'}
                        </th>
                        <th className="py-2.5 px-3 font-semibold text-right">
                          {lang === 'es' ? 'Saldo pendiente' : 'Remaining balance'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono tabular-nums">
                      {d.schedule.map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-medium text-slate-900">
                            {row.month}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-700">
                            {formatNumber(row.openingBalance, lang, 2)}
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-slate-900">
                            {formatNumber(row.monthlyPayment, lang, 2)}
                          </td>
                          <td className="py-2 px-3 text-right text-emerald-700">
                            {formatNumber(row.principalPaid, lang, 2)}
                          </td>
                          <td className="py-2 px-3 text-right text-amber-700">
                            {formatNumber(row.interestPaid, lang, 2)}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-900">
                            {formatNumber(row.remainingBalance, lang, 2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {renderActionButtons(
          () => {
            setLnPrincipal('');
            setLnRate('');
            setLnDuration('');
            setLnFee('0');
          },
          () => {
            setLnPrincipal('10000');
            setLnRate('6');
            setLnDuration('3');
            setLnUnit('years');
            setLnFee('100');
          },
          copyStr
        )}
      </div>
    );
  }

  // TOOL 10: SALARY CALCULATOR
  const res = calculateSalary(
    slAmount,
    slFreq,
    slHoursDay,
    slDaysWeek,
    slBonus,
    slDeductions
  );
  const d = res.data;
  const copyStr = d
    ? lang === 'es'
      ? `Salario — Bruto anual: ${formatCurrency(d.annual.gross, currency, lang)} | Bruto mensual: ${formatCurrency(d.monthly.gross, currency, lang)} | Bruto por hora: ${formatCurrency(d.hourly.gross, currency, lang)} | Neto anual estimado: ${formatCurrency(d.annual.net, currency, lang)} | Neto mensual estimado: ${formatCurrency(d.monthly.net, currency, lang)}`
      : `Salary — Gross Annual: ${formatCurrency(d.annual.gross, currency, lang)} | Gross Monthly: ${formatCurrency(d.monthly.gross, currency, lang)} | Gross Hourly: ${formatCurrency(d.hourly.gross, currency, lang)} | Estimated Net Annual: ${formatCurrency(d.annual.net, currency, lang)} | Estimated Net Monthly: ${formatCurrency(d.monthly.net, currency, lang)}`
    : '';

  const freqLabels: Record<SalaryFrequency, { es: string; en: string }> = {
    hourly: { es: 'Por hora', en: 'Hourly' },
    daily: { es: 'Diario', en: 'Daily' },
    weekly: { es: 'Semanal', en: 'Weekly' },
    biweekly: { es: 'Quincenal / Bisemanal (26/año)', en: 'Biweekly (26/yr)' },
    monthly: { es: 'Mensual (12/año)', en: 'Monthly (12/yr)' },
    annual: { es: 'Anual', en: 'Annual' },
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
      {renderCurrencySelector()}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <label
            htmlFor="sl-amount"
            className="block text-sm font-semibold text-slate-800 mb-1.5"
          >
            {lang === 'es' ? 'Importe del salario bruto' : 'Base salary amount'}{' '}
            ({currency})
          </label>
          <input
            id="sl-amount"
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            value={slAmount}
            onChange={(e) => setSlAmount(e.target.value)}
            placeholder="2500"
            className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label
            htmlFor="sl-freq"
            className="block text-sm font-semibold text-slate-800 mb-1.5"
          >
            {lang === 'es'
              ? 'Frecuencia de pago'
              : 'Salary payment frequency'}
          </label>
          <select
            id="sl-freq"
            value={slFreq}
            onChange={(e) => setSlFreq(e.target.value as SalaryFrequency)}
            className="w-full h-11 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {(Object.keys(freqLabels) as SalaryFrequency[]).map((f) => (
              <option key={f} value={f}>
                {lang === 'es' ? freqLabels[f].es : freqLabels[f].en}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="sl-hours"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Horas / día' : 'Hours / day'}
            </label>
            <input
              id="sl-hours"
              type="number"
              inputMode="decimal"
              step="any"
              min="0.5"
              max="24"
              value={slHoursDay}
              onChange={(e) => setSlHoursDay(e.target.value)}
              placeholder="8"
              className="w-full h-11 px-3 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="sl-days"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              {lang === 'es' ? 'Días / semana' : 'Days / week'}
            </label>
            <input
              id="sl-days"
              type="number"
              inputMode="decimal"
              step="any"
              min="1"
              max="7"
              value={slDaysWeek}
              onChange={(e) => setSlDaysWeek(e.target.value)}
              placeholder="5"
              className="w-full h-11 px-3 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="sl-bonus"
            className="block text-sm font-semibold text-slate-800 mb-1.5"
          >
            {lang === 'es'
              ? 'Ingresos extra / bonos (opcional)'
              : 'Additional income / bonus (optional)'}{' '}
            ({currency})
          </label>
          <input
            id="sl-bonus"
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            value={slBonus}
            onChange={(e) => setSlBonus(e.target.value)}
            placeholder="0"
            className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label
            htmlFor="sl-deductions"
            className="block text-sm font-semibold text-slate-800 mb-1.5"
          >
            {lang === 'es'
              ? 'Deducciones manuales (opcional)'
              : 'Manual deductions (optional)'}{' '}
            ({currency})
          </label>
          <input
            id="sl-deductions"
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            value={slDeductions}
            onChange={(e) => setSlDeductions(e.target.value)}
            placeholder="0"
            className="w-full h-11 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-base font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {!res.ok && renderError(res.errorEs, res.errorEn)}

      {res.ok && d && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h2 className="text-sm font-semibold text-slate-500 mb-4">
            {ui.resultsHeading} ({currency})
          </h2>

          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-blue-50/70 border border-blue-200">
              <span className="block text-xs font-medium text-blue-900">
                {lang === 'es'
                  ? 'Salario anual neto estimado'
                  : 'Estimated net annual salary'}
              </span>
              <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-blue-700">
                {formatCurrency(d.annual.net, currency, lang)}
              </span>
              <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                {lang === 'es' ? 'Bruto:' : 'Gross:'}{' '}
                {formatCurrency(d.annual.gross, currency, lang)}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-xs font-medium text-slate-500">
                {lang === 'es'
                  ? 'Salario mensual neto estimado'
                  : 'Estimated net monthly salary'}
              </span>
              <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                {formatCurrency(d.monthly.net, currency, lang)}
              </span>
              <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                {lang === 'es' ? 'Bruto:' : 'Gross:'}{' '}
                {formatCurrency(d.monthly.gross, currency, lang)}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-xs font-medium text-slate-500">
                {lang === 'es'
                  ? 'Salario por hora neto estimado'
                  : 'Estimated net hourly salary'}
              </span>
              <span className="mt-1 block text-xl font-bold font-mono tabular-nums text-slate-900">
                {formatCurrency(d.hourly.net, currency, lang)}
              </span>
              <span className="mt-1 block text-xs text-slate-500 font-mono tabular-nums">
                {lang === 'es' ? 'Bruto:' : 'Gross:'}{' '}
                {formatCurrency(d.hourly.gross, currency, lang)}
              </span>
            </div>
          </div>

          {/* Full Period Breakdown Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">
                    {lang === 'es' ? 'Período' : 'Period'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">
                    {lang === 'es' ? 'Salario Bruto' : 'Gross Salary'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">
                    {lang === 'es' ? '+ Ingresos Extra' : '+ Additional Income'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">
                    {lang === 'es' ? '− Deducciones' : '− Deductions'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">
                    {lang === 'es' ? 'Neto Estimado' : 'Estimated Net'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono tabular-nums">
                {(
                  [
                    {
                      key: 'annual',
                      es: 'Anual (1 año)',
                      en: 'Annual (1 year)',
                      row: d.annual,
                    },
                    {
                      key: 'monthly',
                      es: 'Mensual (12/año)',
                      en: 'Monthly (12/yr)',
                      row: d.monthly,
                    },
                    {
                      key: 'biweekly',
                      es: 'Quincenal / Bisemanal (26/año)',
                      en: 'Biweekly (26/yr)',
                      row: d.biweekly,
                    },
                    {
                      key: 'weekly',
                      es: 'Semanal (52/año)',
                      en: 'Weekly (52/yr)',
                      row: d.weekly,
                    },
                    {
                      key: 'daily',
                      es: `Diario (${d.workingDaysPerYear} días/año)`,
                      en: `Daily (${d.workingDaysPerYear} days/yr)`,
                      row: d.daily,
                    },
                    {
                      key: 'hourly',
                      es: `Por hora (${d.workingHoursPerYear} h/año)`,
                      en: `Hourly (${d.workingHoursPerYear} hrs/yr)`,
                      row: d.hourly,
                    },
                  ] as const
                ).map((item) => (
                  <tr key={item.key} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                      {lang === 'es' ? item.es : item.en}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-800">
                      {formatNumber(item.row.gross, lang, 2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-700">
                      +{formatNumber(item.row.additionalIncome, lang, 2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-700">
                      −{formatNumber(item.row.deductions, lang, 2)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-blue-700">
                      {formatNumber(item.row.net, lang, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assumptions & Mandatory Tax Rule Disclaimer */}
          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">
              {lang === 'es'
                ? `Supuestos de conversión aplicados: ${d.hoursPerDay} h/día × ${d.daysPerWeek} días/semana = ${d.workingHoursPerWeek} h/semana | ${d.workingDaysPerYear} días laborables/año | ${d.workingHoursPerYear} horas laborables/año | 52 semanas/año | 12 meses/año.`
                : `Conversion assumptions used: ${d.hoursPerDay} hrs/day × ${d.daysPerWeek} days/week = ${d.workingHoursPerWeek} hrs/week | ${d.workingDaysPerYear} working days/year | ${d.workingHoursPerYear} working hours/year | 52 weeks/year | 12 months/year.`}
            </p>
            <p className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>
                {lang === 'es'
                  ? 'Aviso sobre impuestos y nómina: Esta calculadora NO inventa tramos impositivos ni calcula retenciones automáticas por país. Las deducciones son introducidas manualmente por el usuario. El salario neto real depende de tu país, legislación fiscal, cotizaciones a la seguridad social, beneficios y retenciones de tu empresa. Este resultado es orientativo y no constituye una nómina oficial.'
                  : 'Tax & payroll notice: This calculator does NOT invent tax rates or automatically calculate country-specific taxes. Deductions are manually entered by you. Actual take-home pay depends on your country, tax laws, social contributions, benefits, and employer deductions. Estimated net salary is not an official payroll result.'}
              </span>
            </p>
          </div>
        </div>
      )}

      {renderActionButtons(
        () => {
          setSlAmount('');
          setSlBonus('0');
          setSlDeductions('0');
        },
        () => {
          setSlAmount('2500');
          setSlFreq('monthly');
          setSlHoursDay('8');
          setSlDaysWeek('5');
          setSlBonus('100');
          setSlDeductions('450');
        },
        copyStr
      )}
    </div>
  );
};
