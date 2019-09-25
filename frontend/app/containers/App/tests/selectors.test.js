import { fromJS } from 'immutable';

import {
  selectCurrentUser,
  selectInitialize,
  selectCurrentUserId,
} from '../selectors';

describe('selectCurrentUser', () => {
  it('should select the current user', () => {
    const user = { id: 2 };
    const mockedState = fromJS({
      global: {
        user,
      },
    });
    expect(selectCurrentUser(mockedState)).toEqual(user);
  });
});

describe('selectInitialize', () => {
  it('should select the initialize value', () => {
    const mockedState = fromJS({
      global: {
        initialize: true,
      },
    });
    expect(selectInitialize(mockedState)).toBeTruthy();
  });
});

describe('selectCurrentUserId', () => {
  it('should select the id of the current user', () => {
    const mockedState = fromJS({
      global: {
        user: { id: 2 },
      },
    });
    expect(selectCurrentUserId(mockedState)).toEqual(2);
  });
});
