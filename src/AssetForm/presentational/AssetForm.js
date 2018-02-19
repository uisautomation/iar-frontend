import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Page from '../../containers/Page';

import FetchOrCreateDraft from '../containers/FetchOrCreateDraft';

import Header from './Header';
import Body from './Body';

/**
 * The asset edit form itself. This is a full-page component which shows the asset form header and
 * body.
 */
const AssetForm = ({ classes }) => (
  <Page withSidebar={false}>
    <div className={classes.content}>
      <Header className={classes.header} />
      <Body className={classes.body} />
    </div>

    {/* When this component mounts, it checks the current route match and either begins a new draft
      * or loads an existing asset. */}
    <FetchOrCreateDraft />
  </Page>
);

AssetForm.propTypes = {
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

  header: {
    position: 'absolute',
    left: 0, top: 0,
    width: '100%',
  },

  body: {
    margin: [[
      theme.spacing.unit * 16,
      theme.spacing.unit * 23,
      theme.spacing.unit * 4,
      theme.spacing.unit * 23,
    ]],
  },
});

export default withStyles(styles)(AssetForm);
