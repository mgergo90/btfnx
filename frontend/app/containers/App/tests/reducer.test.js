import appReducer, { initialState } from '../reducer';
import { setUserData } from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setUserData action correctly', () => {
    const user = { user: true };
    const expectedResult = state.set('initialize', false).set('user', user);

    expect(appReducer(state, setUserData(user))).toEqual(expectedResult);
  });
});
