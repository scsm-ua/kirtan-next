'use client';

import './Pills.scss';
import { scrollToSection } from '@/other/helpers';
import type { TPill } from '@/types/common';

/**/
type Props = { items: Array<TPill> };

/**
 *
 */
function Pills({ items }: Props) {
  return (
    <ul className="Pills">
      {items.map((item: TPill) => (
        <Pill item={item} key={item.title} />
      ))}
    </ul>
  );
}

/**
 *
 */
function Pill({ item }: { item: TPill }) {
  const handleClick = () => scrollToSection(item.title);

  return (
    <li className="Pills__item">
      <button className="Pills__button" onClick={handleClick}>
        {item.title}
      </button>
    </li>
  );
}

/**/
export default Pills;
