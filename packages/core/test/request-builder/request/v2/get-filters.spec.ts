/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment from 'moment';
import {
  and,
  or,
  filterFunction,
  filterFunctions,
  oDataUri
} from '../../../../src/odata/v2';
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
      oDataUri.getFilter(
        and(testFilterString.filter, testFilterBoolean.filter),
        TestEntity
      ).filter
    ).toBe(`(${testFilterString.odataStr} and ${testFilterBoolean.odataStr})`);
  });

  it('for nested filters', () => {
    expect(
      oDataUri.getFilter(
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
      oDataUri.getFilter(
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
    expect(oDataUri.getFilter(testFilterGuid.filter, TestEntity).filter).toBe(
      testFilterGuid.odataStr
    );
  });

  it('for complex types', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
        TestEntity
      ).filter
    ).toBe("ComplexTypeProperty/StringProperty eq 'test'");
  });
});

describe('get-filter for custom fields', () => {
  it('for custom string field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldString')
          .edmString()
          .notEquals('customFieldTest'),
        TestEntity
      ).filter
    ).toBe("CustomFieldString ne 'customFieldTest'");
  });

  it('for custom double field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldDouble')
          .edmDouble()
          .greaterOrEqual(13),
        TestEntity
      ).filter
    ).toBe('CustomFieldDouble ge 13D');
  });

  it('for custom moment field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldDateTime')
          .edmDateTime()
          .equals(moment.utc('2015-12-31', 'YYYY-MM-DD')),
        TestEntity
      ).filter
    ).toBe("CustomFieldDateTime eq datetime'2015-12-31T00:00:00.000'");
  });

  it('for custom time field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldTime')
          .edmTime()
          .equals({ hours: 1, minutes: 1, seconds: 1 }),
        TestEntity
      ).filter
    ).toBe("CustomFieldTime eq time'PT01H01M01S'");
  });

  it('for custom boolean field', () => {
    expect(
      oDataUri.getFilter(
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
    expect(oDataUri.getFilter(fn.equals(1), TestEntity).filter).toBe(
      "fn('str', 1, DoubleProperty) eq 1"
    );
  });

  it('for custom nested filter function', () => {
    const fnNested = filterFunction('fnNested', 'boolean');
    const fn = filterFunction('fn', 'string', fnNested);
    expect(oDataUri.getFilter(fn.equals('test'), TestEntity).filter).toBe(
      "fn(fnNested()) eq 'test'"
    );
  });

  it('for length filter function', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.length(TestEntity.STRING_PROPERTY).equals(3),
        TestEntity
      ).filter
    ).toBe('length(StringProperty) eq 3');
  });

  it('for round filter function with default double', () => {
    expect(
      oDataUri.getFilter(filterFunctions.round(10.1).equals(3), TestEntity)
        .filter
    ).toBe('round(10.1) eq 3D');
  });

  it('for round filter function with decimal', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.round(10.1, 'decimal').equals(3),
        TestEntity
      ).filter
    ).toBe('round(10.1) eq 3M');
  });

  it('for custom filter function with date', () => {
    const date = moment.utc().year(2000).month(0).date(1).startOf('date');
    const dateFn = filterFunction('fn', 'int', date).equals(1);
    expect(oDataUri.getFilter(dateFn, TestEntity).filter).toEqual(
      "fn(datetimeoffset'2000-01-01T00:00:00.000Z') eq 1"
    );
  });
});
