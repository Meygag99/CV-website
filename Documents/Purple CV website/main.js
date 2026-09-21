const navLinks = document.querySelectorAll('.nav-links a');
const tabButtons = document.querySelectorAll('.tab-btn');
const pages = document.querySelectorAll('.page');
const panels = document.querySelectorAll('.tab-panel');

function updateNavigation(currentHash) {
  const route = currentHash.replace('#', '') || 'home';

  pages.forEach((page) => {
    page.classList.toggle('active', page.dataset.page === route.split('/')[0]);
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute('href').replace('#', '');
    const active = target === route.split('/')[0];
    link.classList.toggle('active', active);
  });

  const tab = route.split('/')[1];
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tab;
    button.classList.toggle('active', isActive);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.tab === tab);
  });
}

function handleHashChange() {
  const hash = window.location.hash || '#home';
  const validRoute = ['home', 'experience', 'skills', 'education', 'experience/azure', 'experience/hawo'].includes(hash.slice(1))
    ? hash.slice(1)
    : 'home';

  if (window.location.hash !== `#${validRoute}`) {
    window.history.replaceState(null, '', `#${validRoute}`);
  }

  updateNavigation(`#${validRoute}`);
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    window.location.hash = href;
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = button.getAttribute('href');
  });
});

window.addEventListener('hashchange', handleHashChange);
handleHashChange();

