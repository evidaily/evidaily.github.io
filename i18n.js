const translations = {
  en: {
    title: "Evidence Daily",
    subtitle: "今日可驗證",
    tagline: "One verifiable fact each day. Sources open. Calculations reproducible.",
    "today-heading": "Today's Evidence",
    "status-placeholder": "Skeleton ready — first data point coming soon",
    "placeholder-conclusion": "Site structure is now live. Daily verifiable updates will begin shortly.",
    "placeholder-data": "This is the initial skeleton. Real public data with full evidence chain will appear here.",
    "evidence-heading": "Evidence Chain",
    "placeholder-source": "Source: Repository initialization (this site)",
    "placeholder-method": "Method: Manual first commit to establish structure",
    "placeholder-limit": "Limitation: Placeholder content until first automated data pull",
    "about-heading": "About",
    "about-text": "Evidence Daily publishes one publicly verifiable data point each day, together with its complete evidence chain. Anyone can re-fetch the same source and reproduce the result. No tracking. No login required.",
    footer: "Evidence Daily · Open sources · Reproducible results"
  },
  zh: {
    title: "今日可驗證",
    subtitle: "Evidence Daily",
    tagline: "每天一個可公開驗證的事實。來源開放。計算可重現。",
    "today-heading": "今日證據",
    "status-placeholder": "骨架已就緒 — 第一個數據點即將上線",
    "placeholder-conclusion": "網站結構已上線。每日可驗證更新即將開始。",
    "placeholder-data": "這是初始骨架。真正的公開數據與完整證據鏈將會出現在這裡。",
    "evidence-heading": "證據鏈",
    "placeholder-source": "來源：倉庫初始化（本站）",
    "placeholder-method": "方法：手動首次提交以建立結構",
    "placeholder-limit": "限制：在首次自動數據拉取前為佔位內容",
    "about-heading": "關於",
    "about-text": "「今日可驗證」每天發布一個可公開驗證的數據點，並附上完整證據鏈。任何人都可以重新取得相同來源並重現結果。無追蹤。無需登入。",
    footer: "今日可驗證 · 開放來源 · 可重現結果"
  }
};

function setLang(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-zh").classList.toggle("active", lang === "zh");
  localStorage.setItem("evidaily-lang", lang);
}

// Init
const saved = localStorage.getItem("evidaily-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
setLang(saved);
