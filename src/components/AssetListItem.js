import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { assetDelete } from '../redux/actions';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { RaisedButton } from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TickIcon from 'material-ui/svg-icons/action/done';

// Hack id from url
const getAssetIdFrom = (url) => {
  return url.slice(29);
};

const AssetListItem = ({assetDelete, ...props}) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to={getAssetIdFrom(props.url)}>{props.name}</Link></TableRowColumn>
    <TableRowColumn>{props.status}</TableRowColumn>
    <TableRowColumn>{props.department}</TableRowColumn>
    <TableRowColumn>{props.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{props.lastedited}</TableRowColumn>
    <TableRowColumn>
    // TODO: Change RaisedButton into Icon Menu
    <RaisedButton onClick={() => assetDelete(props.url)}>Delete</RaisedButton>
    </TableRowColumn>
  </TableRow>
);

AssetListItem.propTypes = {
  assetDelete: PropTypes.func.isRequired,
};

const mapDispatchToProps = { assetDelete };

export default connect(null, mapDispatchToProps)(AssetListItem);

      {/*<IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="Edit" />
        <MenuItem primaryText="Make Private" />
        <MenuItem primaryText="Delete" onClick={() => assetDelete(props.key)}/>
      </IconMenu>*/}