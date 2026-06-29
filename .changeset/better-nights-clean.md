---
"@sap-cloud-sdk/connectivity": patch
---

[fix] HTTP(S) agents are now cached per destination instead of per protocol and options, preventing unintended agent reuse across different destinations.
  