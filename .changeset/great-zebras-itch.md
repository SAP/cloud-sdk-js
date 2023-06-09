---
'@sap-cloud-sdk/connectivity': minor
---

[New Functionality] Add option to cache mTLS certificates.
[Compatibility Note] Deprecate getAgentConfig:
- Temporarly use replacement function getAgentConfigAsync.
- Rename getAgentConfigAsync to getAgentConfig in next major version.

[Improvement] mTLS certificates are now read asynchronously.