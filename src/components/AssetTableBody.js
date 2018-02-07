import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import AssetListItem from './AssetListItem';

/**
 * A table of assets.
 */
export const AssetTableBody = ({ summaries, isLoading = false }) => (
  <TableBody className="Asset-table-body">
    {
      // Display a "no assets" row if there is no loading happening and there are no assets.
      ((summaries.length === 0) && !isLoading) ? <ZeroAssetsRow /> : null
    }
    { summaries.map(({ url }) => <AssetListItem key={url} assetUrl={url} />) }
  </TableBody>
);

AssetTableBody.propTypes = {
  summaries: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
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
export const UnconnectedAssetTableBody = AssetTableBody;

const mapStateToProps = ({ assets: { summaries, isLoading } }) => ({
  summaries, isLoading
});

export default connect(mapStateToProps)(AssetTableBody);

