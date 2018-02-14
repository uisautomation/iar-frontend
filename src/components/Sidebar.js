import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';

import LogoutLink from './LogoutLink';
import Divider from 'material-ui/Divider';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import SidebarNavLink from './SidebarNavLink';
import Logo from '../images/cambridgeuniversity_logo.svg';
import {connect} from "react-redux";
import {getSelf} from "../redux/actions/lookupApi";

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
class Sidebar extends Component {

  /*
  TODO doesn't need to be here - but it needs to be somewhere
   */
  componentDidMount() {
    const { isLoggedIn, self, getSelf } = this.props;
    // if we are signed in and we haven't retrieved the profile - then retrieve the profile.
    if (isLoggedIn && !self) {
      getSelf();
    }
  }

  render() {
    const { classes, self } = this.props;
    const institutions = (self && self.institutions ? self.institutions : []);
    return <div>
      <div className={classes.drawerHeader}>
        <Toolbar className={classes.logoToolbar} disableGutters={true}>
          <img src={Logo} className={classes.camLogo} alt="Cambridge University Logo"/>
          <div className={classes.tagLine}>Information Asset Register</div>
        </Toolbar>
      </div>
      <Divider />

      <List component='nav'>
        <SidebarNavLink to='/assets/all' label='All Assets' />
        {
          institutions.map(({ instid, name }) => (
            <SidebarNavLink key={instid} to={'/assets/dept/' + instid} label={name} className={classes.nested} />
          ))
        }
        <SidebarNavLink to='/help' label='Help' />
        <SidebarNavLink component={LogoutLink} label='Sign out' />
      </List>
    </div>
  }
}

const mapDispatchToProps = { getSelf };

const mapStateToProps = ({ auth: { isLoggedIn }, lookupApi: { self } } ) => {

  return { isLoggedIn, self };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
