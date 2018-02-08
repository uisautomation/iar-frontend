import React from 'react'
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const styles = {
  labelStyle: {
    backgroundColor: 'white',
    margin: 1,
  },
};

/*
  A component implementing a group of Checkbox selections. The expects a labels property (a list of value/label objects)
  and a values property (the initially selected values). As a Checkbox is checked/unchecked the values property is
  updated and the parents onChange method is called to update the state.
  */
const CheckboxGroup = (
  { name, title, labels, values, disabled = false, onChange = () => null, classes }
) => {
  const valueSet = new Set(values);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{ title }</FormLabel>
      <FormGroup>
        {
          labels.map(({ value, label }, index) => (
            <FormControlLabel
              key={index}
              className={classes.labelStyle}
              disabled={disabled}
              control={<Checkbox />} checked={valueSet.has(value)}
              label={label}
              onChange={({ target: { checked } }) => {
                const newValues = new Set(values);
                if(checked) { newValues.add(value) } else { newValues.delete(value) }
                onChange({ target: { name, value: [...newValues] } });
              }}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  );
}

export default withStyles(styles)(CheckboxGroup);
