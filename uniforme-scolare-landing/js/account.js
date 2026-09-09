(() => {
  'use strict';
  const root = document.getElementById('school-uniforms-landing');
  const dialog = root?.querySelector('#school-account-dialog');
  if (!dialog) return;
  const find = (selector) => dialog.querySelector(selector);
  const form = find('#school-account-form');
  const email = find('#school-account-email');
  const password = find('#school-account-password');
  const status = find('#school-account-status');
  let recovery = false;
  let opener;
  let outsidePress = false;
  let previousOverflow;
  let previousGutter;

  function clearStatus() {
    status.hidden = true;
    status.textContent = '';
  }
  function setMode(isRecovery) {
    recovery = isRecovery;
    password.value = '';
    password.disabled = recovery;
    password.required = !recovery;
    find('#school-account-password-field').hidden = recovery;
    find('#school-account-forgot').hidden = recovery;
    find('#school-account-back').hidden = !recovery;
    find('#school-account-title').textContent = recovery ? 'Recuperează parola' : 'Bine ai revenit';
    find('#school-account-description').textContent = recovery ? 'Introdu adresa de e-mail asociată contului tău.' : 'Intră în cont pentru comenzile și uniformele tale.';
    find('#school-account-submit-label').textContent = recovery ? 'Trimite linkul de resetare' : 'Autentificare';
    clearStatus();
  }
  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-school-account-open]');
    // A real account URL can replace the local target during OpenCart integration.
    if (!trigger || trigger.getAttribute('href') !== '#school-account-dialog') return;
    event.preventDefault();
    if (dialog.open) return;
    opener = trigger;
    form.reset();
    setMode(false);
    previousOverflow = document.documentElement.style.overflow;
    previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = 'stable';
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    email.focus({ preventScroll: true });
  });
  find('[data-school-account-close]').addEventListener('click', () => dialog.close());
  const outsideDialog = (event) => {
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  dialog.addEventListener('pointerdown', (event) => { outsidePress = event.target === dialog && outsideDialog(event); });
  dialog.addEventListener('click', (event) => {
    if (outsidePress && event.target === dialog && outsideDialog(event)) dialog.close();
    outsidePress = false;
  });
  // Keep Tab cycling inside the form, including after switching to recovery.
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button,input,a[href],[tabindex]')].filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  // Native dialog handles Escape and makes the background inert.
  dialog.addEventListener('close', () => {
    form.reset();
    setMode(false);
    outsidePress = false;
    document.documentElement.style.overflow = previousOverflow;
    document.documentElement.style.scrollbarGutter = previousGutter;
    const menuButton = root.querySelector('.school-menu-toggle');
    const visible = (element) => element?.isConnected && element.getClientRects().length > 0;
    // The mobile account link is inside the menu, which closes before the modal opens.
    const target = visible(opener) ? opener : visible(menuButton) ? menuButton : root.querySelector('.school-header-actions [data-school-account-open]');
    if (visible(target)) target.focus({ preventScroll: true });
  });
  find('#school-account-forgot').addEventListener('click', () => { setMode(true); email.focus(); });
  find('#school-account-back').addEventListener('click', () => { setMode(false); email.focus(); });
  form.addEventListener('input', clearStatus);
  form.addEventListener('submit', (event) => {
    // Always local. method="dialog" also prevents a network submission without this handler.
    event.preventDefault();
    clearStatus();
    if (!form.reportValidity()) return;
    password.value = '';
    status.textContent = recovery ? 'Previzualizare: nu a fost trimis niciun e-mail de resetare.' : 'Previzualizare: autentificarea nu este conectată încă. Datele nu au fost trimise.';
    status.hidden = false;
  });
})();
