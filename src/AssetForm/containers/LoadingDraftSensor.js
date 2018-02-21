import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// A component which sets CSS classes on a root element depending on whether the draft is
// currently loading. The classes prop is an object with the following optional properties:
//
// root: class name which is always set on the root element
// loading: class name which is set on root if the draft is currently loading
// notLoading: class name which is set on root if the draft is not currently loading
//
// Unrecognised props are spread to the root.
const LoadingDraftSensor = connect(
  ({ editAsset: { isLoading } }) => ({ isLoading }), () => ({ })
)(({ component : Component = 'div', isLoading, classes = { }, children, ...rest }) => (
  <Component
    className={[
      classes.root || '', isLoading ? (classes.loading || '') : (classes.notLoading || '')
    ].join(' ')}
    {...rest}
  >{
    children
  }</Component>
));

LoadingDraftSensor.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  classes: PropTypes.object,
};

export default LoadingDraftSensor;
