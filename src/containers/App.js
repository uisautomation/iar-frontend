import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Snackbar } from 'material-ui';
import { Sidebar } from '../components'
import AssetList from './AssetList'
import AssetForm from './AssetForm'
import Static from '../components/Static'
import '../style/App.css'

/*
  IAR main app component.
  */
class App extends Component {

  constructor() {
    super();
    this.state = {
      snackOpen: false,
      message: "",
    }
  }

  /*
  Clears the Snackbar.
   */
  handleRequestClose() {
    this.setState({
      snackOpen: false,
    });
  };

  /*
  Called by all components to message the user via a Snackbar.
   */
  handleMessage(message) {
    this.setState({
      message: message,
      snackOpen: true
    });
  };

  render() {
    return (
      <div>
        <Router>
          <MuiThemeProvider>
            <div>
              <Sidebar/>
              <Route path="/" exact render={() => <Redirect to="/assets/dept"/>}/>
              <AssetList/>
              <Static/>
              <AssetForm handleMessage={this.handleMessage.bind(this)} />
              <Snackbar
                open={this.state.snackOpen}
                message={this.state.message}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose.bind(this)}
              />
            </div>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App
