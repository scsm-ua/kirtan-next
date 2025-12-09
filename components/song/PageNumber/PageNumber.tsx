'use client';
import { useEffect, useState } from 'react';

import './PageNumber.scss';
import { PATH } from '@/other/constants';

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
  const [pageQuery, setPage] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setPage(urlParams.get('p') || '');
  }, []);

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
