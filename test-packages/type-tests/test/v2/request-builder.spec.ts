import { and, asc, desc, or } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
/**
 * REQUEST BUILDER
 */
// $ExpectType TestEntityRequestBuilder
TestEntity.requestBuilder();

/**
 * METHOD REQUEST BUILDERS
 */
// $ExpectType GetAllRequestBuilderV2<TestEntity>
const testEntityGetAllRequest = TestEntity.requestBuilder().getAll();

// $ExpectType GetByKeyRequestBuilderV2<TestEntity>
TestEntity.requestBuilder().getByKey('uuid', 'test');

// $ExpectType CreateRequestBuilderV2<TestEntity>
TestEntity.requestBuilder().create(new TestEntity());

// $ExpectType UpdateRequestBuilderV2<TestEntity>
TestEntity.requestBuilder().update(new TestEntity());

// $ExpectError
TestEntity.requestBuilder().create(new TestEntityMultiLink());

// $ExpectError
TestEntity.requestBuilder().update(new TestEntityMultiLink());

/**
 * AsChildOf
 */
// $ExpectType CreateRequestBuilderV2<TestEntityMultiLink>
TestEntityMultiLink.requestBuilder()
  .create(new TestEntityMultiLink())
  .asChildOf(new TestEntity(), TestEntity.TO_MULTI_LINK);

TestEntityMultiLink.requestBuilder()
  .create(new TestEntityMultiLink())
  .asChildOf(new TestEntity(), TestEntity.TO_OTHER_MULTI_LINK); // $ExpectError

TestEntityMultiLink.requestBuilder()
  .create(new TestEntityMultiLink())
  .asChildOf(new TestEntityMultiLink(), TestEntity.TO_MULTI_LINK); // $ExpectError

/**
 * SELECTION
 */
// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.select(TestEntity.STRING_PROPERTY);

// $ExpectError
testEntityGetAllRequest.select(TestEntityMultiLink.STRING_PROPERTY);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.select(TestEntity.customField('CustomField'));

// $ExpectError
testEntityGetAllRequest.select(TestEntityMultiLink.customField('CustomField'));

/**
 * SELECTION & EXPANSION
 */
// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.select(
  TestEntity.TO_MULTI_LINK.select(TestEntityMultiLink.STRING_PROPERTY)
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.select(
  TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.BOOLEAN_PROPERTY)
);

testEntityGetAllRequest.select(
  TestEntity.TO_MULTI_LINK.select(
    TestEntity.KEY_PROPERTY_GUID // $ExpectError
  )
);

/**
 * FILTER
 */
// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(TestEntity.STRING_PROPERTY.equals('test'));

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  TestEntity.STRING_PROPERTY.equals('test'),
  TestEntity.BOOLEAN_PROPERTY.notEquals(false)
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  and(
    TestEntity.STRING_PROPERTY.equals('test'),
    TestEntity.BOOLEAN_PROPERTY.notEquals(true)
  )
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  or(
    TestEntity.STRING_PROPERTY.equals('test'),
    TestEntity.BOOLEAN_PROPERTY.notEquals(false)
  )
);

testEntityGetAllRequest.filter(
  TestEntityMultiLink.STRING_PROPERTY.equals('test') // $ExpectError
);

testEntityGetAllRequest.filter(
  and(TestEntityMultiLink.STRING_PROPERTY.equals('test')) // $ExpectError
);

testEntityGetAllRequest.filter(
  or(TestEntityMultiLink.STRING_PROPERTY.equals('test')) // $ExpectError
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  TestEntity.customField('SomeCustomField').edmString().equals('test')
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  TestEntity.customField('SomeCustomField').edmDouble().equals(1234)
);

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.filter(
  TestEntity.customField('SomeCustomField')
    .edmTime()
    .equals({ seconds: 1, minutes: 1, hours: 1 })
);

TestEntity.customField('SomeCustomField').edmString().equals(13214); // $ExpectError

TestEntity.customField('SomeCustomField').edmDouble().equals('aString'); // $ExpectError

/**
 * ORDER BY
 */
// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.orderBy(asc(TestEntity.STRING_PROPERTY));

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.orderBy(desc(TestEntity.STRING_PROPERTY));

// $ExpectType GetAllRequestBuilderV2<TestEntity>
testEntityGetAllRequest.orderBy(
  asc(TestEntity.STRING_PROPERTY),
  desc(TestEntity.STRING_PROPERTY)
);

testEntityGetAllRequest.orderBy(
  asc(TestEntityMultiLink.STRING_PROPERTY) // $ExpectError
);
