import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import AssetTableHeader from './AssetTableHeader';
import AssetTableBody from './AssetTableBody';

const styles = theme => ({
  assetTableContainer: {
    padding: [[theme.spacing.unit * 2, theme.spacing.unit * 7]]
  },
  assetTable: {
    overflow: 'auto',
    borderCollapse: 'inherit',
    tableLayout: 'fixed',
  },
});

/**
 * A table of assets.
 */
export const AssetTable = ({ classes }) => (
  <div className={classes.assetTableContainer}>
    <Table className={classes.assetTable}>
      <AssetTableHeader />
      <AssetTableBody />
    </Table>
  </div>
);

AssetTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AssetTable);
