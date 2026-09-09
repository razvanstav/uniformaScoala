(() => {
  'use strict';
  const root = document.getElementById('school-uniforms-landing');
  const dialog = root?.querySelector('#school-account-dialog');
  if (!dialog) return;
  const find = (selector) => dialog.querySelector(selector);
  const form = find('#school-account-form');
  const email = find('#school-account-email');
  const password = find('#school-account-password');
  const confirmation = find('#school-account-password-confirm');
  const status = find('#school-account-status');
  const modes = {
    login: { title: 'Bine ai revenit', description: 'Intră în cont pentru comenzile și uniformele tale.', submit: 'Autentificare' },
    recovery: { title: 'Recuperează parola', description: 'Introdu adresa de e-mail asociată contului tău.', submit: 'Trimite linkul de resetare' },
    register: { title: 'Înregistrare cont', description: 'Creează-ți contul NOVRI. Câmpurile marcate cu * sunt obligatorii.', submit: 'Creează contul' }
  };
  let mode = 'login';
  let opener;
  let outsidePress = false;
  let previousOverflow;
  let previousGutter;

  function clearStatus() {
    status.hidden = true;
    status.textContent = '';
  }
  function setMode(nextMode) {
    mode = nextMode;
    const recovery = mode === 'recovery';
    const registration = mode === 'register';
    dialog.dataset.schoolAccountMode = mode;
    password.value = '';
    confirmation.value = '';
    confirmation.setCustomValidity('');
    password.disabled = recovery;
    password.required = !recovery;
    find('#school-account-credentials').hidden = recovery;
    find('#school-account-personal-heading').hidden = !registration;
    find('#school-account-password-heading').hidden = !registration;
    find('#school-account-email-label').textContent = registration ? 'Adresa de e-mail *' : 'Adresa de e-mail';
    find('#school-account-password-label').textContent = registration ? 'Parolă *' : 'Parolă';
    dialog.querySelectorAll('[data-school-register-field]').forEach((field) => {
      field.hidden = !registration;
      field.querySelectorAll('input').forEach((input) => { input.disabled = !registration; });
    });
    find('#school-account-forgot').hidden = mode !== 'login';
    find('#school-account-register-prompt').hidden = mode !== 'login';
    find('#school-account-back').hidden = mode === 'login';
    find('#school-account-title').textContent = modes[mode].title;
    find('#school-account-description').textContent = modes[mode].description;
    find('#school-account-submit-label').textContent = modes[mode].submit;
    find('.school-account-body').scrollTop = 0;
    clearStatus();
  }
  function focusFirstField() {
    (mode === 'register' ? find('#school-account-firstname') : email).focus({ preventScroll: true });
  }
  function checkPasswords() {
    confirmation.setCustomValidity(mode === 'register' && confirmation.value !== password.value ? 'Parolele nu coincid.' : '');
  }
  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-school-account-open]');
    // A real account URL can replace the local target during OpenCart integration.
    if (!trigger || trigger.getAttribute('href') !== '#school-account-dialog') return;
    event.preventDefault();
    if (dialog.open) return;
    opener = trigger;
    form.reset();
    setMode(trigger.dataset.schoolAccountOpen === 'register' ? 'register' : 'login');
    previousOverflow = document.documentElement.style.overflow;
    previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = 'stable';
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    focusFirstField();
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
    setMode('login');
    outsidePress = false;
    document.documentElement.style.overflow = previousOverflow;
    document.documentElement.style.scrollbarGutter = previousGutter;
    const menuButton = root.querySelector('.school-menu-toggle');
    const visible = (element) => element?.isConnected && element.getClientRects().length > 0;
    // The mobile account link is inside the menu, which closes before the modal opens.
    const target = visible(opener) ? opener : visible(menuButton) ? menuButton : root.querySelector('.school-header-actions [data-school-account-open]');
    if (visible(target)) target.focus({ preventScroll: true });
  });
  find('#school-account-forgot').addEventListener('click', () => { setMode('recovery'); focusFirstField(); });
  find('#school-account-back').addEventListener('click', () => { setMode('login'); focusFirstField(); });
  find('#school-account-register').addEventListener('click', () => { setMode('register'); focusFirstField(); });
  form.addEventListener('input', () => { clearStatus(); checkPasswords(); });
  form.addEventListener('submit', (event) => {
    // Always local. method="dialog" also prevents a network submission without this handler.
    event.preventDefault();
    clearStatus();
    checkPasswords();
    if (!form.reportValidity()) return;
    password.value = '';
    confirmation.value = '';
    confirmation.setCustomValidity('');
    status.textContent = mode === 'register' ? 'Previzualizare: contul nu a fost creat. Datele nu au fost trimise.' : mode === 'recovery' ? 'Previzualizare: nu a fost trimis niciun e-mail de resetare.' : 'Previzualizare: autentificarea nu este conectată încă. Datele nu au fost trimise.';
    status.hidden = false;
    status.scrollIntoView({ block: 'nearest' });
  });
})();
