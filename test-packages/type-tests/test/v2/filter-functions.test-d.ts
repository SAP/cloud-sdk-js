import {
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import {
  filterFunctions,
  GetAllRequestBuilder,
  length,
  substring,
  substringOf
} from '@sap-cloud-sdk/odata-v2';
import { expectError, expectType } from 'tsd';
import {
  BooleanFilterFunction,
  EntityBase,
  Filter,
  NumberFilterFunction,
  StringFilterFunction
} from '@sap-cloud-sdk/odata-common';
import { AnyDeserializerV2, DefaultDeSerializerV2 } from '../duplicated-types';

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
expectType<Filter<TestEntity<AnyDeserializerV2>, any, string>>(filter);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityApi.requestBuilder().getAll().filter(filter));

expectError<any>(
  testEntitySingleLinkApi.requestBuilder().getAll().filter(filter)
);

expectError<any>(
  filterFunctions().substring(
    testEntitySingleLinkSchema.STRING_PROPERTY,
    testEntitySchema.STRING_PROPERTY
  )
);

expectType<Filter<TestEntity<AnyDeserializerV2>, any, number>>(
  filterFunctions().length(testEntitySchema.STRING_PROPERTY).greaterThan(1)
);

expectType<Filter<EntityBase, any, string>>(
  filterFunctions().substring('abcde', 1).greaterOrEqual('bcde')
);

expectType<Filter<TestEntity<AnyDeserializerV2>, any, number>>(
  filterFunctions().round(testEntitySchema.STRING_PROPERTY).greaterThan(1)
);

expectType<NumberFilterFunction<TestEntity<AnyDeserializerV2>>>(
  filterFunctions().day(testEntitySchema.STRING_PROPERTY)
);
