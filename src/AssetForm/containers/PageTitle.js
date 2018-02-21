import React from 'react';
import { withDraft } from './draft';

/**
 * A container which renders the page title for the asset form based on the current draft.
 */
const PageTitle = withDraft(({ url, name }) => ({ url, name }))(
  ({ url, name }) => (
    <span>
    { url ? 'Editing entry' : 'Creating entry' }
    { name && (name !== '') ? <span>: <strong>{ name }</strong></span> : null }
    </span>
  )
);

export default PageTitle;
