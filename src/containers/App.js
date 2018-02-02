import React, {Component} from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Snackbar } from 'material-ui';
import PropTypes from 'prop-types';
import AppRoutes from './AppRoutes';
import '../style/App.css';

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
      <Provider store={ this.props.store }>
        <MuiThemeProvider>
          <div>
            <Router>
              <AppRoutes handleMessage={ message => this.handleMessage(message) } />
            </Router>
            <Snackbar
              open={this.state.snackOpen}
              message={this.state.message}
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose.bind(this)}
            />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
