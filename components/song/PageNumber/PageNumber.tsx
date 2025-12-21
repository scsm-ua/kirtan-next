'use client';

import './PageNumber.scss';
import { PATH } from '@/other/constants';
import { usePageQuery } from '@/other/hooks/usePageQuery';

/**/
type Props = {
  bookId: string;
  label: string;
  page?: string | string[];
};

/**
 *
 */
function PageNumber({ bookId, label, page }: Props) {
  const pageQuery = usePageQuery();

  if (!page || typeof pageQuery !== 'string') return null;

  const href =
    `/${bookId}` + PATH.PAGE.SEARCH + (pageQuery ? `?p=${pageQuery}` : '');

  const text = Array.isArray(page) ? page.join(', ') : page;

  return (
    <div className="PageNumber">
      <a href={href} className="PageNumber__anchor">
        {label} {text}
      </a>
    </div>
  );
}

/**/
export default PageNumber;
