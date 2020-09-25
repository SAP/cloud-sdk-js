import { testEntityKeyPropGuid, testEntityKeyPropString } from './keys';

export const testEntityCollectionResponse = () => ({
  d: {
    results: [
      {
        __metadata: {
          id: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
          uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
          type: 'API_TEST_SRV.A_TestEntityType'
        },
        KeyPropertyGuid: 'aaaabbbb-cccc-dddd-eeee-ffff00001111',
        KeyPropertyString: 'abcd1234',
        StringProperty: 'someString',
        BooleanProperty: false,
        GuidProperty: '11112222-3333-4444-5555-666677778888',
        Int16Property: 16,
        Int32Property: 543,
        Int64Property: '345',
        DecimalProperty: '264.5',
        SingleProperty: '42.4',
        DoubleProperty: '432.5',
        FloatProperty: null,
        TimeProperty: 'PT11H43M43S',
        DateTimeProperty: '/Date(1535932800000)/',
        DateTimeOffSetProperty: '/Date(1535932800000+1000)/',
        ByteProperty: null,
        SByteProperty: null,
        ComplexTypeProperty: {
          __metadata: {
            type: 'API_TEST_SRV.A_TestComplexType'
          },
          StringProperty: 'ctString',
          BooleanProperty: true,
          GuidProperty: '11112222-3333-4444-5555-666677778888',
          Int16Property: 16,
          Int32Property: 543,
          Int64Property: '345',
          DecimalProperty: '264.5',
          SingleProperty: '42.4',
          DoubleProperty: '432.5',
          FloatProperty: null,
          TimeProperty: 'PT11H43M43S',
          DateTimeProperty: '/Date(1535932800000)/',
          DateTimeOffSetProperty: '/Date(1535932800000+1000)/',
          ByteProperty: null,
          SByteProperty: null
        },
        to_MultiLink: {
          __deferred: {
            uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')/to_MultiLink`
          }
        },
        to_SingleLink: {
          __deferred: {
            uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')/to_SingleLink`
          }
        },
        to_OtherMultiLink: {
          __deferred: {
            uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')/to_OtherMultiLink`
          }
        }
      }
    ]
  }
});
