import React, {Component} from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Snackbar } from 'material-ui';
import RoutedAssetList from './RoutedAssetList'
import RoutedAssetForm from './RoutedAssetForm'
import RoutedStatic from './RoutedStatic'
import PropTypes from 'prop-types';
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
      <Provider store={ this.props.store }>
        <Router>
          <MuiThemeProvider>
            <Switch>
              <Route path="/" exact render={() => <Redirect to="/assets/dept"/>}/>
              <RoutedAssetList/>
              <RoutedStatic/>
              <RoutedAssetForm handleMessage={this.handleMessage.bind(this)} />
              <Route path="/oauth2-callback" exact render={() => <div />} />
              <Snackbar
                open={this.state.snackOpen}
                message={this.state.message}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose.bind(this)}
              />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
