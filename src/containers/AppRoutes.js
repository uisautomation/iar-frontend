import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginRequiredRoute } from '../components';
import config from '../config';

import AssetList from './AssetList';
import AssetForm from './AssetForm';
import Static from './Static';
import NotFoundPage from './NotFoundPage';

/**
 * A container component which renders the appropriate route given the current location.
 * Use by wrapping in an appropriate Router.
 */
const AppRoutes = () => (
  <Switch>
    <LoginRequiredRoute path="/static/:page" exact component={Static}/>
    <LoginRequiredRoute path="/assets/:filter" exact component={AssetList}/>
    <LoginRequiredRoute path="/asset/create" exact component={AssetForm} />
    {/* FIXME refactor to use assetId */}
    <LoginRequiredRoute
       path="/asset/:assetId" exact
       component={routeProps => <AssetForm
         url={config.ENDPOINT_ASSETS + routeProps.match.params.assetId + '/'}
         {...routeProps} />}
    />
    <Route path="/oauth2-callback" exact component={() => <div />} />
    <Redirect from='/' exact to='/assets/dept' />

    { /* Catch all route for "not found" */ }
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
