import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  selected: { background: theme.palette.action.selected },
  listItem: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.drawer.listItem.fontSize.xs_sm,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: theme.drawer.listItem.fontSize.md_xl,
    },
  }
});

/**
 * Sidebar navigation link based on ListItem.
 *
 * Reflects current location as well as allowing navigation to location in "to" prop.
 * Passes a default component to the ListItem of "Link" which can be overridden via the "component"
 * prop. Broadcasts unrecognised props to this component.
 *
 * If the to prop is defined, it is matched against the current location and an "active" state is
 * indicated when the location matches.
 *
 */
const SidebarNavLink = (
  // We don't care about staticContext here but we need to filter it out of the props given to us
  // by withRouter() to avoid issues like
  // https://github.com/ReactTraining/react-router/issues/4683.
  {component = Link, location, to, label, classes, staticContext, className, ...rest}
) => {
  // compute the new className to pass down to the ListItem component. This little dance is
  // required because className is a space-separated list of tokens, not an array :(.
  const newClassName = (
    (className ? (className + ' ') : '') +
    ((location && to && (location.pathname === to)) ? classes.selected : '')
  );

  return (
    <ListItem button component={component} to={to} className={newClassName} {...rest}>
      <ListItemText primary={label} className={classes.listItem} disableTypography={true} />
    </ListItem>
  );
}

SidebarNavLink.propTypes = {
  // this prop-type is copied from the underlying ListItem proptypes.
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  to: PropTypes.string,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default withRouter(withStyles(styles)(SidebarNavLink));
