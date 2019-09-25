/*
 *
 * TradingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_BOOK_SNAPSHOT,
  UPDATE_BOOKS,
  SAVE_TICKERS_SNAPSHOT,
  SAVE_TRADES_SNAPSHOT,
  UPDATE_TRADES,
} from './constants';

export const initialState = fromJS({
  books: [],
  tickers: [],
  trades: [],
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
    case SAVE_TRADES_SNAPSHOT:
      return state.set('trades', action.payload[1]);
    case UPDATE_TRADES:
      return state.set('trades', [
        action.payload[2],
        ...state.toJS().trades.slice(0, -1),
      ]);
    case SAVE_TICKERS_SNAPSHOT:
      return state.set('tickers', action.payload[1]);
    default:
      return state;
  }
};

export default tradingPageReducer;
