(() => {
  'use strict';

  const landing = document.getElementById('school-uniforms-landing');
  if (!landing) return;

  // Single source of truth. Counties and schools are sorted automatically in Romanian.
  // Leave county / city empty until confirmed; no location is inferred from the name.
  const schools = [
    {
      name: 'Liceul Teoretic "Mihai Ionescu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/liceul-teoretic-mihai-ionescu'
    },
    {
      name: 'Școala Gimnazială "M. Sântimbreanu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-m-santimbreanu'
    },
    {
      name: 'Școala Gimnazială Nr. 2 "Mihai Viteazul"',
      county: 'Teleorman',
      city: '',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-nr-2-mihai-viteazul'
    },
    {
      name: 'Școala Gimnazială "Mihai Eminescu"',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-mihai-eminescu'
    },
    {
      name: 'Școala Gimnazială Nr. 7',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-nr-7'
    },
    {
      name: 'Liceul Teologic Adventist "Ștefan Demetrescu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/liceul-teologic-adventist-stefan-demetrescu'
    },
    {
      name: 'Școala Gimnazială "Avram Iancu"',
      county: 'București',
      city: 'București',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-avram-iancu'
    },
    {
      name: 'Școala Gimnazială "Ștefan cel Mare"',
      county: 'Teleorman',
      city: '',
      url: 'https://meai.ro/uniforme-scolare/scoala-gimnaziala-stefan-cel-mare'
    },
    {
      name: 'Colegiul Național "AI Cuza" Alexandria',
      county: 'Teleorman',
      city: 'Alexandria',
      url: 'https://meai.ro/uniforme-scolare/colegiul-national-ai-cuza-alexandria'
    }
  ];

  // Set to true to show the optional local school search. No network calls.
  const selectorSettings = { searchEnabled: false };
  const selector = landing.querySelector('.school-school-selector');
  const trigger = landing.querySelector('#school-selector-trigger');
  const panel = landing.querySelector('#school-selector-panel');
  const list = landing.querySelector('#school-listbox');
  const search = landing.querySelector('#school-search-input');
  const searchWrapper = landing.querySelector('#school-selector-search');
  const emptyMessage = landing.querySelector('#school-selector-empty');
  const options = [];
  const countyGroups = [];
  const alphabetical = new Intl.Collator('ro', { sensitivity: 'base', numeric: true });
  let typed = '';
  let typeTimer;

  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('ro');
  const visibleOptions = () => options.filter((option) => !option.hidden);

  function focusOption(option) {
    if (!option) return;
    options.forEach((item) => { item.tabIndex = item === option ? 0 : -1; });
    option.focus({ preventScroll: true });
    // Scroll only the list, not the entire page below the trigger.
    const top = option.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    const headingHeight = option.closest('.school-selector-group').querySelector('.school-selector-group-heading').offsetHeight;
    if (top - headingHeight < list.scrollTop) list.scrollTop = Math.max(0, top - headingHeight);
    if (top + option.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = top + option.offsetHeight - list.clientHeight;
    }
  }

  function resetSearch() {
    search.value = '';
    options.forEach((option) => { option.hidden = false; });
    countyGroups.forEach(({ element }) => { element.hidden = false; });
    emptyMessage.hidden = true;
  }

  function fitSchoolList() {
    if (panel.hidden) return;
    const viewHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    let available = viewHeight - trigger.getBoundingClientRect().bottom;
    if (available < 220) {
      selector.scrollIntoView({ behavior: 'instant', block: 'start' });
      available = viewHeight - trigger.getBoundingClientRect().bottom;
    }
    const searchHeight = selectorSettings.searchEnabled ? searchWrapper.offsetHeight : 0;
    list.style.maxHeight = `${Math.max(120, Math.min(360, available - searchHeight - 28))}px`;
  }

  function openSelector(last = false) {
    closeMenu();
    resetSearch();
    panel.hidden = false;
    list.scrollTop = 0;
    trigger.setAttribute('aria-expanded', 'true');
    fitSchoolList();
    if (selectorSettings.searchEnabled && !last) search.focus({ preventScroll: true });
    else focusOption(last ? options[options.length - 1] : options[0]);
  }

  function closeSelector(returnFocus = false) {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    typed = '';
    window.clearTimeout(typeTimer);
    if (returnFocus) trigger.focus({ preventScroll: true });
  }

  const fragment = document.createDocumentFragment();
  const groupedSchools = new Map();
  schools.forEach((school) => {
    const county = school.county.trim();
    if (!groupedSchools.has(county)) groupedSchools.set(county, []);
    groupedSchools.get(county).push(school);
  });
  const counties = [...groupedSchools.keys()].sort((a, b) => {
    if (!a) return 1;
    if (!b) return -1;
    return alphabetical.compare(a, b);
  });

  function createSchoolOption(school) {
    const option = document.createElement('button');
    const details = document.createElement('span');
    const name = document.createElement('span');
    const arrow = document.createElement('span');
    option.type = 'button';
    option.className = 'school-selector-option';
    option.id = `school-option-${options.length}`;
    option.dataset.schoolName = school.name;
    option.dataset.schoolSearch = normalize(`${school.name} ${school.county} ${school.city}`);
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.tabIndex = -1;
    details.className = 'school-selector-option-details';
    name.className = 'school-selector-option-name';
    name.textContent = school.name;
    details.append(name);
    if (school.city && school.city !== school.county && !normalize(school.name).includes(normalize(school.city))) {
      const city = document.createElement('span');
      city.className = 'school-selector-option-city';
      city.textContent = school.city;
      details.append(city);
    }
    arrow.className = 'school-selector-option-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    option.append(details, arrow);
    option.addEventListener('click', () => {
      option.setAttribute('aria-selected', 'true');
      window.location.href = school.url;
    });
    options.push(option);
    return option;
  }

  counties.forEach((county, index) => {
    const group = document.createElement('div');
    const heading = document.createElement('div');
    const label = document.createElement('span');
    const groupOptions = [];
    group.className = 'school-selector-group';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-labelledby', `school-county-${index}`);
    heading.className = 'school-selector-group-heading';
    label.className = 'school-selector-county-label';
    label.id = `school-county-${index}`;
    label.textContent = county || 'Județ neprecizat';
    heading.append(label);
    group.append(heading);
    groupedSchools.get(county).sort((a, b) => alphabetical.compare(a.name, b.name)).forEach((school) => {
      const option = createSchoolOption(school);
      group.append(option);
      groupOptions.push(option);
    });
    countyGroups.push({ element: group, options: groupOptions });
    fragment.append(group);
  });
  list.append(fragment);
  searchWrapper.hidden = !selectorSettings.searchEnabled;
  trigger.disabled = false;

  trigger.addEventListener('click', () => {
    if (panel.hidden) openSelector();
    else closeSelector();
  });
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    openSelector(event.key === 'ArrowUp');
  });

  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSelector(true);
      return;
    }
    const visible = visibleOptions();
    const current = visible.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = event.key === 'ArrowDown' ? current + 1 : (current < 0 ? visible.length - 1 : current - 1);
      focusOption(visible[(next + visible.length) % visible.length]);
    } else if (document.activeElement !== search && ['Home', 'End'].includes(event.key)) {
      event.preventDefault();
      focusOption(event.key === 'Home' ? visible[0] : visible[visible.length - 1]);
    } else if (document.activeElement !== search && event.key.length === 1 && event.key !== ' ' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      // Type-ahead is available even while the optional search field is hidden.
      typed += normalize(event.key);
      window.clearTimeout(typeTimer);
      typeTimer = window.setTimeout(() => { typed = ''; }, 700);
      const matched = visible.find((option) => normalize(option.dataset.schoolName).startsWith(typed));
      focusOption(matched);
    }
    // Enter / Space use the button's native activation. Tab is never trapped.
  });

  search.addEventListener('input', () => {
    const query = normalize(search.value.trim());
    options.forEach((option) => { option.hidden = !option.dataset.schoolSearch.includes(query); });
    countyGroups.forEach((group) => { group.element.hidden = group.options.every((option) => option.hidden); });
    emptyMessage.hidden = visibleOptions().length > 0;
  });
  selector.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!selector.contains(document.activeElement)) closeSelector();
    });
  });
  window.addEventListener('resize', fitSchoolList);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', fitSchoolList);

  // The same navigation becomes a compact disclosure on smaller viewports.
  const menuButton = landing.querySelector('.school-menu-toggle');
  const menu = landing.querySelector('#school-menu');
  const header = landing.querySelector('.school-header');
  const desktop = window.matchMedia('(min-width: 1024px)');

  function closeMenu(returnFocus = false) {
    menu.hidden = !desktop.matches;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Deschide meniul');
    if (returnFocus) menuButton.focus();
  }
  function syncMenu() {
    const focusedInMenu = menu.contains(document.activeElement);
    menuButton.hidden = desktop.matches;
    closeMenu(focusedInMenu && !desktop.matches);
  }
  menuButton.addEventListener('click', () => {
    const willOpen = menu.hidden;
    closeSelector();
    menu.hidden = !willOpen;
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Închide meniul' : 'Deschide meniul');
    if (willOpen) menu.querySelector('a').focus();
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  header.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!header.contains(document.activeElement)) closeMenu();
    });
  });
  desktop.addEventListener('change', syncMenu);
  syncMenu();
  landing.classList.add('school-ready');

  document.addEventListener('pointerdown', (event) => {
    if (!selector.contains(event.target)) closeSelector();
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!panel.hidden) closeSelector(true);
    if (!desktop.matches && !menu.hidden) closeMenu(true);
  });

  landing.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    // Changing href to an actual URL is sufficient to activate a placeholder.
    if (link.hasAttribute('data-school-placeholder') && link.getAttribute('href') === '#') {
      event.preventDefault();
      return;
    }
    if (link.hasAttribute('data-school-selector-link')) {
      event.preventDefault();
      closeSelector();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      selector.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
      trigger.focus({ preventScroll: true });
    }
  });
})();
