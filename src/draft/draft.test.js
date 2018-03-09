/**
 * Test higher-order wrappers to map draft fields into input components.
 */
import React, { Component } from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import { withDraft} from '.';

describe('withDraft', () => {
  test('passes draft to mapDraftToProps function', () => {
    const mapDraftToProps = jest.fn(() => ({ }));
    const draftSymbol = 'MOCK_DRAFT';
    const state = { ...initialState, editAsset: {
      ...initialState.editAsset, draft: draftSymbol, isLive: true,
    } };
    const store = createMockStore(state);
    const Component = withDraft(mapDraftToProps)(() => null);
    render(<Component />, { store });
    expect(mapDraftToProps.mock.calls[0][0]).toEqual({
      draft: draftSymbol, isLoading: false, isLive: true, isModified: false,
    });
    expect(mapDraftToProps.mock.calls[0][1]).toEqual({ });
    expect(typeof mapDraftToProps.mock.calls[0][2].fetchOrCreateDraft).toBe('function');
    expect(typeof mapDraftToProps.mock.calls[0][2].patchDraft).toBe('function');
    expect(typeof mapDraftToProps.mock.calls[0][2].saveDraft).toBe('function');
  });

  test('sets props on component returned from mapDraftToProps', () => {
    const mapDraftToProps = jest.fn(() => ({ testProp: 'xxx' }));
    expect(mapDraftToProps().testProp).toBe('xxx');
    mapDraftToProps.mockClear();

    const store = createMockStore(initialState);
    const Component = () => null;
    const WrappedComponent = withDraft(mapDraftToProps)(Component);
    const testInstance = render(<WrappedComponent />, { store });
    expect(mapDraftToProps.mock.calls).toHaveLength(1);
    expect(testInstance.findByType(Component).props.testProp).toBe('xxx');
  });
});
