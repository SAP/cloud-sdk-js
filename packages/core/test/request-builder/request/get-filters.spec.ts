/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { and, or } from '../../../src';
import { getQueryParametersForFilter } from '../../../src/request-builder/request/get-filters';
import {
  testFilterBoolean,
  testFilterComplexType,
  testFilterCustomFieldBoolean,
  testFilterCustomFieldDateTime,
  testFilterCustomFieldDouble,
  testFilterCustomFieldString,
  testFilterCustomFieldTime,
  testFilterFunctionCustom,
  testFilterFunctionNested,
  testFilterFunctionSubstring,
  testFilterFunctionSubstringOf,
  testFilterGuid,
  testFilterInt16,
  testFilterSingleLink,
  testFilterString
} from '../../test-util/filter-factory';
import { TestEntity } from '../../test-util/test-services/test-service';

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
      getQueryParametersForFilter(testFilterComplexType.filter, TestEntity)
        .filter
    ).toBe(testFilterComplexType.odataStr);
  });

  it('for custom string field', () => {
    expect(
      getQueryParametersForFilter(
        testFilterCustomFieldString.filter,
        TestEntity
      ).filter
    ).toBe(testFilterCustomFieldString.odataStr);
  });

  it('for custom double field', () => {
    expect(
      getQueryParametersForFilter(
        testFilterCustomFieldDouble.filter,
        TestEntity
      ).filter
    ).toBe(testFilterCustomFieldDouble.odataStr);
  });

  it('for custom moment field', () => {
    expect(
      getQueryParametersForFilter(
        testFilterCustomFieldDateTime.filter,
        TestEntity
      ).filter
    ).toBe(testFilterCustomFieldDateTime.odataStr);
  });

  it('for custom time field', () => {
    expect(
      getQueryParametersForFilter(testFilterCustomFieldTime.filter, TestEntity)
        .filter
    ).toBe(testFilterCustomFieldTime.odataStr);
  });

  it('for custom boolean field', () => {
    expect(
      getQueryParametersForFilter(
        testFilterCustomFieldBoolean.filter,
        TestEntity
      ).filter
    ).toBe(testFilterCustomFieldBoolean.odataStr);
  });

  it('for filter function substringof', () => {
    expect(
      getQueryParametersForFilter(
        testFilterFunctionSubstringOf.filter,
        TestEntity
      ).filter
    ).toBe(testFilterFunctionSubstringOf.odataStr);
  });

  it('for filter function substring', () => {
    expect(
      getQueryParametersForFilter(
        testFilterFunctionSubstring.filter,
        TestEntity
      ).filter
    ).toBe(testFilterFunctionSubstring.odataStr);
  });

  it('for custom filter function', () => {
    expect(
      getQueryParametersForFilter(testFilterFunctionCustom.filter, TestEntity)
        .filter
    ).toBe(testFilterFunctionCustom.odataStr);
  });

  it('for filter function with navigation', () => {
    expect(
      getQueryParametersForFilter(testFilterFunctionNested.filter, TestEntity)
        .filter
    ).toBe(testFilterFunctionNested.odataStr);
  });
});
