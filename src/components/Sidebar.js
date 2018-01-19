import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import logo from '../images/logo.svg'
import '../style/App.css'

// FIXME route /all to Main
const Sidebar = () => (
  <Drawer open={true}>
    <img src={logo} className="App-logo" alt="logo" />
    <h3>Assets</h3>
    <ul>
      <li><Link to="/">My department</Link></li>
      <li><a href="/all">All</a></li>
    </ul>
  </Drawer>
);

export default Sidebar
