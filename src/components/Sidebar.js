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
      <li><Link to="/assets/dept">My department</Link></li>
      <li><Link to="/assets/edited">Edited recently</Link></li>
      <li><Link to="/assets/all">All</Link></li>
      <hr/>
      <li><Link to="/static/what-is-asset">What is an information asset?</Link></li>
      <li><Link to="/static/what-i-do">What do I need to do?</Link></li>
      <hr/>
      <li><Link to="/static/feedback">Feedback</Link></li>
      <li><Link to="/static/contact">Contact</Link></li>
      <li><Link to="/static/tcs">Terms & Conditions</Link></li>
    </ul>
  </Drawer>
);

export default Sidebar
