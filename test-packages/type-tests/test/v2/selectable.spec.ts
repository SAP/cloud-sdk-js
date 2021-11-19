import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { OneToOneLink } from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '@sap-cloud-sdk/odata-v2';

// $ExpectType OneToOneLink<TestEntity, TestEntitySingleLink>
new OneToOneLink('TestEntitySingleLink', TestEntity, TestEntitySingleLink);

// $ExpectError
new OneToOneLink('SomeWrongLink', TestEntity, Entity);
