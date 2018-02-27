import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import DisplayOnlyInput from './DisplayOnlyInput';
import {
  DisplayOnlyLookupInput, DisplayOnlyPersonInput
} from '../containers/DisplayOnlyInputViews';

import sharedStyles from '../styles';
import { PURPOSE_LABELS } from '../data';

/**
 * The "general information" section of the asset form.
 */
const GeneralInformationView = (
  { component: Component = 'div', asset = { }, classes, ...rest }
) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Asset name</InputLabel>
          <DisplayOnlyInput value={asset.name || ''} />
        </FormControl>
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Asset department</InputLabel>
          <DisplayOnlyLookupInput value={asset.department || ''} />
        </FormControl>
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Asset purpose</InputLabel>
          <DisplayOnlyInput
            value={
              PURPOSE_LABELS.reduce((displayLabel, { value, label }) => (
                (value === asset.purpose) ? label : displayLabel
              ), null) || asset.purpose || ''
            }
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        {
          // If the purpose is "research", display it
          asset.purpose === 'research' ? (
            <FormControl fullWidth>
              <InputLabel>Who is the Principal Investigator of this research activity?</InputLabel>
              <DisplayOnlyPersonInput value={asset.owner || ''} />
            </FormControl>
          ) : null
        }
        {
          // If the purpose is "other", display it
          asset.purpose === 'other' ? (
            <FormControl fullWidth>
              <InputLabel>Asset purpose</InputLabel>
              <DisplayOnlyInput value={asset.purpose_other || ''} />
            </FormControl>
          ) : null
        }
      </Grid>
    </Grid>
  </Component>
);

GeneralInformationView.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const styles = theme => ({
  ...sharedStyles,

  // hack for Lookup component to make Autosuggest full width
  fullWidth: { width: '100%' }
});

export default withStyles(styles)(GeneralInformationView);
