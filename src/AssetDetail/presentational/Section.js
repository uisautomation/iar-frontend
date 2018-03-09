import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

/**
 * A section of the asset form. Takes a title and optional indicator node. Uses the following CSS
 * class names from the classes prop:
 *
 * section: styling for <section> tag
 * heading: styling for <h1> tag at top of section
 * title: styling for title within <h1> tag
 * indicator: styling for indicator within <h1> tag
 */
const Section = ({ title, indicator, classes, children }) => (
  <section className={classes.section}>
    <h1 className={classes.heading}>
      <div className={classes.title}>{ title }</div>
      { indicator ? <div className={classes.indicator}>{ indicator }</div> : null }
    </h1>
    <div className={classes.content}>
      { children }
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  indicator: PropTypes.node,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  section: {
    // Before the first section element inside a container, reset section CSS counter to
    // zero.
    '&:first-child::before': {
      counterReset: 'form-section',
    },

    // Each section increments the section counter.
    counterIncrement: 'form-section',

    position: 'relative',
  },

  heading: {
    ...theme.customMixins.formSection,

    '&::before': {
      content: 'counter(form-section) "."',
      textAlign: 'right',
      display: 'inline-block',
      width: theme.spacing.unit * 8,
      paddingRight: theme.spacing.unit,
    },

    paddingLeft: theme.spacing.unit * 1,
    fontSize: 'inherit',
    fontWeight: 'inherit',
    margin: [[0, 0]],
    display: 'flex',
  },

  title: {
    flex: '1 1 auto',
  },

  indicator: {
    paddingRight: theme.spacing.unit * 2,
  },

  content: { /* No specific styling */ },
});

export default withStyles(styles)(Section);
