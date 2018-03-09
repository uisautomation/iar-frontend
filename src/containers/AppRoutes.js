import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginRequiredRoute } from '../components';

import AssetList from './AssetList';
import { AssetForm, AssetView } from '../AssetDetail';
import Static from './Static';
import NotFoundPage from './NotFoundPage';
import RedirectToMyDeptAssets from './RedirectToMyDeptAssets';

/**
 * A container component which renders the appropriate route given the current location.
 * Use by wrapping in an appropriate Router.
 */
const AppRoutes = () => (
  <Switch>
    <LoginRequiredRoute path="/assets/:filter" exact component={AssetList} />
    <LoginRequiredRoute path="/assets" exact component={AssetList}/>
    <LoginRequiredRoute path="/asset" exact component={AssetForm} />
    <LoginRequiredRoute path="/asset/:assetId/edit" exact component={AssetForm} />
    <LoginRequiredRoute path="/asset/:assetId" exact component={AssetView} />
    <LoginRequiredRoute path="/help" exact component={() => <Static page='help' />}/>
    <LoginRequiredRoute path="/feedback" exact component={() => <Static page='feedback' />}/>

    <Route path="/oauth2-callback" exact component={() => <div />} />
    <LoginRequiredRoute path="/" exact component={RedirectToMyDeptAssets} />

    { /* Catch all route for "not found" */ }
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
