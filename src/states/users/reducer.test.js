/**
 * test scenario for usersReducer
 * - usersReducer
 *  - should return initial value when given by unknown action
 *  - should return users when given by RECEIVE_USERS action
 */

import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';

describe('usersReducer', () => {
  it('should return initial value when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return users when given by RECEIVE_USERS action', () => {
    // arrange
    const initialState = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const action = {
      types: 'RECEIVE_USERS',
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
});
