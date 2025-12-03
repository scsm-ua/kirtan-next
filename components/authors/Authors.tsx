import '@/styles/index-page.scss';

import ContentGroup from '@/components/contents/ContentGroup';
import type { TContentGroup } from '@/types/song';

/**/
type Props = {
  bookId: string;
  contents: Array<TContentGroup>;
};

/**
 *
 */
function Authors({ bookId, contents }: Props) {
  return (
    <ul className="IndexPage__list">
      {contents.map((group: TContentGroup) => (
        <ContentGroup bookId={bookId} group={group} key={group.name} />
      ))}
    </ul>
  );
}

/**/
export default Authors;
