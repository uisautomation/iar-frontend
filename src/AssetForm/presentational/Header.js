import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/DeleteForever';

import NavigateBackButton from '../../containers/NavigateBackButton';
import withScroll from '../../containers/withScroll';

import SaveDraftButton from '../containers/SaveDraftButton';
import DeleteEntryButton from '../containers/DeleteEntryButton';
import PageTitle from '../containers/PageTitle';

import DraftIsExistingAsset from '../../draft/DraftIsExistingAsset';

// A wrapper for Button which defaults to the right props for the header.
const HeaderButton = ({ component: Component = Button, children, ...rest }) => (
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

/**
 * Presentational component which renders the asset form header.
 */
const Header = ({ classes }) => (
  <ScrollSensitiveAppBar position="fixed" color="inherit" className={classes.appBar}>
    <Toolbar>
      <NavigateBackButton />
      <Typography variant="title" color="inherit" className={classes.flex}>
        <PageTitle />
      </Typography>

      <div className={classes.buttonGroup}>
        <DraftIsExistingAsset>{ isExistingAsset =>
          isExistingAsset
          ? (
            <DeleteEntryButton component={HeaderButton} className={classes.button}>
              <DeleteIcon className={classes.leftIcon} /> Delete entry
            </DeleteEntryButton>
          ) : null
        }</DraftIsExistingAsset>
        <NavigateBackButton component={HeaderButton} classes={{ root: classes.button }}>
          Cancel
        </NavigateBackButton>
        <SaveDraftButton
          component={HeaderButton} color="default"
          className={[classes.button, classes.saveButton].join(' ')}
        >
          Save entry
        </SaveDraftButton>
      </div>
    </Toolbar>
  </ScrollSensitiveAppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
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

export default withStyles(styles)(Header);