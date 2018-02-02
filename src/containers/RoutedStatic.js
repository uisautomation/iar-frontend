import React from 'react';
import { LoginRequiredRoute } from '../components'
import Static from './Static';

const RoutedStatic = () => (
  <LoginRequiredRoute path="/static/:page" component={Static}/>
);

export default RoutedStatic;
