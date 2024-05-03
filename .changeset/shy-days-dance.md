---
"@sap-cloud-sdk/generator": minor
---

[Improvement] If `basePath` cannot be determined, it is set to `/`, and generation no longer fails.
[Compatibility Note] Generation of Odata Clients will no longer fail if `basePath` value cannot be determined. It will be set to `/` by default. 