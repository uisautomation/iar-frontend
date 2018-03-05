import React from 'react'
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';

import Section from './Section';
import GeneralInformationView from './GeneralInformationView';
import PersonalDataView from './PersonalDataView';
import RiskView from './RiskView';
import StorageAndSecurityView from './StorageAndSecurityView';

/**
 * The asset form body itself.
 *
 * Renders body inside a root component. By default this is Paper. Set the component prop to
 * override. Unrecognised props are spread to the root element.
 */
const Body = ({ component: Component = Paper, asset, isLoading, classes, ...rest }) => (
  <Component {...rest}>
    <div className={classes.loadingIndicatorContainer}>
      <LinearProgress
        variant="indeterminate"
        className={[
          classes.animatedOpacity, classes.loadingIndicator,
          isLoading ? '' : classes.hidden,
        ].join(' ')}
      />
    </div>

    <div
      className={[
        classes.animatedOpacity, isLoading ? classes.hidden : ''
      ].join(' ')}
    >
      <Section title="General information">
        <GeneralInformationView asset={asset} className={classes.formSection} />
      </Section>

      <Section title="Personal data">
        <PersonalDataView asset={asset} className={classes.formSection} />
      </Section>

      <Section title="Risks">
        <RiskView asset={asset} className={classes.formSection} />
      </Section>

      <Section title="Storage & security">
        <StorageAndSecurityView asset={asset} className={classes.formSection} />
      </Section>
    </div>
  </Component>
);

Body.propTypes = {
  component: PropTypes.node,
  classes: PropTypes.object.isRequired,
  asset: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
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

export default withStyles(styles)(Body);
