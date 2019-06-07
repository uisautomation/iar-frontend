import React from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { LinearProgress } from '@material-ui/core';

import LiveDraftSensor from '../containers/LiveDraftSensor';
import LoadingDraftSensor from '../containers/LoadingDraftSensor';
import SaveDraftButton from '../containers/SaveDraftButton';
import {
  GeneralInformationCompleteIndicator, PersonalDataCompleteIndicator, RiskCompleteIndicator,
  StorageCompleteIndicator,
} from '../containers/SectionCompleteIndicators';

import Section from './Section';
import GeneralInformationFields from './GeneralInformationFields';
import PersonalDataFields from './PersonalDataFields';
import RiskFields from './RiskFields';
import StorageAndSecurityFields from './StorageAndSecurityFields';

/**
 * The asset form body itself.
 *
 * Renders body inside a root component. By default this is Paper. Set the component prop to
 * override. Unrecognised props are spread to the root element.
 */
const EditBody = ({ component: Component = Paper, classes, ...rest }) => (
  <Component {...rest}>
    <div className={classes.loadingIndicatorContainer}>
      <LoadingDraftSensor
        classes={{
          root: [classes.animatedOpacity, classes.loadingIndicator].join(' '),
          notLoading: classes.hidden
        }}
      >
        <LinearProgress variant="indeterminate" />
      </LoadingDraftSensor>
    </div>

    <LiveDraftSensor classes={{ root: classes.animatedOpacity, notLive: classes.hidden }}>
      <Section title="General information" indicator={<GeneralInformationCompleteIndicator />}>
        <GeneralInformationFields className={classes.formSection} />
      </Section>

      <Section title="Personal data" indicator={<PersonalDataCompleteIndicator />}>
        <PersonalDataFields className={classes.formSection} />
      </Section>

      <Section title="Risks" indicator={<RiskCompleteIndicator />}>
        <RiskFields className={classes.formSection} />
      </Section>

      <Section title="Storage and security" indicator={<StorageCompleteIndicator />}>
        <StorageAndSecurityFields className={classes.formSection} />
      </Section>

      <div className={classes.formSection}>
        <SaveDraftButton color="primary" variant="raised" size="large">Save entry</SaveDraftButton>
      </div>
    </LiveDraftSensor>
  </Component>
);

EditBody.propTypes = {
  component: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  formSection: {
    padding: [[
      theme.spacing.unit * 3, theme.spacing.unit * 10,
    ]],
  },
  loadingIndicatorContainer: { position: 'relative', pointerEvents: 'none' },
  loadingIndicator: { position: 'absolute', left: 0, right: 0, top: 0 },
  animatedOpacity: {
    opacity: 1,
    // We add a standard duration delay to the opacity transition so that we don't see the tail end
    // of the form control animations as the form fades in.
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easeIn, delay: theme.transitions.duration.standard
    }),
  },
  hidden: { opacity: 0 }
});

export default withStyles(styles)(EditBody);
