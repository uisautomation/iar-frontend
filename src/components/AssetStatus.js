import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  base: {
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: theme.spacing.unit * 0.5,
    textAlign: 'center',
    borderRadius: theme.spacing.unit * 0.25,
  },
  complete: {
    backgroundColor: theme.palette.complete,
    color: '#fff',
  },
  inProgress: {
    backgroundColor: theme.palette.inProgress,
    color: '#fff',
  },
});

/**
 * Display the complete/in progress status of an asset.
 */
const AssetStatus = ({ isComplete, classes }) => (
  <div className={[classes.base, isComplete ? classes.complete : classes.inProgress].join(' ')}>{
    isComplete ? 'Complete' : 'In\u2011progress'
  }</div>
);

AssetStatus.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetStatus);
