import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  wrapper: {
    marginBottom: '15px',
  },
});

const InputField = ({
  classes,
  field,
  form: { touched, errors },
  ...props
}) => (
  <div className={classes.wrapper}>
    <TextField
      fullWidth
      error={Boolean(touched[field.name] && errors[field.name])}
      {...field}
      {...props}
    />
    <FormHelperText error>
      {touched[field.name] && errors[field.name]}
    </FormHelperText>
  </div>
);

InputField.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.instanceOf(Object),
    errors: PropTypes.instanceOf(Object),
  }),
};

export default withStyles(styles)(InputField);
