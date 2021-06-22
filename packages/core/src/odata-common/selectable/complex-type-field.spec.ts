import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { getEdmType, getEntityConstructor } from './complex-type-field';

describe('complex-type-field', () => {
  describe('getEntityConstructor', () => {
    it('should get entity constructor from entity constructor', () => {
      expect(getEntityConstructor(TestEntity)).toBe(TestEntity);
    });

    it('should get entity constructor from complex type field', () => {
      expect(getEntityConstructor(TestEntity.COMPLEX_TYPE_PROPERTY)).toBe(
        TestEntity
      );
    });

    it('should get entity constructor from nested complex type field', () => {
      expect(
        getEntityConstructor(
          TestEntity.COMPLEX_TYPE_PROPERTY.complexTypeProperty
        )
      ).toBe(TestEntity);
    });
  });

  describe('getEdmType', () => {
    it('should get edm type when first parameter is edm type and second parameter is undefined', () => {
      expect(getEdmType('Edm.String')).toBe('Edm.String');
    });

    it('should throw error when first parameter is edm type and second parameter is not undefined', () => {
      expect(() => getEdmType('Edm.String', 'Edm.String')).toThrow();
    });

    it('should get edm type when first parameter is string and second parameter is edm type', () => {
      expect(getEdmType('test', 'Edm.String')).toBe('Edm.String');
    });

    it('should throw error when first parameter is string and second parameter is undefined', () => {
      expect(() => getEdmType('test')).toThrow();
    });

    it('should throw error when first parameter is not string nor edm type and second parameter is edm type', () => {
      expect(() => getEdmType(1 as unknown as string, 'Edm.String')).toThrow();
    });
  });
});
