export default theme => ({
  twoColumnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit,
  },

  twoColumnLabel: {
    flex: '0 1 calc(50% - ' + theme.spacing.unit * 6 + 'px)',
    marginRight: theme.spacing.unit * 6,
    borderBottom: [['1px', 'solid', theme.palette.divider]],
    paddingRigth: theme.spacing.unit * 3,
  },

  group: {
    paddingTop: theme.spacing.unit,
  },

  label: {
    marginRight: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 3,
    borderBottom: [['1px', 'solid', theme.palette.divider]],
  },

  booleanLabel: {
    marginRight: 13,
    paddingRight: theme.spacing.unit * 3,
    border: [['1px', 'solid', theme.palette.divider]],
  },
});
