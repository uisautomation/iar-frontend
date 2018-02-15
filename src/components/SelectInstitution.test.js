import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import SelectInstitution from './SelectInstitution';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

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
  const testInstance = render(<SelectInstitution
    value="AAA" instids={['AAA', 'CCC']} />, { store });
  expect(testInstance.findByType(Select)).toBeDefined();
});

test('component has menu items with correct values and display text', () => {
  const store = createMockStore(MOCK_STATE);
  const testInstance = render(<SelectInstitution
    value="AAA" instids={['AAA', 'CCC']} />, { store });
  const select = testInstance.findByType(Select);
  expect(select.props.children).toHaveLength(2);

  expect(select.props.children[0].props).toEqual({ value: 'AAA', children: "Dept of A" });
  expect(select.props.children[1].props).toEqual({ value: 'CCC', children: "CCC" });
});
