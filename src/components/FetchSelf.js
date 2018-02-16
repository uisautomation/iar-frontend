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
const FetchSelf = ({ isLoggedIn, self, selfLoading, getSelf }) => {

  // If we are signed in and we haven't retrieved (and aren't retrieving) the profile -
  // then retrieve the profile.
  if (isLoggedIn && !self && !selfLoading) {
    getSelf();
  }

  return null;
};

FetchSelf.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  self: PropTypes.object,
  selfLoading: PropTypes.bool.isRequired,
  getSelf: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isLoggedIn }, lookupApi: { self, selfLoading } }) => ({
  isLoggedIn, self, selfLoading
});

const mapDispatchToProps = { getSelf };

export default connect(mapStateToProps, mapDispatchToProps)(FetchSelf);
