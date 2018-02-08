import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import logo from '../images/logo.svg'
import LogoutLink from './LogoutLink'

/*
  Renders the IAR application side bar.
 */
const Sidebar = () => (
  <Drawer variant="permanent">
    <img src={logo} className="App-logo" alt="logo" />
    <h3>Assets</h3>
    <ul>
      <li><Link to="/assets/dept">My department</Link></li>
      <li><Link to="/assets/all">All</Link></li>
      <hr/>
      <li><Link to="/help">Help</Link></li>
      <hr/>
      <li><LogoutLink>Sign out</LogoutLink></li>
    </ul>
  </Drawer>
);

export default Sidebar
