const translations = {
  en: {
    title: "Evidence Daily",
    subtitle: "今日可驗證",
    tagline: "One verifiable fact each day. Sources open. Calculations reproducible.",
    "today-heading": "Today's Evidence",
    "status-live": "Live data",
    "status-secondary": "Earlier today",
    "conclusion": "A magnitude 4.6 earthquake occurred east-northeast of Mutsu, Japan on 1 September 2026.",
    "viz-mag": "Magnitude scale (0–10). Marker at 4.6",
    "data-title": "Key data",
    "data-mag": "Magnitude: 4.6 (mb)",
    "data-place": "Location: 78 km ENE of Mutsu, Japan",
    "data-time": "Origin time: 2026-09-01 19:21:23 UTC",
    "data-depth": "Depth: approximately 74 km",
    "data-id": "Event ID: us7000tdfa",
    "evidence-heading": "Evidence Chain",
    "ev-source": "Source: U.S. Geological Survey (USGS) Earthquake Hazards Program — event us7000tdfa",
    "ev-method": "Method: Retrieved from the public USGS M4.5+ past-day GeoJSON feed. Selected the newest event in that feed. Magnitude type is body-wave magnitude (mb). Location and depth are the feed origin parameters at retrieval time.",
    "ev-link": "Direct event page: https://earthquake.usgs.gov/earthquakes/eventpage/us7000tdfa",
    "ev-feed": "Feed used: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
    "ev-repro": "Reproducibility: Anyone can open the same public endpoints and obtain the identical magnitude, coordinates, and origin time without authentication.",
    "ev-limit": "Limitation: mb can differ from later moment-magnitude revisions; depth and hypocenter may be refined. The past-day feed is a rolling window, so older events drop off.",
    "kp-conclusion": "Planetary geomagnetic activity remained quiet: latest estimated Kp = 0.00 (below G1 storm threshold).",
    "viz-kp": "Estimated Kp (0–9). Marker at 0.00",
    "kp-data-title": "Key data",
    "kp-time": "Sample time: 2026-09-01 22:01 UTC",
    "kp-est": "Estimated Kp: 0.00 (label 0Z)",
    "kp-max": "Max estimated Kp in recent ~3 h window: 1.67",
    "kp-source": "Source: NOAA Space Weather Prediction Center public JSON — planetary_k_index_1m.json",
    "kp-method": "Method: Took the last record of the 1-minute estimated planetary Kp series and the maximum estimated_kp among the last 180 samples.",
    "kp-link": "Kp JSON: https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
    "kp-repro": "Reproducibility: The endpoint is public, unauthenticated, and returns the same numeric fields used here.",
    "kp-limit": "Limitation: 1-minute estimated Kp is a nowcast, not the final official 3-hour Kp; values can be revised. F10.7 noon flux was omitted this cycle because the published series on the public endpoint was stale.",
    "about-heading": "About",
    "about-text": "Evidence Daily publishes one publicly verifiable data point each day, together with its complete evidence chain. Anyone can re-fetch the same source and reproduce the result. No login required. Page views are counted with a lightweight public counter.",
    footer: "Evidence Daily · Open sources · Reproducible results",
    "views-label": "Views",
    "visitors-label": "Visitors"
  },
  zh: {
    title: "今日可驗證",
    subtitle: "Evidence Daily",
    tagline: "每天一個可公開驗證的事實。來源開放。計算可重現。",
    "today-heading": "今日證據",
    "status-live": "即時數據",
    "status-secondary": "稍早更新",
    "conclusion": "2026年9月1日，日本陸奧東北東方發生規模 4.6 地震。",
    "viz-mag": "規模標尺（0–10）。標記在 4.6",
    "data-title": "關鍵數據",
    "data-mag": "規模：4.6（mb）",
    "data-place": "位置：日本陸奧東北東約 78 公里",
    "data-time": "發震時間：2026-09-01 19:21:23 UTC",
    "data-depth": "深度：約 74 公里",
    "data-id": "事件編號：us7000tdfa",
    "evidence-heading": "證據鏈",
    "ev-source": "來源：美國地質調查局（USGS）地震災害計畫 — 事件編號 us7000tdfa",
    "ev-method": "方法：從 USGS 公開「過去一日 M4.5+」GeoJSON 資料流取得，選取該資料流中最新一筆。規模類型為體波規模（mb）。位置與深度為取數當下的震源參數。",
    "ev-link": "事件頁面：https://earthquake.usgs.gov/earthquakes/eventpage/us7000tdfa",
    "ev-feed": "使用資料流：https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
    "ev-repro": "可重現性：任何人皆可直接存取相同公開端點，無需登入即可取得相同的規模、座標與發震時間。",
    "ev-limit": "限制：mb 可能與後續矩規模修訂不同；深度與精確震源位置可能再調整。過去一日資料流為滾動視窗，較舊事件會離開清單。",
    "kp-conclusion": "行星地磁活動維持平靜：最新估計 Kp = 0.00（低於 G1 磁暴門檻）。",
    "viz-kp": "估計 Kp（0–9）。標記在 0.00",
    "kp-data-title": "關鍵數據",
    "kp-time": "取樣時間：2026-09-01 22:01 UTC",
    "kp-est": "估計 Kp：0.00（標籤 0Z）",
    "kp-max": "近約 3 小時窗最大估計 Kp：1.67",
    "kp-source": "來源：NOAA 太空天氣預測中心公開 JSON — planetary_k_index_1m.json",
    "kp-method": "方法：取 1 分鐘估計行星 Kp 序列的最後一筆，並計算最近 180 筆的最大 estimated_kp。",
    "kp-link": "Kp JSON：https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
    "kp-repro": "可重現性：端點公開、無需金鑰，回傳欄位與本頁數值一致。",
    "kp-limit": "限制：1 分鐘估計 Kp 屬即時推估，非正式 3 小時 Kp，後續可能修正。本輪省略 F10.7，因公開端點上的正午通量序列已過時。",
    "about-heading": "關於",
    "about-text": "「今日可驗證」每天發布一個可公開驗證的數據點，並附上完整證據鏈。任何人都可以重新取得相同來源並重現結果。無需登入。頁面瀏覽次數由輕量公開計數服務統計。",
    footer: "今日可驗證 · 開放來源 · 可重現結果",
    "views-label": "瀏覽",
    "visitors-label": "訪客"
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

const saved = localStorage.getItem("evidaily-lang") || (navigator.language.startsWith("zh") ? "zh" : "en");
setLang(saved);
