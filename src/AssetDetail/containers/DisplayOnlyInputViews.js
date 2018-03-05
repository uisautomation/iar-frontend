import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPeople } from '../../redux/actions/lookupApi';

import DisplayOnlyInput from '../presentational/DisplayOnlyInput';

/**
 * A DisplayOnlyInput which maps the value field into a Lookup institution name.
 */
export const DisplayOnlyLookupInput = connect(
  ({ lookupApi: { institutions: { byInstid } } }, { value }) => ({
    value: byInstid.has(value) ? (byInstid.get(value).name || value) : value
  }), () => ({ })
)(DisplayOnlyInput);

/**
 * A DisplayOnlyInput which maps the value field into a person's name.
 */
class UnconnectedDisplayOnlyPersonInput extends Component {
  componentDidMount() {
    // On mount, kick off a request for the person. It's safe to do this multiple times since the
    // cache will just be freshened if the person is already there.
    const { identifier, getPeople } = this.props;
    getPeople(identifier);
  }

  render() {
    // filter any props we understand and pass the rest to DisplayOnlyInput
    const { identifier, getPeople, ...rest } = this.props;
    return <DisplayOnlyInput {...rest} />;
  }
}

UnconnectedDisplayOnlyPersonInput.propTypes = {
  getPeople: PropTypes.func.isRequired,
  identifier: PropTypes.string.isRequired,
}

export const DisplayOnlyPersonInput = connect(
  ({ lookupApi: { peopleByCrsid } }, { value }) => ({
    // map incoming value prop through peopleByCrsid
    value: peopleByCrsid.has(value) ? `${peopleByCrsid.get(value).displayName} (${value})` : value,

    // make original value field available as identifier prop
    identifier: value
  }),
  { getPeople }
)(UnconnectedDisplayOnlyPersonInput);
