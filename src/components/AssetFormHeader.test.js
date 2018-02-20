import React from 'react';
import {render, createMockStore, DEFAULT_INITIAL_STATE} from '../testutils';
import {Typography, Button} from "material-ui";
import AssetFormHeader from "./AssetFormHeader";

const ASSET_FIXTURE = {name: 'An asset', department: 'UIS'};

const HEADER_WITH_ASSET = <AssetFormHeader asset={ASSET_FIXTURE} onClick={() => {}}/>;

test('"create new asset" header is created with correct title and buttons', () => {

  const store = createMockStore();

  const testInstance = render(<AssetFormHeader onClick={() => {}}/>, { store, url: '/' });

  expect(testInstance.findByType(Typography).props.children).toBe('Create new asset');
  const buttons = testInstance.findAllByType(Button);
  expect(buttons).toHaveLength(2);
  expect(buttons[0].props.children).toBe('Cancel');
  expect(buttons[1].props.children).toBe('Save');
});

test('"view asset" header is created with correct title and buttons', () => {

  const testInstance = render(HEADER_WITH_ASSET, { store: createMockStore(), url: '/' });

  expect(testInstance.findByType(Typography).props.children).toBe('Viewing: An asset');
  expect(testInstance.findByType(Button).props.children).toBe('Back');
});

test('"edit asset" header is created with correct title and buttons', () => {

  const store = createMockStore({...DEFAULT_INITIAL_STATE, lookupApi: {
      ...DEFAULT_INITIAL_STATE.lookupApi,
      self: {
      institutions: [
        {instid: 'UIS', name: 'University Information Services'}
      ]
    }
  }});

  const testInstance = render(HEADER_WITH_ASSET, { store, url: '/' });

  expect(testInstance.findByType(Typography).props.children).toBe('Editing: An asset');
  const buttons = testInstance.findAllByType(Button);
  expect(buttons).toHaveLength(2);
  expect(buttons[0].props.children).toBe('Cancel');
  expect(buttons[1].props.children).toBe('Save');
});
