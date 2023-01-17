import React from 'react';
import { IconSearch } from '@tabler/icons';
import PropTypes from 'prop-types';

function SearchBar({ keyword, onKeywordChange, className }) {
  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded ${className}`}
    >
      <IconSearch className="text-slate-600" />
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={onKeywordChange}
        className="w-full bg-transparent border-none text-slate-600 pl-1 focus:outline-none"
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchBar;
