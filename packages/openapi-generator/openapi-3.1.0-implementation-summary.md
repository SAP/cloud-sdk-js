# OpenAPI 3.1.0 Support — Implementation Summary

This document summarizes the changes made to `@sap-cloud-sdk/openapi-generator`
to close the gaps identified in [openapi-3.1.0-gap-analysis.md](./openapi-3.1.0-gap-analysis.md).

## Overview

OpenAPI 3.1.0 support was implemented across 8 source files, backed by 26 new
tests. Compilation is clean and the full unit suite passes (234 tests). All
existing OpenAPI 3.0.x behavior is preserved (backward compatible).

> Note: 3 test suites fail in the local environment due to **pre-existing**
> issues unrelated to this work (a `content-type` dependency version mismatch
> and an unbuilt `test-util-internal` workspace dependency). These also fail on
> the base branch.

## Version handling (root cause — gap §3)

- [`src/document-converter.ts`](./src/document-converter.ts): `convertDocToOpenApiV3`
  now inspects the `openapi:` version string. Any `3.x` document skips the
  `swagger2openapi` conversion (which only meaningfully converts Swagger 2.0 and
  otherwise passes 3.1 through untranslated while mislabeling it as 3.0). 3.1
  documents log an info line and are handed to the native, 3.1-aware parser.

## Data-type model — JSON Schema 2020-12 alignment (gap §1)

- [`src/openapi-types.ts`](./src/openapi-types.ts): added a permissive
  `OpenApiSpecSchema` input type (accepts both 3.0 and 3.1 schema shapes), plus
  output models `OpenApiTupleSchema` and `OpenApiConstSchema`, and new
  `OpenApiSchemaProperties` fields: `examples`, numeric
  `exclusiveMinimum`/`exclusiveMaximum`, `contentEncoding`, `contentMediaType`.
- [`src/parser/type-mapping.ts`](./src/parser/type-mapping.ts): `getType` now
  accepts a `type` **array** and maps it to a deduplicated TypeScript union.
- [`src/parser/schema.ts`](./src/parser/schema.ts) — the core rewrite:

  | 3.1 feature | Handling |
  |---|---|
  | `type: ["string", "number"]` | union → `anyOf` |
  | `type: [..., "null"]` | nullability via `isNullableSchema` / `stripNullability` (no double `\| null`) |
  | `type: "null"` | standalone `null` type |
  | `const` | serialized literal type |
  | `prefixItems` (tuples) | tuple schema, with `items` as a rest element |
  | numeric `exclusiveMinimum`/`exclusiveMaximum` | collected into schema properties |
  | `contentEncoding` / `contentMediaType` | content-encoded strings map to `Blob`; also documented |
  | `examples` (array) | collected into schema properties |
  | `patternProperties` | merged into `Record<string, ...>` additional properties |
  | `$ref` siblings (`description`) | preserved on properties |

## Serialization (gap §1.4, §1.5)

- [`src/file-serializer/schema.ts`](./src/file-serializer/schema.ts): serializes
  const schemas (e.g. `'fixed'`) and tuple schemas (e.g. `[string, ...number[]]`).
- [`src/schema-util.ts`](./src/schema-util.ts): new type guards (`isTupleSchema`,
  `isConstSchema`) and JSDoc generation for `examples`, exclusive bounds, and the
  content keywords.

## Document / top-level structure (gap §2)

- [`src/parser/document.ts`](./src/parser/document.ts) &
  [`src/parser/api.ts`](./src/parser/api.ts):
  - `paths` is now optional — a schemas-only document generates models without
    crashing.
  - An empty `paths` object is injected before validation so the underlying
    validator (which still requires the key) accepts paths-less 3.1 documents.
  - Webhooks trigger an explicit warning rather than being silently dropped
    (see design note below).
  - Persisted-schema nullability is derived from the 3.1 `"null"` type form.

## Design note: webhooks

Webhooks produce a **warning** rather than generated client code. Webhooks model
inbound requests to the API *consumer*, so emitting callable client methods for
them would be semantically incorrect for a client SDK. If callable operations
for webhooks are desired, `parseApis` can be extended to fold them in.

## Tests

New/updated tests cover every feature above, in:

- [`src/parser/schema.spec.ts`](./src/parser/schema.spec.ts) — 3.1 feature block
- [`src/parser/type-mapping.spec.ts`](./src/parser/type-mapping.spec.ts) — type arrays / unions
- [`src/file-serializer/schema.spec.ts`](./src/file-serializer/schema.spec.ts) — const / tuple serialization
- [`src/schema-util.spec.ts`](./src/schema-util.spec.ts) — 3.1 property documentation
- [`src/parser/document.spec.ts`](./src/parser/document.spec.ts) — nullable persisted schemas, paths-less docs
- [`src/parser/api.spec.ts`](./src/parser/api.spec.ts) — schemas-only → no APIs
- [`src/document-converter.spec.ts`](./src/document-converter.spec.ts) — 3.1 passthrough
