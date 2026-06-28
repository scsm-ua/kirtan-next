'use client';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import './DisplayModeMenu.scss';

import { translate } from '@/other/i18n';
import type { TViewMode, TWbwMode } from '@/types/common';
import { VIEW_MODE, WBW_MODE } from '@/types/common';

/**/
type Props = {
  bookId: string;
  children?: ReactNode;
  hasTranslation: boolean;
  hasWbw: boolean;
  fullInlineWbw?: boolean;
  label: string;
  mode: TViewMode;
  wbwMode: TWbwMode;
  onModeChange: (value: TViewMode) => void;
  onWbwModeChange: (value: TWbwMode) => void;
};

const DISPLAY_OPTIONS: Array<{
  iconCls: string;
  labelKey: string;
  value: TViewMode;
}> = [
  { value: VIEW_MODE.ALL, labelKey: 'DISPLAY_MODE_MENU.SHOW_ALL', iconCls: 'all' },
  { value: VIEW_MODE.VERSE, labelKey: 'DISPLAY_MODE_MENU.VERSES_ONLY', iconCls: 'verse' },
  { value: VIEW_MODE.TRANSLATION, labelKey: 'DISPLAY_MODE_MENU.TRANSLATION_ONLY', iconCls: 'translation' }
];

const WBW_OPTIONS: Array<{
  iconCls: string;
  labelKey: string;
  value: TWbwMode;
}> = [
  { value: WBW_MODE.HIDE, labelKey: 'DISPLAY_MODE_MENU.HIDE_WBW', iconCls: 'hide' },
  { value: WBW_MODE.INLINE, labelKey: 'DISPLAY_MODE_MENU.INLINE_WBW', iconCls: 'inline' },
  { value: WBW_MODE.CLASSICAL, labelKey: 'DISPLAY_MODE_MENU.CLASSICAL_WBW', iconCls: 'classical' }
];

/**
 *
 */
function DisplayModeMenu({
  bookId,
  children,
  hasTranslation,
  hasWbw,
  fullInlineWbw,
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
            {hasWbw && mode !== VIEW_MODE.TRANSLATION && wbwMode !== WBW_MODE.HIDE && (
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
          {hasTranslation && (
            <div
              className="DisplayModeMenu__group"
              role="radiogroup"
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
                  <span className="DisplayModeMenu__itemLabel">{translate(bookId, opt.labelKey)}</span>
                </button>
              ))}
            </div>
          )}

          {hasWbw && (
            <div
              className={classNames(
                'DisplayModeMenu__group',
                'DisplayModeMenu__group--wbw',
                mode === VIEW_MODE.TRANSLATION && 'DisplayModeMenu__group--collapsed'
              )}
              role="radiogroup"
              aria-hidden={mode === VIEW_MODE.TRANSLATION}
              inert={mode === VIEW_MODE.TRANSLATION}
            >
              {WBW_OPTIONS.filter((opt) => {
                // Hide classical in "verse only" mode, but keep it when inline
                // isn't available — otherwise the user has no way to enable WBW.
                if (mode === VIEW_MODE.VERSE && opt.value === WBW_MODE.CLASSICAL && fullInlineWbw) return false;
                // Inline option requires learn-mode data; classical block is
                // always available whenever the menu renders.
                if (opt.value === WBW_MODE.INLINE && !fullInlineWbw) return false;
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
                  <span className="DisplayModeMenu__itemLabel">{translate(bookId, opt.labelKey)}</span>
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
