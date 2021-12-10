import {
  TestEntity,
  TestEntityApi,
  TestEntitySingleLink,
  TestEntitySingleLinkApi
} from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  filterFunctions,
  length,
  substring,
  substringOf
} from '@sap-cloud-sdk/odata-v2';

const testEntitySchema = new TestEntityApi().schema;
const testEntitySingleLinkSchema = new TestEntitySingleLinkApi().schema;

/* Backwards compatibility */

// $ExpectType StringFilterFunction<EntityBase>
substring('str', 1);

// $ExpectType BooleanFilterFunction<Entity>
substringOf('str', 'str');

// $ExpectType NumberFilterFunction<EntityBase>
length('str');

// $ExpectType Filter<TestEntity, string>
const filter = filterFunctions
  .substring(testEntitySchema.STRING_PROPERTY, testEntitySchema.INT_16_PROPERTY)
  .equals('test');

// $ExpectType GetAllRequestBuilder<TestEntity>
new TestEntityApi().requestBuilder().getAll().filter(filter);

// $ExpectError
new TestEntitySingleLinkApi().requestBuilder().getAll().filter(filter);

filterFunctions.substring(
  testEntitySingleLinkSchema.STRING_PROPERTY,
  testEntitySchema.STRING_PROPERTY // $ExpectError
);

// $ExpectType Filter<TestEntity, number>
filterFunctions.length(testEntitySchema.STRING_PROPERTY).greaterThan(1);

// $ExpectType Filter<TestEntity, number>
filterFunctions.round(testEntitySchema.STRING_PROPERTY).greaterThan(1);

// $ExpectType NumberFilterFunction<TestEntity>
filterFunctions.day(testEntitySchema.STRING_PROPERTY);
