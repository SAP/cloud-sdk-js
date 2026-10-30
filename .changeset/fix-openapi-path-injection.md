---
'@sap-cloud-sdk/openapi-generator': patch
---

[fix] Escape `pathPattern` with `JSON.stringify` in generated code to prevent code injection via crafted OpenAPI path keys.
