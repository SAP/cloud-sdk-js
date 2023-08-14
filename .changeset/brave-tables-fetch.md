---
'@sap-cloud-sdk/odata-common': patch
'@sap-cloud-sdk/odata-v2': patch
'@sap-cloud-sdk/odata-v4': patch
---

[Fixed Issue]: Revert v2 serializer behavior for Edm.decimal so that for v2, all the Edm.decimal will be serialized as string.
