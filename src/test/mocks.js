import React from 'react';

/**
 * Mock any troublesome components which don't play well with the DOM implementation in our test
 * suite.
 */

// GetMoreAssets needs mocking here because of the VisibilitySensor component it uses which requires
// more of the DOM to be present than is provided by our test suite.
jest.mock('../components/GetMoreAssets', () => () => <div />);
