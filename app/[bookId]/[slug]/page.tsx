import { notFound } from 'next/navigation';
import 'react-responsive-modal/styles.css';

import './SongPage.scss';

import AudioList from '@/components/song/AudioList/AudioList';
import {
  getBookDescriptionsByBook,
  getNavItems,
  getSongBySlug,
  getSongSlugParam
} from '@/lib/song';
import { getBooksMap } from '@/lib/books';
import { getSongPageMeta } from '@/other/metadata/getSongPageMeta';
import Layout from '@/components/common/Layout/Layout';
import LdJsonSong from '@/other/metadata/LdJsonSong';
import OtherTranslations from '@/components/song/OtherTranslations/OtherTranslations';
import PageNumber from '@/components/song/PageNumber/PageNumber';
import PrevNextNav from '@/components/song/PrevNextNav/PrevNextNav';
import SongbookList from '@/components/song/OtherTranslations/SongbookList';
import SongHeader from '@/components/song/SongHeader';
import SongShare from '@/components/song/SongShare/SongShare';
import SongText from '@/components/song/SongText/SongText';
import { translate } from '@/other/i18n';

import type { SongPageProps, TBookDescription } from '@/types/book';

/**/
export const dynamicParams = false;
export const generateMetadata = getSongPageMeta;
export const generateStaticParams = getSongSlugParam;

/**
 *
 */
async function SongPage({ params }: SongPageProps) {
  const { bookId, slug } = await params;
  if (!bookId || !slug) return notFound();

  const booksMap = await getBooksMap();
  const book = booksMap[bookId];

  const song = await getSongBySlug(slug, bookId);
  if (!song) return notFound();

  const descriptions = (await getBookDescriptionsByBook(
    slug,
    booksMap
  )) as TBookDescription[];

  const nav = await getNavItems(slug, bookId);

  return (
    <Layout bookId={bookId} className="SongPage" page={song.meta?.page}>
      <div className="Main__container SongPage__container">
        <div className="SongPage__content">
          <header className="SongPage__header">
            <section className="SongPage__top">
              <div className="SongPage__info">
                <h6 className="SongPage__book">{book.title}</h6>

                <PageNumber
                  bookId={bookId}
                  label={translate(bookId, 'SONG_PAGE.PAGE')}
                  page={song.meta?.page}
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

          {song.embeds?.length > 0 && <AudioList audios={song.embeds} />}
        </div>
      </div>

      <PrevNextNav navMap={nav} />
      <LdJsonSong bookId={bookId} slug={slug} song={song} />
    </Layout>
  );
}

/**/
export default SongPage;
