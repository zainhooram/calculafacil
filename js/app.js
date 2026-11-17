/**
 * CalculaFácil — Main Interactive UI Controller (Vanilla JS)
 */
document.addEventListener('DOMContentLoaded', function () {
  if (window.__CF_REACT_MOUNTED__) return;
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
