import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import {
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import {DraftArrayCheckboxInput, DraftClearArrayCheckboxInput, DraftTextInput} from '../../draft/DraftInput';
import { RISK_TYPE_LABELS } from '../data';
import styles from '../styles';

const RiskFields = ({ component: Component = 'div', classes, ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <FormControl component="fieldset" fullWidth required>
          <FormLabel component="legend">
            What are the risks if the information in this asset were lost or compromised?
          </FormLabel>
          <FormHelperText>
            Tick all that apply.
          </FormHelperText>
          <FormGroup classes={{ root: classes.group }}>
            {
              RISK_TYPE_LABELS.map(({ value, label }) => (
                <DraftArrayCheckboxInput
                  key={value}
                  name="risk_type" value={value} label={label}
                  component={FormControlLabel}
                  control={<Checkbox />}
                  classes={{ root: classes.label }}
                />
              ))
            }
            <DraftClearArrayCheckboxInput
              name="risk_type" label="None of the above"
              component={FormControlLabel}
              control={<Checkbox />}
              classes={{ root: classes.label }}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <DraftTextInput
          name="risk_type_additional"
          component={TextField}
          fullWidth
          multiline
          label="Supporting information"
          helperText="Please tell us a bit more detail about why these risks exist and how it could impact your institution or the University"
        />
      </Grid>
    </Grid>
  </Component>
);

RiskFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(styles)(RiskFields);

