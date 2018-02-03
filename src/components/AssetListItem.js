import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { confirmDelete } from '../redux/actions/deleteConfirmation';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';
import TickIcon from 'material-ui/svg-icons/action/done';

const AssetListItem = ({confirmDelete, asset}) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to={'/asset/' + asset.id}>{asset.name}</Link></TableRowColumn>
    <TableRowColumn>{asset.is_complete ? 'Complete' : 'In Progress'}</TableRowColumn>
    <TableRowColumn>{asset.department}</TableRowColumn>
    <TableRowColumn>{asset.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{asset.updated_at}</TableRowColumn>
    <TableRowColumn>
      <RaisedButton onClick={() => confirmDelete(asset.url)}>Delete</RaisedButton>
    </TableRowColumn>
  </TableRow>
);

AssetListItem.propTypes = {
  asset: PropTypes.object.isRequired,
  assetUrl: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

// Export unconnected version of component to aid testing.
export const UnconnectedAssetListItem = AssetListItem;

const mapStateToProps = ({ assets }, { assetUrl }) => ({
  asset: assets.assetsByUrl.get(assetUrl)
});

const mapDispatchToProps = { confirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(AssetListItem);
