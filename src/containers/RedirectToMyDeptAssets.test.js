import React from 'react';
import { render, createMockStore, DEFAULT_INITIAL_STATE as initialState } from '../testutils';
import { populatedState } from '../test/fixtures';

import { Redirect } from 'react-router-dom';
import RedirectToMyDeptAssets from './RedirectToMyDeptAssets';

describe('RedirectToMyDeptAssets', () => {
  describe('after log in but before self fetched', () => {
    let store, state, testInstance;

    beforeEach(() => {
      state = { ...initialState, auth: { ...initialState.auth, isLoggedIn: true } };
      store = createMockStore(state);
      testInstance = render(<RedirectToMyDeptAssets />, { store, url: '/' });
    });

    test('does not render redirect', () => {
      expect(testInstance.findAllByType(Redirect)).toHaveLength(0);
    });
  });

  describe('with self fetched', () => {
    let store, testInstance, self;

    beforeEach(() => {
      store = createMockStore(populatedState);
      self = populatedState.lookupApi.self;
      testInstance = render(<RedirectToMyDeptAssets />, { store, url: '/' });
    });

    test('renders redirect', () => {
      expect(testInstance.findAllByType(Redirect)).toHaveLength(1);
    });

    test('redirects to user institution', () => {
      expect(testInstance.findByType(Redirect).props).toMatchObject({
        to: '/assets/INSTA',
      });
    });
  });

  describe('with self fetched but not institutions', () => {
    let store, state, testInstance, self;

    beforeEach(() => {
      state = { ...populatedState };
      state.lookupApi.self = {
        ...state.lookupApi.self,
        institutions: [],
      }
      store = createMockStore(state);
      self = state.lookupApi.self;
      testInstance = render(<RedirectToMyDeptAssets />, { store, url: '/' });
    });

    test('renders redirect', () => {
      expect(testInstance.findAllByType(Redirect)).toHaveLength(1);
    });

    test('redirects to assets page', () => {
      expect(testInstance.findByType(Redirect).props).toMatchObject({
        to: '/assets/',
      });
    });
  });
});
