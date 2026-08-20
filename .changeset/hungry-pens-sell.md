---
"@sap-cloud-sdk/connectivity": patch
---

[fix] Extend OnPremise HTTP agent cache key to scope it more strongly.
The cache key now includes the subaccount identity ensuring keep-alive sockets are not reused across tenants in multi-tenant technical user flows.
If no stable identity context can be derived from the request, a fresh agent without keep-alive is created for each request.
This matches the behavior of the previous implementation in SAP Cloud SDK v4.6.0 and lower, which did not cache agents in any case.