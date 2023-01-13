---
'@sap-cloud-sdk/generator-common': major
---

[Compatibility Note] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
[Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` anymore.
For users, they are irrelevant and with modern IDEs they are also not needed to enable navigation to the types for the development team.

