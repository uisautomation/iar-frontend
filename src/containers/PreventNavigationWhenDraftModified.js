import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const BLOCK_PROMPT =
  'This entry has not yet been saved. Navigating away will cause any changes you have made to be lost.';

/**
 * A component which keeps tabs on the isModified state of the current draft and prevents
 * navigation when it is being modified.
 */
class PreventNavigationWhenDraftModified extends Component {
  constructor(...args) {
    super(...args);

    // store the "unblock" function returned from history.block. If this is non-null, it's an
    // indication that we are blocking navigation
    this.unblock = null;

    this.updateBlock(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateBlock(newProps);
  }

  updateBlock({ history, isModified }) {
    // cancel any existing block if draft becomes un-modified
    if(!isModified && this.unblock) { this.unblock(); this.unblock = null; }

    // if this draft becomes modified and we're not already blocking, do so
    if(isModified && !this.unblock) { this.unblock = history.block(BLOCK_PROMPT); }
  }

  componentWillUnmount() {
    // cancel any existing block if this component is unmounted
    if(this.unblock) { this.unblock(); this.unblock = null; }
  }

  render() { return null; }
}

PreventNavigationWhenDraftModified.propTypes = {
  history: PropTypes.shape({
    block: PropTypes.func.isRequired,
  }).isRequired,
  isModified: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ editAsset: { isModified } }) => ({ isModified });

export default connect(mapStateToProps)(withRouter(PreventNavigationWhenDraftModified))
