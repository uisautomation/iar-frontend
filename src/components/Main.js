import React from 'react';
import { Link } from 'react-router-dom'
import {
  AppBar,
  RaisedButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import '../style/App.css';

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/edited': 'Assets: Edited recently',
  '/assets/all': 'Assets: All',
};

const Main = ({ match }) => (
  <div>
    <div className="App-header">
      <AppBar title={TITLES[match.url]} iconElementRight={
        <RaisedButton>
          <Link className='App-raised-button-link' to="/asset/create">Create Asset</Link>
        </RaisedButton>
      } />
    </div>
    <div className="App-main">
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Department</TableHeaderColumn>
            <TableHeaderColumn>Last edited</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>
              <Link to="/asset/6477365c-ff58-11e7-8be5-0ed5f89f718b">
                HR Records - Staff and Salaries
              </Link>
            </TableRowColumn>
            <TableRowColumn>In-progress</TableRowColumn>
            <TableRowColumn>University Information Services (UIS)</TableRowColumn>
            <TableRowColumn>11/01/2018</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>
              <Link to="/asset/8f35d858-ff58-11e7-8be5-0ed5f89f718b">
                User behaviour for Research Dashboard
              </Link>
            </TableRowColumn>
            <TableRowColumn>Complete</TableRowColumn>
            <TableRowColumn>University Information Services (UIS)</TableRowColumn>
            <TableRowColumn>11/01/2018</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

export default Main;
