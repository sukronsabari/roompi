/**
 * specification asyncSetAuthUser :
 * - when the data fetching process is successful :
 *  - dispatch (showLoading())
 *  - dispatch(setAuthUserActionCreator(authUser));
 *  - dispatch(hideLoading());
 * - when the data fething process is failed :
 *  - dispatch(showLoading())
 *  - disptach (hideLoading())
 *  - alert(error.message);
 *
 * scenario for asyncSetAuthUser thunk function
 * - asyncSetAuthUser thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert when data fetching failed
 *
 * scenario for asyncUnsetAuthUser thunk funtion
 * - asyncUnsetAuthUser thunk function
 *  - should disptach action correctly
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
} from './action';

const fakeTokenResponse = 'token-1';
const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('Ups something went wrong');

describe('asyncSetAuthUser thunk function', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;

    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // dummy
    const email = '';
    const password = '';

    // stub implementation
    api.login = () => Promise.resolve(fakeTokenResponse);
    api.putAccessToken = (token) => token;
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // mock
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email, password })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // arrange
    // dummy
    const email = '';
    const password = '';

    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser({ email, password })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk function', () => {
  it('should disptach action correctly', async () => {
    // arrange
    const dispatch = vi.fn();
    const putAccessToken = vi.spyOn(api, 'putAccessToken');

    // action
    await asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(putAccessToken).toHaveBeenCalledWith('');
  });
});
