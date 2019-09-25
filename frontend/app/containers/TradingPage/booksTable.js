import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { Typography, Toolbar, Button } from '@material-ui/core';
import { compose } from 'redux';
import { selectBooks } from './selectors';
import { subscribeBooks, unSubscribeBooks } from './actions';

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
        Books
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.subscribeBooks}
      >
        Subscribe
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.unSubscribeBooks}
      >
        UnSubscribe
      </Button>
    </div>
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  subscribeBooks: PropTypes.func.isRequired,
  unSubscribeBooks: PropTypes.func.isRequired,
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
});

const roundAndAbs = number => Math.abs(Math.round(number * 100) / 100);

const BooksTable = props => {
  useEffect(() => {
    props.subscribeBooks();
  }, []);
  return (
    <Paper className={props.classes.root}>
      <EnhancedTableToolbar {...props} />
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
