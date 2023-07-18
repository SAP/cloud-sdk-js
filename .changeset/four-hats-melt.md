---
'@sap-cloud-sdk/connectivity': minor
---

[Improvement] Do not rely on the XSUAA service binding to retrieve tenant information when registering destinations. If tenant is unknown and no binding is found, set it to a default value (`'tenant_id'`).
