import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { OneToOneLink } from '@sap-cloud-sdk/odata-common';
import { expectError, expectType } from 'tsd';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import type { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi';
import type { DefaultDeSerializerV2 } from '../duplicated-types';

const { testEntityApi, testEntitySingleLinkApi } = testService();

expectType<
  OneToOneLink<
    TestEntity<DefaultDeSerializerV2>,
    DefaultDeSerializerV2,
    TestEntitySingleLinkApi<DefaultDeSerializerV2>
  >
>(
  new OneToOneLink(
    'TestEntitySingleLink',
    testEntityApi,
    testEntitySingleLinkApi
  )
);

expectError<any>(new OneToOneLink('SomeWrongLink', testEntityApi, {}));
