---
"@sap-cloud-sdk/connectivity": minor
"@sap-cloud-sdk/http-client": minor
---

[feat] HTTP(S) agents no longer enable `keepAlive` by default, avoiding unexpected socket timeouts on slow-to-respond connections.
A new `agentOptions` property on `Destination` allows configuring the underlying agent (e.g. `keepAlive`, `timeout`, `maxSockets`) without constructing an agent manually.
  