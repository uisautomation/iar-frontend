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
  overrides: {
    // the following overrides are a HACK to effectively set the default colour of switch, checkbox
    // and radio controls rather than have to set "color='primary'" on each and every instance
    MuiSwitch: {
      checkedSecondary: {
        color: coreGreen,
        '& + $bar': {
          backgroundColor: coreGreen,
        },
      },
    },
    MuiCheckbox: {
      checkedSecondary: {
        color: coreGreen,
      },
    },
    MuiRadio: {
      checkedSecondary: {
        color: coreGreen,
      },
    },

    // Ensure that form helper text doesn't change the colour of links.
    MuiFormHelperText: {
      root: {
        '& a': { color: 'inherit' },
      },
    },
  },
  drawer: {
    listItem: {
      fontSize: {
        md_xl: '1rem',
        xs_sm: '0.9rem',
      },
    },
    width: {
      md_xl: 280,
      xs_sm: 220,
    },
  },
  customMixins: {
    formSection: {
      fontFamily: ['Roboto Mono', 'monospace'],
      minHeight: 48,
      height: 48, // required due to IE11 bug
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
