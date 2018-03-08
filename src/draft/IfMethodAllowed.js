import PropTypes from 'prop-types';
import withDraft from './withDraft';

// Component which renders its children if and only if the current draft represents an asset which
// a) allows the specified HTTP method and b) has a URL that method can be applied to.
const IfMethodAllowed = withDraft(
  ({ draft: { url, allowed_methods } }, { method }) => ({
    isAllowed: Boolean(url) && Boolean(allowed_methods) && (allowed_methods.indexOf(method) !== -1)
  })
)(({ isAllowed, children }) => isAllowed ? children : null);

IfMethodAllowed.propTypes = {
  method: PropTypes.oneOf(['PUT', 'PATCH', 'DELETE']),
};

export default IfMethodAllowed;
