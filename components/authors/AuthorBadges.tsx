'use client';

import './AuthorBadges.scss';
import { scrollToSection } from '@/other/helpers';
import { TContentGroup } from '@/types/common';

/**/
type Props = {
  contents: Array<TContentGroup>;
};

/**
 *
 */
function AuthorBadges({ contents }: Props) {
  return (
    <ul className="AuthorBadges">
      {contents.map((item: TContentGroup) => (
        <Item item={item} key={item.name} />
      ))}
    </ul>
  );
}

/**
 *
 */
function Item({ item }: { item: TContentGroup }) {
  const handleClick = () => scrollToSection(item.name);

  return (
    <li className="AuthorBadges__item">
      <button className="AuthorBadges__button ellipsis" onClick={handleClick}>
        {item.name} ({item.items.length})
      </button>
    </li>
  );
}

/**/
export default AuthorBadges;
