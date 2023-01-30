---
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] The type for paths in the `GeneratorOptions` is changed from `fs.PathLike` to `string`.
In case you passed a buffer object please resolve it to a string before passing it to the SAP Cloud SDK.