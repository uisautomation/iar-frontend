import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import FetchOrCreateDraft from '../containers/FetchOrCreateDraft';

import AssetPage from './AssetPage';
import { EditHeader } from './Header';
import EditBody from './EditBody';

import styles from '../styles';

/**
 * The asset edit form itself. This is a full-page component which shows the asset form header and
 * body.
 */
const AssetForm = ({ classes }) => (
    <AssetPage>
      <EditHeader className={classes.header} />
      <EditBody className={classes.body} />

      {/* When this component mounts, it checks the current route match and either begins a new draft
        * or loads an existing asset. */}
      <FetchOrCreateDraft />
    </AssetPage>
);

AssetForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetForm);
