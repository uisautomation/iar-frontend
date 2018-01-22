import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import logo from '../images/logo.svg'
import '../style/App.css'

const Sidebar = () => (
  <Drawer open={true}>
    <img src={logo} className="App-logo" alt="logo" />
    <h3>Assets</h3>
    <ul>
      <li><Link to="/">My department</Link></li>
      <li><Link to="/edited">Edited recently</Link></li>
      <li><Link to="/all">All</Link></li>
      <hr/>
      <li><Link to="/what-is-asset">What is an information asset?</Link></li>
      <li><Link to="/what-i-do">What do I need to do?</Link></li>
      <hr/>
      <li><Link to="/feedback">Feedback</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/tcs">Terms & Conditions</Link></li>
    </ul>
  </Drawer>
);

export default Sidebar
