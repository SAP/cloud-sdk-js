/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment from 'moment';
import {
  and,
  or,
  filterFunction,
  filterFunctions
} from '../../../../src/odata/v2';
import { getQueryParametersForFilter } from '../../../../src/odata/v2/uri-conversion/get-filter';
import {
  testFilterBoolean,
  testFilterGuid,
  testFilterInt16,
  testFilterSingleLink,
  testFilterString
} from '../../../test-util/filter-factory';
import { TestEntity } from '../../../test-util/test-services/v2/test-service';

describe('get filters', () => {
  it('for simple filters', () => {
    expect(
      getQueryParametersForFilter(
        and(testFilterString.filter, testFilterBoolean.filter),
        TestEntity
      ).filter
    ).toBe(`(${testFilterString.odataStr} and ${testFilterBoolean.odataStr})`);
  });

  it('for nested filters', () => {
    expect(
      getQueryParametersForFilter(
        and(
          testFilterString.filter,
          testFilterBoolean.filter,
          or(testFilterString.filter, testFilterInt16.filter)
        ),
        TestEntity
      ).filter
    ).toBe(
      `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr}))`
    );
  });

  it('for nested multidimensional filters', () => {
    expect(
      getQueryParametersForFilter(
        and(
          testFilterString.filter,
          testFilterBoolean.filter,
          or(
            testFilterString.filter,
            testFilterInt16.filter,
            testFilterSingleLink.filter
          )
        ),
        TestEntity
      ).filter
    ).toBe(
      `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr} or (${testFilterSingleLink.odataStr})))`
    );
  });

  it('for guids', () => {
    expect(
      getQueryParametersForFilter(testFilterGuid.filter, TestEntity).filter
    ).toBe(testFilterGuid.odataStr);
  });

  it('for complex types', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
        TestEntity
      ).filter
    ).toBe("ComplexTypeProperty/StringProperty eq 'test'");
  });
});

describe('get-filter for custom fields', () => {
  it('for custom string field', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.customField('CustomFieldString')
          .edmString()
          .notEquals('customFieldTest'),
        TestEntity
      ).filter
    ).toBe("CustomFieldString ne 'customFieldTest'");
  });

  it('for custom double field', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.customField('CustomFieldDouble')
          .edmDouble()
          .greaterOrEqual(13),
        TestEntity
      ).filter
    ).toBe('CustomFieldDouble ge 13D');
  });

  it('for custom moment field', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.customField('CustomFieldDateTime')
          .edmDateTime()
          .equals(moment.utc('2015-12-31', 'YYYY-MM-DD')),
        TestEntity
      ).filter
    ).toBe("CustomFieldDateTime eq datetime'2015-12-31T00:00:00.000'");
  });

  it('for custom time field', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.customField('CustomFieldTime')
          .edmTime()
          .equals({ hours: 1, minutes: 1, seconds: 1 }),
        TestEntity
      ).filter
    ).toBe("CustomFieldTime eq time'PT01H01M01S'");
  });

  it('for custom boolean field', () => {
    expect(
      getQueryParametersForFilter(
        TestEntity.customField('CustomFieldBoolean').edmBoolean().equals(true),
        TestEntity
      ).filter
    ).toBe('CustomFieldBoolean eq true');
  });
});

describe('get-filter for filter functions', () => {
  it('for custom filter function', () => {
    const fn = filterFunction(
      'fn',
      'int',
      'str',
      1,
      TestEntity.DOUBLE_PROPERTY
    );
    expect(getQueryParametersForFilter(fn.equals(1), TestEntity).filter).toBe(
      "fn('str', 1, DoubleProperty) eq 1"
    );
  });

  it('for custom nested filter function', () => {
    const fnNested = filterFunction('fnNested', 'bool');
    const fn = filterFunction('fn', 'string', fnNested);
    expect(
      getQueryParametersForFilter(fn.equals('test'), TestEntity).filter
    ).toBe("fn(fnNested()) eq 'test'");
  });

  it('for length filter function', () => {
    expect(
      getQueryParametersForFilter(
        filterFunctions.length(TestEntity.STRING_PROPERTY).equals(3),
        TestEntity
      ).filter
    ).toBe('length(StringProperty) eq 3');
  });

  it('for round filter function with default double', () => {
    expect(
      getQueryParametersForFilter(
        filterFunctions.round(10.1).equals(3),
        TestEntity
      ).filter
    ).toBe('round(10.1) eq 3D');
  });

  it('for round filter function with decimal', () => {
    expect(
      getQueryParametersForFilter(
        filterFunctions.round(10.1, 'decimal').equals(3),
        TestEntity
      ).filter
    ).toBe('round(10.1) eq 3M');
  });
});
