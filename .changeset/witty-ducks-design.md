---
'@sap-cloud-sdk/e2e-tests': patch
'@sap-cloud-sdk/odata-common': patch
'@sap-cloud-sdk/odata-v2': patch
'@sap-cloud-sdk/odata-v4': patch
---

[Compatibility Note] Fix deserializer so it works in batch requests which only contain functions or actions. This changes the type parameters of `ActionFunctionImportRequestBuilderBase`.
