/* eslint-disable no-unused-vars */
import React from 'react';
import { IconThumbUp, IconThumbDown } from '@tabler/icons';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import UserProfile from '../UserProfile';
import { userShape, commentShape } from '../DetailThread/shape';
import { postedAtLongDate } from '../../utils';
import ButtonIconWithCounter from '../ButtonActionWithCounter';

function CommentItem({
  threadId,
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteCommentHandler,
  downVoteCommentHandler,
  showLoginModal,
}) {
  const isCommentLiked = upVotesBy.includes(authUser?.id);
  const isCommentDisliked = downVotesBy.includes(authUser?.id);

  const onUpVoteCommentHandler = () => {
    if (authUser) upVoteCommentHandler({ threadId, commentId: id });
    else showLoginModal();
  };

  const onDownVoteCommentHandler = () => {
    if (authUser) downVoteCommentHandler({ threadId, commentId: id });
    else showLoginModal();
  };

  return (
    <div className="p-4 pb-6 md:p-6 md:pb-8 border border-slate-300 rounded-md">
      <div className="flex space-x-4 mb-4">
        <UserProfile avatar={owner?.avatar} />
        <div>
          <p className="font-bold">{owner?.name}</p>
          <p className="text-sm mt-1 text-paragraph">
            {`${postedAtLongDate(createdAt)} ago`}
          </p>
        </div>
      </div>
      <div title="text comment" className="mb-8">
        {parse(content)}
      </div>
      <div className="flex items-center space-x-4">
        <ButtonIconWithCounter
          title="Like comment button"
          ariaLabel="Like this comment"
          count={upVotesBy.length}
          isActive={isCommentLiked}
          handleClick={onUpVoteCommentHandler}
          color={isCommentLiked ? 'text-primary' : 'text-slate-500'}
        >
          <IconThumbUp />
        </ButtonIconWithCounter>
        <ButtonIconWithCounter
          title="Dislike comment button"
          ariaLabel="Dislike this comment"
          count={downVotesBy.length}
          isActive={isCommentDisliked}
          handleClick={onDownVoteCommentHandler}
          color={isCommentDisliked ? 'text-red-400' : 'text-slate-500'}
        >
          <IconThumbDown />
        </ButtonIconWithCounter>
      </div>
    </div>
  );
}

const commentItemShape = {
  ...commentShape,
  authUser: PropTypes.shape(userShape),
};

CommentItem.propTypes = {
  ...commentItemShape,
  threadId: PropTypes.string.isRequired,
  upVoteCommentHandler: PropTypes.func,
  downVoteCommentHandler: PropTypes.func,
  showLoginModal: PropTypes.func,
};
export { commentItemShape };
export default CommentItem;
