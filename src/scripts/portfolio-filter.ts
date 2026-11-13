const DURATION = 500;

const PROPERTIES = [
  'height',
  'width',
  'opacity',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
] as const;

type Property = (typeof PROPERTIES)[number];
type Animation = { frame: number; resolve: () => void };

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const swing = (progress: number) => 0.5 - Math.cos(progress * Math.PI) / 2;

const animations = new WeakMap<HTMLElement, Animation>();

const cancel = (item: HTMLElement) => {
  const animation = animations.get(item);
  if (!animation) return;

  cancelAnimationFrame(animation.frame);
  animations.delete(item);
  animation.resolve();
};

const clearStyles = (item: HTMLElement) => {
  PROPERTIES.forEach((property) => item.style.removeProperty(property));
  item.style.removeProperty('overflow');
};

const measure = (item: HTMLElement) => {
  const style = getComputedStyle(item);

  return PROPERTIES.reduce<Record<Property, number>>(
    (values, property) => {
      if (property === 'height') {
        values[property] = item.offsetHeight;
      } else if (property === 'width') {
        values[property] = item.offsetWidth;
      } else {
        values[property] = parseFloat(style.getPropertyValue(property)) || 0;
      }

      return values;
    },
    {} as Record<Property, number>,
  );
};

const write = (item: HTMLElement, property: Property, value: number) => {
  const unit = property === 'opacity' ? '' : 'px';
  item.style.setProperty(property, `${value}${unit}`);
};

const animate = (item: HTMLElement, mode: 'hide' | 'show') =>
  new Promise<void>((resolve) => {
    cancel(item);

    if (mode === 'show') {
      item.hidden = false;
      clearStyles(item);
    }

    const natural = measure(item);
    item.style.overflow = 'hidden';

    PROPERTIES.forEach((property) => {
      write(item, property, mode === 'show' ? 0 : natural[property]);
    });

    void item.offsetHeight;

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = swing(progress);

      PROPERTIES.forEach((property) => {
        const value =
          mode === 'show'
            ? natural[property] * eased
            : natural[property] * (1 - eased);

        write(item, property, value);
      });

      if (progress < 1) {
        const animation = animations.get(item);
        if (animation) animation.frame = requestAnimationFrame(step);
        return;
      }

      animations.delete(item);

      if (mode === 'hide') {
        item.hidden = true;
      }

      clearStyles(item);
      resolve();
    };

    animations.set(item, { frame: requestAnimationFrame(step), resolve });
  });

export const initPortfolioFilter = () => {
  const filters = document.querySelectorAll<HTMLAnchorElement>('.portafolio .btn-menu');
  const items = Array.from(document.querySelectorAll<HTMLElement>('.portafolio .box-img'));

  if (!filters.length || !items.length) return;

  let run = 0;

  const setActive = (active: HTMLAnchorElement) => {
    filters.forEach((filter) => {
      const isActive = filter === active;
      filter.setAttribute('aria-pressed', String(isActive));
      filter.closest('li')?.classList.toggle('active', isActive);
    });
  };

  const applyFilter = async (value: string) => {
    const current = ++run;
    const targets = items.filter((item) => item.dataset.category === value);
    const visible = items.filter((item) => !item.hidden);

    if (prefersReducedMotion()) {
      items.forEach((item) => {
        cancel(item);
        item.hidden = item.dataset.category !== value;
        clearStyles(item);
      });
      return;
    }

    targets
      .filter((item) => item.hidden)
      .forEach((item) => {
        void animate(item, 'show');
      });

    await Promise.all(
      visible.map(async (item) => {
        await animate(item, 'hide');

        if (current === run && targets.includes(item)) {
          await animate(item, 'show');
        }
      }),
    );
  };

  filters.forEach((filter) => {
    filter.addEventListener('click', (event) => {
      event.preventDefault();
      const value = filter.dataset.filter;
      if (!value) return;

      setActive(filter);
      void applyFilter(value);
    });

    filter.addEventListener('keydown', (event) => {
      if (event.key !== ' ') return;

      event.preventDefault();
      filter.click();
    });
  });
};
