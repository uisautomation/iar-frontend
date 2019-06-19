import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FetchAsset from '../containers/FetchAsset';

import AssetPage from './AssetPage';
import ViewHeader from './ViewHeader';
import ViewBody from './ViewBody';

import styles from '../styles';

/**
 * Read only asset view. Takes current asset as a prop.
 */
const AssetView = ({ classes }) => (
  <AssetPage>
    <FetchAsset>
    {
      ({ asset, isLoading = false}) => (
        <div>
          <ViewHeader className={classes.header} asset={asset} />
          <ViewBody className={classes.body} asset={asset} isLoading={!asset || isLoading} />
        </div>
      )
    }
    </FetchAsset>
  </AssetPage>
);

AssetView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetView);
