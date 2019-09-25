import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableToolbar from 'components/ToolBar';
import { selectTrades } from './selectors';
import { subscribeTrades, unSubscribeTrades } from './actions';

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
});

const TradesTable = props => {
  useEffect(() => {
    props.subscribeTrades();
  }, []);
  return (
    <Paper className={props.classes.root}>
      <TableToolbar
        title="Trades"
        subscribe={props.subscribeTrades}
        unSubscribe={props.unSubscribeTrades}
      />
      <div className={props.classes.tableWrapper}>
        <Table className={props.classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {['Time', 'Price', 'Amount'].map(
                row => (
                  <TableCell key={row} align="right">
                    {row}
                  </TableCell>
                ),
                this,
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.slice(0, 10).map((n, i) => (
              <TableRow hover key={i}>
                <TableCell align="right">
                  {moment(n[1]).format('hh:mm:ss')}
                </TableCell>
                <TableCell align="right">
                  {Math.round(n[3] * 100) / 100}
                </TableCell>
                <TableCell align="right">{n[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

TradesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  subscribeTrades: PropTypes.func.isRequired,
  unSubscribeTrades: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectTrades,
});

const mapDispatchToProps = dispatch => ({
  subscribeTrades: compose(
    dispatch,
    subscribeTrades,
  ),
  unSubscribeTrades: compose(
    dispatch,
    unSubscribeTrades,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TradesTable));
