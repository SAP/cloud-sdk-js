---
'@sap-cloud-sdk/connectivity': patch
---

[Compatibility Note] When fetching a single destination from destination service, the SDK always loaded and parsed all available destinations and filtered on the name later.
This behavior had issues when some destinations could not be properly parsed, and it had negative performance implications.
Now only the specific destination is retrieved and parsed.
