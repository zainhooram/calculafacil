import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { CURRENCIES, ROUTE_PAIRS } from '../src/data/config';
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
} from '../src/utils/calculators';

function approxEqual(actual: number, expected: number, epsilon = 0.01) {
  assert(
    Math.abs(actual - expected) <= epsilon,
    `Expected ${actual} to be within ${epsilon} of ${expected}`
  );
}

function runCalculatorTests() {
  console.log('Running mathematical and edge-case test suite for all 10 tools...');

  // 1. Profit Margin Calculator
  const pmNormal = calculateProfitMargin('60', '100');
  assert(pmNormal.ok && pmNormal.data);
  approxEqual(pmNormal.data.profit, 40);
  approxEqual(pmNormal.data.profitMarginPercent, 40);
  approxEqual(pmNormal.data.markupPercent!, 66.6667, 0.01);

  const pmZeroCost = calculateProfitMargin('0', '100');
  assert(pmZeroCost.ok && pmZeroCost.data);
  approxEqual(pmZeroCost.data.profitMarginPercent, 100);
  assert.strictEqual(pmZeroCost.data.markupPercent, null);

  assert.strictEqual(calculateProfitMargin('50', '0').ok, false);
  assert.strictEqual(calculateProfitMargin('-10', '100').ok, false);
  assert.strictEqual(calculateProfitMargin('', '100').ok, false);

  // 2. Selling Price Calculator
  const spNormal = calculateSellingPrice('70', '30');
  assert(spNormal.ok && spNormal.data);
  approxEqual(spNormal.data.recommendedSellingPrice, 100);
  approxEqual(spNormal.data.profitAmount, 30);
  approxEqual(spNormal.data.markupPercent, 42.857, 0.01);

  assert.strictEqual(calculateSellingPrice('70', '100').ok, false);
  assert.strictEqual(calculateSellingPrice('70', '120').ok, false);
  assert.strictEqual(calculateSellingPrice('70', '-5').ok, false);
  assert.strictEqual(calculateSellingPrice('0', '30').ok, false);

  // 3. Break-Even Calculator
  const beNormal = calculateBreakEven('3000', '15', '40');
  assert(beNormal.ok && beNormal.data);
  assert.strictEqual(beNormal.data.breakEvenUnitsRoundedUp, 120);
  approxEqual(beNormal.data.breakEvenRevenue, 4800);
  approxEqual(beNormal.data.contributionMarginPerUnit, 25);

  const beFractional = calculateBreakEven('1000', '10', '22');
  assert(beFractional.ok && beFractional.data);
  // 1000 / 12 = 83.333... -> rounds up to 84 whole units
  assert.strictEqual(beFractional.data.breakEvenUnitsRoundedUp, 84);

  assert.strictEqual(calculateBreakEven('3000', '40', '40').ok, false);
  assert.strictEqual(calculateBreakEven('3000', '50', '40').ok, false);

  // 4. Hourly Cost Calculator
  const hcNormal = calculateHourlyCost('2400', '160', '8');
  assert(hcNormal.ok && hcNormal.data);
  approxEqual(hcNormal.data.costPerHour, 15);
  approxEqual(hcNormal.data.costPerDay, 120);
  assert.strictEqual(calculateHourlyCost('2400', '0', '8').ok, false);
  assert.strictEqual(calculateHourlyCost('-100', '160', '8').ok, false);

  // 5. Commission Calculator
  const cmNormal = calculateCommission('5000', '6.5');
  assert(cmNormal.ok && cmNormal.data);
  approxEqual(cmNormal.data.commissionAmount, 325);
  approxEqual(cmNormal.data.totalIncludingCommission, 5325);
  approxEqual(cmNormal.data.netAfterCommission, 4675);
  assert.strictEqual(calculateCommission('-500', '5').ok, false);

  // 6. Discount Calculator
  const dcNormal = calculateDiscount('120', '25');
  assert(dcNormal.ok && dcNormal.data);
  approxEqual(dcNormal.data.discountAmount, 30);
  approxEqual(dcNormal.data.finalPrice, 90);
  approxEqual(dcNormal.data.percentageSaved, 25);
  assert.strictEqual(calculateDiscount('120', '105').ok, false);
  assert.strictEqual(calculateDiscount('120', '-5').ok, false);

  // 7. Word Counter
  const wcEmpty = analyzeWords('');
  assert.strictEqual(wcEmpty.words, 0);
  assert.strictEqual(wcEmpty.characters, 0);
  const wcSample = analyzeWords('Hola mundo.\nEsto es una prueba!');
  assert.strictEqual(wcSample.words, 6);
  assert.strictEqual(wcSample.sentences, 2);
  assert.strictEqual(wcSample.paragraphs, 2);

  // 8. Character Counter
  const ccUnder = analyzeCharacters('Hola mundo', '20');
  assert.strictEqual(ccUnder.characters, 10);
  assert.strictEqual(ccUnder.charactersNoSpaces, 9);
  assert.strictEqual(ccUnder.remaining, 10);
  assert.strictEqual(ccUnder.isExceeded, false);

  const ccOver = analyzeCharacters('Texto que supera el límite corto', '10');
  assert.strictEqual(ccOver.isExceeded, true);
  assert(ccOver.remaining < 0);

  // 9. Bank Loan / EMI Calculator
  const loanPositive = calculateLoanEMI('10000', '6', '3', 'years', '100');
  assert(loanPositive.ok && loanPositive.data);
  approxEqual(loanPositive.data.monthlyInstallment, 304.22, 0.01);
  approxEqual(loanPositive.data.totalInterestPayable, 951.9, 0.05);
  approxEqual(loanPositive.data.totalRepayment, 10951.9, 0.05);
  approxEqual(loanPositive.data.totalCostWithFee, 11051.9, 0.05);
  assert.strictEqual(loanPositive.data.schedule.length, 36);
  approxEqual(loanPositive.data.schedule[35].remainingBalance, 0, 0.001);

  const loanZeroRate = calculateLoanEMI('12000', '0', '24', 'months', '0');
  assert(loanZeroRate.ok && loanZeroRate.data);
  approxEqual(loanZeroRate.data.monthlyInstallment, 500);
  approxEqual(loanZeroRate.data.totalInterestPayable, 0);
  approxEqual(loanZeroRate.data.totalRepayment, 12000);

  assert.strictEqual(calculateLoanEMI('0', '5', '12', 'months').ok, false);
  assert.strictEqual(calculateLoanEMI('10000', '-2', '12', 'months').ok, false);

  // 10. Salary Calculator across all 6 payment frequencies
  const salMonthly = calculateSalary('2500', 'monthly', '8', '5', '100', '450');
  assert(salMonthly.ok && salMonthly.data);
  approxEqual(salMonthly.data.annual.gross, 30000);
  approxEqual(salMonthly.data.annual.additionalIncome, 1200);
  approxEqual(salMonthly.data.annual.deductions, 5400);
  approxEqual(salMonthly.data.annual.net, 25800);
  approxEqual(salMonthly.data.monthly.net, 2150);
  approxEqual(salMonthly.data.hourly.gross, 30000 / 2080, 0.01);

  const salHourly = calculateSalary('20', 'hourly', '8', '5', '0', '0');
  assert(salHourly.ok && salHourly.data);
  approxEqual(salHourly.data.annual.gross, 41600);
  approxEqual(salHourly.data.weekly.gross, 800);
  approxEqual(salHourly.data.biweekly.gross, 1600);
  approxEqual(salHourly.data.daily.gross, 160);

  // 11. Currency Display Formatting (8 currencies)
  for (const c of CURRENCIES) {
    const formattedEs = formatCurrency(1234.56, c.code, 'es');
    const formattedEn = formatCurrency(1234.56, c.code, 'en');
    assert(formattedEs.includes(c.code));
    assert(formattedEn.includes(c.code));
  }

  // 12. Verify all static files exist, are non-empty, and display CalculaFácil branding
  for (const pair of ROUTE_PAIRS) {
    const esFile = path.join(process.cwd(), pair.esPath.replace(/^\//, ''));
    const enFile = path.join(process.cwd(), pair.enPath.replace(/^\//, ''));
    assert(fs.existsSync(esFile), `Missing ES static file: ${esFile}`);
    assert(fs.existsSync(enFile), `Missing EN static file: ${enFile}`);
    const esContent = fs.readFileSync(esFile, 'utf8');
    const enContent = fs.readFileSync(enFile, 'utf8');
    assert(esContent.length > 1500, `Truncated ES file: ${esFile}`);
    assert(enContent.length > 1500, `Truncated EN file: ${enFile}`);
    assert(esContent.includes('CalculaFácil'), `Missing CalculaFácil brand in ${esFile}`);
    assert(enContent.includes('CalculaFácil'), `Missing CalculaFácil brand in ${enFile}`);
    assert(!esContent.includes('HerramientasFáciles'), `Found old brand in ${esFile}`);
    assert(!enContent.includes('HerramientasFáciles'), `Found old brand in ${enFile}`);
  }

  console.log('ALL 10 CALCULATORS AND 34 STATIC BILINGUAL PAGES PASSED VERIFICATION.');
}

runCalculatorTests();
