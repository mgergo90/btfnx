import {
  map,
  switchMap,
  takeUntil,
  retryWhen,
  delay,
  tap,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';

import {
  saveBookSnapshot,
  updateBooks,
  saveTickerSnapshot,
  saveTradeSnapshot,
  updateTrades,
} from './actions';

import {
  SUBSCRIBE_BOOKS,
  UNSUBSCRIBE_BOOKS,
  SUBSCRIBE_TICKERS,
  UNSUBSCRIBE_TICKERS,
  SUBSCRIBE_TRADES,
  UNSUBSCRIBE_TRADES,
} from './constants';

const subscribeBooks = action$ =>
  action$.pipe(
    ofType(SUBSCRIBE_BOOKS),
    switchMap(action => {
      const books$ = webSocket({
        url: 'wss://api-pub.bitfinex.com/ws/2',
      });
      books$.subscribe();
      books$.next({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        freq: 'F1',
        prec: action.prec || 'P0',
        len: action.len || '25',
      });
      return books$.pipe(
        map(payload => {
          if (Array.isArray(payload)) {
            if (Array.isArray(payload[1][0])) {
              return saveBookSnapshot(payload);
            }
            return updateBooks(payload);
          }
          return { type: 'empty' };
        }),
        takeUntil(action$.ofType(UNSUBSCRIBE_BOOKS)),
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error', err);
            }),
            delay(3000),
          ),
        ),
      );
    }),
  );

const subscribeTickers = action$ =>
  action$.pipe(
    ofType(SUBSCRIBE_TICKERS),
    switchMap(() => {
      const tickers$ = webSocket({
        url: 'wss://api-pub.bitfinex.com/ws/2',
      });
      tickers$.subscribe();
      tickers$.next({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      });
      return tickers$.pipe(
        map(payload => {
          if (Array.isArray(payload) && Array.isArray(payload[1])) {
            return saveTickerSnapshot(payload);
          }
          return { type: 'empty' };
        }),
        takeUntil(action$.ofType(UNSUBSCRIBE_TICKERS)),
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error', err);
            }),
            delay(3000),
          ),
        ),
      );
    }),
  );

const subscribeTrades = action$ =>
  action$.pipe(
    ofType(SUBSCRIBE_TRADES),
    switchMap(() => {
      const trades$ = webSocket({
        url: 'wss://api-pub.bitfinex.com/ws/2',
      });
      trades$.subscribe();
      trades$.next({
        event: 'subscribe',
        channel: 'trades',
        symbol: 'tBTCUSD',
      });
      return trades$.pipe(
        map(payload => {
          if (Array.isArray(payload)) {
            if (Array.isArray(payload[1][0])) {
              return saveTradeSnapshot(payload);
            }
            if (Array.isArray(payload[2])) {
              return updateTrades(payload);
            }
          }
          return { type: 'empty' };
        }),
        takeUntil(action$.ofType(UNSUBSCRIBE_TRADES)),
        retryWhen(errors =>
          errors.pipe(
            tap(err => {
              console.error('Got error', err);
            }),
            delay(3000),
          ),
        ),
      );
    }),
  );

export default combineEpics(subscribeBooks, subscribeTickers, subscribeTrades);
