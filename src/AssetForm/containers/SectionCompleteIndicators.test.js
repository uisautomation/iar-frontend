// mock the completeness module
jest.mock('../../completeness', () => {
  const original = require.requireActual('../../completeness');
  return {
    ...original,
    isGeneralInformationComplete: jest.fn(),
    isPersonalDataComplete: jest.fn(),
    isRiskComplete: jest.fn(),
  };
});

import React from 'react';

import {
  isGeneralInformationComplete,
  isPersonalDataComplete,
  isRiskComplete,
} from '../../completeness';

import CompleteIndicator from '../presentational/CompleteIndicator';

import {
  GeneralInformationCompleteIndicator,
  PersonalDataCompleteIndicator,
  RiskCompleteIndicator,
} from './SectionCompleteIndicators';

import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../../testutils';

const testComplete = (func, component, funcName, componentName) => {
  describe(componentName, () => {
    beforeEach(() => {
      func.mockClear();
    });

    test('passes draft to ' + funcName, () => {
      const draft = Symbol('MOCK_DRAFT');
      const state = { ...initialState, editAsset: { ...initialState.editAsset, draft } };
      const store = createMockStore(state);
      const testInstance = render(component, { store });
      expect(func).toHaveBeenCalledWith(draft);
    });

    [true, false].forEach(value => {
      test('sets isComplete = ' + value + ' if ' + funcName + '() returns ' + value, () => {
        func.mockImplementation(() => value);
        const testInstance = render(component);
        expect(testInstance.findByType(CompleteIndicator).props.isComplete).toBe(value);
      });
    });
  });
};

testComplete(
  isGeneralInformationComplete,
  <GeneralInformationCompleteIndicator />,
  'isGeneralInformationComplete',
  'GeneralInformationCompleteIndicator'
);

testComplete(
  isPersonalDataComplete,
  <PersonalDataCompleteIndicator />,
  'isPersonalDataComplete',
  'PersonalDataCompleteIndicator'
);

testComplete(
  isRiskComplete,
  <RiskCompleteIndicator />,
  'isRiskComplete',
  'RiskCompleteIndicator'
);
