import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import LogoutLink from './LogoutLink';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  nested: { paddingLeft: theme.spacing.unit * 4 },
});

/*
  Renders the content of the IAR application side bar.
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
      <ListItem>
        <ListItemText primary='Assets' />
      </ListItem>
      <ListItem button className={classes.nested} component={Link} to='/assets/all'>
        <ListItemText primary='All' />
      </ListItem>
      <ListItem button className={classes.nested} component={Link} to='/assets/dept'>
        <ListItemText primary='Department of Foo' />
      </ListItem>
      <ListItem button component={Link} to='/help'>
        <ListItemText primary='Help' />
      </ListItem>
      <ListItem button component={LogoutLink}>
        <ListItemText primary='Sign out' />
      </ListItem>
    </List>
  </div>
);

export default withStyles(styles)(Sidebar);
