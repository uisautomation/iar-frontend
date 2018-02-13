import React from 'react';
import SidebarNavLink from './SidebarNavLink';
import { Link } from 'react-router-dom';
import { ListItem } from 'material-ui/List';
import { render } from '../testutils';

test('SidebarNavLink should render', () => {
  expect(render(<SidebarNavLink label='x' to='/y'/>, { url: '/' })).toBeDefined();
});

test('Without specified component, SidebarNavLink has a ListItem for Link', () => {
  const instance = render(<SidebarNavLink label='x' to='/y'/>, { url: '/' });
  expect(instance.findByType(ListItem).props.component).toBe(Link)
});

test('With specified component, SidebarNavLink has a ListItem for that component', () => {
  const instance = render(<SidebarNavLink label='x' component='span' />, { url: '/' });
  expect(instance.findByType(ListItem).props.component).toBe('span')
});

test('SidebarNavLink passes props to the component', () => {
  const instance = render(<SidebarNavLink label='x' spanProps='y' component='span' />, { url: '/' });
  expect(instance.findByType('span').props.spanProps).toBe('y')
});

test('SidebarNavLink has differing className depending on whether it is active', () => {
  const inactiveIstance = render(<SidebarNavLink label='x' to='/y' />, { url: '/' });
  const activeInstance = render(<SidebarNavLink label='x' to='/y' />, { url: '/y' });
  expect(inactiveIstance.findByType(ListItem).props.className).not.toBe(
    activeInstance.findByType(ListItem).props.className);
});
