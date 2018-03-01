import { DEFAULT_ASSET } from './redux/actions/editAsset';
import { sanitise } from './assets';

let asset;

beforeEach(() => {
  asset = { ...DEFAULT_ASSET };
});

describe('sanitise', () => {
  const pd_clear_fields = [
    'retention', 'recipients_outside_eea', 'recipients_outside_eea_description',
    'recipients_outside_uni', 'recipients_outside_uni_description',
  ];

  describe('passed asset with personal_data = false', () => {
    beforeEach(() => {
      asset.personal_data = false;
    });

    test('clears data_subject', () => {
      asset.data_subject = ['test'];
      expect(sanitise(asset).data_subject).toHaveLength(0);
    });

    test('clears data_category', () => {
      asset.data_category = ['test'];
      expect(sanitise(asset).data_category).toHaveLength(0);
    });

    pd_clear_fields.forEach(field => {
      test('clears ' + field, () => {
        asset[field] = 'test';
        expect(sanitise(asset)[field]).toBe(null);
      });
    });
  });

  describe('passed asset with personal_data = true', () => {
    beforeEach(() => {
      asset.personal_data = true;
      asset.recipients_outside_eea = 'yes';
      asset.recipients_outside_uni = 'yes';
    });

    test('preserves data_subject', () => {
      asset.data_subject = ['test'];
      expect(sanitise(asset).data_subject).toEqual(['test']);
    });

    test('preserves data_category', () => {
      asset.data_category = ['test'];
      expect(sanitise(asset).data_category).toEqual(['test']);
    });

    pd_clear_fields.forEach(field => {
      test('preserves ' + field, () => {
        asset[field] = 'test';
        expect(sanitise(asset)[field]).toBe('test');
      });
    });

    describe('with recipients_outside_eea = yes', () => {
      beforeEach(() => {
        asset.recipients_outside_eea = 'yes';
      });

      test('preserves recipients_outside_eea_description', () => {
        asset.recipients_outside_eea_description = 'test';
        expect(sanitise(asset)).toMatchObject({ recipients_outside_eea_description: 'test' });
      });
    });

    describe('with recipients_outside_eea != yes', () => {
      beforeEach(() => {
        asset.recipients_outside_eea = 'definitely-not-yes';
      });

      test('clear recipients_outside_eea_description', () => {
        asset.recipients_outside_eea_description = 'test';
        expect(sanitise(asset)).toMatchObject({ recipients_outside_eea_description: null });
      });
    });

    describe('with recipients_outside_uni = yes', () => {
      beforeEach(() => {
        asset.recipients_outside_uni = 'yes';
      });

      test('preserves recipients_outside_uni_description', () => {
        asset.recipients_outside_uni_description = 'test';
        expect(sanitise(asset)).toMatchObject({ recipients_outside_uni_description: 'test' });
      });
    });

    describe('with recipients_outside_uni != yes', () => {
      beforeEach(() => {
        asset.recipients_outside_uni = 'definitely-not-yes';
      });

      test('clear recipients_outside_uni_description', () => {
        asset.recipients_outside_uni_description = 'test';
        expect(sanitise(asset)).toMatchObject({ recipients_outside_uni_description: null });
      });
    });
  });

  describe('passed asset with no digital asset', () => {
    beforeEach(() => {
      asset.storage_format = ['paper'];
    });

    test('clears digital_storage_security', () => {
      asset.digital_storage_security = ['test'];
      expect(sanitise(asset)).toMatchObject({ digital_storage_security: [] });
    });
  });

  describe('passed asset with no paper asset', () => {
    beforeEach(() => {
      asset.storage_format = ['digital'];
    });

    test('clears paper_storage_security', () => {
      asset.paper_storage_security = ['test'];
      expect(sanitise(asset)).toMatchObject({ paper_storage_security: [] });
    });
  });

  describe('passed asset with digital and paper asset', () => {
    beforeEach(() => {
      asset.storage_format = ['digital', 'paper'];
    });

    test('preserves digital_storage_security', () => {
      asset.digital_storage_security = ['test'];
      expect(sanitise(asset)).toMatchObject({ digital_storage_security: ['test'] });
    });

    test('preserves paper_storage_security', () => {
      asset.paper_storage_security = ['test'];
      expect(sanitise(asset)).toMatchObject({ paper_storage_security: ['test'] });
    });
  });
});
