import reducer from './deleteConfirmation';
import { confirmDelete, handleConfirmDelete } from '../actions/deleteConfirmation';

test('passing undefined state does not give undefined output', () => {
  expect(reducer(undefined, {})).not.toBeUndefined();
});

test('initial state has unset url', () => {
  expect(reducer(undefined, {}).url).toBeNull();
});

test('initial state does not ask for confirmation', () => {
  expect(reducer(undefined, {}).userShouldConfirm).toBe(false);
});

test('asking for delete confirmation sets URL', () => {
  expect(reducer(undefined, confirmDelete('xxx')).url).toBe('xxx');
});

test('asking for delete confirmation sets userShouldConfirm', () => {
  expect(reducer(undefined, confirmDelete('xxx')).userShouldConfirm).toBe(true);
});

test('handling delete leaves URL', () => {
  const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
  expect(reducer(state, handleConfirmDelete('xxx')).url).toBe('xxx');
});

test('handling delete clears userShouldConfirm', () => {
  const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
  expect(reducer(state, handleConfirmDelete('xxx')).userShouldConfirm).toBe(false);
});

test('handling delete with wrong URL does not change state', () => {
  const state = { ...reducer(undefined, {}), url: 'xxx', userShouldConfirm: true };
  expect(reducer(state, handleConfirmDelete('yyy'))).toBe(state);
});
