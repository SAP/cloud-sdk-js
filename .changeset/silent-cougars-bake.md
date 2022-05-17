---
'@sap-cloud-sdk/util': minor
---

[Compatibility Note] Stop using `VCAP_SERVICES` to determine the log format. Use `NODE_ENV=production` or `cds.env.features.kibana_formatter=true` for `kibana` format. Otherwise, `local` format will be used.
