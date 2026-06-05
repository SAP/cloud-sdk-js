# Engineer Onboarding: SAP Cloud SDK for JavaScript

## What This Repo Does

The SAP Cloud SDK for JavaScript abstracts connectivity to SAP BTP (Business Technology Platform). It handles:

- Fetching and caching **destinations** (named connection configs stored in BTP's Destination Service)
- Managing **tokens** (XSUAA client credentials, JWT bearer, IAS) with automatic caching
- Generating typed **OData v2/v4 and OpenAPI clients** from service definitions
- Wrapping BTP-specific auth flows (provider/subscriber tenant model, service bindings, VCAP_SERVICES)

If you're writing code that calls an SAP service from a BTP app, you're using this SDK.

---

## Repo Structure

This is a **pnpm monorepo** (pnpm 10, workspace protocol). Three categories of packages:

```
packages/          # 14 production npm packages (published to npmjs)
test-packages/     # integration, type, and e2e tests (not published)
build-packages/    # internal build tooling (not published)
```

### Production packages

| Package | Purpose |
|---|---|
| `connectivity` | Core package — destinations, tokens, service bindings |
| `http-client` | Thin HTTP client built on axios, destination-aware |
| `odata-common` | Shared OData abstractions (filters, orderby, select, etc.) |
| `odata-v2` | OData V2 runtime |
| `odata-v4` | OData V4 runtime |
| `openapi` | OpenAPI runtime |
| `generator` | CLI: generates typed OData clients from EDMX/metadata |
| `openapi-generator` | CLI: generates typed clients from OpenAPI specs |
| `generator-common` | Shared generator logic |
| `resilience` | Circuit breaker + retries (opossum + async-retry) |
| `util` | Shared utilities (logging, etc.) |
| `test-util` | Test helpers (mock destinations, JWKS, etc.) |
| `eslint-config` | Shared ESLint rules |
| `temporal-de-serializers` | Date/time (de)serialization middleware using Temporal |

Most day-to-day work happens in **`connectivity`** and the **odata/openapi** packages.

---

## Key Architecture: `connectivity`

The connectivity package is the heart of the SDK. Entry point: `packages/connectivity/src/index.ts`.

### Layers

```
index.ts                        ← public API (re-exports everything below)
└── scp-cf/index.ts             ← groups all SCP/CF modules
    ├── destination/            ← destination fetching, caching, auth
    ├── token-accessor.ts       ← public token API (getIasToken, serviceToken, etc.)
    ├── identity-service.ts     ← IAS token fetching (internal)
    ├── xsuaa-service.ts        ← XSUAA integration
    ├── jwt.ts                  ← JWT decode/verify utilities
    ├── cache.ts                ← generic async cache
    └── environment-accessor.ts ← reads VCAP_SERVICES, env vars
```

### Destination subsystem (`scp-cf/destination/`)

The most complex part. A "destination" is a named config (URL, auth method, certs) stored in BTP. The SDK fetches it, applies the right auth flow, and returns headers ready to attach to an HTTP request.

Key files:

| File | Role |
|---|---|
| `destination-accessor.ts` | `getDestination()` — the main public entry point |
| `destination-from-service.ts` | Fetches from BTP Destination Service |
| `destination-from-env.ts` | Reads destinations from `destinations` env var |
| `destination-from-vcap.ts` | Builds destinations from `VCAP_SERVICES` |
| `destination-selection-strategies.ts` | Provider vs subscriber tenant logic |
| `destination-service-cache.ts` | Caches destination service responses |
| `service-binding-to-destination.ts` | Converts VCAP service bindings to destinations |
| `build-ias-destination.ts` | IAS-specific destination construction |

### Token flow

Tokens are fetched via `token-accessor.ts`. The public API:

- `serviceToken(service, options)` — client credentials token for a service
- `jwtBearerToken(jwt, service, options)` — JWT bearer token
- `getUserToken(jwt, service, options)` — user propagation token
- `getIasToken(service, options)` — IAS token (returns `IasTokenResult`)
- `getClientCredentialsToken(...)` — raw XSUAA client credentials

Internally, IAS tokens go through `xssec` (SAP's security library), which handles per-instance LRU caching with a 5-minute leeway.

---

## Dev Workflow

### Setup

```bash
pnpm install          # install all workspace deps
```

### Running tests

```bash
# Single package, filtered
pnpm --filter @sap-cloud-sdk/connectivity jest --testPathPatterns="destination-accessor"

# All unit tests
pnpm test:unit

# Integration tests (test-packages/integration-tests)
pnpm test:integration

# Type tests — validates public API types with dtslint
pnpm test:type

# E2E tests — runs against a local CAP server
pnpm test:e2e
```

### TypeScript check

There's no root `tsc` script. Run inside the package:

```bash
cd packages/connectivity
npx tsc --noEmit
```

### Linting

```bash
pnpm lint          # check
pnpm lint:fix      # fix
```

### Quality checks (run before PRs)

```bash
pnpm checks        # circular deps + license + public API surface + test service
```

The **public API check** (`check:public-api`) is important — it diffs the exported types against a baseline. If you add or remove exports, this will fail until you update the baseline.

### Regenerate test OData clients

```bash
pnpm generate      # re-runs generators against test service specs in test-resources/
```

Run this if you change the generator packages.

---

## PR Process

1. Discuss significant changes via a GitHub issue first.
2. All new functionality needs test coverage (unit tests at minimum).
3. Follow [STYLEGUIDE.md](../STYLEGUIDE.md).
4. First-time contributors need to sign the DCO (Developer Certificate of Origin).
5. Run `pnpm checks` and `pnpm lint` before pushing.
6. Owners review and merge.

---

## Where to Find Things

| Topic | Location |
|---|---|
| Architecture decisions | `knowledge-base/adr/` (39 ADRs) |
| Implementation deep-dives | `knowledge-base/implementation/` |
| How-tos (release, debugging) | `knowledge-base/how-tos/` |
| Public docs | https://sap.github.io/cloud-sdk/ |
| Test helpers / mock destinations | `packages/test-util/` |
| Integration test scenarios | `test-packages/integration-tests/` |
| Type-level API tests | `test-packages/type-tests/` |

---

## Mental Model: BTP Tenant Architecture

The SDK is designed for **multi-tenant BTP apps**. Two key concepts:

- **Provider tenant** — the tenant that owns/runs the app
- **Subscriber tenant** — a customer tenant using the app

Destination fetching respects this: the selection strategies (`alwaysProvider`, `alwaysSubscriber`, `subscriberFirst`) control which tenant's destinations are used. The JWT in the incoming request carries the subscriber's tenant ID.

This is the most BTP-specific concept in the codebase and the one most likely to confuse someone coming from a non-SAP background. The ADRs in `knowledge-base/adr/` cover many of the decisions made around this.
