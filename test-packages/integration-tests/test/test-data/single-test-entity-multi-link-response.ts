export const singleTestEntityMultiLinkResponse = () => ({
  d: {
    __metadata: {
      id: "https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntityMultiLink(KeyProperty='keyProp')",
      uri: "https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntityMultiLink(KeyProperty='keyProp')",
      type: 'API_TEST_SRV.A_TestEntityMultiLinkType'
    },
    KeyProperty: 'keyProp',
    StringProperty: 'someString',
    BooleanProperty: true,
    GuidProperty: 'aaaabbbb-aaaa-bbbb-aaaa-bbbbaaaabbbb',
    Int16Property: 5748,
    to_MultiLink: {
      __deferred: {
        uri: "https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntityMultiLink(KeyProperty='keyProp')/to_MultiLink"
      }
    },
    to_SingleLink: {
      __deferred: {
        uri: "https://host:port/sap/opu/odata/sap/API_TEST_SRV/A_TestEntityMultiLink(KeyProperty='keyProp')/to_SingleLink"
      }
    }
  }
});
