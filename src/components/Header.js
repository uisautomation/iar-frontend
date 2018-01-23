import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import '../style/App.css';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <header>
          <AppBar title="Assets: My department" />
        </header>
      </div>
    );
  }
}

export default Header;
