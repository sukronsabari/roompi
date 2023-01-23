/**
 * scenario for commentContentReducer
 * - commentContentReducer function
 *  - should return initial value when given by unknown action
 *  - should return commentContent when given by SET_COMMENT_CONTENT action
 */

import { describe, it, expect } from 'vitest';
import commentContentReducer from './reducer';

describe('commentContentReducer', () => {
  it('should return initial value when given by unknown action', () => {
    // arrange
    const initialState = '';
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = commentContentReducer(initialState, action);

    // assert
    expect(nextState).toEqual('');
  });
  it('should return commentContent when given by SET_COMMENT_CONTENT action', () => {
    // arrange
    const initialState = '';
    const action = {
      type: 'SET_COMMENT_CONTENT',
      payload: {
        commentContent: 'Ini adalah isi komentar',
      },
    };

    // action
    const nextState = commentContentReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.commentContent);
  });
});
