import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { FormLabel, FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import DisplayOnlyInput from './DisplayOnlyInput';
import MultiSelectViewGroup from './MultiSelectViewGroup';

import { DIGITAL_STORAGE_SECURITY_LABELS, PAPER_STORAGE_SECURITY_LABELS } from '../data';
import styles from '../styles';

// An explicit "none of the above" answer to augment {...}_STORAGE_SECURITY_LABELS.
const noneOfTheAboveLabel = { value: 'none', label: 'None of the above' };

/**
 * The "personal data" section of the asset form.
 */
const StorageAndSecurityView = (
  { component: Component = 'div', asset = { }, classes, ...rest }
) => (
  <Component {...rest}>
    <Grid container spacing={40} alignItems='center'>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Where is the asset stored?</InputLabel>
          <DisplayOnlyInput value={asset.storage_location} />
        </FormControl>
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        Is the asset stored in a digital format?
      </Grid>
      <Grid item xs={6}>
        <div className={classes.staticAnswer}>{
          asset.storage_format
          ? ((asset.storage_format.indexOf('digital') !== -1) ? 'Yes' : 'No')
          : 'Unanswered'
        }</div>
      </Grid>

      {
        (asset.storage_format && (asset.storage_format.indexOf('digital') !== -1)) ? (
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" classes={{ root: classes.viewControlLabel }}>
                What security measures are followed to be keep the digital asset safe?
              </FormLabel>
              <MultiSelectViewGroup
                labels={[...DIGITAL_STORAGE_SECURITY_LABELS, noneOfTheAboveLabel]}
                values={asset ? asset.digital_storage_security : []}
              />
            </FormControl>
          </Grid>
        ) : null
      }

      <Grid item xs={6}>
        Is the asset stored in a physical format?
      </Grid>
      <Grid item xs={6}>
        <div className={classes.staticAnswer}>{
          asset.storage_format
          ? ((asset.storage_format.indexOf('paper') !== -1) ? 'Yes' : 'No')
          : 'Unanswered'
        }</div>
      </Grid>

      {
        (asset.storage_format && (asset.storage_format.indexOf('paper') !== -1)) ? (
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" classes={{ root: classes.viewControlLabel }}>
                What security measures are followed to be keep the physical asset safe?
              </FormLabel>
              <MultiSelectViewGroup
                labels={[...PAPER_STORAGE_SECURITY_LABELS, noneOfTheAboveLabel]}
                values={asset ? asset.paper_storage_security : []}
              />
            </FormControl>
          </Grid>
        ) : null
      }
    </Grid>
  </Component>
);

StorageAndSecurityView.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(styles)(StorageAndSecurityView);
