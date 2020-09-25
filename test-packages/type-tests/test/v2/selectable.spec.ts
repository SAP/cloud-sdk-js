import { Entity, OneToOneLink } from '@sap-cloud-sdk/core';
import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';

// $ExpectType OneToOneLink<TestEntity, TestEntitySingleLink>
new OneToOneLink('TestEntitySingleLink', TestEntity, TestEntitySingleLink);

// $ExpectError
new OneToOneLink('SomeWrongLink', TestEntity, Entity);
