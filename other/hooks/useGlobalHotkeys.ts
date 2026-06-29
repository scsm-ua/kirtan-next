'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import type { TTranslationMode } from '@/types/common';

// User-facing key → internal mode value:
//   '1' = original + translation (both, internal '3')
//   '2' = original only          (internal '1')
//   '3' = translation only       (internal '2')
const KEY_TO_MODE: Record<string, TTranslationMode> = {
  '1': '3',
  '2': '1',
  '3': '2',
};

const NON_SONG_SEGMENTS = new Set(['contents', 'a-z', 'search', 'authors']);

function isInputFocused(): boolean {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || el.isContentEditable;
}

type Config = {
  onShowHelp: () => void;
};

export function useGlobalHotkeys({ onShowHelp }: Config): void {
  const router = useRouter();
  const pathname = usePathname();

  // Focus the main scroll container on every route change so the browser
  // natively handles ArrowUp/ArrowDown/PageUp/PageDown/Home/End/Space scrolling.
  // body has overflow:hidden — the scroller is .Layout__content.
  // Deferred to the next tick so per-page autofocus (e.g. SearchControls input)
  // runs first; we only claim focus if nothing else did.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const active = document.activeElement;
      if (active && active !== document.body) return;
      const scroller = document.querySelector<HTMLElement>('.Layout__content');
      scroller?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const bookId = segments[0] ?? '';
    const subPage = segments[1];
    const isSongPage =
      segments.length === 2 &&
      subPage !== undefined &&
      !NON_SONG_SEGMENTS.has(subPage);

    function handleKeyDown(e: KeyboardEvent): void {
      if (isInputFocused()) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Skip if an earlier listener (e.g. BookListKeyNav, OtherTranslations) already handled the key.
      if (e.defaultPrevented) return;

      switch (e.key) {
        case 'h':
          e.preventDefault();
          onShowHelp();
          break;

        case 'b':
          router.push(`/${bookId}`);
          break;

        case 'c':
          router.push(`/${bookId}/contents`);
          break;

        case 'i':
          router.push(`/${bookId}/a-z`);
          break;

        case 's':
          router.push(`/${bookId}/search`);
          break;

        case 'l':
          if (isSongPage) {
            window.dispatchEvent(new CustomEvent('kirtan:toggleOtherTranslations'));
          } else {
            router.push(`/${bookId}`);
          }
          break;

        case '1':
        case '2':
        case '3':
          window.dispatchEvent(
            new CustomEvent('kirtan:setMode', {
              detail: { mode: KEY_TO_MODE[e.key] },
            })
          );
          break;

        case 'ArrowLeft':
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('kirtan:prevSong'));
          break;

        case 'ArrowRight':
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('kirtan:nextSong'));
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname, router, onShowHelp]);

  // Allow other components (e.g. HotkeyHint in the Header) to open the modal
  // without prop-drilling through server components.
  useEffect(() => {
    const handler = () => onShowHelp();
    window.addEventListener('kirtan:showHelp', handler);
    return () => window.removeEventListener('kirtan:showHelp', handler);
  }, [onShowHelp]);
}
