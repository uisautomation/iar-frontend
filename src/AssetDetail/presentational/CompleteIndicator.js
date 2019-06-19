import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InProgressIcon from '@material-ui/icons/MoreHoriz';
import CompleteIcon from '@material-ui/icons/Check';

const styles = theme => ({
  indicator: {
    color: theme.customColors.white,
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
    opacity: 1,
    position: 'relative',
    borderRadius: '50%',
    transition: theme.transitions.create(
      ['opacity', 'background-color'], { easing: theme.transitions.easing.easeIn }
    ),
    overflow: 'hidden',
  },

  complete: { backgroundColor: theme.customColors.complete },

  incomplete: { backgroundColor: theme.customColors.incomplete },

  notSpecified: { opacity: 0 },

  iconContainer: {
    position: 'absolute',
    width: theme.spacing.unit * 6,
    opacity: 1,
    transition: theme.transitions.create(
      ['left', 'opacity'], { easing: theme.transitions.easing.easeIn }
    ),
  },

  iconContainerShowComplete: { left: -theme.spacing.unit * 3 },
  iconContainerShowInProgress: { left: 0 },
  iconContainerShowNotSpecified: { opacity: 0 },
});

/**
 * A small indicator used to show if a section of the form is complete.
 */
const CompleteIndicator = ({ isComplete, classes, className = '', ...rest }) => {
  const classNames = [className, classes.indicator];
  const iconContainerClassNames = [classes.iconContainer];

  switch(isComplete) {
    case true:
      classNames.push(classes.complete);
      iconContainerClassNames.push(classes.iconContainerShowComplete);
      break;
    case false:
      classNames.push(classes.incomplete);
      iconContainerClassNames.push(classes.iconContainerShowInProgress);
      break;
    default:
      classNames.push(classes.notSpecified);
      iconContainerClassNames.push(classes.iconContainerShowNotSpecified);
      break;
  };

  return (
    <div className={classNames.join(' ')}>
      <div className={iconContainerClassNames.join(' ')}>
        <InProgressIcon />
        <CompleteIcon />
      </div>
    </div>
  );
};

CompleteIndicator.propTypes = {
  isComplete: PropTypes.bool,
};

export default withStyles(styles)(CompleteIndicator);
