import '../test/mock-localstorage.js';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mockStore, DEFAULT_INITIAL_STATE } from '../testutils.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={mockStore(DEFAULT_INITIAL_STATE)} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
