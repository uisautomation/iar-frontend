import React from 'react'
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';

import Lookup from '../../components/Lookup'
import OwnInstitutionField from '../../components/OwnInstitutionField';

import { DraftTextInput, DraftCheckboxInput } from '../containers/DraftInput';

/**
 * The "general information" section of the asset form.
 */
const GeneralInformationFields = ({ component: Component = 'div', ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <DraftTextInput
          name="name"
          component={TextField}
          required
          fullWidth
          label="Asset name"
          helperText={
            "Give the asset a unique name so you can easily identify it, for example, " +
            "'Visting academics database'."
          }
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="department"
          component={OwnInstitutionField}
          required
          fullWidth
          label="Asset department"
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="purpose"
          component={TextField}
          required
          fullWidth
          label="Asset purpose"
          helperText={
            "For example, 'To keep a record of current and former staff and salaries for HR " +
            "purposes'."
          }
        />
      </Grid>
      <Grid item xs={6}>
        <DraftTextInput
          name="owner"
          component={Lookup}
          label="Who is the Principal Investigator of this research activity?"
          helperText="You can search by either name or CRSid"
        />
      </Grid>

      <Grid item xs={6}>
        <DraftCheckboxInput
          name="private"
          component={FormControlLabel}
          control={<Switch />}
          label="Make this record private to your deparment"
        />
      </Grid>
      <Grid item xs={6} />
    </Grid>
  </Component>
);

GeneralInformationFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default GeneralInformationFields;
