/**
 *
 * TradingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectEpic from 'utils/injectEpic';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import epic from './epic';

import BooksTable from './booksTable';

const TradingPage = props => (
  <div>
    <Helmet>
      <title>Trading</title>
    </Helmet>
    <BooksTable />
  </div>
);

TradingPage.propTypes = {
  subscribeBooks: PropTypes.func.isRequired,
};

const withReducer = injectReducer({ key: 'tradingPage', reducer });
const withEpic = injectEpic(epic);

export default compose(
  withReducer,
  withEpic,
)(TradingPage);
