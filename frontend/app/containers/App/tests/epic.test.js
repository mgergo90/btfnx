import { TestScheduler } from 'rxjs/testing';
import * as RxJs from 'rxjs';

import { tryAuthenticate, loginUser, logoutUser } from '../epic';
import {
  tryAuthenticate as tryAuthenticateAction,
  setUserData,
  loginUser as loginUserAction,
  logoutUser as logoutUserAction,
} from '../actions';

describe('App epic', () => {
  let testScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should look for user when tryAuthenticate triggered', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: tryAuthenticateAction(),
      });
      const state$ = null;

      jest.spyOn(RxJs, 'from').mockImplementation(() =>
        cold('-a-#', {
          a: { data: { data: { id: 1 } } },
        }),
      );

      const output$ = tryAuthenticate(action$, state$);

      expectObservable(output$).toBe('--a-b', {
        a: setUserData({ id: 1 }),
        b: setUserData(null),
      });
    });
  });

  it('should login user when loginUser triggered', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const formAction = {
        setSubmitting: jest.fn(),
        setStatus: jest.fn(),
      };

      const action$ = hot('-a', {
        a: loginUserAction([], formAction),
      });
      const state$ = null;

      jest.spyOn(RxJs, 'from').mockImplementation(() =>
        cold('-a-#', {
          a: { data: { data: { id: 1 } } },
        }),
      );

      const output$ = loginUser(action$, state$);

      expectObservable(output$).toBe('--a-b', {
        a: setUserData({ id: 1 }),
        b: { type: 'empty' },
      });
    });
  });

  it('should logout user when logoutUser triggered', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', {
        a: logoutUserAction(),
      });
      const state$ = null;

      jest.spyOn(RxJs, 'from').mockImplementation(() =>
        cold('-a-#', {
          a: { data: [] },
        }),
      );

      const output$ = logoutUser(action$, state$);

      expectObservable(output$).toBe('--a-b', {
        a: setUserData(null),
        b: setUserData(null),
      });
    });
  });
});
