import React from 'react';
import PropTypes from 'prop-types';
import Page from '../containers/Page';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

// Import static page contents
import help from '../static/help';
import feedback from '../static/feedback';

// Initialise object mapping page names to their content.
const pages = { help, feedback };

const styles = theme => ({
  paper: { padding: '16px 24px', margin: '60px 120px' },
  staticAppBar: {backgroundColor: theme.customColors.appBarBackground}
});

/*
  Renders the app bar of the IAR app's static pages.
 */
const StaticHeader = withStyles(styles)(({ title, classes }) => (
  <AppBar position="static" className={classes.staticAppBar}>
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
const Static = ({ page, classes }) => {
  const { title, content } = pages[page];
  return (
    <Page>
      <div>
        <StaticHeader title={title} />
        <Paper className={classes.paper}>
          <Grid container justify='center'>
            <Grid item xs={12} sm={10} md={8} lg={6} >
              <Typography component='div'>{ content }</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Page>
  );
}

Static.propTypes = {
  page: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Static);
