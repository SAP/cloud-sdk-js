import {
  camelCase,
  upperCaseSnakeCase,
  titleFormat,
  pascalCase
} from './string-formatter';

describe('converts names', () => {
  describe('from original names to static field names', () => {
    it('for camel case properties', () => {
      expect(upperCaseSnakeCase('fieldName')).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(upperCaseSnakeCase('FieldName')).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(upperCaseSnakeCase('field_name')).toBe('FIELD_NAME');
    });

    it('for kebab case properties', () => {
      expect(upperCaseSnakeCase('field-name')).toBe('FIELD_NAME');
    });

    it('for properties with numbers', () => {
      expect(upperCaseSnakeCase('Field13Name')).toBe('FIELD_13_NAME');
    });
  });

  describe('from original names to property names', () => {
    it('for camel case properties', () => {
      expect(camelCase('fieldName')).toBe('fieldName');
    });

    it('for pascal case properties', () => {
      expect(camelCase('FieldName')).toBe('fieldName');
    });

    it('for snake case properties', () => {
      expect(camelCase('field_name')).toBe('fieldName');
    });

    it('for kebab case properties', () => {
      expect(camelCase('field-name')).toBe('fieldName');
    });

    it('for properties with numbers', () => {
      expect(camelCase('Field13Name')).toBe('field13Name');
    });

    it('for properties with dot', () => {
      expect(camelCase('field.name')).toBe('fieldName');
    });

    it('for properties with dollar', () => {
      expect(camelCase('$fieldName')).toBe('fieldName');
    });
  });

  describe('from property names to static field names', () => {
    it('for camel case properties', () => {
      expect(upperCaseSnakeCase(camelCase('fieldName'))).toBe('FIELD_NAME');
    });

    it('for pascal case properties', () => {
      expect(upperCaseSnakeCase(camelCase('FieldName'))).toBe('FIELD_NAME');
    });

    it('for snake case properties', () => {
      expect(upperCaseSnakeCase(camelCase('field_name'))).toBe('FIELD_NAME');
    });

    it('for kebab case properties', () => {
      expect(upperCaseSnakeCase(camelCase('field-name'))).toBe('FIELD_NAME');
    });

    it('for properties with numbers', () => {
      expect(upperCaseSnakeCase(camelCase('Field13Name'))).toBe(
        'FIELD_13_NAME'
      );
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(titleFormat('fieldName')).toBe('Field Name');
    });

    it('for pascal case properties', () => {
      expect(titleFormat('FieldName')).toBe('Field Name');
    });

    it('for snake case properties', () => {
      expect(titleFormat('field_name')).toBe('Field Name');
    });

    it('for kebab case properties', () => {
      expect(titleFormat('field-name')).toBe('Field Name');
    });

    it('for properties with numbers', () => {
      expect(titleFormat('Field13Name')).toBe('Field 13 Name');
    });
  });

  describe('from original names to human readable names', () => {
    it('for camel case properties', () => {
      expect(pascalCase('fieldName')).toBe('FieldName');
    });

    it('for pascal case properties', () => {
      expect(pascalCase('FieldName')).toBe('FieldName');
    });

    it('for snake case properties', () => {
      expect(pascalCase('field_name')).toBe('FieldName');
    });

    it('for kebab case properties', () => {
      expect(pascalCase('field-name')).toBe('FieldName');
    });

    it('for properties with numbers', () => {
      expect(pascalCase('Field13Name')).toBe('Field13Name');
    });
  });
});
