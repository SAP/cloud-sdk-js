import {
  TestComplexTypeField,
  TestEntity
} from '../../../test/test-util/test-services/v2/test-service';
import { Entity } from '../entity';
import { Filter } from '../filter';
import { FieldType } from './field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

export function checkFilter<EntityT extends Entity, FieldT extends FieldType>(
  filter: Filter<EntityT, FieldT>,
  fieldName: string,
  operator: string,
  value: any
): void {
  expect(filter.field).toBe(fieldName);
  expect(filter.operator).toBe(operator);
  expect(filter.value).toBe(value);
}

describe('Number Field', () => {
  const fieldName = 'SomeField';
  const filterValue = 100;

  describe('orderable edm type field', () => {
    const field = new OrderableEdmTypeField(fieldName, TestEntity, 'Edm.Int16');

    it('should create filter for "equals"', () => {
      const filter = field.equals(filterValue);
      checkFilter(filter, fieldName, 'eq', filterValue);
    });

    it('should create filter for "notEquals"', () => {
      const filter = field.notEquals(filterValue);
      checkFilter(filter, fieldName, 'ne', filterValue);
    });

    it('should create filter for "lessThen"', () => {
      const filter = field.lessThan(filterValue);
      checkFilter(filter, fieldName, 'lt', filterValue);
    });

    it('should create filter for "lessOrEqual"', () => {
      const filter = field.lessOrEqual(filterValue);
      checkFilter(filter, fieldName, 'le', filterValue);
    });

    it('should create filter for "greaterThan"', () => {
      const filter = field.greaterThan(filterValue);
      checkFilter(filter, fieldName, 'gt', filterValue);
    });

    it('should create filter for "greaterOrEqual"', () => {
      const filter = field.greaterOrEqual(filterValue);
      checkFilter(filter, fieldName, 'ge', filterValue);
    });
  });

  describe('complex type field', () => {
    const parentFieldName = 'complexParentFieldName';
    const parentComplexField = new TestComplexTypeField(
      parentFieldName,
      TestEntity
    );
    const field = new OrderableEdmTypeField(
      fieldName,
      parentComplexField,
      'Edm.Single'
    );

    it('should create filter for "equals" (complex property string)', () => {
      const filter = field.equals(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'eq', filterValue);
    });

    it('should create filter for "notEquals" (complex property string)', () => {
      const filter = field.notEquals(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'ne', filterValue);
    });

    it('should create filter for "lessThen"', () => {
      const filter = field.lessThan(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'lt', filterValue);
    });

    it('should create filter for "lessOrEqual"', () => {
      const filter = field.lessOrEqual(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'le', filterValue);
    });

    it('should create filter for "greaterThan"', () => {
      const filter = field.greaterThan(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'gt', filterValue);
    });

    it('should create filter for "greaterOrEqual"', () => {
      const filter = field.greaterOrEqual(filterValue);
      expect(field._fieldName).toBe(fieldName);
      checkFilter(filter, `${parentFieldName}/${fieldName}`, 'ge', filterValue);
    });
  });
});
