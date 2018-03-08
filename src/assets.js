/**
 * Module containing utility functions for asset resources.
 */

/**
 * Pre-save sanitisation.
 */
export const sanitise = asset => {
  let sanitisedAsset = asset;

  // Clear personal data fields if personal_data is false (but not null)
  if(asset.personal_data === false) {
    sanitisedAsset = {
      ...sanitisedAsset,
      data_subject: [], data_category: [], retention: null,
      recipients_outside_eea: null, recipients_outside_eea_description: null,
      recipients_outside_uni: null, recipients_outside_uni_description: null,
    };
  }

  // If personal data is true, sanitise recipients_outside_{...} fields
  if(asset.personal_data === true) {
    if(asset.recipients_outside_eea !== 'yes') {
      sanitisedAsset = {
        ...sanitisedAsset, recipients_outside_eea_description: null,
      };
    }
    if(asset.recipients_outside_uni !== 'yes') {
      sanitisedAsset = {
        ...sanitisedAsset, recipients_outside_uni_description: null,
      };
    }
  }

  // If not a digital asset...
  if(asset.storage_format && (asset.storage_format.indexOf('digital') === -1)) {
    sanitisedAsset = { ...sanitisedAsset, digital_storage_security: [] };
  }

  // If not a paper asset...
  if(asset.storage_format && (asset.storage_format.indexOf('paper') === -1)) {
    sanitisedAsset = { ...sanitisedAsset, paper_storage_security: [] };
  }

  // If not an "other" asset, clear the purpose_other field
  if(asset.purpose !== 'other') {
    sanitisedAsset = { ...sanitisedAsset, purpose_other: null };
  }

  // If not an "research" asset, clear the owner field
  if(asset.purpose !== 'research') {
    sanitisedAsset = { ...sanitisedAsset, owner: null };
  }

  return sanitisedAsset;
};
