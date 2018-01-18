import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import logo from '../images/logo.svg';
import '../style/App.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  render() {
    return (
        <Drawer open={this.state.open}>
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Assets</h3>
          <ul>
            <li><a href="">My department</a></li>
            <li><a href="">All</a></li>
          </ul>
        </Drawer>
    );
  }
}

export default Sidebar;
