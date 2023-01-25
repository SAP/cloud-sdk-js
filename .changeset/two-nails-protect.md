---
'@sap-cloud-sdk/openapi-generator': major
'@sap-cloud-sdk/generator-common': major
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] The types for paths in the `GeneratorOptions` are changed from `fs.PathLike` to `string`. 
In case you passed a buffer object please resolve it to a string before passing it to the SAP Cloud SDK.
[Compatibility Note] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
In case you experience problems with the new logic enable the `verbose` flag to investigate what are the new paths now.
[Compatibility Note] The internal option `packageVersion` of the OpenApi generator is removed.
