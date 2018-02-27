import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { FormLabel, FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import DisplayOnlyInput from './DisplayOnlyInput';
import MultiSelectViewGroup from './MultiSelectViewGroup';

import { RISK_TYPE_LABELS } from '../data';
import styles from '../styles';

/**
 * The "personal data" section of the asset form.
 */
const RiskView = (
  { component: Component = 'div', asset = { }, classes, ...rest }
) => (
  <Component {...rest}>
    <Grid container spacing={40} alignItems='center'>
      <Grid item xs={12}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" classes={{ root: classes.viewControlLabel }}>
            What are the risks if the information in this asset were lost or compromised?
          </FormLabel>
          <MultiSelectViewGroup
            labels={RISK_TYPE_LABELS} values={asset ? asset.risk_type : []}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Additional information</InputLabel>
          <DisplayOnlyInput value={ asset.risk_type_additional || 'None' } />
        </FormControl>
      </Grid>
    </Grid>
  </Component>
);

RiskView.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(styles)(RiskView);
