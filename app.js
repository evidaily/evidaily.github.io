/**
 * Evidence Daily - app.js
 * Loads recent daily JSON files and renders cards.
 * Homepage shows last 14 days only.
 */

const DAYS_TO_LOAD = 14;
const DATA_PATH = 'data/';

const UI = {
  en: {
    recent: "Recent Evidence",
    last14: "(last 14 days)",
    all: "All",
    space: "Space weather",
    quake: "Earthquakes",
    live: "Live data",
    evidence: "Evidence Chain",
    source: "Source",
    method: "Method",
    limitation: "Limitation",
    loading: "Loading recent data…",
    empty: "No recent data loaded yet.",
    value: "Value"
  },
  zh: {
    recent: "近期證據",
    last14: "（最近 14 天）",
    all: "全部",
    space: "太空天氣",
    quake: "地震",
    live: "即時資料",
    evidence: "證據鏈",
    source: "來源",
    method: "方法",
    limitation: "限制",
    loading: "載入近期資料中…",
    empty: "尚未載入近期資料。",
    value: "數值"
  }
};

function getLang() {
  return localStorage.getItem('evidaily-lang') || 'en';
}

function t(key) {
  const lang = getLang();
  return (UI[lang] && UI[lang][key]) || UI.en[key] || key;
}

function getRecentDates(n = DAYS_TO_LOAD) {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

async function loadDay(dateStr) {
  try {
    const res = await fetch(`${DATA_PATH}${dateStr}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Failed to load', dateStr, e);
    return null;
  }
}

async function loadRecentEntries() {
  const dates = getRecentDates();
  const results = await Promise.all(dates.map(loadDay));
  const all = [];
  for (const day of results) {
    if (day && Array.isArray(day.entries)) {
      all.push(...day.entries);
    }
  }
  all.sort((a, b) => (b.time_utc || '').localeCompare(a.time_utc || ''));
  return all;
}

function renderBar(visual) {
  if (!visual || visual.type !== 'bar') return '';
  const pct = Math.min(100, Math.max(0, ((visual.value - (visual.min || 0)) / ((visual.max || 9) - (visual.min || 0))) * 100));
  return `
    <div class="viz">
      <div class="viz-label">${t('value')} ${visual.value}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
}

function renderEntry(entry, lang) {
  lang = lang || getLang();
  const title = (entry.title && (entry.title[lang] || entry.title.en)) || '';
  const summary = (entry.summary && (entry.summary[lang] || entry.summary.en)) || '';
  const cat = entry.type === 'earthquake' ? 'quake' : 'space';
  const timeStr = entry.time_utc ? entry.time_utc.replace('T', ' ').replace(/\.\d+Z$/, ' UTC').replace('Z', ' UTC') : '';

  let evidenceHtml = '';
  if (entry.evidence) {
    const e = entry.evidence;
    evidenceHtml = `
      <div class="evidence-chain">
        <h4>${t('evidence')}</h4>
        <ul>
          <li>${t('source')}: ${e.source_name || ''} ${e.source_url ? `— <a href="${e.source_url}" target="_blank" rel="noopener">${e.source_url}</a>` : ''}</li>
          ${e.method ? `<li>${t('method')}: ${e.method}</li>` : ''}
          ${e.limitations ? `<li>${t('limitation')}: ${e.limitations}</li>` : ''}
          ${e.event_page ? `<li>Event: <a href="${e.event_page}" target="_blank" rel="noopener">${e.event_page}</a></li>` : ''}
        </ul>
      </div>`;
  }

  return `
    <article class="entry" data-category="${cat}" data-entry-id="${entry.id || ''}">
      <div class="entry-meta">
        <time datetime="${entry.time_utc || ''}">${timeStr}</time>
        <span class="status">${t('live')}</span>
      </div>
      <h3 class="conclusion">${title}</h3>
      ${summary ? `<p class="summary">${summary}</p>` : ''}
      ${renderBar(entry.visual)}
      ${evidenceHtml}
    </article>`;
}

function updateUIText() {
  const lang = getLang();
  const h2 = document.querySelector('section.today h2');
  if (h2) {
    h2.innerHTML = `${t('recent')} <small style="font-weight:400;font-size:0.85em;opacity:0.7">${t('last14')}</small>`;
  }
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const f = btn.dataset.filter;
    if (f === 'all') btn.textContent = t('all');
    else if (f === 'space') btn.textContent = t('space');
    else if (f === 'quake') btn.textContent = t('quake');
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `lang-${lang}`);
  });
}

async function init() {
  const container = document.querySelector('section.today') || document.getElementById('entries-section');
  if (!container) return;

  container.querySelectorAll('article.entry').forEach(el => el.remove());
  const loading = document.getElementById('loading-msg');
  if (loading) loading.remove();

  updateUIText();

  const entries = await loadRecentEntries();

  if (entries.length === 0) {
    container.insertAdjacentHTML('beforeend', `<p class="empty">${t('empty')}</p>`);
    return;
  }

  const lang = getLang();
  const html = entries.map(e => renderEntry(e, lang)).join('\n');
  container.insertAdjacentHTML('beforeend', html);
}

function setLang(lang) {
  localStorage.setItem('evidaily-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
  init();
}

function setFilter(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  document.querySelectorAll('article.entry').forEach(el => {
    if (cat === 'all') el.style.display = '';
    else el.style.display = el.dataset.category === cat ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => setLang(btn.id === 'lang-zh' ? 'zh' : 'en');
  });
  init();
});

window.renderEntry = renderEntry;
window.setLang = setLang;
window.getLang = getLang;
window.t = t;
