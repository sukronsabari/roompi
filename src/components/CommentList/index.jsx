/* eslint-disable operator-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from '../CommentItem';

function CommentList({
  threadId,
  comments,
  upVoteCommentHandler,
  downVoteCommentHandler,
  showLoginModal,
}) {
  return (
    <div className="space-y-4">
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            {...comment}
            threadId={threadId}
            upVoteCommentHandler={upVoteCommentHandler}
            downVoteCommentHandler={downVoteCommentHandler}
            showLoginModal={showLoginModal}
          />
        ))}
    </div>
  );
}

CommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)),
  upVoteCommentHandler: PropTypes.func,
  downVoteCommentHandler: PropTypes.func,
  showLoginModal: PropTypes.func,
};

export default CommentList;
