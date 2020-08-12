---
id: sap-xsuaa-security-library-for-javascript-and-java
title: XSUAA Programming model
sidebar_label: XSUAA service
description: Why should I read this?!
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---

## What is UAA Cloud Foundry

[Cloud Foundry](https://help.sap.com/viewer/3504ec5ef16548778610c7e89cc0eac3/Cloud/en-US/9c7092c7b7ae4d49bc8ae35fdd0e0b18.html) is one of the key environments of the [SAP Cloud Platform](https://www.sap.com/products/cloud-platform.html).

[User Account and Authentication (UAA)](https://docs.cloudfoundry.org/concepts/architecture/uaa.html) is the identity and management service for Cloud Foundry.


## SAP Cloud Platform XSUAA Service

[XSUAA](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/ea0281368f11472b8d2b145a2a28666c.html) is an implementation of UAA service from SAP to be used with SAP Cloud Platform. It greatly extends capabilities for Cloud Foundry UAA service by providing additionally:

- service broker
- support for multitenancy
- API management functions
- Other SAP specific advantages to authentication and authorization in business applications

## XSUAA client libraries

To simplify application development XSUAA service provides client libraries for Java and JavaScript.

The library for Java is Open Source and [available on Github](https://github.com/SAP/cloud-security-xsuaa-integration).

The library for JavsScript is delivered via [NPM](https://www.npmjs.com/package/@sap/xssec) and is not Open Source at the moment.

## Integration with SAP Cloud SDK

SAP Cloud SDK for Java has recently migrated its authentication flows from own implementation to a stable version of Java XSUAA library. This ensures full coverage of authentication methods available on SAP Cloud Platform with high level of security and ongoing updates provided by the underlying library. Initial support was introduced with version [3.16.1 of the Cloud SDK for Java](../java/release-notes-sap-cloud-sdk-for-java#3161).

SAP Cloud SDK for JavaScript currently handles XSUAA service on its own without using official library. The reason for this was the  library being in active development and lingering behind SDK's needs. Currently library is stabilized and migration steps for SDK are planned. Follow our [release notes](../js/release-notes-sap-cloud-sdk-for-javascript-and-typescript ) to find out when migration happens.

## Useful links

- A short but great blog by Martin Blust about [XSUAA and alike](https://blogs.sap.com/2019/01/07/uaa-xsuaa-platform-uaa-cfuaa-what-is-it-all-about/)
