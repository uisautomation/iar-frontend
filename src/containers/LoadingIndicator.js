import React from 'react';
import { connect } from 'react-redux';
import Fade from '@material-ui/core/Fade';
import { LinearProgress } from '@material-ui/core';

// An indeterminate linear progress indicator which is ownly shown when there is an asset list
// request in flight.
const LoadingIndicator = connect(({ assets: { isLoading } }) => ({ isLoading }))(
  ({ isLoading }) => (
    <Fade in={isLoading}><LinearProgress /></Fade>
  )
);

export default LoadingIndicator;
