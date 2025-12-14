'use client';
import { useEffect, useState } from 'react';

import {
  getSongDisplayMode,
  setSongDisplayMode
} from '@/other/userPreferrences';
import ThreeModeSwitch from '@/components/common/ThreeModeSwitch/ThreeModeSwitch';

/**/
type Props = { label: string };

/**
 *
 */
function TranslationToggle({ label }: Props) {
  const [mode, setMode] = useState<string>(null);

  useEffect(() => {
    setMode(getSongDisplayMode());
  }, []);

  if (!mode) return null;

  const handleChange = (mode) => {
    setSongDisplayMode(mode);
    setMode(mode);
  };

  return (
    <div className="SongPage__toggle">
      <ThreeModeSwitch
        label={label}
        onChange={handleChange}
        value={mode as any}
      />
    </div>
  );
}

/**/
export default TranslationToggle;
