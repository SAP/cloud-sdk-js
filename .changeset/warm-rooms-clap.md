---
"@sap-cloud-sdk/openapi-generator": minor
"@sap-cloud-sdk/http-client": minor
---

[feat] Add experimental OpenAPI 3.2 support to the OpenAPI generator.
OpenAPI 3.2 documents are now accepted; they are treated as 3.1 for parsing, so 3.2-only constructs may be ignored.
The `QUERY` HTTP method is now supported and generates request builders.
  