---
'@sap-cloud-sdk/http-client': minor
---

[Improvement] Add request compression middleware.
Use the `compressRequest()` middleware to compress HTTP request payloads using gzip, brotli, deflate, or zstd algorithms.
Supports multiple compression modes: auto (size-based), passthrough (pre-compressed), or forced compression.
