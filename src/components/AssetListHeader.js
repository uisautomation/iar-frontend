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
    color: theme.customColors.coreGreen,
  },
  appBar: {
    backgroundColor: theme.customColors.appBarBackground,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.drawer.width.xs_sm,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.drawer.width.md_xl,
    },
  },
});

/*
  Renders the app bar of the list view of Assets.
  */
const AssetListHeader = ({ title, classes }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        { title }
      </Typography>
      <Button
        component={Link} to="/asset/" variant='raised'
        className={classes.createButton}
      >
        Add new entry
      </Button>
    </Toolbar>
  </AppBar>
);

AssetListHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AssetListHeader);
