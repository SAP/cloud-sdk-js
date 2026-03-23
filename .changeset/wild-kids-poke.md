---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] IAS tokens are now cached via `@sap/xssec`.
`@sap/xssec` uses an LRU cache limited to 100 items, previously this cache was unbounded.
