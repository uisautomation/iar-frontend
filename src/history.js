import createBrowserHistory from 'history/createBrowserHistory'

// Explicitly create the browser history for injection into the router.
// This allows us to easily access the history in non-component modules.
export default createBrowserHistory();
