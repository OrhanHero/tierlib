import { findPetByChip, formatChip, isValidChip, pets } from './data.js';

const icons = {
  records: '<path d="M4 4h7l2 2h7v14H4z"/><path d="M8 11h8M8 15h6"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3m6-3v3m-6 12v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3m-11-5h4v4h-4z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  warning: '<path d="M10.3 4.9a2 2 0 0 1 3.4 0l7.7 12.6a2 2 0 0 1-1.7 3H4.3a2 2 0 0 1-1.7-3z"/><path d="M12 9v4m0 3h.01"/>',
  share: '<path d="M12 16V3m-4 4 4-4 4 4M5 13v7h14v-7"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/>',
  eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
};
const sections = new Map([
  ['uebersicht', 'Übersicht'],
  ['impfungen', 'Impfungen'],
  ['verlauf', 'Verlauf'],
]);
const eventLabels = { visit: 'Besuch', vaccine: 'Impfung', note: 'Vermerk' };
const main = document.querySelector('#main');
const navigation = document.querySelector('#navigation');
const breadcrumb = document.querySelector('#breadcrumb');
const workspace = {
  icon: document.querySelector('#workspace-icon'),
  name: document.querySelector('#workspace-name'),
  role: document.querySelector('#workspace-role'),
};
const shareDialog = document.querySelector('#share-dialog');
const shareBody = document.querySelector('#share-body');

// This represents the decision in the demo only. Nothing is sent or persisted.
const simulatedShares = new Map();
const shareLabels = {
  pending: 'Zustimmung steht aus.',
  approved: 'Notfallprofil für den Demo-Notdienst freigegeben.',
  declined: 'Freigabe wurde abgelehnt.',
};
let lastQuery = '';
let searchSubmitted = false;

function icon(name) {
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
}

function recordLink(pet, section = 'uebersicht') {
  return '#akte/' + pet.id + (section === 'uebersicht' ? '' : '/' + section);
}

function emergencyLink(pet) {
  return '#notfallprofil/' + pet.id;
}

function avatar(pet, large = false) {
  return `<span class="avatar${large ? ' large' : ''}" data-pet="${pet.id}" aria-hidden="true">${pet.initials}</span>`;
}

function identity(pet) {
  return `<div class="identity">
    ${avatar(pet)}
    <span><strong>${pet.name}</strong><small>${pet.species} · ${pet.breed}</small></span>
  </div>`;
}

function heading(title, description) {
  return `<div class="heading"><h1>${title}</h1><p>${description}</p></div>`;
}

function meta(label, value, extraClass = '') {
  return `<div class="record-meta ${extraClass}"><small>${label}</small><strong>${value}</strong></div>`;
}

function showNavigation(current, label, view = 'practice') {
  navigation.hidden = view !== 'practice';
  navigation.innerHTML = view !== 'practice' ? '' : `
    <a class="nav-link" href="#tiere"${current === 'tiere' ? ' aria-current="page"' : ''}>${icon('records')}Tierübersicht</a>
    <a class="nav-link" href="#chip-suche"${current === 'chip-suche' ? ' aria-current="page"' : ''}>${icon('chip')}Chip-Suche</a>`;
  const context = {
    practice: ['TP', 'Demo-Praxis', 'Praxisansicht'],
    recipient: ['ND', 'Demo-Notdienst', 'Empfängeransicht'],
    owner: ['TH', 'Tierhalter:in', 'Halteransicht'],
  }[view];
  [workspace.icon.textContent, workspace.name.textContent, workspace.role.textContent] = context;
  breadcrumb.innerHTML = `<span>${workspace.role.textContent}</span><span aria-hidden="true">/</span><strong>${label}</strong>`;
}

function overview() {
  const records = pets.map((pet) => `
    <li class="pet-row">
      ${identity(pet)}
      ${meta('Mikrochip', formatChip(pet.chip), 'chip-number')}
      ${meta('Stammpraxis', pet.clinic, 'clinic')}
      <a class="button secondary" href="${recordLink(pet)}" aria-label="Akte für ${pet.name} öffnen">Akte öffnen</a>
    </li>`).join('');

  main.innerHTML = `
    ${heading('Tierübersicht', 'Alle verfügbaren Tierakten der Demo-Praxis im Überblick.')}
    <section class="hero" aria-labelledby="quick-search">
      <div class="hero-copy">
        <span class="hero-icon">${icon('chip')}</span>
        <div>
          <h2 id="quick-search">Akte per Chipnummer finden</h2>
          <p>Suche mit der 15-stelligen Mikrochipnummer eines Tieres.</p>
        </div>
      </div>
      <a href="#chip-suche" class="button primary">${icon('search')}Zur Chip-Suche</a>
    </section>
    <section class="panel" aria-labelledby="records-title">
      <div class="panel-head"><h2 id="records-title">Tierakten</h2><span class="count">${pets.length} Testakten</span></div>
      <ul class="pet-list">${records}</ul>
    </section>`;
}

function chipSearch() {
  main.innerHTML = `
    ${heading('Chip-Suche', 'Ordne eine Mikrochipnummer genau einer Tierakte zu.')}
    <div class="search-layout">
      <section class="search-card" aria-labelledby="search-title">
        <h2 id="search-title">Mikrochipnummer suchen</h2>
        <form id="chip-form" novalidate>
          <label for="chip">Mikrochipnummer</label>
          <div class="search-line">
            <input id="chip" name="chip" inputmode="numeric" autocomplete="off" spellcheck="false"
              maxlength="29" placeholder="15-stellige Nummer" aria-describedby="chip-hint search-error">
            <button type="submit" class="button primary">${icon('search')}Suchen</button>
          </div>
          <p class="hint" id="chip-hint">Leerzeichen und Bindestriche sind erlaubt.</p>
          <p class="form-error" id="search-error" role="alert"></p>
        </form>
        <p id="search-announcement" class="sr-only" role="status"></p>
        <div id="search-result" class="search-result" hidden></div>
      </section>
      <aside class="side-note">
        <h3>Für die Demo</h3>
        <p>Verwende eine fiktive Chipnummer aus der Tierübersicht. Die Suche ist auf die drei Testakten beschränkt.</p>
      </aside>
    </div>`;

  const form = main.querySelector('#chip-form');
  const input = main.querySelector('#chip');
  const result = main.querySelector('#search-result');
  const error = main.querySelector('#search-error');
  const announcement = main.querySelector('#search-announcement');

  function clearFeedback() {
    result.hidden = true;
    result.replaceChildren();
    error.textContent = '';
    announcement.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  function showResult() {
    clearFeedback();
    if (!isValidChip(lastQuery)) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = 'Gib eine vollständige Chipnummer mit 15 Ziffern ein.';
      input.focus();
      return;
    }

    const pet = findPetByChip(lastQuery);
    if (!pet) {
      result.innerHTML = '<p><strong>Keine Tierakte gefunden.</strong></p><p>Prüfe die Chipnummer und suche erneut.</p>';
      announcement.textContent = 'Keine Tierakte gefunden.';
    } else {
      result.innerHTML = `<p><strong>1 Tierakte gefunden</strong></p>
        <div class="search-match">
          ${identity(pet)}
          <a class="button secondary" href="${recordLink(pet)}" aria-label="Akte für ${pet.name} öffnen">Akte öffnen</a>
        </div>`;
      announcement.textContent = 'Eine Tierakte gefunden. ' + pet.name + '.';
    }
    result.hidden = false;
  }

  input.value = lastQuery;
  if (searchSubmitted) showResult();

  input.addEventListener('input', () => {
    lastQuery = input.value;
    searchSubmitted = false;
    clearFeedback();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    lastQuery = input.value;
    searchSubmitted = true;
    showResult();
  });
}

function entryDate(value) {
  const [day, month, year] = value.split('.');
  return `<time datetime="${year}-${month}-${day}">${value}</time>`;
}

function history(entries) {
  if (!entries.length) return '<p>In dieser Testakte sind noch keine Einträge vorhanden.</p>';
  return `<ul class="entries">${entries.map((entry) => `
    <li class="entry">
      ${entryDate(entry.date)}
      <div>
        <div class="entry-heading"><h3>${entry.title}</h3>${entry.kind ? `<span class="entry-tag">${eventLabels[entry.kind]}</span>` : ''}</div>
        <p>${entry.note}</p>
      </div>
    </li>`).join('')}</ul>`;
}

function sectionBody(pet, section) {
  if (section === 'impfungen') {
    return '<h2>Impfungen</h2>' + history(pet.vaccinations.map((item) => ({ ...item, title: item.label })));
  }
  if (section === 'verlauf') {
    return '<h2>Verlauf</h2>' + history(pet.timeline);
  }
  return '<h2>Letzte Einträge</h2>' + history(pet.timeline.slice(0, 2));
}

function openShareDialog(pet) {
  shareBody.innerHTML = `
    <form id="share-form">
      <div class="dialog-header">
        <h2 id="share-title">Notfallfreigabe anfragen</h2>
        <button type="button" id="close-share" class="icon-button" aria-label="Dialog schließen">${icon('close')}</button>
      </div>
      <p class="dialog-copy">In der Demo entscheidest du in der Halteransicht über die Anfrage. Die Simulation läuft in diesem Tab.</p>
      <dl class="share-fields">
        <dt>Tierakte</dt><dd>${pet.name}</dd>
        <dt>Empfänger</dt><dd>Demo-Notdienst</dd>
        <dt>Umfang</dt><dd>Tiername und Allergiehinweis</dd>
      </dl>
      <div class="dialog-actions">
        <button type="button" id="cancel-share" class="button secondary" autofocus>Abbrechen</button>
        <button type="submit" class="button primary">Anfrage erstellen</button>
      </div>
    </form>`;

  shareBody.querySelector('#close-share').addEventListener('click', () => shareDialog.close());
  shareBody.querySelector('#cancel-share').addEventListener('click', () => shareDialog.close());
  shareBody.querySelector('#share-form').addEventListener('submit', (event) => {
    event.preventDefault();
    simulatedShares.set(pet.id, 'pending');
    shareDialog.close();
    render();
    main.querySelector('#owner-preview').focus();
  });
  shareDialog.showModal();
}

function record(pet, section) {
  const alert = pet.allergy
    ? `<section class="alert" aria-labelledby="allergy-title">
        ${icon('warning')}
        <div><h2 id="allergy-title">Allergiehinweis · ${pet.allergy.name}</h2><p>${pet.allergy.note}</p></div>
      </section>`
    : `<section class="notice" aria-labelledby="allergy-title">
        <h2 id="allergy-title">Allergiehinweise</h2><p>Für diese Testakte ist kein Hinweis hinterlegt.</p>
      </section>`;
  const shareState = simulatedShares.get(pet.id);
  const canRequest = shareState !== 'pending' && shareState !== 'approved';
  const links = [...sections.entries()].map(([key, label]) => `
    <a class="section-link" href="${recordLink(pet, key)}"${key === section ? ' aria-current="page"' : ''}>${label}</a>`).join('');

  main.innerHTML = `
    <a class="back" href="#tiere">Zur Tierübersicht</a>
    <section class="panel record-header" aria-labelledby="pet-name">
      <div class="title-row">
        <div class="pet-title">
          ${avatar(pet, true)}
          <div><h1 id="pet-name">${pet.name}</h1><p>${pet.species} · ${pet.breed} · ${pet.age} · ${pet.sex}</p></div>
        </div>
        <div class="record-actions">
          <a id="recipient-preview" class="button ${shareState === 'approved' ? 'primary' : 'secondary'}" href="${emergencyLink(pet)}">${icon('eye')}Empfängeransicht</a>
          <a id="owner-preview" class="button ${shareState === 'pending' ? 'primary' : 'secondary'}" href="#halter/${pet.id}">Halteransicht</a>
          ${canRequest ? `<button id="share-record" class="button primary" type="button">${icon('share')}Freigabe anfragen</button>` : ''}
        </div>
      </div>
      <div class="facts">
        ${meta('Mikrochip', formatChip(pet.chip), 'chip-number')}
        ${meta('Stammpraxis', pet.clinic)}
        ${meta('Nächster Termin', pet.nextVisit ? pet.nextVisit.date + ' · ' + pet.nextVisit.title : 'Kein Termin eingetragen')}
      </div>
    </section>
    ${alert}
    ${shareState ? `<div class="notice sharing-result">
      <p id="request-status" role="status">${shareLabels[shareState]}</p>
      ${canRequest ? '' : `<button id="revoke-share" class="button text-button" type="button">${shareState === 'approved' ? 'Freigabe widerrufen' : 'Anfrage zurückziehen'}</button>`}
    </div>` : ''}
    <section class="panel record-content" aria-label="Akte für ${pet.name}">
      <nav class="sections" aria-label="Aktenbereiche">${links}</nav>
      <div class="record-body">${sectionBody(pet, section)}</div>
    </section>`;

  if (!canRequest) {
    main.querySelector('#revoke-share').addEventListener('click', () => {
      simulatedShares.delete(pet.id);
      render();
      main.querySelector('#share-record').focus();
    });
  } else {
    main.querySelector('#share-record').addEventListener('click', () => openShareDialog(pet));
  }
}

function ownerView(pet) {
  if (!pet) {
    main.innerHTML = `<section class="panel empty"><h1>Tierakte nicht gefunden</h1>
      <p>Wähle zuerst eine Testakte in der Praxisansicht aus.</p>
      <a class="button primary" href="#tiere">Zur Tierübersicht</a></section>`;
    return;
  }

  const state = simulatedShares.get(pet.id);
  const actions = state === 'pending'
    ? '<button id="owner-approve" class="button primary" type="button">Zustimmen</button><button id="owner-decline" class="button secondary" type="button">Ablehnen</button>'
    : state === 'approved'
      ? '<button id="owner-revoke" class="button secondary" type="button">Freigabe widerrufen</button>'
      : '';

  main.innerHTML = `
    <a id="back-to-record" class="back" href="${recordLink(pet)}">Zur Praxisansicht</a>
    ${heading('Halteransicht', 'Hier entscheidest du über die simulierte Freigabe.')}
    <section class="panel recipient-card" aria-labelledby="owner-status">
      <h2 id="owner-status" tabindex="-1">${shareLabels[state] ?? 'Keine offene Anfrage'}</h2>
      ${state ? `<dl class="share-fields">
        <dt>Tierakte</dt><dd>${pet.name}</dd>
        <dt>Empfänger</dt><dd>Demo-Notdienst</dd>
        <dt>Umfang</dt><dd>Tiername und Allergiehinweis</dd>
      </dl>` : '<p>Eine Anfrage kann in der Praxisansicht erstellt werden.</p>'}
      ${actions ? `<div class="dialog-actions">${actions}</div>` : ''}
    </section>`;

  function decide(nextState) {
    if (nextState) simulatedShares.set(pet.id, nextState);
    else simulatedShares.delete(pet.id);
    ownerView(pet);
    main.querySelector('#owner-status').focus();
  }

  main.querySelector('#owner-approve')?.addEventListener('click', () => decide('approved'));
  main.querySelector('#owner-decline')?.addEventListener('click', () => decide('declined'));
  main.querySelector('#owner-revoke')?.addEventListener('click', () => decide(null));
}

function emergencyProfile(pet) {
  const backLink = pet ? recordLink(pet) : '#tiere';
  const active = pet && simulatedShares.get(pet.id) === 'approved';
  const content = active
    ? `<section id="emergency-profile" class="panel recipient-card" aria-labelledby="recipient-status">
        <h2 id="recipient-status">Freigabe aktiv</h2>
        <dl class="recipient-fields">
          <div><dt>Tiername</dt><dd>${pet.name}</dd></div>
          <div><dt>Allergiehinweis</dt><dd>${pet.allergy?.name ?? 'Kein Hinweis hinterlegt'}</dd></div>
        </dl>
      </section>`
    : `<section id="emergency-unavailable" class="panel recipient-card recipient-unavailable" aria-labelledby="recipient-status">
        <span class="hero-icon">${icon('lock')}</span>
        <div><h2 id="recipient-status">Keine Freigabe aktiv</h2><p>Für dieses Notfallprofil sind derzeit keine Angaben freigegeben.</p></div>
      </section>`;

  main.innerHTML = `
    <a id="back-to-practice" class="back" href="${backLink}">Zur Praxisansicht</a>
    ${heading('Notfallprofil', 'Empfängeransicht für den Demo-Notdienst.')}
    ${content}`;
}

function render(moveFocus = false) {
  const [route, id, section] = location.hash.slice(1).split('/');
  if (route === 'chip-suche') {
    showNavigation('chip-suche', 'Chip-Suche');
    chipSearch();
  } else if (route === 'notfallprofil') {
    showNavigation(null, 'Notfallprofil', 'recipient');
    emergencyProfile(pets.find((item) => item.id === id));
  } else if (route === 'halter') {
    showNavigation(null, 'Freigaben', 'owner');
    ownerView(pets.find((item) => item.id === id));
  } else if (route === 'akte') {
    const pet = pets.find((item) => item.id === id);
    showNavigation(null, pet ? 'Tierakte · ' + pet.name : 'Tierakte');
    if (pet) {
      record(pet, sections.has(section) ? section : 'uebersicht');
    } else {
      main.innerHTML = `<section class="panel empty">
        <h1>Tierakte nicht gefunden</h1><p>Diese Adresse führt zu keiner Testakte.</p>
        <a class="button primary" href="#tiere">Zur Tierübersicht</a>
      </section>`;
    }
  } else {
    showNavigation('tiere', 'Tierübersicht');
    overview();
  }
  if (moveFocus) main.focus();
}

document.querySelector('.skip-link').addEventListener('click', (event) => {
  event.preventDefault();
  main.focus();
});

addEventListener('hashchange', () => {
  if (shareDialog.open) shareDialog.close();
  render(true);
  window.scrollTo(0, 0);
});

render();
