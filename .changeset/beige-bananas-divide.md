---
'@sap-cloud-sdk/connectivity': minor
---

[New Functionality] Add convenience function `transformServiceBindingToDestination` to create OAuth2ClientCredentials destination from service bindings.
The following service bindings are supported:
- business-logging
- destination
- s4-hana-cloud (falls back to basic authentication for this service type)
- saas-registry
- workflow
- service-manager
- xsuaa
- aicore