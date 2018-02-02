// eslint-disable-next-line
import React from 'react'; // used implicitly by JSX
import { LoginRequiredRoute } from '../components'
import AssetList from './AssetList';

const RoutedAssetList = () => (
  <LoginRequiredRoute path="/assets/:filter" component={AssetList}/>
);

export default RoutedAssetList;
