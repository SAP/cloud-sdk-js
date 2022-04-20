import { testEntityKeyPropGuid, testEntityKeyPropString } from './keys';

export const singleTestEntityWrappedByFunctionNameResponse = () => ({
  d: {
    __metadata: {
      id: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
      uri: `https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'${testEntityKeyPropGuid}',KeyPropertyString='${testEntityKeyPropString}')`,
      type: 'API_TEST_SRV.A_TestEntityType'
    },
    TestFunctionImportComplexReturnType: {
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
      }
    }
  }
});
