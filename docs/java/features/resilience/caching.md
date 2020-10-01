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
- CacheConfiguration
image:
---
The SAP Cloud SDK for Java provides abstractions for easily enabling caching in your application.Using caching would improve your application's responsiveness to your consumers.
The following article describes how to use Cloud SDK to enable caching in your application.

## Using the Resilience API for Caching

As described in our [Resilience section](https://sap.github.io/cloud-sdk/docs/java/features/resilience/resilience) the Cloud SDK allows to run any code in the context of one or more resilience patterns.
A cache configuration can also be added to `ResilienceConfiguration` as shown below:
```java
 // resilience configuration with cache
final ResilienceConfiguration configuration = ResilienceConfiguration.empty(resilienceId)
      [...]
      .cacheConfiguration(
             CacheConfiguration
                .of(Duration.ofDays(1))
                .withExpirationStrategy(CacheExpirationStrategy.WHEN_LAST_MODIFIED)
                .withParameters(param1,param2));
```
As shown in the code snippet above the following options can be passed to configure the cache:

1. Expiration Duration ([Duration]((https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html)), Default: instant)
2. [Expiration Strategy](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/CacheExpirationStrategy.html) (Default: `CacheExpirationStrategy.WHEN_LAST_MODIFIED`)
3. Cache Parameters (Serializable[] or Object[], Default: empty)

Once we have configured the cache, it can be enabled for an operation by using an `ResilienceDecorator` while executing the operation.
```java
 // Executing an operation with caching enabled
  ResilienceDecorator.executeSupplier(() -> runHeavyOperation(param1, param2), configuration);
```

:::note
Note that the cache is not created when we define the cache configuration, instead it is only created during the decoration of the `ResilienceDecorator`.
:::

The internal framework used to manage cache instances is `JCache`. This is a [Service Provider Interface](https://www.baeldung.com/java-spi) so any implementation of JCache should be added to the application `pom.xml`.
We recommend [Caffeine](https://github.com/ben-manes/caffeine),to use it, the below dependency should be added to your application `pom.xml`:
```
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>jcache</artifactId>
    <version>2.8.5</version>
</dependency>
```
:::note
Note that the caching only works, when a service provider or implementation for JCache is accessible at runtime.
:::

To invalidate the cache you can use:
```java
// invalidate
ResilienceDecorator.invalidateCache(ResilienceConfiguration.of(resilienceId));
```
## Using the JCache API for Caching

You can also choose to directly use [`JCache`](https://www.baeldung.com/jcache). 
For e.g, Consider the following code snippet which illustrates how to create a cache (similar to the one created above using SDK's resilience API) using the JCache API:

```java
CachingProvider cachingProvider = Caching.getCachingProvider();
CacheManager cacheManager = cachingProvider.getCacheManager();
MutableConfiguration<SomeCacheKey, SomeResult> config = new MutableConfiguration<>()
                .setExpiryPolicyFactory(ModifiedExpiryPolicy.factoryOf(duration));
Cache<SomeCacheKey, SomeResult> cache = cacheManager.createCache(resilienceId, config);
SomeCacheKey cacheKey = combineCacheKey(param1, param2);
SomeResult result = cache.get(cacheKey);
if( result==null) {
    result = runHeavyOperation(param1, param2);
    cache.put(cacheKey, result);
}
```