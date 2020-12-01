import {
  toCamelCase,
  toUpperCaseSnakeCase,
  toTitleCase,
  toPascalCase
} from './string-formatter';

describe('converts names', () => {
  describe('from original names to static field names', () => {
    it('for camel case properties', () => {
      expect(toUpperCaseSnakeCase('fieldName')).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(toUpperCaseSnakeCase('FieldName')).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(toUpperCaseSnakeCase('field_name')).toBe('FIELD_NAME');
    });

    it('for kebab case properties', () => {
      expect(toUpperCaseSnakeCase('field-name')).toBe('FIELD_NAME');
    });

    it('for properties with numbers', () => {
      expect(toUpperCaseSnakeCase('Field13Name')).toBe('FIELD_13_NAME');
    });
  });

  describe('from original names to property names', () => {
    it('for camel case properties', () => {
      expect(toCamelCase('fieldName')).toBe('fieldName');
    });

    it('for pascal case properties', () => {
      expect(toCamelCase('FieldName')).toBe('fieldName');
    });

    it('for snake case properties', () => {
      expect(toCamelCase('field_name')).toBe('fieldName');
    });

    it('for kebab case properties', () => {
      expect(toCamelCase('field-name')).toBe('fieldName');
    });

    it('for properties with numbers', () => {
      expect(toCamelCase('Field13Name')).toBe('field13Name');
    });
  });

  describe('from property names to static field names', () => {
    it('for camel case properties', () => {
      expect(toUpperCaseSnakeCase(toCamelCase('fieldName'))).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(toUpperCaseSnakeCase(toCamelCase('FieldName'))).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(toUpperCaseSnakeCase(toCamelCase('field_name'))).toBe(
        'FIELD_NAME'
      );
    });

    it('for kebab case properties', () => {
      expect(toUpperCaseSnakeCase(toCamelCase('field-name'))).toBe(
        'FIELD_NAME'
      );
    });

    it('for properties with numbers', () => {
      expect(toUpperCaseSnakeCase(toCamelCase('Field13Name'))).toBe(
        'FIELD_13_NAME'
      );
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(toTitleCase('fieldName')).toBe('Field Name');
    });

    it('for pascal case properties', () => {
      expect(toTitleCase('FieldName')).toBe('Field Name');
    });

    it('for snake case properties', () => {
      expect(toTitleCase('field_name')).toBe('Field Name');
    });

    it('for kebab case properties', () => {
      expect(toTitleCase('field-name')).toBe('Field Name');
    });

    it('for properties with numbers', () => {
      expect(toTitleCase('Field13Name')).toBe('Field 13 Name');
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(toPascalCase('fieldName')).toBe('FieldName');
    });

    it('for pascal case properties', () => {
      expect(toPascalCase('FieldName')).toBe('FieldName');
    });

    it('for snake case properties', () => {
      expect(toPascalCase('field_name')).toBe('FieldName');
    });

    it('for kebab case properties', () => {
      expect(toPascalCase('field-name')).toBe('FieldName');
    });

    it('for properties with numbers', () => {
      expect(toPascalCase('Field13Name')).toBe('Field13Name');
    });
  });
});
