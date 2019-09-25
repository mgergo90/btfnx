import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tradingPage state domain
 */

const selectTradingPageDomain = state => state.get('tradingPage', initialState);

const selectBooks = createSelector(
  selectTradingPageDomain,
  substate => substate.toJS().books,
);

export { selectTradingPageDomain, selectBooks };
