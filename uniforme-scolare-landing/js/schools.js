(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-directory-page');
  const catalog = window.SchoolCatalog;
  if (!root || !catalog) return;
  const find = (selector) => root.querySelector(selector);
  const search = find('#school-directory-search');
  const countyNav = find('#school-directory-counties');
  const list = find('#school-directory-groups');
  const template = find('#school-directory-card-template');
  const count = find('#school-directory-count');
  const resetButton = find('#school-directory-reset');
  const clearButton = find('#school-directory-search-clear');
  const alphabetical = new Intl.Collator('ro', { sensitivity: 'base', numeric: true });
  const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('ro').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const labelFor = (county) => county || 'Județ neprecizat';
  const grouped = new Map();
  const groups = [];
  let selectedCounty = null;
  let announceTimer;

  catalog.schools.forEach((school) => {
    const county = (school.county || '').trim();
    if (!grouped.has(county)) grouped.set(county, []);
    grouped.get(county).push(school);
  });
  const counties = [...grouped.keys()].sort((a, b) => !a ? 1 : !b ? -1 : alphabetical.compare(a, b));

  function createCard(school, index) {
    const card = template.content.firstElementChild.cloneNode(true);
    const link = card.querySelector('a');
    const heading = card.querySelector('h3');
    const location = card.querySelector('.school-directory-card-location');
    const lettering = card.querySelector('.school-directory-lettering');
    const emblem = card.querySelector('img');
    heading.id = `school-directory-item-${index}`;
    heading.textContent = school.name;
    location.id = `${heading.id}-location`;
    location.textContent = school.city || labelFor(school.county);
    link.href = catalog.categoryUrl(school);
    link.setAttribute('aria-labelledby', heading.id);
    link.setAttribute('aria-describedby', location.id);
    // Typography is a fallback, not a fabricated institution emblem.
    lettering.textContent = school.name.match(/"([^"]+)"/)?.[1] || school.name;
    if (school.emblem) {
      emblem.src = `assets/${school.emblem}`;
      emblem.hidden = false;
      lettering.hidden = true;
      if (index < 3) emblem.loading = 'eager';
      emblem.addEventListener('error', () => { emblem.hidden = true; lettering.hidden = false; }, { once: true });
    }
    return { card, school, searchable: normalize(`${school.name} ${school.county || ''} ${school.city || ''}`) };
  }
  let itemIndex = 0;
  counties.forEach((county, index) => {
    const section = document.createElement('section');
    section.className = 'school-directory-group';
    const header = document.createElement('div');
    header.className = 'school-directory-group-heading';
    const heading = document.createElement('h2');
    heading.id = `school-directory-county-${index}`;
    heading.textContent = labelFor(county);
    section.setAttribute('aria-labelledby', heading.id);
    const groupCount = document.createElement('span');
    groupCount.className = 'school-directory-group-count';
    header.append(heading, groupCount);
    const grid = document.createElement('ul');
    grid.className = 'school-directory-grid';
    const cards = grouped.get(county).sort((a, b) => alphabetical.compare(a.name, b.name)).map((school) => createCard(school, itemIndex++));
    grid.append(...cards.map((entry) => entry.card));
    section.append(header, grid);
    list.append(section);
    groups.push({ county, section, count: groupCount, cards });
  });
  function countyButton(label, county) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.setAttribute('aria-pressed', String(county === selectedCounty));
    button.setAttribute('aria-controls', list.id);
    button.addEventListener('click', () => {
      selectedCounty = county;
      render();
    });
    countyNav.append(button);
    return { county, button };
  }
  const countyButtons = [countyButton('Toate județele', null), ...counties.map((county) => countyButton(labelFor(county), county))];

  function render({ updateUrl = true, typing = false } = {}) {
    const words = normalize(search.value).split(' ').filter(Boolean);
    let visibleCount = 0;
    groups.forEach((group) => {
      let groupCount = 0;
      group.cards.forEach((entry) => {
        const visible = (selectedCounty === null || selectedCounty === group.county) && words.every((word) => entry.searchable.includes(word));
        entry.card.hidden = !visible;
        if (visible) groupCount++;
      });
      group.section.hidden = !groupCount;
      group.count.textContent = `${groupCount} ${groupCount === 1 ? 'școală' : 'școli'}`;
      visibleCount += groupCount;
    });
    countyButtons.forEach(({ county, button }) => button.setAttribute('aria-pressed', String(county === selectedCounty)));
    find('#school-directory-empty').hidden = visibleCount > 0;
    resetButton.hidden = !search.value && selectedCounty === null;
    clearButton.hidden = !search.value;
    clearTimeout(announceTimer);
    const announce = () => { count.textContent = `${visibleCount} ${visibleCount === 1 ? 'școală' : 'școli'}${visibleCount === catalog.schools.length ? '' : ` din ${catalog.schools.length}`}`; };
    // Filter immediately, but avoid screen-reader announcements on every keystroke.
    if (typing) announceTimer = setTimeout(announce, 180);
    else announce();
    if (updateUrl) {
      const params = new URLSearchParams();
      if (search.value.trim()) params.set('q', search.value.trim());
      if (selectedCounty !== null) params.set('judet', labelFor(selectedCounty));
      const url = `${window.location.pathname}${params.size ? `?${params}` : ''}${window.location.hash}`;
      try { window.history.replaceState(null, '', url); }
      catch { /* The standalone file preview can work without history access. */ }
    }
  }
  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    search.value = (params.get('q') || '').slice(0, search.maxLength);
    const requested = params.get('judet');
    selectedCounty = requested ? counties.find((county) => normalize(labelFor(county)) === normalize(requested)) ?? null : null;
    render({ updateUrl: false });
  }
  function reset() {
    search.value = '';
    selectedCounty = null;
    render();
    search.focus();
  }
  resetButton.addEventListener('click', reset);
  find('#school-directory-empty-reset').addEventListener('click', reset);
  clearButton.addEventListener('click', () => { search.value = ''; render(); search.focus(); });
  search.addEventListener('input', () => render({ typing: true }));
  search.addEventListener('search', () => render());
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && search.value) {
      event.preventDefault();
      search.value = '';
      render();
    }
  });
  find('[data-school-directory-search-link]').addEventListener('click', (event) => { event.preventDefault(); search.focus(); });
  window.addEventListener('popstate', readUrl);
  window.addEventListener('pageshow', (event) => { if (event.persisted) readUrl(); });
  find('#school-directory-controls').hidden = false;
  countyNav.hidden = false;
  readUrl();
})();
