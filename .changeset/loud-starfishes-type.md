---
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] Per default the OData generator does not change object names anymore to resolve conflicts.
Instead, the generation process will fail.
Switch on the `skipValidation` flag if you want to generate anyway with adjusted names.
