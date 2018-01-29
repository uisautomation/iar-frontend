import React from 'react';
import { Route, Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import { AssetListHeader } from '../components'

const TITLES = {
  '/assets/dept': 'Assets: My department',
  '/assets/edited': 'Assets: Edited recently',
  '/assets/all': 'Assets: All',
};

/*
  Renders the list view of Assets - different filters can be applied to this view.
  */
const AssetList = ({ match }) => (
  <div>
    <AssetListHeader title={TITLES[match.url]} />
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
              <Link to="/asset/113e7968-c239-4efb-82cd-c7276e425e66">
                HR Records - Staff and Salaries
              </Link>
            </TableRowColumn>
            <TableRowColumn>In-progress</TableRowColumn>
            <TableRowColumn>University Information Services (UIS)</TableRowColumn>
            <TableRowColumn>11/01/2018</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>
              <Link to="/asset/272e1a57-3a9a-4970-9d53-87cc4fac98c6">
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

const RoutedAssetList = () => (
  <Route path="/assets/:filter" component={AssetList}/>
);

export default RoutedAssetList;
