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

There are two widely used versions of the protocol: OData v2 and OData v4. The latter comes with extended and improved functionality. You can find full details on OData standers in [documentation](https://www.odata.org/documentation/).

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
