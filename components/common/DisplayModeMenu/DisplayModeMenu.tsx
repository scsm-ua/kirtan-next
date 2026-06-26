'use client';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import './DisplayModeMenu.scss';

import type { TViewMode, TWbwMode } from '@/types/common';
import { VIEW_MODE, WBW_MODE } from '@/types/common';

/**/
type Props = {
  children?: ReactNode;
  hasWbw: boolean;
  hasLearnWbw?: boolean;
  label: string;
  mode: TViewMode;
  wbwMode: TWbwMode;
  onModeChange: (value: TViewMode) => void;
  onWbwModeChange: (value: TWbwMode) => void;
};

const DISPLAY_OPTIONS: Array<{
  iconCls: string;
  label: string;
  value: TViewMode;
}> = [
  { value: VIEW_MODE.ALL, label: 'Show all', iconCls: 'all' },
  { value: VIEW_MODE.VERSE, label: 'Verses only', iconCls: 'verse' },
  { value: VIEW_MODE.TRANSLATION, label: 'Translation only', iconCls: 'translation' }
];

const WBW_OPTIONS: Array<{
  iconCls: string;
  label: string;
  value: TWbwMode;
}> = [
  { value: WBW_MODE.HIDE, label: 'Hide word-by-word', iconCls: 'hide' },
  { value: WBW_MODE.INLINE, label: 'Inline word-by-word', iconCls: 'inline' },
  { value: WBW_MODE.CLASSICAL, label: 'Classical word-by-word', iconCls: 'classical' }
];

/**
 *
 */
function DisplayModeMenu({
  children,
  hasWbw,
  hasLearnWbw,
  label,
  mode,
  wbwMode,
  onModeChange,
  onWbwModeChange
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const pickMode = (value: TViewMode) => {
    if (value === mode) {
      setOpen(false);
      return;
    }
    onModeChange(value);
  };

  const pickWbw = (value: TWbwMode) => {
    if (value === wbwMode) {
      setOpen(false);
      return;
    }
    onWbwModeChange(value);
  };

  const rootCls = classNames(
    'DisplayModeMenu',
    open && 'DisplayModeMenu--open'
  );

  return (
    <div className={rootCls} ref={rootRef}>
      <div className="DisplayModeMenu__header">
        <button
          type="button"
          className="DisplayModeMenu__trigger"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={label}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="DisplayModeMenu__state" aria-hidden="true">
            {(mode === VIEW_MODE.ALL || mode === VIEW_MODE.VERSE) && (
              <span className="DisplayModeMenu__icon DisplayModeMenu__icon--verse" />
            )}
            {(mode === VIEW_MODE.ALL || mode === VIEW_MODE.TRANSLATION) && (
              <span className="DisplayModeMenu__icon DisplayModeMenu__icon--translation" />
            )}
            {hasWbw && mode !== VIEW_MODE.TRANSLATION && (
              <span
                className={`DisplayModeMenu__icon DisplayModeMenu__icon--${wbwMode}`}
              />
            )}
          </span>
          <span className="DisplayModeMenu__label">{label}</span>
        </button>
        {children}
      </div>

      <div
        className="DisplayModeMenu__panelWrap"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="DisplayModeMenu__panel" role="menu">
          <div
            className="DisplayModeMenu__group"
            role="radiogroup"
            aria-label="Verse / translation"
          >
            {DISPLAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                tabIndex={open ? 0 : -1}
                aria-checked={mode === opt.value}
                className={classNames(
                  'DisplayModeMenu__item',
                  mode === opt.value && 'DisplayModeMenu__item--active'
                )}
                onClick={() => pickMode(opt.value)}
              >
                <span className="DisplayModeMenu__iconSlot" aria-hidden="true">
                  <span
                    className={classNames(
                      'DisplayModeMenu__icon',
                      `DisplayModeMenu__icon--${opt.iconCls}`
                    )}
                  />
                </span>
                <span className="DisplayModeMenu__itemLabel">{opt.label}</span>
              </button>
            ))}
          </div>

          {hasWbw && (
            <div
              className={classNames(
                'DisplayModeMenu__group',
                'DisplayModeMenu__group--wbw',
                mode === VIEW_MODE.TRANSLATION && 'DisplayModeMenu__group--collapsed'
              )}
              role="radiogroup"
              aria-label="Word by word"
              aria-hidden={mode === VIEW_MODE.TRANSLATION}
              inert={mode === VIEW_MODE.TRANSLATION}
            >
              {WBW_OPTIONS.filter((opt) => {
                // Hide classical inline in "verse only" mode.
                if (mode === VIEW_MODE.VERSE && opt.value === WBW_MODE.CLASSICAL) return false;
                // Inline option requires learn-mode data; classical block is
                // always available whenever the menu renders.
                if (opt.value === WBW_MODE.INLINE && !hasLearnWbw) return false;
                return true;
              }).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  tabIndex={open && mode !== VIEW_MODE.TRANSLATION ? 0 : -1}
                  aria-checked={wbwMode === opt.value}
                  className={classNames(
                    'DisplayModeMenu__item',
                    wbwMode === opt.value && 'DisplayModeMenu__item--active'
                  )}
                  onClick={() => pickWbw(opt.value)}
                >
                  <span className="DisplayModeMenu__iconSlot" aria-hidden="true">
                    <span
                      className={classNames(
                        'DisplayModeMenu__icon',
                        `DisplayModeMenu__icon--${opt.iconCls}`
                      )}
                    />
                  </span>
                  <span className="DisplayModeMenu__itemLabel">{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**/
export default DisplayModeMenu;
