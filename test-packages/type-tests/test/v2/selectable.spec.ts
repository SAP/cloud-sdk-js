import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';
import { OneToOneLink } from '@sap-cloud-sdk/odata-common/internal';

const { testEntityApi, testEntitySingleLinkApi } = testService();

// $ExpectType OneToOneLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
new OneToOneLink(
  'TestEntitySingleLink',
  testEntityApi,
  testEntitySingleLinkApi
);

new OneToOneLink(
  'SomeWrongLink',
  testEntityApi,
  {} // $ExpectError
);
