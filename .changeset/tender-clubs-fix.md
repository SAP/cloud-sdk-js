---
"@sap-cloud-sdk/util": patch
---

[fix] The default uncaught-exception logger now emits only `name`, `message`, and `stack`.
Previously, an `AxiosError` reaching the handler could write `Authorization` headers and other sensitive fields from `error.config`, `error.request`, `error.response`, or `error.cause` to stdout.
  