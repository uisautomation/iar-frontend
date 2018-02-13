import { createMuiTheme } from 'material-ui/styles';

const lightGreen = '#91B9A4';
const coreGreen = '#00B1C1';
const darkGreen = '#106470';
const white = '#fff';
const darkGrey = '#212121';
const mediumGrey = '#757575';
const lightGrey = '#F0F0F0';
const blueyGrey = '#ECEFF1';

// For complete/in-progress indicators
const complete = '#7ed321';
const inProgress = '#f5a623';

// Background of asset when hovering in asset table. We cannot use theme.action.hover since that is
// implemented as an rgba(...) overlay colour which shows the box-shadows per cell we use to
// implement the asset table body.
const assetTableHover = '#dbdbdb';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: lightGreen,
      main: coreGreen,
      dark: darkGreen,
      contrastText: white,
    }
  },
  customColors: {
    lightGreen,
    coreGreen,
    darkGreen,
    white,
    darkGrey,
    mediumGrey,
    lightGrey,
    blueyGrey,
    complete,
    inProgress,
    assetTableHover
  }
});

export default theme;
