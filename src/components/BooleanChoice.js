import React from 'react'
import { RadioButtonGroup, RadioButton } from 'material-ui';

const groupStyle = {
  display: 'flex',
  borderLeft: '1px solid #d1d1d1'
};

const buttonStyle = {
  width: 'auto',
  borderWidth: '1px 1px 1px 0',
  borderStyle: 'solid',
  borderColor: '#d1d1d1',
  padding: "10px 20px"
};

/*
  A component implementing a yes/no choice and updating a boolean in state.
  */
const BooleanChoice = (props) => (
  <RadioButtonGroup
    name={props.name}
    valueSelected={props.value}
    onChange={(e, value) => props.onChange(props.name, value)}
    style={groupStyle}
  >
    <RadioButton value={true} label="yes" style={buttonStyle} />
    <RadioButton value={false} label="no" style={buttonStyle} />
  </RadioButtonGroup>
);

export default BooleanChoice
