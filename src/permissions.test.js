import { canEditAsset } from './permissions'
import { DEFAULT_INITIAL_STATE as initialState } from './testutils';

describe('canEditAsset', () => {
  let state;

  beforeEach(() => {
    // initialise state
    state = {
      ...initialState,
      auth: { ...initialState.auth, isLoggedIn: true },
      lookupApi: {
        ...initialState.lookupApi,
        self: { institutions: [{ instid: 'INSTA' }, { instid: 'INSTB' }] },
        selfLoading: false,
      },
      assets: {
        assetsByUrl: new Map([
          ['xxx', { asset: { url: 'xxx', department: 'INSTB' }, fetchedAt: new Date() }],
          ['yyy', { asset: { url: 'yyy', department: 'INSTC' }, fetchedAt: new Date() }],
        ])
      }
    };
  });

  test('allows asset from own institution', () => {
    expect(canEditAsset(state, 'xxx')).toBe(true);
  });

  test('disallows asset from different institution', () => {
    expect(canEditAsset(state, 'yyy')).toBe(false);
  });

  test('disallows unloaded asset', () => {
    expect(canEditAsset(state, 'zzz')).toBe(false);
  });

  test('disallows asset in progress of being fetched', () => {
    expect(canEditAsset(state, 'xxx')).toBe(true);
    state.assets.assetsByUrl.get('xxx').fetchedAt = undefined;
    expect(canEditAsset(state, 'xxx')).toBe(false);
  });

  test('disallows asset when loading self', () => {
    expect(canEditAsset(state, 'xxx')).toBe(true);
    state.lookupApi.selfLoading = true;
    expect(canEditAsset(state, 'xxx')).toBe(false);
  });

  test('disallows asset when self not loaded', () => {
    expect(canEditAsset(state, 'xxx')).toBe(true);
    state.lookupApi.self = null;
    expect(canEditAsset(state, 'xxx')).toBe(false);
  });

  test('disallows asset when logged out', () => {
    expect(canEditAsset(state, 'xxx')).toBe(true);
    state.auth.isLoggedIn = false;
    expect(canEditAsset(state, 'xxx')).toBe(false);
  });
});
