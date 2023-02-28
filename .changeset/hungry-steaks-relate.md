---
'@sap-cloud-sdk/generator-common': major
---

[Compatibility Note] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
[Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` files from now on.
Modern IDEs don't require those files for code navigation, thus they are removed to decrease download size of the SDK.

