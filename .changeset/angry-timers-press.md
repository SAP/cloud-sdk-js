---
'@sap-cloud-sdk/mail-client': patch
---

[Fixed Issues] Fix error `Greeting never received` when sending emails to On-Premise mail servers. The `_readableListening` property of socket is set to `true` to allow nodemailer to receive SMTP greeting messages.
