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

There are two widely used versions of the protocol: OData v2 and OData v4. The latter comes with extended and improved functionality. You can find full details on OData standards in [documentation](https://www.odata.org/documentation/).

## What OData versions are supported?
| OData protocol version                                           | Cloud SDK V3 |
|------------------------------------------------------------------|--------------|
| [OData v2](use-typed-odata-v2-client-in-sap-cloud-sdk-for-java)  | &#10003;     |
| [OData v4](use-typed-odata-v4-client-in-sap-cloud-sdk-for-java ) | &#10003;     |


## What does the Cloud SDK offer?

The Cloud SDK simplifies consumption of OData services through the following features:

### Type-safe OData client

- We provide a type-safe OData client to build and execute OData requests
- For many popular SAP OData services we ship pre-generated type-safe clients. In SAP universe they are called Virtual Data Model or VDM. The most popular type-safe client module contains a collection of [all OData services of SAP S/4HANA Cloud](https://api.sap.com/package/SAPS4HANACloud?section=Artifacts)
- We support both OData v2 and OData v4 protocols in the SAP Cloud SDK for Java.

### Code generator

If you need a client for an OData service where we do not ship a pre-generated client use our versatile [code generator](../generate-typed-odata-v2-and-v4-client-for-java) to convert OData service definition into type-safe Java client library. You can do it for any service either developed by yourself, provided by SAP or other 3rd party.

- Service definition usually comes in form of `.edmx` file and contains metadata of Odata service. The simplest way to obtain it if you have access to the service is navigating to `http(s)://<service-path>/$metadata` endpoint. You can easily generate a client for any 3rd party service or a service that you've build on you own.
- You can invoke code generator via our command line interface (CLI) or via Maven plugin

### Connectivity

We simplify connectivity to SAP enabled OData services via type-safe abstractions over [Destinations](../connectivity/sdk-connectivity-destination-service), Authentication and some other related concepts.

## Popular use-cases for Type-safe OData client

### You are extending an SAP product or service, building a middle-ware, publishing a cloud App

- **Type-safe consumption of OData services.** By consumption, we mean building and executing API calls against OData service with serialized request data and processing serialized responses. All in a type-safe way. Your code focuses on business logic and leaves lower level tasks to the SAP Cloud SDK.
- **Converting OData API into a different flavor of REST API.** You can use SAP Cloud SDK for Java to build an App that converts your desired REST format to OData calls and vice versa. Such App may serve as a proxy, integration adaptor, service gateway, etc.
- **Serving as a layer to fetch data from and push data to OData services.** Instead of building your query tool you can fetch the data with SAP Cloud SDK and pass it on to your UX framework, analytics tool, data converter, etc. Reverse data flow will allow you to push new or modified data to the OData service for processing or persistence. In that manner, the SAP Cloud SDK can help  you implement adapters for a [hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).

### Developing and publishing OData service

- **Use SAP Cloud SDK to create a robust automated testing framework.** Benefiting from a code generator provided by us you can quickly create a type-safe client for your own OData service and scale your automated testing capabilities. This comes with the advantage of easily updating your client code while your service grows and its metadata evolves.
- **Shipping your client module with SAP Cloud SDK for Java.** As a service developer, you're usually interested in an easy way for your customers to consume your service. That's exactly what Cloud SDK does. When your service approaches release you can generate an API client with the SAP Cloud SDK and release it to developers using your service. As an SAP service, you can contribute your API definition via our contribution process and benefit from shipping of a **pre-generated type-safe client** as a Maven module of SAP Cloud SDK.

### Coding convention and interoparability

- **Making sure different teams in your organization coherently consume OData services.** SAP Cloud SDK will help you to save developers' time, ensure best coding practices, and knowledge sharing. Such an approach ensures you won't have duplication of work to save the same problem by different teams and guaranteed high levels of interoperability and integration.

### Advanced features and custom development

- **Using certain SDK features for Custom OData service consumption or publishing.** If SDK's features for OData consumption do not cover your use-case end-to-end you can benefit from our public utility and helper methods like OData expression builder, non-type safe request builders, and some others. Make sure you know what you're doing because SDK can't guarantee convenience and correctness in such a case.
