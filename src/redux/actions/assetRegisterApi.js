import { RSAA } from 'redux-api-middleware';

const ASSETS_URL = process.env.REACT_APP_ENDPOINT_ASSETS;

export const ASSETS_LIST_REQUEST = Symbol('ASSETS_LIST_REQUEST');
export const ASSETS_LIST_SUCCESS = Symbol('ASSETS_LIST_SUCCESS');
export const ASSETS_LIST_FAILURE = Symbol('ASSETS_LIST_FAILURE');
export const ASSETS_LIST_RESET = Symbol('ASSETS_LIST_RESET');

export const ASSETS_DELETE_SUCCESS = Symbol('ASSETS_DELETE_SUCCESS');
export const ASSETS_DELETE_REQUEST = Symbol('ASSETS_DELETE_REQUEST');
export const ASSETS_DELETE_FAILURE = Symbol('ASSETS_DELETE_FAILURE');

export const ASSET_GET_REQUEST = Symbol('ASSET_GET_REQUEST');
export const ASSET_GET_SUCCESS = Symbol('ASSET_GET_SUCCESS');
export const ASSET_GET_FAILURE = Symbol('ASSET_GET_FAILURE');

export const ASSET_PUT_REQUEST = Symbol('ASSET_PUT_REQUEST');
export const ASSET_PUT_SUCCESS = Symbol('ASSET_PUT_SUCCESS');
export const ASSET_PUT_FAILURE = Symbol('ASSET_PUT_FAILURE');

export const ASSET_POST_REQUEST = Symbol('ASSET_POST_REQUEST');
export const ASSET_POST_SUCCESS = Symbol('ASSET_POST_SUCCESS');
export const ASSET_POST_FAILURE = Symbol('ASSET_POST_FAILURE');

// Shared fields between FILTER_FIELDS and SORT_FIELDS.
const COMMON_FIELDS = [
  'id', 'name', 'department', 'purpose', 'owner', 'private', 'research', 'personal_data',
  'data_subject', 'data_category', 'recipients_category', 'recipients_outside_eea', 'retention',
  'risk_type', 'storage_location', 'storage_format', 'paper_storage_security', 'is_complete',
  'digital_storage_security',
];

// Set of fields which can be used as a filter
export const FILTER_FIELDS = new Set(COMMON_FIELDS);

// Set of fields which can be used for sorting
export const SORT_FIELDS = new Set([...COMMON_FIELDS, 'created_at', 'updated_at']);

export const Direction = Object.freeze({
  ascending: Symbol('ascending'), descending: Symbol('descending')
});

/**
 * Fetch a new set of assets. Optionally passed an object containing the following properties:
 *
 * sort: (optional) object with following structure:
 *
 *  { field, direction }
 *
 *    field: (optional) String giving the field name which should be used for ordering the returned
 *      results. By default the results are ordered by created_at. Must be one of the strings in
 *      SORT_FIELDS. If sortBy is not in SORT_FIELDS, this is ignored. Default: created_at.
 *
 *    direction: (optional) One of Direction.ascending or Direction.descending depending on what
 *      order the sorted results should be returned in. Invalid values are ignored. Default:
 *      Direction.descending.
 *
 * search: (optional) String which should be matched against all asset fields.
 *
 * filter: (optional) Object whose properties specify filters. Only the properties in FILTER_FIELDS
 *   are looked at. Other properties are ignored.
 *
 */
export const getAssets = (unsanitisedQuery = {}) => {
  // Unpick values from the function input to sanitise input.
  let {
    search, filter,
    sort: { field: sortBy = 'created_at', direction = Direction.descending } = { }
  } = unsanitisedQuery;

  // Array of [key, value] pairs which are built into the query string.
  const queryParts = [];

  // Object representing this query in the state.
  const query = { sort: { field: null, direction: null }, filter: { }, search: null };

  // Add in search query
  if(search) { queryParts.push(['search', search]); query.search = search; }

  // If direction is not one of the expected values, it defaults to descending
  switch(direction) {
    case Direction.ascending:
    case Direction.descending:
      break;
    default:
      direction = Direction.descending;
  }

  // Add in sort by field
  if(SORT_FIELDS.has(sortBy)) {
    query.sort = { field: sortBy, direction: direction };
    queryParts.push(['ordering', ((direction === Direction.descending) ? '-' : '') + sortBy]);
  }

  // Add in filter fields.
  if(filter) {
    Object.getOwnPropertyNames(filter)
      .filter(propName => FILTER_FIELDS.has(propName))
      .forEach(propName => {
        queryParts.push([propName, filter[propName]]);
        query.filter[propName] = filter[propName];
      });
  }

  // Build the URL
  const url = ASSETS_URL + (
    (queryParts.length > 0)
    ? ('?' + queryParts.map(([key, value]) => key + '=' + encodeURIComponent(value)).join('&'))
    : ''
  );

  return {
    [RSAA]: {
      endpoint: url,
      method: 'GET',
      types: [
        { type: ASSETS_LIST_REQUEST, meta: { url, query } },
        { type: ASSETS_LIST_SUCCESS, meta: { url, query } },
        { type: ASSETS_LIST_FAILURE, meta: { url, query } },
      ],
    }
  };
};

/**
 * Request more assets from the API. If URL corresponds to the "next" or "previous" URLs, the list
 * of assets and asset summaries are exteded, otherwise they are replaced.
 */
export const getMoreAssets = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    types: [
      { type: ASSETS_LIST_REQUEST, meta: { url } },
      { type: ASSETS_LIST_SUCCESS, meta: { url } },
      { type: ASSETS_LIST_FAILURE, meta: { url } },
    ],
  }
});

/**
 * Reset the asset list to the initial "unfetched" state.
 *
 * The current query state is not changed. The effect of this action is performed whenever an asset
 * is modified or created via putAsset or postAsset so there's no need to fire this action if
 * modifying assets.
 */
export const resetAssets = () => ({
  type: ASSETS_LIST_RESET,
});

/**
 * Delete an asset.
 */
export const deleteAsset = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'DELETE',
    types: [
      { type: ASSETS_DELETE_REQUEST, meta: { url } },
      { type: ASSETS_DELETE_SUCCESS, meta: { url } },
      { type: ASSETS_DELETE_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Request an individual asset by URL.
 */
export const getAsset = (url) => ({
  [RSAA]: {
    endpoint: url,
    method: 'GET',
    types: [
      { type: ASSET_GET_REQUEST, meta: { url } },
      { type: ASSET_GET_SUCCESS, meta: { url } },
      { type: ASSET_GET_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Update an asset. Takes an asset resource object.
 */
export const putAsset = (url, asset) => ({
  [RSAA]: {
    endpoint: url,
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(asset),
    types: [
      { type: ASSET_PUT_REQUEST, meta: { url, asset } },
        // body added for testing TODO: find a better way of checking body
      { type: ASSET_PUT_SUCCESS, meta: { url } },
      { type: ASSET_PUT_FAILURE, meta: { url } },
    ]
  }
});

/**
 * Create an asset. Takes an asset resource object.
 */
export const postAsset = (asset) => ({
  [RSAA]: {
    endpoint: ASSETS_URL,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(asset),
    types: [
      { type: ASSET_POST_REQUEST, meta: { url: ASSETS_URL , asset } },
        // body added for testing TODO: find a better way of checking body
      { type: ASSET_POST_SUCCESS, meta: { url: ASSETS_URL } },
      { type: ASSET_POST_FAILURE, meta: { url: ASSETS_URL } },
    ]
  }
});
