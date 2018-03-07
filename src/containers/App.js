import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import { IntlProvider } from 'react-intl';
import {
  DeleteConfirmationDialog, FetchLookupInstitutions, FetchSelf, ScrollToTop, Snackbar
} from '../components';
import PropTypes from 'prop-types';
import AppRoutes from './AppRoutes';
import theme from '../style/CustomMaterialTheme';
import '../style/App.css';

// Allow configuration of basename via REACT_APP_BASENAME environment variable. Defaults to "/".
// Make sure to have leading *and* trailing slashes if you configure this setting.
const basename = process.env.REACT_APP_BASENAME || '/';

/*
  IAR main app component.
  */
const App = ({ store }) => (
  <MuiThemeProvider theme={theme}>
    <IntlProvider locale={navigator.language}>
      <ReduxProvider store={ store }>
        <div>
          <Router basename={basename}>
            <ScrollToTop>
              <AppRoutes />
            </ScrollToTop>
          </Router>
          <DeleteConfirmationDialog />
          <Snackbar />
          <FetchSelf />
          <FetchLookupInstitutions />
        </div>
      </ReduxProvider>
    </IntlProvider>
  </MuiThemeProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
