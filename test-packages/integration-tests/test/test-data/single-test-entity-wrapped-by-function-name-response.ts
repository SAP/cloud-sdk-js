import { testEntityKeyPropGuid, testEntityKeyPropString } from './keys';

export const singleTestEntityWrappedByFunctionNameResponse = () => ({
  d: {
    __metadata: {
      id: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
      uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
      type: 'API_TEST_SRV.A_TestEntityType'
    },
    TestFunctionImportEdmReturnType: {
      __metadata: {},
      TestFunctionImportEdmReturnType: false,
      KeyPropertyGuid: 'aaaabbbb-cccc-dddd-eeee-ffff00001111'
    },
    to_MultiLink: {
      __deferred: {
        uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')/to_MultiLink`
      }
    }
  }
});
