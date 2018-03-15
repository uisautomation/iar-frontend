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
    const { isLoggedIn, self, selfLoading, getSelf } = this.props;
    if (isLoggedIn && !self && !selfLoading) {
      getSelf();
    }
  };

  render = () => {
    return null;
  };
}


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
