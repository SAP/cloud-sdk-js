---
'@sap-cloud-sdk/odata-common': major
'@sap-cloud-sdk/generator': major
'@sap-cloud-sdk/util': major
---

[Compatability Note] By default, generation of OData clients fails if a service path cannot be determined. Either provide `servicePath` value in the `options-per-service.json` or set `skipValidation` to true, in which case, `/` will be used.
