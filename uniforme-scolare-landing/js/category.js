(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-category-page');
  if (!root) return;
  const catalog = window.SchoolCatalog;
  const params = new URLSearchParams(window.location.search);
  const school = catalog.getSchool(params.get('scoala')) || catalog.schools[0];
  const products = catalog.schoolProducts(school);
  const grid = root.querySelector('#school-category-products');
  const form = root.querySelector('#school-filter-form');
  const panel = root.querySelector('#school-filter-panel');
  const toggle = root.querySelector('#school-filter-toggle');
  const done = root.querySelector('#school-filter-done');
  const sort = root.querySelector('#school-sort');
  const chips = root.querySelector('#school-active-filters');
  const count = root.querySelector('#school-results-count');
  const empty = root.querySelector('#school-category-empty');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const alphabetical = new Intl.Collator('ro', { sensitivity: 'base', numeric: true });
  const sorts = ['recomandate', 'pret-crescator', 'pret-descrescator', 'nume'];
  const groups = {
    tip: [...new Map(products.map((product) => [product.type, { value: product.type, label: product.typeName }])).values()],
    marime: [...new Set(products.flatMap((product) => product.sizes))].sort((a, b) => Number(a) - Number(b)).map((value) => ({ value, label: `${value} ani` })),
    culoare: [...new Map(products.map((product) => [product.colorId, { value: product.colorId, label: product.color, swatch: product.swatch }])).values()]
  };
  const selected = { tip: new Set(), marime: new Set(), culoare: new Set() };
  const counters = [];
  let filtersOpen = false;

  document.title = `${school.name} — Uniforme școlare NOVRI`;
  document.querySelector('meta[name="description"]').content = `Descoperă colecția de uniforme NOVRI pentru ${school.name}. Explorează produsele după mărime, culoare și tip.`;
  root.querySelector('#school-category-title').textContent = school.name.replace(/"([^"]+)"/g, '„$1”');
  root.querySelector('#school-category-location').textContent = [...new Set([school.city, school.county].filter(Boolean))].join(' / ');

  function matches(product, except) {
    return Object.entries(selected).every(([key, values]) => {
      if (key === except || values.size === 0) return true;
      if (key === 'marime') return product.sizes.some((value) => values.has(value));
      return values.has(key === 'tip' ? product.type : product.colorId);
    });
  }
  function filterParams() {
    const result = new URLSearchParams();
    Object.entries(selected).forEach(([key, values]) => {
      groups[key].forEach(({ value }) => { if (values.has(value)) result.append(key, value); });
    });
    if (sort.value !== 'recomandate') result.set('sortare', sort.value);
    return result;
  }
  function render(updateUrl = true) {
    const visible = products.filter((product) => matches(product));
    if (sort.value === 'pret-crescator') visible.sort((a, b) => a.priceValue - b.priceValue);
    if (sort.value === 'pret-descrescator') visible.sort((a, b) => b.priceValue - a.priceValue);
    if (sort.value === 'nume') visible.sort((a, b) => alphabetical.compare(a.name, b.name));
    const filters = filterParams();
    const fragment = document.createDocumentFragment();
    visible.forEach((product, index) => fragment.append(catalog.createProductCard(product, { school, filters, eager: index < 3 })));
    grid.replaceChildren(fragment);
    grid.hidden = visible.length === 0;
    empty.hidden = visible.length !== 0;
    const resultText = visible.length === 1 ? '1 produs' : `${visible.length} produse`;
    count.textContent = `${resultText} din ${products.length}`;
    done.firstChild.textContent = `Vezi ${resultText} `;
    const activeCount = Object.values(selected).reduce((sum, values) => sum + values.size, 0);
    root.querySelector('#school-filter-total').textContent = activeCount ? `(${activeCount})` : '';
    root.querySelector('.school-filter-heading [data-school-reset]').hidden = activeCount === 0;
    chips.hidden = activeCount === 0;
    chips.replaceChildren();
    Object.entries(selected).forEach(([key, values]) => {
      groups[key].filter(({ value }) => values.has(value)).forEach(({ value, label }) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'school-filter-chip';
        chip.dataset.filterKey = key;
        chip.dataset.filterValue = value;
        chip.setAttribute('aria-label', `Elimină filtrul ${label}`);
        chip.append(document.createTextNode(label));
        const cross = document.createElement('span');
        cross.textContent = '×';
        cross.setAttribute('aria-hidden', 'true');
        chip.append(cross);
        chips.append(chip);
      });
    });
    counters.forEach(({ key, value, element }) => {
      element.textContent = products.filter((product) => matches(product, key) && (key === 'tip' ? product.type : product.colorId) === value).length;
    });
    if (updateUrl) {
      // Same-document state only. Filters survive refresh and the round trip to a product.
      try { window.history.replaceState(null, '', catalog.categoryUrl(school, filters)); }
      catch { /* Some file:// previews restrict History. Filtering still works. */ }
    }
  }
  function readState() {
    const query = new URLSearchParams(window.location.search);
    Object.keys(selected).forEach((key) => {
      selected[key] = new Set(query.getAll(key).filter((value) => groups[key].some((item) => item.value === value)));
    });
    const requestedSort = query.get('sortare');
    sort.value = sorts.includes(requestedSort) ? requestedSort : 'recomandate';
    form.querySelectorAll('input').forEach((input) => { input.checked = selected[input.name].has(input.value); });
    render(false);
  }
  function buildOptions(key, containerId) {
    const container = root.querySelector(containerId);
    groups[key].forEach(({ value, label, swatch }) => {
      const item = document.createElement('label');
      item.className = key === 'marime' ? 'school-filter-size' : 'school-filter-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = key;
      input.value = value;
      if (key === 'marime') input.className = 'school-visually-hidden';
      item.append(input);
      if (swatch) {
        const dot = document.createElement('span');
        dot.className = 'school-filter-color-dot';
        dot.style.backgroundColor = swatch;
        dot.setAttribute('aria-hidden', 'true');
        item.append(dot);
      }
      const text = document.createElement('span');
      text.textContent = label;
      item.append(text);
      if (key !== 'marime') {
        const counter = document.createElement('small');
        counter.setAttribute('aria-hidden', 'true');
        item.append(counter);
        counters.push({ key, value, element: counter });
      }
      container.append(item);
    });
  }
  function setFiltersOpen(open, returnFocus = false) {
    filtersOpen = open;
    panel.hidden = !desktop.matches && !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (returnFocus && !desktop.matches) toggle.focus();
  }
  function syncLayout() {
    const needsFocus = !desktop.matches && panel.contains(document.activeElement);
    toggle.hidden = desktop.matches;
    setFiltersOpen(false, needsFocus);
  }
  buildOptions('tip', '#school-filter-types');
  buildOptions('marime', '#school-filter-sizes');
  buildOptions('culoare', '#school-filter-colors');
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', (event) => {
    const input = event.target;
    if (!selected[input.name]) return;
    if (input.checked) selected[input.name].add(input.value);
    else selected[input.name].delete(input.value);
    render();
  });
  sort.addEventListener('change', () => render());
  chips.addEventListener('click', (event) => {
    const chip = event.target.closest('button');
    if (!chip) return;
    const position = [...chips.children].indexOf(chip);
    selected[chip.dataset.filterKey].delete(chip.dataset.filterValue);
    form.querySelectorAll('input').forEach((input) => { input.checked = selected[input.name].has(input.value); });
    render();
    const next = chips.children[Math.min(position, chips.children.length - 1)];
    (next || (desktop.matches ? form.querySelector('input') : toggle)).focus();
  });
  root.querySelectorAll('[data-school-reset]').forEach((button) => button.addEventListener('click', () => {
    Object.values(selected).forEach((values) => values.clear());
    form.querySelectorAll('input').forEach((input) => { input.checked = false; });
    render();
    (desktop.matches ? form.querySelector('input') : toggle).focus();
  }));
  toggle.addEventListener('click', () => setFiltersOpen(!filtersOpen));
  done.addEventListener('click', () => setFiltersOpen(false, true));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && filtersOpen && !desktop.matches) setFiltersOpen(false, true);
  });
  desktop.addEventListener('change', syncLayout);
  window.addEventListener('popstate', readState);
  sort.disabled = false;
  readState();
  syncLayout();
})();
