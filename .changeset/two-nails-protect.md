---
'@sap-cloud-sdk/openapi-generator': major
'@sap-cloud-sdk/generator-common': major
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths.
