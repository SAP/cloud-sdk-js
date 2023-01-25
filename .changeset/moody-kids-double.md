---
'@sap-cloud-sdk/http-client': minor
'@sap-cloud-sdk/resilience': minor
---

[New Functionality] The request configuration used in the final request is now part of the middleware context.
User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
The request configuration contains the `url`, `headers` and all other properties of the HTTP request. 
