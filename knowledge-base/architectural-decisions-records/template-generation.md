# Generating odata clients using templates

## Status

proposed

## Context

The OData client generator is currently based on the ts-morph library, that provides functionality to programatically navigate and manipulate typescript code.

## Proposal

Base the generation of typescript code on JavaScript native string templates.

## Consequences

The focus of ts-morph is more on navigating existing code than on generating new code. There are some points from which we will benefit, when we swich to a template based approach.

### Performance
Firsts tests showed that we can make the pure generation of TypeScript code ~10 times as fast. Including parsing the improvement is ~5.6 times. It seems to be similar when including transpilation, although there are not final tests yet.

### Readability and convenience
Without ts-morph we don't need to handle the additional layer of abstraction it brings along. It is very useful when analysing code, but not really necessary when generating code. With native string templates we are free to use structures that suit our purpose and name them accordingly. The `VdmEntity` abstraction should be enough to deduct the resulting files from it. New team mates won't need to get used to the ts-morph api.
Without additional abstractions the templates become a frame, that is closer to the final code and allows the developers to easier understand what they are actually looking at.

## Testability
Currenly our generated code is quite difficult to test because the tests need to either match against the ts-morph structure or involve IO (to save the generated code and read it). With strings you can test small chunks of the generation more easily by comparing strings - this becomes even easier with snapshot testing.

