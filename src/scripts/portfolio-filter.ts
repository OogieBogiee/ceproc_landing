import AOS from 'aos';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const initPortfolioFilter = () => {
  const filters = document.querySelectorAll<HTMLAnchorElement>('.portafolio .btn-menu');
  const items = document.querySelectorAll<HTMLElement>('.portafolio .box-img');

  if (!filters.length || !items.length) return;

  const setActive = (active: HTMLAnchorElement) => {
    filters.forEach((filter) => {
      const isActive = filter === active;
      filter.setAttribute('aria-pressed', String(isActive));
      filter.closest('li')?.classList.toggle('active', isActive);
    });
  };

  const showItem = (item: HTMLElement) => {
    item.hidden = false;

    if (prefersReducedMotion()) return;

    item.animate(
      [
        { opacity: 0, transform: 'scale(0.97)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 450, easing: 'ease-out' },
    );
  };

  const applyFilter = (value: string) => {
    items.forEach((item) => {
      if (item.dataset.category === value) {
        showItem(item);
        return;
      }

      item.hidden = true;
    });

    if (!prefersReducedMotion()) AOS.refreshHard();
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', (event) => {
      event.preventDefault();
      const value = filter.dataset.filter;
      if (!value) return;

      setActive(filter);
      applyFilter(value);
    });

    filter.addEventListener('keydown', (event) => {
      if (event.key !== ' ') return;

      event.preventDefault();
      filter.click();
    });
  });
};
