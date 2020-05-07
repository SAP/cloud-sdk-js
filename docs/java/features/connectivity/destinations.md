---
id: sdk-connectivity-destination-service
title: Use destinations to connect to other systems and services
hide_title: false
hide_table_of_contents: false
sidebar_label: Destinations
description: This article describes how the SAP Cloud SDK for Java can be used to establish connections to other systems and services like S/4HANA or SAP Cloud Platform services.
keywords:
- sap
- cloud
- sdk
- destination
- java
- connectivity
---

The SAP Cloud SDK offers some basic functionality that helps with connecting to other systems and services like S/4HANA Cloud. The SDK introduces the general concept of a `Destination` which holds basic information about how to connect to such a system. That could for instance be a `url`, a user name and password for basic authentication or some custom headers.

This concept is integrated with the [Destination Service](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/7e306250e08340f89d6c103e28840f30.html) that is available on SAP Cloud Platform. If the application has a service binding to this service in place the SDK will provide access to these destinations.

## Accessing Destinations ##

In general destinations are accessed through the `DestinationAccessor`:

```Java
DestinationAccessor.getDestination("my-destination");
```

This will lookup the destination in the destination service, if the application is running on SAP Cloud Platform. But also other sources like the environment variables are considered.

## Testing ##

For testing purposes the SDK provides functionality to provide such a destination in a local development environment. Refer to [these tutorial steps](https://developers.sap.com/tutorials/s4sdk-odata-service-cloud-foundry.html#b77d53b0-2d8b-449c-9a9a-9df80ee09a4e) on how to mock destinations for local development and testing.