/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import TagItem from '../TagItem';

function TagList({ tags, tagActive, handleClick, role }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.length > 0 &&
        tags.map((tag) => (
          <TagItem
            key={tag}
            tagName={tag}
            tagActive={tagActive}
            handleClick={handleClick}
            role={role}
          />
        ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  tagActive: PropTypes.string,
  handleClick: PropTypes.func,
  role: PropTypes.string,
};

export default TagList;
