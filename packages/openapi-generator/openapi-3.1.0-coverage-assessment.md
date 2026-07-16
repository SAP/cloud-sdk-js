# OpenAPI 3.1.0 Coverage Assessment

Covers all breaking changes introduced across the OAS 3.1.0 release cycle
(RC0 → RC1 → RC2 → 3.1.0 final) and the subsequent patch releases 3.1.1 and
3.1.2 (both are clarification-only; no breaking changes relative to 3.1.0).

---

## Fully covered

| Breaking change | Where handled |
|---|---|
| `type` as array (e.g. `["string","null"]`) | [`schema.ts` `getSchemaTypes` / `parseSchema`](./src/parser/schema.ts) — multi-type union → `anyOf` |
| `nullable` removed; nullability via `"null"` in type array | `isNullableSchema` / `stripNullability` in [`schema.ts`](./src/parser/schema.ts) |
| Standalone `type: "null"` | Explicit branch in `parseSchema` |
| `const` keyword (single fixed value) | `parseConstSchema` + serializer in [`file-serializer/schema.ts`](./src/file-serializer/schema.ts) |
| `prefixItems` (tuples) | `parseTupleSchema` with `items` as rest element |
| `contentEncoding` / `contentMediaType` → `Blob` | [`schema.ts`](./src/parser/schema.ts) + `parseSchemaProperties` |
| `examples` array in schemas | Collected in `parseSchemaProperties`, rendered in [`schema-util.ts` `getSchemaPropertiesDocumentation`](./src/schema-util.ts) |
| Numeric `exclusiveMinimum` / `exclusiveMaximum` | Collected with `undefined`-guard in `parseSchemaProperties` |
| `patternProperties` | Merged into `Record<string, V>` additional properties |
| `$ref` sibling `description` preserved | Property parsing in [`schema.ts`](./src/parser/schema.ts) |
| `paths` now optional | [`document.ts`](./src/parser/document.ts) injects empty `paths` before validation so the underlying validator accepts paths-less documents |
| `webhooks` warn instead of silently dropped | `logger.warn` in [`document.ts:76`](./src/parser/document.ts) |
| OAS 3.1 version detected and logged | [`document-converter.ts:74`](./src/document-converter.ts) |

---

## Not a generator concern (no gap)

| Item | Reason |
|---|---|
| `responses` optional under Operation Object | [`parseResponses`](./src/parser/responses.ts) already accepts `undefined` and returns `{ type: 'any' }` — no crash |
| `info.version` SemVer requirement dropped | Generator never validates `info.version` |
| `info.license.identifier` (SPDX) | Generator does not consume license data |
| `x-oai-` / `x-oas-` extension prefixes reserved | Generator does not validate extension key names; compliance is the spec author's responsibility |
| Mutual TLS (`mutualTLS`) security scheme | Generator does not produce auth/security code; security schemes are not consumed |
| Server variable `enum` must not be empty; `default` must be in `enum` | Generator does not validate server variable constraints |
| `jsonSchemaDialect` / `$schema` at document root | No dialect-switching is required for codegen; `swagger-parser` handles document parsing |
| `$ref` sibling `summary` | Only `description` is meaningful for code generation; `summary` on a Reference Object has no TypeScript output |
| 3.1.1 / 3.1.2 patch releases | Both are clarification-only patch releases with no breaking changes relative to 3.1.0 |

---

## Remaining known gaps

| Gap | Impact | Notes |
|---|---|---|
| `example` and `examples` mutually exclusive in 3.1 | ✅ resolved | `parseSchemaProperties` now warns and drops `example` when both are present, keeping only `examples`. |
| `components/pathItems` present | ✅ resolved | `warnOnUnsupportedFeatures` in `document.ts` now emits an explicit warning listing the path item names, matching the existing webhooks warning pattern. |
| Advanced JSON Schema 2020-12 applicator keywords (`if`/`then`/`else`, `$defs`, `unevaluatedProperties`, `unevaluatedItems`, `dependentSchemas`, `dependentRequired`, `propertyNames`, `contains`/`minContains`/`maxContains`, `$dynamicRef`/`$dynamicAnchor`, `$vocabulary`, `$anchor`) | Low–Medium | Silently ignored; schemas relying on them degrade toward `any` or `Record<string,any>`. Closing these gaps fully would require a JSON Schema 2020-12 evaluation layer, which is out of scope for the current implementation. |
| `patternProperties` with multiple distinct value-type patterns | Low | All pattern schemas are merged into a single `Record<string, V>` union, losing per-pattern type distinctions when patterns have different value types. |

---

## Conclusion

The implementation covers all OAS 3.1.0 breaking changes that are relevant to a
TypeScript client code generator. The two previously open gaps (`example`/`examples`
mutual exclusivity and `components/pathItems` presence) are now resolved. The
remaining gaps are advanced JSON Schema 2020-12 applicator keywords that would
require a full schema evaluation layer to handle correctly, and a minor loss of
per-pattern type distinctions in `patternProperties`.
