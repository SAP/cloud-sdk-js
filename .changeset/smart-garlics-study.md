---
'@sap-cloud-sdk/connectivity': minor
---

[Improvement] Change the default validity time parameter of the Cache constructor to be required, rename it from `validityTimeInMs` to `defaultValidityTime`, and allow never-expiring cache with explicitly setting this parameter to `0`. Set the default validity time of `ClientCredentialsTokenCache` to 5 minutes.
