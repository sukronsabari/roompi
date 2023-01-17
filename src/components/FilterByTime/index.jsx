import React, { useId } from 'react';
import PropTypes from 'prop-types';

function FilterByTime({ filterByTime, onFilterByTimeChange }) {
  const id = useId();
  return (
    <div className="p-4 w-full rounded border border-slate-300">
      <p className="pb-3 border-b border-b-slate-300">Filter</p>
      <div className="mt-4">
        <label htmlFor={`${id}-newest`} className="block mb-1">
          <input
            type="radio"
            value="newest"
            checked={filterByTime === 'newest'}
            onChange={onFilterByTimeChange}
            name="time"
            id={`${id}-newest`}
          />
          <span className="ml-3">Newest</span>
        </label>
        <label htmlFor={`${id}-oldest`} className="block">
          <input
            type="radio"
            value="oldest"
            checked={filterByTime === 'oldest'}
            onChange={onFilterByTimeChange}
            name="time"
            id={`${id}-oldest`}
          />
          <span className="ml-3">Oldest</span>
        </label>
      </div>
    </div>
  );
}

FilterByTime.propTypes = {
  filterByTime: PropTypes.string.isRequired,
  onFilterByTimeChange: PropTypes.func,
};

export default FilterByTime;
