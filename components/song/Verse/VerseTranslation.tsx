import classNames from 'classnames';
import './VerseTranslation.scss';

/**/
type Props = {
  isWide: boolean;
  isWBW: boolean;
  translation: string[];
};

/**
 *
 */
function VerseTranslation({ isWide, isWBW, translation }: Props) {
  const cls = classNames(
    'VerseTranslation__paragraph',
    isWide && 'VerseTranslation__paragraph--wide',
    isWBW && 'VerseTranslation__paragraph--dark'
  );

  return (
    <ul className="VerseTranslation">
      {translation.map((item) => (
        <li key={item}>
          <p className={cls}>{item}</p>
        </li>
      ))}
    </ul>
  );
}

/**/
export default VerseTranslation;
