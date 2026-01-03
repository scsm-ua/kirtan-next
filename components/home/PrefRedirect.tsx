'use client';
import { useEffect } from 'react';

import Loader from '@/components/common/Loader/Loader';
import { PREFERENCES } from '@/other/constants';

/**
 *
 */
function PrefRedirect({ bookIdList }: { bookIdList: string[] }) {
  useEffect(() => {
    try {
      handleBookId(
        localStorage.getItem(PREFERENCES.PREFERRED_BOOK_ID),
        bookIdList
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <Loader />;
}

/**
 *
 */
function handleBookId(preservedBookId: string, bookIdList: string[]) {
  if (preservedBookId) {
    makeRedirectTo(preservedBookId);
  } else {
    const lang = (
      navigator.language || Intl.DateTimeFormat().resolvedOptions().locale
    ).slice(0, 2);

    makeRedirectTo(bookIdList.includes(lang) ? lang : 'en');
  }
}

/**
 *
 */
function makeRedirectTo(bookId) {
  window.location.href = '/' + bookId + '/';
}

/**/
export default PrefRedirect;
