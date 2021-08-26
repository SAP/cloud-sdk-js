# OpenAPI Client generator

## Status

decided

## Context

We are currently using the [Java-based OpenAPI generator CLI](https://www.npmjs.com/package/@openapitools/openapi-generator-cli).
As this generator is targeting many different programming languages in some points it does not fit our needs, e. g. handling of unique names or API files, which also differ between components.
In our current approach we wrap the generated API with our own to fit those needs, but we realized, that we ended up writing many workarounds.
Many workarounds can currently only be covered by preprocessing/manipulating the original service definition.
At the moment, some API designs cannot be realized or are not worth investing into.
We have observed that due to the size of the project, there are quite a lot of known bugs, that take a long time to solve or are not solved at all.
The probably biggest pain point is that the used CLI needs a Java runtime.
To run the CLI we have to download the given .jar file (~24MB) and make it part of our npm package, making it much bigger in size than usual.
This is necessary as the file is not downloaded on installation but on command execution, causing other errors down the line (hurts SLC-29, race conditions in async batch execution).

## Decision

Write our own generator, that is purely based on TypeScript and supports the API we need out of the box.

## Consequences

When writing a PoC for this, it became apparent, that adjusting our wrapper files to this approach can be done without mentionable investments.
The bigger effort went into parsing and generating the schemas (model), which is in a good enough state to consider for production.
Generating the whole API on our own puts the API design and bug fixes into our hands.
This allows us to realize the API design as planned and with less/no workarounds.
In addition we can immediately solve the known bugs (partially because some of the broken code is not even needed anymore).
Solving potential bugs in the future also lies in our hands, making us responsible for fixing them.
We would also be responsible to keep up with the OpenAPI specification, that could be updated at any time.
Getting rid of Java is a benefit with many facets:

1. Users won't need a JRE anymore.
2. We don't have to keep the openapi generator .jar file as part of our package, reducing the size of the package significantly.
3. Generation is much faster, comparison in a non-scientific approach on a personal computer with 5 runs (~15s vs. ~3.5s).

### Currently needed investment

To transition the current PoC to a production-ready implementation, the following points need to be fulfilled:

- Clean up the current code (parts of the implementation are quick and dirty)
- Test the code thoroughly and fix failing tests (the current PoC is untested, but passes the existing E2E tests)
- Align on some open questions regarding the API
- Generate documentation
