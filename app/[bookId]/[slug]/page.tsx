import 'react-responsive-modal/styles.css';
import './SongPage.scss';

import { getBookIdParamList, getBooksMap } from '@/lib/books';
import { getBookListMeta } from '@/other/metadata/getBookListMeta';
import {
  getBookDescriptionsByBook,
  getNavItems,
  getSongBySlug,
  getSongSlugParam
} from '@/lib/song';
import Layout from '@/components/common/Layout/Layout';
import LdJson from '@/other/metadata/LdJson';
import OtherTranslations from '@/components/song/OtherTranslations/OtherTranslations';
import PageNumber from '@/components/song/PageNumber/PageNumber';
import SongbookList from '@/components/song/OtherTranslations/SongbookList';
import { translate } from '@/other/i18n';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';
import type { TBookDescription } from '@/types/book';
import type { TSong } from '@/types/song';

/**/
export const generateMetadata = getBookListMeta;
export const generateStaticParams = getSongSlugParam;

/**
 *
 */
async function SongPage({ params }: BookListPageProps) {
  const { bookId, slug } = await params;
  const booksMap = await getBooksMap();

  const book = booksMap[bookId];
  const song = await getSongBySlug(slug, bookId);
  const descriptions = (await getBookDescriptionsByBook(
    slug,
    /*booksMap*/ { 'en-pe': {
        "title": "Kirtan Guide",
        "subtitle": "Pocket Edition, 2013",
        "slug": "en-pe",
        "language": "en",
        "sort_order": 40,
        "path": "/Users/kostya/kostya/projects/scsm-ua/kirtan-mate/node_modules/kirtan-guide-pocket-edition"
      } as any }
  )) as TBookDescription[];

  // const context = { bookId, booksMap };
  const nav = await getNavItems(slug, bookId);
  console.log(nav);

  return (
    <Layout bookId={bookId}>
      <div className="Main__container SongPage__container">
        <div className="SongPage__content">
          <header className="SongPage__header">
            <div className="SongPage__top">
              <div className="SongPage__info">
                <h6 className="SongPage__book">{book.title}</h6>

                <PageNumber
                  label={translate(bookId, 'SONG_PAGE.PAGE')}
                  page={song.attributes?.page}
                />
              </div>

              <div className="SongPage__controls">
                <OtherTranslations bookId={bookId}>
                  <SongbookList
                    bookId={bookId}
                    bookDescriptions={descriptions}
                    slug={slug}
                  />
                </OtherTranslations>

                <button
                  className=" NoBorderButton SclassNameNamesNameder__button"
                  id=" share-button"
                  title=" Поделиться песней"
                >
                  <span className=" icon-arrow-up-frclassNameNamesNamecket"></span>
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>

      <h2>
        {bookId} / {slug}
      </h2>
      {/*<LdJson*/}
      {/*  bookId={bookId}*/}
      {/*  description={book.subtitle}*/}
      {/*  title={book.title}*/}
      {/*/>*/}

      {/*<BookList bookId={bookId} booksMap={booksMap} />*/}
    </Layout>
  );
}

/**
 *
 */
function getPageLabel(bookId: string, arrt: TSong['attributes']): string {
  // const label = translate(bookId, 'SONG_PAGE.PAGE') + '' + Array.isArray(page);
  return '';
}

/**/
export default SongPage;
