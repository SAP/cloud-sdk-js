---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] Update `@sap/xssec` to version 4.12.2 with changed XSUAA URL behavior.
When fetching tokens with zone ID (multi-tenant scenarios), xssec now uses the base XSUAA domain without a tenant subdomain prefix.