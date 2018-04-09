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
    transition: [
      theme.transitions.create('opacity'),
    ],

    // IE11 does not correctly render opacity transitions as it does not apply the opacity to the
    // td:after pseudo-element(!) Rather than re-work the entire CSS trickery required to get a box
    // shadow on the table, just deny IE11 users the eye-candy of a fading table body.
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      transition: '',
    },

    '& td': {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
    },
    '& td:after': {
      content: "''",
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
      boxShadow: theme.shadows[1],
    },
  },

  replacing: {
    opacity: 0,
  },

  notReplacing: {
    opacity: 1,
  },
});

/**
 * A table of assets.
 */
export const UnconnectedAssetTableBody = ({
  summaries, isLoading = false, isReplacing = false, classes
}) => (
  <TableBody className={
    [
      classes.assetTableBody,
      isReplacing ? classes.replacing : classes.notReplacing,
    ].join(' ')
  }>
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
  isReplacing: PropTypes.bool,
};

/**
 * Table row which is displayed when there are no assets in the current list.
 */
export const ZeroAssetsRow = () => (
  <TableRow>
    <TableCell colSpan={6} style={{textAlign: 'center'}}>
      There are no asset entries to display for this institution
    </TableCell>
  </TableRow>
);

const mapStateToProps = ({ assets: { summaries, isLoading, isExtendingSummaries } }) => ({
  summaries, isLoading,
  // a flag which indicates if there is a request in flight which will *replace* rather than extend
  // the current list of asset entries
  isReplacing: isLoading && !isExtendingSummaries
});

export default connect(mapStateToProps)(withStyles(styles)(UnconnectedAssetTableBody));
