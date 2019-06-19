import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withDraft } from '../../draft';

const styles = theme => ({
  visible: {
    opacity: 1,
    visibility: 'visible',
    transition: [
      theme.transitions.create('opacity'),
    ],
  },

  hidden: {
    opacity: 0,
    visibility: 'hidden',
    height: 0,
    overflow: 'visible',
    transition: [
      theme.transitions.create('opacity'),
      theme.transitions.create(['visibility', 'height'], { delay: theme.transitions.duration.standard }),
    ],
  },
});

// Hide the child when draft field specified by "name" prop does not match "expectedValue" prop.
const ShowOnlyWhenDraftFieldIs = withStyles(styles)(withDraft(
  ({ draft }, { classes, expectedValue, name }) => ({
    // disabled: purpose !== 'research',
    className: [
      classes.container,
      (draft[name] !== expectedValue) ? classes.hidden : classes.visible,
    ].join(' '),
  })
)(({ expectedValue /* swallowed to avoid passing to div */, ...props }) => <div {...props} />));

ShowOnlyWhenDraftFieldIs.propTypes = {
  name: PropTypes.string.isRequired,
  expectedValue: PropTypes.string.isRequired,
};

export default ShowOnlyWhenDraftFieldIs;
