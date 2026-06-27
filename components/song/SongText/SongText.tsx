'use client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import './SongText.scss';

import {
  getSongViewMode,
  getSongWbwMode,
  setSongViewMode,
  setSongWbwMode
} from '@/other/userPreferrences';
import DisplayModeMenu from '@/components/common/DisplayModeMenu/DisplayModeMenu';
import ThreeModeSwitch from '@/components/common/ThreeModeSwitch/ThreeModeSwitch';
import SongLoader from '@/components/song/SongText/SongLoader';
import Verse from '@/components/song/Verse/Verse';
import { translate } from '@/other/i18n';

import type { TSong, TVerse } from '@/types/song';
import type { TViewMode, TWbwMode } from '@/types/common';
import { VIEW_MODE, WBW_MODE } from '@/types/common';

/**/
type Props = {
  bookId: string;
  label: string;
  song: TSong;
};

/**
 *
 */
function SongText({ bookId, label, song }: Props) {
  const [mode, setMode] = useState<TViewMode>(null);
  const [wbwMode, setWbwMode] = useState<TWbwMode>(WBW_MODE.INLINE);
  const [updateCount, setCounter] = useState<number>(0);

  const hasTranslation = !('translation' in song.meta) || song.meta.translation !== 'no';
  const { hasWbw, hasLearnWbw } = song;
  const effectiveMode: TViewMode =
    !hasTranslation && (mode === VIEW_MODE.TRANSLATION || mode === VIEW_MODE.ALL)
      ? VIEW_MODE.VERSE
      : mode;
  let effectiveWbwMode: TWbwMode = hasWbw ? wbwMode : WBW_MODE.HIDE;
  // In verses-only mode the classical block has no translation to anchor
  // it, so fall back to inline when learn data exists. Without learn data
  // we keep classical — it's the only way to show WBW in verse-only mode.
  if (
    effectiveMode === VIEW_MODE.VERSE &&
    effectiveWbwMode === WBW_MODE.CLASSICAL &&
    hasLearnWbw
  ) {
    effectiveWbwMode = WBW_MODE.INLINE;
  }
  // Inline is meaningless without learn data; fall back to the classical
  // block (always available when hasWbw).
  if (effectiveWbwMode === WBW_MODE.INLINE && !hasLearnWbw) {
    effectiveWbwMode = WBW_MODE.CLASSICAL;
  }

  const contentCls = classNames(
    'SongText',
    effectiveMode === VIEW_MODE.TRANSLATION && 'SongText--wide',
    updateCount > 0 && 'SongText--transition'
  );

  useEffect(() => {
    setMode(getSongViewMode());
    setWbwMode(getSongWbwMode());
  }, []);

  const handleViewModeChange = (mode: TViewMode) => {
    setCounter((c) => ++c);
    setSongViewMode(mode);
    setMode(mode);
  };

  const handleWbwModeChange = (value: TWbwMode) => {
    setSongWbwMode(value);
    setWbwMode(value);
  };

  const isCompact = effectiveMode === VIEW_MODE.VERSE && wbwMode === WBW_MODE.HIDE;
  const handleCompactToggle = () => {
    if (isCompact) {
      handleViewModeChange(VIEW_MODE.ALL);
      handleWbwModeChange(WBW_MODE.INLINE);
    } else {
      handleViewModeChange(VIEW_MODE.VERSE);
      handleWbwModeChange(WBW_MODE.HIDE);
    }
  };

  const isLearn =
    hasLearnWbw && wbwMode === WBW_MODE.INLINE && effectiveMode !== VIEW_MODE.TRANSLATION;
  const handleLearnToggle = () => {
    if (isLearn) {
      handleWbwModeChange(WBW_MODE.HIDE);
    } else {
      if (effectiveMode === VIEW_MODE.TRANSLATION) handleViewModeChange(VIEW_MODE.ALL);
      handleWbwModeChange(WBW_MODE.INLINE);
    }
  };

  useEffect(() => {
    const handleSetMode = (e: Event) => {
      handleViewModeChange((e as CustomEvent<{ mode: TViewMode }>).detail.mode);
    };
    const handleSetWbw = (e: Event) => {
      handleWbwModeChange(
        (e as CustomEvent<{ wbwMode: TWbwMode }>).detail.wbwMode
      );
    };

    window.addEventListener('kirtan:setMode', handleSetMode);
    window.addEventListener('kirtan:setWbwMode', handleSetWbw);
    return () => {
      window.removeEventListener('kirtan:setMode', handleSetMode);
      window.removeEventListener('kirtan:setWbwMode', handleSetWbw);
    };
  }, []);

  return (
    <main className={contentCls}>
      {mode ? (
        <>
          {(hasTranslation || hasWbw) && (
            <div className="SongText__toggle">
              {hasWbw ? (
                <DisplayModeMenu
                  bookId={bookId}
                  hasTranslation={hasTranslation}
                  hasWbw={hasWbw}
                  hasLearnWbw={hasLearnWbw}
                  label={label}
                  mode={effectiveMode}
                  wbwMode={effectiveWbwMode}
                  onModeChange={handleViewModeChange}
                  onWbwModeChange={handleWbwModeChange}
                >
                  <div className="SongText__btnGroup">
                    {hasLearnWbw && (
                      <button
                        type="button"
                        className={classNames(
                          'SongText__learn',
                          isLearn && 'SongText__learn--active'
                        )}
                        onClick={handleLearnToggle}
                        aria-pressed={isLearn}
                        aria-label={translate(bookId, 'DISPLAY_MODE_MENU.LEARN_MODE')}
                        title={translate(bookId, 'DISPLAY_MODE_MENU.LEARN_MODE')}
                      >
                        <svg
                          className="SongText__learnIcon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      className={classNames(
                        'SongText__compact',
                        isCompact && 'SongText__compact--active'
                      )}
                      onClick={handleCompactToggle}
                      aria-pressed={isCompact}
                      aria-label={translate(bookId, isCompact ? 'DISPLAY_MODE_MENU.SHOW_ALL' : 'DISPLAY_MODE_MENU.COMPACT_VIEW')}
                      title={translate(bookId, isCompact ? 'DISPLAY_MODE_MENU.SHOW_ALL' : 'DISPLAY_MODE_MENU.COMPACT_VIEW')}
                    >
                      <svg
                        className="SongText__compactIcon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                      </svg>
                    </button>
                  </div>
                </DisplayModeMenu>
              ) : (
                <ThreeModeSwitch
                  label={label}
                  onChange={handleViewModeChange}
                  value={effectiveMode}
                />
              )}
            </div>
          )}

          <ul className="SongText__list">
            {song.verses.map((verse: TVerse, idx: number, arr: TVerse[]) => (
              <Verse
                hasWbw={hasWbw}
                hasLearnWbw={hasLearnWbw}
                key={idx}
                length={arr.length}
                meta={song.meta}
                mode={effectiveMode}
                verse={verse}
                wbwMode={effectiveWbwMode}
              />
            ))}
          </ul>
        </>
      ) : (
        <SongLoader />
      )}
    </main>
  );
}

/**/
export default SongText;

