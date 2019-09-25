/**
 *
 * TradingPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectEpic from 'utils/injectEpic';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import epic from './epic';

import BooksTable from './booksTable';
import Tickers from './tickers';
import TradesTable from './tradesTable';

const TradingPage = () => (
  <div>
    <Helmet>
      <title>Trading</title>
    </Helmet>
    <BooksTable />
    <Tickers />
    <TradesTable />
  </div>
);

const withReducer = injectReducer({ key: 'tradingPage', reducer });
const withEpic = injectEpic(epic);

export default compose(
  withReducer,
  withEpic,
)(TradingPage);
