---
'@sap-cloud-sdk/connectivity': major
---

[Compatibility Note] Enable destination caching by default when retrieving destinations via the destination service. Change affects behavior of `getDestination()` method, generated client's `execute()` method and generic HTTP requests execution using `executeHttpRequest()`. Disable caching by setting `useCache: false` in the options, for example in `execute()` method:

```TS
.execute({ destinationName: 'DESTINATION', jwt: 'JWT', useCache: false })
```
