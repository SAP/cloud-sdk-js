---
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] The OData generator won't automatically rename identifiers to avoid name conflicts.
The generation process will fail if identifiers have conflicting names.
Switch on the `skipValidation` flag if you want to generate despite name conflicts and are okay with changed identifier names to avoid conflicts.
