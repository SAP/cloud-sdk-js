import {
  TestEntity,
  TestEntityApi,
  TestEntityMultiLink,
  TestEntityMultiLinkApi,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { and, asc, desc, or } from '@sap-cloud-sdk/odata-common/internal';
import { DefaultDeSerializers } from '@sap-cloud-sdk/odata-v2';

const testEntityApi = new TestEntityApi();
const testEntityMultiLinkApi = new TestEntityMultiLinkApi();
const testEntitySchema = testEntityApi.schema;
const testEntityMultiLinkSchema = testEntityMultiLinkApi.schema;
const testEntityInstance = testEntityApi.entityBuilder().build();
const testMultiLinkInstance = testEntityMultiLinkApi.entityBuilder().build();

/**
 * REQUEST BUILDER
 */
// $ExpectType TestEntityRequestBuilder<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.requestBuilder();

/**
 * METHOD REQUEST BUILDERS
 */
// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const testEntityGetAllRequest = testEntityApi.requestBuilder().getAll();

// $ExpectType GetByKeyRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.requestBuilder().getByKey('uuid', 'test');

// $ExpectType CreateRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.requestBuilder().create(testEntityInstance);

// $ExpectType UpdateRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.requestBuilder().update(testEntityInstance);

// $ExpectError
testEntityApi.requestBuilder().create(testMultiLinkInstance);

// $ExpectError
testEntityApi.requestBuilder().update(testMultiLinkInstance);

/**
 * AsChildOf
 */
// $ExpectType CreateRequestBuilder<TestEntityMultiLink<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityMultiLinkApi
  .requestBuilder()
  .create(testMultiLinkInstance)
  .asChildOf(testEntityInstance, testEntitySchema.TO_MULTI_LINK);

testEntityMultiLinkApi
  .requestBuilder()
  .create(testMultiLinkInstance)
  .asChildOf(testEntityInstance, testEntitySchema.TO_OTHER_MULTI_LINK); // $ExpectError

testEntityMultiLinkApi
  .requestBuilder()
  .create(testMultiLinkInstance)
  .asChildOf(testMultiLinkInstance, testEntitySchema.TO_MULTI_LINK); // $ExpectError

/**
 * SELECTION
 */
// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityGetAllRequest.select(testEntitySchema.STRING_PROPERTY);

// $ExpectError
testEntityGetAllRequest.select(testEntityMultiLinkSchema.STRING_PROPERTY);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.select(testEntitySchema.customField('CustomField'));

// $ExpectError
testEntityGetAllRequest.select(
  testEntityMultiLinkSchema.customField('CustomField')
);

/**
 * SELECTION & EXPANSION
 */
// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.select(
  testEntitySchema.TO_MULTI_LINK.select(
    testEntityMultiLinkSchema.STRING_PROPERTY
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.select(
  testEntitySchema.TO_SINGLE_LINK.select(
    testEntityMultiLinkSchema.BOOLEAN_PROPERTY
  )
);

testEntityGetAllRequest.select(
  testEntitySchema.TO_MULTI_LINK.select(
    testEntitySchema.KEY_PROPERTY_GUID // $ExpectError
  )
);

/**
 * FILTER
 */
// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(testEntitySchema.STRING_PROPERTY.equals('test'));

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  testEntitySchema.STRING_PROPERTY.equals('test'),
  testEntitySchema.BOOLEAN_PROPERTY.notEquals(false)
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  and(
    testEntitySchema.STRING_PROPERTY.equals('test'),
    testEntitySchema.BOOLEAN_PROPERTY.notEquals(true)
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  or(
    testEntitySchema.STRING_PROPERTY.equals('test'),
    testEntitySchema.BOOLEAN_PROPERTY.notEquals(false)
  )
);

testEntityGetAllRequest.filter(
  testEntityMultiLinkSchema.STRING_PROPERTY.equals('test') // $ExpectError
);

testEntityGetAllRequest.filter(
  and(testEntitySchema.STRING_PROPERTY.equals('test')) // $ExpectError
);

testEntityGetAllRequest.filter(
  or(testEntityMultiLinkSchema.STRING_PROPERTY.equals('test')) // $ExpectError
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  testEntitySchema.customField('SomeCustomField').edmString().equals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  testEntitySchema.customField('SomeCustomField').edmDouble().equals(1234)
);

// $ExpectType GetAllRequestBuilder<TestEntity>
testEntityGetAllRequest.filter(
  testEntitySchema
    .customField('SomeCustomField')
    .edmTime()
    .equals({ seconds: 1, minutes: 1, hours: 1 })
);

testEntitySchema.customField('SomeCustomField').edmString().equals(13214); // $ExpectError

testEntitySchema.customField('SomeCustomField').edmDouble().equals('aString'); // $ExpectError

/**
 * ORDER BY
 */
// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityGetAllRequest.orderBy(asc(testEntitySchema.STRING_PROPERTY));

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityGetAllRequest.orderBy(desc(testEntitySchema.STRING_PROPERTY));

// $ExpectType  GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityGetAllRequest.orderBy(
  asc(testEntitySchema.STRING_PROPERTY),
  desc(testEntitySchema.STRING_PROPERTY)
);

testEntityGetAllRequest.orderBy(
  asc(testEntityMultiLinkSchema.STRING_PROPERTY) // $ExpectError
);
