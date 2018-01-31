import React from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickIcon from 'material-ui/svg-icons/action/done';

const AssetListItem = (props) => (
  <TableRow hoverable={true}>
    <TableRowColumn>{props.name}</TableRowColumn>
    <TableRowColumn>{props.status}</TableRowColumn>
    <TableRowColumn>{props.department}</TableRowColumn>
    <TableRowColumn>{props.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{props.lastedited}</TableRowColumn>
  </TableRow>
);

export default AssetListItem;
