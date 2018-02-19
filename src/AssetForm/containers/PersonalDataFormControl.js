import { FormControl } from 'material-ui/Form';
import { withDraft } from './draft';

/**
 * The PersonalDataFormControl is only enabled if personal_data is true. In which case, it is also
 * required.
 */
const PersonalDataFormControl = withDraft(
  ({ personal_data }) => ({ disabled: !Boolean(personal_data), required: Boolean(personal_data) })
)(FormControl);

export default PersonalDataFormControl;
