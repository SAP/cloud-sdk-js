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

Consider the following code:

```java
result = ResilienceDecorator.executeSupplier(() -> operation(), configuration);
```

This code executes `operation()` in a resilient manner according to a `ResilienceConfiguration`.
The decorator will apply all in `configuration` configured patterns and all logic that is needed to combine these patterns.

#### Operations

The decorator operates with two kinds of operations:

<!-- Markdown doesn't allow tables without headers, thus the inline HTML -->
<table><tbody>
<tr>
    <td><a href="https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html">Callable</a></td>
    <td>May throw checked Exceptions</td>
</tr><tr>
    <td><a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html">Supplier</a></td><td>May only throw unchecked Exceptions</td>
</tr>
</tbody></table>

Noticeable is the difference in signatures: _Callable_ throws a _checked exception_ while _Supplier_ does not.
So you can choose whatever fits your use case best.

#### Executions

The decorator allows for three different ways of applying a configuration: 

<table><tbody>
<tr>
    <td><em>Execute</em></td>
    <td>Immediately runs the operation</td>
</tr><tr>
    <td><em>Decorate</em></td>
    <td>Returns a new operation to be run later</td>
</tr><tr>
    <td><em>Queue</em></td>
    <td>Immediately runs the operation asynchronously</td>
</tr>
</tbody></table>

In case your operation should run asynchronously we highly recommend you leverage the `queue` functionality. The decorator will ensure the [Thread Context](../multi-tenancy/thread-context.md) with Tenant and Principal information is propagated correctly to new Threads.

:::note
Note that the Resilience Decorator will try to propagate the current [Thread Context](../multi-tenancy/thread-context.md) at the _time the decorator is invoked_. This is important when you are decorating a Callable or Supplier and running it later. The Thread Context must be available whenever `decorateCallable` or `decorateSupplier` is evaluated. So if the call to `ResilienceDecorator` should take place asynchronously you should [follow these steps](../multi-tenancy/thread-context.md#running-asynchronous-operations) to ensure the Thread Context is available.
:::

#### Failures and Fallbacks

An operation might fail for two reasons:

1. The operation itself encounters a failure and throws an error or exception
2. A resilience pattern causes the operation to fail (e.g. the circuit breaker prevents further invocations)

The SDK wraps all kind of checked and unchecked exceptions into a `ResilienceRuntimeException` and throws them.

To deal with failures one can either catch the `ResilienceRuntimeException` or provide a fallback function:

```java
executeCallable(() -> operation(), configuration,
(throwable) -> {
    log.debug("Encountered a failure in operation: ", throwable);
    log.debug("Proceeding with fallback value: ", fallback);
    return fallback;
});
```

In the case of Callable this relieves you of the need to catch the exception at the outer level.

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

