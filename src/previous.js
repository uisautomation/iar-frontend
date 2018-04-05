/**
 * This function navigates to a location stored in the 'previous' query param or the
 * "All institutions" asset list, if there is none.
 *
 * @param push history.push()
 * @param search location.search
 */
export const navigate = ({ push }, { search }) => {
  const previous = (new window.URLSearchParams(search)).get('previous');
  push(previous ? previous : '/assets');
};

/**
 * If there is a department, then this function adds a 'previous' query param to the given url
 * of the department's assert list url.
 *
 * @param pathname pathname to modify
 * @param department INSTID of department or null.
 * @returns {*} modified url
 */
export const encode_search = (pathname, department) => {
  if (department) {
    const url = new window.URL(pathname, 'http://invalid');

    const params = new window.URLSearchParams(url.search);
    params.append('previous', encodeURI('/assets/' + department));
    return url.pathname + '?' + params.toString();
  }
  return pathname;
};
