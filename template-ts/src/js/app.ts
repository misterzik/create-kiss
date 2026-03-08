import '../scss/app.scss';

const SCROLL_THRESHOLD = 48;

const select = (selector: string): HTMLElement | null => document.querySelector(selector);
const selectAll = (selector: string): HTMLElement[] => [...document.querySelectorAll(selector)] as HTMLElement[];

const updateYear = (): void => {
  const yearElement = select('#year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
};

const handleNavbarScroll = (): void => {
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

const setupNavigation = (): void => {
  const navToggle = select('[data-nav-toggle]');
  const primaryNav = select('#primary-nav');

  if (!navToggle || !primaryNav) {
    return;
  }

  const toggleNav = (): void => {
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', () => {
    toggleNav();
  });

  selectAll('#primary-nav a').forEach((link: HTMLElement) => {
    link.addEventListener('click', () => {
      if (primaryNav.classList.contains('is-open')) {
        toggleNav();
      }
    });
  });
};

const initApp = (): void => {
  updateYear();
  setupNavigation();
  handleNavbarScroll();

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
};

document.addEventListener('DOMContentLoaded', initApp);
