import { CURRENCIES, CurrencyCode, Language } from '../data/config';

export function formatCurrency(
  amount: number,
  currency: CurrencyCode,
  lang: Language = 'es'
): string {
  if (!Number.isFinite(amount)) return '—';
  const info = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const locale = lang === 'es' ? info.localeEs : info.localeEn;

  // CLP, COP, PKR typically show 0 or 2 decimals; we keep 2 decimals for exact financial clarity
  try {
    const formatted = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `${formatted} ${info.code} (${info.symbol})`;
  } catch {
    return `${amount.toFixed(2)} ${info.code}`;
  }
}

export function formatNumber(
  value: number,
  lang: Language = 'es',
  decimals = 2
): string {
  if (!Number.isFinite(value)) return '—';
  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, lang: Language = 'es'): string {
  if (!Number.isFinite(value)) return '—';
  return `${formatNumber(value, lang, 2)}%`;
}

export function parseNumericInput(raw: string): number {
  if (!raw || typeof raw !== 'string') return NaN;
  const trimmed = raw.trim();
  if (trimmed === '') return NaN;
  // Support both comma and dot decimal separators if only one is used
  const normalized =
    trimmed.includes(',') && !trimmed.includes('.')
      ? trimmed.replace(',', '.')
      : trimmed.replace(/,/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export interface CalcResult<T> {
  ok: boolean;
  errorEs?: string;
  errorEn?: string;
  data?: T;
}

/* ============================================================================
 * TOOL 1: PROFIT MARGIN CALCULATOR
 * ========================================================================== */
export interface ProfitMarginOutput {
  costPrice: number;
  sellingPrice: number;
  profit: number;
  profitMarginPercent: number;
  markupPercent: number | null;
}

export function calculateProfitMargin(
  costRaw: string,
  sellingRaw: string
): CalcResult<ProfitMarginOutput> {
  const costPrice = parseNumericInput(costRaw);
  const sellingPrice = parseNumericInput(sellingRaw);

  if ( Number.isNaN(costPrice) || Number.isNaN(sellingPrice)) {
    return {
      ok: false,
      errorEs: 'Por favor, introduce valores numéricos válidos para el coste y el precio de venta.',
      errorEn: 'Please enter valid numeric values for both cost price and selling price.',
    };
  }
  if (costPrice < 0 || sellingPrice < 0) {
    return {
      ok: false,
      errorEs: 'El precio de coste y el precio de venta no pueden ser negativos.',
      errorEn: 'Cost price and selling price cannot be negative.',
    };
  }
  if (sellingPrice === 0) {
    return {
      ok: false,
      errorEs: 'El precio de venta debe ser mayor que cero para calcular el porcentaje de margen de beneficio.',
      errorEn: 'Selling price must be greater than zero to calculate the profit margin percentage.',
    };
  }
  if (costPrice > 1e12 || sellingPrice > 1e12) {
    return {
      ok: false,
      errorEs: 'Los valores introducidos exceden el límite máximo permitido.',
      errorEn: 'The entered values exceed the maximum allowed limit.',
    };
  }

  const profit = sellingPrice - costPrice;
  const profitMarginPercent = (profit / sellingPrice) * 100;
  const markupPercent = costPrice > 0 ? (profit / costPrice) * 100 : null;

  return {
    ok: true,
    data: {
      costPrice,
      sellingPrice,
      profit,
      profitMarginPercent,
      markupPercent,
    },
  };
}

/* ============================================================================
 * TOOL 2: SELLING PRICE CALCULATOR
 * ========================================================================== */
export interface SellingPriceOutput {
  costPrice: number;
  desiredMarginPercent: number;
  recommendedSellingPrice: number;
  profitAmount: number;
  markupPercent: number;
}

export function calculateSellingPrice(
  costRaw: string,
  marginRaw: string
): CalcResult<SellingPriceOutput> {
  const costPrice = parseNumericInput(costRaw);
  const desiredMarginPercent = parseNumericInput(marginRaw);

  if (Number.isNaN(costPrice) || Number.isNaN(desiredMarginPercent)) {
    return {
      ok: false,
      errorEs: 'Introduce un coste de producto y un porcentaje de margen deseado válidos.',
      errorEn: 'Please enter a valid product cost and desired profit margin percentage.',
    };
  }
  if (costPrice <= 0) {
    return {
      ok: false,
      errorEs: 'El coste del producto debe ser mayor que cero.',
      errorEn: 'Product cost must be greater than zero.',
    };
  }
  if (desiredMarginPercent < 0) {
    return {
      ok: false,
      errorEs: 'El margen de beneficio deseado no puede ser negativo.',
      errorEn: 'Desired profit margin cannot be negative.',
    };
  }
  if (desiredMarginPercent >= 100) {
    return {
      ok: false,
      errorEs:
        'El margen de beneficio no puede ser igual o superior al 100%. Recuerda que el margen es el beneficio dividido entre el precio de venta.',
      errorEn:
        'Profit margin cannot be 100% or greater. Remember that profit margin is profit divided by selling price.',
    };
  }
  if (costPrice > 1e12) {
    return {
      ok: false,
      errorEs: 'El coste introducido es demasiado grande.',
      errorEn: 'The entered cost value is too large.',
    };
  }

  const recommendedSellingPrice = costPrice / (1 - desiredMarginPercent / 100);
  const profitAmount = recommendedSellingPrice - costPrice;
  const markupPercent = (profitAmount / costPrice) * 100;

  return {
    ok: true,
    data: {
      costPrice,
      desiredMarginPercent,
      recommendedSellingPrice,
      profitAmount,
      markupPercent,
    },
  };
}

/* ============================================================================
 * TOOL 3: BREAK-EVEN CALCULATOR
 * ========================================================================== */
export interface BreakEvenOutput {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  contributionMarginPerUnit: number;
  contributionMarginRatioPercent: number;
  exactBreakEvenUnits: number;
  breakEvenUnitsRoundedUp: number;
  breakEvenRevenue: number;
}

export function calculateBreakEven(
  fixedRaw: string,
  variableRaw: string,
  sellingRaw: string
): CalcResult<BreakEvenOutput> {
  const fixedCosts = parseNumericInput(fixedRaw);
  const variableCostPerUnit = parseNumericInput(variableRaw);
  const sellingPricePerUnit = parseNumericInput(sellingRaw);

  if (
    Number.isNaN(fixedCosts) ||
    Number.isNaN(variableCostPerUnit) ||
    Number.isNaN(sellingPricePerUnit)
  ) {
    return {
      ok: false,
      errorEs: 'Introduce valores numéricos válidos en los tres campos.',
      errorEn: 'Please enter valid numeric values in all three fields.',
    };
  }
  if (fixedCosts < 0 || variableCostPerUnit < 0 || sellingPricePerUnit <= 0) {
    return {
      ok: false,
      errorEs:
        'Los costes no pueden ser negativos y el precio de venta por unidad debe ser mayor que cero.',
      errorEn:
        'Costs cannot be negative and selling price per unit must be greater than zero.',
    };
  }
  if (sellingPricePerUnit <= variableCostPerUnit) {
    return {
      ok: false,
      errorEs:
        'Cálculo imposible: el precio de venta por unidad debe ser mayor que el coste variable por unidad para cubrir los costes fijos.',
      errorEn:
        'Calculation impossible: selling price per unit must be greater than variable cost per unit in order to cover fixed costs.',
    };
  }

  const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;
  const contributionMarginRatioPercent =
    (contributionMarginPerUnit / sellingPricePerUnit) * 100;
  const exactBreakEvenUnits = fixedCosts / contributionMarginPerUnit;
  const breakEvenUnitsRoundedUp = Math.ceil(exactBreakEvenUnits);
  const breakEvenRevenue = breakEvenUnitsRoundedUp * sellingPricePerUnit;

  return {
    ok: true,
    data: {
      fixedCosts,
      variableCostPerUnit,
      sellingPricePerUnit,
      contributionMarginPerUnit,
      contributionMarginRatioPercent,
      exactBreakEvenUnits,
      breakEvenUnitsRoundedUp,
      breakEvenRevenue,
    },
  };
}

/* ============================================================================
 * TOOL 4: HOURLY COST CALCULATOR
 * ========================================================================== */
export interface HourlyCostOutput {
  totalCost: number;
  totalHours: number;
  hoursPerDay: number;
  costPerHour: number;
  costPerDay: number;
  costPerMinute: number;
}

export function calculateHourlyCost(
  totalCostRaw: string,
  totalHoursRaw: string,
  hoursPerDayRaw: string = '8'
): CalcResult<HourlyCostOutput> {
  const totalCost = parseNumericInput(totalCostRaw);
  const totalHours = parseNumericInput(totalHoursRaw);
  const hoursPerDay = hoursPerDayRaw.trim() === '' ? 8 : parseNumericInput(hoursPerDayRaw);

  if (Number.isNaN(totalCost) || Number.isNaN(totalHours) || Number.isNaN(hoursPerDay)) {
    return {
      ok: false,
      errorEs: 'Introduce un coste total y un número de horas válidos.',
      errorEn: 'Please enter a valid total cost and total hours.',
    };
  }
  if (totalCost < 0) {
    return {
      ok: false,
      errorEs: 'El coste total no puede ser negativo.',
      errorEn: 'Total cost cannot be negative.',
    };
  }
  if (totalHours <= 0) {
    return {
      ok: false,
      errorEs: 'El total de horas debe ser mayor que cero.',
      errorEn: 'Total hours must be greater than zero.',
    };
  }
  if (hoursPerDay <= 0 || hoursPerDay > 24) {
    return {
      ok: false,
      errorEs: 'Las horas por jornada diaria deben estar entre 0,1 y 24.',
      errorEn: 'Working hours per day must be between 0.1 and 24.',
    };
  }

  const costPerHour = totalCost / totalHours;
  const costPerDay = costPerHour * hoursPerDay;
  const costPerMinute = costPerHour / 60;

  return {
    ok: true,
    data: {
      totalCost,
      totalHours,
      hoursPerDay,
      costPerHour,
      costPerDay,
      costPerMinute,
    },
  };
}

/* ============================================================================
 * TOOL 5: COMMISSION CALCULATOR
 * ========================================================================== */
export interface CommissionOutput {
  totalSales: number;
  commissionRate: number;
  commissionAmount: number;
  totalIncludingCommission: number;
  netAfterCommission: number;
}

export function calculateCommission(
  salesRaw: string,
  rateRaw: string
): CalcResult<CommissionOutput> {
  const totalSales = parseNumericInput(salesRaw);
  const commissionRate = parseNumericInput(rateRaw);

  if (Number.isNaN(totalSales) || Number.isNaN(commissionRate)) {
    return {
      ok: false,
      errorEs: 'Introduce un importe de ventas y un porcentaje de comisión válidos.',
      errorEn: 'Please enter a valid total sales amount and commission percentage.',
    };
  }
  if (totalSales < 0) {
    return {
      ok: false,
      errorEs: 'El importe total de ventas no puede ser negativo.',
      errorEn: 'Total sales amount cannot be negative.',
    };
  }
  if (commissionRate < 0 || commissionRate > 1000) {
    return {
      ok: false,
      errorEs: 'El porcentaje de comisión debe estar entre 0% y 1000%.',
      errorEn: 'Commission percentage must be between 0% and 1000%.',
    };
  }

  const commissionAmount = (totalSales * commissionRate) / 100;
  const totalIncludingCommission = totalSales + commissionAmount;
  const netAfterCommission = totalSales - commissionAmount;

  return {
    ok: true,
    data: {
      totalSales,
      commissionRate,
      commissionAmount,
      totalIncludingCommission,
      netAfterCommission,
    },
  };
}

/* ============================================================================
 * TOOL 6: DISCOUNT CALCULATOR
 * ========================================================================== */
export interface DiscountOutput {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  percentageSaved: number;
}

export function calculateDiscount(
  priceRaw: string,
  discountRaw: string
): CalcResult<DiscountOutput> {
  const originalPrice = parseNumericInput(priceRaw);
  const discountPercent = parseNumericInput(discountRaw);

  if (Number.isNaN(originalPrice) || Number.isNaN(discountPercent)) {
    return {
      ok: false,
      errorEs: 'Introduce un precio original y un porcentaje de descuento válidos.',
      errorEn: 'Please enter a valid original price and discount percentage.',
    };
  }
  if (originalPrice < 0) {
    return {
      ok: false,
      errorEs: 'El precio original no puede ser negativo.',
      errorEn: 'Original price cannot be negative.',
    };
  }
  if (discountPercent < 0 || discountPercent > 100) {
    return {
      ok: false,
      errorEs: 'El porcentaje de descuento debe estar entre 0% y 100%.',
      errorEn: 'Discount percentage must be between 0% and 100%.',
    };
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    ok: true,
    data: {
      originalPrice,
      discountPercent,
      discountAmount,
      finalPrice,
      percentageSaved: discountPercent,
    },
  };
}

/* ============================================================================
 * TOOL 7: WORD COUNTER
 * ========================================================================== */
export interface WordCounterOutput {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

export function analyzeWords(text: string): WordCounterOutput {
  const raw = text || '';
  const trimmed = raw.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const characters = raw.length;
  const charactersNoSpaces = raw.replace(/\s/g, '').length;

  const sentences =
    trimmed === ''
      ? 0
      : trimmed
          .split(/[.!?]+/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0).length;

  const paragraphs =
    trimmed === ''
      ? 0
      : raw
          .split(/\r?\n+/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0).length;

  const readingTimeMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
  };
}

/* ============================================================================
 * TOOL 8: CHARACTER COUNTER
 * ========================================================================== */
export interface CharacterCounterOutput {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  limit: number;
  remaining: number;
  isExceeded: boolean;
  usagePercent: number;
}

export function analyzeCharacters(
  text: string,
  limitRaw: string
): CharacterCounterOutput {
  const raw = text || '';
  const trimmed = raw.trim();
  const parsedLimit = parseNumericInput(limitRaw);
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.floor(parsedLimit) : 280;

  const characters = raw.length;
  const charactersNoSpaces = raw.replace(/\s/g, '').length;
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const lines = raw === '' ? 0 : raw.split(/\r?\n/).length;
  const remaining = limit - characters;
  const isExceeded = characters > limit;
  const usagePercent = limit > 0 ? Math.min(100, (characters / limit) * 100) : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    limit,
    remaining,
    isExceeded,
    usagePercent,
  };
}

/* ============================================================================
 * TOOL 9: BANK LOAN / EMI CALCULATOR
 * ========================================================================== */
export interface AmortizationRow {
  month: number;
  openingBalance: number;
  monthlyPayment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface LoanEMIOutput {
  principal: number;
  annualInterestRate: number;
  totalMonths: number;
  monthlyInstallment: number;
  totalInterestPayable: number;
  totalRepayment: number;
  processingFee: number;
  totalCostWithFee: number;
  schedule: AmortizationRow[];
}

export function calculateLoanEMI(
  principalRaw: string,
  annualRateRaw: string,
  durationRaw: string,
  durationUnit: 'months' | 'years',
  feeRaw: string = '0'
): CalcResult<LoanEMIOutput> {
  const principal = parseNumericInput(principalRaw);
  const annualInterestRate = parseNumericInput(annualRateRaw);
  const durationValue = parseNumericInput(durationRaw);
  const processingFee = feeRaw.trim() === '' ? 0 : parseNumericInput(feeRaw);

  if (
    Number.isNaN(principal) ||
    Number.isNaN(annualInterestRate) ||
    Number.isNaN(durationValue) ||
    Number.isNaN(processingFee)
  ) {
    return {
      ok: false,
      errorEs:
        'Introduce valores numéricos válidos para el importe del préstamo, interés y plazo.',
      errorEn:
        'Please enter valid numeric values for loan amount, interest rate, and duration.',
    };
  }
  if (principal <= 0) {
    return {
      ok: false,
      errorEs: 'El importe principal del préstamo debe ser mayor que cero.',
      errorEn: 'The loan principal amount must be greater than zero.',
    };
  }
  if (annualInterestRate < 0 || annualInterestRate > 200) {
    return {
      ok: false,
      errorEs: 'El tipo de interés anual no puede ser negativo ni superar el 200%.',
      errorEn: 'Annual interest rate cannot be negative or exceed 200%.',
    };
  }
  if (durationValue <= 0) {
    return {
      ok: false,
      errorEs: 'El plazo del préstamo debe ser mayor que cero.',
      errorEn: 'Loan duration must be greater than zero.',
    };
  }
  if (processingFee < 0) {
    return {
      ok: false,
      errorEs: 'La comisión de apertura o estudio no puede ser negativa.',
      errorEn: 'The processing fee cannot be negative.',
    };
  }

  const totalMonths =
    durationUnit === 'years'
      ? Math.round(durationValue * 12)
      : Math.round(durationValue);

  if (totalMonths < 1 || totalMonths > 600) {
    return {
      ok: false,
      errorEs: 'El plazo debe estar entre 1 mes y 600 meses (50 años).',
      errorEn: 'Loan duration must be between 1 month and 600 months (50 years).',
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  let monthlyInstallment: number;

  if (annualInterestRate === 0) {
    monthlyInstallment = principal / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyInstallment = (principal * monthlyRate * factor) / (factor - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let accumulatedInterest = 0;

  for (let m = 1; m <= totalMonths; m++) {
    const openingBalance = balance;
    const interestPaid = annualInterestRate === 0 ? 0 : openingBalance * monthlyRate;
    let principalPaid = monthlyInstallment - interestPaid;
    let paymentThisMonth = monthlyInstallment;

    if (m === totalMonths) {
      principalPaid = openingBalance;
      paymentThisMonth = principalPaid + interestPaid;
    }

    const remainingBalance = Math.max(0, openingBalance - principalPaid);
    accumulatedInterest += interestPaid;

    schedule.push({
      month: m,
      openingBalance,
      monthlyPayment: paymentThisMonth,
      principalPaid,
      interestPaid,
      remainingBalance,
    });

    balance = remainingBalance;
  }

  const totalInterestPayable = accumulatedInterest;
  const totalRepayment = principal + totalInterestPayable;
  const totalCostWithFee = totalRepayment + processingFee;

  return {
    ok: true,
    data: {
      principal,
      annualInterestRate,
      totalMonths,
      monthlyInstallment,
      totalInterestPayable,
      totalRepayment,
      processingFee,
      totalCostWithFee,
      schedule,
    },
  };
}

/* ============================================================================
 * TOOL 10: SALARY CALCULATOR
 * ========================================================================== */
export type SalaryFrequency =
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'annual';

export interface SalaryPeriodBreakdown {
  gross: number;
  additionalIncome: number;
  deductions: number;
  net: number;
}

export interface SalaryOutput {
  hoursPerDay: number;
  daysPerWeek: number;
  workingDaysPerYear: number;
  workingHoursPerWeek: number;
  workingHoursPerYear: number;
  annual: SalaryPeriodBreakdown;
  monthly: SalaryPeriodBreakdown;
  biweekly: SalaryPeriodBreakdown;
  weekly: SalaryPeriodBreakdown;
  daily: SalaryPeriodBreakdown;
  hourly: SalaryPeriodBreakdown;
}

export function calculateSalary(
  amountRaw: string,
  frequency: SalaryFrequency,
  hoursPerDayRaw: string,
  daysPerWeekRaw: string,
  additionalIncomeRaw: string = '0',
  deductionsRaw: string = '0'
): CalcResult<SalaryOutput> {
  const amount = parseNumericInput(amountRaw);
  const hoursPerDay = parseNumericInput(hoursPerDayRaw);
  const daysPerWeek = parseNumericInput(daysPerWeekRaw);
  const additionalIncome =
    additionalIncomeRaw.trim() === '' ? 0 : parseNumericInput(additionalIncomeRaw);
  const deductions =
    deductionsRaw.trim() === '' ? 0 : parseNumericInput(deductionsRaw);

  if (
    Number.isNaN(amount) ||
    Number.isNaN(hoursPerDay) ||
    Number.isNaN(daysPerWeek) ||
    Number.isNaN(additionalIncome) ||
    Number.isNaN(deductions)
  ) {
    return {
      ok: false,
      errorEs:
        'Introduce valores numéricos válidos para el salario, horas por día y días por semana.',
      errorEn:
        'Please enter valid numeric values for salary amount, working hours per day, and working days per week.',
    };
  }
  if (amount <= 0) {
    return {
      ok: false,
      errorEs: 'El importe del salario debe ser mayor que cero.',
      errorEn: 'Salary amount must be greater than zero.',
    };
  }
  if (hoursPerDay <= 0 || hoursPerDay > 24) {
    return {
      ok: false,
      errorEs: 'Las horas de trabajo por día deben estar entre 0,5 y 24.',
      errorEn: 'Working hours per day must be between 0.5 and 24.',
    };
  }
  if (daysPerWeek <= 0 || daysPerWeek > 7) {
    return {
      ok: false,
      errorEs: 'Los días de trabajo por semana deben estar entre 1 y 7.',
      errorEn: 'Working days per week must be between 1 and 7.',
    };
  }
  if (additionalIncome < 0 || deductions < 0) {
    return {
      ok: false,
      errorEs: 'Los ingresos adicionales y las deducciones no pueden ser negativos.',
      errorEn: 'Additional income and deductions cannot be negative.',
    };
  }

  const weeksPerYear = 52;
  const biweeklyPerYear = 26;
  const monthsPerYear = 12;
  const workingDaysPerYear = daysPerWeek * weeksPerYear;
  const workingHoursPerWeek = hoursPerDay * daysPerWeek;
  const workingHoursPerYear = workingHoursPerWeek * weeksPerYear;

  let grossAnnual = 0;
  let bonusAnnual = 0;
  let deductionsAnnual = 0;

  const multiplierMap: Record<SalaryFrequency, number> = {
    hourly: workingHoursPerYear,
    daily: workingDaysPerYear,
    weekly: weeksPerYear,
    biweekly: biweeklyPerYear,
    monthly: monthsPerYear,
    annual: 1,
  };

  const mult = multiplierMap[frequency];
  grossAnnual = amount * mult;
  // Additional income and manual deductions are entered in the same payment frequency as the salary
  bonusAnnual = additionalIncome * mult;
  deductionsAnnual = deductions * mult;

  const netAnnual = grossAnnual + bonusAnnual - deductionsAnnual;

  const buildPeriod = (divisor: number): SalaryPeriodBreakdown => ({
    gross: grossAnnual / divisor,
    additionalIncome: bonusAnnual / divisor,
    deductions: deductionsAnnual / divisor,
    net: netAnnual / divisor,
  });

  return {
    ok: true,
    data: {
      hoursPerDay,
      daysPerWeek,
      workingDaysPerYear,
      workingHoursPerWeek,
      workingHoursPerYear,
      annual: buildPeriod(1),
      monthly: buildPeriod(monthsPerYear),
      biweekly: buildPeriod(biweeklyPerYear),
      weekly: buildPeriod(weeksPerYear),
      daily: buildPeriod(workingDaysPerYear),
      hourly: buildPeriod(workingHoursPerYear),
    },
  };
}
