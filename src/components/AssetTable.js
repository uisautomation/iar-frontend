import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import AssetListItem from './AssetListItem';

/**
 * A table of assets.
 */
const AssetTable = ({ assetSummaries }) => (
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
        { assetSummaries.map(({ url }) => <AssetListItem key={url} assetUrl={url} />) }
      </TableBody>
    </Table>
  </div>
);

AssetTable.propTypes = {
  assetSummaries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Export unconnected version of component to ease testing
export const UnconnectedAssetTable = AssetTable;

const mapStateToProps = ({ assets }) => ({ assetSummaries: assets.summaries });

export default connect(mapStateToProps)(AssetTable);
