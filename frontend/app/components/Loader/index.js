/**
 *
 * Loader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {},
});

const Loader = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
);

Loader.propTypes = {
  classes: PropTypes.instanceOf(Object),
};

export default withStyles(styles)(Loader);
