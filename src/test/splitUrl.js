// utility function which takes a URL, splits the query string and returns the base URL and query
// string split at '&' characters into an array of 'xxx=yyy' strings. This is not a full URL parser
// but is good enough for our needs. Returns an object of the form { baseUrl, queryItems }. If
// there is no query string, queryItems is null.
export default url => {
  const [ baseUrl, queryString ] = url.split('?', 2);
  const queryItems = (queryString !== undefined) ? queryString.split('&') : null;
  return { baseUrl, queryItems };
};
