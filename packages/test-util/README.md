<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/test-util

Package that contains utility functions for testing, like loading credentials or creating test destinations.

### Installation
```
$ npm install @sap-cloud-sdk/test-util
```

### Usage
The test-util package makes writing tests for your SAP Cloud Platform application more convenient.

For example, you can create a mock destination for your tests by using the function `mockTestDestination`.
```
import { mockTestDestination } from '@sap-cloud-sdk/util';
mockTestDestination('mockDestinationName');
```

You need to save your system information in local file `systems.json`:
```json
{
    "systems": [
        {
            "alias": "mockDestinationName",
            "uri": "https://www.example.com"
        }
    ]
}
```
and `credentials.json`:
```json
{
  "credentials": [
    {
      "alias": "SYS_001",
      "username": "username",
      "password": "password"
    }
  ]
}
```

### Documentation
[Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
[API documentation](https://sap.github.io/cloud-sdk/docs/js/api-reference-js-ts)

### Helpful Links

- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk/)
- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes on help.sap.com](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [Release notes on Github](https://github.com/SAP/cloud-sdk/releases)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
