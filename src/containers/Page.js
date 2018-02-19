/**
 * Top-level page for IAR containing sidebar and content.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Sidebar } from '../components';
import Drawer from 'material-ui/Drawer';

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100vh',
    width: theme.drawerWidth,
  },
  pageContent: {
    width: '100%',
  },
  pageContentWithSidebar: {
    width: '100%',
    marginLeft: theme.drawerWidth,
  },
});

const FullPage = withStyles(styles)(({ children, classes }) => (
  <div className={classes.appFrame}>
    <div className={classes.pageContent}>
      { children }
    </div>
  </div>
));

const SidebarPage = withStyles(styles)(({ children, classes }) => (
  <div className={classes.appFrame}>
    <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
      <Sidebar />
    </Drawer>
    <div className={classes.pageContentWithSidebar}>
      { children }
    </div>
  </div>
));

const Page = ({ children, withSidebar }) => (
  withSidebar ? <SidebarPage children={children} /> : <FullPage children={children} />
);

Page.propTypes = {
  withSidebar: PropTypes.bool
};

Page.defaultProps = {
  withSidebar: true
};

export default Page;
