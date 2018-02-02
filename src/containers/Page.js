/**
 * Top-level page for IAR containing sidebar and content.
 */
import React from 'react';
import { Sidebar } from '../components';

export default ({ children }) => (
  <div>
    <Sidebar />
    <div className="App-main">
      { children }
    </div>
  </div>
);
