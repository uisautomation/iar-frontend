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
import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import Collapse from '../containers/Collapse';
import DraftInput, { DraftTextInput, DraftArrayCheckboxInput } from '../../draft/DraftInput';
import sharedStyles from '../styles';

import { DATA_SUBJECT_LABELS, DATA_CATEGORY_LABELS, RETENTION_LABELS } from '../data';
import ShowOnlyWhenDraftFieldIs from '../containers/ShowOnlyWhenDraftFieldIs';

const PersonalDataFields = ({ component: Component = 'div', classes, ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <FormControl component='fieldset' fullWidth required>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              <FormLabel component="legend" classes={{ root: classes.booleanLabel }}>
                Does this asset hold any personal data?
              </FormLabel>
              <FormHelperText>
                Personal data means any information about a living identifiable individual, for example, a student's name (or CRSid) and email address.
              </FormHelperText>
            </Grid>
            <Grid item xs={4}>
              <DraftInput
                name="personal_data"
                component={RadioGroup}
                row
                classes={{ root: classes.group }}
                mapDraftToInputProps={
                  ({ name }, draft) => ({
                    value: (draft[name] === null) ? 'none' : (draft[name] ? 'yes' : 'no')
                  })
                }
                mapOnChangeToPatch={
                  ({ name }, { target: { value } }) => ({
                    [name]: { none: null, yes: true, no: false }[value]
                  })
                }
              >
                <FormControlLabel
                  classes={{ root: classes.booleanFormControlLabel }}
                  control={<Radio />} value="yes" label="Yes"
                />
                <FormControlLabel
                  classes={{ root: classes.booleanFormControlLabel }}
                  control={<Radio />} value="no" label="No"
                />
              </DraftInput>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </Grid>

    <Collapse
      shouldShow={({ personal_data }) => Boolean(personal_data)}
      classes={{ container: classes.collapse }}
    >
      <Grid container spacing={40} classes={{ typeContainer: classes.collapseContainer }}>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              Who is this personal data about?
            </FormLabel>
            <FormHelperText>
              Tick all that apply.
            </FormHelperText>
            <FormGroup classes={{ root: classes.twoColumnGroup }}>
              {
                DATA_SUBJECT_LABELS.map(({ value, label }) => (
                  <DraftArrayCheckboxInput
                    key={value}
                    name="data_subject" value={value} label={label}
                    component={FormControlLabel}
                    control={<Checkbox />}
                    classes={{ root: classes.twoColumnLabel }}
                  />
                ))
              }
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              What kind of personal data is held?
            </FormLabel>
            <FormHelperText>
              Tick all that apply.
            </FormHelperText>
            <FormGroup classes={{ root: classes.twoColumnGroup }}>
              {
                DATA_CATEGORY_LABELS.map(({ value, label }) => (
                  <DraftArrayCheckboxInput
                    key={value}
                    name="data_category" value={value} label={label}
                    component={FormControlLabel}
                    control={<Checkbox />}
                    classes={{ root: classes.twoColumnLabel }}
                  />
                ))
              }
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component='fieldset' fullWidth required>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend" classes={{ root: classes.booleanLabel }}>
                  Is the asset shared with someone outside the University?
                </FormLabel>
                <FormHelperText>
                  This could be a company or an individual.
                </FormHelperText>
              </Grid>
              <Grid item xs={4}>
                <DraftTextInput
                  row
                  name="recipients_outside_uni"
                  component={RadioGroup}
                  classes={{ root: classes.group }}
                >
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="yes" label="Yes"
                  />
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="no" label="No"
                  />
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="not_sure" label="Not sure"
                  />
                </DraftTextInput>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <ShowOnlyWhenDraftFieldIs name="recipients_outside_uni" expectedValue="yes">
            <DraftTextInput
              name="recipients_outside_uni_description"
              component={TextField}
              required
              fullWidth
              label="Who is it shared with outside the University?"
              helperText="This could be a company or individual."
            />
          </ShowOnlyWhenDraftFieldIs>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={12}>
          <FormControl component='fieldset' fullWidth required>
            <Grid container spacing={40}>
              <Grid item xs={6}>
                <FormLabel component="legend" classes={{ root: classes.booleanLabel }}>
                  Is the asset shared outside of the EEA (European Economic Area)?
                </FormLabel>
                <FormHelperText>
                  This could be a company or an individual. More information regards the EEA <a href="https://www.gov.uk/eu-eea" target="_blank" rel="noopener noreferrer">can be
                  found here</a>.
                </FormHelperText>
              </Grid>
              <Grid item xs={4}>
                <DraftTextInput
                  row
                  name="recipients_outside_eea"
                  component={RadioGroup}
                  classes={{ root: classes.group }}
                >
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="yes" label="Yes"
                  />
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="no" label="No"
                  />
                  <FormControlLabel
                    classes={{ root: classes.booleanFormControlLabel }}
                    control={<Radio />} value="not_sure" label="Not sure"
                  />
                </DraftTextInput>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <ShowOnlyWhenDraftFieldIs name="recipients_outside_eea" expectedValue="yes">
            <DraftTextInput
              name="recipients_outside_eea_description"
              component={TextField}
              required
              fullWidth
              label="Who is it shared with outside of the EEA?"
              helperText="This could be a company or individual."
            />
          </ShowOnlyWhenDraftFieldIs>
        </Grid>
        <Grid item xs={6} />

        <Grid item xs={6}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">
              How long do you expect to keep each record in this asset?
            </FormLabel>
            <FormHelperText>
              If you're not sure
              how long records should be kept, and what to do when you no longer need them, see the <a href="https://www.information-compliance.admin.cam.ac.uk/records-management" target="_blank" rel="noopener noreferrer">records management guidance</a>.
            </FormHelperText>
            <DraftTextInput
              name="retention" component={RadioGroup}
              classes={{ root: classes.group }}
            >
              {
                RETENTION_LABELS.map(({ value, label }) => (
                  <FormControlLabel
                    key={value}
                    value={value} label={label}
                    classes={{ root: classes.label }}
                    control={<Radio />}
                  />
                ))
              }
            </DraftTextInput>
          </FormControl>
        </Grid>
        <Grid item xs={6} />
      </Grid>
    </Collapse>
  </Component>
);

PersonalDataFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(sharedStyles)(PersonalDataFields);
