---
'@sap-cloud-sdk/openapi-generator': minor
---

[Compatibility Note] Regenerating a client for an operation with multiple supported request body media types replaces the original operation name with media-type-specific names, such as `predictWithJson` and `predictWithMultipartFormData` instead of `predict`.
Update affected call sites to use the appropriate variant.
Operations with only one supported request body media type retain their original name.
