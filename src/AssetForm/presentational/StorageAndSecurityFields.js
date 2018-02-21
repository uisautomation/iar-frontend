import React from 'react'
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import { DraftTextInput } from '../containers/DraftInput';

const StorageAndSecurityFields = ({ component: Component = 'div', ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <DraftTextInput
          name="storage_location"
          component={TextField}
          fullWidth
          label="Where is the asset stored?"
          helperText={
            "For example, on a virtual machine, in a shared drive, in cloud storage. " +
            "Ask your computer officer if you're not sure."
          }
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={12}>
        TODO: digital/paper storage
      </Grid>
    </Grid>
  </Component>
);

StorageAndSecurityFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default StorageAndSecurityFields;

