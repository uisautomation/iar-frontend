import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AssetListItem from './AssetListItem';

/**
 * A table of assets.
 */
export const AssetTable = ({ assetSummaries, isLoadingAssets = false }) => (
  <div className="Asset-table">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Private</TableCell>
          <TableCell>Last edited</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="Asset-table-body">
        {
          // Display a "no assets" row if there is no loading happening and there are no assets.
          ((assetSummaries.length === 0) && !isLoadingAssets) ? <ZeroAssetsRow /> : null
        }
        { assetSummaries.map(({ url }) => <AssetListItem key={url} assetUrl={url} />) }
      </TableBody>
    </Table>
  </div>
);

AssetTable.propTypes = {
  assetSummaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoadingAssets: PropTypes.bool,
};

/**
 * Table row which is displayed when there are no assets in the current list.
 */
export const ZeroAssetsRow = () => (
  <TableRow>
    <TableCell colSpan={6} style={{textAlign: 'center'}}>
      There are no assets to display
    </TableCell>
  </TableRow>
);

// Export unconnected version of component to ease testing
export const UnconnectedAssetTable = AssetTable;

const mapStateToProps = ({
  assets: { summaries: assetSummaries, isLoading: isLoadingAssets }
}) => ({
  assetSummaries, isLoadingAssets
});

export default connect(mapStateToProps)(AssetTable);
