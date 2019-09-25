import { ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { DEFAULT_ACTION } from './constants';

export const appEpic = action$ =>
  action$.pipe(
    ofType(DEFAULT_ACTION),
    ignoreElements(),
  );

export default appEpic;
