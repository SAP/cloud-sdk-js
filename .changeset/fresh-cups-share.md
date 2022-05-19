---
'@sap-cloud-sdk/connectivity': minor
'@sap-cloud-sdk/http-client': minor
---

[Improvement] Default log output on the `info` level has been significantly reduced.
[Compatibility Note] Only the successful retrieval of destinations is now logged on the `info` log level, everything else is either now on `debug` or `warn` level.
