import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../../testutils';
import { populatedState } from '../../test/fixtures';

import AppRoutes from '../../containers/AppRoutes';
import AssetPage from './AssetPage';
import ViewHeader from './ViewHeader';
import ViewBody from './ViewBody';

import { ENDPOINT_ASSETS } from '../../redux/actions/assetRegisterApi';

describe('AssetView', () => {
  describe('with assets loaded', () => {
    let store, testInstance, asset, url;
    beforeEach(() => {
      store = createMockStore(populatedState);
      url = ENDPOINT_ASSETS + 'xxx/';
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
