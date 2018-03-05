import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { FormLabel, FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import DisplayOnlyInput from './DisplayOnlyInput';

import MultiSelectViewGroup from './MultiSelectViewGroup';

import { DATA_SUBJECT_LABELS, DATA_CATEGORY_LABELS, RETENTION_LABELS } from '../data';
import styles from '../styles';

/**
 * The "personal data" section of the asset form.
 */
const PersonalDataView = (
  { component: Component = 'div', asset = { }, classes, ...rest }
) => (
  <Component {...rest}>
    <Grid container spacing={40} alignItems='center'>
      <Grid item xs={6}>
        Does this asset hold any personal data?
      </Grid>
      <Grid item xs={6}>
        <div className={classes.staticAnswer}>{ asset.personal_data ? 'Yes' : 'No' }</div>
      </Grid>
    </Grid>

    {
      // Only show remaining fields if personal data is set.
      asset.personal_data ? (
        <Grid container spacing={40} alignItems='center'>
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" classes={{ root: classes.viewControlLabel }}>
                Who is this personal data about?
              </FormLabel>
              <MultiSelectViewGroup
                labels={DATA_SUBJECT_LABELS} values={asset ? asset.data_subject : []}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" classes={{ root: classes.viewControlLabel }}>
                What kind of personal data is held?
              </FormLabel>
              <MultiSelectViewGroup
                labels={DATA_CATEGORY_LABELS} values={asset ? asset.data_category : []}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            Is the asset shared with someone outside the University?
          </Grid>
          <Grid item xs={6}>
            <div className={classes.staticAnswer}>{
              (
                {yes: 'Yes', no: 'No', not_sure: 'Not sure'}[asset.recipients_outside_uni]
              ) || 'Unanswered'
            }
            </div>
          </Grid>

          {
            // only show following if "yes" was the answer
            (asset.recipients_outside_uni === 'yes') ? ([
              <Grid item xs={6} key={1}>
                <FormControl fullWidth>
                  <InputLabel>
                    Who is it shared with outside the University?
                  </InputLabel>
                  <DisplayOnlyInput value={asset.recipients_outside_uni_description || ''} />
                </FormControl>
              </Grid>,
              <Grid item xs={6} key={2} />
            ]) : null
          }

          <Grid item xs={6}>
            Is the asset shared outside of the EEA (European Economic Area)?
          </Grid>
          <Grid item xs={6}>
            <div className={classes.staticAnswer}>{
              (
                {yes: 'Yes', no: 'No', not_sure: 'Not sure'}[asset.recipients_outside_eea]
              ) || 'Unanswered'
            }
            </div>
          </Grid>

          {
            // only show following if "yes" was the answer
            (asset.recipients_outside_eea === 'yes') ? ([
              <Grid item xs={6} key={1}>
                <FormControl fullWidth>
                  <InputLabel>
                    Who is it shared with outside of the EEA?
                  </InputLabel>
                  <DisplayOnlyInput value={asset.recipients_outside_eea_description || ''} />
                </FormControl>
              </Grid>,
              <Grid item xs={6} key={2} />
            ]) : null
          }

          <Grid item xs={6}>
            How long do you expect to keep this asset for?
          </Grid>
          <Grid item xs={6}>
            <div className={classes.staticAnswer}>{
              RETENTION_LABELS.reduce((answer, { value, label }) => (
                (asset.retention === value) ? label : answer
              ), 'Unanswered')
            }</div>
          </Grid>

        </Grid>
      ) : null
    }
  </Component>
);

PersonalDataView.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default withStyles(styles)(PersonalDataView);
