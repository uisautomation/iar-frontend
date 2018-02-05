import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssets, Direction } from '../redux/actions/assetRegisterApi';
import { TableRow, TableCell, TableSortLabel, TableHead } from 'material-ui/Table';

// A map from sort directions to values for the "direction" prop of TableSortLabel.
const directionDescriptions = new Map([
  [Direction.ascending, 'asc'], [Direction.descending, 'desc']
]);

// Given the current assets list query and the field name corresponding to a column, return the
// query which should be run if that column's header is clicked.
const getNextQuery = (query, field) => {
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
const UnconnectedSortCell = ({ direction, active, label, nextQuery, getAssets }) => (
  <TableCell sortDirection={active ? direction : false}>
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

const SortCell = connect(mapStateToProps, mapDispatchToProps)(UnconnectedSortCell);

SortCell.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * A component which provides the header row for the asset table. Heading titles can be used to
 * change sort order.
 *
 */
export const AssetTableHeader = () => (
  <TableHead>
    <TableRow>
      <SortCell field='name' label='Name' />
      <SortCell field='is_complete' label='Status' />
      <SortCell field='department' label='Department' />
      <SortCell field='private' label='Private' />
      <SortCell field='updated_at' label='Last edited' />
      <TableCell>&nbsp;</TableCell>
    </TableRow>
  </TableHead>
);

export default AssetTableHeader;
