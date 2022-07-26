---
'@sap-cloud-sdk/connectivity': patch
---

[Compatibility Note] When fetching a single destination from destination service, the SDK always loads and parses all available destinations and filters on the name later.
This behavior has issues when some destinations cannot be properly parsed, and it has negative performance implications when only one destination is used but many destinations were configured.
The new behavior is to only load and parse the specific destination by name.
The new behavior might have negative performance implications if many destinations are used.
