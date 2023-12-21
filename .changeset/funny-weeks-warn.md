---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] The SAP Cloud SDK used to get the metadata for a destination (without potentially required authentication flows), through two requests to the destination service `/subaccountDestinations` and `/instanceDestinations`. While this approach has a some advantages when caching, it can cause severe performance issues when not caching. From now on, only one destination is retrieved per requested destination through `/destinations`.
