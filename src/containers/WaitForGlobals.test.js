import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils'

import WaitForGlobals from './WaitForGlobals';

// A simple child we can use to detect if it has been rendered.
const MockChild = () => <span>hello</span>;

describe('WaitForGlobals', () => {
  let fullState, store, testInstance;

  beforeEach(() => {
    fullState = {
      ...initialState,
      auth: { ...initialState.auth, isLoggedIn: true },
      lookupApi: {
        ...initialState.lookupApi,
        self: { displayName: 'bob' },
        selfLoading: false,
        institutions: { fetchedAt: new Date(), byInstid: new Map() },
      },
    };
  });

  describe('with initial state', () => {
    beforeEach(() => {
      store = createMockStore(initialState);
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(0);
    });
  });

  describe('with no log in', () => {
    beforeEach(() => {
      store = createMockStore({
        ...fullState,
        auth: { ...fullState.auth, isLoggedIn: false },
      });
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(0);
    });
  });

  describe('with no self', () => {
    beforeEach(() => {
      store = createMockStore({
        ...fullState,
        lookupApi: { ...fullState.lookupApi, self: null },
      });
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(0);
    });
  });

  describe('with loading self', () => {
    beforeEach(() => {
      store = createMockStore({
        ...fullState,
        lookupApi: { ...fullState.lookupApi, selfLoading: true },
      });
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(0);
    });
  });

  describe('with no institutions', () => {
    beforeEach(() => {
      store = createMockStore({
        ...fullState,
        lookupApi: { ...fullState.lookupApi, institutions: { } },
      });
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(0);
    });
  });

  describe('with full state', () => {
    beforeEach(() => {
      store = createMockStore(fullState);
      testInstance = render(<WaitForGlobals><MockChild /></WaitForGlobals>, { store });
    });

    test('renders children', () => {
      expect(testInstance.findAllByType(MockChild)).toHaveLength(1);
    });
  });
});
