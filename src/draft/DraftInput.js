/**
 * Containers which connect fields in the draft to input fields.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withDraft } from '.';

/**
 * A container component which wraps an input control connecting it to a field in the draft. By
 * default it wraps a HTML input element but this can be overridden with the "component" prop.
 *
 * The mapDraftToInputProps and mapOnChangeToPatch determine how the draft is mapped to and from
 * the input props. They are both functions.
 *
 * mapDraftToInputProps takes the component's props and the current draft resource object as
 * arguments and returns an object which will be used to set the props on the wrapped input
 * control.
 *
 * mapOnChangeToPatch is passed the component props as its first argument and then the arguments
 * passed to the onChange handler for the wrapper input. It should return a value suitable for
 * passing to the patchDraft action.
 *
 * By convention, the "name" prop specifies which field in the draft should be connected although
 * technically mapDraftToInputProps and mapOnChangeToPatch could use whichever props they wish.
 */
class UnconnectedDraftInput extends Component {
  handleChange = (...args) => {
    const { patchDraft, mapOnChangeToPatch } = this.props;
    patchDraft(mapOnChangeToPatch(this.props, ...args));
  };

  render = () => {
    // We swallow map{...} and patchDraft to avoid passing them through to the wrapped component.
    const {
      component: Component,
      mapDraftToInputProps,
      mapOnChangeToPatch,
      patchDraft,
      children,
      ...rest
    } = this.props;

    return <Component {...rest} onChange={this.handleChange}>{ children }</Component>;
  }
}

UnconnectedDraftInput.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  mapOnChangeToPatch: PropTypes.func.isRequired,
  patchDraft: PropTypes.func.isRequired,
};

UnconnectedDraftInput.defaultProps = {
  component: 'input',
};

const mapDraftToProps = ({ draft }, ownProps, { patchDraft }) => (
  { ...ownProps.mapDraftToInputProps(ownProps, draft), patchDraft }
);

export const DraftInput = withDraft(mapDraftToProps)(UnconnectedDraftInput);

DraftInput.propTypes = {
  mapDraftToInputProps: PropTypes.func.isRequired,
};

export default DraftInput;

/**
 * Version of DraftInput pre-configured to work with <input type="text"> components. Accesses a
 * textual field on the draft.
 *
 * The input component's value prop is set to draft[name] if it is defined and non-null or the
 * empty string otherwise.
 *
 * On change, an empty input field maps to a null value in the draft or the textual content of the
 * field.
 */
export const DraftTextInput = props => (
  <DraftInput
    mapDraftToInputProps={({ name }, draft) => ({
      value: (!draft[name] || (draft[name] === null)) ? "" : draft[name]
    })}
    mapOnChangeToPatch={({ name }, { target: { value } }) => ({
      [name]: (value === "") ? null : value
    })}
    { ...props }
  />
);

DraftTextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

/**
 * Version of DraftInput pre-configured to work with <input type="checkbox"> components. Accesses a
 * boolean field on the draft.
 */
export const DraftCheckboxInput = props => (
  <DraftInput
    mapDraftToInputProps={({ name }, draft) => ({ checked: Boolean(draft[name]) })}
    mapOnChangeToPatch={({ name }, _, checked) => ({ [name]: checked })}
    { ...props }
  />
);

DraftCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
};

/**
 * Version of DraftInput pre-configured to work with <input type="checkbox"> components. Accesses
 * an array field on the draft.
 *
 * Takes a "value" prop which is the value which should be added to/removed from the array
 * depending on the checked prop value.
 *
 * Understands the "none" special value as indicating that the array has a value and that it is
 * intentionally empty. Thus, inserting a value removed the "none" value.
 *
 * The special "none" value can be overridden via the clearValue prop.
 */
export const DraftArrayCheckboxInput = ({ clearValue, ...props }) => (
  <DraftInput
    mapDraftToInputProps={({ name, value }, draft) => ({
      checked: Boolean(draft[name]) && (draft[name].indexOf(value) !== -1),
    })}
    mapOnChangeToPatch={({ name, value }, _, checked) => draft => {
      const values = new Set(draft[name]);
      if(checked) {
        values.add(value); values.delete(clearValue);
      } else {
        values.delete(value);
      }
      return { [name]: [...values.values()].sort() };
    }}
    { ...props }
  />
);

DraftArrayCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  clearValue: PropTypes.string,
};

DraftArrayCheckboxInput.defaultProps = {
  clearValue: 'none',
};

/**
 * Version of DraftInput pre-configured to work with <input type="checkbox"> components. Accesses
 * an array field on the draft. When checked the array is cleared to ["none"]. If the array has any
 * other value, the control is unchecked.
 *
 * The "none" value can be overridden via the clearValue prop.
 */
export const DraftClearArrayCheckboxInput = ({ clearValue, ...props }) => (
  <DraftInput
    mapDraftToInputProps={({ name }, draft) => ({
      checked: Boolean(draft[name]) && (draft[name].indexOf(clearValue) !== -1),
    })}
    mapOnChangeToPatch={({ name }, _, checked) => ({
      [name]: checked ? [clearValue] : []
    })}
    { ...props }
  />
);

DraftClearArrayCheckboxInput.propTypes = {
  clearValue: PropTypes.string,
};

DraftClearArrayCheckboxInput.defaultProps = {
  clearValue: 'none'
};
DraftClearArrayCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
};
