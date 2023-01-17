const ActionType = {
  SET_COMMENT_CONTENT: 'SET_COMMENT_CONTENT',
};

function setCommentContentActionCreator(content) {
  return {
    type: ActionType.SET_COMMENT_CONTENT,
    payload: {
      commentContent: content,
    },
  };
}

export { ActionType, setCommentContentActionCreator };
