---
"@sap-cloud-sdk/http-client": minor
---

[compat] The default HTTP(S) agent no longer uses the Node.js global agent.
Instead, a shared dedicated agent is used with `keepAlive: true` and unset timeout.
The previously used global agent had a default timeout of 5 seconds.
  