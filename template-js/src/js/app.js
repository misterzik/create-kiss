import '../scss/app.scss';

const SCROLL_THRESHOLD = 48;

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => [...document.querySelectorAll(selector)];

const updateYear = () => {
  const yearElement = select('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

const handleNavbarScroll = () => {
  const navbar = select('.navbar');
  if (!navbar) {
    return;
  }

  if (window.scrollY > SCROLL_THRESHOLD) {
    navbar.classList.add('nav-scroll');
  } else {
    navbar.classList.remove('nav-scroll');
  }
};

const setupNavigation = () => {
  const navToggle = select('[data-nav-toggle]');
  const primaryNav = select('#primary-nav');

  if (!navToggle || !primaryNav) {
    return;
  }

  const toggleNav = () => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', () => {
    toggleNav();
  });

  selectAll('#primary-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (primaryNav.classList.contains('is-open')) {
        toggleNav();
      }
    });
  });
};

const initApp = () => {
  updateYear();
  setupNavigation();
  handleNavbarScroll();

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
};

document.addEventListener('DOMContentLoaded', initApp);
