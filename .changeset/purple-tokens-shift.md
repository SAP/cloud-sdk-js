---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] Update `@sap/xssec` to version 4.12.2 with changed XSUAA URL behavior.
When fetching XSUAA tokens with zone ID (multi-tenant scenarios), xssec now uses the base domain without a tenant subdomain prefix.