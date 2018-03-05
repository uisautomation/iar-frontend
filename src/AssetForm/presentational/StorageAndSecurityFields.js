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
import Radio, { RadioGroup } from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';

import Collapse from '../containers/Collapse';
import DraftInput, {
  DraftTextInput,
  DraftArrayCheckboxInput,
  DraftClearArrayCheckboxInput
} from '../../draft/DraftInput';
import { DIGITAL_STORAGE_SECURITY_LABELS, PAPER_STORAGE_SECURITY_LABELS } from '../data';
import sharedStyles from '../styles';

const StorageAndSecurityFields = ({ component: Component = 'div', classes, ...rest }) => (
  <Component {...rest}>
    <Grid container spacing={40}>
      <Grid item xs={6}>
        <DraftTextInput
          name="storage_location"
          component={TextField}
          required
          fullWidth
          label="Where is the asset stored?"
          helperText={
            "For example, on a virtual machine, in a shared drive, in an office in your building. Please give us much detail as you can. " +
            "Ask your computer officer if you're not sure."
          }
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={12}>
        <FormControl component='fieldset' fullWidth required>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              <FormLabel component="legend" classes={{ root: classes.booleanLabel }}>
                Is the asset stored in a digital format?
              </FormLabel>
            </Grid>
            <Grid item xs={4}>
              <DraftInput
                name="storage_format"
                component={RadioGroup}
                row
                classes={{ root: classes.group }}
                mapDraftToInputProps={
                  ({ name }, draft) => ({
                    value: (draft[name] && (draft[name].indexOf('digital') !== -1)) ? 'yes' : 'no'
                  })
                }
                mapOnChangeToPatch={
                  ({ name }, { target: { value } }) => draft => {
                    const values = new Set(draft[name]);
                    if(value === 'yes') {
                      values.add('digital');
                    } else {
                      values.delete('digital');
                    }
                    return { [name]: [...values] };
                  }
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
      shouldShow={
        ({ storage_format }) => (
          Boolean(storage_format) && (storage_format.indexOf('digital') !== -1)
        )
      }
      classes={{ container: classes.collapse }}
    >
      <Grid container spacing={40} classes={{ typeContainer: classes.collapseContainer }}>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth required>
            <FormLabel component="legend">
              What security measures are followed to keep the digital asset safe?
            </FormLabel>
            <FormHelperText>
              Tick all that apply.
            </FormHelperText>
            <FormGroup classes={{ root: classes.group }}>
              {
                DIGITAL_STORAGE_SECURITY_LABELS.map(({ value, label }) => (
                  <DraftArrayCheckboxInput
                    key={value}
                    name="digital_storage_security" value={value} label={label}
                    component={FormControlLabel}
                    control={<Checkbox />}
                    classes={{ root: classes.label }}
                  />
                ))
              }
              <DraftClearArrayCheckboxInput
                name="digital_storage_security" label="None of the above"
                component={FormControlLabel}
                control={<Checkbox />}
                classes={{ root: classes.label }}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Collapse>

    <Grid container spacing={40}>
      <Grid item xs={12}>
        <FormControl component='fieldset' fullWidth required>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              <FormLabel component="legend" classes={{ root: classes.booleanLabel }}>
                Is the asset stored in a physical format?
              </FormLabel>
              <FormHelperText>
                For example, paper.
              </FormHelperText>
            </Grid>
            <Grid item xs={4}>
              <DraftInput
                name="storage_format"
                component={RadioGroup}
                row
                classes={{ root: classes.group }}
                mapDraftToInputProps={
                  ({ name }, draft) => ({
                    value: (draft[name] && (draft[name].indexOf('paper') !== -1)) ? 'yes' : 'no'
                  })
                }
                mapOnChangeToPatch={
                  ({ name }, { target: { value } }) => draft => {
                    const values = new Set(draft[name]);
                    if(value === 'yes') {
                      values.add('paper');
                    } else {
                      values.delete('paper');
                    }
                    return { [name]: [...values] };
                  }
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
      shouldShow={
        ({ storage_format }) => (
          Boolean(storage_format) && (storage_format.indexOf('paper') !== -1)
        )
      }
      classes={{ container: classes.collapse }}
    >
      <Grid container spacing={40} classes={{ typeContainer: classes.collapseContainer }}>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth required>
            <FormLabel component="legend">
              What security measures are followed to keep the physical asset safe?
            </FormLabel>
            <FormHelperText>
              Tick all that apply.
            </FormHelperText>
            <FormGroup classes={{ root: classes.group }}>
              {
                PAPER_STORAGE_SECURITY_LABELS.map(({ value, label }) => (
                  <DraftArrayCheckboxInput
                    key={value}
                    name="paper_storage_security" value={value} label={label}
                    component={FormControlLabel}
                    control={<Checkbox />}
                    classes={{ root: classes.label }}
                  />
                ))
              }
              <DraftClearArrayCheckboxInput
                name="paper_storage_security" label="None of the above"
                component={FormControlLabel}
                control={<Checkbox />}
                classes={{ root: classes.label }}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Collapse>
  </Component>
);

StorageAndSecurityFields.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(sharedStyles)(StorageAndSecurityFields);
