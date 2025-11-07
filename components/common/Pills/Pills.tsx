'use client';
// import { useEffect, useState } from 'react';

import './Pills.scss';
import type { TPill } from '@/types/common';

/**/
type Props = { items: Array<TPill> };

/**
 *
 */
function Pills({ items }: Props) {
  // const [hasInit, setInit] = useState<boolean>(false);
  // useEffect(() => setInit(true), []);
  // if (!hasInit) return null;

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
  const handleClick = () => onClick(item.title);

  return (
    <li className="Pills__item">
      <button className="Pills__button" onClick={handleClick}>
        {item.title}
      </button>
    </li>
  );
}

/**/
function onClick(id: string) {
  document.getElementById('section-' + id)?.scrollIntoView({
    behavior: 'smooth'
  });
}

/**/
export default Pills;
