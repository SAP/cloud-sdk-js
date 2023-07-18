---
'@sap-cloud-sdk/http-client': minor
---

[Fixed Issue] Do not set default tenant ID in the context of middlewares, if the tenant ID is unknown. In those cases it will be `undefined` from now on.
