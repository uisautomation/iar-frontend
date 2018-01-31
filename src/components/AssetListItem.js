import React from 'react'
import { Link } from 'react-router-dom'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickIcon from 'material-ui/svg-icons/action/done';

const AssetListItem = (props) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to="/asset/8722783d-23cc-4130-a0ab-9cc510e4feb7/">{props.name}</Link></TableRowColumn>
    <TableRowColumn>{props.status}</TableRowColumn>
    <TableRowColumn>{props.department}</TableRowColumn>
    <TableRowColumn>{props.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{props.lastedited}</TableRowColumn>
  </TableRow>
);

export default AssetListItem;
