import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Button } from '@material-ui/core';

const styles = theme => ({
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

const TableToolbar = ({ classes, ...props }) => (
  <Toolbar className={classes.root}>
    <div className={classes.title}>
      <Typography variant="h6" id="tableTitle">
        {props.title}
      </Typography>
    </div>
    <div className={classes.spacer} />
    <div className={classes.actions}>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.subscribe}
      >
        Subscribe
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={props.unSubscribe}
      >
        UnSubscribe
      </Button>
    </div>
  </Toolbar>
);

TableToolbar.propTypes = {
  subscribe: PropTypes.func.isRequired,
  unSubscribe: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(TableToolbar);
