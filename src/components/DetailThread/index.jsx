import React, { useEffect } from 'react';
import {
  IconPoint,
  IconThumbUp,
  IconThumbDown,
  IconMessage2,
} from '@tabler/icons';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import hljs from 'highlight.js';
import UserProfile from '../UserProfile';
import { getTags, postedAtLongDate } from '../../utils';
import { userShape, commentShape } from './shape';
import TagList from '../TagList';
import ButtonIconWithCounter from '../ButtonActionWithCounter';
import RichTextEditor from '../RichTextEditor';
import Button from '../Button';
import CommentList from '../CommentList';
import 'highlight.js/styles/atom-one-dark.css';

function DetailThread({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  commentContent,
  upVoteThreadHandler,
  downVoteThreadHandler,
  showLoginModal,
  inputCommentChangeHandler,
  upVoteCommentHandler,
  downVoteCommentHandler,
  submitCommentHandler,
}) {
  const tags = getTags(category);
  const thisThreadIsLiked = upVotesBy.includes(authUser?.id);
  const thisThreadIsDisliked = downVotesBy.includes(authUser?.id);
  const commentList = comments.map((comment) => ({
    ...comment,
    authUser,
  }));

  const onUpVoteThreadHandler = () => {
    if (authUser) upVoteThreadHandler(id);
    else showLoginModal();
  };

  const onDownVoteThreadHandler = () => {
    if (authUser) downVoteThreadHandler(id);
    else showLoginModal();
  };

  useEffect(() => {
    document.querySelectorAll('.ql-syntax').forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  return (
    <article>
      <div className="flex items-center space-x-3 mb-4">
        <UserProfile avatar={owner.avatar} className="w-[44px] h-[44px]" />
        <div className="flex items-center space-x-3 mb-1 text-slate-500">
          <p className="font-medium text-dark">{owner.name}</p>
          <IconPoint size={5} strokeWidth={8} />
          <p className="text-sm">{`${postedAtLongDate(createdAt)} ago`}</p>
        </div>
      </div>
      <div className="border-b border-b-slate-300 pb-10">
        <h2 className="mb-4 text-lg md:text-xl">{title}</h2>
        <div className="mb-6">{parse(body)}</div>
        <div className="mb-6">
          <TagList tags={tags} />
        </div>
        <div className="flex flex-wrap space-x-4">
          <ButtonIconWithCounter
            title="Like button"
            ariaLabel="Like this thread"
            count={upVotesBy.length}
            handleClick={onUpVoteThreadHandler}
            color={thisThreadIsLiked ? 'text-primary' : 'text-slate-500'}
            isActive={thisThreadIsLiked}
          >
            <IconThumbUp />
          </ButtonIconWithCounter>
          <ButtonIconWithCounter
            title="Dislike button"
            ariaLabel="Dislike this thread"
            count={downVotesBy.length}
            handleClick={onDownVoteThreadHandler}
            color={thisThreadIsDisliked ? 'text-red-400' : 'text-slate-500'}
            isActive={thisThreadIsDisliked}
          >
            <IconThumbDown />
          </ButtonIconWithCounter>
          <ButtonIconWithCounter
            title="Comment"
            ariaLabel="Total comment"
            count={comments.length}
          >
            <IconMessage2 />
          </ButtonIconWithCounter>
        </div>
      </div>
      {authUser && (
        <div className="mt-8 pb-10 border-b border-b-slate-300">
          <div className="flex items-center space-x-3">
            <UserProfile avatar={authUser?.avatar} />
            <p className="capitalize font-bold">{authUser?.name}</p>
          </div>
          <div className="mt-4">
            <RichTextEditor
              value={commentContent}
              handleChange={inputCommentChangeHandler}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button handleClick={submitCommentHandler}>Reply</Button>
          </div>
        </div>
      )}
      <div className="mt-8">
        <CommentList
          threadId={id}
          comments={commentList}
          upVoteCommentHandler={upVoteCommentHandler}
          downVoteCommentHandler={downVoteCommentHandler}
          showLoginModal={showLoginModal}
        />
      </div>
    </article>
  );
}

DetailThread.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)),
  authUser: PropTypes.shape(userShape),
  commentContent: PropTypes.string,
  upVoteThreadHandler: PropTypes.func,
  downVoteThreadHandler: PropTypes.func,
  showLoginModal: PropTypes.func,
  inputCommentChangeHandler: PropTypes.func,
  upVoteCommentHandler: PropTypes.func,
  downVoteCommentHandler: PropTypes.func,
  submitCommentHandler: PropTypes.func,
};

export default DetailThread;
