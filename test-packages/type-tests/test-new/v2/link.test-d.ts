/* eslint-disable no-unused-vars */
import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service/index';
import {expectType} from "tsd";
import {TestEntitySingleLinkApi} from "@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi";
import {DefaultDeSerializerV2} from "./batch.test-d";
import {
  TestEntityLvl2MultiLinkApi
} from "@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntityLvl2MultiLinkApi";
import {mergeDefaultDeSerializersWith} from "@sap-cloud-sdk/odata-v2";

const custom = {
  'Edm.Binary': {
    deserialize: (): number => 1,
    serialize: (): string => '1',
    serializeToUri: () => ''
  }
};

const desirializer = mergeDefaultDeSerializersWith(custom)

const { testEntityApi } = testService(custom);

// $ExpectType TestEntitySingleLinkApi<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
expectType<TestEntitySingleLinkApi<typeof desirializer>>(testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi);

// $ExpectType TestEntityLvl2MultiLinkApi<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
expectType<TestEntityLvl2MultiLinkApi<typeof desirializer>>(testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.TO_MULTI_LINK
  ._linkedEntityApi);
