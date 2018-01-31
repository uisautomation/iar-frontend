import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { assetDelete } from '../redux/actions';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';
import TickIcon from 'material-ui/svg-icons/action/done';

// Hack id from url
const getAssetIdRouteFrom = (url) => {
  const id = url.slice(29);
  return "/asset/" + id;
};

const AssetListItem = ({assetDelete, ...props}) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to={getAssetIdRouteFrom(props.url)}>{props.name}</Link></TableRowColumn>
    <TableRowColumn>{props.status}</TableRowColumn>
    <TableRowColumn>{props.department}</TableRowColumn>
    <TableRowColumn>{props.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{props.lastedited}</TableRowColumn>
    <TableRowColumn>
    <RaisedButton onClick={() => assetDelete(props.url)}>Delete</RaisedButton>
    </TableRowColumn>
  </TableRow>
);

AssetListItem.propTypes = {
  assetDelete: PropTypes.func.isRequired,
};

const mapDispatchToProps = { assetDelete };

export default connect(null, mapDispatchToProps)(AssetListItem);