import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

import { getBannerUrl, getBannerUrlBase } from '@/other/helpers';
import { getCommonMeta } from '@/other/metadata/getCommonMeta';
import { getTranslationsByBookId } from '@/other/i18n';
import { SITE } from '@/other/constants';

/**/
export type BookListPageProps = {
  params: Promise<{ bookId: string }>;
};

/**/
type Args = {
  bookId: string;
  description: string;
  // language: string;
  title: string;
};

/**
 *
 */
export async function getBookListMeta({
  params
}: Props): Promise<Partial<Metadata>> {
  const { bookId } = await params;
  const translate = getTranslationsByBookId(bookId);

  // const title = translate('BOOK_LIST_PAGE.HEAD.TITLE');
  // const description = translate('BOOK_LIST_PAGE.HEAD.DESCRIPTION');

  return getMeta({
    bookId: bookId,
    description: translate('BOOK_LIST_PAGE.HEAD.DESCRIPTION'),
    // language: bookId.slice(0, 2),
    title: translate('BOOK_LIST_PAGE.HEAD.TITLE')
  });
}

/**
 *
 */
function getMeta(args: Args): Partial<Metadata> {
  const { bookId, description, title } = args;
  // const language = bookId.slice(0, 2);
  const theTitle = `${title} | ${SITE.NAME}`

  return {
    title: theTitle,
    description: description,
    ...(SITE.ORIGIN && { metadataBase: new URL(SITE.ORIGIN) }),
    ...getCommonMeta(),
    /**/
    alternates: {
      canonical: '/' + bookId,
      languages: {
        // todo: keys must be real locales, not just languages
        'en': '/en',
        'es': '/es',
        'lv': '/lv',
        'pt': '/pt',
        'ru': '/ru',
        'ua': '/ua',
        'x-default': '/en'
      } as any,
    },
    /**/
    openGraph: getOG({
      bookId,
      title: theTitle,
      description
    }),
    /**/
    twitter: getTwitter({
      bookId,
      title: theTitle,
      description
    })
  } as Metadata;
}

/**
 *
 */
function getOG(args: Args): Partial<OpenGraph> {
  const { bookId, description, title } = args;
  const imgBase = getBannerUrlBase(bookId);

  return {
    title: title,
    description: description,
    url: SITE.NAME + '/' + bookId,
    siteName: SITE.NAME,
    locale: bookId.slice(0, 2), // todo: must be real locale, not just language
    type: 'website',
    images: [
      {
        url: imgBase + '.jpg',
        width: 320,
        height: 190,
        type: 'image/jpeg'
      },
      {
        url: imgBase + '@2.jpg',
        width: 640,
        height: 380,
        type: 'image/jpeg'
      }
    ]
  }
}

/**
 *
 */
function getTwitter(args: Args) {
  const { bookId, description, title } = args;
  return {
    title: title,
    card: 'summary',
    description: description,
    image: getBannerUrl(bookId)
  };
}

/*

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="${imgSrc}" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />*/

/**
 * var imgSrc;
 *     if (songbook_id) {
 *         imgSrc = `${ PATHS.RELATIVE.IMG }/banner/banner-${ songbook_id }@2.png`;
 *     } else {
 *         imgSrc = PATHS.FILES.SHARING_BANNER;
 *     }
 */

type Props = {
  params: Promise<{ bookId: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent as any).openGraph?.images || [];

  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages]
    }
  };
}
