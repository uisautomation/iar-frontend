import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui'
import '../style/App.css';

const Header = () => {
  var link = <Link className='App-raised-button-link' to="/create">Create Asset</Link>;
  return <div className="App-header">
    <header>
      <AppBar
        title="Welcome to the IAR"
        iconElementRight={<RaisedButton children={link}/>}
      />
    </header>
  </div>
};

export default Header
