import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Sidebar from '../components/Sidebar'
import AssetList from './AssetList'
import AssetForm from './AssetForm'
import Static from '../components/Static'
import '../style/App.css'

/*
  IAR main app component.
  */
const App = () => (
  <Router>
    <MuiThemeProvider>
      <div>
        <Sidebar />
        <Route path="/" exact render={() => <Redirect to="/assets/dept"/>} />
        <Route path="/assets/:filter" component={AssetList} />
        <Route path="/static/:page" component={Static} />
        <Route path="/asset/:asset" component={AssetForm} />
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App
