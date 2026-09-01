const translations = {
  en: {
    title: "Evidence Daily",
    subtitle: "今日可驗證",
    tagline: "One verifiable fact each day. Sources open. Calculations reproducible.",
    "today-heading": "Today's Evidence",
    "status-live": "Live data",
    "conclusion": "A magnitude 5.2 earthquake occurred southeast of Sarangani, Philippines on 1 September 2026.",
    "data-title": "Key data",
    "data-mag": "Magnitude: 5.2 (mww)",
    "data-place": "Location: 35 km SE of Sarangani, Philippines",
    "data-time": "Origin time: 2026-09-01 13:22:30 UTC",
    "data-depth": "Depth: approximately 121 km",
    "data-felt": "Felt reports: 10 (max intensity ~IV)",
    "evidence-heading": "Evidence Chain",
    "ev-source": "Source: U.S. Geological Survey (USGS) Earthquake Hazards Program — event us7000tdbr",
    "ev-method": "Method: Retrieved from the public USGS GeoJSON feed and event detail endpoint. Magnitude type is moment magnitude (mww). Location and depth are from the reviewed origin.",
    "ev-link": "Direct event page: https://earthquake.usgs.gov/earthquakes/eventpage/us7000tdbr",
    "ev-repro": "Reproducibility: Anyone can open the same public endpoints and obtain the identical magnitude, coordinates, and origin time without authentication.",
    "ev-limit": "Limitation: Depth and exact hypocenter can be refined in later updates; felt intensity is based on a small number of reports.",
    "about-heading": "About",
    "about-text": "Evidence Daily publishes one publicly verifiable data point each day, together with its complete evidence chain. Anyone can re-fetch the same source and reproduce the result. No tracking. No login required.",
    footer: "Evidence Daily · Open sources · Reproducible results"
  },
  zh: {
    title: "今日可驗證",
    subtitle: "Evidence Daily",
    tagline: "每天一個可公開驗證的事實。來源開放。計算可重現。",
    "today-heading": "今日證據",
    "status-live": "即時數據",
    "conclusion": "2026年9月1日，菲律賓薩蘭加尼東南方發生規模 5.2 地震。",
    "data-title": "關鍵數據",
    "data-mag": "規模：5.2（mww）",
    "data-place": "位置：菲律賓薩蘭加尼東南方約 35 公里",
    "data-time": "發震時間：2026-09-01 13:22:30 UTC",
    "data-depth": "深度：約 121 公里",
    "data-felt": "有感回報：10 則（最大烈度約 IV）",
    "evidence-heading": "證據鏈",
    "ev-source": "來源：美國地質調查局（USGS）地震災害計畫 — 事件編號 us7000tdbr",
    "ev-method": "方法：從 USGS 公開 GeoJSON 資料流與事件詳細端點取得。規模類型為矩規模（mww）。位置與深度來自已審核的震源參數。",
    "ev-link": "事件頁面：https://earthquake.usgs.gov/earthquakes/eventpage/us7000tdbr",
    "ev-repro": "可重現性：任何人皆可直接存取相同公開端點，無需登入即可取得相同的規模、座標與發震時間。",
    "ev-limit": "限制：深度與精確震源位置可能在後續更新中微調；有感烈度目前僅基於少數回報。",
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
