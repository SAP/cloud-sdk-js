---
"@sap-cloud-sdk/connectivity": minor
---

Match service bindings by tag if no match is found by label. This supports user-provided services if no other instances of the same type are bound (e.g. if no destination service is bound, but a user-provided service with tag "destination" is bound, it will return this service binding).
