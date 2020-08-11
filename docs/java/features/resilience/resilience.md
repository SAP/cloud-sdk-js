---
id: resilience
title: Resilience Capabilities of the SAP Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Resilience
description: How to use SAP Cloud SDK for Java to introduce resilience patterns into your application.
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

The following article describes which resilience features the SDK offers and how to apply them.
If you are looking for a quick start with resilience also check out our [dedicated tutorial](https://developers.sap.com/tutorials/s4sdk-resilience.html) on the topic!

## Using the Resilience API

The SDK allows to run any code in the context of one or more resilience patterns.
There are two essential building blocks for achieving this:

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

Some resilience patterns are applied over multiple executions of the same operation.
For example the circuit breaker will prevent further executions, if a significant portion of previous attempts failed.

To understand how the SDK applies this concept consider the following snippet:

```java
configuration1 = ResilienceConfiguration.of("config-id-1");
configuration2 = ResilienceConfiguration.of("config-id-1");
configuration3 = ResilienceConfiguration.of("config-id-2");

ResilienceDecorator.executeSupplier(() -> operation(), configuration1);
ResilienceDecorator.executeSupplier(() -> operation(), configuration1);
ResilienceDecorator.executeSupplier(() -> operation(), configuration2);
ResilienceDecorator.executeSupplier(() -> operation(), configuration3);
```

Here executions one, two and three will all share the same "resilience state".
This means that they will share the same instance of a circuit breaker or bulkhead.
So the state is shared via [the identifier](#building-a-resilience-configuration) of the associated configuration.

#### Operation Types

The decorator operates with two kinds of operations:

<!-- Markdown doesn't allow tables without headers, thus the inline HTML -->
<table><tbody>
<tr>
    <td><a href="https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html">Callable</a></td>
    <td>May throw checked or unchecked Exceptions</td>
</tr><tr>
    <td><a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html">Supplier</a></td><td>May only throw unchecked Exceptions</td>
</tr>
</tbody></table>

Noticeable is the difference in signatures: _Callable_ throws a _checked exception_ while _Supplier_ does not.
So you can choose whatever fits your use case best.

#### Execution Variants

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
    log.debug("Proceeding with fallback value: {}", fallback);
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
The identifier will be used to apply resilience patterns across [multiple invocations to operations](#executing-operations).

Check [the JavaDoc](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html#of-java.lang.String-) for which patterns and parameters will be applied by default.
You can also create a configuration with all patterns disabled:

```java
configuration = ResilienceConfiguration.empty("identifier");
```

Individual resilience patterns are configured via dedicated builder classes like `TimeLimiterConfiguration` and are added to the configuration via dedicated setters, e.g. `timeLimiterConfiguration()`.
For details see the list of [Resilience Capabilities](#resilience-capabilities) below.

#### Multi Tenancy

The SDK is capable of applying the different resilience patterns in a tenant and principal aware manner.
Consider for example the Bulkhead pattern which limits the amount of parallel executions.
If the operation is tenant specific then you would probably want to avoid one tenant blocking all others.

For this reason the SDK _by default_ isolates resilience patterns based on tenant and principal, if they are available.
This strategy can be configured, e.g. for running _without any isolation_ use:

```java
configuration.isolationMode(ResilienceIsolationMode.NO_ISOLATION);
```

Other than no isolation there are essentially two modes for tenant and/or principal isolation:

<table><tbody>
<tr>
    <td>Required</td>
    <td>Always isolates on tenant and/or principal level, will throw an exception if no tenant/principal is available</td>
</tr><tr>
    <td>Optional</td>
    <td>Only isolates if tenant and/or principal information is available</td>
</tr>
</tbody></table>

Details can be found on the API reference of [ResilienceIsolationMode](https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceIsolationMode.html).

## Resilience Capabilities

The following resilience patterns are available and can be configured in a Resilience Configuration:

<table><tbody>
<tr>
    <td>Timeout</td>
    <td><em><a href="https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.TimeLimiterConfiguration.html">TimeLimiterConfiguration</a></em></td>
    <td>Limit how long an operation may run before it should be interrupted</td>
</tr><tr>
    <td>Retry</td>
    <td><em><a href="https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.RetryConfiguration.html">RetryConfiguration</a></em></td>
    <td>Retry a failed operation a limited amount of times before failing</td>
</tr><tr>
    <td>Circuit Breaker</td>
    <td><em><a href="https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CircuitBreakerConfiguration.html">CircuitBreakerConfiguration</a></em></td>
    <td>Reject attempts if too many failures occurred in the past</td>
</tr><tr>
    <td>Bulkhead</td>
    <td><em><a href="https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.BulkheadConfiguration.html">BulkheadConfiguration</a></em></td>
    <td>Limit how many instances of this operation may run in parallel</td>
</tr>
</tbody></table>

<!-- Caching is not documented yet, leave it out for now
<tr>
    <td><em>Caching</em></td>
    <td><em><a href="https://help.sap.com/http.svc/rc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.html">CacheConfiguration</a></em></td>
    <td>Enables caching. See the dedicated article on caching.</td> 
</tr>
-->

You can find good explanations on how the individual patterns behave on the [documentation of resilience4j](https://resilience4j.readme.io/docs/) which the SDK uses under the hood to perform resilient operations.

Be aware that the patterns interact with each other. They are applied in the following order:

1. Timeouts
2. Bulkhead
3. Circuit Breaker
4. Retries
5. Fallbacks

This means that every individual attempt triggered by retries will be limited by the timeout.
Every failed retry will be accounted for in the circuit breaker.
Only if all retries failed the fallback function will be considered.
