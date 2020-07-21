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

There are two widely used versions of the protocol: OData v2 and OData v4. The latter comes with more and improved functionality. Full details on the standards are to be found in the [documentation](https://www.odata.org/documentation/).

## What does the Cloud SDK offer?

The Cloud SDK supports consumption of OData services through the following features:

- An OData client that is capable of building and executing OData requests
- The concept of a typed OData client that allows for building requests in a type-aware and thus type-safe manner
- A generator (available as command line interface and Maven plugin) that is capable of generating typed OData clients from service definitions (OData metadata documents)
- Java Virtual Data Model (VDM): pre-generated typed OData client for [all OData services of SAP S/4HANA Cloud](https://api.sap.com/package/SAPS4HANACloud?section=Artifacts)

The SDK supports both OData v2 and OData v4 protocols.

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
