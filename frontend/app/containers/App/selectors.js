/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectCurrentUser = createSelector(
  selectGlobal,
  globalState => globalState.toJS().user,
);

export { selectCurrentUser };
