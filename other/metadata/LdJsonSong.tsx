import { getIFrameUrl } from '@/other/helpers';
import { getSongPageTitle } from '@/other/metadata/helpers/getSongPageTitle';
import { SITE } from '@/other/constants';
import type { TAudio, TSong } from '@/types/song';

/**/
type Props = {
  bookId: string;
  slug: string;
  song: TSong;
};

/**
 *
 */
function LdJsonSong({ bookId, slug, song }: Props) {
  const language = bookId.slice(0, 2);
  const url = SITE.ORIGIN + bookId + '/' + slug;

  const author = song.meta?.author;
  const pageName = getSongPageTitle(song);

  console.warn('>>>>>>>>> Missing "alternateName" (1st line)!');

  const composition = {
    '@type': 'MusicComposition',
    '@id': url + '#composition',
    url: url,
    name: pageName,
    // "alternateName": [song.first_line],
    ...(author && {
      composer: {
        '@type': 'Person',
        name: author
      }
    }),
    isPartOf: {
      '@id': SITE.ORIGIN + '#website'
    },
    about: [
      { '@type': 'Thing', name: 'Bhakti Yoga' },
      { '@type': 'Thing', name: 'Gaudiya Vaishnavism' }
    ],
    genre: ['Devotional', 'Bhajan', 'Kirtan'],
    mainEntityOfPage: {
      '@id': url
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        url: url,
        name: getSongPageTitle(song),
        inLanguage: language,
        // TODO:
        // "description": "Bengali devotional song with translations.",
        isPartOf: {
          '@id': SITE.ORIGIN + '#website'
        }
      },
      composition
    ]
  };

  if (song.embeds?.length > 0) {
    composition['audio'] = song.embeds.map((audio: TAudio) => ({
      '@type': 'MusicRecording',
      name: pageName,
      url: audio.embed_url,
      byArtist: {
        '@type': 'Person',
        name: audio.title
      },
      audio: {
        '@type': 'AudioObject',
        embedUrl: getIFrameUrl(url)
      }
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  );
}

/**/
export default LdJsonSong;
