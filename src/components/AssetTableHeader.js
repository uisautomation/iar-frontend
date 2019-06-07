import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';
import { TableRow, TableCell, TableSortLabel, TableHead } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LoadingIndicator from '../containers/LoadingIndicator';

// A map from sort directions to values for the "direction" prop of TableSortLabel.
const directionDescriptions = new Map([
  [Direction.ascending, 'asc'], [Direction.descending, 'desc']
]);

// Given the current assets list query and the field name corresponding to a column, return the
// query which should be run if that column's header is clicked.
export const getNextQuery = (query, field) => {
  const { sort: { field: sortField, direction } } = query;
  if(sortField !== field) {
    return {...query, sort: { field, direction: Direction.ascending } };
  } else {
    // the current query sorts by this field, change the direction
    const newDirection =
        direction === Direction.ascending ? Direction.descending : Direction.ascending;
    return {...query, sort: { field, direction: newDirection } };
  }
}

/**
 * A table heading cell which shows if the current asset list is sorted by a particular field and,
 * if so, in which direction.
 */
const UnconnectedSortCell = ({ direction, active, label, nextQuery, getAssets, ...rest}) => (
  <TableCell sortDirection={active ? direction : false} {...rest}>
    <TableSortLabel onClick={() => getAssets(nextQuery)} active={active} direction={direction}>
      {label}
    </TableSortLabel>
  </TableCell>
);

// IMPORTANT: Since SortCell makes use of animations via the CSS transition property, we need to
// make sure to give the component as simple props as possible in order to maximise React's
// likelihood of not re-creating the underlying DOM element but simply modifying its content.
//
// The list of props here were empirically determined to be "simple enough" to cause the nice
// animation to show.
//
// This has the nice side-effect that the implementation of the AssetTableHeader component itself
// is entirely stateless.
const mapStateToProps = ({ assets: { query } }, { label, field }) => {
  const { sort } = query;
  const active = sort.field === field;
  const direction = directionDescriptions.get(sort.direction);
  return { direction, active, label, nextQuery: getNextQuery(query, field) };
};

const mapDispatchToProps = { getAssets };

export const SortCell = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSortCell);

SortCell.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

const tooltipTextStyle = {
  label: {
    whiteSpace: 'nowrap',
  },

  icon: {
    fontSize: '0.9rem',
    verticalAlign: 'text-bottom',
    paddingLeft: '1ex',
  },
};

const TooltipText = withStyles(tooltipTextStyle)(({ title, children, classes }) => (
  <Tooltip title={<div style={{width: '16em'}}>{ children }</div>}>
    <div className={classes.label}>
      { title }<HelpOutlineIcon className={classes.icon} />
    </div>
  </Tooltip>
));

/**
 * A component which provides the header row for the asset table. Heading titles can be used to
 * change sort order.
 *
 */
export const AssetTableHeader = ({ classes }) => (
  <TableHead>
    <TableRow>
      <SortCell style={{width: '50%'}} field='name' label='Name' />
      <SortCell style={{width: 8*10}} field='is_complete' label={
        <TooltipText title="Status">
          The status is automatically set to complete when the entry has a value in all
          required fields.
        </TooltipText>
      }/>
      <SortCell style={{width: '50%'}} field='department' label='Institution' />
      <SortCell style={{width: 8*3}} field='private' label={
        <TooltipText title="Privacy">
          Only members of your institution can see 'Private' entries. Everyone can see 'Public' entries.
        </TooltipText>
      }/>
      <SortCell style={{width: 8*13}} field='updated_at' label='Last edited' />
      <TableCell style={{width: 8*4}}>&nbsp;</TableCell>
    </TableRow>
    <TableRow className={classes.loadingContainerRow}>
      <TableCell colSpan={6} className={classes.loadingContainerCell}>
        <div className={classes.loadingContainer}>
          <LoadingIndicator />
        </div>
      </TableCell>
    </TableRow>
  </TableHead>
);

AssetTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  loadingContainerCell: {
    height: 0, position: 'relative', margin: 0, padding: 0, border: 'none',
  },

  loadingContainerRow: {
    height: 0, margin: 0, padding: 0, border: 'none',
  },

  loadingContainer: {
    position: 'absolute', top: 0, left: 0, width: '100%',
  },
});

export default withStyles(styles)(AssetTableHeader);
