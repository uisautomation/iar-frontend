import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginRequiredRoute from '../components/LoginRequiredRoute';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AssetList from './AssetList';
import AssetForm from './AssetForm';
import Static from '../components/Static';

import '../style/App.css';

/**
 * IAR main application component.
 */
const App = ({ store }) => (
  <Provider store={ store }>
    <Router>
      <MuiThemeProvider>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/assets/dept"/>} />
          <LoginRequiredRoute path="/assets/:filter" component={AssetList} />
          <LoginRequiredRoute path="/static/:page" component={Static} />
          <LoginRequiredRoute path="/asset/:asset" component={AssetForm} />
          <Route path="/oauth2-callback" exact render={() => <div />} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
