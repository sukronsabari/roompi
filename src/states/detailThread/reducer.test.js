/**
 * test scenario for detailThreadReducer
 * - detailThreadReducer function
 *  - should return initial value when given by unknown action
 *  - should return detailThread when given by RECEIVE_DETAIL_THREAD action
 *  - should return null when given by CLEAR_DETAIL_THREAD action
 *  - should return the upVoted detailThread when given by UP_VOTE_DETAIL_THREAD action
 *  - should return the downVoted detailThread when given by DOWN_VOTE_DETAIL_THREAD action
 *  - should return unVoted detailThread when given by NEUTRALIZE_VOTE_THREAD
 */

import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';

describe('detailThreadReducer function', () => {
  it('should return initial value when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: {
        detailThread: {
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
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return null when given by CLEAR_DETAIL_THREAD action', () => {
    // arrange
    const initialState = [
      {
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
      },
    ];
    const action = {
      type: 'CLEAR_DETAIL_THREAD',
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the upVoted detailThread when given by UP_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
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

    const action = {
      type: 'UP_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'users-2',
        threadId: 'thread-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['users-2'],
    });
  });

  it('should return the downVoted detailThread when given by DOWN_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
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
    const action = {
      type: 'DOWN_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: ['users-2'],
    });
  });

  it('should return unVoted detailThread when given by NEUTRALIZE_VOTE_THREAD', () => {
    // arrange
    const initialState = {
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
          upVotesBy: ['users-3'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD',
      payload: {
        userId: 'users-3',
      },
    };

    // action (neutralize upVotes)
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [],
    });

    const initialState2 = {
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['users-3'],
    };

    // action (neutralize downVotes)
    const nextState2 = detailThreadReducer(initialState, action);

    // assert
    expect(nextState2).toEqual({
      ...initialState2,
      downVotesBy: [],
    });
  });
});
