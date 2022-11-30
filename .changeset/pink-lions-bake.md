---
'@sap-cloud-sdk/http-client': patch
'@sap-cloud-sdk/odata-common': patch
'@sap-cloud-sdk/openapi': patch
---


- [Compatibility Note] Remove `timeout()`  method from the request builders and the `timeout` options from the `executeHttpRequest()` function.
Use the `timeout` middleware instead.
