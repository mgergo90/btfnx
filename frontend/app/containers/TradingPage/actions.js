/*
 *
 * TradingPage actions
 *
 */

import {
  SUBSCRIBE_BOOKS,
  UNSUBSCRIBE_BOOKS,
  SAVE_BOOK_SNAPSHOT,
  UPDATE_BOOKS,
  SUBSCRIBE_TICKERS,
  UNSUBSCRIBE_TICKERS,
  SAVE_TICKERS_SNAPSHOT,
  SUBSCRIBE_TRADES,
  UNSUBSCRIBE_TRADES,
  SAVE_TRADES_SNAPSHOT,
  UPDATE_TRADES,
} from './constants';

export const subscribeBooks = () => ({
  type: SUBSCRIBE_BOOKS,
});

export const unSubscribeBooks = () => ({
  type: UNSUBSCRIBE_BOOKS,
});

export const saveBookSnapshot = payload => ({
  type: SAVE_BOOK_SNAPSHOT,
  payload,
});

export const updateBooks = payload => ({
  type: UPDATE_BOOKS,
  payload,
});

export const subscribeTickers = () => ({
  type: SUBSCRIBE_TICKERS,
});

export const unSubscribeTickers = () => ({
  type: UNSUBSCRIBE_TICKERS,
});

export const saveTickerSnapshot = payload => ({
  type: SAVE_TICKERS_SNAPSHOT,
  payload,
});

export const subscribeTrades = () => ({
  type: SUBSCRIBE_TRADES,
});

export const unSubscribeTrades = () => ({
  type: UNSUBSCRIBE_TRADES,
});

export const saveTradeSnapshot = payload => ({
  type: SAVE_TRADES_SNAPSHOT,
  payload,
});

export const updateTrades = payload => ({
  type: UPDATE_TRADES,
  payload,
});
