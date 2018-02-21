/**
 * Test connected input components which edit draft fields.
 */

// mock the editAsset patchDraft action
jest.mock('../../redux/actions/editAsset', () => {
  const original = require.requireActual('../../redux/actions/editAsset');
  return {
    ...original,
    patchDraft: jest.fn(() => ({ type: 'mock-patch-draft-action' })),
  };
});

import React, { Component } from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../../testutils';
import { patchDraft } from '../../redux/actions/editAsset';
import { DraftTextInput, DraftCheckboxInput } from './DraftInput';

// A mock input-like control with a value and onChange event.
class MockTextInput extends Component {
  // Call onChange event with new value. Mocks the event parameter to just contain the value
  setValue = value => { this.props.onChange({ target: { value } }); }

  // Null render call
  render = () => null;
};

// A mock input-like control with a checked and onChange event.
class MockCheckboxInput extends Component {
  // Call onChange event with new value. Mocks just the checked parameter and passes empty event.
  setChecked = checked => { this.props.onChange({ }, checked); }

  // Null render call
  render = () => null;
};

// Create a store pre-populated with a draft
const storeWithDraft = draft => (
  createMockStore({ ...initialState, editAsset: { ...initialState.editAsset, draft } })
);

beforeEach(() => {
  patchDraft.mockClear();
});

describe('DraftTextInput', () => {
  let draft, store, testInstance;

  test('can render', () => {
    testInstance = render(<DraftTextInput name="testField" />);
  });

  describe('in basic use', () => {
    describe('with a textual field', () => {
      beforeEach(() => {
        draft = { testField: 'testValue' };
        store = storeWithDraft(draft);
        testInstance = render(
          <DraftTextInput component={MockTextInput} name="testField" />,
          { store }
        );
      });

      test('sets value prop', () => {
        expect(testInstance.findByType(MockTextInput).props.value).toBe('testValue');
      });

      test('calls patchDraft on change', () => {
        const input = testInstance.findByType(MockTextInput).instance;
        input.setValue('newValue');
        expect(patchDraft).toHaveBeenCalledWith({ testField: 'newValue' });
      });

      test('calls patchDraft with null value if empty value set', () => {
        const input = testInstance.findByType(MockTextInput).instance;
        input.setValue('');
        expect(patchDraft).toHaveBeenCalledWith({ testField: null });
      });
    });

    describe('with a null field', () => {
      beforeEach(() => {
        draft = { testField: null };
        store = storeWithDraft(draft);
        testInstance = render(
          <DraftTextInput component={MockTextInput} name="testField" />,
          { store }
        );
      });

      test('sets value prop to empty string', () => {
        expect(testInstance.findByType(MockTextInput).props.value).toBe('');
      });
    });
  });

  describe('with custom mapDraftToInputProps', () => {
    let mapDraftToInputProps;

    beforeEach(() => {
      draft = { testField: 'x', other: 'y' };
      store = storeWithDraft(draft);
      mapDraftToInputProps = jest.fn(draft => ({ other: '>' + draft.other + '<' }));
      testInstance = render(
        <DraftTextInput
          component={MockTextInput} name="testField"
          mapDraftToInputProps={mapDraftToInputProps}
        />, { store }
      );
    });

    test('sets computed prop', () => {
      expect(mapDraftToInputProps).toHaveBeenCalled();
      expect(mapDraftToInputProps.mock.calls[0][0]).toBe(draft);
      expect(testInstance.findByType(MockTextInput).props.other).toBe('>y<');
    });
  });

  describe('with custom mapOnChangeToPatch', () => {
    let mapOnChangeToPatch;

    beforeEach(() => {
      draft = { testField: 'x' };
      store = storeWithDraft(draft);
      mapOnChangeToPatch = jest.fn(
        ({ name }, { target: { value } }) => ({ [name]: '>' + value + '<' })
      );
      testInstance = render(
        <DraftTextInput
          component={MockTextInput} name="testField"
          mapOnChangeToPatch={mapOnChangeToPatch}
        />, { store }
      );
    });

    test('sets draft field by calling mapOnChangeToPatch', () => {
      const input = testInstance.findByType(MockTextInput).instance;
      input.setValue('x');
      expect(mapOnChangeToPatch).toHaveBeenCalled();
      expect(patchDraft).toHaveBeenCalledWith({ testField: '>x<' });
    });
  });
});

describe('DraftCheckboxInput', () => {
  let draft, store, testInstance;

  test('can render', () => {
    testInstance = render(<DraftCheckboxInput name="testField" />);
  });

  describe('with a boolean field', () => {
    [true, false].forEach(testValue => {
      describe('with value of ' + testValue, () => {
        beforeEach(() => {
          draft = { testField: testValue };
          store = storeWithDraft(draft);
          testInstance = render(
            <DraftCheckboxInput component={MockCheckboxInput} name="testField" />,
            { store }
          );
        });

        test('sets checked prop', () => {
          expect(testInstance.findByType(MockCheckboxInput).props.checked).toBe(testValue);
        });

        test('calls patchDraft on change', () => {
          const input = testInstance.findByType(MockCheckboxInput).instance;
          input.setChecked(!testValue);
          expect(patchDraft).toHaveBeenCalledWith({ testField: !testValue });
        });
      });
    });
  });
});
