---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issue] Fix provider destinations that were fetched with subscriber specific tokens being cached under the provider tenant, where other subscribers could read them. Such destinations are no longer cached.
