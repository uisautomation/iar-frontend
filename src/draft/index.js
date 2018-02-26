import getDisplayName from 'react-display-name';
import { connect } from 'react-redux';
import { fetchOrCreateDraft, patchDraft, saveDraft } from '../redux/actions/editAsset';

/**
 * Connect a component to the current draft. Takes a parameter, mapDraftToProps, which is a
 * function which is passed the current draft, the component's own props and an editor object as
 * arguments and returns an object of prop values to set on the wrapped component.
 *
 * The current draft is an object of the following form:
 *
 * {
 *   draft: <asset resource>
 *   isLoading: true if the draft is currently being loaded from the network
 *   isLive: true if the draft is "live", i.e. has been loaded from the network or set explicitly.
 * }
 *
 * An editor object is an object with function fields fetchOrCreateDraft, patchDraft and saveDraft
 * which correspond to the draft editing functions.
 *
 * Implementation note: withDraft is essentially a wrapper around redux's connect higher order
 * component. We hide this from users of the component in order to allow us to move the draft
 * editing code inside a "Provider" component's state and pass a draft via the context in a later
 * version. This is not needed for the initial version of the code which stores the draft in the
 * global redux state but it is admittedly a little ugly that local, per-page state is tored
 * globally.
 */
export const withDraft = mapDraftToProps => WrappedComponent => {
  const mapStateToProps = ({ editAsset }) => ({ editAsset });
  const mapDispatchToProps = { fetchOrCreateDraft, patchDraft, saveDraft };
  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    // note that dispatchProps exactly matches the interface of the "editor" object specified in
    // the documentation.
    return { ...mapDraftToProps(stateProps.editAsset, ownProps, dispatchProps), ...ownProps };
  };
  const Component = connect(mapStateToProps, mapDispatchToProps, mergeProps)(WrappedComponent);
  Component.displayName = `withDraft(${getDisplayName(WrappedComponent)})`;
  return Component;
};
