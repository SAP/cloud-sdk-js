---
'@sap-cloud-sdk/connectivity': minor
---

[Fixed Issue]: Fix destination caching for destinations from service bindings. The destinations are not cached repeatedly. The function `getDestinationFromServiceBinding()` returns `undefined` for destinations which have expired JWTs.
