import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Static from '../../components/Static'
import Form from '../../components/Form'
import '../../style/App.css'

// FIXME move Header?
const App = (props) => (
  <Router>
    <MuiThemeProvider>
      <Sidebar />
      <Header />
      <Route path="/" exact render={() => <Redirect to="/assets/dept"/>} />
      <Route path="/assets" component={Main} />
      <Route path="/static/:page" component={Static} />
      <Route path="/asset" component={Form} />
    </MuiThemeProvider>
  </Router>
);

export default App
