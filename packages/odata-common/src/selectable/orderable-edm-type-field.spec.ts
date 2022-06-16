import {
  CommonComplexTypeField,
  CommonEntity
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { defaultDeSerializers, DeSerializers } from '../de-serializers';
import { EntityBase } from '../entity-base';
import { Filter } from '../filter';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

export function checkFilter<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filter: Filter<EntityT, DeSerializersT, any>,
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

  describe('orderable EDM type field', () => {
    const field = new OrderableEdmTypeField(
      fieldName,
      CommonEntity,
      'Edm.Int16',
      defaultDeSerializers
    );

    it('should create filter for "equals"', () => {
      const filter = field.equals(filterValue);
      checkFilter(filter, fieldName, 'eq', filterValue);
    });

    it('should create filter for "notEquals"', () => {
      const filter = field.notEquals(filterValue);
      checkFilter(filter, fieldName, 'ne', filterValue);
    });

    it('should create filter for "lessThan"', () => {
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
    const parentComplexField = new CommonComplexTypeField(
      parentFieldName,
      CommonEntity,
      defaultDeSerializers
    );
    const field = new OrderableEdmTypeField(
      fieldName,
      parentComplexField,
      'Edm.Single',
      defaultDeSerializers
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

    it('should create filter for "lessThan"', () => {
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
