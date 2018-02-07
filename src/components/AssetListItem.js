import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { confirmDelete } from '../redux/actions/deleteConfirmation';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickIcon from 'material-ui/svg-icons/action/done';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const AssetListItem = ({confirmDelete, asset}) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to={'/asset/' + asset.id}>
      {asset.name ? asset.name : asset.id}
    </Link></TableRowColumn>
    <TableRowColumn>{asset.is_complete ? 'Complete' : 'In Progress'}</TableRowColumn>
    <TableRowColumn>{asset.department}</TableRowColumn>
    <TableRowColumn>{asset.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{asset.updated_at}</TableRowColumn>
    <TableRowColumn>
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Delete" onClick={() => confirmDelete(asset.url)} />
      </IconMenu>
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

const mapStateToProps = ({ assets: { assetsByUrl } }, { assetUrl }) => ({
  asset: assetsByUrl.has(assetUrl) ? assetsByUrl.get(assetUrl).asset : null,
});

const mapDispatchToProps = { confirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(AssetListItem);
