/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useId, useState } from 'react';
import { IconX } from '@tabler/icons';
import ctl from '@netlify/classnames-template-literals';
import PropTypes from 'prop-types';
import RichTextEditor from '../RichTextEditor';
import useInput from '../../hooks/useInput';
import TagInput from '../TagInput';
import Button from '../Button';

const fixedStyles = ctl(`
  flex
  justify-center 
  items-center 
  fixed 
  top-0 
  left-0 
  z-[9999] 
  w-full 
  h-screen
  px-4
bg-slate-100/40 
  backdrop-blur-[2px]
  pointer-events-none
  overflow-hidden
`);

const containerStyles = ctl(`
  relative
  w-full 
  max-w-3xl
  h-screenCustom 
  bg-white 
  border
  border-slate-200
  shadow-lg
  rounded-md 
  z-10 
  pb-10 
  pointer-events-auto
  overflow-scroll 
  hide-scrollbar
`);

const closeButtonStyles = ctl(`
  w-[40px]
  h-[40px]
  absolute 
  top-[6px] 
  right-2 
  flex 
  items-center 
  justify-center
`);

function AddThreadModal({ closeAddThreadModal, submitThread }) {
  const minimalCharacter = 17;
  const id = useId();
  const [title, onTitleChange] = useInput('');
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState('');

  const onBodyChange = (value) => {
    setBody(value);
  };

  const onSubmitThreadHandler = (event) => {
    event.preventDefault();
    if (title && body.length >= minimalCharacter) {
      submitThread({ title, body, category: tags.toString() });
    }
  };

  return (
    <div className={fixedStyles}>
      <div className={containerStyles}>
        <div className="p-4 border-b border-b-slate-200 relative">
          <h3 className="font-medium">Add New Thread</h3>
          <button className={closeButtonStyles} onClick={closeAddThreadModal}>
            <IconX size={16} />
          </button>
        </div>
        <div className="p-4">
          <div className="p-4 rounded-md border border-primary bg-sky-50/50 text-paragraph">
            <p>
              You can ask any questions here, be sure to use kind words to
              maintain order in the community
            </p>
          </div>
          <form onSubmit={onSubmitThreadHandler}>
            <label htmlFor={`${id}-thread-title`} className="block mt-6">
              <span className="block font-bold mb-2 text-paragraph after:content-['*'] after:ml-0.5 after:text-rose-400">
                Question title
              </span>
              <input
                type="text"
                name="thread-title"
                id={`${id}-thread-title`}
                value={title}
                onChange={onTitleChange}
                className="block w-full px-3 py-2 rounded border border-slate-400 focus:border-primary focus:outline-none"
                placeholder="e.g. how to make a good react app"
                autoFocus
                required
              />
            </label>
            <label htmlFor={`${id}-tags`} className="block mt-6">
              <span className="block font-bold text-paragraph">Tags</span>
              <p className="text-slate-500 text-sm mb-2">
                Press the Comma ( , ) or Enter key after writing the tag. Up to
                2 tags (20 character)
              </p>
              <TagInput tags={tags} setTags={setTags} id={id} />
            </label>
            <div className="mt-6">
              <p className="font-bold text-paragraph after:content-['*'] after:ml-0.5 after:text-rose-400">
                What are the details of your problem?
              </p>
              <p className="text-slate-500 text-sm mb-2">
                Introduce the problem and expand on what you put in the title.
                (Minimum 10 characters)
              </p>
              <div>
                <RichTextEditor value={body} handleChange={onBodyChange} />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="disabled:bg-slate-200 disabled:text-slate-500"
                isDisable={!(title && body.length >= minimalCharacter)}
              >
                Add thread
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AddThreadModal.propTypes = {
  closeAddThreadModal: PropTypes.func,
  submitThread: PropTypes.func,
};

export default AddThreadModal;
