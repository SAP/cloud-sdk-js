<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/test-util

This package contains utility functions for testing, like loading credentials or creating test destinations.

## Installation
```
$ npm install @sap-cloud-sdk/test-util
```

## Usage
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


XXX I copy the generic part from the core readme here after review
