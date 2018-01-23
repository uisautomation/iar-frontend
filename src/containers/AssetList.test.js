import React from 'react';
import ReactDOM from 'react-dom';
import AssetList from './AssetList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

it('<AssetList/> renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><AssetList /></MuiThemeProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});