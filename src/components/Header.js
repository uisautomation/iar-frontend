import React from 'react'
import { Route, Link } from 'react-router-dom'
import { AppBar, RaisedButton } from 'material-ui'
import '../style/App.css';

const DefaultAppBar = () => {
  var link = <Link className='App-raised-button-link' to="/create">Create Asset</Link>;
  return <AppBar title="Welcome to the IAR" iconElementRight={<RaisedButton children={link}/>} />
};

const FormAppBar = () => {
  var cancel = <Link className='App-raised-button-link' to="/">Cancel</Link>;
  var save = <Link className='App-raised-button-link' to="/">Save</Link>;
  return <AppBar title="Editing: Some Resource Or Other" iconElementRight={
    <span><RaisedButton primary={true} children={cancel}/>&nbsp;<RaisedButton children={save}/></span>
  } />
};

const Header = () => {
  // FIXME default routes?
  return <div className="App-header">
    <header>
      <Route path="/" component={DefaultAppBar} exact />
      <Route path="/edited" component={DefaultAppBar} />
      <Route path="/all" component={DefaultAppBar} />
      <Route path="/what-is-asset" component={DefaultAppBar} />
      <Route path="/what-i-do" component={DefaultAppBar} />
      <Route path="/feedback" component={DefaultAppBar} />
      <Route path="/contact" component={DefaultAppBar} />
      <Route path="/tcs" component={DefaultAppBar} />
      <Route path="/create" component={FormAppBar} />
      <Route path="/asset" component={FormAppBar} />
    </header>
  </div>
};

export default Header
