'use client';
import { useCallback, useEffect, useState } from 'react';

import { useGlobalHotkeys } from '@/other/hooks/useGlobalHotkeys';
import HotkeysModal from './HotkeysModal';

/**/
type Props = {
  bookId: string;
};

/**
 *
 */
function GlobalHotkeys({ bookId }: Props) {
  const [isOpen, setOpen] = useState(false);

  const onShowHelp = useCallback(() => setOpen((v) => !v), []);

  useGlobalHotkeys({ onShowHelp });

  // Dismiss the help modal on any key press; the key still propagates so its
  // corresponding hotkey action runs.
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(): void {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return <HotkeysModal bookId={bookId} isOpen={isOpen} onClose={() => setOpen(false)} />;
}

/**/
export default GlobalHotkeys;
