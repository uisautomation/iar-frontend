/**
 * Top-level page for IAR containing sidebar and content.
 */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Sidebar } from '../components';
import Drawer from 'material-ui/Drawer';

const drawerWidth = 240;

const styles = theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  pageContent: {
    width: '100%',
  },
});

const Page = ({ children, classes }) => (
  <div className={classes.appFrame}>
    <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
      <Sidebar />
    </Drawer>
    <div className={classes.pageContent}>
      { children }
    </div>
  </div>
);

export default withStyles(styles)(Page);
