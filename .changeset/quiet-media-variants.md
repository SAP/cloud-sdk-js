---
'@sap-cloud-sdk/openapi-generator': minor
---

[New Functionality] Generate separate, media-type-specific operations when one OpenAPI operation defines multiple supported request body representations, such as `application/json` and `multipart/form-data`.
Generated variants use the `<operation>With<MediaType>` naming pattern, for example `predictWithJson` and `predictWithMultipartFormData`.
