---
'@sap-cloud-sdk/openapi-generator': minor
---

[compat] Fields with `contentMediaType: application/json` and a `contentSchema` will now be typed as the `contentSchema` type instead of `string`. Re-generate your client to pick up the new types.
