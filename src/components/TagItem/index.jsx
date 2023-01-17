/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';

function TagItem({ tagName, handleClick, tagActive, role = 'none' }) {
  return (
    <div
      role={role}
      tabIndex={-1}
      onClick={handleClick}
      className={`inline-block px-3 py-1 rounded-sm text-sm ${
        tagName === tagActive
          ? 'bg-primary text-white'
          : 'bg-slate-200 text-dark'
      }`}
    >
      {`#${tagName}`}
    </div>
  );
}

TagItem.propTypes = {
  tagName: PropTypes.string.isRequired,
  tagActive: PropTypes.string,
  handleClick: PropTypes.func,
  role: PropTypes.string,
};

export default TagItem;
