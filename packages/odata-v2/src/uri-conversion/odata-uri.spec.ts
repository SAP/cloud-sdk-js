import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { and, filterFunction, not, or } from '@sap-cloud-sdk/odata-common/internal';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  testFilterBoolean,
  testFilterGuid,
  testFilterInt16,
  testFilterSingleLink,
  testFilterString,
  testFilterStringEncoding
} from '../../../../test-resources/test/test-util/filter-factory';
import { filterFunctions } from '../filter-functions';
import { oDataUri } from './odata-uri';

describe('getFilter', () => {
  it('for filter values with encoding', () => {
    expect(
      oDataUri.getFilter(testFilterStringEncoding.filter, TestEntity).filter
    ).toBe(encodeURIComponent(testFilterStringEncoding.odataStr));
  });

  it('for simple filters', () => {
    expect(
      oDataUri.getFilter(
        and(testFilterString.filter, testFilterBoolean.filter),
        TestEntity
      ).filter
    ).toBe(
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr})`
      )
    );
  });

  it('for simple unary filters', () => {
    expect(
      oDataUri.getFilter(not(testFilterString.filter), TestEntity).filter
    ).toBe(encodeURIComponent(`not (${testFilterString.odataStr})`));
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
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr}))`
      )
    );
  });

  it('for nested filters with and operator only', () => {
    expect(
      oDataUri.getFilter(
        and(
          and(testFilterString.filter, testFilterBoolean.filter),
          and(testFilterString.filter, testFilterInt16.filter)
        ),
        TestEntity
      ).filter
    ).toBe(
      encodeURIComponent(
        `((${testFilterString.odataStr} and ${testFilterBoolean.odataStr}) and (${testFilterString.odataStr} and ${testFilterInt16.odataStr}))`
      )
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
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr} or (${testFilterSingleLink.odataStr})))`
      )
    );
  });

  it('for nested unary filters', () => {
    expect(
      oDataUri.getFilter(
        not(
          and(
            testFilterString.filter,
            testFilterBoolean.filter,
            not(testFilterString.filter)
          )
        ),
        TestEntity
      ).filter
    ).toBe(
      encodeURIComponent(
        `not ((${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and not (${testFilterString.odataStr})))`
      )
    );
  });

  it('for guids', () => {
    expect(oDataUri.getFilter(testFilterGuid.filter, TestEntity).filter).toBe(
      encodeURIComponent(testFilterGuid.odataStr)
    );
  });

  it('for complex types', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("ComplexTypeProperty/StringProperty eq 'test'"));
  });
});

describe('getFilter for custom fields', () => {
  it('for custom string field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldString')
          .edmString()
          .notEquals('customFieldTest'),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("CustomFieldString ne 'customFieldTest'"));
  });

  it('for custom double field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldDouble')
          .edmDouble()
          .greaterOrEqual(13),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent('CustomFieldDouble ge 13D'));
  });

  it('for custom moment field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldDateTime')
          .edmDateTime()
          .equals(moment.utc('2015-12-31', 'YYYY-MM-DD')),
        TestEntity
      ).filter
    ).toBe(
      encodeURIComponent(
        "CustomFieldDateTime eq datetime'2015-12-31T00:00:00.000'"
      )
    );
  });

  it('for custom time field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldTime')
          .edmTime()
          .equals({ hours: 1, minutes: 1, seconds: 1 }),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("CustomFieldTime eq time'PT01H01M01S'"));
  });

  it('for custom boolean field', () => {
    expect(
      oDataUri.getFilter(
        TestEntity.customField('CustomFieldBoolean').edmBoolean().equals(true),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent('CustomFieldBoolean eq true'));
  });
});

describe('getFilter for filter functions', () => {
  it('for custom filter function', () => {
    const fn = filterFunction(
      'fn',
      'int',
      'str',
      1,
      TestEntity.DOUBLE_PROPERTY
    );
    expect(oDataUri.getFilter(fn.equals(1), TestEntity).filter).toBe(
      encodeURIComponent("fn('str',1,DoubleProperty) eq 1")
    );
  });

  it('for custom filter function with boolean filter function without eq/ne', () => {
    const fn = filterFunction('fn', 'boolean', 'str');
    expect(oDataUri.getFilter(fn, TestEntity).filter).toBe("fn('str')");
  });

  it('for custom nested filter function', () => {
    const fnNested = filterFunction('fnNested', 'boolean');
    const fn = filterFunction('fn', 'string', fnNested);
    expect(oDataUri.getFilter(fn.equals('test'), TestEntity).filter).toBe(
      encodeURIComponent("fn(fnNested()) eq 'test'")
    );
  });

  it('for custom filter function with date', () => {
    const date = moment.utc().year(2000).month(0).date(1).startOf('date');
    const dateFn = filterFunction('fn', 'int', date).equals(1);
    expect(oDataUri.getFilter(dateFn, TestEntity).filter).toEqual(
      encodeURIComponent("fn(datetimeoffset'2000-01-01T00:00:00.000Z') eq 1")
    );
  });

  it('for length filter function', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.length(TestEntity.STRING_PROPERTY).equals(3),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent('length(StringProperty) eq 3'));
  });

  it('for round filter function with default double', () => {
    expect(
      oDataUri.getFilter(filterFunctions.round(10.1).equals(3), TestEntity)
        .filter
    ).toBe(encodeURIComponent('round(10.1) eq 3D'));
  });

  it('for round filter function with decimal', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.round(10.1, 'decimal').equals(3),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent('round(10.1) eq 3M'));
  });

  it('for startsWith filter function with eq/ne', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.startsWith('string', 'str').equals(false),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("startswith('string','str') eq false"));
  });

  it('for startsWith filter function without eq/ne', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions.startsWith('string', 'str'),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("startswith('string','str')"));
  });

  it('for startsWith filter function with not operator with eq/ne', () => {
    expect(
      oDataUri.getFilter(
        not(filterFunctions.startsWith('string', 'str').equals(false)),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("not (startswith('string','str') eq false)"));
  });

  it('for startsWith filter function with not operator without eq/ne', () => {
    expect(
      oDataUri.getFilter(
        not(filterFunctions.startsWith('string', 'str')),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent("not (startswith('string','str'))"));
  });
});

describe('getEntityKeys', () => {
  it('should extract entity keys correctly', () => {
    const entity = TestEntity.builder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('987654321')
      .stringProperty('any')
      .build();

    const actual = oDataUri.getEntityKeys(entity, TestEntity);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString
    });
  });

  it('should encode entity keys correctly', () => {
    const entity = TestEntity.builder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('/')
      .build();

    const actual = oDataUri.getEntityKeys(entity, TestEntity);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: encodeURIComponent(entity.keyPropertyString)
    });
  });
});
