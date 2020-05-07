---
id: cf-cli
title: SAP Cloud Foundry
hide_title: false
hide_table_of_contents: false
sidebar_label: Cloud Foundry CLI
custom_edit_url: https://github.com
description: Configure you Cloud Foundry CLI and bind it to SAP Cloud Platform
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---

## Cloud Foundry Command Line Interface (CLI)

To deploy your App developed with SAP Cloud SDK to [SAP Cloud Platform](https://www.sap.com/products/cloud-platform.html)
you'll need Cloud Foundry CLI. You can download latest release of DEB package [from official CF GitHub
repository](https://github.com/cloudfoundry/cli/releases) or follow
[instructions](https://github.com/cloudfoundry/cli#installing-using-a-package-manager) to install it with you package
manager: `apt-get`, `yum` and `homebrew` are supported.

After installing the CLI you might need to reload you shell before it becomes available. To check if it works run:

``` bash
cf
```

## Bind your CLI to SAP Cloud Foundry

Let's associate you Cloud Foundry (CF) CLI to your SAP account by providing an API endpoint and logging in with your
account.

**Select endpoint depending on your region:**

  - Europe <https://api.cf.eu10.hana.ondemand.com>
  - US East: <https://api.cf.us10.hana.ondemand.com>
  - US CENTRAL: <https://api.cf.us20.hana.ondemand.com>

To use a snippet for Europe run:

```bash
cf api https://api.cf.eu10.hana.ondemand.com
```

Provide your credential for SAP Cloud Foundry by running:

``` bash
cf login
```

For more details on `SAP Cloud Foundry CLI` follow this [official tutorial](https://developers.sap.com/tutorials/cp-cf-download-cli.html )

## SAP Cloud Platform ##
Find out more about `SAP Cloud Platform` and `Cloud Foundry Environment` from [official documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/73beb06e127f4e47b849aa95344aabe1.html ) .
