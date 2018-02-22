import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginRequiredRoute } from '../components';

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
    <LoginRequiredRoute path="/assets/:filter" exact component={AssetList}/>
    <LoginRequiredRoute path="/assets" exact component={AssetList}/>
    <LoginRequiredRoute path="/asset/:assetId" exact
                        component={routeProps => <AssetForm navigateOnSave='/' {...routeProps} />}
    />
    <LoginRequiredRoute path="/help" exact component={() => <Static page='help' />}/>
    <LoginRequiredRoute path="/feedback" exact component={() => <Static page='feedback' />}/>

    <Route path="/oauth2-callback" exact component={() => <div />} />
    <Redirect from='/' exact to='/assets' />

    { /* Catch all route for "not found" */ }
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
