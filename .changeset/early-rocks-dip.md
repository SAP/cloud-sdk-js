---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] The `getDestinationFromDestinationService()` function no longer verifies the incoming XSUAA JWT against the application's bound XSUAA instance. Consequently, the `cacheVerificationKeys` option is now deprecated and has no effect.