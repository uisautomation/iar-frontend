import React from 'react'
import { Route } from 'react-router-dom'
import AssetForm from './AssetForm';

const RoutedAssetForm = (props) => (
  <Route path="/asset/:assetId"
         render={(routeProps) => <AssetForm handleMessage={props.handleMessage && props.handleMessage.bind(this)} {...routeProps}/>} />
);

export default RoutedAssetForm
