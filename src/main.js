import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500-italic.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-900.css';
import './style.css';

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
function activate(id, focus = false) {
  const selected = tabs.find(tab => tab.getAttribute('aria-controls') === id) || tabs[0];
  tabs.forEach(tab => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => { panel.hidden = panel.id !== selected.getAttribute('aria-controls'); });
  document.title = `F*CK DINNER — ${selected.lastChild.textContent.trim()}`;
  if (focus) selected.focus();
}
function navigate(id, focus = false) {
  if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  activate(id, focus);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => navigate(tab.getAttribute('aria-controls')));
  tab.addEventListener('keydown', event => {
    const destinations = {ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1};
    if (!(event.key in destinations)) return;
    event.preventDefault();
    navigate(tabs[destinations[event.key]].getAttribute('aria-controls'), true);
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.hash.slice(1);
    if (!panels.some(panel => panel.id === id)) return;
    event.preventDefault();
    navigate(id);
    document.getElementById(id).focus({preventScroll: true});
    window.scrollTo({top: 0, behavior: 'instant'});
  });
});
window.addEventListener('popstate', () => activate(location.hash.slice(1)));
window.addEventListener('hashchange', () => activate(location.hash.slice(1)));
activate(location.hash.slice(1));

// This file is supplied in public/assets and copied to /assets by Vite.
// Bind it directly; globbing /public paths doesn't produce a usable browser URL.
const portrait = document.getElementById('liza-portrait');
const portraitPending = document.getElementById('portrait-pending');
if (portrait && portraitPending) {
  portrait.addEventListener('load', () => {
    portrait.hidden = false;
    portraitPending.hidden = true;
  });
  portrait.addEventListener('error', () => {
    portrait.hidden = true;
    portraitPending.hidden = false;
  });
  portrait.src = '/assets/liza-profile.jpg';
}
