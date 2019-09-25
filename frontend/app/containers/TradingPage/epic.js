import {
  map,
  switchMap,
  takeUntil,
  retryWhen,
  delay,
  tap,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';

import { saveBookSnapshot, updateBooks } from './actions';
import { SUBSCRIBE_BOOKS, UNSUBSCRIBE_BOOKS } from './constants';

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

export default subscribeBooks;
