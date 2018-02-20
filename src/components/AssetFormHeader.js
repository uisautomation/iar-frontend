import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import NavigateBackButton from '../containers/NavigateBackButton';

const styles = theme => ({
  flex: { flex: 1 },
  cancelButton: { color: theme.customColors.white },
  saveButton: { background: theme.customColors.white }
});

/**
 * Renders the app bar of the form for the creation/editing/viewing of an Asset.
 *
 * @param onClick handles the save button
 * @param asset either the asset being edited/viewed or null if we are creating an asset
 * @param ownsAsset closure that decides if the user owns an asset.
 */
const AssetFormHeader = ({ onClick, asset, ownsAsset, classes }) => {

  // the default title/buttons are for creating an asset
  let title = 'Create new asset';
  let button = (
    <Button className={classes.saveButton} variant="raised" onClick={onClick}>Save</Button>
  );

  if (asset) {
    // define the asset name
    const name = asset.name ? asset.name : asset.id;

    if (ownsAsset(asset)) {
      title = 'Editing: ' + name;
    } else {
      title = 'Viewing: ' + name;
      // overrides the default buttons with a simple back button
      button = (
        <Link className='App-raised-button-link' to="/">
          <Button className={classes.cancelButton} color='primary'>Back</Button>
        </Link>
      );
    }
  }

  return <AppBar position="static">
    <Toolbar>
      <NavigateBackButton />
      <Typography variant="title" color="inherit" className={classes.flex}>
        { title }
      </Typography>
      {button}
    </Toolbar>
  </AppBar>;
};

AssetFormHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  asset: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ lookupApi: { self } }) => {

  const institutions = self && self.institutions ? self.institutions : [];

  // closure that decides if the user owns an asset.
  const ownsAsset = (asset) => (
    institutions.find((institution) => institution.instid === asset.department)
  );

  return { ownsAsset };
};

export default connect(mapStateToProps)(withStyles(styles)(AssetFormHeader));
