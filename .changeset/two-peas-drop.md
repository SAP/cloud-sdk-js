---
'@sap-cloud-sdk/odata-common': minor
---

[Fixed Issue] Requests for entities having key property of type `Edm.Date` results in `value.format is not a function` because the moment() object value is encoded before serialization. Removed the encoding of keys in the `getEntityKeys()` since it should only happen in `getResourcePathForKeys`.  

