import React from 'react'
import PropTypes from 'prop-types';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = {
  buttonStyle: {
    backgroundColor: 'white',
    paddingRight: 15,
  },
};

/*
  A component implementing a yes/no choice and updating a boolean in state.
  */
const BooleanChoice = ({ name, value, onChange, classes }) => (
  <RadioGroup name={name} value={value ? "true" : "false"} onChange={onChange} row>
    <FormControlLabel value="true" label="yes" control={<Radio />} className={classes.buttonStyle} />
    <FormControlLabel value="false" label="no" control={<Radio />} className={classes.buttonStyle} />
  </RadioGroup>
);

BooleanChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BooleanChoice);
