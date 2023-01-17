import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import detailThreadReducer from './detailThread/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import showLoginModalReducer from './showLoginModal/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import showAddThreadModalReducer from './showAddThreadModal/reducer';
import commentsReducer from './comments/reducer';
import commentContentReducer from './commentContent/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    users: usersReducer,
    showLoginModal: showLoginModalReducer,
    leaderboards: leaderboardsReducer,
    showAddThreadModal: showAddThreadModalReducer,
    comments: commentsReducer,
    commentContent: commentContentReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
