import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './containers/App';
import { unregister } from './registerServiceWorker';
import configureStore from './redux/store';

configureStore().then(({store}) => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
  // Un-register any previous service worker we registered for this app.
  // For the moment we remain an online-only application until we're sure that we don't need to
  // roll out rapid iterations.
  unregister();
});
