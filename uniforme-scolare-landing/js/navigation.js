(() => {
  'use strict';
  const landing = document.getElementById('school-uniforms-landing');
  if (!landing) return;
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
  document.addEventListener('pointerdown', (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches && !menu.hidden) closeMenu(true);
  });
  landing.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-school-placeholder]');
    if (link && link.getAttribute('href') === '#') event.preventDefault();
  });
  desktop.addEventListener('change', syncMenu);
  syncMenu();
  landing.classList.add('school-ready');
})();
