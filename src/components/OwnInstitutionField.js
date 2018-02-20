import { connect } from 'react-redux';
import InstitutionField from './InstitutionField';

const mapStateToProps = ({ lookupApi: { self } }, { extraInstids = [] }) => ({
  instids: self ? self.institutions.map(({ instid }) => instid) : [],
});

/**
 * A higher-order component wrapping InstitutionField which populates the set of allowed
 * institutions to be those of the logged in user. We pass a trivial function as mapDispatchToProps
 * so that dispatch is not passed to the wrapped component.
 *
 * extraInstids may be passed to extend the list of instids
 */
const OwnInstitutionField = connect(mapStateToProps, () => ({ }))(InstitutionField);

export default OwnInstitutionField;
