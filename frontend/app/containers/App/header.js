import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './selectors';
import { logoutUser, tryAuthenticate } from './actions';

const styles = {
  root: {
    flexGrow: 1,
    flex: 1,
  },
};

export const Header = props => {
  useEffect(() => {
    props.tryAuthenticate();
  }, []);

  if (props.initialize) {
    return null;
  }

  return (
    <div className={props.classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          {props.user ? (
            <Button className="logout" onClick={props.logout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="login">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object),
  logout: PropTypes.func.isRequired,
  tryAuthenticate: PropTypes.func.isRequired,
  initialize: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  logout: compose(
    dispatch,
    logoutUser,
  ),
  tryAuthenticate: compose(
    dispatch,
    tryAuthenticate,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));
