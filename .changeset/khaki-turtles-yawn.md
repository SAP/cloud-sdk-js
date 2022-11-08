---
'@sap-cloud-sdk/odata-common': minor
---

[New Functionality] Add `getBatchReference()` and `setBatchId()` in request builders to use the batch ID as a reference to an entity in a batch request changeset.
- add `getBatchReference()` in request builders: `create`, `delete`, `getByKey` and `update`
- add `setBatchId()` in request builders: `create`, `delete` and `update`
