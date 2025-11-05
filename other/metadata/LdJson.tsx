import type { Book, WithContext } from 'schema-dts';

import { CREATOR, KEYWORDS, PUBLISHER } from '@/other/metadata/getCommonMeta';
import { getBannerUrl } from '@/other/helpers';
import { SITE } from '@/other/constants';

/**/
type Props = {
  bookId: string;
  description: string;
  title: string;
};

/**
 *
 */
function LdJson(props: Props) {
  const { bookId, description, title } = props;
  const imgSrc = getBannerUrl(bookId);

  // Todo: check and revise
  const jsonLd: WithContext<Book> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    /*
     audience
     author
     genre
      maintainer
      sourceOrganization
      teaches
    */
    creator: CREATOR,
    description: description,
    image: imgSrc,
    inLanguage: bookId.slice(0, 2),
    keywords: KEYWORDS,
    name: title,
    publisher: PUBLISHER,
    sourceOrganization: 'https://scsmath.com/',
    teaches: 'Bhakti yoga',
    thumbnailUrl: imgSrc,
    url: SITE.ORIGIN + bookId
  };

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
export default LdJson;
