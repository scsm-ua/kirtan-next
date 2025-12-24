import 'react-responsive-modal/styles.css';
import './SongPage.scss';

import AudioList from '@/components/song/AudioList/AudioList';
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
import PrevNextNav from '@/components/song/PrevNextNav/PrevNextNav';
import SongbookList from '@/components/song/OtherTranslations/SongbookList';
import SongHeader from '@/components/song/SongHeader';
import SongShare from '@/components/song/SongShare/SongShare';
import SongText from '@/components/song/SongText/SongText';
import { translate } from '@/other/i18n';

import type { BookListPageProps } from '@/other/metadata/getBookListMeta';
import type { TBookDescription } from '@/types/book';

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
    /*booksMap*/ {
      'en-pe': {
        title: 'Kirtan Guide',
        subtitle: 'Pocket Edition, 2013',
        slug: 'en-pe',
        language: 'en',
        sort_order: 40,
        path: '/Users/kostya/kostya/projects/scsm-ua/kirtan-mate/node_modules/kirtan-guide-pocket-edition'
      } as any
    }
  )) as TBookDescription[];

  // const context = { bookId, booksMap };
  const nav = await getNavItems(slug, bookId);
  console.log(nav, song);

  return (
    <Layout bookId={bookId} className="SongPage" page={song.attributes?.page}>
      <div className="Main__container SongPage__container">
        <div className="SongPage__content">
          <header className="SongPage__header">
            <section className="SongPage__top">
              <div className="SongPage__info">
                <h6 className="SongPage__book">{book.title}</h6>

                <PageNumber
                  bookId={bookId}
                  label={translate(bookId, 'SONG_PAGE.PAGE')}
                  page={song.attributes?.page}
                />
              </div>

              <div className="SongPage__controls">
                <OtherTranslations
                  bookId={bookId}
                  disabled={descriptions.length === 0}
                >
                  <SongbookList
                    bookId={bookId}
                    bookDescriptions={descriptions}
                    slug={slug}
                  />
                </OtherTranslations>

                <SongShare bookId={bookId} />
              </div>
            </section>

            <SongHeader bookId={bookId} song={song} />
          </header>

          <SongText
            label={translate(bookId, 'SONG_PAGE.SHOW_TRANSLATION')}
            song={song}
          />

          {song.embeds?.length > 0 && (
            <AudioList audios={song.embeds} />
          )}
        </div>
      </div>



      <PrevNextNav navMap={nav} page={song.attributes?.page} />

      {/*<LdJson*/}
      {/*  bookId={bookId}*/}
      {/*  description={book.subtitle}*/}
      {/*  title={book.title}*/}
      {/*/>*/}
    </Layout>
  );
}

/**/
export default SongPage;
