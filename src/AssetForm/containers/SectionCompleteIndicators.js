/**
 * Container components which wrap CompleteIndicator and indicate the completeness of various
 * sections of the asset form.
 */
import { withDraft } from './draft';
import {
  isGeneralInformationComplete,
  isPersonalDataComplete,
  isRiskComplete
} from '../../completeness';
import CompleteIndicator from '../presentational/CompleteIndicator';

/**
 * Indicate if the general information section is complete.
 */
export const GeneralInformationCompleteIndicator = withDraft(
  draft => ({ isComplete: isGeneralInformationComplete(draft) })
)(CompleteIndicator);

/**
 * Indicate if the personal data section is complete.
 */
export const PersonalDataCompleteIndicator = withDraft(
  draft => ({ isComplete: isPersonalDataComplete(draft) })
)(CompleteIndicator);

/**
 * Indicate if the risk section is complete.
 */
export const RiskCompleteIndicator = withDraft(
  draft => ({ isComplete: isRiskComplete(draft) })
)(CompleteIndicator);
