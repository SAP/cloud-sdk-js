---
'@sap-cloud-sdk/generator-common': patch
---

[fix] `readCompilerOptions` now uses the TypeScript compiler API for tsconfig parsing, fixing support for JSONC (comments, trailing commas), package-name `extends` (e.g. `@tsconfig/node18`), and circular `extends` chains.
