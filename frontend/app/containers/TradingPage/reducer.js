/*
 *
 * TradingPage reducer
 *
 */

import { fromJS } from 'immutable';
import { SAVE_BOOK_SNAPSHOT, UPDATE_BOOKS } from './constants';

export const initialState = fromJS({
  books: [],
});

const tradingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BOOK_SNAPSHOT:
      return state.set('books', action.payload[1]);
    case UPDATE_BOOKS:
      return state.set('books', [
        ...state.toJS().books.splice(1),
        action.payload[1],
      ]);
    default:
      return state;
  }
};

export default tradingPageReducer;
