import React, { Component } from 'react'
import getDisplayName from 'react-display-name';

/**
 * A higher order component which subscribes to scroll events on the current window. Takes a single
 * function, mapScrollToProps, which is passed the scroll events as they arrive and returns an
 * object of props to set on the wrapped component.
 *
 * Example of use:
 *
 * const mapScrollToProps = ({ pageY }) => ({ hasScrolled: pageY > 0 });
 *
 * const SensitiveWidget = withScroll(mapScrollToProps)(
 *   ({ hasScrolled }) => <span>has scrolled: { hasScrolled ? 'yes' : 'no' }</span>
 * )
 */
const withScroll = mapScrollToProps => WrappedComponent => {
  class NewComponent extends Component {
    state = { mappedScrollProps: { } }

    componentDidMount = () => {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = scroll => this.setState({ mappedScrollProps: mapScrollToProps(scroll) });

    render = () => <WrappedComponent {...this.props} {...this.state.mappedScrollProps} />
  }

  NewComponent.displayName = `withScroll(${getDisplayName(WrappedComponent)})`;

  return NewComponent;
};

export default withScroll;
