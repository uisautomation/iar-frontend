import React, {Component} from 'react';
import AssetListItem from '../components/AssetListItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import '../style/App.css';

// Mock data until we can fetch data from the api
const assetData = [
	{
		name: 'Asset #1',
		status: 'In-progress',
		department: 'UIS',
		private: true,
		lastedited: 'today'
	},
	{
		name: 'Asset #2',
		status: 'In-progress',
		department: 'UIS',
		private: true,
		lastedited: 'today'
	},
	{
		name: 'Asset #3',
		status: 'Complete',
		department: 'UIS',
		private: true,
		lastedited: 'today'
	},
	{
		name: 'Asset #4',
		status: 'In-progress',
		department: 'UIS',
		private: false,
		lastedited: 'today'
	},
	{
		name: 'Asset #5',
		status: 'Complete',
		department: 'UIS',
		private: true,
		lastedited: 'today'
	},
	{
		name: 'Asset #6',
		status: 'In-progress',
		department: 'UIS',
		private: true,
		lastedited: 'today'
	},
	{
		name: 'Asset #7',
		status: 'In-progress',
		department: 'UIS',
		private: false,
		lastedited: 'today'
	},
];


class AssetList extends Component {
  render() {
    return (
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
			    </TableRow>
			  </TableHeader>
			  <TableBody
			    showRowHover={true}
			    displayRowCheckbox={false}
			    className="Asset-table-body"
			  >
			    {assetData.map( (asset, index) => (
			    	<AssetListItem
				    	index={asset.index}
				    	name={asset.name}
				    	status={asset.status}
				    	department={asset.department}
				    	private={asset.private}
				    	lastedited={asset.lastedited}
			    	/>
			      ))}
			  </TableBody>
			</Table>
        </div>
    );
  }
}


export default AssetList;
