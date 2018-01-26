import React from 'react'
import { RadioButtonGroup, RadioButton } from 'material-ui';

/*
  FIXME
  */
const YesNoChoice = (props) => (
  <RadioButtonGroup
    name={props.name}
    valueSelected={props.value}
    onChange={(e, value) => props.onChange(props.name, value)}
    style={{ display: 'flex' }}
  >
    <RadioButton value={true} label="yes" style={{ paddingRight: "20px", width: 'auto' }} />
    <RadioButton value={false} label="no" style={{ width: 'auto' }} />
  </RadioButtonGroup>
);

export default YesNoChoice
