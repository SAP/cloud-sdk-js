<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/util

This package contains general utility functions that we reuse multiple times in the SDK.
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

XXX I copy the generic part from the core readme here after review
