---
'@sap-cloud-sdk/connectivity': minor
---

[New Functionality] Allow combination of `iss` an `jwt` when fetching a destination. In this case the `iss` URL will be used to fetch the destination service token and `jwt` will be used for the `x-user-token` header of user based authentication types.
