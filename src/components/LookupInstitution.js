import React from 'react';
import { connect } from 'react-redux';

/**
 * A component which renders a Lookup institution given the institution id.
 *
 * Props:
 *
 *  * component: a node, defaults to 'span'. The underlying component used to render this
 *    component. If will be given a single text child which is the institution name or id.
 *  * componentProps: props to pass to the component
 *  * instid: Lookup inst id to render.
 */
const LookupInstitution = ({
  component: Component = 'span', componentProps = {}, institution, instid
}) => (
  <Component {...componentProps}>{ institution ? institution.name : instid }</Component>
);

const mapStateToProps = ({ lookupApi: { institutions }}, { instid }) => ({
  institution: institutions.byInstid.get(instid),
});

export default connect(mapStateToProps)(LookupInstitution);
