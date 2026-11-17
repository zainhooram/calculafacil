/**
 * CalculaFácil — Language & Currency Preference Manager (Vanilla JS)
 * Uses localStorage only for optional language and currency preferences with safe fallbacks.
 */
(function () {
  var STORAGE_LANG_KEY = 'hf_preferred_lang';
  var STORAGE_CURR_KEY = 'hf_preferred_currency';

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
