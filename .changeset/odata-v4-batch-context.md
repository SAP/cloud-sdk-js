---
'@sap-cloud-sdk/odata-common': patch
---

[Fixed Issue] Identify the entity of OData v4 batch read responses from the `@odata.context` annotation, so that `type` is set and no "Could not parse constructor from response body." warning is logged for responses without `__metadata`.
