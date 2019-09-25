/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectCurrentUser = createSelector(
  selectGlobal,
  globalState => globalState.toJS().user,
);

const selectInitialize = createSelector(selectGlobal, globalState =>
  globalState.get('initialize'),
);

const selectCurrentUserId = createSelector(selectCurrentUser, user => user.id);

export { selectCurrentUser, selectInitialize, selectCurrentUserId };
