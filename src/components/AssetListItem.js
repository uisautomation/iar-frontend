import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { confirmDelete } from '../redux/actions/deleteConfirmation';

import {TableRow, TableCell} from 'material-ui/Table';
import MoreVertIcon from 'material-ui-icons/MoreVert';
// import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';
import Tooltip from 'material-ui/Tooltip';
import Menu, { MenuItem } from 'material-ui/Menu';
import { FormattedRelative, FormattedDate, FormattedTime } from 'react-intl';
import AssetStatus from './AssetStatus';

const PrivateIcon = ({ isPrivate }) => {
  // this has three return values since "isPrivate" may be null/not a Boolean
  if(isPrivate === true) { return <Tooltip title='Private'><VisibilityOffIcon /></Tooltip>; }
  if(isPrivate === false) { return <Tooltip title='Not Private'><VisibilityIcon /></Tooltip>; }
  return null;
}

class MoreMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      isPrivate = false,
      onEdit = () => null,
      onTogglePrivacy = () => null,
      onDelete = () => null,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={() => { onEdit(); this.handleClose(); }}>
            Edit
          </MenuItem>
          <MenuItem onClick={() => { onTogglePrivacy(); this.handleClose(); }}>
            Make {isPrivate ? 'Public' : 'Private'}
          </MenuItem>
          <MenuItem onClick={() => { onDelete(); this.handleClose(); }}>
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }
};

MoreMenu.propTypes = {
  isPrivate: PropTypes.bool,
  onEdit: PropTypes.func,
  onTogglePrivacy: PropTypes.func,
  onDelete: PropTypes.func,
};

const AssetListItem = ({confirmDelete, asset, history}) => {
  // parse "update at" date
  const updatedAt = new Date(asset.updated_at);

  const editAsset = () => {
    if(asset && asset.id && history) {
      history.push('/asset/' + asset.id);
    }
  };

  const EditCell = ({ children }) => <TableCell onClick={editAsset}>{ children }</TableCell>;

  return (
    <TableRow>
      <EditCell>{asset.name ? asset.name : asset.id}</EditCell>
      <EditCell>
        {asset.is_complete !== null ? <AssetStatus isComplete={asset.is_complete} /> : null}
      </EditCell>
      <EditCell>{asset.department}</EditCell>
      <EditCell><PrivateIcon isPrivate={asset.private} /></EditCell>
      <EditCell>
        <Tooltip
          title={<div>
            <FormattedDate value={updatedAt} />, <FormattedTime value={updatedAt} />
          </div>}
        >
          <span><FormattedRelative value={updatedAt} /></span>
        </Tooltip>
      </EditCell>
      <TableCell><MoreMenu
        isPrivate={asset.private}
        onEdit={editAsset}
        onDelete={() => confirmDelete(asset.url)}
      /></TableCell>
    </TableRow>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssetListItem));
