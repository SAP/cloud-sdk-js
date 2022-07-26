---
'@sap-cloud-sdk/connectivity': patch
---

[Compatibility Note] When fetching a single destination from destination service, the SDK now only gets that single destination from the destination service API.
Previously, all available destinations were loaded and filtered on the name later.
The old behavior has issues when some destinations cannot be properly parsed, and it has negative performance implications when only one destination is used but many destinations were configured.
The new behavior should be slightly faster if only a few destinations are used, but many destinations are available.
The new behavior may be slower when most of the configured destinations are queried because more HTTP requests are required.

