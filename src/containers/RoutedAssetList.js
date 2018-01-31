// eslint-disable-next-line
import React from 'react'; // used implicitly by JSX
import { Route } from 'react-router-dom'
import AssetList from './AssetList';

const RoutedAssetList = () => (
  <Route path="/assets/:filter" component={AssetList}/>
);

export default RoutedAssetList;
