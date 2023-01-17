const ActionType = {
  SET_SHOW_ADD_THREAD_MODAL: 'SET_SHOW_ADD_THREAD_MODAL',
};

function setShowAddThreadModal(showAddThreadModal) {
  return {
    type: ActionType.SET_SHOW_ADD_THREAD_MODAL,
    payload: {
      showAddThreadModal,
    },
  };
}

export { ActionType, setShowAddThreadModal };
