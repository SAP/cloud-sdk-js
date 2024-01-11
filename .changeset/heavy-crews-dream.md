---
'@sap-cloud-sdk/mail-client': patch
---

[Fixed Issue] Fix "Hostname/IP does not match certificate's altnames" issues with "localhost" when sending e-mails OnPremise. Always pass the host and port of the MAIL destination explicitly to the underlying `nodemailer` instead of falling back to the default.
