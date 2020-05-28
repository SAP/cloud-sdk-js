---
id: overview
title: Overview
hide_title: false
hide_table_of_contents: false
sidebar_label: Overview
description: SAP Cloud SDK offers typesafe client generators for REST (Open API) services
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---

## Typesafe client for RESTful services in Java  ##
SAP Cloud SDK for Java is prepared to generate a typesafe clients using [Open API](https://www.openapis.org/) to conveniently work
with various REST APIs available at [SAP API Hub](https://api.sap.com/)

:::info Open API Generator is not released for public use 
If you're interested in a typed REST API client for a specific SAP application or service contact us via [cloudsdk@sap.com](mailto:cloudsdk@sap.com) 
:::

### Pre-generated typesafe REST API client ###
We ship pre-generated typesafe REST API clients as modules in collaboration with popular SAP services available on SAP
Cloud Platform and beyond.

Depending on the scope modules could be available only internally within SAP or publicly released. [SAP Cloud Platform Workflow
API](../clients/scp-workflow-rest-api) is an example of publicly released API module.

In case you need information on REST or other services shipped only internally, please, approach us directly via
standard communication channels.

## Why using SAP Cloud SDK for Java with REST services? ##

- You'll benefit from typesafe client when accessing a service of your choice
- We take care of various complexities around developing extensions for SAP services
- You'll get convenience abstractions over SAP Cloud Platform services. To name a few:  XSUAA, Destination
  service, Service bindings and more.
- We hide complexities of cloud development making many tasks ridiculously easy
- You're getting best in class support for your application or extensions directly form Cloud SDK development team
- We take care of change management by continuously updating, integrating and shipping latest version of services that
  we release.

## I'm providing a service on SAP Cloud Platform. How can I ship it with Cloud SDK? ##
Reach out to us via internal communication channels and we'll provide you with information on our contribution models. 
 
## Do you plan to release Open API generator? Like you've done for OData? ##
Because of less deterministic standard and huge variety of Open API services we decided not to release it as of yet. We
might reconsider this decision if we see a strong use-case and great value for our customers behind such commitment. The
value should outweigh an effort to provide and support such a feature in general public availability.

Reach out to us if you have any feedback on this.

## Feedback ##
We are happy to hear from you via internal communication channels or via [cloudsdk@sap.com](mailto:cloudsdk@sap.com)
