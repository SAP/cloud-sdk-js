# Public API Generation

## Status

accepted

## Context

For a typescript library it is common to use [barrels](https://basarat.gitbook.io/typescript/main-1/barrel) to make imports easy for consumers.
A barrel is simply an `index.ts` re-exporting content of other source file.
As a consumer you can then import all parts of the public API via the root `index.ts`.

In the past we exported everything via multiple barrel file in each folder and a \* in the barrels:

```ts
export * from './some-file.ts';
```

This was convenient for us, but we had no distinction between:

- This is part of the `public` API where a consumer can rely on stability.
- This is part of the `internal` API and not meant for direct usage of the consumer.
  The convenience had the drawback that we were often blocked to do a refactoring.
  This ADR proposes a way to improve the situation.

## API Categories

Our new strategy should provide the following options:

- `Exported Public API`: This is a cautious decision and consumer can rely on stable contract for minor versions. This API is reachable via the root level import.
- `Exported Internal API`: Exported for technical reasons but not meant to be used by consumer so no stable contract. This API is not accessible without [dirty tricks](https://www.goodreads.com/quotes/7714510-c-protects-against-accident-not-against-fraud).
- `Not exported`: Should be used wherever possible

Each object like constant, function, interface, type, class **must** be in one of the categories.

## How to Achieve it

Note that the problem has two sides:

- For TypeScript the `d.ts` files are the source of truth for the available types.
  You could use the [stripInternal](https://www.typescriptlang.org/tsconfig#stripInternal) compiler flag to remove internal object from the `d.ts` files.
  You could still use `export * from 'ABC"` because the type definition are reduced.
- For JavaScript the module exports in the transpiled `index.js` matter.
  To have a minimal API exposed here one has to avoid `*` in the export statements.

There are tools like [barrelsby](https://github.com/bencoveney/barrelsby#readme) to create the barrels for you.
However, these tools do not create named minimal exports.
Hence, we propose the following approach:

- You go over the code and manually maintain the API:
  1. Use `@internal` annotation and `stripInternal` compiler option for parts the internal API.
     This removes the internal API form the `d.ts` files.
  2. Maintain minimal named exports in the root `index.ts` pointing to the objects of the public API.
     This creates also minimal module exports in the JavaScript usecase.

This is a large manual effort initially and seems to be redundant because the minimal `index.ts` alone would already do the trick.
However, the double maintenance makes better check rules possible.
We plan to implement the following checks:

- Have a check to avoid any `*` exports in the root `index.ts`.
- Have a check to enforce a single `index.ts` on root level specifying all public exports.
- Have a check to enforce exposed object from `d.ts` match the named exports of the root `index.ts`.
  - A missing value in the `index.ts` denotes: You have exported something in the code but not added it to the relevant barrel or missed the `@internal`.
  - A missing value in the `d.ts` denotes: You have violated the API contract and marked a previously exported object as `@internal`.
- [Optiona] Have a check to enforce TsDoc on all exported objects.
  Either a full doc if part of the public API or at least `@internal` as minimal value.
  The [eslint-plugin-tsdoc](https://github.com/microsoft/tsdoc/issues/209) does not have a `require` rule.
  The [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) does have it but does not recognize many TypeScript object as `interface`.

## Consequences

We have a minimal API exposed to the consumer and most of the exported function are internal.
We are able to do refactoring on the internal API methods.
We have tooling enforcing to keep the public API minimal and well documented.
