(() => {
  'use strict';
  const root = document.querySelector('#school-uniforms-landing.school-contact-page');
  if (!root) return;
  const find = (selector) => root.querySelector(selector);
  const form = find('#school-contact-form');
  const subject = find('#school-contact-subject');
  const dialog = find('#school-contact-dialog');
  const summary = find('#school-contact-form-error');
  const message = find('#school-contact-message');
  const fields = ['name', 'email', 'message', 'privacy'].map((name) => find(`#school-contact-${name}`));
  const subjects = {
    modele: 'Faceți și alte modele față de cele prezente pe site?',
    culori: 'Putem schimba culorile produselor?',
    sicap: 'Putem comanda și prin SICAP?',
    scoala: 'Povestește-ne despre școala ta și uniformele pe care vi le doriți.',
    'alta-intrebare': 'Scrie-ne întrebarea ta în câmpul de mai jos.'
  };
  function updateSubject() {
    find('#school-contact-subject-help').textContent = subjects[subject.value] || 'Alege un subiect sau scrie-ne direct mai jos.';
  }
  subject.addEventListener('change', updateSubject);
  const initialSubject = new URLSearchParams(window.location.search).get('subiect');
  if (Object.hasOwn(subjects, initialSubject)) subject.value = initialSubject;
  updateSubject();
  find('[data-school-contact-form-link]').addEventListener('click', (event) => {
    event.preventDefault();
    find('#school-contact-name').focus();
  });
  root.querySelectorAll('[data-school-partner-contact]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    subject.value = 'scoala';
    updateSubject();
    // Native focus scroll respects the page's reduced-motion styles.
    find('#school-contact-name').focus();
  }));

  function clearError(field) {
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    find(`#${field.id}-error`).hidden = true;
  }
  function errorFor(field) {
    if (field.type === 'checkbox') return field.checked ? '' : 'Bifează acordul pentru a verifica formularul demonstrativ.';
    if (!field.value.trim()) return field === message ? 'Scrie un mesaj.' : field.type === 'email' ? 'Completează adresa de e-mail.' : 'Completează numele tău.';
    if (field.type === 'email' && !field.validity.valid) return 'Introdu o adresă de e-mail validă.';
    return '';
  }
  fields.forEach((field) => field.addEventListener('input', () => {
    if (!errorFor(field)) clearError(field);
    if (!fields.some((input) => input.hasAttribute('aria-invalid'))) summary.hidden = true;
  }));
  function updateCount() { find('#school-contact-character-count').textContent = `${message.value.length} / ${message.maxLength}`; }
  message.addEventListener('input', updateCount);
  updateCount();

  function openDialog(title, text) {
    find('#school-contact-dialog-title').textContent = title;
    find('#school-contact-dialog-description').textContent = text;
    if (!dialog.open) dialog.showModal();
  }
  find('#school-contact-policy-button').addEventListener('click', () => {
    openDialog('Confidențialitate', 'Aici va fi afișată politica magazinului la integrare. Formularul demonstrativ nu trimite și nu salvează datele introduse.');
  });
  root.querySelectorAll('[data-school-contact-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  form.addEventListener('submit', (event) => {
    // Demo only. No HTTP submission, e-mail, API, storage or analytics.
    event.preventDefault();
    summary.hidden = true;
    let firstInvalid = null;
    fields.forEach((field) => {
      clearError(field);
      const text = errorFor(field);
      if (!text) return;
      const error = find(`#${field.id}-error`);
      error.textContent = text;
      error.hidden = false;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', error.id);
      firstInvalid ||= field;
    });
    if (firstInvalid) {
      summary.textContent = 'Verifică câmpurile marcate înainte de a continua.';
      summary.hidden = false;
      firstInvalid.focus();
      return;
    }
    openDialog('Previzualizare completă.', 'Formularul a fost verificat doar pe acest dispozitiv. Mesajul nu a fost trimis și datele nu au fost salvate. Pentru a ne contacta acum, folosește numerele de telefon afișate pe pagină.');
  });
  find('#school-contact-submit').disabled = false;

  const mapButton = find('#school-contact-map-button');
  mapButton.hidden = false;
  mapButton.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = find('#school-contact-map-link').href;
    frame.title = 'Locația AUROCOM SRL în Peretu — Google Maps';
    frame.width = '1320';
    frame.height = '420';
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    frame.tabIndex = 0;
    const container = find('#school-contact-map-frame');
    container.replaceChildren(frame);
    container.hidden = false;
    mapButton.setAttribute('aria-expanded', 'true');
    find('#school-contact-map-placeholder').hidden = true;
    frame.focus();
  }, { once: true });
})();
