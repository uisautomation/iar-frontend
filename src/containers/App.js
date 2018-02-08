import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Snackbar from '../components/Snackbar';
import PropTypes from 'prop-types';
import AppRoutes from './AppRoutes';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import ScrollToTop from '../components/ScrollToTop';
import '../style/App.css';

const theme = createMuiTheme();

/*
  IAR main app component.
  */
const App = ({ store }) => (
  <MuiThemeProvider theme={theme}>
    <Provider store={ store }>
      <div>
        <Router>
          <ScrollToTop>
            <AppRoutes />
          </ScrollToTop>
        </Router>
        <DeleteConfirmationDialog />
        <Snackbar />
      </div>
    </Provider>
  </MuiThemeProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
