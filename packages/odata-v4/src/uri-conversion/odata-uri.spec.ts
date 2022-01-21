import {
  testFilterEnum,
  testFilterLambdaExpressionFilterFunctionOnLink,
  testFilterLambdaExpressionFilterLinkOnLink,
  testFilterLambdaExpressionFilterListOnLink,
  testFilterLambdaExpressionOnLink,
  testFilterLambdaExpressionWithOr,
  testFilterString,
  testNestedFilterLambdaExpressionOnLink,
  testEntityApiCustom,
  testFilterLambdaExpressionCustom,
  testEntityApi
} from '../../test/test-util';
import { customTestDeSerializers } from '../../../../test-resources/test/test-util/custom-de-serializers';
import { filterFunctions } from '../filter-functions';
import { filterFunction } from '../filter-function';
import {
  defaultDeSerializers,
  mergeDefaultDeSerializersWith
} from '../de-serializers';
import { createODataUri } from './odata-uri';

describe('getFilter', () => {
  const oDataUri = createODataUri(defaultDeSerializers);
  const { getFilter } = oDataUri;
  it('transforms simple filters to string', () => {
    expect(getFilter(testFilterString.filter, testEntityApi).filter).toBe(
      encodeURIComponent(`${testFilterString.odataStr}`)
    );
  });

  it('transforms enum filters to string', () => {
    expect(getFilter(testFilterEnum.filter, testEntityApi).filter).toBe(
      encodeURIComponent(`${testFilterEnum.odataStr}`)
    );
  });

  it('transforms lambda expression with simple filter on one-to-many navigation property to string', () => {
    expect(
      getFilter(testFilterLambdaExpressionOnLink.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionOnLink.odataStr));
  });

  it('transforms lambda expression with or operand to string', () => {
    expect(
      getFilter(testFilterLambdaExpressionWithOr.filter, testEntityApi).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionWithOr.odataStr));
  });

  it('transforms lambda expression with FilterList on one-to-many navigation property to string', () => {
    expect(
      getFilter(
        testFilterLambdaExpressionFilterListOnLink.filter,
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterListOnLink.odataStr)
    );
  });

  it('transforms lambda expression with FilterLink on one-to-many navigation property to string', () => {
    expect(
      getFilter(
        testFilterLambdaExpressionFilterLinkOnLink.filter,
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterLinkOnLink.odataStr)
    );
  });

  it('transforms nested lambda expression on one-to-many navigation property to string', () => {
    expect(
      getFilter(testNestedFilterLambdaExpressionOnLink.filter, testEntityApi)
        .filter
    ).toBe(encodeURIComponent(testNestedFilterLambdaExpressionOnLink.odataStr));
  });

  it('transforms lambda expression with filter function on one-to-many navigation property to string', () => {
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

  it('transforms hasSubset filter function with collection to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunctions()
          .hasSubset(['1', '2'], testEntityApi.schema.COLLECTION_PROPERTY)
          .equals(true),
        testEntityApi
      ).filter
    ).toBe(
      encodeURIComponent("hassubset(['1','2'],CollectionProperty) eq true")
    );
  });

  it('transforms int collection filter function to string', () => {
    expect(
      oDataUri.getFilter(
        filterFunction('fn', 'int[]').equals([1, 2, 3]),
        testEntityApi
      ).filter
    ).toBe(encodeURIComponent('fn() eq [1,2,3]'));
  });
});

describe('getFilter for custom (de-)serializers', () => {
  const { getFilter } = createODataUri(
    mergeDefaultDeSerializersWith(customTestDeSerializers)
  );

  it('transforms lambda expression to string', () => {
    expect(
      getFilter(testFilterLambdaExpressionCustom.filter, testEntityApiCustom)
        .filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionCustom.odataStr));
  });
});
