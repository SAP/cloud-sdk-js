# Evaluation of Resilience Framework

## General

In JS, frameworks typically only implement timeout, circuit breaker, and fallback patterns.
Bulkheads are not implemented due to Node's single thread nature (although some long-running I/O procedures are implemented with pools, e.g., File or Database I/O).
In general, resilience frameworks do not play such an important role as in the Java world, as the client will likely not go down due to exhausted threads (bounded resource) but is rather limited by hardware resources such as CPU or memory.
For this, other mechanisms such as scaling out additional nodes based on monitoring low level resources must be in place.

Nevertheless, even if the killer argument of cascading failures disappears, some arguments for resilience frameworks are still applicable:

- **Fallback**: This provides a consistent way of exposing fallbacks and helps with the mental model of thinking about what happens if a downstream system is not available.
- **Timeouts**: Applying timeouts is still a good idea to reduce memory, CPU and outbound port pressure as a result of maintaining potentially infinite parallel requests which are just slow. Admittedly, timeouts to decrease the likelihood of cascading failure does not apply in JS.
- **Circuit Breakers**: Well, we deal with S/4HANA as the downstream system (and the other systems are not better (e.g., SFSF)). Being graceful towards these systems, remains a good idea (b/c it is pet, and not cattle) and a contribution to our Cloud ecosystem.
- **Statistics**: Good resilience frameworks collect plenty of stats such as distribution of response times (median, 90th percentile, 99th percentile) and for most JS frameworks the classical Hystrix Dashboard works which allows for visualizing connectivity health of the system (https://github.com/Netflix/Hystrix/wiki/Operations).
- **Command Pattern**: The command pattern (although less prominent in JS) allows for a nice and useful abstraction (see discussion here: https://github.com/Netflix/Hystrix/wiki/FAQ-:-General) to also wrap other aspects such as multi-tenancy (via command key), user-based isolation (via command key), or caching can be provided on top.

## Comparison of Frameworks

| Category/Framework           | [HystrixJS](https://www.npmjs.com/package/hystrixjs)                                                                    | [Brakes](https://github.com/awolden/brakes)                                                                                                               | [rsXjs](https://github.com/karimsa/rsxjs#getting-started) | [Opossum](https://github.com/nodeshift/opossum)                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Version                      | 0.2.0                                                                                                                   | 2.6.0                                                                                                                                                     | 0.5.6                                                     | 1.10.0                                                                                                  |
| Stars                        | N/A                                                                                                                     | 174                                                                                                                                                       | 3                                                         | 89                                                                                                      |
| Downloads per Week           | 3426                                                                                                                    | 4567                                                                                                                                                      | 310                                                       | 5593                                                                                                    |
| Named commands               | **Yes**                                                                                                                 | **Yes**                                                                                                                                                   | No                                                        | **Yes**                                                                                                 |
| Timeout                      | **Yes**                                                                                                                 | **Yes**                                                                                                                                                   | **Yes**                                                   | **Yes**                                                                                                 |
| Explicit Error Determination | **Yes**                                                                                                                 | **Yes**                                                                                                                                                   | No                                                        | No                                                                                                      |
| Fallback                     | **Yes**                                                                                                                 | _Yes, but w/o error propagation_                                                                                                                          | _Yes, but w/o error propagation_                          | **Yes**                                                                                                 |
| HystrixSSE Stream            | _Yes, but only if you use RXJS <6.0.0 otherwise runtime error due to changed Observable API_                            | **Yes**                                                                                                                                                   | No                                                        | **Yes**                                                                                                 |
| Circuit Breaker              | **Yes**                                                                                                                 | _Yes, but implementation is very odd ... After circuit breaker timeout everything is set to zero (?!?), e.g., there is no half open state of the breaker_ | _Yes, but only two options to configure available_        | **Yes**                                                                                                 |
| Last Update                  | 2 years ago, still depends on RXJS < 6                                                                                  | _Nov 9, 2018_                                                                                                                                             | **Jan 13, 2019**                                          | **Jan 31, 2019**                                                                                        |
| HystrixSSE Stream            | Yes, but only if you use RXJS <6.0.0 otherwise runtime error due to changed Observable API                              | Yes, out of the box                                                                                                                                       | No                                                        | **Yes**                                                                                                 |
| Offset until Circuit Eval    | **Yes** (circuitBreakerRequestVolumeThreshold)                                                                          | **Yes** (waitThreshold)                                                                                                                                   | **Yes**                                                   | **Yes** (maxFailures, allowWarmUp, volumeThreshold)                                                     |
| PPMS Risk                    | Low: (A-E)                                                                                                              | Low: (A-E)                                                                                                                                                | Medium: never requested (MIT license)                     | Medium: never requested (ASL license)                                                                   |
| Typescript support           | **[Yes](https://www.npmjs.com/package/@types/hystrixjs)** (not tried yet)                                               | No                                                                                                                                                        | **Yes** (ships with `.d.ts` files)                        | **[Yes](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/opossum)** (not tried yet) |
| Noteworthy                   | - Complete Documentation down on Bitbucket (404), seems to be out of support. <br/> - Some metrics in dashboard missing | - Circuit Breaker Threshold is a success rate instead of a failure rate <br/> - Strong on detailed stats and event callbacks                              | N/A                                                       | tbc                                                                                                     |

I love the JS universe, you can evaluate more frameworks then line of codes are required to solve the problem in question, even good ol' Haskell Monads are not sacred anymore:

- https://github.com/robey/profuse
- https://github.com/jike-engineering/circuit-breaker-ts
- https://www.npmjs.com/package/circuit-breaker-monad
- https://github.com/julekgwa/simplified-hystrixjs (based on Opossum)

## Summary

At the time of writing, **Opossum** seems to be the only framework that satisfies all evaluated dimensions, except providing a dedicated error handler.
Thus, application code must be aware of implications onto a surrounding resilience framework (e.g., when (re)throwing errors on faulty HTTP Codes).

**HystrixJS** seems to soundly implemented, however, seems to be not maintained since 2 years in Bitbucket.
The documentation throws a 404 and types are only available as additional community content.

**Brakes** provides nice Hystrix-compliant statistics, however, is very poor on circuit breaker implementation (e.g., no half-open circuit on recovery to allow for graceful circuit breaker opening).

As a result, **Opossum is recommended** as framework.

For more information about other events emitted by Opossum's breaker, consult [opossum documentation] page.

## Documentation on Opossum Failures in VDM

As the team decided to not integrate the framework internally as a dependency in `js-cloud-sdk`, the circuit breaker needs to be integrated on the exported VDM methods provided to user by a service vdm module.

The framework **Opossum** offers a `CircuitBreaker` object that encapsulates the possible events that may occur by the request while communicating with other components. To build a `CircuitBreaker` object a builder function is provided by the framework `circuitBreaker` and expects as parameters an **asynchronous function** that performs the HTTP request and _optionally_ a configuration object that includes the desired constraint of the request.

Following to the architecture of VDM modules, OData request can be performed through a `.execute()` **method** provided by a request builder class (e.g. `CreateRequestBuilder`) of a VDM service's.In this instance, by passing our service call method `.execute()` as parameter in `circuitBreaker` object builder, the method will be parsed as **function** and thus vanishing all internal data of the class. The constraint, in this stipulation, is that the keyword `this`, that allows the access to class attributes will be set to `undefined` and therefore we lose away all our internal information essential to build the OData request configuration, what causes the raise of several errors in run-time (e.g. `Cannot read property "method" of undefined.`, where `method` attribute is accessed using the internal class attributes).

As the entire VDMs module has been built around classes that represent OData VDM, wrapping the execution call externally using this method described in opossum documentation is not feasible. We need then to consider two different approaches to deal with this instance:

1- Integrate **Opossum** internally in the js-cloud-sdk as a dependency. In this instance, we can employ the framework effectively by wrapping the `axios` HTTP calls directly in the circuit breaker and at that rate resilience can be provided as an optional feature to the user.

2- We wrap our OData call execution method into a function. Through the asynchronous pattern, the function returns a `Promise` of the entity that will be fulfilled/fail once the breaker is fired (for an example see the implementation in the next section). The counter-side of this case is that all potential HTTP call (e.g. csrf-token, destination retrieval) will be monitored by the circuit breaker and have to satisfy the provided constraint of the framework.

## Recommendation for Integrating Opossum

To establish resilience using **Opossum** framework, we need first to add `circuitBreaker` in the file header where entity request will be executed:

```javascript
import circuitBreaker from 'opossum';
```

`circuitBreaker` provides an interface that carry out circuit breaker design pattern mechanism internally and expects one parameters of type `function` that wraps the asynchronous request and an optional option `object` that maps the circuit breaker configuration.

In js-sdk, we perform entity requests to the targeted service (e.g. BusinessPartner service), using their respective request builder:

```javascript
const allBuPa = BusinessPartner.requestBuilder().getAll().execute(destination);
```

In order to wrap the HTTP request in the circuit breaker we wrap the `.execute(destination)` method that returns an eventual completion of our entity object (`Promise<BusinessPartner[]>` in our instance) into a function:

```javascript
function getAllBuPa(destination) {
  return BusinessPartner.requestBuilder().getAll().execute(destination);
}

const breaker = circuitBreaker(getAllBuPa, options);
```

The `circuitBreaker` emits different events when they occur during the HTTP call. When firing the breaker, `fire` event is emitted by the `breaker` object:

```javascript
breaker.fire(destination).then(response => {
  // do something with the returned entities...
});
```

## Alternatives to discuss

The team still needs to decide whether resilience is a facility provided by the cloud-sdk for js out-of-the-box or not.
The following alternatives are possible:

1. As the resilience functionality is not as highly interwoven as in the Java world due to Threads missing, we can decide to keep it separate and advise customers on the implementation of resilience via blogs / documentation only.
   On the positive side, this enables others to provide the framework of their choice.

2. We wrap the resilience functionality and offer it as a first-class citizen in the framework.
   As a result, the cloud-sdk has an opinionated way and commits to the above-recommended framework.
   The positive approach is that a wrapper could implement additional resilience functionality such as caching and provide multi-tenant/user-based resilience out-of-the-box based on the information.
   Furthermore, the CDT <!-- Missing part of sentence -->
   On the negative side the team needs to buy that providing multi-tenancy out of the box requires the provisioning of additional access strategies (e.g., see JwtAccessorStrategies of Java SDK), that others will not like the chosen library and the dependencies it introduces, and maintenance of an open-source dependency might be necessary contributing to Red Hat's nodeshift project.

## Misc

Run Hystrix Dashboard locally to check behavior:

- Download from https://github.com/mlabouardy/hystrix-dashboard-docker/blob/master/hystrix-dashboard.jar
- Run with java -jar hystrix-dashboard.jar
- Should run on http://localhost:8082/hystrix

[opossum documentation]: https://github.com/nodeshift/opossum#events
