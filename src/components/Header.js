import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import '../style/App.css';

// <RaisedButton label="Create Asset" href="/create" />
const Header = () => (
  <div className="App-header">
    <header>
      <AppBar
        title="Welcome to the IAR"
//        iconElementRight={<Link to="/create">Create Asset</Link>}
      />
    </header>
  </div>
);

export default Header
