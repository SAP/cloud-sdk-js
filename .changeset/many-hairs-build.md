---
'@sap-cloud-sdk/connectivity': minor
---

[Compatibility Note] When making a request to a destination that has a certificate in its defintion, the certificate is only added, if it is needed for the according authentication type. That way, `ClientCertificateAuthentication` will have a certificate in the request, while `OAuth2SAMLBearerAssertion` does not. Previously, the certificate would be added regardless.
