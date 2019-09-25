import { fromJS } from 'immutable';
import tradingPageReducer from '../reducer';

describe('tradingPageReducer', () => {
  it('returns the initial state', () => {
    expect(tradingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
