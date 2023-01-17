import { ActionType } from './action';

function showLoginModalReducer(showLoginModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_SHOW_LOGIN_MODAL:
      return action.payload.showLoginModal;
    default:
      return showLoginModal;
  }
}

export default showLoginModalReducer;
