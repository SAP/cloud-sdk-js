import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import {
  testFilterEnum,
  testFilterLambdaExpressionFilterFunctionOnLink,
  testFilterLambdaExpressionFilterLinkOnLink,
  testFilterLambdaExpressionFilterListOnLink,
  testFilterLambdaExpressionOnLink,
  testFilterLambdaExpressionWithOr,
  testFilterString,
  testFilterStringV4,
  testNestedFilterLambdaExpressionOnLink
} from '../../../../test-resources/test/test-util/filter-factory';
import { filterFunctions } from '../filter-functions';
import { filterFunction } from '../filter-function';
import { createODataUri } from './odata-uri';
import { testEntityApi } from '../../test/test-util';
import { defaultDeSerializers } from '../de-serializers';

const oDataUri = createODataUri(defaultDeSerializers);
const { getFilter } = oDataUri;

describe('getFilter', () => {
  it('for simple filters', () => {
    expect(getFilter(testFilterStringV4.filter, testEntityApi).filter).toBe(
      encodeURIComponent(`${testFilterString.odataStr}`)
    );
  });

  it('for enum filters', () => {
    expect(getFilter(testFilterEnum.filter, testEntityApi).filter).toBe(
      encodeURIComponent(`${testFilterEnum.odataStr}`)
    );
  });

  it('for lambda expression with simple filter on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionOnLink.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionOnLink.odataStr));
  });

  it('for lambda expression with or operand', () => {
    expect(
      getFilter(testFilterLambdaExpressionWithOr.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionWithOr.odataStr));
  });

  it('for lambda expression with FilterList on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionFilterListOnLink.filter, testEntityApi)
        .filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterListOnLink.odataStr)
    );
  });

  it('for lambda expression with FilterLink on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionFilterLinkOnLink.filter, testEntityApi)
        .filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterLinkOnLink.odataStr)
    );
  });

  it('for nested lambda expression on one-to-many navigation property', () => {
    expect(
      getFilter(testNestedFilterLambdaExpressionOnLink.filter, testEntityApi)
        .filter
    ).toBe(encodeURIComponent(testNestedFilterLambdaExpressionOnLink.odataStr));
  });

  it('for lambda expression with filter function on one-to-many navigation property', () => {
    expect(
      getFilter(
        testFilterLambdaExpressionFilterFunctionOnLink.filter,
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(
        testFilterLambdaExpressionFilterFunctionOnLink.odataStr
      )
    );
  });

  it('for hasSubset filter function with collection', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions
          .hasSubset(['1', '2'], testEntityApi.schema.COLLECTION_PROPERTY)
          .equals(true),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent("hassubset(['1','2'],CollectionProperty) eq true")
    );
  });

  it('for int collection filter function', () => {
    expect(
      oDataUri.getFilter(
        filterFunction('fn', 'int[]').equals([1, 2, 3]),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('fn() eq [1,2,3]'));
  });
});
