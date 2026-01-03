import type { SyntheticEvent } from 'react';

import './SearchControls.scss';
import { translate } from '@/other/i18n';

/**/
type Props = {
  bookId: string;
  value: string;
  onClear: () => void;
  onInput: (value: string) => void;
  onSubmit: () => void;
};

/**
 *
 */
function SearchControls({ bookId, value, onClear, onInput, onSubmit }: Props) {
  const handleChange = (e: SyntheticEvent) => onInput(e.target['value']);

  const handleKeyDown = (e: SyntheticEvent) => {
    (e['key'] === 'Enter' || e['keyCode'] === 13) && onSubmit();
  };

  return (
    <div className="SearchControls">
      <div className="SearchControls__container">
        <input
          autoFocus
          className="SearchControls__input"
          placeholder={translate(bookId, 'SEARCH_PAGE.INPUT_PLACEHOLDER')}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="NoBorderButton SearchControls__clear"
          onClick={onClear}
          title={translate(bookId, 'SEARCH_PAGE.CLEAR')}
        >
          <span className="icon-xmark-large" />
        </button>
      </div>

      <button
        className="RoundButton RoundButton--dark SearchControls__submit"
        onClick={onSubmit}
        title={translate(bookId, 'SEARCH_PAGE.FIND')}
      >
        <span className="icon-search" />
      </button>
    </div>
  );
}

/**/
export default SearchControls;
