/**
 * Top-level page for IAR containing sidebar and content.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CheckIsUser, Sidebar } from '../components';
import Drawer from 'material-ui/Drawer';
import {withRouter} from "react-router-dom";
import {WaitForSelf} from "../waiting";

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

// checks that the user has been configured as a user of the application
const checkIsUser = <WaitForSelf><CheckIsUser/></WaitForSelf>;

const FullPage = withStyles(styles)(({ children, classes }) => (
  <div className={classes.appFrame}>
    <div className={classes.pageContent}>
      { children }
    </div>
    {checkIsUser}
  </div>
));

const SidebarPage = withRouter(withStyles(styles)(({ children, classes, location: {pathname} }) => (
  <div className={classes.appFrame}>
    <Drawer variant="permanent" classes={{paper: classes.drawerPaper}}>
      {/* TODO if you don't pass pathname here then "by department" Sidebar items don't re-render and item selection isn't updated */}
      <Sidebar pathname={pathname} />
    </Drawer>
    <div className={classes.pageContentWithSidebar}>
      { children }
    </div>
    {checkIsUser}
  </div>
)));

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
