---
'@sap-cloud-sdk/connectivity': patch
---

[Compatibility Note] As a pre-step for fetching a single destination, in the past all destination were retrieved and parsed.
Now only the specific destination is retrieved and parsed. This change may affect performance depending on the number of destinations and executed calls.
