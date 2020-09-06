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

The SAP Cloud SDK offers some basic functionality that helps with connecting to other systems and services like S/4HANA Cloud. The SDK introduces the general concept of a `Destination` which holds basic information about how to connect to such a system. That could for instance be a `url`, a user name, and password for basic authentication or some custom headers.

This concept is integrated with the [Destination Service](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/7e306250e08340f89d6c103e28840f30.html) that is available on SAP Cloud Platform. If the application has a service binding to this service in place the SDK will provide access to these destinations.

## Accessing Destinations ##

In general destinations are accessed through the `DestinationAccessor`:

```java
DestinationAccessor.getDestination("my-destination");
```

This will look up the destination in the destination service if the application is running on SAP Cloud Platform. But
also, other sources like the environment variables are considered.

### Integrated Multi-Tenancy

By default, the `DestinationAccessor` is tenant aware.
If a tenant is available it will be used to access the destination service on behalf of that tenant.
If no destination is found in the tenant-specific destination service the SDK will try to get it using the service binding of the application.

This default retrieval strategy can be overridden by passing options to the destination loader as follows:

```java
DestinationAccessor.getLoader().tryGetDestination(destinationName, options);
```

See the section on [destination options](#building-destination-options) below.

## Decorating Destinations ##
Depending on the use case, one needs to wrap the accessed destination before issuing a request to a system. This is to make sure all required destination properties are correctly set before invoking the actual request.

### HTTP Destinations
In case of HTTP connections one needs to wrap the retrieved destination as `HttpDestination` using `asHttp()`:

```java
DestinationAccessor.getDestination("my-destination").asHttp();
```

This method ensures that the required destination properties are all set to make the HTTP connection.
With the resulting destination instance depending on the use case one can run HTTP queries for ODATA or REST.

### BAPI Destinations
Similarly, for BAPI endpoints you need to use `asRfc()`:

```java
DestinationAccessor.getDestination("my-destination").asRfc();
```

### Connect to on-premise S/4HANA system ###
If your destination is exposing an on-premise S/4HANA service via a **[Cloud
Connector](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/e6c7616abb5710148cfcf3e75d96d596.html)**
you need to decorate the destination with `DefaultErpHttpDestination`:

```java
final HttpDestination httpDestination =
destination.asHttp().decorate(DefaultErpHttpDestination::new);
```

This ensures the mapping of all S/4 properties like `sap-client` and `sap-locale` as HTTP request headers.

## Testing destinations in local environment ##

For testing purposes, the SDK provides functionality to provide such a destination in a local development environment. 
This is especially useful when working with destinations from the destination service since the service is not available in a local setting.

The SDK offers a `MockUtil` class that is capable of injecting destinations into the `DestinationAccessor`:

```java
final MockUtil mockUtil = new MockUtil();

MockDestination destination = MockDestination
            .builder("my-destination", URI.create("http://localhost:8080"))
            .build();

mockUtil.mockDestination(destination);

// This will now return the mocked destination
DestinationAccessor.getDestination("my-destionation").asHttp();
```

This helps with keeping production and test code nicely separated.
There are more overloads of the mocking on the [MockUtil class](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/testutil/MockUtil.html) that you can use.
Also refer to [these tutorial steps](https://developers.sap.com/tutorials/s4sdk-odata-service-cloud-foundry.html#b77d53b0-2d8b-449c-9a9a-9df80ee09a4e) on how to mock destinations for local development and testing.

## Retrieving destinations

### Get all destinations from the Destination Service on Cloud Foundry  ###

To fetch all destinations from the Destination Service, you need to make a call to `tryGetAllDestinations`.The method queries the [Destination Service API](https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/overview) and retrieves all the destinations available at the service instance and sub-account level. In case there is a destination available on both the levels with the same name, then this method prioritizes the destination at the service instance level.

Below is the sample call to `tryGetAllDestinations`:

```java
final Try<Iterable<ScpCfDestination>> destinations = destinationLoader.tryGetAllDestinations(options);
```

In the above call `destinationLoader` needs to be an instance of `ScpCfDestinationLoader`.

#### Building Destination Options ####

You need to build a `DestinationOptions` object and pass it as a parameter. It defines how Destinations Service is queried. In a simple application without provider/subscriber setup, your initial configuration is as simple as:

 ```java
final DestinationOptions options = DestinationOptions.builder().build();
 ```

For a provider/subscriber setup, a [retrieval strategy](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/connectivity/ScpCfDestinationRetrievalStrategy.html) must be chosen according to your particular use case from:
- `ALWAYS_SUBSCRIBER`
- `ALWAYS_PROVIDER`
- `SUBSCRIBER_THEN_PROVIDER`.

Here is an example for `SUBSCRIBER_THEN_PROVIDER` option:

 ```java
final DestinationOptions options =
           DestinationOptions
               .builder()
               .augmentBuilder(
                   ScpCfDestinationOptionsAugmenter.augmenter().retrievalStrategy(
                       ScpCfDestinationRetrievalStrategy.SUBSCRIBER_THEN_PROVIDER))
               .build();
```
You can similarly use other retrieval options.
