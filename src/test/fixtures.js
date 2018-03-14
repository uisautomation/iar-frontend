import { Map } from 'immutable';
import { DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import { ENDPOINT_ASSETS } from '../redux/actions/assetRegisterApi';
import config from '../config';

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
      ],
      groups: [
        { name: config.iarUsersLookupGroup }
      ]
    },
    selfLoading: false,
  },
  assets: {
    ...initialState.assets,
    assetsByUrl: new Map([
      [
        ENDPOINT_ASSETS + 'xxx/',
        { asset: { url: ENDPOINT_ASSETS + 'xxx/', department: 'INSTB' }, fetchedAt: new Date() }],
      [
        ENDPOINT_ASSETS + 'yyy/',
        { asset: { url: ENDPOINT_ASSETS + 'yyy/', department: 'INSTC' }, fetchedAt: new Date() }],
    ])
  }
};
