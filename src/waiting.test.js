import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from './testutils'
import { WaitForIt, WaitForInstitutions, WaitForSelf } from './waiting';

const MockComponent = () => <span>mock</span>;
const MockIndicator = () => <span>loading</span>;

describe('WaitForIt', () => {

  const renderIt = props => render(
    <WaitForIt loadingIndicator={<MockIndicator />} {...props}>
      <MockComponent />
    </WaitForIt>
  );

  test('renders its children if not loading', () => {
    expect(renderIt({ isLoading: false }).findAllByType(MockComponent)).toHaveLength(1);
  });

  test('does not render loadingIndicator if not loading', () => {
    expect(renderIt({ isLoading: false }).findAllByType(MockIndicator)).toHaveLength(0);
  });

  test('does not render its children if not loading', () => {
    expect(renderIt({ isLoading: true }).findAllByType(MockComponent)).toHaveLength(0);
  });

  test('renders loadingIndicator if not loading', () => {
    expect(renderIt({ isLoading: true }).findAllByType(MockIndicator)).toHaveLength(1);
  });
});

describe('WaitForInstitutions', () => {
  describe('with initial state', () => {
    let store, testInstance;

    beforeEach(() => {
      store = createMockStore(initialState);
      testInstance = render(
        <WaitForInstitutions loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForInstitutions>,
        { store }
      );
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(0);
    });

    test('does render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(1);
    });
  });

  describe('with populated state', () => {
    let fullState, store, testInstance;

    beforeEach(() => {
      fullState = {
        ...initialState,
        lookupApi: {
          ...initialState.lookupApi,
          institutions: { fetchedAt: new Date(), byInstid: new Map() },
        },
      };

      store = createMockStore(fullState);
      testInstance = render(
        <WaitForInstitutions loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForInstitutions>,
        { store }
      );
    });

    test('does render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(1);
    });

    test('does not render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(0);
    });
  });
});

describe('WaitForSelf', () => {
  describe('with initial state', () => {
    let store, testInstance;

    beforeEach(() => {
      store = createMockStore(initialState);
      testInstance = render(
        <WaitForSelf loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForSelf>,
        { store }
      );
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(0);
    });

    test('does render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(1);
    });
  });

  describe('with populated state', () => {
    let fullState, store, testInstance;

    beforeEach(() => {
      fullState = {
        ...initialState,
        lookupApi: {
          ...initialState.lookupApi,
          self: { }, selfLoading: false,
        },
      };

      store = createMockStore(fullState);
      testInstance = render(
        <WaitForSelf loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForSelf>,
        { store }
      );
    });

    test('does render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(1);
    });

    test('does not render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(0);
    });
  });

  describe('when loading self', () => {
    let fullState, store, testInstance;

    beforeEach(() => {
      fullState = {
        ...initialState,
        lookupApi: {
          ...initialState.lookupApi,
          self: { }, selfLoading: true,
        },
      };

      store = createMockStore(fullState);
      testInstance = render(
        <WaitForSelf loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForSelf>,
        { store }
      );
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(0);
    });

    test('does render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(1);
    });
  });

  describe('with no "self" profile', () => {
    let fullState, store, testInstance;

    beforeEach(() => {
      fullState = {
        ...initialState,
        lookupApi: {
          ...initialState.lookupApi,
          self: null, selfLoading: false,
        },
      };

      store = createMockStore(fullState);
      testInstance = render(
        <WaitForSelf loadingIndicator={<MockIndicator />}>
          <MockComponent />
        </WaitForSelf>,
        { store }
      );
    });

    test('does not render children', () => {
      expect(testInstance.findAllByType(MockComponent)).toHaveLength(0);
    });

    test('does render indicator', () => {
      expect(testInstance.findAllByType(MockIndicator)).toHaveLength(1);
    });
  });
});
