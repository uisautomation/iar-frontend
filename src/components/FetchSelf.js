import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSelf } from '../redux/actions/lookupApi';

/**
 * A component which causes the authenticated user's profile to be fetched from lookup when the
 * user logs in and the profile has not previously been fetched. Since this list needs only to be
 * fetched once, place it *outside* of any dynamic routes, etc.
 *
 * The fetching waits until auth.isLoggedIn becomes true.
 */
class FetchSelf extends Component {

  componentDidMount = () => this.getSelf();

  componentDidUpdate = () => this.getSelf();

  getSelf = () => {
    // If we are signed in and we haven't retrieved (and aren't retrieving) the profile -
    // then retrieve the profile.
    const { shouldFetch, getSelf } = this.props;
    if (shouldFetch) {
      getSelf();
    }
  };

  render = () => {
    return null;
  };
}


FetchSelf.propTypes = {
  shouldFetch: PropTypes.bool.isRequired,
  getSelf: PropTypes.func.isRequired,
};

const mapStateToProps = (
  { auth: { isLoggedIn }, lookupApi: { self, selfLoading, selfRequestedAt } }
) => ({
  // The logic here is that we should only try to fetch the current user's profile if:
  // 1) They are logged in, and
  // 2) The profile is not currently fetched, and
  // 3) There is not currently a request in flight, and
  // 4) There had not previously been a request which failed
  shouldFetch: isLoggedIn && !self && !selfLoading && !selfRequestedAt
});

const mapDispatchToProps = { getSelf };

export default connect(mapStateToProps, mapDispatchToProps)(FetchSelf);
