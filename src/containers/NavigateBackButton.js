/**
 * Button to go back in router history programmatically
 */
import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";

const NavigateBackButton = ({goBack}) => {
  return <IconButton color="inherit" aria-label="Go back" onClick={() => goBack()}>
    <ArrowBack />
  </IconButton>
};

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

export default withRouter(connect(mapStateToProps)(NavigateBackButton));

NavigateBackButton.propTypes = {
  history: PropTypes.object.isRequired,
};