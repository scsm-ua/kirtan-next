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
  const { aliasName, duplicates, embeds, id, idx, page, page_number, title } = item;
  const pages = Array.isArray(page) ? page.join(', ') : page;

  let href = '/' + bookId + '/' + id;

  if (duplicates && duplicates[0].idx !== idx) {
    href += `?p=${page_number}`;
  }

  return (
    <li className="ContentItem">
      <a href={href} className="ContentItem__link">
        <h6 className="ContentItem__name" title={aliasName}>
          <span className="">{title}</span>

          {pages && (
            <span className="ContentItem__page" title="Page in paper songbook">{pages}</span>
          )}

          {embeds && (
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
