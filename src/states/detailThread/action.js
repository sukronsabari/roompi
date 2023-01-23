import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  clearCommentsActionCreator,
  receiveCommenstActionCreator,
} from '../comments/action';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  NEUTRALIZE_DETAIL_VOTE: 'NEUTRALIZE_DETAIL_VOTE',
};

function checkThreadIsUpVoted({ detailThread, userId }) {
  return detailThread.upVotesBy.includes(userId);
}

function checkThreadIsDownVoted({ detailThread, userId }) {
  return detailThread.downVotesBy.includes(userId);
}

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function upVoteDetailThreadActionCreator({ userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator({ userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function neutralizeDetailVoteThread({ userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_VOTE,
    payload: {
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(clearDetailThreadActionCreator());
    dispatch(clearCommentsActionCreator());
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread(threadId);
      const { comments } = detailThread;
      dispatch(receiveDetailThreadActionCreator(detailThread));
      dispatch(receiveCommenstActionCreator(comments));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    const selectedTreadIsVoted = checkThreadIsUpVoted({
      detailThread,
      userId: authUser.id,
    });

    if (selectedTreadIsVoted) {
      dispatch(neutralizeDetailVoteThread({ userId: authUser.id }));

      try {
        await api.neutralizeVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailVoteThread({ userId: authUser.id }));
      }
    } else {
      dispatch(upVoteDetailThreadActionCreator({ userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(upVoteDetailThreadActionCreator({ userId: authUser.id }));
      }
    }
  };
}

function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    const selectedTreadIsVoted = checkThreadIsDownVoted({
      detailThread,
      userId: authUser.id,
    });

    if (selectedTreadIsVoted) {
      dispatch(neutralizeDetailVoteThread({ userId: authUser.id }));

      try {
        await api.neutralizeVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(neutralizeDetailVoteThread({ userId: authUser.id }));
      }
    } else {
      dispatch(downVoteDetailThreadActionCreator({ userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(downVoteDetailThreadActionCreator({ userId: authUser.id }));
      }
    }
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralizeDetailVoteThread,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
};
