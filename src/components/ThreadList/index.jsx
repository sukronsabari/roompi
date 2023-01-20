/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from '../ThreadItem';

function ThreadList({
  threads,
  upVoteThreadHandler,
  downVoteThreadHandler,
  showLoginModal,
  setTagActive,
  tagActive,
}) {
  return (
    <div>
      {threads.length > 0 &&
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            {...thread}
            upVoteThreadHandler={upVoteThreadHandler}
            downVoteThreadHandler={downVoteThreadHandler}
            showLoginModal={showLoginModal}
            setTagActive={setTagActive}
            tagActive={tagActive}
          />
        ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVoteThreadHandler: PropTypes.func.isRequired,
  downVoteThreadHandler: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
  setTagActive: PropTypes.func,
  tagActive: PropTypes.string,
};

export default ThreadList;
