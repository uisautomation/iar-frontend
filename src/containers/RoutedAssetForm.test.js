import React from 'react';
import fetch_mock from 'fetch-mock';
import { render, condition } from '../testutils';
import { AppBar, AutoComplete, RadioButtonGroup, TextField } from 'material-ui';
import { BooleanChoice, CheckboxGroup } from '../components'

// need to mock the material-ui checkbox as we get 'TypeError: Cannot read property 'checked' of undefined'
// when rendered with react-test-renderer. see
// https://stackoverflow.com/questions/48465807/why-is-my-renderer-failing-when-using-material-ui-using-jest-and-react-test-rend
jest.mock('material-ui/Checkbox', () => () => <input type='check' />);

import RoutedAssetForm from './RoutedAssetForm';

test('can route /asset/create', () => {

  const testInstance = render(<RoutedAssetForm/>, '/asset/create');

  expect(testInstance.findByType(AppBar).props.title).toBe('Create new asset')
});

test('can route /asset/8722783d-23cc-4130-a0ab-9cc510e4feb7', async () => {

  fetch_mock.get('http://localhost:8000/assets/8722783d-23cc-4130-a0ab-9cc510e4feb7/', {name: 'The Asset'});

  const testInstance = render(<RoutedAssetForm/>, '/asset/8722783d-23cc-4130-a0ab-9cc510e4feb7');

  // waits for the title to be populated. TODO better way to do this?
  await condition(() => testInstance.findByType(AppBar).props.title);

  expect(testInstance.findByType(AppBar).props.title).toBe('Editing: The Asset')
});

test('can render a blank form', () => {

  const testInstance = render(<RoutedAssetForm/>, '/asset/create');

  expect(testInstance.findByProps({name: 'name'}).type).toBe(TextField);

  expect(testInstance.findByProps({name: 'department'}).type).toBe(TextField);

  expect(testInstance.findByProps({name: 'purpose'}).type).toBe(TextField);

  expect(testInstance.findByProps({name: "research"}).type).toBe(BooleanChoice);

  expect(testInstance.findByProps({hintText: 'Principle Investigator'}).type).toBe(AutoComplete);

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

test('can populate a form with data', async () => {

  fetch_mock.get('http://localhost:8000/assets/e20f4cd4-9f97-4829-8178-476c7a67eb97/', {
    name: 'Super Secret Medical Data',
    department: "Medicine",
    purpose: "Medical Research",
    research: true,
    owner: "mb2174",
    private: true,
    personal_data: true,
    data_subject: ["patients"],
    data_category: ["sexual", "medical", "genetic", "biometric"],
    recipients_category: "Addenbrookes",
    recipients_outside_eea: "Not shared",
    retention: "other",
    retention_other: "Yonks",
    risk_type: ["compliance",  "reputational", "operational"],
    storage_location: "Under the stairs",
    storage_format: ["both"],
    digital_storage_security: ["encryption", "acl"],
    paper_storage_security: ["safe"],
    url: "http://localhost:8000/assets/e20f4cd4-9f97-4829-8178-476c7a67eb97/"
  });

  fetch_mock.get('http://localhost:8080/people/crsid/mb2174', {
    url:"http://localhost:8080/people/crsid/mb2174",
    identifier:{"scheme":"crsid","value":"mb2174"},
    visibleName:"M. Bamford",
  });

  const testInstance = render(<RoutedAssetForm/>, '/asset/e20f4cd4-9f97-4829-8178-476c7a67eb97');

  // waits for the title to be populated.
  await condition(() => testInstance.findByType(AppBar).props.title);

  expect(testInstance.findByProps({name: 'name'}).props.value).toBe('Super Secret Medical Data');

  expect(testInstance.findByProps({name: 'department'}).props.value).toBe("Medicine");

  expect(testInstance.findByProps({name: 'purpose'}).props.value).toBe("Medical Research");

  expect(testInstance.findByProps({name: "research"}).props.value).toBeTruthy();

  // FIXME
//  expect(testInstance.findByProps({hintText: 'Principle Investigator'}).props.value).toBe("mb2174");

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

  expect(testInstance.findByProps({name: 'storage_format'}).props.valueSelected).toBe("both");

  expect(testInstance.findByProps({name: "digital_storage_security"}).props.values).toEqual(["encryption", "acl"]);

  expect(testInstance.findByProps({name: "paper_storage_security"}).props.values).toEqual(["safe"]);
});
