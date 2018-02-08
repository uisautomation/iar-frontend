import React from 'react';
import { withStyles } from 'material-ui/styles';

import LogoutLink from './LogoutLink';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List';
import SidebarNavLink from './SidebarNavLink';

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  nested: { paddingLeft: theme.spacing.unit * 4 },
});

/**
 * The content of the IAR application side bar.
 */
const Sidebar = ({ classes, history, logout }) => (
  <div>
    <div className={classes.drawerHeader}>
      <Toolbar>
        <Typography variant='title' color='inherit'>IAR</Typography>
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
