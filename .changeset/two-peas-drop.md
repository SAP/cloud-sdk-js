---
'@sap-cloud-sdk/odata-common': minor
---

[Fixed Issue] Remove encoding of keys in the `getEntityKeys()` as it should only happen once in `getResourcePathForKeys()`.Fixes the error `value.format is not a function` when executing requests for entities with `Edm.Date` type key property.
