import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import IfMethodAllowed from './IfMethodAllowed';

const MockComponent = () => <span>mock</span>;

const renderWithState = (state, method = "PUT") => {
  const store = createMockStore(state);
  return render(<IfMethodAllowed method={method}><MockComponent /></IfMethodAllowed>, { store });
}

describe('IfMethodAllowed', () => {
  let state, draft;

  beforeEach(() => {
    draft = { url: 'http://iar-backend.invalid/assets/xxx', id: 'xxx', name: 'X' };
    state = {
      ...initialState,
      editAsset: {
        ...initialState.editAsset, draft,
      },
    };
  });

  test('does not render children if no draft', () => {
    state.editAsset.draft = { };
    expect(renderWithState(state).findAllByType(MockComponent)).toHaveLength(0);
  });

  ['PUT', 'PATCH', 'DELETE'].forEach(method => {
    describe('for method ' + method, () => {
      test('does not render children if draft empty', () => {
        state.editAsset.draft = { };
        expect(renderWithState(state, method).findAllByType(MockComponent)).toHaveLength(0);
      });

      test('does not render children if draft does not have it', () => {
        state.editAsset.draft.allowed_methods =
          ['PUT', 'PATCH', 'DELETE'].filter(m => m !== method);
        expect(renderWithState(state, method).findAllByType(MockComponent)).toHaveLength(0);
      });

      test('does render children if draft has', () => {
        state.editAsset.draft.allowed_methods = [method]
        expect(renderWithState(state, method).findAllByType(MockComponent)).toHaveLength(1);
      });
    });
  });
});
