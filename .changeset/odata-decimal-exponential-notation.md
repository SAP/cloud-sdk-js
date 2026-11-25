---
'@sap-cloud-sdk/odata-common': patch
---

[Fixed Issue] Serialize `Edm.Decimal` values without exponential notation, e.g. `0.00000001` instead of `1e-8` (and `0.00000001M` instead of the invalid OData v2 URI literal `1e-8M`), and `1000000000000000000000` instead of `1e+21`.
