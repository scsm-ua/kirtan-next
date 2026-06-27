'use client';
import classnames from 'classnames';

import './Verse.scss';
import Collapse from '@/components/common/Collapse/Collapse';
import LearnVerse from '@/components/song/Verse/LearnVerse';
import VerseText from '@/components/song/Verse/VerseText';
import VerseTranslation from '@/components/song/Verse/VerseTranslation';
import VerseWbw from '@/components/song/Verse/VerseWbw';

import type { TSong, TVerse } from '@/types/song';
import type { TViewMode, TWbwMode } from '@/types/common';
import { VIEW_MODE, WBW_MODE } from '@/types/common';

/**/
type Props = {
  hasWbw: boolean;
  hasLearnWbw: boolean;
  length: number;
  meta: TSong['meta'];
  mode: TViewMode;
  verse: TVerse;
  wbwMode?: TWbwMode;
};

/**
 *
 */
function Verse({
  hasWbw,
  hasLearnWbw,
  length,
  meta,
  mode,
  verse,
  wbwMode = WBW_MODE.CLASSICAL
}: Props) {
  const { number, subtitle, text, translation, word_by_word, inline_word_by_word } = verse;
  const isWide = mode === VIEW_MODE.TRANSLATION;
  // Per-verse learn flag: when the song is in inline mode but this verse
  // lacks per-word data, fall back to the classical view for this verse.
  const verseHasInline = !!inline_word_by_word;
  const isLearn = hasLearnWbw && wbwMode === WBW_MODE.INLINE && verseHasInline;

  const showVerse = mode === VIEW_MODE.VERSE || mode === VIEW_MODE.ALL;
  const showTranslation = mode === VIEW_MODE.TRANSLATION || mode === VIEW_MODE.ALL;
  const showWbwBlock =
    hasWbw &&
    mode !== VIEW_MODE.TRANSLATION &&
    (wbwMode === WBW_MODE.CLASSICAL ||
      (wbwMode === WBW_MODE.INLINE && !verseHasInline));

  const stCls = (classnames as any)(
    'Verse__subtitles',
    mode === VIEW_MODE.TRANSLATION && 'Verse__subtitles--large'
  );

  return (
    <li className="Verse" data-mode={mode}>
      {subtitle?.length > 0 && showTranslation && (
        <div className={stCls}>
          {subtitle.map((s: string) => (
            <div key={s}>{s}</div>
          ))}
        </div>
      )}

      {length > 1 && number && (
        <header className="Verse__header">
          <h6 className="Verse__title">{number}</h6>
        </header>
      )}

      {text?.length > 0 && (
        <>
          <Collapse
            defaultOpen={showVerse && !isLearn}
            open={showVerse && !isLearn}
          >
            <VerseText hasNumber={!!number} meta={meta} text={text} />
          </Collapse>

          {hasLearnWbw && inline_word_by_word && (
            <Collapse
              defaultOpen={showVerse && isLearn}
              open={showVerse && isLearn}
            >
              <LearnVerse
                hasNumber={!!number}
                lines={inline_word_by_word}
                meta={meta}
                text={text}
              />
            </Collapse>
          )}
        </>
      )}

      {hasWbw && word_by_word?.length > 0 && (
        <Collapse defaultOpen={showWbwBlock} open={showWbwBlock}>
          <VerseWbw lines={word_by_word} />
        </Collapse>
      )}

      {translation?.length > 0 && (
        <Collapse defaultOpen={showTranslation} open={showTranslation}>
          <VerseTranslation
            isWide={isWide}
            isWBW={hasWbw}
            translation={translation}
          />
        </Collapse>
      )}
    </li>
  );
}

/**/
export default Verse;


