import {
  TestEntity,
  TestEntityApi,
  TestEntitySingleLink,
  TestEntitySingleLinkApi
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { OneToOneLink, EntityApi } from '@sap-cloud-sdk/odata-common/internal';

// $ExpectType OneToOneLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLink<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
new OneToOneLink(
  'TestEntitySingleLink',
  new TestEntityApi(),
  new TestEntitySingleLinkApi()
);

// $ExpectError
new OneToOneLink(
  'SomeWrongLink',
  new TestEntityApi(),
  {} as EntityApi<any, any>
);
