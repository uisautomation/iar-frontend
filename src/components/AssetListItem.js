import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deleteAsset } from '../redux/actions';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';
import TickIcon from 'material-ui/svg-icons/action/done';

const AssetListItem = ({deleteAsset, asset, ...props}) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to={'/asset/' + asset.id}>{asset.name}</Link></TableRowColumn>
    <TableRowColumn>{asset.status}</TableRowColumn>
    <TableRowColumn>{asset.department}</TableRowColumn>
    <TableRowColumn>{asset.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{asset.updated_at}</TableRowColumn>
    <TableRowColumn>
      <RaisedButton onClick={() => deleteAsset(asset.id)}>Delete</RaisedButton>
    </TableRowColumn>
  </TableRow>
);

AssetListItem.propTypes = {
  asset: PropTypes.object.isRequired,
  deleteAsset: PropTypes.func.isRequired,
};

const mapDispatchToProps = { deleteAsset };

export default connect(null, mapDispatchToProps)(AssetListItem);
