import 'bootstrap/js/dist/collapse';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';

const onReady = (callback: () => void) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
};

onReady(() => {
  const navbar = document.querySelector<HTMLElement>('#mainNav');
  const brand = document.querySelector<HTMLElement>('.navbar-brand');
  const hero = document.querySelector<HTMLElement>('#inicio');
  const toggler = document.querySelector<HTMLButtonElement>('.navbar-toggler');
  const togglerLabel = toggler?.querySelector<HTMLElement>('.navbar-toggler-label');
  const togglerIcon = toggler?.querySelector<HTMLElement>('i');
  const collapse = document.querySelector<HTMLElement>('#navbarResponsive');
  const scrollTopButton = document.querySelector<HTMLButtonElement>('#scrollToTopBtn');
  const whatsappButton = document.querySelector<HTMLButtonElement>('#whatsappButton');
  const whatsappChat = document.querySelector<HTMLElement>('#whatsappChat');
  const closeChatButton = document.querySelector<HTMLButtonElement>('#closeChat');
  const scrollDownCursor = document.querySelector<HTMLElement>('#scroll-down-cursor');
  const preloader = document.querySelector<HTMLElement>('#preloader');

  const menuLabel = toggler?.dataset.labelMenu ?? '';
  const closeLabel = toggler?.dataset.labelClose ?? '';

  const setMenuState = (open: boolean) => {
    if (togglerLabel) togglerLabel.textContent = open ? closeLabel : menuLabel;
    if (togglerIcon) togglerIcon.className = open ? 'fas fa-times' : 'fas fa-bars';
    toggler?.setAttribute('aria-expanded', String(open));
    toggler?.setAttribute('aria-label', open ? closeLabel : menuLabel);
  };

  const updateNavbar = () => {
    if (!navbar) return;
    const transparent =
      window.innerWidth >= 768 && window.scrollY <= (hero?.clientHeight ?? 0) / 2;
    navbar.classList.toggle('transparent-navbar', transparent);
    if (brand) brand.style.display = transparent ? 'none' : 'block';
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
  window.addEventListener('resize', updateNavbar);

  if (navbar) {
    new ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  collapse?.addEventListener('shown.bs.collapse', () => setMenuState(true));
  collapse?.addEventListener('hidden.bs.collapse', () => setMenuState(false));

  document.querySelectorAll<HTMLAnchorElement>('#navbarResponsive .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (
        toggler &&
        getComputedStyle(toggler).display !== 'none' &&
        collapse?.classList.contains('show')
      ) {
        toggler.click();
      }
    });
  });

  const updateScrollButtons = () => {
    const visible = window.scrollY > 20;
    scrollTopButton?.classList.toggle('show', visible);
    whatsappButton?.classList.toggle('show', visible);
  };

  updateScrollButtons();
  window.addEventListener('scroll', updateScrollButtons, { passive: true });

  scrollTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const closeWhatsApp = () => {
    if (whatsappChat) whatsappChat.style.display = 'none';
    if (whatsappButton) {
      whatsappButton.style.opacity = '1';
      whatsappButton.setAttribute('aria-expanded', 'false');
    }
    if (scrollTopButton) scrollTopButton.style.display = '';
  };

  whatsappButton?.addEventListener('click', () => {
    if (whatsappChat) whatsappChat.style.display = 'block';
    whatsappButton.style.opacity = '0';
    whatsappButton.setAttribute('aria-expanded', 'true');
    if (scrollTopButton) scrollTopButton.style.display = 'none';
  });

  closeChatButton?.addEventListener('click', closeWhatsApp);

  const updateScrollDownCursor = () => {
    if (!scrollDownCursor) return;
    const visible = window.scrollY <= 100;
    scrollDownCursor.style.opacity = visible ? '1' : '0';
    scrollDownCursor.style.pointerEvents = visible ? 'auto' : 'none';
  };

  window.addEventListener('scroll', updateScrollDownCursor, { passive: true });

  const hidePreloader = () => {
    if (preloader) preloader.style.display = 'none';
    updateScrollDownCursor();
  };

  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
  }

  window.setTimeout(hidePreloader, 4000);
});
