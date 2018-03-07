import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { LoginRequiredRoute } from '../components';

import AssetList from './AssetList';
import { AssetForm, AssetView } from '../AssetDetail';
import Static from './Static';
import NotFoundPage from './NotFoundPage';
import {NOT_A_USER_PATH} from "../components/CheckIsUser";

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
    <LoginRequiredRoute path={NOT_A_USER_PATH} exact component={() => <Static page='not_a_user' withSidebar={false} />}/>

    <Route path="/oauth2-callback" exact component={() => <div />} />
    <Redirect from='/' exact to='/assets' />

    { /* Catch all route for "not found" */ }
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default AppRoutes;
