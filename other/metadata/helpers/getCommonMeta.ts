import type { Metadata } from 'next';

import {
  AUTHORS,
  CREATOR,
  KEYWORDS,
  PUBLISHER
} from '@/other/metadata/helpers/constants';
import { SITE } from '@/other/constants';

/**
 *
 */
export function getCommonMeta(): Partial<Metadata> {
  return {
    applicationName: SITE.NAME,
    authors: AUTHORS,
    creator: CREATOR,
    keywords: KEYWORDS,
    metadataBase: new URL(SITE.ORIGIN),
    publisher: PUBLISHER
  };
}
