import React from 'react'
import { Link } from 'react-router-dom'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import TickIcon from 'material-ui/svg-icons/action/done';

const AssetListItem = (props) => (
  <TableRow hoverable={true}>
    <TableRowColumn><Link to="/asset/fc35a1c2-91fb-4e91-922d-9bbb2c539c08/">{props.name}</Link></TableRowColumn>
    <TableRowColumn>{props.status}</TableRowColumn>
    <TableRowColumn>{props.department}</TableRowColumn>
    <TableRowColumn>{props.private ? <TickIcon/> : ""}</TableRowColumn>
    <TableRowColumn>{props.lastedited}</TableRowColumn>
  </TableRow>
);

export default AssetListItem;
