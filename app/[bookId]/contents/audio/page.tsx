import AudioIndex from '@/components/audio/AudioIndex';
import BookDescription from '@/components/common/BookDescription/BookDescription';
import { createAudioPageMeta } from '@/other/metadata/getAudioPageMeta';
import { getAudioBookIdParamList, getAudioBySong } from '@/lib/audio';
import { getBooksMap } from '@/lib/books';
import Layout from '@/components/common/Layout/Layout';
import LdJson from '@/other/metadata/LdJson';
import { AUDIO_PAGE } from '@/other/paths';

import type { BookListPageProps } from '@/types/book';

/**/
export const generateMetadata = createAudioPageMeta(AUDIO_PAGE.BY_SONG_CONTENTS);
export const generateStaticParams = getAudioBookIdParamList;

/**
 *
 */
async function AudioBySongContentsPage({ params }: BookListPageProps) {
  const { bookId } = await params;
  const book = getBooksMap()[bookId];

  return (
    <Layout bookId={bookId}>
      <div className="Main__container AudioIndex">
        <div className="IndexPage__title">
          <BookDescription bookDescription={book} />
        </div>

        <div className="Main__content">
          <AudioIndex
            bookId={bookId}
            groups={getAudioBySong(bookId, 'contents')}
            page={AUDIO_PAGE.BY_SONG_CONTENTS}
          />
        </div>

        <LdJson bookId={bookId} pageKey="AUDIO_PAGE" page={AUDIO_PAGE.BY_SONG_CONTENTS} />
      </div>
    </Layout>
  );
}

/**/
export default AudioBySongContentsPage;
