/* eslint-disable no-unused-vars */
/* eslint-disable import/no-internal-modules */
import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectType } from 'tsd';
import { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi';
import { TestEntityLvl2MultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntityLvl2MultiLinkApi';
import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2';

const custom = {
  'Edm.Binary': {
    deserialize: (): number => 1,
    serialize: (): string => '1',
    serializeToUri: () => ''
  }
};

const deSerializer = mergeDefaultDeSerializersWith(custom);

const { testEntityApi } = testService(custom);

expectType<TestEntitySingleLinkApi<typeof deSerializer>>(
  testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi
);

expectType<TestEntityLvl2MultiLinkApi<typeof deSerializer>>(
  testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.TO_MULTI_LINK
    ._linkedEntityApi
);
