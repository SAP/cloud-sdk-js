---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issue] Fix IAS tokens being classified as non-IAS tokens when the identity provider issues them with a schemeless `iss` claim, e.g. `tenant.accounts.ondemand.com` instead of `https://tenant.accounts.ondemand.com`.
