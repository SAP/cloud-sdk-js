import { and, any } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntityMultiLink,
  TestEnumType
} from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType FilterList<TestEntity>
and(
  TestEntity.TO_MULTI_LINK.filter(
    any(TestEntityMultiLink.STRING_PROPERTY.equals('test'))
  )
);

// $ExpectType Filter<TestEntity, string>
TestEntity.ENUM_PROPERTY.equals('Member1');

// $ExpectType Filter<TestEntity, string>
TestEntity.ENUM_PROPERTY.equals(TestEnumType.Member1);

// $ExpectError
TestEntity.ENUM_PROPERTY.equals('string');

// $ExpectError
TestEntity.ENUM_PROPERTY.equals(1);
