---
'@sap-cloud-sdk/openapi-generator': minor
'@sap-cloud-sdk/openapi': minor
'@sap-cloud-sdk/util': minor
---

[New Functionality] Support `basePath` in the `options-per-service.json` file in the OpenAPI generator. It enables the base path to be prepended to the path parameter for every request of the generated client.
Introduce `setBasePath()` method on the OpenAPI request builder which allows to set the base path dynamically for every request to the client.

```typescript
const responseData = await MyApi.myFunction()
  .setBasePath('/base/path/to/service')
  .execute(destination);
```
