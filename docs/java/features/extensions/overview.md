---
id: extensions-supported-by-sap-cloud-sdk-for-java
title: Extensions overview
sidebar_label: Overview
description: Discover rich eco-system of SAP Cloud SDK for Java via various value-add extensions. They usually happen thanks to contributors from within and outside of SAP and provide additional features on top of standard SDK offering. We document them in this section.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
- integrations
- extensions
- libraries
---

## What are extensions?

By providing versatile and reliable core functionality to aid modern cloud development SAP Cloud SDK also becomes an important integration layer for various SAP technologies. To leverage this and benefit developers using SDK, we accept contributions from libraries and services coherent with SDK's mission and value proposition.

### How extension different from other features?

We make sure extension libraries are well integrated into the Cloud SDK's ecosystem and call them extensions to make it clear they are not the core SDK components. It doesn't make the features introduced by them less valuable for a developer. These extensions are usually shipped in separate packages similar to libraries generated from API definitions.

### Can a generated type-safe API client library be an extension?

Yes and no. This becomes another distinguishing feature of extensions because they require additional integration code to be crafted by the contribution team together with the SDK team in the contrast to generated REST or OData type-safe clients generated purely from API definitions.

Having an API definition is not mandatory for extensions. By their nature extensions can also benefit from code-generation capabilities provided by SDK but would require additional development to overcome intrinsic technical complexities. Otherwise, they might be fully handcrafted as pure feature source code.

## Where can I find supported extensions?

Visit extension library in the left-side menu.

## Benefits for developers using SDK

- More features and simplicity out of the box
- Well integrated with other SDK features like destination handling, multi-tenancy, resilience, caching, etc.
- Single initial support channel
- High code quality ensured by SDK Team
- Consistent APIs
- Detailed documentation by developers

## Benefits for contributors

:::info
At the moment only services and libraries from withing SAP can be contributed and released together with SAP Cloud SDK for JavaScript.
:::

- Increased adoption thanks to the huge SDK user base
- On-boarding to the best development practices
- Code reviews by the SDK Team
- High level of automation in the contribution process
- Ship your library to Maven Central with Cloud SDK
- Easy process to document your extension on the SDK's [documentation portal](https://sap.github.io/cloud-sdk/)

## How to contribute?

If you:

 - maintain a library in SAP cloud ecosystem
 - have a service in SAP cloud ecosystem that you believe will strengthen Cloud SDK offering and provides additional value to your customers by being part of Cloud SDK
 - know of a service or library within SAP that you would like to use in the context of SAP Cloud SDK

We're happy to hear from you via email: **cloudsdk@sap.com**  or reach out to us via SAP internal communication channels.

:::tip What if you're outside of SAP
If you're outside of SAP but know about valuable library or service missing from SAP Cloud SDK offering, please, let us know.
:::

## Feedback and support

We hope you're happy developing with SAP Cloud SDK for Java. We're happy to hear back from you to help us further improve. Send you feedback, ideas, suggestions to **cloudsdk@sap.com**
