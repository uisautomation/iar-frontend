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
const FetchLookupInstitutions = ({ isLoggedIn, institutionsWereFetched, listInstitutions }) => {
  // The component renders to null but, as a side-effect of rendering, it will cause a fetch of
  // institutions is they have not currently been fetched and isLoggedIn becomes true.

  if(isLoggedIn && !institutionsWereFetched) { listInstitutions(); }

  return null;
}

FetchLookupInstitutions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  institutionsWereFetched: PropTypes.bool.isRequired,
  listInstitutions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth: { isLoggedIn }, lookupApi: { institutions } }) => ({
  isLoggedIn,
  // we break this out as a separate prop so that any extra information which gets added to the
  // institutions state in future does not cause unnecessary re-renders.
  institutionsWereFetched: institutions.fetchedAt !== null,
});

const mapDispatchToProps = { listInstitutions };

export default connect(mapStateToProps, mapDispatchToProps)(FetchLookupInstitutions);
