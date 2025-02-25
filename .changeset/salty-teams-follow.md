---
'@sap-cloud-sdk/connectivity': patch
---

[Fixed Issue] Add `proxyConfiguration` on the fly to avoid expired proxy authorization token in cached destination if it lives shorter than the token for destination service.
