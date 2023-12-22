---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] The SAP Cloud SDK used to get all subaccount and instance destinations, that are available with your JWT (without potentially required token retrieval), through two requests to the destination service (`/subaccountDestinations` and `/instanceDestinations`). While this approach can have advantages when caching, it can cause severe performance issues without caching. Therefore, from now on, only one destination is retrieved per requested destination through `/destinations`.
You can no longer rely on the SDK to automatically cache all destinations on the first request. If needed, you can call `getAllDestinationsFromDestinationService()` with cache enabled instead.
