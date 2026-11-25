---
'@sap-cloud-sdk/connectivity': patch
---

[fix] Validate the tenant subdomain taken from the JWT `ext_attr.zdn` claim as a single RFC 1123 DNS label before it is used to build the XSUAA OAuth2 token endpoint host. Previously a crafted `zdn` (e.g. containing a host, port or path) could redirect the client-credentials token request to an attacker-controlled host and leak the service binding's `client_id`/`client_secret` (SSRF, CWE-918). Invalid subdomains are now rejected (fail-closed). This mirrors the fix in the SAP Cloud SDK for Python (GHSA-4mv3-jxxm-9cx2 / CVE-2026-89111). Legitimate provider/subscriber/IAS flows are unaffected.
