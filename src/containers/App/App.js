import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Main from '../../components/Main'
import Static from '../../components/Static'
import Form from '../../components/Form'
import '../../style/App.css'

/*

 */
const App = () => (
  <Router>
    <MuiThemeProvider>
      <Sidebar />
      <Header />
      <Route path="/" component={Main} exact />
      <Route path="/edited" component={Main} />
      <Route path="/all" component={Main} />
      <Route path="/what-is-asset" component={Static} />
      <Route path="/what-i-do" component={Static} />
      <Route path="/feedback" component={Static} />
      <Route path="/contact" component={Static} />
      <Route path="/tcs" component={Static} />
      <Route path="/create" component={Form} />
      <Route path="/asset" component={Form} />
    </MuiThemeProvider>
  </Router>
);

export default App
