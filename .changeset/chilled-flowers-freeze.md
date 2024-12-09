---
'@sap-cloud-sdk/openapi': minor
---

[New Functionality] Introduce `setBasePath()` method on the OpenAPI request builder which allows to set the base path dynamically. This gets prepended with the path parameter for every request to the client.
```typescript
const responseData = await MyApi.myFunction()
  .setBasePath('/base/path/to/service')
  .execute(destination);
```
