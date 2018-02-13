import React from 'react'; // used implicitly by JSX
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import AssetListItem from './AssetListItem';

// There is much discussion here on how to have tbody box-shadows actually appear. This solution is
// horrible but works.
// http://www.css3recipes.com/recipes/4938443/box-shadow-on-tbody-in-chrome
const styles = theme => ({
  assetTableBody: {
    position: 'relative',

    '& td': {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
    },
    '& tr:hover td': {
      backgroundColor: theme.customColors.assetTableHover,
    },
    '& td:after': {
      content: "''",
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
      boxShadow: theme.shadows[2],
    },
  },
});

/**
 * A table of assets.
 */
export const UnconnectedAssetTableBody = ({ summaries, isLoading = false, classes }) => (
  <TableBody className={classes.assetTableBody}>
    {
      // Display a "no assets" row if there is no loading happening and there are no assets.
      ((summaries.length === 0) && !isLoading) ? <ZeroAssetsRow /> : null
    }
    { summaries.map(({ url }) => <AssetListItem key={url} assetUrl={url} />) }
  </TableBody>
);

UnconnectedAssetTableBody.propTypes = {
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

const mapStateToProps = ({ assets: { summaries, isLoading } }) => ({
  summaries, isLoading
});

export default connect(mapStateToProps)(withStyles(styles)(UnconnectedAssetTableBody));
