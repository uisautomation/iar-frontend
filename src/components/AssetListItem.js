import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { confirmDelete } from '../redux/actions/deleteConfirmation';

import {TableRow, TableCell} from 'material-ui/Table';
import TickIcon from 'material-ui-icons/Done';
import Button from 'material-ui/Button';

const AssetListItem = ({confirmDelete, asset}) => (
  <TableRow>
    <TableCell><Link to={'/asset/' + asset.id}>
      {asset.name ? asset.name : asset.id}
    </Link></TableCell>
    <TableCell>{asset.is_complete ? 'Complete' : 'In Progress'}</TableCell>
    <TableCell>{asset.department}</TableCell>
    <TableCell>{asset.private ? <TickIcon/> : ""}</TableCell>
    <TableCell>{asset.updated_at}</TableCell>
    <TableCell>
      <Button onClick={() => confirmDelete(asset.url)}>Delete</Button>
    </TableCell>
  </TableRow>
);

AssetListItem.propTypes = {
  asset: PropTypes.object.isRequired,
  assetUrl: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

// Export unconnected version of component to aid testing.
export const UnconnectedAssetListItem = AssetListItem;

const mapStateToProps = ({ assets: { assetsByUrl } }, { assetUrl }) => ({
  asset: assetsByUrl.has(assetUrl) ? assetsByUrl.get(assetUrl).asset : null,
});

const mapDispatchToProps = { confirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(AssetListItem);
