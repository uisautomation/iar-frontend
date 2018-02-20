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
    backgroundColor: theme.customColors.complete,
    color: theme.customColors.white,
  },
  inComplete: {
    backgroundColor: theme.customColors.inComplete,
    color: theme.customColors.white,
  },
});

/**
 * Display the complete/in progress status of an asset.
 */
const AssetStatus = ({ isComplete, classes }) => (
  <div className={[classes.base, isComplete ? classes.complete : classes.inComplete].join(' ')}>{
    isComplete ? 'Complete' : 'Incomplete'
  }</div>
);

AssetStatus.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetStatus);
