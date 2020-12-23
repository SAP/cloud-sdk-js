import {
  substring,
  length,
  filterFunctionsV2,
  substringOf
} from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';

/* Backwards compatibility */

// $ExpectType StringFilterFunction<Entity>
substring('str', 1);

// $ExpectType BooleanFilterFunction<Entity>
substringOf('str', 'str');

// $ExpectType NumberFilterFunction<Entity>
length('str');

// $ExpectType Filter<TestEntity, string>
const filter = filterFunctionsV2
  .substring(TestEntity.STRING_PROPERTY, TestEntity.INT_16_PROPERTY)
  .equals('test');

// $ExpectType GetAllRequestBuilderV2<TestEntity>
TestEntity.requestBuilder().getAll().filter(filter);

// $ExpectError
TestEntitySingleLink.requestBuilder().getAll().filter(filter);

filterFunctionsV2.substring(
  TestEntitySingleLink.STRING_PROPERTY,
  TestEntity.STRING_PROPERTY // $ExpectError
);

// $ExpectType Filter<TestEntity, number>
filterFunctionsV2.length(TestEntity.STRING_PROPERTY).greaterThan(1);

// $ExpectType Filter<TestEntity, number>
filterFunctionsV2.round(TestEntity.STRING_PROPERTY).greaterThan(1);

// $ExpectType NumberFilterFunction<TestEntity>
filterFunctionsV2.day(TestEntity.STRING_PROPERTY);
