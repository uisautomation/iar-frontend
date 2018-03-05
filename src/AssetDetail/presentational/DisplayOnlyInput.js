import React from 'react';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

// This was developed by inspecting the Material UI source directly. (This is, in fact, recommended
// in the documentation!) It may, therefore, need changing as Material UI changes.
const styles = theme => ({
  disabled: { color: 'inherit' },
  underline: { '&$disabled:before': { background: 'none' } },
});

/**
 * A variant of Input which is, ironically, non-editable. It simply displays its value.
 */
export default withStyles(styles)(({value, ...props}) => (
  <Input {...props} value={value ? value : 'Unanswered'} readOnly disabled />
));
