import React from 'react';
import {createMockStore, DEFAULT_INITIAL_STATE, render} from "../testutils";
import Sidebar from "./Sidebar";
import {PEOPLE_GET_SELF_REQUEST} from "../redux/actions/lookupApi";
import SidebarNavLink from "./SidebarNavLink";

// Check that the profile is retrieved if we are logged in.
test('The profile is retrieved if we are logged in', () => {
  const store = createMockStore(DEFAULT_INITIAL_STATE);
  const instance = render(<Sidebar />, { store, url: '/' });
  expect(store.getActions()).toEqual([{type: PEOPLE_GET_SELF_REQUEST}]);
});

// Check that Sidebar items are rendered as expected.
test('Sidebar items are rendered', () => {
  const self = {
    institutions: [
      {instid: 'UIS', name: 'University Information Services'}
    ]
  };
  const store = createMockStore({...DEFAULT_INITIAL_STATE, lookupApi: {self}});
  const testInstance = render(<Sidebar />, { store, url: '/' });
  const sidebarNavLinks = testInstance.findAllByType(SidebarNavLink);
  expect(sidebarNavLinks).toHaveLength(4);
  expect(sidebarNavLinks.find(link => link.props.label === 'University Information Services').props.to).toBe("/assets/UIS");
  expect(sidebarNavLinks.find(link => link.props.label === 'All departments').props.to).toBe("/assets/all");
  expect(sidebarNavLinks.find(link => link.props.label === 'Help').props.to).toBe("/help");
  expect(sidebarNavLinks.find(link => link.props.label === 'Sign out')).not.toBeNull();
});
