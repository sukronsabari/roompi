/* eslint-disable no-underscore-dangle */
/**
 * spesifikasi :
 * - when the fetching process is successful :
 *  - dispatch showLoading()
 *  - dispatch receiveThreadsActionCreator();
 *  - dispatch receiveUsersActionCreator()
 *  - dispatch hideLoading()
 *
 * - when the fetching process fails :
 *  - dispatch showLoading()
 *  - Call alert() with error message
 *  - dispatch hideLoading()
 *
 * scenario test :
 * - asyncPopulateThreadsAndUsers thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import asyncPopulateThreadsAndUsers from './action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

// eslint-disable-next-line no-unused-vars
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateThreadsAndUsers thunk function', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    // delete backup
    delete api._getAllThreads;
    delete api._getAllUsers;

    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeUsersResponse);

    // mock & spy
    const dispatch = vi.fn();
    const spy = vi.spyOn(window, 'alert');

    // action
    await asyncPopulateThreadsAndUsers()(dispatch);

    // arrange
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(spy).toHaveBeenCalled(fakeUsersResponse.message);
  });
});
