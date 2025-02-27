/* eslint-disable no-unused-vars */
import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectType } from 'tsd';
import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2';
import type { TestEntitySingleLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi';
import type { TestEntityLvl2MultiLinkApi } from '@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntityLvl2MultiLinkApi';

const custom = {
  'Edm.Binary': {
    deserialize: (): number => 1,
    serialize: (): string => '1',
    serializeToUri: () => ''
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deSerializer = mergeDefaultDeSerializersWith(custom);

const { testEntityApi } = testService(custom);

expectType<TestEntitySingleLinkApi<typeof deSerializer>>(
  testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi
);

expectType<TestEntityLvl2MultiLinkApi<typeof deSerializer>>(
  testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.TO_MULTI_LINK
    ._linkedEntityApi
);
