/* eslint-disable react/forbid-foreign-prop-types */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Suspense, lazy, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import Loader from 'components/Loader';
import reducer from './reducer';

// https://github.com/ReactTraining/react-router/issues/6420
Route.propTypes.component = PropTypes.oneOfType([
  Route.propTypes.component,
  PropTypes.object,
]);

const TradingPage = lazy(() => import('containers/TradingPage'));
const NotFoundPage = lazy(() => import('containers/NotFoundPage'));

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const App = ({ classes }) => (
  <Fragment>
    <Helmet titleTemplate="%s - Btfnx" defaultTitle="Btfnx" />
    <Suspense fallback={<Loader />}>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={TradingPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
    </Suspense>
  </Fragment>
);

App.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
  withRouter,
  withReducer,
)(withStyles(styles)(App));
