---
'@sap-cloud-sdk/connectivity': patch
---

[Improvement] Replace the `jks-js` dependency with an inline parser for JKS client certificate keystores.
As part of this, JKS keystores are now rejected in FIPS mode before loading the parser.
