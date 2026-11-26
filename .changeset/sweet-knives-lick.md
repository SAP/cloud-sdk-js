---
'@sap-cloud-sdk/openapi-generator': minor
---

[Compatibility Note] When supported and unsupported request body media types coexist, generated operations now use the supported representations' schema types without the previous `anyOf: [schema, any]` widening.
Unsupported representations are omitted, so call sites relying on the permissive body type may need updating.
This applies to all unsupported top-level media types, not only XML.
Request bodies containing only unsupported media types retain the existing `any` body type and `application/json` fallback.
