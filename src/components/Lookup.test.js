import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Map } from 'immutable';
import { Chip, TextField } from '@material-ui/core';
import {render, createMockStore, DEFAULT_INITIAL_STATE, condition} from '../testutils';
import Lookup from "./Lookup";
import {PEOPLE_LIST_REQUEST} from "../redux/actions/lookupApi";

const createLookup = (value, onChange = () => {}) => (<Lookup
  label="Principle Investigator"
  helperText="You can search by name or CRSid"
  name="owner"
  value={value}
  onChange={event => onChange(event)}
/>);

const PERSON_FIXTURE = {
  url: "http://localhost:8080/people/crsid/msb999",
  cancelled: false,
  identifier: {scheme: "crsid", value: "msb999"},
  visibleName: "M. Bamford",
  isStaff: true,
  isStudent: false
};

// test that a TextField is rendered there is no initial input value
test('a TextField is rendered if no value', () => {

  const testInstance = render(createLookup());

  const textFieldProps = testInstance.findByType(TextField).props;

  expect(textFieldProps.label).toBe('Principle Investigator');
  expect(textFieldProps.helperText).toBe('You can search by name or CRSid');
});

// test that a Chip is rendered there is an initial input value
test('a Chip is rendered if value', () => {

  const testInstance = render(createLookup("msb999"), {
    store: createMockStore({
      lookupApi: {
        ...DEFAULT_INITIAL_STATE.lookupApi,
        peopleByCrsid: Map([["msb999", PERSON_FIXTURE]])
      }
    })
  });

  expect(testInstance.findByType(Chip).props.label).toBe('M. Bamford (msb999)');
});

// test that deleting Chip clears the input value
test('deleting the Chip resets value', () => {

  let onChangeEvent;

  const testInstance = render(createLookup("msb999", (event) => {onChangeEvent = event}), {
    store: createMockStore({
      lookupApi: {
        ...DEFAULT_INITIAL_STATE.lookupApi,
        peopleByCrsid: Map([["msb999", PERSON_FIXTURE]])
      }
    })
  });

  testInstance.findByType(Chip).props.onDelete();

  expect(onChangeEvent).toEqual({target: {name: 'owner', value: null}});
});

// test a people list request is invoked when search text is typed
test('a people list request is invoked when search text is typed', async () => {

  const store = createMockStore();
  const testInstance = render(createLookup(null), {store});

  testInstance.findByType(Autosuggest).props.inputProps.onChange({}, { newValue: 'msb999' });

  await condition(() => store.getActions().find(action => action.type === PEOPLE_LIST_REQUEST));
  const action = store.getActions().find(action => action.type === PEOPLE_LIST_REQUEST);
  expect(action.meta.query).toEqual('msb999');
});
