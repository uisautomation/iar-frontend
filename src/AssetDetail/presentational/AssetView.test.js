import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../../testutils';
import { populatedState } from '../../test/fixtures';

import AppRoutes from '../../containers/AppRoutes';
import AssetPage from './AssetPage';
import { ViewHeader } from './Header';
import ViewBody from './ViewBody';

describe('AssetView', () => {
  describe('with nothing loaded', () => {
    let store, testInstance, url;
    beforeEach(() => {
      store = createMockStore(initialState);
      testInstance = render(<AppRoutes />, { url: '/asset/xxx', store });
    });
    test('Does not render page', () => {
      expect(testInstance.findAllByType(AssetPage)).toHaveLength(0);
    });
  });

  describe('with assets loaded', () => {
    let store, testInstance, asset, url;
    beforeEach(() => {
      store = createMockStore(populatedState);
      url = process.env.REACT_APP_ENDPOINT_ASSETS + 'xxx/';
      asset = populatedState.assets.assetsByUrl.get(url).asset;
      expect(asset).toBeDefined();
      testInstance = render(<AppRoutes />, { url: '/asset/xxx', store });
    });

    test('Renders page', () => {
      expect(testInstance.findAllByType(AssetPage)).toHaveLength(1);
    });

    test('Passes asset to header', () => {
      expect(testInstance.findByType(ViewHeader).props.asset).toBe(asset);
    });

    test('Passes asset to body', () => {
      expect(testInstance.findByType(ViewBody).props.asset).toBe(asset);
    });
  });
});
