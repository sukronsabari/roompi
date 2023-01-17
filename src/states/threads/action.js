import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setShowAddThreadModal } from '../showAddThreadModal/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREAD',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function findThreadWithId(threads, id) {
  return threads.find((thread) => thread.id === id);
}

function checkTreadIsUpVoted({ userId, threadId, threads }) {
  const threadSelected = findThreadWithId(threads, threadId);
  const isVoted = threadSelected.upVotesBy.includes(userId);

  return isVoted;
}

function checkTreadIsDownVoted({ userId, threadId, threads }) {
  const threadSelected = findThreadWithId(threads, threadId);
  const isVoted = threadSelected.downVotesBy.includes(userId);

  return isVoted;
}

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = 'General' }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));

      dispatch(hideLoading());
      dispatch(setShowAddThreadModal(false));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const selectedTreadIsVoted = checkTreadIsUpVoted({
      userId: authUser.id,
      threadId,
      threads,
    });

    if (selectedTreadIsVoted) {
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );

      try {
        await api.neutralizeVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id });
      }
    } else {
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const selectedTreadIsVoted = checkTreadIsDownVoted({
      userId: authUser.id,
      threadId,
      threads,
    });

    if (selectedTreadIsVoted) {
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );

      try {
        await api.neutralizeVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(
          neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    } else {
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(
          downVoteThreadActionCreator({ threadId, userId: authUser.id }),
        );
      }
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
};
