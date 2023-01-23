/**
 * test scenario for commentsReducer
 * - commentsReducer function
 *  - should return inital value when given by unknown action
 *  - should return comments when given by RECEIVE_COMMENTS action
 *  - should return [] when given CLEAR_COMMENTS action
 *  - should return comments with new comment when given by ADD_COMMENT action
 *  - should return comments with one of the comment already upVoted
 *    when given by UP_VOTE_COMMENT action
 *  - should return comments with one of the comment already downVoted
 *    when given by DOWN_VOTE_COMMENT action
 * - should return unVoted comments when given by NEUTRALIZE_VOTE_COMMENT
 */

import { describe, it, expect } from 'vitest';
import commentsReducer from './reducer';

describe('commentsReducer function', () => {
  it('should return inital value when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return comments when given by RECEIVE_COMMENTS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_COMMENTS',
      payload: {
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
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.comments);
  });

  it('should return [] when given CLEAR_COMMENTS action', () => {
    // arrange
    const initialState = [
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
    ];
    const action = {
      type: 'CLEAR_COMMENTS',
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([]);
  });

  it('should return comments with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = [
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
    ];
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it('should return comments with one of the comment already upVoted when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-2',
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['users-1'],
      },
    ]);
  });

  it('should return comments with one of the comment already downVoted when given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-2',
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: ['users-1'],
      },
    ]);
  });

  it('should return unVoted comments when given by NEUTRALIZE_VOTE_COMMENT', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-2',
        content: 'Ini adalah komentar kedua',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: ['users-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: {
        userId: 'users-1',
        commentId: 'comment-2',
      },
    };

    // action (neutralize upVotes)
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);

    const initialState2 = [
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: ['users-1'],
      },
    ];

    // action (neutralize downVotes)
    const nextState2 = commentsReducer(initialState2, action);

    // assert
    expect(nextState2).toEqual([
      {
        ...initialState2[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
