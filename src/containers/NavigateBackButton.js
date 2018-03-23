/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { navigate } from "../previous";

export const BackIconButton = props => (
  <IconButton color="inherit" aria-label="Go back" {...props}>
    <ArrowBack />
  </IconButton>
);

const NavigateBackButton = ({
  // We swallow the extra props from connect and withRouter to avoid broadcasting them to the root.
  history, location, component: Component, match, staticContext, ...rest
}) => (
  <Component {...rest} onClick={() => {navigate(history, location)}} />
);

NavigateBackButton.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

NavigateBackButton.defaultProps = {
  component: BackIconButton,
};

/**
 * A component which navigates back to the previous location the user was in the application or to
 * the application root if there was no location.
 *
 * By default renders a BackIconButton but this can be overridden via the component prop.
 * Unrecognised props are spread to the wrapped component.
 *
 */
export default withRouter(NavigateBackButton)
