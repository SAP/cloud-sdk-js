# Circuit Breaker Options

## Status

**superseded**

We will add resilience via middleware approach ([ADR#0031](../0031-resilience-options.md)).

## Context: What Triggered this Discussion?

We recently decided to increase the default timeout of our circuit breakers to 10 seconds.
This is pretty high for fail fast but necessary to prevent some requests from failing.
The underlying issue is currently that we cannot simply make timeout into a parameter, because that would mean creating a new circuit breaker which would dismiss all of the state the previous one accumulated.
More generally: circuit breakers inherently need state to decide when to e.g. open a circuit.

## Idea: Central Circuit Breaker (Options) Registry

We know all of the places where we use circuit breakers (currently for the XSUAA and the destination service IIRC).
So what we could do is expose some kind of central registry that allows overriding the options for that use case or even to register custom circuit breakers for specific scenarios.

```ts
registry.getDestinationServiceCB();
registry.getXsuaaServiceCB();

registry.setDestinationServiceCBOptions(options);
// this would override the default options and get rid of any state so far.
// intention here is that this could be used when starting the app and then never again

registry.registerCustomCBForDestinationService('name', options);
registry.getDestinationServiceCB('name');
```

## Decision

We currently see no customer demand for a feature like this.
We will revisit this topic if necessary.
