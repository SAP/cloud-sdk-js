---
id: getting-started
title: Getting started - SDK for JavaScript
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting started
description: Get up to spead with SAP Cloud SDK for JavaScript in no time
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---
import BuildBadge from '../../src/sap/sdk-js/BuildBadge'
import LicenseBadge from '../../src/sap/sdk-js/LicenseBadge'

<> <BuildBadge /> { } <LicenseBadge /> </>

## Installation
To install the CLI globally, run:

```bash
$ npm install -g @sap-cloud-sdk/cli
```

### Update
As long as the CLI version is less than `1.0.0`, run the following to update to the latest version. Please keep in mind, that these updates can have breaking changes as per the [semver spec](https://semver.org/#spec-item-4).

```bash
$ npm install -g @sap-cloud-sdk/cli@latest
```

## Usage

<!-- usage -->
```bash
$ npm install -g @sap-cloud-sdk/cli
$ sap-cloud-sdk COMMAND
running command...
$ sap-cloud-sdk (-v|--version|version)
@sap-cloud-sdk/cli/0.1.8 darwin-x64 node-v13.11.0
$ sap-cloud-sdk --help [COMMAND]
USAGE
  $ sap-cloud-sdk COMMAND
...
```
<!-- usagestop -->

The CLI can initialize an nest-based project or (the more common case) add everything you need to develop for SAP Cloud Platform to an existing project no matter what backend framework you use.
If there are any incompatibilities, please let us know in the [issues](https://github.com/SAP/cloud-sdk-cli/issues/new/choose)!

To get started run
```bash
$ sap-cloud-sdk init
```
in the project folder.

It will guide you through the initialization, create the necessary files and add necessary dependencies.
If you run it in an empty folder, it will ask if you want to initialize a project using [@nest/cli](https://github.com/nestjs/nest-cli).

To deploy to and run on Cloud Foundry, you need to
1. Make sure that your app listens to port 8080
2. Build your app if necessary
3. Run [`sap-cloud-sdk package`](#sap-cloud-sdk-package)
4. Push to Cloud Foundry (`cf push`)

For productive use, your app should implement user authentication and authorization.
For SAP Cloud Foundry, this is usually done by using the approuter and xsuaa service.
Start by running [`sap-cloud-sdk add-approuter`](#sap-cloud-sdk-add-approuter) and configure the xsuaa service accordingly.
