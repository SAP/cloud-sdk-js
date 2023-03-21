---
'@sap-cloud-sdk/connectivity': patch
'@sap-cloud-sdk/mail-client': patch
---

[Fixed Issues] Set `_readableListening` property of Socket to `true` to allow nodemailer to receive SMTP greeting messages. Fixes `Greeting never received` error when sending emails to onPrem mail servers.
