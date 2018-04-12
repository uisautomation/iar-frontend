import React from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import { IntlProvider } from 'react-intl';
import history from '../history'
import {
  DeleteConfirmationDialog, FetchLookupInstitutions, FetchSelf, ScrollToTop, Snackbar
} from '../components';
import PropTypes from 'prop-types';
import AppRoutes from './AppRoutes';
import TokenTimeout from './TokenTimeout';
import theme from '../style/CustomMaterialTheme';
import '../style/App.css';

import config from '../config';

// Allow configuration of basename via config.basename variable. Defaults to "/".
// Make sure to have leading *and* trailing slashes if you configure this setting.
const basename = config.basename;

/*
  IAR main app component.
  */
const App = ({ store }) => (
  <MuiThemeProvider theme={theme}>
    <IntlProvider locale={navigator.language}>
      <ReduxProvider store={ store }>
        <div>
          <Router basename={basename} history={history}>
            <ScrollToTop>
              <AppRoutes />
            </ScrollToTop>
          </Router>
          <DeleteConfirmationDialog />
          <Snackbar />
          <FetchSelf />
          <FetchLookupInstitutions />
          <TokenTimeout />
        </div>
      </ReduxProvider>
    </IntlProvider>
  </MuiThemeProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
