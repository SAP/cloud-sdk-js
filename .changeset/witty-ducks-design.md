---
'@sap-cloud-sdk/e2e-tests': patch
'@sap-cloud-sdk/odata-common': patch
'@sap-cloud-sdk/odata-v2': patch
'@sap-cloud-sdk/odata-v4': patch
---

[Compatibility Note] The `ActionFunctionImportRequestBuilderBase` has an additional mandatory type parameter to pass the according (de-)serializer type. This was missing previously due to a bug.
