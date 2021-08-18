# Generating odata clients using templates

## Status

proposed

## Context

The OData client generator is currently based on the ts-morph library, that provides functionality to programmatically navigate and manipulate typescript code.

## Proposal

Base the generation of typescript code on JavaScript native string templates.

## Consequences

The focus of ts-morph is more on navigating existing code than on generating new code.
There are some points from which we will benefit, when we switch to a template-based approach.

### Performance

Firsts tests showed that we can make the pure generation of TypeScript code ~10 times as fast.
Including parsing it is ~5.6 times faster.
It seems to be similar when including transpilation, although there are no final results yet.

### Readability and convenience

Without ts-morph we don't need to handle the additional layer of abstraction it brings along.
It is very useful when analyzing code, but not really necessary when generating code.
With native string templates we are free to use structures that suit our purpose and name them accordingly.
The `VdmEntity` abstraction should be enough to deduct the resulting files from it.
New team mates won't need to get used to the ts-morph API.
Without additional abstractions the templates become a frame, that is closer to the final code and allows the developers to easier understand what they are actually looking at.
We also have a little more power over formatting the template approach, because we can directly modify the generated strings.
The currently used additional lint step could be left out with this (again improving performance a bit).

## Testability

Currently our generated code is quite difficult to test because the tests need to either match against the ts-morph structure or involve IO (to save the generated code and read it).
With strings you can test small chunks of the generation more easily by comparing strings - this becomes even easier with snapshot testing.
