/**
 * Utility components and functions for dealing with the current draft.
 */
import getDisplayName from 'react-display-name';
import { connect } from 'react-redux';
import { patchDraft } from '../../redux/actions/editAsset';

/**
 * A collection of higher-order component wrappers which connect input fields to the draft being
 * edited.
 *
 * The general idea here is that these wrappers take care of setting the value/checked/onChange
 * props on the wrapped controls so that they reflect and edit the current state of the draft.
 * They also ensure that the props *only* depend on the explicit parts of the draft a control cares
 * about to avoid unnecessary re-renders.
 *
 * We use higher-order components here rather than containers since we want the component to
 * receive only the props it cares about from the draft. Configuring the field name via props on a
 * container component means that the component would potentially re-render on every change to the
 * draft.
 */

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

// common functionality for editingDraft{...}Wrappers
//
// This is a function which constructs a higher-order component function. The higher-order
// component connects the current draft to the wrapped component by way of the onChange handler and
// a set of "value" props on the component.
//
// The mapValueToInputFields function takes the value of a particular field in the draft and
// computes which props need to be set on the wrapped component.
//
// The changeToPatch function converts the arguments passed to the onChange handler into a patch
// suitable for sending to the patchDraft action.
//
// See below for the fieldName and mapDraftToProps arguments to the returned higher-order component
// function.
const makeWrapper = (wrapperName, mapValueToInputFields, changeToPatch) => (
  (fieldName, mapDraftToProps) => WrappedComponent => {
    const mapStateToProps = ({ editAsset: { draft } }) => ({
      name: fieldName,
      ...(mapValueToInputFields(draft ? draft[fieldName] : undefined)),
      ...(mapDraftToProps ? mapDraftToProps(draft) : {})
    });
    const mapDispatchToProps = { patchDraft };
    const mergeProps = (stateProps, dispatchProps, ownProps) => ({
      ...ownProps, ...stateProps,  // NB: we don't need dispatchProps set on the component
      onChange: (...args) => dispatchProps.patchDraft(changeToPatch(fieldName, ...args)),
    });

    const Component = connect(mapStateToProps, mapDispatchToProps, mergeProps)(WrappedComponent);
    Component.displayName = `${wrapperName}(${getDisplayName(WrappedComponent)})`;

    return Component;
  }
);

/**
 * Wrap a text input-like component so that it edits a text field in the current draft. The value,
 * name and onChange props are provided to the wrapped component. Takes an optional parameter,
 * mapDraftToProps which is a function taking the current draft asset and returns an object
 * containing extra props to broadcast to the element.
 *
 * For complex cases, two functions may be passed after mapDraftToProps: mapInputValueToDraftValue
 * and mapDraftValueToInputValue. They both take a single value and return the mapped value.
 * They can be used to customise how values are mapped from draft to input.
 *
 * mapInputValueToDraftValue defaults to mapping the empty string to null and passing through all
 * other values. mapDraftValueToInputValue defaults to mapping null to the empty string and
 * parameter through all other values.
 *
 * Both of these functions
 * default to the identity value.
 */
export const withDraftFieldAsTextInput = (
  fieldName, mapDraftToProps,
  mapInputValueToDraftValue = v => (v === '') ? null : v,
  mapDraftValueToInputValue = v => (v === null) ? '' : v
) => (
  makeWrapper(
    'withDraftFieldAsTextInput',
    value => { const v = mapDraftValueToInputValue(value); return { value: v ? v : '' }; },
    (fieldName, { target: { value } }) => ({ [fieldName]: mapInputValueToDraftValue(value) }),
  )(fieldName, mapDraftToProps)
);

/**
 * Wrap a checkbox input-like component so that it edits a boolean field in the current draft. The
 * checked, name and onChange props are provided to the wrapped component. Takes an optional
 * parameter, mapDraftToProps which is a function taking the current draft asset and returns an
 * object containing extra props to broadcast to the element.
 */
export const withDraftFieldAsCheckboxInput = makeWrapper(
  'withDraftFieldAsCheckboxInput',
  value => ({ checked: Boolean(value) }),
  (fieldName, _, checked) => ({ [fieldName]: checked })
);

/**
 * Wrap a checkbox input-like component so that it adds or removes a value from an array field in
 * the draft. Respects the special "none" value used to indicate a lack of response.
 *
 * Takes an optional parameter, mapDraftToProps which is a function taking the current draft asset
 * and returns an object containing extra props to broadcast to the element.
 */
export const withDraftArrayFieldAsCheckboxInput = (fieldName, fieldValue, mapDraftToProps) => (
  makeWrapper(
    'withDraftArrayFieldAsCheckboxInput',
    value => ({ checked: new Set(value).has(fieldValue), value: fieldValue }),
    (fieldName, _, checked) => draft => {
      const values = new Set(draft[fieldName]);
      if(checked) {
        values.add(fieldValue); values.delete('none');
      } else {
        values.delete(fieldValue);
      }
      return { [fieldName]: [...values].sort() };
    }
  )(fieldName, mapDraftToProps)
);

/**
 * Wrap a checkbox input-like component so that it clears an array field in the draft to ['none']
 * when checked.
 *
 * Takes an optional parameter, mapDraftToProps which is a function taking the current draft asset
 * and returns an object containing extra props to broadcast to the element.
 */
export const withDraftClearArrayFieldAsCheckboxInput = makeWrapper(
  'withDraftClearArrayFieldAsCheckboxInput',
  value => ({ checked: Boolean(value) && (value.indexOf('none') !== -1), value: 'none' }),
  (fieldName, _, checked) => draft => ({ [fieldName]: checked ? ['none'] : [] })
);
