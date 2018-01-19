import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Create from '../../components/Create';
import '../../style/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
            <Sidebar />
            <Header />
            <Route exact path="/" component={Main} />
            <Route path="/create" component={Create} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
