import './VerseWbw.scss';
import { processTranslationLines } from '@/other/utils';

/**/
type Props = {
  lines: string[];
};

/**
 *
 */
function VerseWbw({ lines }: Props) {
  return (
    <ul className="VerseWbw">
      {processTranslationLines(lines, 'VerseWbw').map((item, idx) => (
        <li key={idx}>
          <p
            className="VerseWbw__paragraph"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </li>
      ))}
    </ul>
  );
}

/**/
export default VerseWbw;
