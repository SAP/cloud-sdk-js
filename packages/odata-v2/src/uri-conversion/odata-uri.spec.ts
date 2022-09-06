import moment from 'moment';
import { v4 as uuid } from 'uuid';
import {
  and,
  filterFunction,
  not,
  or
} from '@sap-cloud-sdk/odata-common/internal';
import {
  testFilterBoolean,
  testFilterGuid,
  testFilterInt16,
  testFilterSingleLink,
  testFilterString,
  testFilterStringEncoding,
  testEntityApi,
  testEntityApiCustom,
  testFilterStringCustom,
  testFilterSingleLinkCustom
} from '../../test/test-util';
import { filterFunctions } from '../filter-functions';
import {
  defaultDeSerializers,
  mergeDefaultDeSerializersWith
} from '../de-serializers';
import { customTestDeSerializers } from '../../../../test-resources/test/test-util/custom-de-serializers';
import { createODataUri } from './odata-uri';

const oDataUri = createODataUri(defaultDeSerializers);

describe('getFilter', () => {
  it('transforms filter values with encoding to string', () => {
    expect(
      oDataUri.getFilter(testFilterStringEncoding.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterStringEncoding.odataStr));
  });

  it('transforms simple filters to string', () => {
    expect(
      oDataUri.getFilter(
        and(testFilterString.filter, testFilterBoolean.filter),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr})`
      )
    );
  });

  it('transforms simple unary filters to string', () => {
    expect(
      oDataUri.getFilter(not(testFilterString.filter), testEntityApi).filter
    ).toBe(encodeURIComponent(`not (${testFilterString.odataStr})`));
  });

  it('transforms nested filters to string', () => {
    expect(
      oDataUri.getFilter(
        and(
          testFilterString.filter,
          testFilterBoolean.filter,
          or(testFilterString.filter, testFilterInt16.filter)
        ),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr}))`
      )
    );
  });

  it("transforms nested filters with 'and' operator only to string", () => {
    expect(
      oDataUri.getFilter(
        and(
          and(testFilterString.filter, testFilterBoolean.filter),
          and(testFilterString.filter, testFilterInt16.filter)
        ),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        `((${testFilterString.odataStr} and ${testFilterBoolean.odataStr}) and (${testFilterString.odataStr} and ${testFilterInt16.odataStr}))`
      )
    );
  });

  it('transforms nested multidimensional filters to string', () => {
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
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        `(${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and (${testFilterString.odataStr} or ${testFilterInt16.odataStr} or (${testFilterSingleLink.odataStr})))`
      )
    );
  });

  it('transforms nested unary filters to string', () => {
    expect(
      oDataUri.getFilter(
        not(
          and(
            testFilterString.filter,
            testFilterBoolean.filter,
            not(testFilterString.filter)
          )
        ),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        `not ((${testFilterString.odataStr} and ${testFilterBoolean.odataStr} and not (${testFilterString.odataStr})))`
      )
    );
  });

  it('transforms guids to string', () => {
    expect(
      oDataUri.getFilter(testFilterGuid.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterGuid.odataStr));
  });

  it('transforms complex types to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi.schema.COMPLEX_TYPE_PROPERTY.stringProperty.equals(
          'test'
        ),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("ComplexTypeProperty/StringProperty eq 'test'"));
  });
});

describe('getFilter for custom fields', () => {
  it('transforms custom string field to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi
          .customField('CustomFieldString')
          .edmString()
          .notEquals('customFieldTest'),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("CustomFieldString ne 'customFieldTest'"));
  });

  it('transforms custom double field to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi
          .customField('CustomFieldDouble')
          .edmDouble()
          .greaterOrEqual(13),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('CustomFieldDouble ge 13D'));
  });

  it('transforms custom moment field to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi
          .customField('CustomFieldDateTime')
          .edmDateTime()
          .equals(moment.utc('2015-12-31', 'YYYY-MM-DD')),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        "CustomFieldDateTime eq datetime'2015-12-31T00:00:00.000'"
      )
    );
  });

  it('transforms custom time field to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi
          .customField('CustomFieldTime')
          .edmTime()
          .equals({ hours: 1, minutes: 1, seconds: 1 }),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("CustomFieldTime eq time'PT01H01M01S'"));
  });

  it('transforms custom boolean field to string', () => {
    expect(
      oDataUri.getFilter(
        testEntityApi
          .customField('CustomFieldBoolean')
          .edmBoolean()
          .equals(true),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('CustomFieldBoolean eq true'));
  });
});

describe('getFilter for filter functions', () => {
  it('transforms custom filter function to string', () => {
    const fn = filterFunction(
      'fn',
      'int',
      'str',
      1,
      testEntityApi.schema.DOUBLE_PROPERTY
    );
    expect(oDataUri.getFilter(fn.equals(1), testEntityApi).filter).toBe(
      encodeURIComponent("fn('str',1,DoubleProperty) eq 1")
    );
  });

  it('transforms custom filter function with boolean filter function without eq/ne to string', () => {
    const fn = filterFunction('fn', 'boolean', 'str');
    expect(oDataUri.getFilter(fn, testEntityApi).filter).toBe("fn('str')");
  });

  it('transforms custom nested filter function to string', () => {
    const fnNested = filterFunction('fnNested', 'boolean');
    const fn = filterFunction('fn', 'string', fnNested);
    expect(oDataUri.getFilter(fn.equals('test'), testEntityApi).filter).toBe(
      encodeURIComponent("fn(fnNested()) eq 'test'")
    );
  });

  it('transforms custom filter function with date to string', () => {
    const date = moment.utc().year(2000).month(0).date(1).startOf('date');
    const dateFn = filterFunction('fn', 'int', date).equals(1);
    expect(oDataUri.getFilter(dateFn, testEntityApi).filter).toEqual(
      encodeURIComponent("fn(datetimeoffset'2000-01-01T00:00:00.000Z') eq 1")
    );
  });

  it('transforms length filter function to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions()
          .length(testEntityApi.schema.STRING_PROPERTY)
          .equals(3),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('length(StringProperty) eq 3'));
  });

  it('transforms round filter function with default double to string', () => {
    expect(
      oDataUri.getFilter(filterFunctions().round(10.1).equals(3), testEntityApi)
        .filter
    ).toBe(encodeURIComponent('round(10.1) eq 3D'));
  });

  it('transforms round filter function with decimal to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions().round(10.1, 'decimal').equals(3),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('round(10.1) eq 3M'));
  });

  it('transforms startsWith filter function with eq/ne to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions().startsWith('string', 'str').equals(false),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("startswith('string','str') eq false"));
  });

  it('transforms startsWith filter function without eq/ne to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions().startsWith('string', 'str'),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("startswith('string','str')"));
  });

  it('transforms startsWith filter function with not operator with eq/ne to string', () => {
    expect(
      oDataUri.getFilter(
        not(filterFunctions().startsWith('string', 'str').equals(false)),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("not (startswith('string','str') eq false)"));
  });

  it('transforms startsWith filter function with not operator without eq/ne to string', () => {
    expect(
      oDataUri.getFilter(
        not(filterFunctions().startsWith('string', 'str')),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent("not (startswith('string','str'))"));
  });
});

describe('getFilter for custom (de-)serializers', () => {
  const oDataUriCustom = createODataUri(
    mergeDefaultDeSerializersWith(customTestDeSerializers)
  );

  it('transforms simple filter to string', () => {
    expect(
      oDataUriCustom.getFilter(
        testFilterStringCustom.filter,
        testEntityApiCustom
      ).filter
    ).toBe(encodeURIComponent(testFilterStringCustom.odataStr));
  });

  it('transforms linked filter to string', () => {
    expect(
      oDataUriCustom.getFilter(
        testFilterSingleLinkCustom.filter,
        testEntityApiCustom
      ).filter
    ).toBe(`(${encodeURIComponent(testFilterSingleLinkCustom.odataStr)})`);
  });
});

describe('getEntityKeys', () => {
  it('should extract entity keys correctly', () => {
    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('987654321')
      .stringProperty('any')
      .build();

    const actual = oDataUri.getEntityKeys(entity, testEntityApi);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: entity.keyPropertyString
    });
  });

  it('should encode entity keys correctly', () => {
    const entity = testEntityApi
      .entityBuilder()
      .keyPropertyGuid(uuid())
      .keyPropertyString('/')
      .build();

    const actual = oDataUri.getEntityKeys(entity, testEntityApi);

    expect(actual).toEqual({
      KeyPropertyGuid: entity.keyPropertyGuid,
      KeyPropertyString: encodeURIComponent(entity.keyPropertyString)
    });
  });
});
