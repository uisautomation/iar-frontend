/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";

export const BackIconButton = props => (
  <IconButton color="inherit" aria-label="Go back" {...props}>
    <ArrowBack />
  </IconButton>
);

const UnconnectedNavigateBackButton = (
  {
    // we swallow the extra props from connect and withRouter to avoid broadcasting them to the
    // root
    match, history, location, staticContext, dispatch,
    component: Component, goBack, ...rest
  }
) => (
  <Component {...rest} onClick={goBack} />
);

UnconnectedNavigateBackButton.propTypes = {
  goBack: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

UnconnectedNavigateBackButton.defaultProps = {
  component: BackIconButton,
}

const mapStateToProps = ({ assets: { fetchedAt }}, { history } ) => {

  // closure to implement a safe history.goBack()
  const goBack = () => {
    if (fetchedAt) {
      // only go back if an asset list has previously been visited
      history.goBack();
    } else {
      history.push('/');
    }
  };

  return { goBack }
};

/**
 * A component which navigates back to the previous location the user was in the application or to
 * the application root if there was no location.
 *
 * By default renders a BackIconButton but this can be overridden via the component prop.
 * Unrecognised props are spread to the wrapped component.
 *
 */
const NavigateBackButton = withRouter(connect(mapStateToProps)(UnconnectedNavigateBackButton));

export default NavigateBackButton;
