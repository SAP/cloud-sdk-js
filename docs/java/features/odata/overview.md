---
id: overview
title: OData with the Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
description: This article provides an overview of how the SAP Cloud SDK for Java supports connecting to OData services.
keywords:
- sap
- cloud
- sdk
- odata
- java
- typed
- client
- generate
---

## What is OData?

[OData](https://www.odata.org/) is an open standard for building and consuming RESTful APIs. It defines a query language to send and retrieve data via HTTP and to perform operations on data.

There are two widely used versions of the protocol: OData v2 and OData v4. The latter comes with more and improved functionality. Full details on the standards are to be found in the [documentation](https://www.odata.org/documentation/).

## What does the Cloud SDK offer?

The Cloud SDK supports consumption of OData services through the following features:

- An OData client that is capable of building and executing OData requests
- The concept of a typed OData client that allows for building requests in a type-aware and thus type-safe manner
- A generator (available as command line interface and Maven plugin) that is capable of generating typed OData clients from service definitions (OData metadata documents)
- Java Virtual Data Model (VDM): pre-generated typed OData client for [all OData services of SAP S/4HANA Cloud](https://api.sap.com/package/SAPS4HANACloud?section=Artifacts)

The SDK supports both OData v2 and OData v4 protocols. However, parts of the v4 implementation are still in beta and not all features are supported yet.

:::tip Improved OData type-safe client
The Cloud SDK for Java has published an improved OData type-safe client implementation (Beta) which boosts performance of your Java apps and lets you profit from faster innovations for both OData protocols. Check out the [our article on type-safe client for details](use-typed-odata-v2-and-v4-client-for-java) for details.
:::

## Popular use-cases for Type-safe OData client

### You are extending an SAP product or service, building a middle-ware, publishing a cloud App

- **Type-safe consumption of OData services.** By consumption, we mean building and executing API calls against OData service with serialized request data and processing serialized responses. All in a type-safe way. Your code focuses on business logic and leaves lower level tasks to the SAP Cloud SDK.
- **Converting OData API into a different flavor of REST API.** You can use SAP Cloud SDK for Java to build an App that converts your desired REST format to OData calls and vice versa. Such App may serve as a proxy, integration adaptor, service gateway, etc.
- **Serving as a layer to fetch data from and push data to OData services.** Instead of building your query tool you can fetch the data with SAP Cloud SDK and pass it on to your UX framework, analytics tool, data converter, etc. Reverse data flow will allow you to push new or modified data to the OData service for processing or persistence.

### Developing and publishing OData service

- **Use SAP Cloud SDK to create a robust automated testing framework.** Benefiting from a code generator provided by us you can quickly create a type-safe client for your own OData service and scale your automated testing capabilities. This comes with the advantage of easily updating your client code while your service grows and its metadata evolves.
- **Shipping your client module with SAP Cloud SDK for Java.** As a service developer, you're usually interested in an easy way for your customers to consume your service. That's exactly what Cloud SDK does. When your service approaches release you can contribute your API definition via our contribution process and benefit from shipping of a **pre-generated type-safe client** as a Maven module of SAP Cloud SDK.

### Coding convention and interoparability

- **Making sure different teams in your organization coherently consume OData services.** SAP Cloud SDK will help you to save developers' time, ensure best coding practices, and knowledge sharing. Such an approach ensures you won't have duplication of work to save the same problem by different teams and guaranteed high levels of interoperability and integration.

### Advanced features and custom development

- **Using certain SDK features for Custom OData service consumption or publishing.** If SDK's features for OData consumption do not cover your use-case end-to-end you can benefit from our public utility and helper methods like OData expression builder, non-type safe request builders, and some others. Make sure you know what you're doing because SDK can't guarantee convenience and correctness in such a case.
