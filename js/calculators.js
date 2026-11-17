/**
 * CalculaFácil — Complete Vanilla JavaScript Calculator Engines
 * Implements all 10 tools with full validation, multi-currency formatting,
 * reducing-balance loan EMI amortization, salary frequency conversion, and live text counters.
 */
(function () {
  var CURRENCIES = [{"code":"EUR","symbol":"€","localeEs":"es-ES","localeEn":"en-IE","nameEs":"Euro (EUR €)","nameEn":"Euro (EUR €)"},{"code":"USD","symbol":"$","localeEs":"es-US","localeEn":"en-US","nameEs":"Dólar estadounidense (USD $)","nameEn":"US Dollar (USD $)"},{"code":"MXN","symbol":"$","localeEs":"es-MX","localeEn":"en-US","nameEs":"Peso mexicano (MXN $)","nameEn":"Mexican Peso (MXN $)"},{"code":"ARS","symbol":"$","localeEs":"es-AR","localeEn":"en-US","nameEs":"Peso argentino (ARS $)","nameEn":"Argentine Peso (ARS $)"},{"code":"COP","symbol":"$","localeEs":"es-CO","localeEn":"en-US","nameEs":"Peso colombiano (COP $)","nameEn":"Colombian Peso (COP $)"},{"code":"CLP","symbol":"$","localeEs":"es-CL","localeEn":"en-US","nameEs":"Peso chileno (CLP $)","nameEn":"Chilean Peso (CLP $)"},{"code":"GBP","symbol":"£","localeEs":"es-ES","localeEn":"en-GB","nameEs":"Libra esterlina (GBP £)","nameEn":"British Pound (GBP £)"},{"code":"PKR","symbol":"Rs","localeEs":"es-ES","localeEn":"en-PK","nameEs":"Rupia pakistaní (PKR Rs)","nameEn":"Pakistani Rupee (PKR Rs)"}];

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
      var words = trimmed === '' ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
      var chars = raw.length;
      var noSpaces = raw.replace(/\s/g, '').length;
      var sentences = trimmed === '' ? 0 : trimmed.split(/[.!?]+/).map(function (s) { return s.trim(); }).filter(Boolean).length;
      var paragraphs = trimmed === '' ? 0 : raw.split(/\r?\n+/).map(function (p) { return p.trim(); }).filter(Boolean).length;
      return { words: words, chars: chars, noSpaces: noSpaces, sentences: sentences, paragraphs: paragraphs };
    },

    charCount: function (text, limitRaw) {
      var raw = text || '';
      var trimmed = raw.trim();
      var lim = parseNum(limitRaw);
      var limit = Number.isFinite(lim) && lim > 0 ? Math.floor(lim) : 155;
      var chars = raw.length;
      var noSpaces = raw.replace(/\s/g, '').length;
      var words = trimmed === '' ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
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
