import React from 'react';
import { withStyles } from 'material-ui/styles';

import LogoutLink from './LogoutLink';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import SidebarNavLink from './SidebarNavLink';
import Logo from '../images/cambridgeuniversity_logo.svg';

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  nested: { paddingLeft: theme.spacing.unit * 4 },
  camLogo: { width: '145px', paddingTop: '10px'},
  tagLine: { fontSize: 12},
  logoToolbar: { flexDirection:'column', alignItems: 'flex-start', paddingLeft: theme.spacing.unit * 2  }
});

/**
 * The content of the IAR application side bar.
 */
const Sidebar = ({ classes, history, logout }) => (
  <div>
    <div className={classes.drawerHeader}>
      <Toolbar className={classes.logoToolbar} disableGutters={true}>
        <img src={Logo} className={classes.camLogo} alt="Cambridge University Logo"/>
        <div className={classes.tagLine}>Information Asset Register</div>
      </Toolbar>
    </div>
    <Divider />

    <List component='nav'>
      <SidebarNavLink to='/assets/all' label='All Assets' />
      <SidebarNavLink to='/assets/dept' label='Department of Foo' className={classes.nested} />
      <SidebarNavLink to='/help' label='Help' />
      <SidebarNavLink component={LogoutLink} label='Sign out' />
    </List>
  </div>
);

export default withStyles(styles)(Sidebar);
