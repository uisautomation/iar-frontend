/**
 * Determine the completeness of an asset or sections thereof.
 *
 */

// Helper function for determining if a particular asset field has been filled in.
const isNotEmpty = v => (typeof v !== 'undefined') && v !== null;

//
// Functions to determine if an asset (or sections of said) are complete.
//

/**
 * Function which takes an asset and returns a boolean indicating if the general information section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isGeneralInformationComplete = asset => {
  if(!asset) { return false; }
  const { name, purpose, department, owner, private: isPrivate } = asset;
  return (
    isNotEmpty(name) && isNotEmpty(purpose) && isNotEmpty(department) && isNotEmpty(isPrivate) &&
    ((purpose !== 'research') || isNotEmpty(owner))
  );
}

/**
 * Function which takes an asset and returns a boolean indicating if the personal data section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isPersonalDataComplete = asset => {
  if(!asset) { return false; }
  const { personal_data, data_subject, data_category, retention } = asset;
  return (
    (isNotEmpty(personal_data) && !personal_data)
    ||
    (
      isNotEmpty(data_subject) && (data_subject.length > 0) &&
      isNotEmpty(data_category) && (data_category.length > 0) &&
      isNotEmpty(retention)
    )
  );
}

/**
 * Function which takes an asset and returns a boolean indicating if the risk section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isRiskComplete = asset => {
  if(!asset) { return false; }
  const { risk_type } = asset;
  return (
    isNotEmpty(risk_type) && (risk_type.length > 0)
  );
}

/**
 * Function which takes an asset and returns a boolean if the asset is complete. If asset is "null"
 * or "undefined", this function returns false.
 */
export const isComplete = asset => (
  isGeneralInformationComplete(asset) &&
  isPersonalDataComplete(asset) &&
  isRiskComplete(asset)
);
