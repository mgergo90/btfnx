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

const selectTickers = createSelector(
  selectTradingPageDomain,
  substate => substate.toJS().tickers,
);

const selectTrades = createSelector(
  selectTradingPageDomain,
  substate => substate.toJS().trades,
);

export { selectTradingPageDomain, selectBooks, selectTickers, selectTrades };
