---
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] The types for paths in the `GeneratorOptions` are changed from `fs.PathLike` to `string`.
In case you passed a buffer object please resolve it to a string before passing it to the SAP Cloud SDK.