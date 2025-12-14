import classNames from 'classnames';

import './VerseText.scss';
import { getLineContent, getLineIndent } from '@/components/song/Verse/helpers';
import type { TSong } from '@/types/song';

/**/
type Props = {
  attributes: TSong['attributes'];
  hasNumber: boolean; // Whether the verse has number or it's the sole verse in a song.
  text: Array<string>;
};

/**
 *
 */
function VerseText({ attributes, hasNumber, text }: Props) {
  return (
    <ul className="VerseText">
      {text.map((line) => {
        const content = getLineContent(line, attributes, hasNumber);

        if (!content) {
          return (
            <li key={line}>
              <br />
            </li>
          );
        }

        const cls = classNames(
          'VerseText__line',
          'VerseText__indent--' + getLineIndent(line)
        );

        const dsc = { __html: content };
        return <li className={cls} dangerouslySetInnerHTML={dsc} key={line} />;
      })}
    </ul>
  );
}

/**/
export default VerseText;
