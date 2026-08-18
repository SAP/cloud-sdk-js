---
'@sap-cloud-sdk/http-client': patch
---

[fix] Add `./package.json` to the `exports` map in all SDK packages. Previously, the strict `exports` field introduced in PR #6632 blocked `require('@sap-cloud-sdk/http-client/package.json')`, causing `ERR_PACKAGE_PATH_NOT_EXPORTED` errors in consumers such as `@sap/cds` that access the sub-path for version detection.
