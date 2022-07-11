---
'@sap-cloud-sdk/odata-v4': patch
'@sap-cloud-sdk/temporal-de-serializers': patch
---

[Compatibility Note] Adjusted parsing of Date, DateTimeOffset, Time, and Duration to be closer to the OData v4 specification.
There may be loss of precision if using the default (de-)serializers with high-precision fractional seconds.
