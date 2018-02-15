import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import LookupInstitution from './LookupInstitution';

const stateWithInstitutions = {
  ...initialState,
  lookupApi: {
    ...initialState.lookupApi,
    institutions: {
      ...initialState.lookupApi.institutions,

      fetchedAt: new Date(),
      byInstid: new Map([
        ['AAA', {
          cancelled: false, instid: 'AAA', name: 'Department of AAA',
          url: 'http://lookup.invalid/institutions/AAA'
        }],
        ['BBB', {
          cancelled: false, instid: 'BBB', name: 'Faculty of BBB',
          url: 'http://lookup.invalid/institutions/BBB'
        }],
      ]),
    },
  },
};

test('Can render empty component and it is a span', () => {
  const testInstance = render(<LookupInstitution />);
  expect(testInstance.findByType('span')).toBeDefined();
});

test('Can render empty component with non-span component and props', () => {
  const testInstance = render(<LookupInstitution
    component='div' componentProps={{ className: 'foo' }}/>);
  expect(testInstance.findByType('div')).toBeDefined();
  expect(testInstance.findByType('div').props).toEqual({ className: 'foo' });
});

test('Component uses instid if institution not in list', () => {
  const store = createMockStore(stateWithInstitutions);
  const testInstance = render(<LookupInstitution instid="CCC"/>, { store });
  expect(testInstance.findByType('span').children).toEqual(['CCC']);
});

test('Component uses name if institution in list', () => {
  const store = createMockStore(stateWithInstitutions);
  const testInstance = render(<LookupInstitution instid="AAA"/>, { store });
  expect(testInstance.findByType('span').children).toEqual(['Department of AAA']);
});
