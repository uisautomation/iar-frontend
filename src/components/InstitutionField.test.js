import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import InstitutionField from './InstitutionField';
import { MenuItem } from 'material-ui/Menu';
import { TextField } from 'material-ui';

// A state with institutions populated
const MOCK_STATE = {
  ...initialState,
  lookupApi: {
    ...initialState.lookupApi,
    institutions: {
      ...initialState.lookupApi.institutions,
      fetchedAt: new Date(),
      byInstid: new Map([
        ['AAA', { instid: 'AAA', name: 'Dept of A' }],
        ['BBB', { instid: 'BBB', name: 'Dept of B' }],
      ]),
    },
  },
};

test('component renders', () => {
  const store = createMockStore(MOCK_STATE);
  const testInstance = render(<InstitutionField
    value="AAA" instids={['AAA', 'CCC']} />, { store });
  expect(testInstance.findByType(TextField)).toBeDefined();
});

test('component has menu items with correct values and display text', () => {
  const store = createMockStore(MOCK_STATE);
  const testInstance = render(<InstitutionField
    value="AAA" instids={['AAA', 'CCC']} />, { store });
  const textField = testInstance.findByType(TextField);
  expect(textField.props.children[0].props).toEqual({ value: 'AAA', children: "Dept of A" });
  expect(textField.props.children[1].props).toEqual({ value: 'CCC', children: "CCC" });
});
