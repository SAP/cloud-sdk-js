import moment from 'moment';
import {
  EntityBase,
  FieldType,
  Filter,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common';
import {
  TestComplexTypeField,
  TestEntity
} from '../../../core/test/test-util/test-services/v2/test-service';

export function checkFilter<
  EntityT extends EntityBase,
  FieldT extends FieldType
>(
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

  describe('orderable EDM type field', () => {
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

  describe('DateTime and DateTimeOffset fields', () => {
    const dateFilterValue = moment(1425427200000);
    const datetimefieldName = 'DateTimeProperty';
    const datetimeOffsetfieldName = 'DateTimeOffSetProperty';

    it('should create filter for type DateTimeOffset by passing moment() ', () => {
      const filter = TestEntity.DATE_TIME_OFF_SET_PROPERTY.equals(moment());
      expect(moment.isMoment(filter.value)).toBe(true);
    });

    it('should create filter for equals for type Edm.DateTime', () => {
      const filter = TestEntity.DATE_TIME_PROPERTY.equals(
        moment(1425427200000)
      );
      expect(filter.field).toBe(datetimefieldName);
      expect(filter.operator).toBe('eq');
      expect(filter.value).toEqual(dateFilterValue);
    });

    it('should create filter for equals for type Edm.DateTimeOffset', () => {
      const filter = TestEntity.DATE_TIME_OFF_SET_PROPERTY.equals(
        moment(1425427200000)
      );
      expect(filter.field).toBe(datetimeOffsetfieldName);
      expect(filter.operator).toBe('eq');
      expect(filter.value).toEqual(dateFilterValue);
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
