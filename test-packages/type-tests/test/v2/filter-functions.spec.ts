import {
  TestEntityApi,
  TestEntitySingleLinkApi,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';
import {
  filterFunctions,
  length,
  substring,
  substringOf
} from '@sap-cloud-sdk/odata-v2';

const testEntitySchema = testService().testEntityApi.schema;
const testEntitySingleLinkSchema = testService().testEntitySingleLinkApi.schema;

/* Backwards compatibility */

// $ExpectType StringFilterFunction<EntityBase>
substring('str', 1);

// $ExpectType BooleanFilterFunction<Entity>
substringOf('str', 'str');

// $ExpectType NumberFilterFunction<EntityBase>
length('str');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, any, string>
const filter = filterFunctions()
  .substring(testEntitySchema.STRING_PROPERTY, testEntitySchema.INT_16_PROPERTY)
  .equals('test');

// $ExpectType GetAllRequestBuilder<TestEntity<DefaultDeSerializers>, DefaultDeSerializers>
new TestEntityApi().requestBuilder().getAll().filter(filter);

// $ExpectError
new TestEntitySingleLinkApi().requestBuilder().getAll().filter(filter);

filterFunctions().substring(
  testEntitySingleLinkSchema.STRING_PROPERTY,
  testEntitySchema.STRING_PROPERTY // $ExpectError
);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, any, number>
filterFunctions().length(testEntitySchema.STRING_PROPERTY).greaterThan(1);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, any, number>
filterFunctions().round(testEntitySchema.STRING_PROPERTY).greaterThan(1);

// $ExpectType NumberFilterFunction<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>
filterFunctions().day(testEntitySchema.STRING_PROPERTY);
