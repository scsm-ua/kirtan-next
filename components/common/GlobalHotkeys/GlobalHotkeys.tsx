'use client';
import { useCallback, useState } from 'react';

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

  return <HotkeysModal bookId={bookId} isOpen={isOpen} onClose={() => setOpen(false)} />;
}

/**/
export default GlobalHotkeys;
