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
