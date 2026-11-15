---
'@sap-cloud-sdk/odata-v4': patch
---

[Fixed Issue] Fix serialization of `Edm.TimeOfDay` values with fractional seconds in the last second of a minute, e.g. `23:59:59.5`, which threw an error, and of fractional seconds below one microsecond, e.g. `12:30:00.0000001`, which were serialized in exponential notation (`12:30:1e-7`).
