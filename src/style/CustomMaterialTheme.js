import { createMuiTheme } from 'material-ui/styles';

const paleGreen = '#F1FBFC';
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
const incomplete = '#f5a623';

// Background of asset when hovering in asset table. We cannot use theme.action.hover since that is
// implemented as an rgba(...) overlay colour which shows the box-shadows per cell we use to
// implement the asset table body.
const assetTableHover = paleGreen;

// Custom Appbar colour, instead of using the main primary colour
const appBarBackground = darkGreen;

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
    incomplete,
    assetTableHover,
    appBarBackground,
  },
  drawerWidth: 280,
  customMixins: {
    formSection: {
      fontFamily: ['RobotoMono', 'monospace'],
      minHeight: 48,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 177, 193, 0.08)',
      borderBottom: [[
        '2px', 'solid', 'rgba(0, 177, 193, 0.17)',
      ]],
    },
  },
});

export default theme;
