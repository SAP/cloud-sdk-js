---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] Using Principal Propagation through authentication type to "NoAuthentication" is no longer supported. This resulted in erroneous behavior for destinations with authentication type "NoAuthentication". If you need to use Principal Propagation use authentication type "PrincipalPropagation".
