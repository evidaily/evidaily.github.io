/**
 * Evidence Daily - app.js
 * Loads recent daily JSON files and renders cards.
 * Homepage shows last 14 days only.
 */

const DAYS_TO_LOAD = 14;
const DATA_PATH = 'data/';

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
  // newest first
  all.sort((a, b) => (b.time_utc || '').localeCompare(a.time_utc || ''));
  return all;
}

function renderBar(visual) {
  if (!visual || visual.type !== 'bar') return '';
  const pct = Math.min(100, Math.max(0, ((visual.value - visual.min) / (visual.max - visual.min)) * 100));
  return `
    <div class="viz">
      <div class="viz-label">${visual.label || `Value ${visual.value}`}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
}

function renderEntry(entry, lang = 'en') {
  const title = (entry.title && entry.title[lang]) || (entry.title && entry.title.en) || '';
  const summary = (entry.summary && entry.summary[lang]) || (entry.summary && entry.summary.en) || '';
  const cat = entry.type === 'earthquake' ? 'quake' : 'space';
  const timeStr = entry.time_utc ? entry.time_utc.replace('T', ' ').replace('Z', ' UTC') : '';

  let evidenceHtml = '';
  if (entry.evidence) {
    const e = entry.evidence;
    evidenceHtml = `
      <div class="evidence-chain">
        <h4>Evidence Chain</h4>
        <ul>
          <li>Source: ${e.source_name || ''} ${e.source_url ? `— <a href="${e.source_url}" target="_blank" rel="noopener">${e.source_url}</a>` : ''}</li>
          ${e.method ? `<li>Method: ${e.method}</li>` : ''}
          ${e.limitations ? `<li>Limitation: ${e.limitations}</li>` : ''}
          ${e.event_page ? `<li>Event page: <a href="${e.event_page}" target="_blank" rel="noopener">${e.event_page}</a></li>` : ''}
        </ul>
      </div>`;
  }

  return `
    <article class="entry" data-category="${cat}" data-entry-id="${entry.id || ''}">
      <div class="entry-meta">
        <time datetime="${entry.time_utc || ''}">${timeStr}</time>
        <span class="status">Live data</span>
      </div>
      <h3 class="conclusion">${title}</h3>
      ${summary ? `<p class="summary">${summary}</p>` : ''}
      ${renderBar(entry.visual)}
      ${evidenceHtml}
    </article>`;
}

async function init() {
  const container = document.querySelector('section.today') || document.getElementById('entries');
  if (!container) return;

  // Clear old static entries if any (keep filter bar)
  const oldEntries = container.querySelectorAll('article.entry');
  oldEntries.forEach(el => el.remove());

  const lang = localStorage.getItem('evidaily-lang') || 'en';
  const entries = await loadRecentEntries();

  if (entries.length === 0) {
    container.insertAdjacentHTML('beforeend', '<p class="empty">No recent data loaded yet. Migration in progress.</p>');
    return;
  }

  const html = entries.map(e => renderEntry(e, lang)).join('\n');
  container.insertAdjacentHTML('beforeend', html);
}

// Language helper (basic)
function setLang(lang) {
  localStorage.setItem('evidaily-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `lang-${lang}`);
  });
  // Re-render for new structure
  init();
}

document.addEventListener('DOMContentLoaded', () => {
  // Preserve existing theme toggle if present
  init();
});
