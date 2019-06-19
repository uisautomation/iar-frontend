import React from 'react';
import PropTypes from 'prop-types';
import Page from '../containers/Page';
import { AppBar, Toolbar, Typography, Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { pages } from '../static';

const styles = theme => ({
  paper: { padding: '16px 24px', margin: '60px 120px' },
  staticAppBar: {
    backgroundColor: theme.customColors.appBarBackground,
    paddingLeft: theme.drawerWidth,
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
  },
});

/*
  Renders the app bar of the IAR app's static pages.
 */
const StaticHeader = withStyles(styles)(({ title, classes }) => (
  <AppBar position="fixed" className={classes.staticAppBar}>
    <Toolbar>
      <Typography variant="title" color="inherit">
        { title }
      </Typography>
    </Toolbar>
  </AppBar>
));

/**
 * Renders the IAR app's static pages.
 *
 * The page prop must be a string with corresponding content object in pages.
 */
const Static = ({ page, classes, withSidebar }) => {
  const { title, content } = pages[page];
  return (
    <Page withSidebar={withSidebar}>
      <div>
        <StaticHeader title={title} />
        <div className={classes.content}>
          <Paper className={classes.paper}>
            <Grid container justify='center'>
              <Grid item xs={12} sm={10} md={8} lg={6} >
                <Typography component='div'>{ content }</Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </Page>
  );
};

Static.propTypes = {
  page: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  withSidebar: PropTypes.bool
};

Static.defaultProps = {
  withSidebar: true
};

export default withStyles(styles)(Static);
