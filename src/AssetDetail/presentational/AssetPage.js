import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Page from '../../containers/Page';

/**
 * An asset detail pafe. This is a full-page component which usually shows the header and a body.
 */
const AssetPage = ({ classes, children }) => (
  <Page withSidebar={false}>
    <div className={classes.content}>
      { children }
    </div>
  </Page>
);

AssetPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Default styles for asset form.
const styles = theme => ({
  content: {
    position: 'absolute',
    zIndex: -100,
    backgroundColor: theme.customColors.darkGreen,
    left: 0, top: 0,
    width: '100%', height: theme.spacing.unit * 69,
  },
});

export default withStyles(styles)(AssetPage);
