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

## Retrieve all destinations from the Destination Service on Cloud Foundry  ##
 
In order to fetch all destinations from the Destination Service you need to make a call to `tryGetAllDestinations`.The method queries the [Destination Service API](https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/overview) and retrieves all the destinations available at the service instance and sub-account level. In case there is a destination available on both the levels with the same name, then this method prioritizes the destination at the service instance level.

Below is the sample call to `tryGetAllDestinations`:

```java
final Try<Iterable<ScpCfDestination>> destinations = destinationLoader.tryGetAllDestinations(options);
```

 In the above call `destinationLoader` needs to be an instance of `ScpCfDestinationLoader`.
 
  Also, you need to build a `DestinationOptions` object and pass it as a parameter. It contains the configuration on how the destination service is being queried. If you have a simple application without provider/subscriber setup, then your initial configuration may look like as follows:

 ```java
final DestinationOptions options = DestinationOptions.builder().build();
 ```

  If you have a provider/subscriber setup, a retrieval strategy must be chosen according to your particular use case. The retrieval strategy can be `ALWAYS_SUBSCRIBER`, `ALWAYS_PROVIDER` or `SUBSCRIBER_THEN_PROVIDER`.
  
  Example for `SUBSCRIBER_THEN_PROVIDER` use:

 ```java
final DestinationOptions options =
           DestinationOptions
               .builder()
               .augmentBuilder(
                   ScpCfDestinationOptionsAugmenter.augmenter().retrievalStrategy(
                       ScpCfDestinationRetrievalStrategy.SUBSCRIBER_THEN_PROVIDER))
               .build();
```




## Accessing Destinations ##

In general destinations are accessed through the `DestinationAccessor`:

```java
DestinationAccessor.getDestination("my-destination");
```

This will lookup the destination in the destination service, if the application is running on SAP Cloud Platform. But
also other sources like the environment variables are considered.

### Connect to on-premise S/4HANA system ###
If your destination is exposing an on-premise S/4HANA service via a **[Cloud
Connector](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/e6c7616abb5710148cfcf3e75d96d596.html)**
you need to decorate the destination with `DefaultErpHttpDestination`

```java
final HttpDestination httpDestination =
destination.asHttp().decorate(DefaultErpHttpDestination::new);

```

## Testing ##

For testing purposes the SDK provides functionality to provide such a destination in a local development environment. Refer to [these tutorial steps](https://developers.sap.com/tutorials/s4sdk-odata-service-cloud-foundry.html#b77d53b0-2d8b-449c-9a9a-9df80ee09a4e) on how to mock destinations for local development and testing.
