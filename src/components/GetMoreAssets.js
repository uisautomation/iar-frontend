import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import CircularProgress from 'material-ui/CircularProgress';
import { getMoreAssets } from '../redux/actions/assetRegisterApi';
import { connect } from 'react-redux';

/**
 * A component which requests more assets when it becomes visible. The request is only made if the
 * "next" URL is not the same as the "lastRequestedUrl" in the asset state. If there are more
 * assets loading, this component renders as a loading indicator.
 */
const GetMoreAssets = ({ nextUrl, shouldLoadMore, isLoading, getMoreAssets }) => (
  <VisibilitySensor
    active={shouldLoadMore}
    onChange={isVisible => { if(isVisible && shouldLoadMore) { getMoreAssets(nextUrl); } }}
  >
    <div style={{padding: '5px'}}>
      <CircularProgress style={{visibility: isLoading ? 'visible' : 'hidden' }} />
    </div>
  </VisibilitySensor>
);

GetMoreAssets.propTypes = {
  nextUrl: PropTypes.string,
  shouldLoadMore: PropTypes.bool.isRequired,
  getMoreAssets: PropTypes.func.isRequired,
}

const mapStateToProps = ({ assets: { url, next: nextUrl, isLoading } }) => ({
  nextUrl, isLoading,

  // The logic here is that we should only request more assets when the last loaded URL is not the
  // current next URL and we don't currently have a request in flight.
  shouldLoadMore: (nextUrl !== null) && (url !== nextUrl) && !isLoading,
});

const mapDispatchToProps = { getMoreAssets };

export default connect(mapStateToProps, mapDispatchToProps)(GetMoreAssets);
