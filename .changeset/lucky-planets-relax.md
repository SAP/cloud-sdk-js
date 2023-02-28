---
'@sap-cloud-sdk/openapi-generator': major
'@sap-cloud-sdk/generator-common': major
'@sap-cloud-sdk/generator': major
---

[Compatibility Note] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
If necessary use the `include` option to add a `package.json` with a custom value.
[Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
If necessary use the `include` option to add a `package.json` with a custom value.
