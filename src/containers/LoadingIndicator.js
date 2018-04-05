import React from 'react';
import { connect } from 'react-redux';
import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from 'material-ui/Progress';

// An indeterminate linear progress indicator which is ownly shown when there is an asset list
// request in flight.
const LoadingIndicator = connect(({ assets: { isLoading } }) => ({ isLoading }))(
  ({ isLoading }) => (
    <Fade in={isLoading}><LinearProgress /></Fade>
  )
);

export default LoadingIndicator;
