import React from 'react'; // used implicitly by JSX
import Table from 'material-ui/Table';
import AssetTableHeader from './AssetTableHeader';
import AssetTableBody from './AssetTableBody';

/**
 * A table of assets.
 */
export const AssetTable = () => (
  <div className="Asset-table">
    <Table>
      <AssetTableHeader />
      <AssetTableBody />
    </Table>
  </div>
);

export default AssetTable;
