/**
 * specification for asyncReceiveDetailThread function
 * - when the data fetching process is successful :
 *  - dispatch(clearDetailThreadActionCreator());
 *  - dispatch(clearCommentsActionCreator());
 *  - dispatch(setCommentContentActionCreator(''));
 *  - dispatch(showLoading());
 *  - dispatch(hideLoading());
 *  - dispatch(receiveDetailThreadActionCreator(detailThread));
 *  - dispatch(receiveCommenstActionCreator(comments));
 *
 * - when the data fething process is failed :
 *  - dispatch(clearDetailThreadActionCreator());
 *  - dispatch(clearCommentsActionCreator());
 *  - dispatch(setCommentContentActionCreator(''));
 *  - dispatch(showLoading())
 *  - disptach (hideLoading())
 *  - alert(error.message);
 *
 * scenario for asyncReceiveDetailThread function
 * - asyncReceiveDetailThread thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert when data fetching failed
 *
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { asyncReceiveDetailThread } from './action';
import { clearDetailThreadActionCreator } from './action';
import {
  clearCommentsActionCreator,
  receiveCommentsActionCreator,
} from '../comments/action';
import { setCommentContentActionCreator } from '../commentContent/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveDetailThreadActionCreator } from './action';

import api from '../../utils/api';

describe('asyncReceiveDetailThread thunk function', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;
    delete api._getDetailThread;

    vi.clearAllMocks();
  });

  const fakeDetailThreadResponse = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };
  const fakeErrorResponse = new Error('Ups something went wrong');

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const threadId = 'thread-1';
    const { comments } = fakeDetailThreadResponse;
    // stub implementation
    api.getDetailThread = () => Promise.resolve(fakeDetailThreadResponse);

    // mock
    const dispatch = vi.fn();

    // action
    await asyncReceiveDetailThread(threadId)(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(clearDetailThreadActionCreator());
    expect(dispatch).toBeCalledWith(clearCommentsActionCreator());
    expect(dispatch).toBeCalledWith(setCommentContentActionCreator(''));
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(dispatch).toBeCalledWith(
      receiveDetailThreadActionCreator(fakeDetailThreadResponse),
    );
    expect(dispatch).toBeCalledWith(receiveCommentsActionCreator(comments));
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // arrange
    const threadId = 'thread-1';

    // stub implementation
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncReceiveDetailThread(threadId)(dispatch);

    // assert
    expect(dispatch).toBeCalledWith(clearDetailThreadActionCreator());
    expect(dispatch).toBeCalledWith(clearCommentsActionCreator());
    expect(dispatch).toBeCalledWith(setCommentContentActionCreator(''));
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(hideLoading());
    expect(window.alert).toBeCalledWith(fakeErrorResponse.message);
  });
});
