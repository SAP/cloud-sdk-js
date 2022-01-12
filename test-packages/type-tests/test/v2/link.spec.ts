/* eslint-disable no-unused-vars */
import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';

const custom = {
  'Edm.Binary': {
    deserialize: (val: string): number => 1,
    serialize: (val: number): string => '1',
    serializeToUri: () => ''
  }
};

const { testEntityApi } = testService(custom);

// $ExpectType TestEntitySingleLinkApi<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi;

// $ExpectType TestEntityLvl2MultiLinkApi<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityApi.schema.TO_SINGLE_LINK._linkedEntityApi.schema.TO_MULTI_LINK
  ._linkedEntityApi;
