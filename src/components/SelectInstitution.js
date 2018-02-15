import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

/**
 * A variant of Select from material-ui which is populated with lookup institutions. The value is
 * the instid of the institution.
 *
 * Allowable instids are passed as an array to the instids prop.
 *
 * Unrecognised props are broadcast down to the underlying Select component.
 */
const SelectInstitution = ({ instids, byInstid, dispatch, ...rest }) => (
  <Select {...rest}>
  {
    instids.map((instid, index) => (
      <MenuItem key={index} value={instid}>
        { byInstid.has(instid) ? byInstid.get(instid).name : instid }
      </MenuItem>
    ))
  }
  </Select>
);

SelectInstitution.propTypes = {
  ...Select.propTypes,
  instids: PropTypes.arrayOf(PropTypes.string).isRequired,
  byInstid: PropTypes.object.isRequired,
};

const mapStateToProps = ({ lookupApi: { institutions: { byInstid } } }) => ({ byInstid });

export default connect(mapStateToProps)(SelectInstitution);
