import React, { Component } from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../../style/App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <Sidebar />
          <Header />
          <Main />
      </MuiThemeProvider>
    );
  }
}

export default App;
