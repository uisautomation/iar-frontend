import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  flex: { flex: 1 },
};

/*
  Renders the app bar of the list view of Assets.
  */
const AssetFormHeader = ({ title, onClick, classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        { title }
      </Typography>
      <Link className='App-raised-button-link' to="/">
        <Button variant="raised" color='primary'>Cancel</Button>
      </Link>
      &nbsp;
      <Button variant="raised" onClick={onClick}>Save</Button>
    </Toolbar>
  </AppBar>
);

AssetFormHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(AssetFormHeader);
