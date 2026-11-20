// Progressively enhance the server-rendered docs team. No network requests.
const desk = document.querySelector('.handoff-desk');
if (desk) {
  const people = [...desk.querySelectorAll('[data-person]')];
  const briefs = [...desk.querySelectorAll('[data-brief]')];
  const intents = [...desk.querySelectorAll('[data-intent]')];
  const checks = [...desk.querySelectorAll('[data-check]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'myteam-docs-checklist-v1';
  let selected = '';
  let storageAvailable = false;

  // Storage can be unavailable in private/restricted browsers; the tour still works.
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) checks.forEach(check => { check.checked = saved.includes(check.dataset.check); });
    sessionStorage.setItem(storageKey, JSON.stringify(checks.filter(c => c.checked).map(c => c.dataset.check)));
    storageAvailable = true;
  } catch { /* Keep progress in this page only. */ }

  function updateProgress(brief) {
    const count = [...brief.querySelectorAll('[data-check]')].filter(c => c.checked).length;
    brief.querySelector('[data-progress]').textContent = `${count} / 3 checked`;
  }

  function saveProgress() {
    if (!storageAvailable) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(checks.filter(c => c.checked).map(c => c.dataset.check)));
    } catch {
      storageAvailable = false;
      desk.querySelectorAll('[data-save-note]').forEach(note => { note.textContent = 'Checks last while this page is open.'; });
    }
  }

  function select(id, { focus = false, updateHash = false } = {}) {
    const index = people.findIndex(person => person.dataset.person === id);
    if (index < 0) return;
    const changed = selected !== id;
    selected = id;
    people.forEach(person => {
      const active = person.dataset.person === id;
      person.setAttribute('aria-selected', String(active));
      person.tabIndex = active ? 0 : -1;
    });
    briefs.forEach(brief => { brief.hidden = brief.dataset.brief !== id; });
    intents.forEach(intent => {
      if (intent.dataset.intent === id) intent.setAttribute('aria-current', 'true');
      else intent.removeAttribute('aria-current');
    });
    const panel = briefs[index];
    const nextIndex = people.findIndex(person => person.dataset.person === panel.querySelector('[data-handoff]').dataset.handoff);
    desk.style.setProperty('--route-start', `${(Math.min(index, nextIndex) + .5) * 20}%`);
    desk.style.setProperty('--route-width', `${Math.abs(index - nextIndex) * 20}%`);
    desk.querySelector('.thread-route').style.transformOrigin = nextIndex < index ? 'right' : 'left';
    if (changed && !reducedMotion.matches) {
      panel.animate([{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
      desk.querySelector('.thread-route').animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 360, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
    if (focus) people[index].focus({ preventScroll: true });
    if (updateHash) history.replaceState(null, '', `#team-${id}`);
  }

  // Anchor links and stacked briefs remain usable if this enhancement cannot load.
  desk.querySelector('.people').setAttribute('role', 'tablist');
  people.forEach((person, index) => {
    person.setAttribute('role', 'tab');
    person.setAttribute('aria-controls', `team-${person.dataset.person}`);
    briefs[index].setAttribute('role', 'tabpanel');
    briefs[index].setAttribute('aria-labelledby', person.id);
    briefs[index].tabIndex = 0;
    person.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % people.length;
      if (event.key === 'ArrowLeft') target = (index + people.length - 1) % people.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = people.length - 1;
      if (target !== undefined) {
        event.preventDefault();
        select(people[target].dataset.person, { focus: true, updateHash: true });
      } else if (event.key === ' ') {
        event.preventDefault();
        select(person.dataset.person, { updateHash: true });
      }
    });
  });
  desk.addEventListener('click', event => {
    const link = event.target.closest('[data-person], [data-intent], [data-handoff]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const id = link.dataset.person || link.dataset.intent || link.dataset.handoff;
    select(id, { focus: true, updateHash: true });
    if (link.dataset.handoff) {
      document.getElementById(`person-${id}`).scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  });
  checks.forEach(check => check.addEventListener('change', () => {
    updateProgress(check.closest('[data-brief]'));
    saveProgress();
  }));
  function selectHash() {
    const id = location.hash.replace(/^#team-/, '');
    if (people.some(person => person.dataset.person === id)) select(id);
    else if (!selected) select('leo');
  }
  selectHash();
  addEventListener('hashchange', selectHash);
  if (location.hash === `#team-${selected}`) {
    requestAnimationFrame(() => document.getElementById(`team-${selected}`).scrollIntoView({ block: 'start' }));
  }
  briefs.forEach(brief => {
    updateProgress(brief);
    const reset = brief.querySelector('.reset-checks');
    reset.hidden = false;
    reset.addEventListener('click', () => {
      brief.querySelectorAll('[data-check]').forEach(check => { check.checked = false; });
      updateProgress(brief);
      saveProgress();
    });
  });
  if (storageAvailable) desk.querySelectorAll('[data-save-note]').forEach(note => { note.textContent = 'Saved in this browser tab.'; });
  desk.dataset.enhanced = 'true';
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    let wasOutside = false;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (wasOutside) people.forEach((person, index) => person.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, delay: index * 45, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
        observer.disconnect();
      } else {
        wasOutside = true;
      }
    }, { threshold: .15 });
    observer.observe(desk.querySelector('.people'));
  }
}
