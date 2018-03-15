import React, { Component } from 'react';

/**
 * A higher order component which adds basic Segment page tracking to a component once mounted.
 */
const withPageTracking = (WrappedComponent, pageTitle) => {
  return class NewComponent extends Component {

    componentDidMount = () => {
      // Analytics is added to the window object in index.html
      // A custom page title can be used if the route isn't obvious:
      // for example if a route has different content depending on the user's login state, this can be used to distinguish the two.
      if (window.analytics && window.analytics.page) { window.analytics.page(pageTitle); }
    }

    render = () => <WrappedComponent {...this.props} />
  }
};

export default withPageTracking;