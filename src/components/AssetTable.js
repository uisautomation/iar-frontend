import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

const AssetTable = ({ children }) => (
  <div className="Asset-table">
    <Table
      fixedHeader={true}
      selectable={false}
    >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
          <TableHeaderColumn>Department</TableHeaderColumn>
          <TableHeaderColumn>Private</TableHeaderColumn>
          <TableHeaderColumn>Last edited</TableHeaderColumn>
          <TableHeaderColumn>&nbsp;</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        showRowHover={true}
        displayRowCheckbox={false}
        className="Asset-table-body"
      >
      { children }
      </TableBody>
    </Table>
  </div>
);

AssetTable.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default AssetTable;
