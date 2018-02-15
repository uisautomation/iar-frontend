import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import { TextField } from 'material-ui';

/**
 * A higher-order component wrapping TextField from material-ui which has the form of a select box
 * populated with lookup institutions. The value is the instid of the institution.
 *
 * If allowNone is true, a "None" option is added corresponding to the empty value.
 *
 * Allowable instids are passed as an array to the instids prop.
 *
 * Unrecognised props are broadcast down to the underlying TextField component.
 */
const InstitutionField = ({ institutionValuesAndLabels, allowNone = false, ...rest }) => (
  <TextField select {...rest}>
  {
    [
      ...(allowNone ? [<MenuItem value="">None</MenuItem>] : []),
      ...institutionValuesAndLabels.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>{ label }</MenuItem>
      ))
    ]
  }
  </TextField>
);

InstitutionField.propTypes = {
  institutionValuesAndLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
  allowNone: PropTypes.bool,
};

// map the instids prop into a list of value/label pairs using byInstid. We don't pass byInstid
// itself because good React practice is to pass a component only the props it needs.
const mapStateToProps = ({ lookupApi: { institutions: { byInstid } } }, { instids }) => ({
  institutionValuesAndLabels: instids.map(instid => ({
    value: instid, label: byInstid.has(instid) ? byInstid.get(instid).name : instid
  })),
});

// we pass a trivial function to the mapDispatchToProps argument so that the dispatch function is
// not implicitly passed to the component and then on to the underlying TextField.
export default connect(mapStateToProps, () => ({}))(InstitutionField);
