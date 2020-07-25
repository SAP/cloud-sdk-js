---
id: overview
title: OData with Cloud SDK for Java
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

## Supported OData versions
| Version  | SAP Cloud SDK V3 |
|----------|------------------|
| OData v2 | &#10003;         |
| OData v4 | &#10003;         |


## What is OData?

[OData](https://www.odata.org/) is an open standard for building and consuming RESTful APIs. It defines a query language to send and retrieve data via HTTP and to perform operations on data.

There are two widely used versions of the protocol: OData v2 and OData v4. The latter comes with extended and improved functionality. You can find full details on OData standers in [documentation](https://www.odata.org/documentation/).

## What does the Cloud SDK offer?

The Cloud SDK simplifies consumption of OData services through the following features:

- We provide a type-safe OData client to build and execute OData requests
- We simplify connectivity to SAP enabled OData services via type-safe abstractions over [Destinations](../connectivity/sdk-connectivity-destination-service), Authentication and some other related concepts.
- A [code generator](../generate-typed-odata-v2-and-v4-client-for-java) to convert your OData service definition into type-safe Java client library.
  - Service definition usually comes in form of `.edmx` file and contains metadata of Odata service. The simplest way to obtain it if you have access to the service is navigating to `http(s)://<service-path>/$metadata` endpoint. You can easily generate a client for any 3rd party service or a service that you've build on you own.
  - You can invoke code generator via our command line interface (CLI) or via Maven plugin
- For many popular SAP OData services we ship pre-generated type-safe clients. In SAP universe they are called Virtual Data Model or VDM. The most popular type-safe client module contains a collection of [all OData services of SAP S/4HANA Cloud](https://api.sap.com/package/SAPS4HANACloud?section=Artifacts)
- We support both OData v2 and OData v4 protocols in the SAP Cloud SDK for Java.

## OData features supported by SAP Cloud SDK for Java

### Create, Read, Update, Delete - CRUD


| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| GetAll                              | &#10003; | &#10003; |         |               |
| GetByKey                            | &#10003; | &#10003; |         |               |
| Create                              | &#10003; | &#10003; |         |               |
| Update                              | &#10003; | &#10003; |         |               |
| Delete                              | &#10003; | &#10003; |         |               |
| Deep Create                         | &#10003; | &#10003; |         |               |
| Deep Update                         | &#10003; | n/a      |         |               |
| Deep Delete                         |          |          |         |               |
| Create on Navigation property       | &#10003; |          |         |               |
| Update on Navigation property       | &#10003; |          |         |               |
| Delete on Navigation property       | &#10003; |          |         |               |

### Select, Expand, Filter, Search, OrderBy, Top, Skip and Count

| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| Basic Select                        | &#10003; | &#10003; |         |               |
| Select on Navigation property       |          |          |         |               |
| Basic Expand                        | &#10003; | &#10003; |         |               |
| Expand on Navigation property       | &#10003; |          |         |               |
| Basic Filter                        | &#10003; | &#10003; |         |               |
| Filter on Enum property             |          |          |         |               |
| Filter on Complex type              | &#10003; |          |         |               |
| Filter on Navigation property       | &#10003; |          |         |               |
| Basic OrderBy                       | &#10003; | &#10003; |         |               |
| OrderBy on Navigation property      | &#10003; |          |         |               |
| Top and Skip                        | &#10003; |          |         |               |
| Top and Skip on Navigation property | &#10003; |          |         |               |
| Count                               | &#10003; | &#10003; |         |               |
| Count on Navigation property        | &#10003; |          |         |               |
| Search                              | &#10003; |          |         |               |
| Any/All for Entity collections      |          |          |         |               |
| Any/All for Primitive types         | &#10003; |          |         |               |

### Functions and Actions


| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| Unbound Functions                   | &#10003; | &#10003; |         |               |
| Bound Functions                     |          |          |         |               |
| Unbound Actions                     | &#10003; |          |         |               |
| Bound Actions                       |          |          |         |               |

### ETag and CSRF token handling

| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| Etag handling                       | &#10003; |          |         |               |
| CSRF token handling                 | &#10003; |          |         |               |

### Inheritance

| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| Derived Entity (Inheritance)        | &#10003; |          |         |               |
| Requesting Derived Entity           |          |          |         |               |
| Filter on Derived Entity            |          |          |         |               |
| Create on Derived Entity            |          |          |         |               |
| Update on Derived Entity            |          |          |         |               |
| Delete on Derive Entity             |          |          |         |               |

### Batch

| Feature                             | OData V4 | OData V2 | Comment | Example Query |
|-------------------------------------|----------|----------|---------|---------------|
| Batch                               |          | &#10003; |         |               |


## Popular use-cases for Type-safe OData client

### You are extending an SAP product or service, building a middle-ware, publishing a cloud App

- **Type-safe consumption of OData services.** By consumption, we mean building and executing API calls against OData service with serialized request data and processing serialized responses. All in a type-safe way.
- **Converting OData API into a different flavor of REST API.** You can use SAP Cloud SDK for Java to build an App that converts your desired REST format to OData calls and vice versa. Such App may serve as a proxy, integration adaptor, service gateway, etc.
- **Serving as a layer to fetch data from and push data to OData services.** Instead of building your query tool you can fetch the data with SAP Cloud SDK and pass it on to your UX framework, analytics tool, data converter, etc. Reverse data flow will allow you to push new or modified data to the OData service for processing or persistence.

### Developing and publishing OData service

- **Use SAP Cloud SDK to create a robust automated testing framework.** Benefiting from a code generator provided by us you can quickly create a type-safe client for your own OData service and scale your automated testing capabilities. This comes with the advantage of easily updating your client code while your service grows and its metadata evolves.
- **Shipping your client module with SAP Cloud SDK for Java.** As a service developer, you're usually interested in an easy way for your customers to consume your service. That's exactly what Cloud SDK does. When your service approaches release you can contribute your API definition via our contribution process and benefit from a shipping of a **pre-generated type-safe client** as a Maven module of SAP Cloud SDK.

### Coding convention and interoparability

- **Making sure different teams in your organization coherently consume OData services.** SAP Cloud SDK will help you to save developers' time, ensure best coding practices, and knowledge sharing. Such an approach ensures you won't have duplication of work to save the same problem by different teams and guaranteed high levels of interoperability and integration.

### Advanced features and custom development

- **Using certain SDK features for Custom OData service consumption or publishing.** If SDK's features for OData consumption do not cover your use-case end-to-end you can benefit from our public utility and helper methods like OData expression builder, non-type safe request builders, and some others. Make sure you know what you're doing because SDK can't guarantee convenience and correctness in such a case.
