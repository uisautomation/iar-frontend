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

  booleanFormControlLabel: {
    marginRight: 13,
    paddingRight: theme.spacing.unit * 3,
    border: [['1px', 'solid', theme.palette.divider]],
  },

  booleanLabel: {
    marginTop: theme.spacing.unit * 3,
  },

  collapse: {
    marginTop: theme.spacing.unit * 1,
  },

  collapseContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },

  header: {
    position: 'absolute',
    left: 0, top: 0,
    width: '100%',
  },

  body: {
    margin: [[
      theme.spacing.unit * 16,
      theme.spacing.unit * 23,
      theme.spacing.unit * 4,
      theme.spacing.unit * 23,
    ]],
  },

  staticAnswer: {
    padding: theme.spacing.unit,
    display: 'inline-block',
    minWidth: theme.spacing.unit * 10,
    border: [['1px', 'solid', theme.customColors.coreGreen]],
    borderRadius: theme.spacing.unit * 0.5,
    color: theme.customColors.darkGreen,
    backgroundColor: 'rgba(0, 177, 193, 0.08)',
    textAlign: 'center',
  },

  unanswered: {
    padding: [[theme.spacing.unit, 0]],
    fontStyle: 'italic',
  },

  viewControlLabel: { color: 'inherit' },
  viewControlCheckbox: { color: theme.palette.primary.main },
});
