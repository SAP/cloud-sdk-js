---
'@sap-cloud-sdk/connectivity': minor
---

[Fixed Issue] Fix `getDestination()` to allow passing an async transform function for a service binding in the `options`. It also enables passing the transform function as a part of the `DestinationOrFetchOptions`, which is required by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
