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

1. The `ResilienceConfiguration` that determines which patterns should be applied how.
2. The `ResilienceDecorator` which is capable of applying the configuration to an operation.

### Building a Resilience Configuration

A new `ResilienceConfiguration` _with default values_ is created by providing an identifier for it:

```java
configuration = ResilienceConfiguration.of("identifier");
```

The identifier can either be a string or a class.
In case of the latter the (full) classname will be used internally as identifier.

Check [the JavaDoc](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html#of-java.lang.String-) for which patterns and parameters will be applied by default.
You can also create a configuration with all patterns disabled:

```java
configuration = ResilienceConfiguration.empty("identifier");
```

### Executing Operations

Some `operation` may be run in a resilient manner via the following code:

```java
configuration = ResilienceConfiguration.of(MyClass.class);
result = ResilienceDecorator.executeSupplier(() -> operation(), configuration);
```

## Resilience Capabilities


### Timeout

### Retry

### Circuit Breaker

### Bulkhead

