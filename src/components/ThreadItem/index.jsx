import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconThumbUp,
  IconThumbDown,
  IconMessage2,
  IconPoint,
} from '@tabler/icons';
import parse from 'html-react-parser';
import TagList from '../TagList';
import ButtonIconWithCounter from '../ButtonActionWithCounter';
import { postedAtShortDate, getTags } from '../../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUser,
  upVoteThreadHandler,
  downVoteThreadHandler,
  showLoginModal,
  setTagActive,
  tagActive,
}) {
  const navigate = useNavigate();
  const tags = getTags(category);

  const isThreadLiked = upVotesBy.includes(authUser?.id);
  const isThreadDisliked = downVotesBy.includes(authUser?.id);
  const onCommentClicked = () => navigate(`/threads/${id}`);

  const onUpVoteThreadHandler = () => {
    if (authUser) upVoteThreadHandler(id);
    else showLoginModal();
  };

  const onDownVoteThreadHandler = () => {
    if (authUser) downVoteThreadHandler(id);
    else showLoginModal();
  };

  return (
    <article className="p-6 border-b border-b-slate-100 w-full">
      <Link to={`/threads/${id}`} className="block mb-3">
        <h1 className="text-primary text-lg lg:text-lg">{title}</h1>
      </Link>
      <div className="text-paragraph text-sm font-normal multiline-trancate mb-6 lg:text-base">
        {parse(body)}
      </div>
      <TagList
        role="button"
        tags={tags}
        tagActive={tagActive}
        handleClick={setTagActive}
      />
      <div className="flex justify-between mt-8">
        <div className="flex space-x-4 flex-1">
          <ButtonIconWithCounter
            title="Like button"
            ariaLabel="Like this threads"
            count={upVotesBy.length}
            handleClick={onUpVoteThreadHandler}
            color={isThreadLiked ? 'text-primary' : 'text-slate-500'}
            isActive={isThreadLiked}
          >
            <IconThumbUp />
          </ButtonIconWithCounter>
          <ButtonIconWithCounter
            title="Dislike button"
            ariaLabel="Dislike this threads"
            count={downVotesBy.length}
            handleClick={onDownVoteThreadHandler}
            color={isThreadDisliked ? 'text-red-400' : 'text-slate-500'}
            isActive={isThreadDisliked}
          >
            <IconThumbDown />
          </ButtonIconWithCounter>
          <ButtonIconWithCounter
            title="Comment"
            ariaLabel="Total comment"
            count={totalComments}
            handleClick={onCommentClicked}
          >
            <IconMessage2 />
          </ButtonIconWithCounter>
        </div>
        <div className="flex items-center space-x-1 text-paragraph text-sm">
          <p className="capitalize truncate max-w-[5rem] screen450:max-w-none">
            {owner?.name}
          </p>
          <span>
            <IconPoint stroke={5} size={5} />
          </span>
          <p className="space-x-1">
            <span>{`${postedAtShortDate(createdAt)} ago`}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.shape(userShape),
  upVoteThreadHandler: PropTypes.func.isRequired,
  downVoteThreadHandler: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func,
  setTagActive: PropTypes.func,
  tagActive: PropTypes.string,
};

export { threadItemShape };
export default ThreadItem;
