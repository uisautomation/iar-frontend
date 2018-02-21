import React from 'react';
import {createMockStore, DEFAULT_INITIAL_STATE, render} from "../testutils";
import { Sidebar } from ".";
import SidebarNavLink from "./SidebarNavLink";

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
  expect(sidebarNavLinks).toHaveLength(5);
  expect(sidebarNavLinks.find(link => link.props.label === 'University Information Services').props.to).toBe("/assets/UIS");
  expect(sidebarNavLinks.find(link => link.props.label === 'All departments').props.to).toBe("/assets");
  expect(sidebarNavLinks.find(link => link.props.label === 'Help').props.to).toBe("/help");
  expect(sidebarNavLinks.find(link => link.props.label === 'Feedback').props.to).toBe("/feedback");
  expect(sidebarNavLinks.find(link => link.props.label === 'Sign out')).not.toBeNull();
});
