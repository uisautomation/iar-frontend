import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  flex: { flex: 1 },
  createButton: {
    backgroundColor: theme.customColors.white,
  },
  appBarBackground: {backgroundColor: theme.customColors.appBarBackground, boxShadow: theme.shadows[2]}
});

/*
  Renders the app bar of the list view of Assets.
  */
const AssetListHeader = ({ title, classes }) => (
  <AppBar position="static" className={classes.appBarBackground}>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        { title }
      </Typography>
      <Link className='App-raised-button-link' to="/asset/create">
        <Button variant='raised' className={classes.createButton}>Add new entry</Button>
      </Link>
    </Toolbar>
  </AppBar>
);

AssetListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AssetListHeader);
