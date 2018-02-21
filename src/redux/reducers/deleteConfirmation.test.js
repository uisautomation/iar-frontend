// mock the assetRegisterApi actions module
jest.mock('../actions/assetRegisterApi', () => {
  const original = require.requireActual('../actions/assetRegisterApi');
  return {
    ...original,
    deleteAsset: jest.fn(() => ({ type: 'mock-delete-asset-action' })),
  };
});

import reducer from './deleteConfirmation';
import { confirmDelete, handleConfirmDelete } from '../actions/deleteConfirmation';
import { deleteAsset } from '../actions/assetRegisterApi';

beforeEach(() => {
  deleteAsset.mockClear();
});

// Perform a confirmDelete action assuming that the returned value is a thunk which returns a
// promise. Return the actual dispatched action and the promise.
const performConfirmDelete = (...args) => {
  let action = null;
  const dispatch = dispatchedAction => { action = dispatchedAction; };
  const deletePromise = confirmDelete(...args)(dispatch);
  expect(deletePromise).toBeInstanceOf(Promise);
  expect(action).not.toBe(null);
  return { action, deletePromise };
};

// Perform a handleConfirmDelete action assuming that the returned value is a thunk.
// Return all dispatched actions.
const performHandleConfirmDelete = (...args) => {
  let actions = [];
  const dispatch = dispatchedAction => { actions.push(dispatchedAction); };
  handleConfirmDelete(...args)(dispatch);
  expect(actions).not.toHaveLength(0);
  return actions;
};

test('passing undefined state does not give undefined output', () => {
  expect(reducer(undefined, {})).not.toBeUndefined();
});

test('initial state has unset url', () => {
  expect(reducer(undefined, {}).url).toBeNull();
});

test('initial state does not ask for confirmation', () => {
  expect(reducer(undefined, {}).userShouldConfirm).toBe(false);
});

describe('delete confirmation', () => {
  test('sets URL', () => {
    const { action } = performConfirmDelete('xxx');
    expect(reducer(undefined, action).url).toBe('xxx');
  });

  test('sets userShouldConfirm', () => {
    const { action } = performConfirmDelete('xxx');
    expect(reducer(undefined, action).userShouldConfirm).toBe(true);
  });

  test('sets onHandleConfirmDelete', () => {
    const initialState = reducer(undefined, { type: 'NO_SUCH_ACTION' });
    const { action } = performConfirmDelete('xxx');
    expect(reducer(initialState, action).onHandleConfirmDelete).not.toBe(
      initialState.onHandleConfirmDelete
    );
  });

  describe('returns a promise', () => {
    let deletePromise;

    beforeEach(() => {
      deletePromise = performConfirmDelete('xxx').deletePromise;
    });

    test('which is resolved with true if user confirms delete', () => {
      performHandleConfirmDelete('xxx', true);
      expect(deletePromise).resolves.toEqual([true, 'xxx']);
    });

    test('which is resolved with false if user cancels delete', () => {
      performHandleConfirmDelete('xxx', true);
      expect(deletePromise).resolves.toEqual([false, 'xxx']);
    });
  });
});

describe('handling delete', () => {
  [true, false].forEach(decision => (
    describe('with userShouldConfirm = ' + decision, () => {
      test('leaves URL', () => {
        const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
        const finalState = performHandleConfirmDelete('xxx', decision).reduce(
          (previousState, action) => reducer(previousState, action), state
        );
        expect(finalState.url).toBe('xxx');
      });

      test('clears userShouldConfirm', () => {
        const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
        const finalState = performHandleConfirmDelete('xxx', decision).reduce(
          (previousState, action) => reducer(previousState, action), state
        );
        expect(finalState.userShouldConfirm).toBe(false);
      });

      test('with wrong URL does not change state', () => {
        const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
        const finalState = performHandleConfirmDelete('yyy', decision).reduce(
          (previousState, action) => reducer(previousState, action), state
        );
        expect(finalState).toBe(state);
      });
    })
  ));

  test('confirming delete dispatches delete asset', () => {
    const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
    const wasAnyDeleteAction = performHandleConfirmDelete('xxx', true).reduce(
      (accumulator, action) => accumulator || (action.type === 'mock-delete-asset-action'),
      false
    );
    expect(wasAnyDeleteAction).toBe(true);
  });

  test('cancelling delete does not dispatch delete asset', () => {
    const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
    const wasAnyDeleteAction = performHandleConfirmDelete('xxx', false).reduce(
      (accumulator, action) => accumulator || (action.type === 'mock-delete-asset-action'),
      false
    );
    expect(wasAnyDeleteAction).toBe(false);
  });
});
