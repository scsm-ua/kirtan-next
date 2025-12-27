'use client';
import { PureComponent, type ReactElement } from 'react';

import './SearchModule.scss';
import { lookFor } from '@/components/search/SearchModule/helpers';
import SearchControls from '@/components/search/SearchControls/SearchControls';
import SearchResults from '@/components/search/SearchResults/SearchResults';
import { translate } from '@/other/i18n';

import type { TSearchResult, TSearchResultItem } from '@/components/search/SearchModule/types';

/**/
type Props = {
  bookId: string;
  pageList: ReactElement;
};

type State = {
  hasMore?: boolean;
  hasNotFound?: boolean;
  isLoading?: boolean;
  page?: number;
  query?: string;
  results?: Array<TSearchResultItem>;
  resultsForQuery?: string;
};

/**
 *
 */
class SearchModule extends PureComponent<Props, State> {
  state: State = {
    hasMore: false,
    hasNotFound: false,
    isLoading: false,
    page: 1,
    query: '',
    results: [],
    resultsForQuery: ''
  };

  /**/
  handleClear = () =>
    this.setState({
      hasNotFound: false,
      query: '',
      results: []
    });

  /**/
  handleInput = (query: string) => this.setState({ query });

  /**/
  handleMore = () => this.startSearch();

  /**/
  handleSubmit = () => this.startSearch();

  /**/
  startSearch() {
    const { page, query, results, resultsForQuery } = this.state;
    if (!query) return;

    this.setState({
      isLoading: true,
      ...(page === 1 && {
        hasNotFound: false,
        results: []
      })
    });

    lookFor(query, page)
      .then(({ items, itemsTotal }: TSearchResult) => {
        let update: State = {};

        if (!items || itemsTotal === 0) {
          update = page === 1 ? { hasNotFound: true } : { hasMore: false };
        } else {
          update.results = resultsForQuery === query
            ? [...results, ...items]
            : items;

          if (update.results.length < itemsTotal) {
            update = {
              ...update,
              hasMore: true,
              page: page + 1
            };
          } else {
            update.hasMore = false;
          }
        }

        update.isLoading = false;
        update.resultsForQuery = query;

        this.setState(update);
      })
      .catch((e) => {
        this.setState({ isLoading: false });
        console.error(e);
      });
  }

  /**/
  render() {
    const { bookId, pageList } = this.props;
    const { hasMore, hasNotFound, isLoading, query, results } = this.state;

    return (
      <div className="SearchModule">
        <header className="SearchModule__header">
          <SearchControls
            bookId={bookId}
            value={query}
            onInput={this.handleInput}
            onClear={this.handleClear}
            onSubmit={this.handleSubmit}
          />
        </header>

        <main className="SearchModule__content">
          {hasNotFound || isLoading || results.length > 0 || pageList}

          {hasNotFound && (
            <div className="SearchModule__nothing">
              {translate(bookId, 'SEARCH_PAGE.NO_RESULTS')}
            </div>
          )}

          <SearchResults results={results} />

          {hasMore && (
            <div className="SearchModule__more">
              <button
                className="RoundButton RoundButton--dark"
                onClick={this.handleMore}
              >
                {translate(bookId, 'SEARCH_PAGE.LOAD_MORE')}
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }
}

/**/
export default SearchModule;
