import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';

configureStore().then(({store}) => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'));
  registerServiceWorker();
});
