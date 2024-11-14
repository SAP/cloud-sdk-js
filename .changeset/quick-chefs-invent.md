---
'@sap-cloud-sdk/mail-client': patch
---

[Fixed Issue] Fix email sending functionality to ensure that emails are sent to all valid addresses. Previously, if an email failed, all subsequent emails were not sent.
