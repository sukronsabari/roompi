/* eslint-disable no-unused-vars */
import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import ctl from '@netlify/classnames-template-literals';
import 'highlight.js/styles/monokai-sublime.css';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({ value, handleChange, border = 'border-slate-400' }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };
  const formats = [
    'code-block',
    'bold',
    'italic',
    'underline',
    'link',
    'image',
    'list',
  ];
  const placeholder = 'Type something...';

  const styles = ctl(`
    [&>.ql-toolbar]:${border}
    [&>.ql-toolbar]:rounded-t
    [&>.ql-container]:min-h-[5rem]
    [&>.ql-container]:${border}
    [&>.ql-container]:rounded-b-md
  `);

  hljs.configure({
    // optionally configure hljs
    languages: ['javascript', 'ruby', 'python'],
  });

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content) => handleChange(content)}
        formats={formats}
        modules={modules}
        className={styles}
        placeholder={placeholder}
      />
    </div>
  );
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  border: PropTypes.string,
};

export default RichTextEditor;
