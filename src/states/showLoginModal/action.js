const ActionType = {
  SET_SHOW_LOGIN_MODAL: 'SET_SHOW_LOGIN_MODAL',
};

function setLoginModalActionCreator(isShow) {
  return {
    type: ActionType.SET_SHOW_LOGIN_MODAL,
    payload: {
      showLoginModal: isShow,
    },
  };
}

export { ActionType, setLoginModalActionCreator };
