---
'@sap-cloud-sdk/generator': minor
'@sap-cloud-sdk/odata-common': minor
---

[Compatibility Note] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes.
