---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issue] Fix subscriber destination lookup failing when the identity provider issues tokens with a schemeless `iss` claim, e.g. `tenant.accounts.ondemand.com` instead of `https://tenant.accounts.ondemand.com`. Such issuers are now prefixed with `https://` before being parsed, instead of causing a silent fallback to the provider account.
