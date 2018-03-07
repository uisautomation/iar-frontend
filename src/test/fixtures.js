import { Map } from 'immutable';
import { DEFAULT_INITIAL_STATE as initialState } from '../testutils';

// A state populated with a logged in user and some assets.
export const populatedState = {
  ...initialState,
  auth: { ...initialState.auth, isLoggedIn: true },
  lookupApi: {
    ...initialState.lookupApi,
    institutions: {
      byInstid: new Map([
        [
          ['INSTA', { instid: 'INSTA', name: 'Dept of A' }],
          ['INSTB', { instid: 'INSTB', name: 'Office of B'}],
          ['INSTC', { instid: 'INSTC', name: 'C'}],
        ]
      ]),
      fetchedAt: new Date(),
    },
    self: {
      displayName: 'test user',
      institutions: [
        { instid: 'INSTA', name: 'Dept of A' },
        { instid: 'INSTB', name: 'Office of B'},
      ]
    },
    selfLoading: false,
  },
  assets: {
    ...initialState.assets,
    assetsByUrl: new Map([
      [
        process.env.REACT_APP_ENDPOINT_ASSETS + 'xxx/',
        { asset: { url: process.env.REACT_APP_ENDPOINT_ASSETS + 'xxx/', department: 'INSTB' }, fetchedAt: new Date() }],
      [
        process.env.REACT_APP_ENDPOINT_ASSETS + 'yyy/',
        { asset: { url: process.env.REACT_APP_ENDPOINT_ASSETS + 'yyy/', department: 'INSTC' }, fetchedAt: new Date() }],
    ])
  }
};
