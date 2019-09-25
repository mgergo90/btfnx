import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableToolbar from 'components/ToolBar';
import { selectBooks } from './selectors';
import { subscribeBooks, unSubscribeBooks } from './actions';

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

const roundAndAbs = number => Math.abs(Math.round(number * 100) / 100);

const BooksTable = props => {
  useEffect(() => {
    props.subscribeBooks();
  }, []);
  return (
    <Paper className={props.classes.root}>
      <TableToolbar
        title="Books"
        subscribe={props.subscribeBooks}
        unSubscribe={props.unSubscribeBooks}
      />
      <div className={props.classes.tableWrapper}>
        <Table className={props.classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {['Count', 'Amount', 'Total', 'Price'].map(
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
            {props.data
              .filter(item => item[2] >= 0)
              .splice(0, 10)
              .map((n, i) => (
                <TableRow hover key={i}>
                  <TableCell align="right">{n[1]}</TableCell>
                  <TableCell align="right">{roundAndAbs(n[2])}</TableCell>
                  <TableCell align="right">{roundAndAbs(n[2])}</TableCell>
                  <TableCell align="right">{n[0]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Table className={props.classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {['Count', 'Amount', 'Total', 'Price'].map(
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
            {props.data
              .filter(item => item[2] < 0)
              .splice(0, 10)
              .map((n, i) => (
                <TableRow hover key={i}>
                  <TableCell align="right">{n[1]}</TableCell>
                  <TableCell align="right">{roundAndAbs(n[2])}</TableCell>
                  <TableCell align="right">{roundAndAbs(n[2])}</TableCell>
                  <TableCell align="right">{n[0]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

BooksTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  subscribeBooks: PropTypes.func.isRequired,
  unSubscribeBooks: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: selectBooks,
});

const mapDispatchToProps = dispatch => ({
  subscribeBooks: compose(
    dispatch,
    subscribeBooks,
  ),
  unSubscribeBooks: compose(
    dispatch,
    unSubscribeBooks,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BooksTable));
