import './SearchResults.scss';
import type { TSearchResultItem } from '@/components/search/SearchModule/types';

/**/
type Props = {
  results: Array<TSearchResultItem>;
};

/**
 *
 */
function SearchResults({ results }: Props) {
  if (results.length === 0) return null;

  return (
    <ul className="SearchResults">
      {results.map((item) => (
        <li className="SearchResults__item">
          <a href={item.link}>
            <h5
              className="SearchResults__title"
              dangerouslySetInnerHTML={{
                __html: item.htmlTitle
              }}
            />

            <div
              className="SearchResults__text"
              dangerouslySetInnerHTML={{
                __html: item.htmlSnippet
              }}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**/
export default SearchResults;
