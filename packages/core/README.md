<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/core

This package contains the core functionality of the SAP Cloud SDK as well as the Cloud Platform abstractions.

### Installation
```
$ npm install @sap-cloud-sdk/core
```

### Usage
The core is the heart of the SAP Cloud SDK and contains the functionality that is essential to every project powered by the SDK. Any OData client built by the SAP Cloud SDK, be it the VDM or clients built by the generator are using the core. We recommend to install this in addition to your clients.

Below is an example showing how you can build and execute your request with multiple filters by using an function called `and`.
```
import { and } from '@sap-cloud-sdk/core';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

// Build your filters
const firstNameFilter = BusinessPartner.FIRST_NAME.equals('firstName');
const lastNameFilter = BusinessPartner.LAST_NAME.equals('lastName');

// Execute your request with two filters
BusinessPartner.requestBuilder()
 .getAll()
 .filter(and(firstNameFilter, lastNameFilter))
 .execute(yourDestination);
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
