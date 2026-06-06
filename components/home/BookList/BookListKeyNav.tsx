'use client';
import { useEffect, useRef } from 'react';

/**
 * Attaches arrow-key grid navigation to the BookList.
 * Up/Down move between rows; Left/Right move between columns.
 * Reads column count from the live grid layout so it works at any
 * responsive breakpoint without hardcoding.
 */
function BookListKeyNav() {
  const focusedIdx = useRef(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
      if (!isArrow) return;

      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || el?.isContentEditable) return;

      const list = document.querySelector<HTMLElement>('.BookList__list');
      if (!list) return;

      const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('a[href]'));
      if (!links.length) return;

      // Determine column count from the live grid layout.
      const cols = getComputedStyle(list)
        .gridTemplateColumns.split(' ')
        .filter(Boolean).length || 1;

      const total = links.length;

      // Sync focusedIdx with actual DOM focus if user tabbed in manually.
      const domIdx = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (domIdx !== -1) focusedIdx.current = domIdx;

      const cur = focusedIdx.current < 0 ? 0 : focusedIdx.current;
      let next = cur;

      // On first activation (nothing focused yet) just land on the first item.
      if (focusedIdx.current < 0) {
        next = 0;
      } else {
        switch (e.key) {
          case 'ArrowRight': next = (cur + 1) % total; break;
          case 'ArrowLeft':  next = (cur - 1 + total) % total; break;

          case 'ArrowDown': {
            const candidate = cur + cols;
            // Overshot: if not already on last item go to last, otherwise wrap to first.
            next = candidate < total ? candidate : cur === total - 1 ? 0 : total - 1;
            break;
          }

          case 'ArrowUp': {
            const candidate = cur - cols;
            // If candidate undershoots, go to last item.
            next = candidate >= 0 ? candidate : total - 1;
            break;
          }
        }
      }

      e.preventDefault();
      focusedIdx.current = next;
      links[next].focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
}

export default BookListKeyNav;
