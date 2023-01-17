import { ActionType } from './action';

function commentContentReducer(commentContent = '', action = {}) {
  switch (action.type) {
    case ActionType.SET_COMMENT_CONTENT:
      return action.payload.commentContent;
    default:
      return commentContent;
  }
}

export default commentContentReducer;
