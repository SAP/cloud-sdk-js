---
"@sap-cloud-sdk/http-client": patch
---

[fix] Use dedicated HTTP/HTTPS agents with `keepAlive: true` instead of `http.globalAgent`/`https.globalAgent` to avoid the 5-second socket timeout applied by the global agents.
  