---
'@sap-cloud-sdk/connectivity': minor
---

[New Functionality] Add option to cache mTLS certificates.
[Compatibility Note] Deprecate `getAgentConfig()`:
- Temporarily use replacement function `getAgentConfigAsync()`.
- Rename `getAgentConfigAsync()` to `getAgentConfig()` in next major version.

[Improvement] Read mTLS certificates asynchronously.