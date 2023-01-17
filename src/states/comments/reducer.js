import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS:
      return action.payload.comments;
    case ActionType.CLEAR_COMMENTS:
      return [];
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments];
    case ActionType.UP_VOTE_COMMENT:
      return comments.map((comment) => {
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
      });
    case ActionType.DOWN_VOTE_COMMENT:
      return comments.map((comment) => {
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
      });
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
            downVotesBy: comment.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          };
        }

        return comment;
      });
    default:
      return comments;
  }
}

export default commentsReducer;
