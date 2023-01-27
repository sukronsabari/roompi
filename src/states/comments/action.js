import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setCommentContentActionCreator } from '../commentContent/action';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  CLEAR_COMMENTS: 'CLEAR_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function clearCommentsActionCreator() {
  return {
    type: ActionType.CLEAR_COMMENTS,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      dispatch(setCommentContentActionCreator(''));
    } catch (error) {
      alert(`Failed to add comment with error message: ${error.message}`);
    }

    dispatch(hideLoading());
  };
}

function findComment({ commentId, comments }) {
  return comments.find((comment) => comment.id === commentId);
}

function checkCommentIsUpVoted({ commentId, userId, comments }) {
  const commentSelected = findComment({ commentId, comments });
  const isVoted = commentSelected.upVotesBy.includes(userId);

  return isVoted;
}

function checkCommentIsDownVoted({ commentId, userId, comments }) {
  const commentSelected = findComment({ commentId, comments });
  const isVoted = commentSelected.downVotesBy.includes(userId);

  return isVoted;
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, comments } = getState();
    const commentIsVoted = checkCommentIsUpVoted({
      commentId,
      userId: authUser.id,
      comments,
    });

    if (commentIsVoted) {
      dispatch(
        neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );

      try {
        await api.neutralizeVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          neutralizeVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          }),
        );
      }
    } else {
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

      try {
        await api.upVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          upVoteCommentActionCreator({ commentId, userId: authUser.id }),
        );
      }
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, comments } = getState();
    const commentIsVoted = checkCommentIsDownVoted({
      commentId,
      userId: authUser.id,
      comments,
    });

    if (commentIsVoted) {
      dispatch(
        neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );

      try {
        await api.neutralizeVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          neutralizeVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          }),
        );
      }
    } else {
      dispatch(
        downVoteCommentActionCreator({ commentId, userId: authUser.id }),
      );

      try {
        await api.downVoteComment({ threadId, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          downVoteCommentActionCreator({ commentId, userId: authUser.id }),
        );
      }
    }
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  clearCommentsActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
