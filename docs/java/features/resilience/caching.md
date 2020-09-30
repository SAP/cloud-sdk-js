---
id: caching
title: Caching using SAP Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Caching
description: How to use SAP Cloud SDK for Java to introduce caching into your application.
keywords:
- sap
- cloud
- sdk
- caching
- JCache
image:
---

## Using the Resilience API for Caching

As described in our [Resilience section](https://sap.github.io/cloud-sdk/docs/java/features/resilience/resilience) the Cloud SDK allows to run any code in the context of one or more resilience patterns.
A cache configuration can also be added to `ResilienceConfiguration` as shown below:
```java
 // resilience configuration with cache
  final ResilienceConfiguration configuration = ResilienceConfiguration.empty(resilienceId)
      [...]
      .cacheConfiguration(CacheConfiguration.of(Duration.ofDays(1)).withParameters(param1, param2));
```
As shown in the code snippet above the following options can be passed to configure the cache:

1. Expiration Duration 
2. Cache Parameters

Once we have configured the cache, it can be enabled for an operation by using an `ResilienceDecorator` while executing the operation.
```java
 // Executing an operation with caching enabled
  ResilienceDecorator.executeSupplier(() -> runHeavyOperation(param1, param2), configuration);
```

:::note
Note that the cache is not created when we define the cache configuration, instead it is only created during the decoration of the `ResilienceDecorator`.
:::
