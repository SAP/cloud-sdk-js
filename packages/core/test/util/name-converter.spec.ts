import { toPropertyFormat, toStaticPropertyFormat, toTitleFormat, toTypeNameFormat } from '../../src';

describe('converts names', () => {
  describe('from original names to static field names', () => {
    it('for camel case properties', () => {
      expect(toStaticPropertyFormat('fieldName')).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(toStaticPropertyFormat('FieldName')).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(toStaticPropertyFormat('field_name')).toBe('FIELD_NAME');
    });

    it('for kebab case properties', () => {
      expect(toStaticPropertyFormat('field-name')).toBe('FIELD_NAME');
    });

    it('for properties with numbers', () => {
      expect(toStaticPropertyFormat('Field13Name')).toBe('FIELD_13_NAME');
    });
  });

  describe('from original names to property names', () => {
    it('for camel case properties', () => {
      expect(toPropertyFormat('fieldName')).toBe('fieldName');
    });

    it('for pascal case properties', () => {
      expect(toPropertyFormat('FieldName')).toBe('fieldName');
    });

    it('for snake case properties', () => {
      expect(toPropertyFormat('field_name')).toBe('fieldName');
    });

    it('for kebab case properties', () => {
      expect(toPropertyFormat('field-name')).toBe('fieldName');
    });

    it('for properties with numbers', () => {
      expect(toPropertyFormat('Field13Name')).toBe('field13Name');
    });
  });

  describe('from property names to static field names', () => {
    it('for camel case properties', () => {
      expect(toStaticPropertyFormat(toPropertyFormat('fieldName'))).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(toStaticPropertyFormat(toPropertyFormat('FieldName'))).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(toStaticPropertyFormat(toPropertyFormat('field_name'))).toBe('FIELD_NAME');
    });

    it('for kebab case properties', () => {
      expect(toStaticPropertyFormat(toPropertyFormat('field-name'))).toBe('FIELD_NAME');
    });

    it('for properties with numbers', () => {
      expect(toStaticPropertyFormat(toPropertyFormat('Field13Name'))).toBe('FIELD_13_NAME');
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(toTitleFormat('fieldName')).toBe('Field Name');
    });

    it('for pascal case properties', () => {
      expect(toTitleFormat('FieldName')).toBe('Field Name');
    });

    it('for snake case properties', () => {
      expect(toTitleFormat('field_name')).toBe('Field Name');
    });

    it('for kebab case properties', () => {
      expect(toTitleFormat('field-name')).toBe('Field Name');
    });

    it('for properties with numbers', () => {
      expect(toTitleFormat('Field13Name')).toBe('Field 13 Name');
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(toTypeNameFormat('fieldName')).toBe('FieldName');
    });

    it('for pascal case properties', () => {
      expect(toTypeNameFormat('FieldName')).toBe('FieldName');
    });

    it('for snake case properties', () => {
      expect(toTypeNameFormat('field_name')).toBe('FieldName');
    });

    it('for kebab case properties', () => {
      expect(toTypeNameFormat('field-name')).toBe('FieldName');
    });

    it('for properties with numbers', () => {
      expect(toTypeNameFormat('Field13Name')).toBe('Field13Name');
    });
  });
});
