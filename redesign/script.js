/* foodfocus redesign concept — interactions (no dependencies) */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- Content ---------------- */
  const STAGES = [
    {
      id: 'farm', label: 'Farm', icon: 'i-sprout',
      title: 'Primary production',
      intro: 'Growers, packhouses and dairy farms. Focus on residue limits, water quality and lot traceability before produce leaves the farm gate.',
      laws: ['Agricultural Product Standards Act', 'APSA dairy regulations (R1510)', 'PPECB export standards', 'Codex general hygiene principles'],
      checks: ['Pesticide spray & MRL records', 'Irrigation water test certificates', 'Harvest hygiene & pre-cooling logs', 'Lot codes linked to each block'],
      latest: 'Citrus packhouses strengthen phytosanitary & cold-chain logs',
    },
    {
      id: 'processing', label: 'Processing', icon: 'i-factory',
      title: 'Manufacturing & processing',
      intro: 'Factories, abattoirs and dairies. Auditors look hardest at HACCP validation, environmental monitoring and food safety culture.',
      laws: ['Foodstuffs, Cosmetics & Disinfectants Act', 'Hygiene Regulations R638', 'Meat Safety Act 40 of 2000', 'Mycotoxin & contaminant limits'],
      checks: ['Validated HACCP plan & CCP records', 'Certificate of Acceptability on file', 'Zone 1–4 Listeria swabbing', 'CIP validation records'],
      latest: 'FSSC 22000 v6 audits highlight food fraud and culture metrics',
    },
    {
      id: 'packaging', label: 'Packaging', icon: 'i-package',
      title: 'Packaging & labelling',
      intro: 'Labels are the most-changed area of SA food law right now. Draft R3337 brings front-of-pack warnings and stricter claims.',
      laws: ['Labelling Regulations R146', 'Draft R3337 (open for comment)', 'Consumer Protection Act', 'Food-contact material rules'],
      checks: ['Allergens declared in bold', '"May contain" backed by risk assessment', 'Nutrition table & date marking', 'Packaging migration test reports'],
      latest: 'Allergen declarations and "may contain" statements under R146',
    },
    {
      id: 'coldchain', label: 'Cold chain', icon: 'i-truck',
      title: 'Transport & cold chain',
      intro: 'Every food transport vehicle now needs a valid Certificate of Acceptability — and the temperature records to prove control.',
      laws: ['R638 — transport of food', 'Municipal EHP vehicle directive', 'PPECB cold-chain protocols'],
      checks: ['Vehicle CoA displayed', 'Continuous temperature logging', 'Cleaning & sanitation schedule', 'Driver hygiene training records'],
      latest: 'EHP directive: CoA verification for cold-chain vehicles',
    },
    {
      id: 'retail', label: 'Retail', icon: 'i-store',
      title: 'Retail & food service',
      intro: 'Supermarkets, restaurants, caterers and spaza shops. Registration and a valid CoA are now being actively enforced.',
      laws: ['R638 — food premises', 'Municipal business licensing', 'Consumer Protection Act'],
      checks: ['Valid CoA on display', 'Person-in-charge trained', 'Pest control contract & reports', 'Display temperatures recorded'],
      latest: 'Government calls on food businesses to register',
    },
    {
      id: 'consumer', label: 'Consumer', icon: 'i-fork',
      title: 'Consumer protection & recalls',
      intro: 'When something goes wrong. Know your recall duties, reporting obligations and how to trace product one step up and down.',
      laws: ['CPA Section 60 — product recalls', 'NCC recall guidelines', 'Listeriosis — notifiable condition'],
      checks: ['Recall plan tested in last 12 months', 'Complaint log with root-cause', 'One-up, one-down traceability', 'NCC notification contacts ready'],
      latest: 'NCC updates recall notification protocol under Section 60',
    },
  ];

  const NEWS = {
    industry: [
      { img: 'factory', tag: 'Certification & audits', title: 'FSSC 22000 Version 6 transition audits highlight food fraud and culture metrics', text: 'Certification bodies report that documented food safety culture plans and allergen verification remain the top areas flagged during unannounced audits.', src: 'Audit Watch', date: '12 Aug 2025' },
      { img: 'packhouse', tag: 'Export & cold chain', title: 'Citrus and fresh produce packhouses strengthen phytosanitary & cold-chain logs', text: 'Continuous pulp-temperature telemetry from pre-cooling tunnels to port terminals is reducing export rejections during peak winter shipping.', src: 'AgriCompliance Desk', date: '05 Aug 2025' },
      { img: 'dairy', tag: 'Dairy standards', title: 'Updated environmental swabbing guidance for cheese makers', text: 'New zone-based environmental monitoring matrices help cheesemakers pinpoint moisture harbourage sites in drains, cooling rooms and brine tanks.', src: 'Dairy Compliance Network', date: '22 Jul 2025' },
    ],
    supplier: [
      { img: 'lab', tag: 'Testing laboratories', title: 'SANAS-accredited Listeria and Salmonella PCR turnaround cut to 24 hours', text: 'High-throughput molecular screening lets meat, dairy and ready-to-eat processors release cold-chain batches faster with full ISO/IEC 17025 accreditation.', src: 'MicroChem Lab Services', date: '11 Aug 2025' },
      { img: 'dairy', tag: 'Sanitation & hygiene', title: 'Optimising Clean-in-Place water and chemical usage in beverage plants', text: 'Inline conductivity sensors and low-temperature enzymatic detergents are cutting effluent load and steam use by up to 28%.', src: 'EnviroCare Hygiene', date: '04 Aug 2025' },
      { img: 'factory', tag: 'Packaging compliance', title: 'Recyclable mono-material barrier trays gain ground in export lines', text: 'EPR targets are accelerating the shift toward mono-PP and rPET food-contact trays compliant with EU and UK migration limits.', src: 'Polyoak Packaging', date: '25 Jul 2025' },
    ],
  };

  const SUPPLIERS = [
    { name: 'MicroChem Lab Services', mark: 'MC', color: '#0F4C81', cat: 'Laboratories', tagline: 'SANAS ISO/IEC 17025 food & water testing', loc: 'Cape Town · Johannesburg' },
    { name: 'SGS South Africa', mark: 'SGS', color: '#E06D1B', cat: 'Certification', tagline: 'FSSC 22000, BRCGS & GLOBALG.A.P. audits', loc: 'Johannesburg · Durban' },
    { name: 'Testo Instruments', mark: 'testo', color: '#C8102E', cat: 'Instruments', tagline: 'HACCP thermometers, pH meters & data loggers', loc: 'Midrand · National' },
    { name: 'NSF International SA', mark: 'NSF', color: '#1B5E20', cat: 'Certification', tagline: 'Food safety auditing & supply chain assurance', loc: 'Centurion · W. Cape' },
    { name: 'EnviroCare Hygiene', mark: 'EC', color: '#00796B', cat: 'Hygiene & packaging', tagline: 'CIP detergents & food-grade sanitisers', loc: 'Gauteng · KZN' },
    { name: 'Polyoak Packaging', mark: 'PO', color: '#1E3A8A', cat: 'Hygiene & packaging', tagline: 'Food-contact rigid & barrier packaging', loc: 'Cape Town · Durban' },
    { name: 'Intertek Food Services', mark: 'iTK', color: '#B45309', cat: 'Laboratories', tagline: 'Assurance, testing & export inspection', loc: 'Johannesburg · Gqeberha' },
    { name: 'Diversey Food & Beverage', mark: 'DV', color: '#0369A1', cat: 'Hygiene & packaging', tagline: 'Hygiene engineering & biofilm control', loc: 'Johannesburg · Cape Town' },
  ];

  const SEARCH_INDEX = [
    { type: 'Legislation', icon: 'i-scale', title: 'Draft R3337 — Labelling and advertising of foodstuffs', sub: 'Open for comment · closes 15 Dec 2026' },
    { type: 'Legislation', icon: 'i-scale', title: 'R638 — General hygiene requirements for food premises', sub: 'In force · Municipal EHPs' },
    { type: 'Legislation', icon: 'i-scale', title: 'R146 — Allergen and "may contain" declarations', sub: 'Updated guidance note' },
    { type: 'Legislation', icon: 'i-scale', title: 'Meat Safety Act — HMS audit checklist for abattoirs', sub: 'Updated · Provincial Veterinary Public Health' },
    { type: 'Legislation', icon: 'i-scale', title: 'Listeriosis — reporting duties for food businesses', sub: 'In force · NDoH / NICD' },
    { type: 'Legislation', icon: 'i-scale', title: 'Food additive regulations — draft amendment', sub: 'Open for comment · closes 29 Jan 2027' },
    { type: 'Articles', icon: 'i-doc', title: 'The top 10 advantages of digital food safety procedures', sub: 'Food Safety & Quality · 6 min read' },
    { type: 'Articles', icon: 'i-doc', title: 'FSSC 22000 v6 audits highlight food fraud and culture metrics', sub: 'Certification & audits' },
    { type: 'Articles', icon: 'i-doc', title: 'Government calls on food businesses to register', sub: 'Legislation · CoA checklist' },
    { type: 'Webinars', icon: 'i-video', title: 'Draft R3337 labelling — what to prepare now', sub: 'Hahn & Hahn Food Law · 62 min' },
    { type: 'Webinars', icon: 'i-video', title: 'Preparing for municipal R638 hygiene inspections', sub: 'foodfocus Compliance Hub' },
    { type: 'Webinars', icon: 'i-video', title: 'Allergen cross-contact validation & VITAL', sub: 'MicroChem & foodfocus' },
    { type: 'Toolkit', icon: 'i-download', title: 'Environmental Listeria monitoring plan', sub: 'DOCX template' },
    { type: 'Toolkit', icon: 'i-download', title: 'Vehicle CoA inspection sheet', sub: 'XLSX template · R638' },
    ...SUPPLIERS.map((s) => ({ type: 'Suppliers', icon: 'i-badge', title: s.name, sub: `${s.cat} · ${s.tagline}` })),
  ];

  /* ---------------- Utilities ---------------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  /* ---------------- Countdown ---------------- */
  const DAY = 86400000;
  $$('[data-countdown]').forEach((el) => {
    const end = new Date(el.dataset.countdown + 'T23:59:59');
    const days = Math.ceil((end - Date.now()) / DAY);
    if (el.dataset.format === 'big') {
      const strong = $('strong', el);
      const label = $('span', el);
      if (days > 0) {
        strong.textContent = days;
        label.textContent = days === 1 ? 'day left' : 'days left';
      } else {
        strong.textContent = '0';
        label.textContent = 'closed';
      }
      const start = new Date(el.dataset.start);
      const pct = Math.min(100, Math.max(4, ((Date.now() - start) / (end - start)) * 100));
      const bar = $('[data-deadline-bar]');
      if (bar) bar.style.width = pct + '%';
    } else {
      el.textContent = days > 0 ? `closes 15 Dec · ${days} day${days === 1 ? '' : 's'} left` : 'comment period closed';
    }
  });

  /* ---------------- Header ---------------- */
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight nav item for the section in view
  const navLinks = $$('.main-nav a');
  const sectionIds = navLinks.map((a) => a.getAttribute('href').slice(1));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------------- Mobile drawer ---------------- */
  const drawer = $('#drawer');
  const menuBtn = $('[data-open-menu]');
  function setMenu(open) {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('.drawer-panel button', drawer).focus();
  }
  menuBtn.addEventListener('click', () => setMenu(true));
  $$('[data-close-menu]').forEach((el) => el.addEventListener('click', () => setMenu(false)));

  /* ---------------- Farm-to-fork navigator ---------------- */
  const track = $('.journey-track');
  const panel = $('#journey-panel');
  const progress = $('.journey-progress');
  track.insertAdjacentHTML('beforeend', STAGES.map((s, i) => `
    <button class="stage" role="tab" id="stage-${s.id}" aria-controls="journey-panel" aria-selected="false" data-stage="${i}">
      <span class="stage-node">${icon(s.icon)}</span>
      <span class="stage-label">${s.label}</span>
      <span class="stage-step">0${i + 1}</span>
    </button>`).join(''));
  const stageBtns = $$('.stage', track);

  function selectStage(i, focus) {
    const s = STAGES[i];
    stageBtns.forEach((b, j) => {
      b.setAttribute('aria-selected', String(j === i));
      b.tabIndex = j === i ? 0 : -1;
      b.classList.toggle('done', j < i);
    });
    if (focus) stageBtns[i].focus();
    progress.style.width = `${(i / (STAGES.length - 1)) * 84}%`;
    panel.setAttribute('aria-labelledby', 'stage-' + s.id);
    panel.innerHTML = `
      <div class="jp-intro">
        <span class="eyebrow">Stage 0${i + 1}</span>
        <h3 style="margin-top:10px">${esc(s.title)}</h3>
        <p>${esc(s.intro)}</p>
        <a href="#" class="btn btn-primary">View ${esc(s.label.toLowerCase())} guide ${icon('i-arrow', 'icon icon-s')}</a>
      </div>
      <div class="jp-card">
        <h4>${icon('i-scale', 'icon icon-s')} Laws that apply</h4>
        <ul class="jp-laws">${s.laws.map((l) => `<li><a href="#">${esc(l)} ${icon('i-arrow', 'icon icon-s')}</a></li>`).join('')}</ul>
      </div>
      <div class="jp-card">
        <h4>${icon('i-badge', 'icon icon-s')} What auditors check</h4>
        <ul class="jp-check">${s.checks.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        <p class="meta" style="margin-top:14px;padding-top:14px;border-top:1px solid var(--line)">Latest: <a href="#" style="color:var(--text);font-weight:600">${esc(s.latest)}</a></p>
      </div>`;
    // Keep active stage visible on small screens
    const b = stageBtns[i];
    if (panel.dataset.ready && track.scrollWidth > track.clientWidth) {
      track.scrollTo({ left: b.offsetLeft - 24, behavior: 'smooth' });
    }
  }
  stageBtns.forEach((b, i) => b.addEventListener('click', () => selectStage(i)));
  track.addEventListener('keydown', (e) => {
    const cur = stageBtns.findIndex((b) => b.getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowRight') { e.preventDefault(); selectStage((cur + 1) % STAGES.length, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectStage((cur - 1 + STAGES.length) % STAGES.length, true); }
  });
  selectStage(1);
  panel.dataset.ready = '1';

  /* ---------------- News tabs ---------------- */
  const newsGrid = $('#news-grid');
  const tabs = $$('[data-news]');
  function renderNews(kind) {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.news === kind)));
    newsGrid.innerHTML = NEWS[kind].map((n) => `
      <article class="news-card">
        <a href="#" class="card-link" tabindex="-1" aria-hidden="true"><div class="img-frame"><img src="assets/${n.img}.jpg" alt="" loading="lazy" /></div></a>
        <div class="news-body">
          <span class="tag">${esc(n.tag)}</span>
          <h3><a href="#">${esc(n.title)}</a></h3>
          <p>${esc(n.text)}</p>
          <div class="news-foot"><span class="source">${esc(n.src)}</span><span class="meta">${esc(n.date)}</span></div>
        </div>
      </article>`).join('');
  }
  tabs.forEach((t) => t.addEventListener('click', () => renderNews(t.dataset.news)));
  renderNews('industry');

  /* ---------------- Directory ---------------- */
  const cats = ['All', ...new Set(SUPPLIERS.map((s) => s.cat))];
  const chipsEl = $('#dir-chips');
  const dirGrid = $('#dir-grid');
  const dirQ = $('#dir-q');
  let activeCat = 'All';
  chipsEl.innerHTML = cats.map((c) => `<button class="chip" type="button" aria-pressed="${c === 'All'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  function renderDir() {
    const q = dirQ.value.trim().toLowerCase();
    const list = SUPPLIERS.filter((s) =>
      (activeCat === 'All' || s.cat === activeCat) &&
      (!q || (s.name + ' ' + s.tagline + ' ' + s.cat).toLowerCase().includes(q)));
    dirGrid.innerHTML = list.length ? list.map((s) => `
      <a href="#" class="supplier">
        <div class="supplier-top">
          <span class="monogram" style="background:${s.color}">${esc(s.mark)}</span>
          <span class="verified">${icon('i-badge', 'icon icon-s')} Verified</span>
        </div>
        <div><h3>${esc(s.name)}</h3><p>${esc(s.tagline)}</p></div>
        <span class="meta">${icon('i-pin', 'icon icon-s')} ${esc(s.loc)}</span>
      </a>`).join('') : `<div class="dir-empty">No suppliers match “${esc(dirQ.value)}”. Try “lab”, “audit” or “hygiene”.</div>`;
  }
  chipsEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    activeCat = b.dataset.cat;
    $$('.chip', chipsEl).forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    renderDir();
  });
  dirQ.addEventListener('input', renderDir);
  renderDir();

  /* ---------------- Search palette ---------------- */
  const palette = $('#palette');
  const pInput = $('#palette-q');
  const pResults = $('#palette-results');
  let activeIdx = 0;
  let lastFocus = null;

  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return safe;
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  function renderResults() {
    const q = pInput.value.trim();
    const ql = q.toLowerCase();
    const hits = q ? SEARCH_INDEX.filter((r) => (r.title + ' ' + r.sub + ' ' + r.type).toLowerCase().includes(ql)) : SEARCH_INDEX.filter((r) => r.type === 'Legislation').slice(0, 4);
    if (!hits.length) {
      pResults.innerHTML = `<div class="pr-empty">No results for “${esc(q)}”.<br/>Try R638, labelling, Listeria or audit.</div>`;
      return;
    }
    let html = q ? '' : '<div class="pr-group">Trending regulations</div>';
    let group = '';
    hits.forEach((r, i) => {
      if (q && r.type !== group) { group = r.type; html += `<div class="pr-group">${esc(group)}</div>`; }
      html += `<a href="#" class="pr-item${i === activeIdx ? ' active' : ''}" data-idx="${i}">
        <span class="pr-icon">${icon(r.icon, 'icon icon-s')}</span>
        <span><strong>${highlight(r.title, q)}</strong><small>${esc(r.sub)}</small></span></a>`;
    });
    pResults.innerHTML = html;
  }
  function openSearch(prefill) {
    lastFocus = document.activeElement;
    palette.classList.add('open');
    palette.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    pInput.value = prefill || '';
    activeIdx = 0;
    renderResults();
    setTimeout(() => pInput.focus(), 20);
  }
  function closeSearch() {
    palette.classList.remove('open');
    palette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-open-search]').forEach((b) => b.addEventListener('click', () => openSearch()));
  $$('[data-close-search]').forEach((b) => b.addEventListener('click', closeSearch));
  pInput.addEventListener('input', () => { activeIdx = 0; renderResults(); });
  pResults.addEventListener('click', (e) => {
    const a = e.target.closest('.pr-item');
    if (!a) return;
    e.preventDefault();
    closeSearch();
    toast('Prototype: this would open “' + $('strong', a).textContent + '”');
  });
  pInput.addEventListener('keydown', (e) => {
    const items = $$('.pr-item', pResults);
    if (!items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle('active', i === activeIdx));
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter') { e.preventDefault(); items[activeIdx].click(); }
  });
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (e.key === 'Escape') {
      if (palette.classList.contains('open')) closeSearch();
      if (drawer.classList.contains('open')) setMenu(false);
    }
    if (!typing && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
      e.preventDefault();
      openSearch();
    }
  });

  // Hero search + quick topics hand off to the palette
  $('[data-hero-search]').addEventListener('submit', (e) => {
    e.preventDefault();
    openSearch($('#hero-q').value.trim());
  });
  $$('[data-quick]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); openSearch(a.dataset.quick); }));

  /* ---------------- Toolkit + newsletter ---------------- */
  $$('[data-download]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Prototype: enter your email to download “' + $('h3', a).textContent + '”');
  }));
  $('[data-newsletter]').addEventListener('submit', (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('done');
  });

  // Placeholder links in the prototype should not jump to top
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#"]');
    if (a && !a.matches('[data-download], [data-quick], .pr-item')) {
      e.preventDefault();
      toast('Prototype link — page designed in the next phase');
    }
  });

  /* ---------------- Reveal on scroll ---------------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  const yr = $('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
