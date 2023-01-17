import { ActionType } from './action';

function showAddThreadModalReducer(showAddThreadModal = false, action = {}) {
  switch (action.type) {
    case ActionType.SET_SHOW_ADD_THREAD_MODAL:
      return action.payload.showAddThreadModal;
    default:
      return showAddThreadModal;
  }
}

export default showAddThreadModalReducer;
