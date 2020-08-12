---
id: release-notes-sap-cloud-sdk-for-javascript-and-typescript
title: Release notes - SDK for JavaScript and Typescript
sidebar_label: Release notes
description: Release notes of SAP Cloud SDK for JavaScript and Typescript, stay up to date with the recent features, fixes, dependency updates and recommendedations.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---
import MvnBadge from '../../src/sap/sdk-js/BuildBadge'

<BuildBadge />


## Should I update?
We highly recommend regularly updating to the latest SDK version. It will help you:

- ensure access to the latest Cloud SDK features
- keep up with the latest changes in SAP Cloud Platform
- update client libraries giving access to latest SAP services on SAP Cloud Platform and S4/HANA
- protect yourself from bugs and breaking changes in the future

:::note _Release notes_ for Open Source SDK components
For Open Source SDK modules we maintain release note on Github.

- [Release notes](https://github.com/SAP/cloud-sdk/releases) for `core`, `generator`, and `test-utils` SDK modules.
- [Release notes](https://github.com/SAP/cloud-sdk-cli/releases) for `cloud-sdk-cli` module.
:::


## Release notes for Client Libraries

:::tip What are client libraries?
For your convenience we [pre-generate type-safe clients libraries](https://www.npmjs.com/search?q=%40sap%2Fcloud-sdk-vdm-*) for whitelisted OData services of S/4HANA Cloud, Marketing cloud and S/4HANA On-premise. These libraries are not Open Source and distributed under SAP Developer license.
:::

### Version 1.20.0
----------

**August 13, 2020**

OData client: Update the OData VDM to the newest release 2002 of SAP S/4HANA Cloud. This includes completely new services (available as usual as global modules called @sap/cloud-sdk-vdm-*), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the SAP API Business Hub for SAP S/4HANA Cloud.

`
