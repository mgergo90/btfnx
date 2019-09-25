/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware, combineEpics, ofType } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import createReducer from './reducers';
import appEpic from './containers/App/epic';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  const epicMiddleware = createEpicMiddleware();
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // 3. epicMiddleware: Redux observable middleware
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    epicMiddleware,
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.injectedEpics = [];
  store.epics = new BehaviorSubject(combineEpics(appEpic));

  const hotReloadingEpic = (action$, ...rest) =>
    store.epics.pipe(
      mergeMap(epic =>
        epic(action$, ...rest).pipe(
          takeUntil(action$.pipe(ofType('HOT_RELOAD_EPIC'))),
        ),
      ),
    );

  epicMiddleware.run(hotReloadingEpic);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
    module.hot.accept('./containers/App/epic', () => {
      // First kill any running epics
      store.dispatch({ type: 'HOT_RELOAD_EPIC' });
      // Now setup the new one
      store.epics.next(combineEpics(appEpic));
    });
  }

  return store;
}
