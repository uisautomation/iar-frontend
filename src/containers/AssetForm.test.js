// mock any components which are troublesome in our test suite
import '../test/mocks';

// Mock configuration for endpoints
jest.mock('../config', () => ({
  ENDPOINT_ASSETS: 'http://localhost:8000/assets/',
  ENDPOINT_LOOKUP: 'http://localhost:8080/',
}));

import React from 'react';
import { Route } from 'react-router-dom'
import fetch_mock from 'fetch-mock';
import { AppBar, RadioGroup, TextField, Typography, FormControlLabel } from 'material-ui';
import { render, condition } from '../testutils';
import { BooleanChoice, CheckboxGroup, Lookup } from '../components'
import AppRoutes from './AppRoutes';
import AssetFormHeader from '../components/AssetFormHeader';
import { createMockStore } from '../testutils';
import { SNACKBAR_OPEN } from '../redux/actions/snackbar';

const NEW_ASSET_FIXTURE = {
  name: 'Super Secret Medical Data',
  department: 'Medicine',
  purpose: 'Medical Research',
  research: true,
  owner: 'mb2174',
  private: true,
  personal_data: true,
  data_subject: [ 'patients' ],
  data_category: [ 'sexual', 'medical', 'genetic', 'biometric' ],
  recipients_category: 'Addenbrookes',
  recipients_outside_eea: 'Not shared',
  retention: '<=1',
  risk_type: [ 'compliance', 'reputational', 'operational' ],
  storage_location: 'Under the stairs',
  storage_format: [ 'digital', 'paper' ],
  paper_storage_security: [ 'safe' ],
  digital_storage_security: [ 'encryption', 'acl' ]
};

const ASSET_FIXTURE_URL = 'http://localhost:8000/assets/e20f4cd4-9f97-4829-8178-476c7a67eb97/';

const ASSET_FIXTURE = {...NEW_ASSET_FIXTURE, url: ASSET_FIXTURE_URL};

fetch_mock.get(ASSET_FIXTURE_URL, ASSET_FIXTURE);

// Required because asset form redirects to the index when the form has been saved and the index
// will fetch the asset list.
fetch_mock.get('http://localhost:8000/assets/', {
  next: null, previous: null, results: [ ASSET_FIXTURE ],
});

fetch_mock.get('http://localhost:8080/people/crsid/mb2174', {
  url: "http://localhost:8080/people/crsid/mb2174",
  identifier: {"scheme": "crsid", "value": "mb2174"},
  visibleName: "M. Bamford",
});

const appBarTitle = testInstance => (
  testInstance.findByType(AppBar).findByType(Typography).props.children
);

/*
  Tests that a form is rendered for /asset/create
 */
test('can route /asset/create', () => {

  const testInstance = render(<AppRoutes/>, {url: '/asset/create'});

  expect(appBarTitle(testInstance)).toBe('Create new asset')
});

/*
  Tests that a form populated with an asset is rendered for /asset/:assetId
 */
test('can route /asset/e20f4cd4-9f97-4829-8178-476c7a67eb97', async () => {

  const testInstance = render(<AppRoutes/>, {url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97'});

  // waits for the title to be populated. TODO better way to do this?
  await condition(() => appBarTitle(testInstance));

  expect(appBarTitle(testInstance)).toBe('Editing: Super Secret Medical Data')
});

/*
  Tests that all input's are present on a blank form
 */
test('can render a blank form', () => {

  const testInstance = render(<AppRoutes/>, {url: '/asset/create'});

  expect(testInstance.findByProps({name: 'name'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'department'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'purpose'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: "research"}).type).toBe(BooleanChoice);
  expect(testInstance.findByProps({name: 'owner'}).type).toBe(Lookup);
  expect(testInstance.findByProps({name: "private"}).type).toBe(FormControlLabel);
  expect(testInstance.findByProps({name: "personal_data"}).type).toBe(BooleanChoice);
  expect(testInstance.findByProps({name: "data_subject"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: "data_category"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: 'recipients_category'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'recipients_outside_eea'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'retention'}).type).toBe(RadioGroup);
  expect(testInstance.findByProps({name: "risk_type"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: 'storage_location'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'storage_format'}).type).toBe(RadioGroup);
  expect(testInstance.findByProps({name: "digital_storage_security"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: "paper_storage_security"}).type).toBe(CheckboxGroup);
});

/*
  Tests that all input's are populated with the correct data when in editing mode.
 */
test('can populate a form with data', async () => {

  const testInstance = render(<AppRoutes/>, {url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97'});

  // waits for the title to be populated.
  await condition(() => appBarTitle(testInstance));

  expect(testInstance.findByProps({name: 'name'}).props.value).toBe('Super Secret Medical Data');
  expect(testInstance.findByProps({name: 'department'}).props.value).toBe("Medicine");
  expect(testInstance.findByProps({name: 'purpose'}).props.value).toBe("Medical Research");
  expect(testInstance.findByProps({name: "research"}).props.value).toBeTruthy();
  expect(testInstance.findByProps({name: 'owner'}).props.value).toBe("mb2174");
  expect(testInstance.findByProps({name: "private"}).props.checked).toBeTruthy();
  expect(testInstance.findByProps({name: "personal_data"}).props.value).toBeTruthy();
  expect(testInstance.findByProps({name: "data_subject"}).props.values).toEqual(["patients"]);
  expect(testInstance.findByProps({name: "data_category"}).props.values).toEqual(["sexual", "medical", "genetic", "biometric"]);
  expect(testInstance.findByProps({name: 'recipients_category'}).props.value).toBe("Addenbrookes");
  expect(testInstance.findByProps({name: 'recipients_outside_eea'}).props.value).toBe("Not shared");
  expect(testInstance.findByProps({name: 'retention'}).props.value).toBe("<=1");
  expect(testInstance.findByProps({name: "risk_type"}).props.values).toEqual(["compliance", "reputational", "operational"]);
  expect(testInstance.findByProps({name: 'storage_location'}).props.value).toBe("Under the stairs");
  expect(testInstance.findByProps({name: 'storage_format'}).props.value).toBe("digital,paper");
  expect(testInstance.findByProps({name: "digital_storage_security"}).props.values).toEqual(["encryption", "acl"]);
  expect(testInstance.findByProps({name: "paper_storage_security"}).props.values).toEqual(["safe"]);
});

/*
  Tests that fetch errors are reported - in this case a 404.
 */
test('check fetch errors are reports', async () => {

  fetch_mock.get('http://localhost:8000/assets/NO-ASSETS-HERE/', 404);

  const store = createMockStore();
  render(<AppRoutes />, {store, url: '/asset/NO-ASSETS-HERE'});

  await condition(() => store.getActions().filter(action => action.type === SNACKBAR_OPEN));

  const [ { payload: { message } } ] =
    store.getActions().filter(action => action.type === SNACKBAR_OPEN);

  expect(message).toEqual('Network Error: Not Found');
});

/*
  Tests that a new asset is saved with the correct data.
 */
test('can save a new asset', async () => {

  fetch_mock.post(function(url, opts) {
    expect(url).toEqual('http://localhost:8000/assets/');
    expect(JSON.parse(opts.body)).toEqual(NEW_ASSET_FIXTURE);
    return true;
  }, ASSET_FIXTURE);

  const store = createMockStore();
  const testInstance = render(<AppRoutes />, {store, url: '/asset/create'});

  setDataOnInput(testInstance, 'name', 'Super Secret Medical Data');
  setDataOnInput(testInstance, 'department', "Medicine");
  setDataOnInput(testInstance, 'purpose', "Medical Research");
  setDataOnInput(testInstance, 'research', "true");
  setDataOnInput(testInstance, 'owner', "mb2174");
  setDataOnInput(testInstance, 'private', true);
  setDataOnInput(testInstance, 'personal_data', "true");
  setDataOnInput(testInstance, 'data_subject', ["patients"]);
  setDataOnInput(testInstance, 'data_category', ["sexual", "medical", "genetic", "biometric"]);
  setDataOnInput(testInstance, 'recipients_category', "Addenbrookes");
  setDataOnInput(testInstance, 'recipients_outside_eea', "Not shared");
  setDataOnInput(testInstance, 'retention', "<=1");
  setDataOnInput(testInstance, 'risk_type', ["compliance",  "reputational", "operational"]);
  setDataOnInput(testInstance, 'storage_location', "Under the stairs");
  setDataOnInput(testInstance, 'storage_format', "digital,paper");
  setDataOnInput(testInstance, 'digital_storage_security', ["encryption", "acl"]);
  setDataOnInput(testInstance, 'paper_storage_security', ["safe"]);

  // "click" the save button and wair for the response
  testInstance.findByType(AssetFormHeader).props.onClick();
  await condition(() => store.getActions().filter(action => action.type === SNACKBAR_OPEN));

  const [ { payload: { message } } ] =
    store.getActions().filter(action => action.type === SNACKBAR_OPEN);

  expect(message).toEqual('"Super Secret Medical Data" saved.');
});

/*
  Tests that an edited existing asset is saved with the correct data.
 */
test('can update an asset', async () => {
  fetch_mock.put(function(url, opts) {
    expect(url).toEqual('http://localhost:8000/assets/e20f4cd4-9f97-4829-8178-476c7a67eb97/');
    // check for new value
    expect(JSON.parse(opts.body)).toEqual({...ASSET_FIXTURE, purpose: 'Secret Medical Research'});
    return true;
  }, ASSET_FIXTURE);

  const store = createMockStore();
  const testInstance = render(<AppRoutes />, {store, url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97'});

  // waits for the title to be populated.
  await condition(() => appBarTitle(testInstance));

  setDataOnInput(testInstance, 'purpose', "Secret Medical Research");

  // "click" the save button and wait for the response
  testInstance.findByType(AssetFormHeader).props.onClick();
  await condition(() => store.getActions().filter(action => action.type === SNACKBAR_OPEN));

  const [ { payload: { message } } ] =
    store.getActions().filter(action => action.type === SNACKBAR_OPEN);

  expect(message).toEqual('"Super Secret Medical Data" saved.');
});

/*
  Helper for setting some data on an input component
 */
function setDataOnInput(testInstance, name, value) {
  testInstance.findByProps({name: name}).props.onChange({target: {name: name, value}}, value);
}
