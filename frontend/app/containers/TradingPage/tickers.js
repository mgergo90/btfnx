import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { Typography, Toolbar, Button } from '@material-ui/core';
import { compose } from 'redux';
import { selectTickers } from './selectors';
import { subscribeTickers, unSubscribeTickers } from './actions';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

let EnhancedTableToolbar = ({ classes, ...props }) => (
  <Toolbar className={classes.root}>
    <div className={classes.title}>
      <Typography variant="h6" id="tableTitle">
        Ticker
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.subscribeTickers}
      >
        Subscribe
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.unSubscribeTickers}
      >
        UnSubscribe
      </Button>
    </div>
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  subscribeTickers: PropTypes.func.isRequired,
  unSubscribeTickers: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

const BooksTable = props => {
  useEffect(() => {
    props.subscribeTickers();
  }, []);
  return (
    <Paper className={props.classes.root}>
      <EnhancedTableToolbar {...props} />
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

BooksTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  subscribeBooks: PropTypes.func.isRequired,
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
)(withStyles(styles)(BooksTable));
