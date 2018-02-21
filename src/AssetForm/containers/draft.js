import getDisplayName from 'react-display-name';
import { connect } from 'react-redux';

/**
 * Connect a component to the current draft. Takes a parameter, mapDraftToProps, which takes the
 * current draft and the wrapped component's own props as arguments and returns an object of prop
 * values to set on the wrapped component.
 */
export const withDraft = mapDraftToProps => WrappedComponent => {
  const mapStateToProps = ({ editAsset: { draft } }, ownProps) => mapDraftToProps(draft, ownProps);
  // we pass a trivial function to mapDispatchToProps so that the dispatch function is not set on
  // the wrapped component
  const Component = connect(mapStateToProps, () => ({}))(WrappedComponent);
  Component.displayName = `withDraft(${getDisplayName(WrappedComponent)})`;
  return Component;
};
