import reducer from './deleteConfirmation';
import { confirmDelete, handleConfirmDelete } from '../actions/deleteConfirmation';

test('passing undefined state does not give undefined output', () => {
  expect(reducer(undefined, {})).not.toBeUndefined();
});

test('initial state has unset url', () => {
  expect(reducer(undefined, {}).url).toBeNull();
});

test('asking for delete confirmation sets URL', () => {
  expect(reducer(undefined, confirmDelete('xxx')).url).toBe('xxx');
});

test('handling delete clears URL', () => {
  const state = { ...reducer(undefined, {}), url: 'xxx' };
  expect(reducer(state, handleConfirmDelete('xxx')).url).toBeNull();
});

test('handling delete with wrong URL does not change state', () => {
  const state = { ...reducer(undefined, {}), url: 'xxx' };
  expect(reducer(state, handleConfirmDelete('yyy'))).toBe(state);
});
