/**
 * Determine the completeness of an asset or sections thereof.
 *
 */

// Helper function for determining if a particular asset field has been filled in.
const isNotEmpty = v => (typeof v !== 'undefined') && v !== null && v !== '';

//
// Functions to determine if an asset (or sections of said) are complete.
//

/**
 * Function which takes an asset and returns a boolean indicating if the general information section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isGeneralInformationComplete = asset => {
  if(!asset) { return false; }
  const { name, purpose, purpose_other, department, owner } = asset;
  return (
    isNotEmpty(name) && isNotEmpty(purpose) && isNotEmpty(department) &&
    ((purpose !== 'research') || isNotEmpty(owner)) &&
    ((purpose !== 'other') || isNotEmpty(purpose_other))
  );
};

/**
 * Function which takes an asset and returns a boolean indicating if the personal data section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isPersonalDataComplete = asset => {
  if(!asset) { return false; }
  const {
    personal_data, data_subject, data_category,
    recipients_outside_uni, recipients_outside_uni_description,
    recipients_outside_eea, recipients_outside_eea_description,
    retention
  } = asset;
  return (
    (isNotEmpty(personal_data) && !personal_data)
    ||
    (
      isNotEmpty(data_subject) && (data_subject.length > 0) &&
      isNotEmpty(data_category) && (data_category.length > 0) &&
      isNotEmpty(recipients_outside_uni) &&
      (recipients_outside_uni !== 'yes' || isNotEmpty(recipients_outside_uni_description)) &&
      isNotEmpty(recipients_outside_eea) &&
      (recipients_outside_eea !== 'yes' || isNotEmpty(recipients_outside_eea_description)) &&
      isNotEmpty(retention)
    )
  );
};

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
};

/**
 * Function which takes an asset and returns a boolean indicating if the storage section
 * is complete. If asset is "null" or "undefined", this function returns false.
 */
export const isStorageComplete = asset => {
  if(!asset) { return false; }
  const {
    storage_location, storage_format, paper_storage_security, digital_storage_security
  } = asset;

  // storage location must be specified
  if((storage_location === null) || (storage_location === '')) { return false; }

  // at least one of digital or paper must be selected
  if(!storage_format || (storage_format.length === 0)) { return false; }

  // if digital, must have answered digital security section
  if(storage_format.indexOf('digital') !== -1) {
    if(digital_storage_security.length === 0) { return false; }
  }

  // if paper, must have answered paper security section
  if(storage_format.indexOf('paper') !== -1) {
    if(paper_storage_security.length === 0) { return false; }
  }

  return true;
};

/**
 * Function which takes an asset and returns a boolean if the asset is complete. If asset is "null"
 * or "undefined", this function returns false.
 */
export const isComplete = asset => (
  isGeneralInformationComplete(asset) &&
  isPersonalDataComplete(asset) &&
  isRiskComplete(asset) &&
  isStorageComplete(asset)
);
