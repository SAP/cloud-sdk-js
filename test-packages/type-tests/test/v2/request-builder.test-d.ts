import {
  TestEntity,
  TestEntityMultiLink,
  TestEntityRequestBuilder,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { and, asc, desc, or } from '@sap-cloud-sdk/odata-common';
import { expectError, expectType } from 'tsd';
import {
  CreateRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { DefaultDeSerializerV2 } from '../duplicated-types';

const { testEntityApi, testEntityMultiLinkApi } = testService();

const testEntitySchema = testEntityApi.schema;
const testEntityMultiLinkSchema = testEntityMultiLinkApi.schema;
const testEntityInstance = testEntityApi.entityBuilder().build();
const testMultiLinkInstance = testEntityMultiLinkApi.entityBuilder().build();

/**
 * REQUEST BUILDER.
 */
expectType<TestEntityRequestBuilder<DefaultDeSerializerV2>>(
  testEntityApi.requestBuilder()
);

/**
 * METHOD REQUEST BUILDERS.
 */
const testEntityGetAllRequest = testEntityApi.requestBuilder().getAll();
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityGetAllRequest);

expectType<
  GetByKeyRequestBuilder<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2
  >
>(testEntityApi.requestBuilder().getByKey('uuid', 'test'));

expectType<
  CreateRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityApi.requestBuilder().create(testEntityInstance));

expectType<
  UpdateRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityApi.requestBuilder().update(testEntityInstance));

expectError<any>(testEntityApi.requestBuilder().create(testMultiLinkInstance));

expectError<any>(testEntityApi.requestBuilder().update(testMultiLinkInstance));

/**
 * AsChildOf.
 */
expectType<
  CreateRequestBuilder<
    TestEntityMultiLink<DefaultDeSerializerV2>,
    DefaultDeSerializerV2
  >
>(
  testEntityMultiLinkApi
    .requestBuilder()
    .create(testMultiLinkInstance)
    .asChildOf(testEntityInstance, testEntitySchema.TO_MULTI_LINK)
);

expectError<any>(
  testEntityMultiLinkApi
    .requestBuilder()
    .create(testMultiLinkInstance)
    .asChildOf(testEntityInstance, testEntitySchema.TO_OTHER_MULTI_LINK)
);

expectError<any>(
  testEntityMultiLinkApi
    .requestBuilder()
    .create(testMultiLinkInstance)
    .asChildOf(testMultiLinkInstance, testEntitySchema.TO_MULTI_LINK)
);

/**
 * SELECTION.
 */
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityGetAllRequest.select(testEntitySchema.STRING_PROPERTY));

expectError<any>(
  testEntityGetAllRequest.select(testEntityMultiLinkSchema.STRING_PROPERTY)
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityGetAllRequest.select(testEntityApi.customField('CustomField')));

expectError<any>(
  testEntityGetAllRequest.select(
    testEntityMultiLinkApi.customField('CustomField')
  )
);

/**
 * SELECTION & EXPANSION.
 */
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.select(
    testEntitySchema.TO_MULTI_LINK.select(
      testEntityMultiLinkSchema.STRING_PROPERTY
    )
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.select(
    testEntitySchema.TO_SINGLE_LINK.select(
      testEntityMultiLinkSchema.BOOLEAN_PROPERTY
    )
  )
);

expectError<any>(
  testEntityGetAllRequest.select(
    testEntitySchema.TO_MULTI_LINK.select(testEntitySchema.KEY_PROPERTY_GUID)
  )
);

/**
 * FILTER.
 */
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    testEntitySchema.STRING_PROPERTY.equals('test')
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    testEntitySchema.STRING_PROPERTY.equals('test'),
    testEntitySchema.BOOLEAN_PROPERTY.notEquals(false)
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    and(
      testEntitySchema.STRING_PROPERTY.equals('test'),
      testEntitySchema.BOOLEAN_PROPERTY.notEquals(true)
    )
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    or(
      testEntitySchema.STRING_PROPERTY.equals('test'),
      testEntitySchema.BOOLEAN_PROPERTY.notEquals(false)
    )
  )
);

expectError<any>(
  testEntityGetAllRequest.filter(
    testEntityMultiLinkSchema.STRING_PROPERTY.equals('test')
  )
);

expectError<any>(
  testEntityGetAllRequest.filter(
    and(testEntityMultiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

expectError<any>(
  testEntityGetAllRequest.filter(
    or(testEntityMultiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    testEntityApi.customField('SomeCustomField').edmString().equals('test')
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    testEntityApi.customField('SomeCustomField').edmDouble().equals(1234)
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.filter(
    testEntityApi
      .customField('SomeCustomField')
      .edmTime()
      .equals({ seconds: 1, minutes: 1, hours: 1 })
  )
);

expectError<any>(
  testEntitySchema.customField('SomeCustomField').edmString().equals(13214)
);

expectError<any>(
  testEntitySchema.customField('SomeCustomField').edmDouble().equals('aString')
);

/**
 * ORDER BY.
 */
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityGetAllRequest.orderBy(asc(testEntitySchema.STRING_PROPERTY)));

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(testEntityGetAllRequest.orderBy(desc(testEntitySchema.STRING_PROPERTY)));

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  testEntityGetAllRequest.orderBy(
    asc(testEntitySchema.STRING_PROPERTY),
    desc(testEntitySchema.STRING_PROPERTY)
  )
);

expectError<any>(
  testEntityGetAllRequest.orderBy(
    asc(testEntityMultiLinkSchema.STRING_PROPERTY)
  )
);
