import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TableToolbar from 'components/ToolBar';
import { selectTickers } from './selectors';
import { subscribeTickers, unSubscribeTickers } from './actions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '50%',
  },
  tableWrapper: {
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  data: {
    padding: '10px',
  },
});

const Tickers = props => {
  useEffect(() => {
    props.subscribeTickers();
  }, []);
  return (
    <Paper className={props.classes.root}>
      <TableToolbar
        title="Ticker"
        subscribe={props.subscribeTickers}
        unSubscribe={props.unSubscribeTickers}
      />
      <div>
        <span className={props.classes.data}>BTC/USD</span>
        <span className={props.classes.data}>{props.data[0]}</span>
      </div>
      <div>
        <span className={props.classes.data}>
          VOL {Math.round(props.data[7] * 100) / 100}
        </span>
        <span className={props.classes.data}>{props.data[4]}</span>
      </div>
      <div>
        <span className={props.classes.data}>LOW {props.data[9]}</span>
        <span className={props.classes.data}>HIGH {props.data[8]}</span>
      </div>
    </Paper>
  );
};

Tickers.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  subscribeTickers: PropTypes.func.isRequired,
  unSubscribeTickers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectTickers,
});

const mapDispatchToProps = dispatch => ({
  subscribeTickers: compose(
    dispatch,
    subscribeTickers,
  ),
  unSubscribeTickers: compose(
    dispatch,
    unSubscribeTickers,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Tickers));
