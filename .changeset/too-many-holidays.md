---
'@sap-cloud-sdk/http-client': minor
---

[Fixed Issue] Fix the `executeHttpRequest` function, so it accepts the same parameters as version 1.x.
[Compatibility Note] Deprecate one overloading of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
