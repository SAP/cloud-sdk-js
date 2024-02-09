---
"@sap-cloud-sdk/openapi": patch
---

[Fixed Issue] Fix incorrect encoding of query parameters in OpenAPI requests. Query parameters (except for additional custom parameters) are now encoded by default. To change this behavior overwrite the `parameterEncoder` in the request options.
