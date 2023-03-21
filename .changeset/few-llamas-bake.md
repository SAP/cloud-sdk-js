---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issues] Remove `isHttpDestination` check when adding proxyConfiguration to the destination object. This fixes the `The proxy configuration is undefined` error for OnPrem `MAIL` destinations.
