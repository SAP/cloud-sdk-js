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
} from '../../../test/test-util/filter-factory';
import { TestEntity } from '../../../test/test-util/test-services/v4/test-service';
import { filterFunctions } from '../filter-functions';
import { filterFunction } from '../filter-function';
import { oDataUri } from './odata-uri';

const { getFilter } = oDataUri;

describe('getFilter', () => {
  it('for simple filters', () => {
    expect(getFilter(testFilterStringV4.filter, TestEntity).filter).toBe(
      encodeURIComponent(`${testFilterString.odataStr}`)
    );
  });

  it('for enum filters', () => {
    expect(getFilter(testFilterEnum.filter, TestEntity).filter).toBe(
      encodeURIComponent(`${testFilterEnum.odataStr}`)
    );
  });

  it('for lambda expression with simple filter on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionOnLink.filter, TestEntity).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionOnLink.odataStr));
  });

  it('for lambda expression with or operand', () => {
    expect(
      getFilter(testFilterLambdaExpressionWithOr.filter, TestEntity).filter
    ).toBe(encodeURIComponent(testFilterLambdaExpressionWithOr.odataStr));
  });

  it('for lambda expression with FilterList on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionFilterListOnLink.filter, TestEntity)
        .filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterListOnLink.odataStr)
    );
  });

  it('for lambda expression with FilterLink on one-to-many navigation property', () => {
    expect(
      getFilter(testFilterLambdaExpressionFilterLinkOnLink.filter, TestEntity)
        .filter
    ).toBe(
      encodeURIComponent(testFilterLambdaExpressionFilterLinkOnLink.odataStr)
    );
  });

  it('for nested lambda expression on one-to-many navigation property', () => {
    expect(
      getFilter(testNestedFilterLambdaExpressionOnLink.filter, TestEntity)
        .filter
    ).toBe(encodeURIComponent(testNestedFilterLambdaExpressionOnLink.odataStr));
  });

  it('for lambda expression with filter function on one-to-many navigation property', () => {
    expect(
      getFilter(
        testFilterLambdaExpressionFilterFunctionOnLink.filter,
        TestEntity
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
          .hasSubset(['1', '2'], TestEntity.COLLECTION_PROPERTY)
          .equals(true),
        TestEntity
      ).filter
    ).toBe(
      encodeURIComponent("hassubset(['1','2'], CollectionProperty) eq true")
    );
  });

  it('for int collection filter function', () => {
    expect(
      oDataUri.getFilter(
        filterFunction('fn', 'int[]').equals([1, 2, 3]),
        TestEntity
      ).filter
    ).toBe(encodeURIComponent('fn() eq [1,2,3]'));
  });
});
