import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// A component which sets CSS classes on a root element depending on whether the draft is
// currently live. The classes prop is an object with the following optional properties:
//
// root: class name which is always set on the root element
// live: class name which is set on root if the draft is currently live
// notLive: class name which is set on root if the draft is not currently live
//
// Unrecognised props are spread to the root.
const LiveDraftSensor = connect(
  ({ editAsset: { isLive } }) => ({ isLive }), () => ({ })
)(({ component : Component = 'div', isLive, classes = { }, children, ...rest }) => (
  <Component
    className={[
      classes.root || '', isLive ? (classes.live || '') : (classes.notLive || '')
    ].join(' ')}
    {...rest}
  >{
    children
  }</Component>
));

LiveDraftSensor.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  classes: PropTypes.object,
};

export default LiveDraftSensor;
