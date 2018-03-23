import { parse, parseUrl, stringify } from "query-string";

/**
 * This function navigates to a location stored in the 'previous' query param or the
 * "All institutions" asset list, if there is none.
 *
 * @param push history.push()
 * @param search location.search
 */
export const navigate = ({ push }, { search }) => {
  const { previous } = parse(search);
  push(previous ? previous : '/assets');
};

/**
 * If there is a department, then this function adds a 'previous' query param to the given url
 * of the department's assert list url.
 *
 * @param url url to modify
 * @param department INSTID of department or null.
 * @returns {*} modified url
 */
export const encode_search = (url, department) => {
  if (department) {
    const delim = Object.keys(parseUrl(url).query).length === 0 ? '?' : '&';
    const previous = encodeURI('/assets/' + department);
    return url + delim + stringify({previous: previous});
  }
  return url;
};
