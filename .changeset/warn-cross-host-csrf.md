---
'@sap-cloud-sdk/http-client': patch
---

[Fixed Issue] Warn when the CSRF token fetch URL has a different host than the request URL, as sensitive headers would be forwarded to the cross-host endpoint.
