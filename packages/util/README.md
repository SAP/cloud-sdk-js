<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/util

Package that contains general utility functions that we reuse multiple times in the SDK.
While primarily designed for internal usage, they might also be beneficial for consumers of the SDK.

### Installation
```
$ npm install @sap-cloud-sdk/util
```

### Usage
The util package collects useful tools that help build your SAP Cloud Platform application.
For example, the following code snippet changes the log level of the destination accessor of the SDK.
```
import { setLogLevel } from '@sap-cloud-sdk/util';
setLogLevel('debug', 'destination-accessor');
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
