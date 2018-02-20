import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import NavigateBackButton from '../containers/NavigateBackButton';

const styles = theme => ({
  flex: { flex: 1 },
  cancelButton: { color: theme.customColors.white },
  saveButton: { background: theme.customColors.white }
});

/*
  Renders the app bar of the form for the creation/editing of an Asset.
  */
const AssetFormHeader = ({ title, onClick, classes }) => (
  <AppBar position="static">
    <Toolbar>
      <NavigateBackButton />
      <Typography variant="title" color="inherit" className={classes.flex}>
        { title }
      </Typography>
      <Button className={classes.saveButton} variant="raised" onClick={onClick}>Save</Button>
    </Toolbar>
  </AppBar>
);

AssetFormHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(AssetFormHeader);
