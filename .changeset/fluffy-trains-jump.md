---
'@sap-cloud-sdk/openapi-generator': minor
---

[feat] Support `contentSchema` in OpenAPI 3.1 schemas: fields with `contentMediaType: application/json` and a `contentSchema` are now typed as the `contentSchema` type instead of `string`. Serialization to a JSON string is supported for multipart bodies via `FormDataBuilder`; non-multipart bodies are not yet handled.
