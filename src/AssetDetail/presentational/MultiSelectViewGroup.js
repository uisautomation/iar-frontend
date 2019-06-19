import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { FormGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import CheckIcon from '@material-ui/icons/Check';

import styles from '../styles';

/**
 * Display which values from a multi select field are presetn
 */
const MultiSelectViewGroup = (
  { labels, values, classes, ...rest }
) => (
  <FormGroup classes={{ root: classes.group }}>
    {
      labels.filter(({ value, label }) => (
        Boolean(values) && (values.indexOf(value) !== -1)
      )).map(({ value, label }) => (
        <FormControlLabel
          key={value} value={value} label={label} checked={true}
          disabled
          control={<Checkbox checkedIcon={<CheckIcon />} classes={{ disabled: classes.viewControlCheckbox }} />}
          classes={{
            root: classes.label,
          }}
        />
      ))
    }
    { (!values || (values.length === 0)) ? <div className={classes.unanswered}>Unanswered</div> : null }
  </FormGroup>
);

MultiSelectViewGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  values: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(MultiSelectViewGroup);
