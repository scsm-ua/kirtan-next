'use client';
import SwipeListener from 'swipe-listener';
import { useEffect } from 'react';

import type { TNavItems } from '@/types/song';

/**/
type Props = { prevNext: TNavItems };

/**
 *
 */
export function SwipeNav({ prevNext }: Props) {
  const goAway = ({ detail }: CustomEvent) => {
    if (detail['directions'].left && prevNext.next) {
      window.location.href = prevNext.next.path;
    }

    if (detail['directions'].right && prevNext.prev) {
      window.location.href = prevNext.prev.path;
    }
  };

  useEffect(() => {
    SwipeListener(document);
    document.addEventListener('swipe', goAway);

    return () => document.removeEventListener('swipe', goAway);
  }, [prevNext]);

  return null;
}
