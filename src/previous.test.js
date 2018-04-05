import React from 'react';
import { encode_search, navigate } from "./previous";

// polyfill URLSearchParams & URL for the test suite
if (!window.URLSearchParams) {
  const url = require('url');
  window.URLSearchParams = url.URLSearchParams;
  window.URL = url.URL;
}

test('encode_search behaves as expected', () => {
  const url_fixture = "/asset/a8b19985-99b2-4aad-ab4e-194b894905c2/edit";

  // url is untouched
  expect(encode_search(url_fixture, null)).toEqual(url_fixture);

  // url has previous param added
  expect(encode_search(url_fixture, 'UIS')).toEqual(url_fixture + "?previous=%2Fassets%2FUIS");

  // correct search delimiter is used
  expect(encode_search(url_fixture + "?x=1", 'UIS'))
    .toEqual(url_fixture + "?x=1&previous=%2Fassets%2FUIS");
});

test('navigate behaves as expected', () => {

  const push = jest.fn();

  // the 'previous' url is navigated to
  navigate({push}, {search: '?previous=%2Fassets%2FUIS'});
  expect(push).toHaveBeenCalledWith('/assets/UIS');

  // the "All institutions" asset list is navigated to by default
  navigate({push}, {search: '?'});
  expect(push).toHaveBeenCalledWith('/assets');
});
