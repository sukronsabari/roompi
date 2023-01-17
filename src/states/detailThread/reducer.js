import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.UP_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: [...detailThread.upVotesBy, action.payload.userId],
        downVotesBy: detailThread.downVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
      };
    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
        downVotesBy: [...detailThread.downVotesBy, action.payload.userId],
      };
    case ActionType.NEUTRALIZE_DETAIL_VOTE:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
      };
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
              downVotesBy: [...comment.downVotesBy, action.payload.userId],
            };
          }

          return comment;
        }),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
              downVotesBy: comment.upVotesBy.filter(
                (userId) => userId !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
