// mock any components which are troublesome in our test suite
import '../test/mocks';

import React from 'react';
import { RadioButtonGroup, TextField } from 'material-ui';
import { render } from '../testutils';
import { BooleanChoice, CheckboxGroup, Lookup } from '../components'
import { createMockStore, DEFAULT_INITIAL_STATE } from '../testutils';
import {ASSET_GET_REQUEST, ASSET_PUT_REQUEST, ASSET_POST_REQUEST} from '../redux/actions/assetRegisterApi';
import AssetForm from "./AssetForm";
import { Route } from 'react-router-dom';
import {ENDPOINT_ASSETS} from "../config";


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
  retention: 'other',
  retention_other: 'Yonks',
  risk_type: [ 'compliance', 'reputational', 'operational' ],
  storage_location: 'Under the stairs',
  storage_format: [ 'digital', 'paper' ],
  paper_storage_security: [ 'safe' ],
  digital_storage_security: [ 'encryption', 'acl' ]
};

const ASSET_FIXTURE_URL = ENDPOINT_ASSETS + 'e20f4cd4-9f97-4829-8178-476c7a67eb97/';

const ASSET_FIXTURE = {...NEW_ASSET_FIXTURE, url: ASSET_FIXTURE_URL};

/*
  Tests that all input's are present on a blank form
 */
test('can render a blank form', () => {

  const testInstance = render(<Route path="/asset/create" component={AssetForm} />, {
    url: '/asset/create'
  });

  expect(testInstance.findByProps({name: 'name'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'department'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'purpose'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: "research"}).type).toBe(BooleanChoice);
  expect(testInstance.findByProps({name: 'owner'}).type).toBe(Lookup);
  expect(testInstance.findByProps({name: "private"}).type).toBe(BooleanChoice);
  expect(testInstance.findByProps({name: "personal_data"}).type).toBe(BooleanChoice);
  expect(testInstance.findByProps({name: "data_subject"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: "data_category"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: 'recipients_category'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'recipients_outside_eea'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'retention'}).type).toBe(RadioButtonGroup);
  expect(testInstance.findByProps({name: 'retention_other'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: "risk_type"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: 'storage_location'}).type).toBe(TextField);
  expect(testInstance.findByProps({name: 'storage_format'}).type).toBe(RadioButtonGroup);
  expect(testInstance.findByProps({name: "digital_storage_security"}).type).toBe(CheckboxGroup);
  expect(testInstance.findByProps({name: "paper_storage_security"}).type).toBe(CheckboxGroup);
});

/*
  Tests that all input's are populated with the correct data when in editing mode.
 */
test('can populate a form with data', () => {

  const assetForm = <Route path="/asset/:assetId" component={AssetForm} />;

  // test the ASSET_GET_REQUEST is dispatched

  const store = createMockStore();

  render(assetForm, {
    url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97', store
  });

  expect(store.getActions()).toEqual([{meta: {url: ASSET_FIXTURE_URL}, type: ASSET_GET_REQUEST}]);

  // test the ASSET_GET_REQUEST is dispatched

  const assetsByUrl = new Map([[ASSET_FIXTURE_URL, {asset: NEW_ASSET_FIXTURE}]]);

  const testInstance = render(assetForm, {
    url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97',
    store: createMockStore({...DEFAULT_INITIAL_STATE, assets: {assetsByUrl}})
  });

  expect(testInstance.findByProps({name: 'name'}).props.value).toBe('Super Secret Medical Data');
  expect(testInstance.findByProps({name: 'department'}).props.value).toBe("Medicine");
  expect(testInstance.findByProps({name: 'purpose'}).props.value).toBe("Medical Research");
  expect(testInstance.findByProps({name: "research"}).props.value).toBeTruthy();
  expect(testInstance.findByProps({name: 'owner'}).props.value).toBe("mb2174");
  expect(testInstance.findByProps({name: "private"}).props.value).toBeTruthy();
  expect(testInstance.findByProps({name: "personal_data"}).props.value).toBeTruthy();
  expect(testInstance.findByProps({name: "data_subject"}).props.values).toEqual(["patients"]);
  expect(testInstance.findByProps({name: "data_category"}).props.values).toEqual(["sexual", "medical", "genetic", "biometric"]);
  expect(testInstance.findByProps({name: 'recipients_category'}).props.value).toBe("Addenbrookes");
  expect(testInstance.findByProps({name: 'recipients_outside_eea'}).props.value).toBe("Not shared");
  expect(testInstance.findByProps({name: 'retention'}).props.valueSelected).toBe("other");
  expect(testInstance.findByProps({name: 'retention_other'}).props.value).toBe("Yonks");
  expect(testInstance.findByProps({name: "risk_type"}).props.values).toEqual(["compliance", "reputational", "operational"]);
  expect(testInstance.findByProps({name: 'storage_location'}).props.value).toBe("Under the stairs");
  expect(testInstance.findByProps({name: 'storage_format'}).props.valueSelected).toBe("digital,paper");
  expect(testInstance.findByProps({name: "digital_storage_security"}).props.values).toEqual(["encryption", "acl"]);
  expect(testInstance.findByProps({name: "paper_storage_security"}).props.values).toEqual(["safe"]);
});

/*
  Tests that a new asset is saved with the correct data.
 */
test('can save a new asset', async () => {

  const assetForm = <Route path="/asset/create" component={AssetForm} />;

  const store = createMockStore();
  const testInstance = render(assetForm, {store, url: '/asset/create'});

  setDataOnInput(testInstance, 'name', 'Super Secret Medical Data');
  setDataOnInput(testInstance, 'department', "Medicine");
  setDataOnInput(testInstance, 'purpose', "Medical Research");
  setDataOnInput(testInstance, 'research', true);
  setDataOnInput(testInstance, 'owner', "mb2174");
  setDataOnInput(testInstance, 'private', true);
  setDataOnInput(testInstance, 'personal_data', true);
  setDataOnInput(testInstance, 'data_subject', ["patients"]);
  setDataOnInput(testInstance, 'data_category', ["sexual", "medical", "genetic", "biometric"]);
  setDataOnInput(testInstance, 'recipients_category', "Addenbrookes");
  setDataOnInput(testInstance, 'recipients_outside_eea', "Not shared");
  setDataOnInput(testInstance, 'retention', "other");
  setDataOnInput(testInstance, 'retention_other', "Yonks");
  setDataOnInput(testInstance, 'risk_type', ["compliance",  "reputational", "operational"]);
  setDataOnInput(testInstance, 'storage_location', "Under the stairs");
  setDataOnInput(testInstance, 'storage_format', "digital,paper");
  setDataOnInput(testInstance, 'digital_storage_security', ["encryption", "acl"]);
  setDataOnInput(testInstance, 'paper_storage_security', ["safe"]);

  // "click" the save button
  testInstance.findByProps({label: 'Save'}).props.onClick();

  const action = store.getActions().find(action => action.type === ASSET_POST_REQUEST);

  expect(action.meta.url).toEqual(ENDPOINT_ASSETS);
  expect(JSON.parse(action.meta.body)).toEqual(NEW_ASSET_FIXTURE);
});

/*
  Tests that an edited existing asset is saved with the correct data.
 */
test('can update an asset', async () => {

  const assetsByUrl = new Map([[ASSET_FIXTURE_URL, {asset: ASSET_FIXTURE}]]);

  const store = createMockStore({...DEFAULT_INITIAL_STATE, assets: {assetsByUrl}});

  const assetForm = <Route path="/asset/:assetId" component={AssetForm} />;

  const testInstance = render(assetForm, {
    url: '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97', store
  });

  setDataOnInput(testInstance, 'purpose', "Secret Medical Research");

  // "click" the save button
  testInstance.findByProps({label: 'Save'}).props.onClick();

  const action = store.getActions().find(action => action.type === ASSET_PUT_REQUEST);

  expect(action.meta.url).toEqual(ASSET_FIXTURE_URL);
  expect(JSON.parse(action.meta.body)).toEqual({...ASSET_FIXTURE, purpose: 'Secret Medical Research'});
});

/*
  Helper for setting some data on an input component
 */
function setDataOnInput(testInstance, name, value) {
  testInstance.findByProps({name: name}).props.onChange({target: {name: name}}, value);
}
