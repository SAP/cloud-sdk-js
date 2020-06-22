---
id: resilience
title: Resilience Capabilities of the SAP Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Resilience
description: This article describes how the SAP Cloud SDK for Java can be used to introduce resilience patterns into an application.
keywords:
- sap
- cloud
- sdk
- resilience
- multi tenancy
- cloud native
- timeout
image:
---

The SAP Cloud SDK for Java provides abstractions for some frequently used resilience patterns like timeout, retry or circuit breaker.
Applying such patterns helps making an application more resilient against failures it might encounter.

## Consuming the Resilience API

The SDK allows to run any code in the context of one or more resilience patterns.
The are two essential building blocks to achieving this:

1. The `ResilienceConfiguration` that determines which patterns should be applied.
2. The `ResilienceDecorator` which is capable of applying the configuration to an operation.

The fluent [Resilience Configuration API](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html) provides builders that help with assembling different resilience patterns and their associated parameters.
Which patterns are available and how to use them is explained in the [dedicated section below](#building-a-resilience-configuration).

The [Resilience Decorator](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html) is capable of applying such a configuration to a given `Callable` or `Supplier`.

### Executing Operations

Some `operation()` may be run in a resilient manner via the following code:

```java
configuration = ResilienceConfiguration.of(MyClass.class);
result = ResilienceDecorator.executeSupplier(() -> operation(), configuration);
```

Here a new configuration based on default values is used.


### Building a Resilience Configuration

A new `ResilienceConfiguration` _with default values_ is created by providing an identifier for it:

```java
configuration = ResilienceConfiguration.of("identifier");
```

The identifier can be either a string or a class.
In case of the latter the (full) classname will be used as identifier.

Check [the JavaDoc](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html#of-java.lang.String-) for which patterns and parameters will be applied by default.
You can also create a configuration with all patterns disabled:

```java
configuration = ResilienceConfiguration.empty("identifier");
```


## Resilience Capabilities


### Timeout

### Retry

### Circuit Breaker

### Bulkhead

