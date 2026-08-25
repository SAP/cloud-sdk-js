---
'@sap-cloud-sdk/connectivity': patch
'@sap-cloud-sdk/generator': patch
'@sap-cloud-sdk/generator-common': patch
'@sap-cloud-sdk/http-client': patch
'@sap-cloud-sdk/odata-common': patch
'@sap-cloud-sdk/odata-v2': patch
'@sap-cloud-sdk/odata-v4': patch
'@sap-cloud-sdk/openapi': patch
'@sap-cloud-sdk/openapi-generator': patch
'@sap-cloud-sdk/resilience': patch
'@sap-cloud-sdk/temporal-de-serializers': patch
---

[fix] Export `./internal.js` named export in `package.json` for compatibility.
Please migrate to the new named export `./internal`, the old export is deprecated and will be removed in the next major release.
