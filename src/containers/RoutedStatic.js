import React from 'react';
import { Route } from 'react-router-dom'
import Static from './Static';

const RoutedStatic = () => (
  <Route path="/static/:page" component={Static}/>
);

export default RoutedStatic;
