import {TestEntity, testService} from '@sap-cloud-sdk/test-services-odata-v2/test-service/index';
import {
  filterFunctions, GetAllRequestBuilder,
  length,
  substring,
  substringOf
} from '@sap-cloud-sdk/odata-v2';
import {expectError, expectType} from "tsd";
import {
  BooleanFilterFunction,
  EntityBase, Filter,
  NumberFilterFunction,
  StringFilterFunction
} from "@sap-cloud-sdk/odata-common";
import {AnyDeserializer, DefaultDeSerializerV2} from "./batch.test-d";

const { testEntityApi, testEntitySingleLinkApi } = testService();
const testEntitySchema = testEntityApi.schema;
const testEntitySingleLinkSchema = testEntitySingleLinkApi.schema;

/* Backwards compatibility */
expectType<StringFilterFunction<EntityBase>>(substring('str', 1));

expectType<BooleanFilterFunction<EntityBase>>(substringOf('str', 'str'));

expectType<NumberFilterFunction<EntityBase>>(length('str'));

const filter = filterFunctions()
  .substring(testEntitySchema.STRING_PROPERTY, testEntitySchema.INT_16_PROPERTY)
  .equals('test');
expectType<Filter<TestEntity<AnyDeserializer>,any,string>>(filter)

expectType<GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>,DefaultDeSerializerV2>>(testEntityApi.requestBuilder().getAll().filter(filter));

expectError<any>(testEntitySingleLinkApi.requestBuilder().getAll().filter(filter));

expectError<any>(filterFunctions().substring(
  testEntitySingleLinkSchema.STRING_PROPERTY,
  testEntitySchema.STRING_PROPERTY
));

expectType<Filter<TestEntity<AnyDeserializer>,any,number>>(filterFunctions().length(testEntitySchema.STRING_PROPERTY).greaterThan(1));

expectType<Filter<EntityBase,any,string>>(filterFunctions().substring('abcde', 1).greaterOrEqual('bcde'));

expectType<Filter<TestEntity<AnyDeserializer>,any,number>>(filterFunctions().round(testEntitySchema.STRING_PROPERTY).greaterThan(1));

expectType<NumberFilterFunction<TestEntity<AnyDeserializer>>>(filterFunctions().day(testEntitySchema.STRING_PROPERTY));
