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
import LookupInstitution from './LookupInstitution';
import { withStyles } from 'material-ui/styles';

const privateIconStyles = theme => ({
  privateIcon: {color: theme.customColors.mediumGrey}
});

const PrivateIcon = withStyles(privateIconStyles)(({ isPrivate, classes }) => {
  // this has three return values since "isPrivate" may be null/not a Boolean
  if(isPrivate === true) { return <span className={classes.privateIcon}><Tooltip title='Private' ><VisibilityOffIcon /></Tooltip></span>; }
  if(isPrivate === false) { return <span className={classes.privateIcon}><Tooltip title='Public'><VisibilityIcon /></Tooltip></span>; }
  return null;
})


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
      onEdit = () => null,
      onDelete = () => null,
      canDelete,
      canEdit,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {
            canEdit ?
              <MenuItem onClick={() => { onEdit(); this.handleClose(); }}>
                Edit
              </MenuItem> : null
          }
          {
            canDelete ?
              <MenuItem onClick={() => { onDelete(); this.handleClose(); }}>
                Delete
              </MenuItem> : null
          }
        </Menu>
      </div>
    );
  }
};

MoreMenu.propTypes = {
  isPrivate: PropTypes.bool,
  canDelete: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

const assetListItemStyles = theme => ({
  entryRow: {
    '&:hover td': {cursor: 'pointer', backgroundColor: theme.customColors.assetTableHover}
  }
});

const AssetListItem = withStyles(assetListItemStyles)((
  {confirmDelete, asset, history, classes}
) => {
  if(!asset) { return null; }

  // parse "update at" date
  const updatedAt = new Date(asset.updated_at);

  const editAsset = () => {
    if(asset && asset.id && history) {
      const canEdit = asset.allowed_methods && (asset.allowed_methods.indexOf('PUT') !== -1)
      history.push('/asset/' + asset.id + (canEdit ? '/edit' : ''));
    }
  };

  const EditCell = ({ children }) => <TableCell onClick={editAsset}>{ children }</TableCell>;

  const canDelete =
    Boolean(asset.allowed_methods) && (asset.allowed_methods.indexOf('DELETE') !== -1);
  const canEdit =
    Boolean(asset.allowed_methods) && (asset.allowed_methods.indexOf('PUT') !== -1);

  return (
    <TableRow className={classes.entryRow}>
      <EditCell>{asset.name ? asset.name : asset.id}</EditCell>
      <EditCell>
        {asset.is_complete !== null ? <AssetStatus isComplete={asset.is_complete} /> : null}
      </EditCell>
      <EditCell><LookupInstitution instid={asset.department} /></EditCell>
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
      <TableCell>{
        // if we cannot edit or delete the asset, there is no point in showing the menu
        (canDelete || canEdit) ?
          <MoreMenu
            isPrivate={asset.private}
            canDelete={canDelete}
            canEdit={canEdit}
            onEdit={editAsset}
            onDelete={() => confirmDelete(asset.url)}
          /> : null
      }</TableCell>
    </TableRow>
  );
});

AssetListItem.propTypes = {
  asset: PropTypes.object,
  assetUrl: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

// Export unconnected version of component to aid testing.
export const UnconnectedAssetListItem = AssetListItem;

const mapStateToProps = (state, { assetUrl }) => {
  const { assets: { assetsByUrl } } = state;
  return ({
    asset: assetsByUrl.has(assetUrl) ? assetsByUrl.get(assetUrl).asset : null,
  });
};

const mapDispatchToProps = { confirmDelete };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AssetListItem));
