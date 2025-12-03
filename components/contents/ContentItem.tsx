import './ContentItem.scss';
import type { TContentItem } from '@/types/song';

/**/
type Props = {
  bookId: string;
  item: TContentItem;
};

/**
 *
 */
function ContentItem({ bookId, item }: Props) {
  const { aliasName, has, id, page, pages, title } = item;
  const _pages = Array.isArray(page) ? page.join(', ') : page;

  let href = '/' + bookId + '/' + id;

  if (pages?.length > 1) {
    href += `?p=${page}`;
  }

  return (
    <li className="ContentItem">
      <a href={href} className="ContentItem__link">
        <h6 className="ContentItem__name" title={aliasName}>
          <span className="">{title}</span>

          {_pages && (
            <span className="ContentItem__page" title="Page in paper songbook">{_pages}</span>
          )}

          {has.audio && (
            <span className="ContentItem__embed" title="Audio">♪</span>
          )}
        </h6>

        {/*<div className="ContentItem__views">*/}
        {/*  <span>('telegraph_views' in song) ? song.telegraph_views : ''</span>*/}
        {/*</div>*/}

        <div className="ContentItem__suffix">
          <div className="ContentItem__icon icon-chevron-right" />
        </div>
      </a>
    </li>
  );
}

/**/
export default ContentItem;
