import {
  switchMap,
  map,
  catchError,
  tap,
  ignoreElements,
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import axios from 'axios';
import { from, of } from 'rxjs';

import { setUserData } from 'containers/App/actions';
import {
  LOGIN_USER,
  SET_USER_DATA,
  LOGOUT_USER,
  TRY_AUTHENTICATE,
} from './constants';

export const loginUser = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    map(action => ({
      ...action,
      credentials: {
        data: action.credentials,
      },
    })),
    switchMap(action =>
      from(
        axios({
          method: 'POST',
          url: '/auth/login',
          data: action.credentials,
        }),
      ).pipe(
        tap({
          error: () => action.formActions.setSubmitting(false),
          next: () => {
            action.formActions.setSubmitting(false);
          },
        }),
        map(response => setUserData(response.data.data)),
        catchError(error => {
          action.formActions.setStatus({ backendError: error.message });
          return of({ type: 'empty' });
        }),
      ),
    ),
  );

export const logoutUser = action$ =>
  action$.pipe(
    ofType(LOGOUT_USER),
    switchMap(() =>
      from(
        axios({
          method: 'GET',
          url: '/auth/logout',
        }),
      ).pipe(
        map(() => setUserData(null)),
        catchError(() => of(setUserData(null))),
      ),
    ),
  );

export const redirectAfterUserChange = $action =>
  $action.pipe(
    ofType(SET_USER_DATA),
    tap(action => {
      axios.defaults.headers.common['CSRF-Token'] = null;
      if (action.user) {
        axios.defaults.headers.common['CSRF-Token'] = action.user.csrf_token;
      }
    }),
    ignoreElements(),
  );

export const tryAuthenticate = $action =>
  $action.pipe(
    ofType(TRY_AUTHENTICATE),
    switchMap(() =>
      from(axios.get('/auth/me')).pipe(
        map(response => setUserData(response.data.data)),
        catchError(() => of(setUserData(null))),
      ),
    ),
  );

export default combineEpics(
  loginUser,
  redirectAfterUserChange,
  logoutUser,
  tryAuthenticate,
);
