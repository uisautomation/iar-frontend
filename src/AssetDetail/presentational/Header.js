import React from 'react';

import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import NavigateBackButton from '../../containers/NavigateBackButton';
import withScroll from '../../containers/withScroll';

// A wrapper for Button which defaults to the right props for the header.
export const HeaderButton = ({ component: Component = Button, children, ...rest }) => (
  <Component color="primary" size="large" variant="raised" {...rest}>{ children }</Component>
);

const mapScrollToProps = () => ({ hasScrolled: window.scrollY > 0});

/**
 * A version of AppBar which changes its elevation depending on whether the current page has
 * scrolled.
 */
const ScrollSensitiveAppBar = withScroll(mapScrollToProps)(
  ({ hasScrolled, ...rest }) => <AppBar elevation={hasScrolled ? 4 : 0} {...rest} />
);

export const styles = theme => ({
  appBar:{
    backgroundColor: theme.customColors.darkGreen,
    color: theme.customColors.white,
    transition: theme.transitions.create('box-shadow'),
  },

  flex: { flex: 1 },

  buttonGroup: {
    display: 'flex',
    paddingRight: theme.spacing.unit * 9,
  },

  button: {
    marginLeft: theme.spacing.unit * 2,
    width: theme.spacing.unit * 27,
  },

  saveButton: {
    background: theme.customColors.white,
    color: theme.palette.primary.main,
  },

  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

/**
 * Presentational component which renders the asset form header.
 */
const Header = withStyles(styles)(({ classes, children }) => (
  <ScrollSensitiveAppBar position="fixed" color="inherit" className={classes.appBar}>
    <Toolbar>
      <NavigateBackButton />
      { children }
    </Toolbar>
  </ScrollSensitiveAppBar>
));

export default Header;
