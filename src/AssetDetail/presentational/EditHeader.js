import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import NavigateBackButton from '../../containers/NavigateBackButton';

import SaveDraftButton from '../containers/SaveDraftButton';
import DeleteEntryButton from '../containers/DeleteEntryButton';
import PageTitle from '../containers/PageTitle';

import Header, { styles, HeaderButton } from './Header';

import { IfMethodAllowed } from '../../draft';

// Header for edit view
export default withStyles(styles)(({ classes }) => (
  <Header classes={classes}>
    <Typography variant="title" color="inherit" className={classes.flex}>
      <PageTitle />
    </Typography>

    <div className={classes.buttonGroup}>
      <IfMethodAllowed method="DELETE">
        <DeleteEntryButton component={HeaderButton} className={classes.button}>
          <DeleteIcon className={classes.leftIcon} /> Delete entry
        </DeleteEntryButton>
      </IfMethodAllowed>
      <NavigateBackButton component={HeaderButton} classes={{ root: classes.button }}>
        Cancel
      </NavigateBackButton>
      <SaveDraftButton
        component={HeaderButton} color="default"
        className={[classes.button, classes.saveButton].join(' ')}
      >
        Save entry
      </SaveDraftButton>
    </div>
  </Header>
));

// Header for edit view
export const ViewHeader = withStyles(styles)(({ classes, asset }) => (
  <Header classes={classes}>
    {
      // only show title if there is an asset loaded at the moment
      asset ? (
        <Typography variant="title" color="inherit" className={classes.flex}>
          Viewing entry: { asset.name ? asset.name : asset.id }
        </Typography>
      ) : null
    }

    <div className={classes.buttonGroup}>
      <NavigateBackButton component={HeaderButton} classes={{ root: classes.button }}>
        Close
      </NavigateBackButton>
    </div>
  </Header>
));

ViewHeader.propTypes = {
  asset: PropTypes.object,
};
