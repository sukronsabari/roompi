/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { IconX } from '@tabler/icons';
import ctl from '@netlify/classnames-template-literals';
import PropTypes from 'prop-types';

function TagInput({ tags, setTags, id }) {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = ({ target }) => {
    if (tags.length < 2) {
      setInputValue(target.value);
    }
  };

  const addTag = (newTag) => {
    const newTagTrimmed = newTag.trim();
    const newTagNoComma = newTagTrimmed.split(',')[0];

    if (newTagNoComma && tags.length < 2) {
      setTags((prevTag) => [...prevTag, newTagNoComma]);
      setInputValue('');
    }
  };

  const onAddTag = ({ key }) => {
    const addKeyIsPress = key === 'Enter' || inputValue.includes(',');
    if (addKeyIsPress) {
      addTag(inputValue);
    }
  };

  const onBlurAddTag = () => {
    addTag(inputValue);
  };

  const deleteTag = (tagName) => {
    setTags((prevTag) => prevTag.filter((tag) => tag !== tagName));
  };

  const tagStyles = ctl(`
    inline-flex 
    justify-between 
    items-center
    space-x-1 
    px-1
    py-[2px] 
    mr-3 
    leading-none 
    text-xs 
    rounded 
  bg-slate-700
  text-slate-100 
  `);

  return (
    <div className="px-3 py-2 rounded border border-slate-400">
      {tags.map((tag, index) => (
        <span className={tagStyles} key={index}>
          <span>{tag}</span>
          <button onClick={() => deleteTag(tag)}>
            <IconX size={12} strokeWidth={4} />
          </button>
        </span>
      ))}
      <span className="inline-block">
        <input
          type="text"
          className="w-32 py-1 focus:outline-none"
          id={`${id}-tags`}
          placeholder="e.g. (react php)"
          value={inputValue}
          onChange={onInputValueChange}
          onKeyUp={onAddTag}
          onBlur={onBlurAddTag}
        />
      </span>
    </div>
  );
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  setTags: PropTypes.func,
  id: PropTypes.string,
};

export default TagInput;
