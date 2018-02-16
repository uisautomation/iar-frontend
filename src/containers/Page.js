/**
 * Top-level page for IAR containing sidebar and content.
 */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Sidebar } from '../components';
import Drawer from 'material-ui/Drawer';
import {withRouter} from "react-router-dom";

const drawerWidth = 240;

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
    width: drawerWidth,
  },
  pageContent: {
    width: '100%',
    marginLeft: drawerWidth,
  },
});

const Page = ({ children, classes, location: {pathname} }) => (
  <div className={classes.appFrame}>
    <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
      {/* TODO if you don't pass pathname here then "by department" Sidebar items don't re-render and item selection isn't updated */}
      <Sidebar pathname={pathname} />
    </Drawer>
    <div className={classes.pageContent}>
      { children }
    </div>
  </div>
);

export default withRouter(withStyles(styles)(Page));
