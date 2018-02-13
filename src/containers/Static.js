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

// Initialise object mapping page names to their content.
const pages = { help };

const styles = {
  paper: { padding: '16px 24px' },
};

/*
  Renders the app bar of the IAR app's static pages.
 */
const StaticHeader = ({ title }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        { title }
      </Typography>
    </Toolbar>
  </AppBar>
);

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
