import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import NavigateBackButton from '../../containers/NavigateBackButton';

import Header, { styles, HeaderButton } from './Header';

// Header for read-only view
const ViewHeader = withStyles(styles)(({ classes, asset }) => (
  <Header classes={classes}>
    {
      // only show title if there is an asset loaded at the moment
      asset ? (
        <Typography variant="title" color="inherit" className={classes.flex}>
          Viewing entry: { asset.name ? asset.name : asset.id }
        </Typography>
      ) : null
    }

    <div className={classes.buttonGroup}>
      <NavigateBackButton component={HeaderButton} classes={{ root: classes.button }}>
        Close
      </NavigateBackButton>
    </div>
  </Header>
));

ViewHeader.propTypes = {
  asset: PropTypes.object,
};

export default ViewHeader;
