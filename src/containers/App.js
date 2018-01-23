import React, { Component } from 'react';
import Header from '../components/Header';
import AssetList from './AssetList';
import Sidebar from '../components/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <Sidebar />
          <Header />
          <AssetList />
      </MuiThemeProvider>
    );
  }
}

export default App;
