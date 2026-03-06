---
'@sap-cloud-sdk/http-client': patch
---

[Fixed Issue] Improve handling of missing `zlib`-module in the `compress()` middleware and lazy-load it only when needed.
To compress requests in the browser, ensure that a suitable polyfill is provided.