import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from '../components/Snackbar';
import PropTypes from 'prop-types';
import AppRoutes from './AppRoutes';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import ScrollToTop from '../components/ScrollToTop';
import '../style/App.css';

/*
  IAR main app component.
  */
const App = ({ store }) => (
  <Provider store={ store }>
    <MuiThemeProvider>
      <div>
        <Router>
          <ScrollToTop>
            <AppRoutes />
          </ScrollToTop>
        </Router>
        <DeleteConfirmationDialog />
        <Snackbar />
      </div>
    </MuiThemeProvider>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
