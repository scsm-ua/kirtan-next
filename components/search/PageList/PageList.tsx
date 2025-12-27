'use client';
import classNames from 'classnames';

import './PageList.scss';
import { translate } from '@/other/i18n';
import { usePageQuery } from '@/other/hooks/usePageQuery';

import type { TPage } from '@/types/search';

/**/
type Props = {
  bookId: string;
  pages: TPage[];
};

/**
 *
 */
function PageList({ bookId, pages }: Props) {
  const pageQuery = usePageQuery();

  return (
    <div className="PageList">
      <h6 className="PageList__title">
        {translate(bookId, 'SEARCH_PAGE.PAGE_LIST')}
      </h6>

      <ul className="PageList__list">
        {pages.map((item: TPage) => {
          const cls = classNames(
            'PageList__button',
            pageQuery === item.page && 'PageList__button--active'
          );

          return (
            <li className="PageList__item" key={item.page}>
              <a href={item.path} title={item.title}>
                <button className={cls}>{item.page}</button>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**/
export default PageList;
