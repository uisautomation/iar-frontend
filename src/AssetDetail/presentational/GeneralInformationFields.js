import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';

import Lookup from '../../components/Lookup'
import OwnInstitutionField from '../../components/OwnInstitutionField';

import { DraftTextInput, DraftCheckboxInput } from '../../draft/DraftInput';

import ShowOnlyWhenDraftFieldIs from '../containers/ShowOnlyWhenDraftFieldIs';
import sharedStyles from '../styles';
import { PURPOSE_LABELS } from '../data';

/**
 * The "general information" section of the asset form.
 */
const GeneralInformationFields = ({ component: Component = 'div', classes, ...rest }) => (
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
            "'Visiting academics database'. If your institution has sub-divisions, or is part of the Academic Division you should reference that too, eg ‘(Student Registry) HR Records’."
          }
          inputProps={{maxlength: 240}}  // HACK: until 400 handling is better
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="department"
          component={OwnInstitutionField}
          required
          fullWidth
          label="Asset institution"
        />
      </Grid>
      <Grid item xs={6} />

      <Grid item xs={6}>
        <DraftTextInput
          name="purpose"
          component={TextField}
          required
          fullWidth
          select
          label="Asset primary purpose"
          helperText={
            // HACK: non-breaking space character, used to make sure the space of helper text is
            // taken up to avoid the section resizing when owner and purpose_other field comes and
            // goes.
            "\xa0"
          }
          inputProps={{maxlength: 240}}  // HACK: until 400 handling is better
        >
          {PURPOSE_LABELS.map(({ value, label }) => (
            <MenuItem key={value} value={value}>{ label }</MenuItem>
          ))}
        </DraftTextInput>
      </Grid>
      <Grid item xs={6}>
        <ShowOnlyWhenDraftFieldIs name="purpose" expectedValue="research">
          <DraftTextInput
            name="owner"
            required
            fullWidth
            component={Lookup}
            label="Who is the Principal Investigator of this research activity?"
            helperText="You can search by either name or CRSid"
            classes={{ container: classes.fullWidth }}
          />
        </ShowOnlyWhenDraftFieldIs>

        <ShowOnlyWhenDraftFieldIs name="purpose" expectedValue="other">
          <DraftTextInput
            name="purpose_other"
            component={TextField}
            required
            fullWidth
            label="Other purpose"
            inputProps={{maxlength: 240}}  // HACK: until 400 handling is better
          />
        </ShowOnlyWhenDraftFieldIs>
      </Grid>

      <Grid item xs={6}>
        <DraftCheckboxInput
          name="private"
          component={FormControlLabel}
          control={<Switch />}
          label="Make this entry private to your institution"
        />
      </Grid>
      <Grid item xs={6} />
    </Grid>
  </Component>
);

GeneralInformationFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const styles = theme => ({
  ...sharedStyles,

  // hack for Lookup component to make Autosuggest full width
  fullWidth: { width: '100%' }
});

export default withStyles(styles)(GeneralInformationFields);
