/**
 * Test the various is{...}Complete functions from the asset module.
 */

import * as completeness from './completeness';

// A minimal "complete" asset.
const COMPLETE_ASSET = {
  name: 'aaa', department: 'bbb', purpose: 'ccc',
  private: false, personal_data: false, risk_type: ['none'],
  storage_location: 'ddd', storage_format: ['digital'],
  digital_storage_security: ['none'],
};

// Complete asset with personal data
const COMPLETE_PERSONAL_DATA_ASSET = {
  ...COMPLETE_ASSET,
  personal_data: true,  data_subject: ['foo'],  data_category: ['bar'],  retention: 'buzz',
  recipients_outside_uni: 'no',
  recipients_outside_eea: 'no'
};

// Tests that sections of an expected to be {in,}complete are so. Takes a asset and a
// "completeness" object which describes whether each section is intended to be complete.
const expectCompleteness = (asset, expectedComplete) => {
  const t = isComplete => isComplete ? 'complete' : 'in progress';

  test('has ' + t(expectedComplete.general) + ' general section', () => {
    expect(completeness.isGeneralInformationComplete(asset)).toBe(expectedComplete.general);
  });

  test('has ' + t(expectedComplete.personal) + ' personal data section', () => {
    expect(completeness.isPersonalDataComplete(asset)).toBe(expectedComplete.personal);
  });

  test('has ' + t(expectedComplete.risk) + ' risk section', () => {
    expect(completeness.isRiskComplete(asset)).toBe(expectedComplete.risk);
  });

  test('has ' + t(expectedComplete.storage) + ' storage section', () => {
    expect(completeness.isStorageComplete(asset)).toBe(expectedComplete.storage);
  });

  test('is ' + t(expectedComplete.all), () => {
    expect(completeness.isComplete(asset)).toBe(expectedComplete.all);
  });
}

// All complete and all in-progress completeness objects to use as templates.
const ALL_COMPLETE = { general: true, personal: true, risk: true, storage: true, all: true };
const ALL_IN_PROGRESS = { general: false, personal: false, risk: false, storage: false, all: false };

describe('a null asset', () => expectCompleteness(null, ALL_IN_PROGRESS));

describe('an undefined asset', () => expectCompleteness(undefined, ALL_IN_PROGRESS));

describe('a minimally complete asset', () => expectCompleteness(COMPLETE_ASSET, ALL_COMPLETE));

describe('a asset whose purpose is research', () => {
  const asset = { ...COMPLETE_ASSET, purpose: 'research' };
  describe('with no owner', () => expectCompleteness(asset, {
    ...ALL_COMPLETE, general: false, all: false
  }));
  describe('with an owner', () => expectCompleteness({...asset, owner: 'ddd'}, ALL_COMPLETE));
});

describe('an asset', () => {
  // Required fields for general information
  ['name', 'purpose', 'department'].forEach(missingField => {
    describe('missing ' + missingField, () => {
      const asset = { ...COMPLETE_ASSET };
      delete asset[missingField];
      expectCompleteness(asset, {...ALL_COMPLETE, general: false, all: false});
    });

    describe('with null ' + missingField, () => {
      const asset = { ...COMPLETE_ASSET };
      asset[missingField] = null;
      expectCompleteness(asset, {...ALL_COMPLETE, general: false, all: false});
    });

    describe('with empty ' + missingField, () => {
      const asset = { ...COMPLETE_ASSET };
      asset[missingField] = '';
      expectCompleteness(asset, {...ALL_COMPLETE, general: false, all: false});
    });
  });
});

describe('an asset with personal data', () => {
  expectCompleteness(COMPLETE_PERSONAL_DATA_ASSET, ALL_COMPLETE);

  // Required fields
  [
    'data_subject', 'data_category', 'retention',
    'recipients_outside_uni', 'recipients_outside_eea'
  ].forEach(missingField => {
    describe('missing ' + missingField, () => {
      const asset = { ...COMPLETE_PERSONAL_DATA_ASSET };
      delete asset[missingField];
      expectCompleteness(asset, {...ALL_COMPLETE, personal: false, all: false});
    });
  });

  // Required array fields for personal data
  ['data_subject', 'data_category'].forEach(emptyField => {
    describe('with empty ' + emptyField, () => {
      const asset = { ...COMPLETE_PERSONAL_DATA_ASSET, [emptyField]: [] };
      expectCompleteness(asset, {...ALL_COMPLETE, personal: false, all: false});
    });
  });
});

describe('an asset with null risk_type', () => {
  expectCompleteness({ ...COMPLETE_ASSET, risk_type: null }, {
    ...ALL_COMPLETE, risk: false, all: false
  });
});

describe('an asset with empty risk_type', () => {
  expectCompleteness({ ...COMPLETE_ASSET, risk_type: [] }, {
    ...ALL_COMPLETE, risk: false, all: false
  });
});

describe('an asset with no storage location', () => {
  expectCompleteness({ ...COMPLETE_ASSET, storage_location: null }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('an asset with empty storage format', () => {
  expectCompleteness({ ...COMPLETE_ASSET, storage_format: [] }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('an asset with null storage format', () => {
  expectCompleteness({ ...COMPLETE_ASSET, storage_format: null }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('a digital asset with no security', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['digital'], digital_storage_security: [],
  }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('a digital asset with security answer', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['digital'], digital_storage_security: ['none'],
  }, {
    ...ALL_COMPLETE, storage: true, all: true
  });
});

describe('a paper asset with no security', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['paper'], paper_storage_security: [],
  }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('a paper asset with security answer', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['paper'], paper_storage_security: ['none'],
  }, {
    ...ALL_COMPLETE, storage: true, all: true
  });
});

describe('a digital and paper asset with no paper security', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['paper', 'digital'], paper_storage_security: [],
  }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('a digital and paper asset with no digital security', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['paper', 'digital'], digital_storage_security: [],
  }, {
    ...ALL_COMPLETE, storage: false, all: false
  });
});

describe('a digital and paper asset with no both security answert', () => {
  expectCompleteness({
    ...COMPLETE_ASSET, storage_format:['paper', 'digital'],
    digital_storage_security: ['none'], paper_storage_security: ['none'],
  }, {
    ...ALL_COMPLETE, storage: true, all: true
  });
});
