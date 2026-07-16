# SAP Cloud SDK OpenAPI Generator vs. OpenAPI 3.1.0 — Gap Analysis

## Executive summary

The `@sap-cloud-sdk/openapi-generator` (v4.7.0) is architected **exclusively around OpenAPI 3.0.x**. It converts Swagger 2.0 → 3.0 on input, then types and parses everything against the `OpenAPIV3` (3.0) namespace of `openapi-types`. It never targets the `OpenAPIV3_1` namespace, and its conversion dependency does not down-convert 3.1 → 3.0.

The most important structural finding:

- The pipeline is [`convertOpenApiSpec`](src/document-converter.ts#L15) → `swagger2openapi.convert()` → [`parseOpenApiDocument`](src/parser/document.ts#L32), casting the result to `OpenAPIV3.Document`.
- `swagger2openapi` **short-circuits any `3.x` document** — `index.js:1401`: `if (swagger.openapi ... startsWith('3.'))` returns the doc essentially unchanged. It only transforms `swagger: "2.0"` inputs (line 1422 rejects anything that isn't 2.0 or 3.x). Its `targetVersion` is hardcoded to `'3.0.0'` (`index.js:28`), and its README states it only tracks 3.0.x.

**Consequence:** A 3.1.0 document is accepted (it starts with `3.`) but passes through **untranslated** into a parser whose type contracts and branching assume 3.0.x semantics. There is no `type`-array handling, no `null`-in-`type` handling, no `exclusiveMinimum`-as-number handling, etc. So 3.1 features are silently mis-parsed, dropped, or coerced to `any` rather than erroring cleanly. Nothing in the codebase validates or gates on the `openapi:` version string.

Below, every gap is grouped, with the exact code location, the 3.0-vs-3.1 difference, the runtime effect, and references.

---

## 1. Data-type model (the core JSON Schema 2020-12 alignment)

OpenAPI 3.1 adopts JSON Schema 2020-12 wholesale. This is the largest cluster of gaps.

### 1.1 `type` as an array — **not supported**

- **3.0:** `type` is a single string. **3.1:** `type` may be an array, e.g. `type: ["string", "null"]`. (`openapi-types` reflects this: `OpenAPIV3_1` allows `type?: (ArraySchemaObjectType | NonArraySchemaObjectType)[]`; `OpenAPIV3` only allows the single-string form.)
- **Code:** [type-mapping.ts `getType`](src/parser/type-mapping.ts#L49) takes `originalType: string | undefined` and does a dictionary lookup `typeMapping[originalType]`. An array like `["string","null"]` misses every key → falls to `any`. Branching in [schema.ts](src/parser/schema.ts#L42-L69) compares `schema.type === 'array'` / `=== 'object'` with strict equality, which is always false for an array-typed `type`.
- **Effect:** Any 3.1 union type collapses to `any`, losing type safety entirely.
- **Refs:** [Migrating 3.0→3.1 (OpenAPI Initiative)](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0), [JSON Schema 2020-12 core](https://json-schema.org/draft/2020-12/json-schema-core).

### 1.2 `nullable` removed in 3.1; replaced by `null` in `type` — **only 3.0 form supported**

- **3.0:** `nullable: true`. **3.1:** `nullable` is deleted from the spec; nullability is expressed via `type: [..., "null"]`.
- **Code:** The generator reads only `nullable` — [schema.ts:171](src/parser/schema.ts#L171), [document.ts:118](src/parser/document.ts#L118), serialized in [schema.ts:116](src/file-serializer/schema.ts#L116) and [schema-file.ts:28](src/file-serializer/schema-file.ts#L28). There is no logic that derives nullability from a `"null"` entry in a `type` array.
- **Effect:** A 3.1 nullable field (`type: ["string","null"]`) produces neither a `nullable` flag nor a `| null` union; the `"null"` is simply lost (and the whole `type` array already degrades to `any` per 1.1). Conversely 3.1 docs never carry `nullable`, so the entire nullability path is dead for them.
- **Refs:** [3.1 nullable removal](https://www.apimatic.io/blog/2021/09/migrating-to-and-from-openapi-3-1), `openapi-types` omits `nullable` in 3.1 `BaseSchemaObject`.

### 1.3 `exclusiveMinimum` / `exclusiveMaximum` type change — **not handled**

- **3.0:** booleans that modify `minimum`/`maximum`. **3.1:** numeric values that _are_ the bound.
- **Code:** Neither keyword appears anywhere in the parser. [`parseSchemaProperties`](src/parser/schema.ts#L318-L344) collects only `multipleOf, maximum, minimum, maxLength, minLength, minItems, maxItems, pattern` — `exclusiveMinimum`/`exclusiveMaximum` are omitted entirely (in both 3.0 and 3.1 forms).
- **Effect:** Exclusive bounds are dropped from generated JSDoc regardless of version; the semantic change is simply invisible.
- **Refs:** [3.1 exclusive bounds](https://apichangelog.substack.com/p/migrating-from-openapi-30-to-31).

### 1.4 `const` — **not supported**

- **3.1** adds `const` (single fixed value), replacing single-value `enum`. (`openapi-types`: `const?: any` in 3.1.)
- **Code:** No reference to `const`; only `enum` is parsed ([schema.ts:46](src/parser/schema.ts#L46), [`parseEnumSchema`](src/parser/schema.ts#L188)).
- **Effect:** A `const` schema matches none of the branches and falls through to `getType(schema.type,...)` → typically `any`; the literal value is lost (no literal type emitted).
- **Refs:** [3.1 const](https://www.apimatic.io/blog/2021/09/migrating-to-and-from-openapi-3-1).

### 1.5 `prefixItems` (tuples) — **not supported**

- **3.1** adds `prefixItems` for tuple validation; `items` then governs additional entries.
- **Code:** [`parseArraySchema`](src/parser/schema.ts#L100) reads only `items` and `uniqueItems`. No `prefixItems`.
- **Effect:** Tuple positional typing is lost. If a 3.1 array uses `prefixItems` without `items`, `schema.items` is undefined → `parseSchema(undefined)` → `{ type: 'any' }` ([schema.ts:33-36](src/parser/schema.ts#L33)), yielding `any[]`.
- **Refs:** [JSON Schema 2020-12 prefixItems](https://json-schema.org/draft/2020-12/json-schema-core#name-prefixitems).

### 1.6 `contentEncoding` / `contentMediaType` — **not supported**

- **3.1** introduces JSON Schema's `contentEncoding`/`contentMediaType` (e.g., for base64/binary), superseding the 3.0 `format: binary` idiom for schema-level content.
- **Code:** The generator handles binary only via `format: binary` → `Blob` ([type-mapping.ts:53](src/parser/type-mapping.ts#L53), [media-type.ts:63](src/parser/media-type.ts#L63)). `parseSchemaProperties` does not collect `contentEncoding`/`contentMediaType`.
- **Effect:** 3.1 content-encoded strings are treated as plain `string`; binary handling for 3.1-style specs won't map to `Blob`.
- **Refs:** [3.1 file uploads / contentEncoding](https://apichangelog.substack.com/p/migrating-from-openapi-30-to-31), [JSON Schema content keywords](https://json-schema.org/draft/2020-12/json-schema-validation#name-a-vocabulary-for-the-conten).

### 1.7 `examples` (array) inside schemas — **not supported; only singular `example`**

- **3.1** supports JSON Schema `examples` (array) inside a Schema Object; `example` (singular) is deprecated.
- **Code:** [`parseSchemaProperties`](src/parser/schema.ts#L318) collects only `example` (singular); [schema-util.ts:178](src/schema-util.ts#L178) documents only `example`.
- **Effect:** 3.1 `examples` arrays never appear in generated JSDoc.
- **Refs:** [3.1 examples vs example](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0).

### 1.8 Additional JSON Schema 2020-12 keywords — **not supported**

None of the following are parsed or emitted: `patternProperties`, `propertyNames`, `unevaluatedProperties`, `unevaluatedItems`, `dependentSchemas`, `dependentRequired`, `if`/`then`/`else`, `contains`/`minContains`/`maxContains`, `$defs`, `$anchor`, `$dynamicRef`/`$dynamicAnchor`, `$vocabulary`. `parseSchemaProperties` has a fixed allow-list ([schema.ts:324-337](src/parser/schema.ts#L324)) and the main branch tree ([schema.ts:38-80](src/parser/schema.ts#L38)) only knows `$ref`, `array`, `enum`, `oneOf`, `allOf`, `anyOf`, object, and `not`.

- **Effect:** All these constraints are silently ignored; schemas using them degrade toward `Record<string,any>`/`any`.
- **Refs:** [JSON Schema 2020-12 applicator vocabulary](https://json-schema.org/draft/2020-12/json-schema-core#name-a-vocabulary-for-applying-s).

### 1.9 `$ref` with sibling keywords — **partially incompatible**

- **3.0:** siblings alongside `$ref` are ignored. **3.1:** `$ref` may have siblings (e.g., `description`, `title`) that apply.
- **Code:** [`isReferenceObject`](src/schema-util.ts#L73) returns true on the presence of `$ref` and [`parseReferenceSchema`](src/parser/schema.ts#L83) discards everything except the ref + naming. In [`parseObjectSchemaProperties`](src/parser/schema.ts#L168) a `$ref` property's `description` is forced to `undefined`.
- **Effect:** 3.1 sibling annotations on `$ref` are dropped (matches 3.0 behavior, diverges from 3.1).
- **Refs:** [3.1 $ref siblings](https://beeceptor.com/docs/concepts/openapi-what-is-new-3.1.0/).

### 1.10 `$schema` / `jsonSchemaDialect` — **ignored**

- **3.1** allows a per-schema `$schema` and a top-level `jsonSchemaDialect` to declare the dialect.
- **Code:** Neither token is referenced anywhere.
- **Effect:** Dialect declarations are ignored; no validation that the dialect is the one the generator assumes.
- **Refs:** [3.1 jsonSchemaDialect](https://www.openapis.org/blog/2020/06/18/openapi-3-1-0-rc0-its-here).

---

## 2. Document / top-level structure

### 2.1 `webhooks` — **not supported**

- **3.1** adds a top-level `webhooks` map (Path Item Objects).
- **Code:** [`parseOpenApiDocument`](src/parser/document.ts#L32) reads only `document.components?.schemas` and `parseApis(document,...)` (which iterates `document.paths`). No `webhooks`. The `OpenApiDocument` model ([openapi-types.ts:8](src/openapi-types.ts#L8)) has no webhooks field.
- **Effect:** Webhook definitions are entirely ignored — no client code generated for them.
- **Refs:** [3.1 webhooks](https://www.openapis.org/blog/2020/06/18/openapi-3-1-0-rc0-its-here).

### 2.2 `paths` now optional — **not accounted for**

- **3.1** makes `paths` optional (a doc may contain only `webhooks`/`components`).
- **Code:** `parseApis` assumes `paths`; a webhooks-only doc yields an empty/degenerate client with no signal to the user.
- **Refs:** [3.1 paths optional](https://blog.stoplight.io/difference-between-open-v2-v3-v31).

### 2.3 Reusable `components.pathItems` — **not supported**

- **3.1** adds `components/pathItems` for reusable Path Items (referenced by webhooks etc.).
- **Code:** [`createRefs`](src/parser/document.ts#L41) / the refs machinery and `parseSchemas` only handle `components.schemas`. `pathItems` refs won't resolve into anything generated.
- **Refs:** [3.1 components.pathItems](https://www.openapis.org/blog/2020/06/18/openapi-3-1-0-rc0-its-here).

### 2.4 `info.license.identifier` (SPDX) — not consumed (minor)

- **3.1** adds `license.identifier` (SPDX). The generator only uses `info.description` ([document.ts:48](src/parser/document.ts#L48)); license data isn't used anyway, so this is informational only.
- **Refs:** [3.1 license identifier](https://www.openapis.org/blog/2020/06/18/openapi-3-1-0-rc0-its-here).

### 2.5 `summary` on Reference Object — **dropped**

- **3.1** adds `summary`/`description` to the Reference Object. `parseReferenceSchema` discards them (see 1.9).

---

## 3. Version handling & tooling (root cause)

### 3.1 No version detection or gating

- **Code:** Nowhere does the generator inspect the `openapi:` field. [`convertDocToOpenApiV3`](src/document-converter.ts#L59) blindly casts the `swagger2openapi` output to `OpenAPIV3.Document` (comment at [line 62](src/document-converter.ts#L62): "This is a hidden cast").
- **Effect:** 3.1 docs are neither rejected nor converted — they are mislabeled as 3.0 and parsed with 3.0 assumptions. There is no clear "3.1 not supported" error and no attempt to support it.

### 3.2 Conversion dependency cannot down-convert 3.1

- `swagger2openapi@7.0.8` fast-paths all `3.x` inputs unchanged (`index.js:1401`) and only converts `swagger: "2.0"`. `targetVersion='3.0.0'` (`index.js:28`). It is a Swagger-2→OAS-3.0 tool, not a 3.1 handler.
- **Effect:** Relying on it to "normalize to v3" is valid for 2.0 but a no-op-with-false-confidence for 3.1.

### 3.3 Static types are pinned to `OpenAPIV3` (3.0)

- Every parser/serializer imports `OpenAPIV3` (3.0), never `OpenAPIV3_1`: [schema.ts:4](src/parser/schema.ts#L4), [document.ts:14](src/parser/document.ts#L14), [media-type.ts:4](src/parser/media-type.ts#L4), [openapi-types.ts:1](src/openapi-types.ts#L1), etc. `openapi-types@12.1.3` _does_ ship an `OpenAPIV3_1` namespace that the generator does not use.
- **Effect:** Even if runtime logic were added, the type contracts would need to move to `OpenAPIV3_1` (or a union) to compile against array `type`, `null`, numeric `exclusiveMinimum`, etc.

### 3.4 Runtime parser/validator does accept 3.1 (asymmetry)

- `@apidevtools/swagger-parser@12.1.0` — used at [document.ts:38](src/parser/document.ts#L38) — explicitly supports 3.1: `supported31Versions = ["3.1.0","3.1.1","3.1.2"]`. So `SwaggerParser.parse` won't reject a 3.1 doc; it dereferences it and hands it to the 3.0-only downstream logic — reinforcing the silent-mis-parse behavior.

---

## 4. Behavior matrix (what actually happens to a 3.1 doc today)

| 3.1 feature                                     | Generator branch hit                             | Result                              |
| ----------------------------------------------- | ------------------------------------------------ | ----------------------------------- |
| `type: ["string","null"]`                       | none (strict `===` on string) → `getType(array)` | `any`, nullability lost             |
| `nullable` gone, null via type array            | `nullable` path never triggers                   | no `\| null` emitted                |
| `exclusiveMinimum: 5` (number)                  | not collected                                    | dropped from docs                   |
| `const`                                         | none                                             | falls to `any`, literal lost        |
| `prefixItems`                                   | `parseArraySchema` ignores it                    | `any[]` if no `items`               |
| `contentEncoding`/`contentMediaType`            | not collected; only `format:binary`→Blob         | treated as `string`                 |
| `examples` (array)                              | only singular `example`                          | dropped                             |
| `patternProperties`, `if/then/else`, `$defs`, … | none                                             | ignored, degrades to `any`/`Record` |
| `webhooks`                                      | not read                                         | no code generated                   |
| `paths` omitted                                 | assumed present                                  | empty client, no warning            |
| `components.pathItems`                          | not read                                         | refs unresolved                     |

---

## 5. Recommendations (for closing the gaps)

1. **Detect version and fail fast** in [`convertDocToOpenApiV3`](src/document-converter.ts#L59): if `openapi` starts with `3.1`, either route to a 3.1-aware path or emit a clear "3.1 not yet supported" error instead of the silent cast. This is the cheapest correctness win.
2. **Adopt `OpenAPIV3_1` types** from `openapi-types` (already a dependency) and generalize `getType`/branching to accept `type` arrays and `"null"`.
3. **Nullability from `type` arrays:** derive the existing `nullable`/`| null` behavior when `"null"` ∈ `type`.
4. **Extend `parseSchemaProperties`** allow-list to include `const`, `examples`, `exclusiveMinimum`/`exclusiveMaximum` (numeric), `contentEncoding`, `contentMediaType`, and other 2020-12 constraints you want in JSDoc.
5. **Consider a real down-converter** (e.g., a 3.1→3.0 shim) if you want to keep the 3.0-only core, since `swagger2openapi` will not do this.
6. **Webhooks / optional paths / components.pathItems:** structural additions to `OpenApiDocument` and `parseApis` if full 3.1 support is a goal.

### Primary references

- [Migrating from OpenAPI 3.0 to 3.1.0 — OpenAPI Initiative](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0)
- [OpenAPI 3.1.0 RC0 announcement (webhooks, jsonSchemaDialect, pathItems, license id)](https://www.openapis.org/blog/2020/06/18/openapi-3-1-0-rc0-its-here)
- [APIMatic: Migrating to/from OpenAPI 3.1 (nullable, const, exclusive bounds, contentEncoding)](https://www.apimatic.io/blog/2021/09/migrating-to-and-from-openapi-3-1)
- [API Changelog: Migrating 3.0→3.1](https://apichangelog.substack.com/p/migrating-from-openapi-30-to-31)
- [Beeceptor: 3.1.0 vs 3.0.3 ($ref siblings, $schema, JSON Schema 2020-12)](https://beeceptor.com/docs/concepts/openapi-what-is-new-3.1.0/)
- [OpenAPI 3.1.0 specification](https://spec.openapis.org/oas/v3.1.0.html) · [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core)

**Bottom line:** the generator has _no intentional 3.1.0 support_. It is a 3.0.x generator that happens not to reject 3.1 inputs because its validator (`swagger-parser`) tolerates them, while its converter (`swagger2openapi`) passes them through and its parser/types interpret them as 3.0 — producing silent data loss rather than errors. The gaps above are the full list of 3.1.0 features affected.
