---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issue] Remove destination cache in `getDestinationFromServiceBinding()` function to let cached destinations retrieved in `getDestinationFromDestinationService()` function be added with `proxyConfiguration` property.
