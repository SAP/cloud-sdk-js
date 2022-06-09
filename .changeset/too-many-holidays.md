---
'@sap-cloud-sdk/http-client': minor
---

[Fixed Issue] Fix the `executeHttpRequest` function, so it accepts the same parameters as in version 1.
[Compatibility Note] Deprecate one overload of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
[New Functionality] Support defining header options and query parameter options with origins.
