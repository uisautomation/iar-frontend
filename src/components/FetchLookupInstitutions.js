import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listInstitutions } from '../redux/actions/lookupApi';

/**
 * A component which causes institutions to be fetched from lookup when the user logs in and the
 * list has not previously been fetched. Since this list needs only to be fetched once, place it
 * *outside* of any dynamic routes, etc.
 *
 * The fetching waits until auth.isLoggedIn becomes true.
 */
const FetchLookupInstitutions = ({ shouldFetch, listInstitutions }) => {
  // The component renders to null but, as a side-effect of rendering, it will cause a fetch of
  // institutions is they have not currently been fetched and isLoggedIn becomes true.

  if(shouldFetch) { listInstitutions(); }

  return null;
}

FetchLookupInstitutions.propTypes = {
  shouldFetch: PropTypes.bool.isRequired,
  listInstitutions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isLoggedIn }, lookupApi: { institutions } }) => ({
  // We should try to fetch the institutions list if:
  // 1) We're actually logged in, and
  // 2) A request is not currently in flight, and
  // 3) We have not yet fetched a list, and
  // 4) We have not yet *requested* a list.
  shouldFetch:
    isLoggedIn && !institutions.isLoading && !institutions.fetchedAt && !institutions.requestedAt
});

const mapDispatchToProps = { listInstitutions };

export default connect(mapStateToProps, mapDispatchToProps)(FetchLookupInstitutions);
