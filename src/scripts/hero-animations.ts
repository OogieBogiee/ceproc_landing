import anime from 'animejs';

const TYPE_DELAY = 15;
const FADE_DELAY = 25;
const HOLD_DELAY = 5000;
const TYPING_START_DELAY = 2200;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lettersStarted = false;
let typingStarted = false;

const positionCursor = (
  line: HTMLElement,
  cursor: HTMLElement,
  container: HTMLElement,
) => {
  const lineRect = line.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  cursor.style.top = `${lineRect.top - containerRect.top}px`;
  cursor.style.left = `${lineRect.right - containerRect.left}px`;
};

const typeText = (
  line: HTMLElement,
  text: string,
  cursor: HTMLElement,
  container: HTMLElement,
  onComplete: () => void,
) => {
  let index = 0;

  const step = () => {
    if (index < text.length) {
      line.textContent += text.charAt(index);
      index += 1;
      positionCursor(line, cursor, container);
      window.setTimeout(step, TYPE_DELAY);
      return;
    }

    onComplete();
  };

  step();
};

const fadeOutLines = (
  line1: HTMLElement,
  line2: HTMLElement,
  text1: string,
  text2: string,
  cursor1: HTMLElement,
  cursor2: HTMLElement,
  container: HTMLElement,
  restart: () => void,
) => {
  let index2 = text2.length;
  let index1 = text1.length;

  const interval = window.setInterval(() => {
    if (index2 >= 0) {
      cursor2.style.visibility = 'visible';
      line2.textContent = text2.substring(0, index2);
      positionCursor(line2, cursor2, container);
      index2 -= 1;
    } else if (index1 >= 0) {
      cursor1.style.visibility = 'visible';
      line1.textContent = text1.substring(0, index1);
      positionCursor(line1, cursor1, container);
      index1 -= 1;
    } else {
      window.clearInterval(interval);
      line1.textContent = '';
      line2.textContent = '';
      cursor1.style.visibility = 'hidden';
      cursor2.style.visibility = 'hidden';
      restart();
    }

    if (index2 < 0) {
      cursor2.style.visibility = 'hidden';
    }
  }, FADE_DELAY);
};

export const initTyping = () => {
  if (typingStarted) return;
  typingStarted = true;

  const container = document.querySelector<HTMLElement>('#typing-container');
  const line1 = document.querySelector<HTMLElement>('#line1');
  const line2 = document.querySelector<HTMLElement>('#line2');

  if (!container || !line1 || !line2) return;
  if (prefersReducedMotion()) return;

  const text1 = line1.textContent ?? '';
  const text2 = line2.textContent ?? '';

  const cursor1 = document.createElement('span');
  cursor1.id = 'cursor1';
  const cursor2 = document.createElement('span');
  cursor2.id = 'cursor2';

  container.append(cursor1, cursor2);

  const start = () => {
    line1.textContent = '';
    line2.textContent = '';
    cursor1.style.visibility = 'hidden';
    cursor2.style.visibility = 'hidden';

    typeText(line1, text1, cursor1, container, () => {
      cursor1.style.visibility = 'hidden';
      window.setTimeout(() => {
        cursor2.style.visibility = 'visible';
        typeText(line2, text2, cursor2, container, () => {
          window.setTimeout(() => {
            fadeOutLines(line1, line2, text1, text2, cursor1, cursor2, container, start);
          }, HOLD_DELAY);
        });
      }, 100);
    });
  };

  window.setTimeout(start, TYPING_START_DELAY);
};

export const initLetters = () => {
  if (lettersStarted) return;
  lettersStarted = true;
  if (prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('.ml12').forEach((wrapper) => {
    const text = wrapper.textContent ?? '';
    const fragment = document.createDocumentFragment();

    for (const character of text) {
      if (/\s/.test(character)) {
        fragment.append(character);
        continue;
      }

      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = character;
      letter.style.opacity = '0';
      fragment.append(letter);
    }

    wrapper.replaceChildren(fragment);
  });

  anime
    .timeline({ loop: true })
    .add({
      targets: '.ml12 .letter',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: (_, index) => 500 + 30 * index,
    })
    .add({
      targets: '.ml12 .letter',
      translateX: [0, -30],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 6000,
      delay: (_, index) => 100 + 30 * index,
    });
};
