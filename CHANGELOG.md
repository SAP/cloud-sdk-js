
[//]: # (Please don't delete the following comments and keep them in the beginning of this document. Also, keep the first line empty.)
[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: [core] Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.)
[//]: # (Example new functionality: [generator] Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.)

# Next

## Known Issues

-

## Compatibility Notes

- [odata-generator] Consider the `Nullable` property on action and function import parameters and return types correctly. 
For parameters this is uncritical because the type is extended from `T` to `T | null` if the property is nullable. 
For return types the same extension could lead compile errors after client regeneration because the is broadened including `null`. 

## New Functionality

- [core] Support additional headers and query parameters, that are set on destinations.

## Improvements

- [odata-generator] Add underlying type and value information as part of the API documentation for enums.
- [odata-generator] Disallow invalid enum entries or random string parameters when building filters on enum properties.

## Fixed Issues

- [odata-generator] Fix generation errors, when Enum type field is used as a key of an entity.
- [core] Fix parsing of proxy environment variables to allow `-` in the host name.
- [odata-generator] Fix action and function import typing, when parameter or return types are nullable.

# 1.47.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.47.1<br>
Blog: TBD<br>

# 1.47.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.47.0<br>
Blog: TBD<br>

## New Functionality

- [core] Support `OAuth2JWTBearer` authentication type.

## Fixed Issues

- [proxy] Fix destination service calls using web proxies.
- [core] Fix type error to allow `null` values in filters for nullable properties.
- [core] Fix OData filter runtime error, when using lambda expression with operands like `or`.

# 1.46.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.46.0<br>
Blog: TBD<br>

## Compatibility Notes

- [eslint-config] Remove `brace-style` rule for compatibility with Prettier 2.3.
- [openapi-generator] Change the basis for directory, package, and service names, when generating clients. If not specified otherwise, the default is based on the directory name instead of the service name.
- [core] Deprecate JWT related interfaces in favor of the interfaces provided by the `jsonwebtoken` library.
The following interfaces were deprecated:
  - `JWTHeader` (use `JwtHeader` instead, the property `typ` is now optional)
  - `JWTPayload` (use `JwtPayload` instead)
  - `CompleteDecodedJWT` (use `Jwt` instead)
  - `RegisteredJWTClaims`
  - `RegisteredJWTClaimsBasic`
  - `RegisteredJWTClaimsTenant`
  - `RegisteredJWTClaimsUser`

## New Functionality

- [openapi-generator] Add the `-c/--config` command line option to specify options through a configuration file instead of on the command line.

## Improvements

- [core] Support setting custom `SAP-Connectivity-Authentication` headers for Principal Propagation.
- [openapi-generator] Improve the error message for invalid or unsupported path patterns.
- [openapi-generator] Improve the error message when detecting invalid Swagger 2.0 specification files. 
- [core] Improve types in convenience functions for JWT access. See "Compatibility Notes" for details.

## Fixed Issues

- [core] Fix type error to allow filtering on one-to-many navigation properties in lambda expressions.
- [openapi-generator] Base uniqueness check for directory names on directory names in `optionsPerService` instead of the human readable service name.

# 1.45.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.45.0<br>
Blog: TBD<br>

## Fixed Issues

- [core] Re-enable the circuit breakers for the destination and XSUAA services.
- [odata] Fix encoding of filter strings.
- [core] Add or overwrite the content length header for CSRF fetch requests. As those are always `HEAD` requests, the content length is always set to 0.

# 1.44.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.44.0<br>
Blog: TBD<br>

## Improvements

- [odata-generator][openapi-generator] Update `typescript` version to `~4.1.2` in the `package.json` of the clients.

# 1.43.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.43.0<br>
Blog: TBD<br>

## New Functionality

- [odata] Support appending path to the request URL built by the request builders through the `appendPath` method. It can be used for unsupported OData functionality like querying navigation properties.

## Fixed Issues

- [PROXY] Consider the web proxy also in the service call to BTP services like XSUAA and destination service.

# 1.42.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.42.0<br>
Blog: TBD<br>

## Compatibility Notes

- [core] Use `HEAD` instead of `GET` when fetching CSRF tokens. Change the URL for CSRF token fetching in OData requests from the service URL to the request URL. 
- [test-util] Use `HEAD` for `mockHeaderRequest()` to align with the core behaviour.
- [core] Remove experimental `Exclude` type, which was accidentally exposed as non-experimental.
- [openapi-generator] Rename the CLI generator command from `generate-openapi-client` to `openapi-generator`.
- [openapi-generator] Rename some generator options and default behavior of those options ([details](./knowledge-base/adr/0020-generator-options.md)).

## New Functionality

- [core] Support custom axios options for all request builders.
- [core] Support disabling csrf token request as an option for all request builders.
- [odata] Support unary operator `not` in the `filter()` of OData request builders.
- [openapi-generator] Release the SAP Cloud SDK OpenAPI generator.

## Improvements

- [odata] Allow using filter functions with boolean return types directly in the `filter()` of OData request builders without `equals(true)`.
- [odata-generator] Disable the `execute` function, when an entity type is shared by multiple entity sets and is used as the return type of function/action imports.
- [openapi-generator] Introduce `verbose` option to enable verbose logging. 
- [openapi-generator] Introduce `overwrite` option to allow overwriting of existing files. 
- [openapi-generator] Introduce `include` option to allow copying files to the generated clients.

# 1.41.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.41.0<br>
Blog: TBD<br>

## Compatibility Notes

- [core] Deprecated `userApprovedServiceToken`, `refreshTokenGrant` and `userTokenGrant`.
- [openapi-generator] Replace the underlying Java-based OpenAPI generator with a custom implementation. 
- [odata-generator] The type of one-to-one navigation properties is now optional.

## New Functionality

- [core] Added support for `jwtBearerToken` and `jwtBearerTokenGrant` authorization.
- [http-client] Add a `fetchCsrfToken` option to `executeHttpRequest` to allow automatic fetching of CSRF tokens for write operations.
- [openapi-generator] Fetch CSRF tokens for write operations automatically.

## Fixed Issues

- [odata-generator] Fix a type error of one-to-one navigation properties, so they can set `null` as valid values.
- [core] Fix a runtime error of `fromJson` function, when passing an object containing one-to-one navigation properties with `null` value.
- [odata-batch] Fix wrong double encoding of filter values in batch requests.
- [openapi-generator] Use string as default type for enums.

# 1.40.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.40.0<br>
Blog: TBD<br>

## Known Issues

- 

## Compatibility Notes

- A mandatory property `request` is added to the `HttpResponse`.

## New Functionality

- [core] Support `executeRaw` in all `RequestBuilder`, which returns `HttpResponse` that contains the raw response and original request.

## Improvements

- [http-agent] Fix client certificate authentication in conjunction with proxies - depends on [this PR](https://github.com/TooTallNate/node-https-proxy-agent/pull/111).

## Fixed Issues

- [core] Fix parsing of empty bodies in batch responses.

# 1.39.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.39.0<br>
Blog: TBD<br>

## Compatibility Notes

- [core] Deprecated `_customFields` in the `fromJson` method of the entity builders. Instead, add custom fields to the JSON objects directly.

## New Functionality

- [openapi-generator] Support custom API names and operation names by using OpenAPI extensions `x-sap-cloud-sdk-api-name` and `x-sap-cloud-sdk-operation-name`.

## Fixed Issues

- [core] Fix building of entities using `fromJson` with navigation properties.
- [odata-generator] The exit code of the node process is set to 1 in cases of a generator error.
- [odata-generator] Fix the false-positive warning message, when functions/actions are not used by any function/action imports.

# 1.38.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.38.0<br>
Blog: TBD<br>

## New Functionality

- [openapi-generator] Generate multiple API objects based on tags instead of one API per API specification.
- [openapi-generator] Add option `writeReadme` for generating readme files.
- [openapi-generator] Support copying files from given paths via a new option `additionalFiles`.
- [eslint-config] Release a recommended, shareable `eslint` configuration based on the SAP Cloud SDK's internal configuration as `@sap-cloud-sdk/eslint-config`. Follow the [official guide](https://eslint.org/docs/developer-guide/shareable-configs#using-a-shareable-config) for information how to use the config.

## Improvements

- [logger] The stack is included in the logs if `logger.error` is called with an error object.

# 1.37.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.37.1<br>
Blog: TBD<br>

## New Functionality

- [openapi-generator] Support the generation of transpiled JavaScript OpenAPI clients with the new flags: `generateJs` and `tsConfig`.

## Fixed Issues

- [generator] Allow enhanced generation with OpenAPI files for all valid OData specification file endings (including e. g. .xml and .EDMX).

# 1.37.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.37.0<br>
Blog: TBD<br>

## Improvements

- [openapi-generator] Improve generation for duplicate operation names and non existing `operationId`s.

## Fixed Issues

- [openapi-generator] Remove the copyright comments from the generated package.json.
- [util] Don't fail on undefined template arguments when using `codeBlock`.

# 1.36.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.36.1<br>
Blog: TBD<br>

## Fixed Issues

- [openapi-generator] Fix the error `TypeError: Class constructor Command cannot be invoked without 'new'` due to the incompatibility of ES5 and oclif.

# 1.36.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.36.0<br>
Blog: TBD<br>

## Compatibility Notes

- [openapi-generator] The `package.json` is generated by default.

## New Functionality

- [openapi-generator] Support `package.json` generation and the service mapping configuration as CLI options.
- [util] Expose `UniqueNameGenerator` class that stores used names and generates a unique name for each given string.

# 1.35.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.35.0<br>
Blog: TBD<br>

## Compatibility Notes

- The return type of `Entity.getUpdatedProperties` was incorrect and was corrected to `Record<string, any>`.

## Fixed Issues

- Fix serialization of linked entities with custom fields.
- Fix setting of remote state on entities to replace old state instead of merging with old state. This also fixes how custom fields are handled in the remote state.
- Fix return type of `Entity.getUpdatedProperties` to `Record<string, any>`.
- Ship templates files that are used in the OpenAPI generator.

# 1.34.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.34.0<br>
Blog: TBD<br>

## Compatibility Notes

- The methods `refreshTokenGrant`,`userTokenGrant` and `clientCredentialsGrant` of the `xsuaa-service` now accept a `string` or `XsuaaServiceCredentials` as first argument.
  In case it is a `string` it is treated as the URL to fetch the access token from.
  In case it is an object of type `XsuaaServiceCredentials`, the URL is built by appending `oauth/token` to the `.url` of the given object.
  In the past this suffix was also appended to inputs of type `string`.

## New Functionality

- Add experimental support for client generation of OpenAPI services. All functionality related to the OpenAPI generator is subject to change.
- Introduce `ErrorWithCause` for better analysis of errors, their causes and their root causes. All errors that have been caused by other errors through the SDK are based on this class.
- Support `Destination`s with authentication type [`OAuth2UserTokenExchange`](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html).

## Improvements

- Unify naming of the request builder methods. See [this adr](./knowledge-base/adr/0017-builder-methods-multiple-calls.md) for a list of the changed methods.

## Fixed Issues

- Stop appending `oauth/token` if the service token URL is given to `clientCredentialsGrant()`.
  See related compatibility note above.

# 1.33.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.33.0<br>
Blog: TBD<br>

## Known Issues

- [Generator] Using entity type as the parameter of function or action imports is not supported.

## Compatibility Notes

- [Generator] In order to support multi-schema generation, the edmx schema/namespace related types have been extended.
- [Generator] The deprecated static property `_serviceName` will not be generated.

## New Functionality

- [Generator] Support parsing of multiple schemas in the edmx service specification.
- [Util] Add string formatting functions.

## Improvements

- [Generator] Log warnings when generating code for function or action imports with unknown parameters, instead of throwing errors.

## Fixed Issues

- [Destination] Fix the authentication type `OAuth2ClientCredentials` to keep using the token url from the destination without adding the path `/oauth/token` to the end.
- [Destination] Fix `OAuth2SAMLBearerAssertion` flow for technical users and subscriber account destinations.

# 1.32.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.32.1<br>
Blog: TBD<br>

## Compatibility Notes

- Version 1.32.0 introduced a breaking change by removing the export of all generic HTTP client functionality. This version adds it again.

## Fixed Issues

- Add missing export for http-client

# 1.32.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.32.0<br>
Blog: TBD<br>

## Compatibility Notes

- Batch `ReadResponse.as` does not parse errors anymore, but throws an error if the response in fact was an `ErrorResponse`. To avoid this check `response.isSuccess()` before casting.
- Rename deprecated ODataRequestConfigs e.g. `ODataCreateRequestConfig` -> `ODataCreateRequestConfigLegacy` due to naming conflicts.

## New Functionality

-

## Improvements

- Export the `tenant` interface from the scp-cf module.
- Throw an error when attempting to parse a batch `ReadResponse` that in fact is an `ErrorResponse`.

## Fixed Issues

- [Generator] Fix the enum type (V4), when only one enum member is defined in the metadata.
- [OData] Fix function imports with and without parameters using the OData V4 syntax.

# 1.31.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.31.0<br>
Blog: TBD<br>

## Compatibility Notes

- [Generator] Paths referenced in configuration files for the generator are treated as relative to this file as stated in the documentation. Projects relying on the previous erroneous behavior might have to adjust their configuration.

## New Functionality

- Most public methods using variable arguments now also accept arrays as input.

## Improvements

- Remove the `rambda` library to save approx 2MB or 10% of the SDK size.
- [Connectivity] Warn the user when using custom headers for executing http requests.
- Pass through original error message in case of failure when fetching the csrf token.

## Fixed Issues

- [Generator] Fix function imports (OData V2 + V4) and action imports, where the return type is a primitive edm type like `Edm.String`.
- [Generator] Fix path references in generator configuration file to be treated as relative to the configuration file.
- [Core] Fix expiration times in the client credentials cache.
- [Core] Fix csrf request redirects against On-Premise systems

# 1.30.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.30.0<br>
Blog: TBD<br>

## Compatibility Notes

- Deprecate setting the content type header in the constructor of `ODataRequest`s.
- [Generator] Files with the same names, but different casing were previously not considered, e. g. when `SomeEntity.ts` and `Someentity.ts` were generated, the second generated file would overwrite the first. In these cases the generator now adds a suffix to the name, e. g. `Someentity_1.ts`.

## New Functionality

- [OData] Add `withSubRequestType` method to configure how batch sub requests are serialized.
- [OData] Support batch requests for OData v4.

## Improvements

- Allow setting default headers in `ODataRequest`s instead of the content type header only.

## Fixed Issues

- [OData] Fix wrong service paths for batch requests.
- [Generator] Fix reference to `execa` dependency.
- [Generator] Fix writing of files with the same names but different casing.
- Fix url encoding in batch requests.

# 1.29.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.29.0<br>
Blog: TBD<br>

## Compatibility Notes

- [Generator] The interface `EnityTypeForceMandatory` (e.g., `BusinessPartnerTypeForceMandatory`) is removed.

## New Functionality

- [OData] Support the usage of $count in `getAll` requests e.g.: `Entity.requestBuilder().getAll().count().execute()`.

## Improvements

- [OData] Add warning for deep update attempts in OData v2.
- [Generator] The transpiling after generation is done in chunks to avoid CPU overloads for high numbers of services.

## Fixed Issues

- [OData] Fix parsing the Etag returned from update requests.
- [OData] Fix the entity builder so that it can set `undefined`/`null` for optional properties.

# 1.28.2

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.28.2<br>
Blog: TBD<br>

## New Functionality

- [Util] Allow to mute and unmute loggers.

## Improvements

- [Generator] Generator will fail, when it generates `.ts` files that have compilation errors.

## Fixed Issues

- [OData] Fix deserialization of one to many links, where the navigation property is not wrapped in a `result` object.
- [OData] Fix `$orderby` parameter in expanded subqueries.

# 1.28.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.28.1<br>
Blog: TBD<br>

## Improvements

- Adjust the generation of the `$filter` parameter in URL so that parentheses are not removed even logically they are not needed.
  For example, now `$filter=((filterA and filter B) and (filterC and filter D))` will not be flattened to `$filter=(filterA and filter B and filterC and filter D)`.

## Fixed Issues

- [Generator] Remove `Batch.ts` from the index file when the file does not exist.

# 1.28.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.28.0<br>
Blog: TBD<br>

## New Functionality

- Move OData v4 support from experimental to GA status.

## Fixed Issues

- [Generator] Skip generation of `Batch.ts` for services without entities.
- [RequestBuilder] Fix serialization of `Edm.Time` fields in OData V4.

# 1.27.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.27.0<br>
Blog: TBD<br>

## New Functionality

- Added experimental support for OData V4 enum type. Use the `@sap/cloud-sdk-generator` to generate the type safe client.
- Include fallback `Edm.Any` for previously unsupported edm types like Edm.Geography.
  Type safety and related features like URI conversion are not supported for the fallback type.

## Improvements

- Log a warning in case the destination and the custom request config contain both `authorization` headers.
- Special characters like `'` (single quotes), ` ` (space) and `ä` (umlaut) are encoded properly when used in the `Filter`.

## Fixed Issues

- [Generator] Fix wrong type argument for collection types containing Edm types.

# 1.26.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.26.1<br>
Blog: TBD<br>

## Fixed Issues

- Fix links in TSDoc of generated OData clients.

# 1.26.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.26.0<br>
Blog: TBD<br>

## Compatibility Notes

- In version 1.25.0 we introduced the property `_complexType` on complex types. This property is removed in this version as it introduced a bug causing some generated OData clients to not be able to compile. OData clients generated using version 1.25.0 will be incompatible with future versions of the SAP Cloud SDK.
- Deprecated the `generateNpmrc` option of the SAP Cloud SDK generator. From now on `@sap` scoped packages do not need the private registry anymore.

## New Functionality

- Support collections in complex types.
- Support unbound actions in OData V4. Note that all OData V4 functionality is still experimental.

## Fixed Issues

- Fix OData client generation for complex types. See compatibility notes.

# 1.25.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.25.0<br>
Blog: TBD<br>

## Compatibility Notes

- As the representation of complex types in the generated OData clients has changed. OData clients generated by the SAP Cloud SDK generator should be regenerated as old versions will no longer be maintained.
- _OData client generator_: Reduce public API of the generator.
  Only the service generation remains public.
  The old API is obsolete due to a refactoring (see below) but remains available with status deprecated.

## New Functionality

- Support collection type filter functions.

## Improvements

- Improve complex type handling and its representation in the generated OData clients.
- Improve collection type handling and its representation in the generated OData clients.
- _OData client generator_: Refactor the service generation flow and deprecate the whole previous implementation.

# 1.24.1

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.24.1<br>
Blog: TBD<br>

## Fixed Issues

- Ignore enum properties in complex types to fix generation of OData v4 clients.
- Fix setting ETags, when no ETag was specified by sending no `if-match` header instead of `if-match:false`.

# 1.24.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.24.0<br>
Blog: TBD<br>

## Known Issues

- The internal deserialization and serialization of `Edm.TimeOfDay` representations is not lossless for corner cases where the fractional seconds contain trailing zeros. As a sideeffect `12:12:12.0` can potentially be transformed to `12:12:12` when performing a GET and PATCH / PUT request subsequently.
- OData v4 edm types that are unknown to the SAP Cloud SDK are ignored, such that properties and parameters of those types are missing.

## Compatibility Notes

- Experimental `fractionalSeconds` were removed from the `Time` representation and merged with `seconds` instead.

## New Functionality

- Support OData v4 specific parsing of Edm types in the generator.
- Add a static representation for durations on entity classes / namespaces.

## Improvements

- Reduce the number of circular dependencies within the SDK Core.

## Fixed Issues

- Fix type error due to a breaking change from winston version 3.3.2 -> 3.3.3 [see here](https://github.com/winstonjs/winston/issues/1822#event-3508252985) for details.
- Fix serialization error for number values 'INF','-INF' and 'NaN'.

# 1.23.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.23.0<br>
Blog: TBD<br>

## Compatibility Notes

- Importing filter functions directly is deprecated, import using `filterFunctions` instead.
- _OData client generator_: Remove the hidden generator option `changelogFile`. Use the new more general options `additionalFiles` instead.

## New Functionality

- Support all string, number and date related filter functions. Import `filterFunctions` and use in a filter, e. g. `.filter(filterFunctions.startsWith(BusinessPartner.FIRST_NAME).equals(true))`.
- Add the option `--additionalFiles <GlobToFiles>` to the generator. If specified, all files matching the glob will be copied to each generated service directory.

# 1.22.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.22.0<br>
Blog: TBD<br>

## Compatibility Notes

- The properties `isMulti` of the type`VdmFunctionImportReturnType` and `isMultiLink` as well as `multiplicity` of `VdmNavigationProperty` were deprecated and replaced by `isCollection`.
- The interface `VdmServiceMetadata` now also contains a property `oDataVersion` that is mandatory.
- Due to the fix in the generator regarding the name clash it is possible that the order of suffixes could change.
  If you regenerate a VDM with a name clash the Enitiy_1 and Entity_2 could swap.

## New Functionality

- Add experimental support for OData v4 to the generator.

## Fixed Issues

- Fix the generator so that the builder function for nested complex types is correctly typed.
- Fix the generator so that entity names ending with the word `Type` do not lead to name clashes anymore.

# 1.21.2

Release Date: Jun 11, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.21.2<br>
Blog: TBD<br>

## Fixed Issues

- Fix missing validation of URL used for obtaining the JWT verification key.

# 1.21.1

Release Date: Jun 2, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.21.1<br>
Blog: TBD<br>

## Fixed Issues

- Fix the core dependency version when generating aggregated packages.

# 1.21.0

Release Date: May 26, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.21.0<br>
Blog: TBD<br>

## Compatibility Notes

- New generated OData clients yield more narrow types on the `_keys`, `_keyFields` and `_allFields` properties, that differ from older generated clients. Old clients are still supported but will be deprecated soon.
- Internal directory structure has changed. This is a breaking change for users that reference internal modules directly.

## New Functionality

- Added experimental support for OData v4. All functionality related to OData v4 is subject to change.

## Improvements

- _OData client generator_: Narrow the types of the generated properties `_keys`, `_keyFields` and `_allFields` to the correct types.

## Fixed Issues

- Fix the OData client generator to avoid a compilation error when a complex type only contains complex types.
- Fix the dependency versions in the aggregator package generated by the OData client generator.

# 1.20.1

Release Date: May 12, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.20.1<br>
Blog: TBD<br>

## Fixed Issues

- Fix the OData client generator to also parse definitions of OpenAPI files with version higher than 3.

# 1.20.0

Release Date: May 6, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.20.0<br>
Blog: TBD<br>

## Compatibility Notes

- When executing and building requests with the generic `http-client` custom request configurations now take precedence over configurations resulting from the given destination. This applies to all `http-client` related functions: `buildHttpRequest`, `addDestinationToRequestConfig`, `execute` and `executeHttpRequest`.

## New Functionality

- Support setting log levels for all loggers globally. Use `setGlobalLogLevel('debug')` for this. Log levels set individually still take precedence.

## Improvements

- Increase the information shown on VDM generation and parallelize the file creation process.

## Fixed Issues

- Fix logging of error messages that were logged as `undefined` before.
- Fix serialization of EDM type Int64 to return a string instead of an instance of `BigNumber`.
- Fix JWT verification to use the url stored in the `JKU` field of the token's header to fetch the verification key.

# 1.19.0

Release Date: April 8, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.19.0<br>
Blog: https://blogs.sap.com/?p=1075911<br>

## New Functionality

- Allow setting additional query parameters for OData queries, using `withCustomQueryParameters()`.

# 1.18.1

Release Date: March 26, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.18.1<br>
Blog: https://blogs.sap.com/?p=1068438<br>

## Compatibility Notes

- Due to the intoroduced validation for destination configurations, destinations of type `HTTP` are expected to contain a `url` or `URL` property. Note that when retrieving a destination from the `destinations` environment variable, all destinations are validated. This validation applies even to destinations that are not read.

## Improvements

- Introduce validation for destinations retrieved from environment variable or destination service.
- Allow configuring the `destinations` environment variable with the same property keys as known from the destination service on SAP Cloud Platform, e.g. now `URL` is considered valid in addition to previously only `url`.

## Fixed Issues

- Fix ordering for complex properties including nested complex properties.
- Fix the generator crashing for services containing function imports without a return type.
- Fix the destination processing so that the user can set `PrincipalPropagation` as authentication scheme for on-premises connectivity.

# 1.18.0

Release Date: March 12, 2020<br>
API Docs: https://sap.github.io/cloud-sdk/api/1.18.0<br>
API Docs (VDM): https://help.sap.com/doc/69202ef7e0a64767833782132648b855/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1060707<br>

## Compatibility Notes

- Some packages of the SAP Cloud SDK for JavaScript have been migrated to [external GitHub](https://github.com/SAP/cloud-sdk-js) and are now available as open-source software.
  As a result, the packages have been renamed as shown in the list below.
  No Breaking changes are made.
  The old versions of the packages will not receive further updates, so we heavily encourage switching to the new version of the packages.
  - `@sap/cloud-sdk-util` was renamed to `@sap-cloud-sdk/util`
  - `@sap/cloud-sdk-analytics` was renamed to `@sap-cloud-sdk/analytics`
  - `@sap/cloud-sdk-core` was renamed to `@sap-cloud-sdk/core`
  - `@sap/cloud-sdk-generator` was renamed to `@sap-cloud-sdk/generator`
  - `@sap/cloud-sdk-test-util` was renamed to `@sap-cloud-sdk/test-util`

### How to update your project

1. Search for all your `dependencies`/`devDependencies`/`peerDependencies` in your `package.json`.
1. Replace the old package name e.g., `@sap/cloud-sdk-core` with the new one, `@sap-cloud-sdk/core`.
1. Use the stable version of the open source version e.g., `^1.18.0`.
1. Deleting your `node_modules` and the `package-lock.json`.
1. Install your dependencies again to reflect the changes via e.g., `npm i`.
1. Search for your source code that uses the old packages as import and replace it with new names.

## Improvements

- Allow the definition of a custom version for the gerated `package.json` by passing the desired version to the generator as an argument `versionInPackageJson`.

# 1.17.2

Release Date: February 27, 2020<br>
API Docs: https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1053508<br>

## Known Issues

- Using destinations with authentication type `PrincipalPropagation` and proxy type `OnPremise` (as configured in the SAP Cloud Platform cockpit) will currently throw errors. This can be worked around by setting the authentication type to `NoAuthentication` instead.

## Improvements

- Make the retrieval of constructors for batch responses more reliable.

## Fixed Issues

- Consider proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `http_proxy`, `https_proxy`) for destinations configured in VCAP service bindings (e.g. when using SAP Extension Factory).
- _OData client generator_ Fix a generation issue, where wrong type names were generated for nested complex types in certain circumstances.
- Fix the return value of OData DELETE requests. It now returns a Promise<void> as indicated by the type instead of the full Axios response.
- Fix the return type of the functions [`asc`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#asc) and [`desc`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#desc) to be more specific, now returning [`Order`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/classes/_sap_cloud_sdk_core.order.html) insteaf of [`Orderable`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#orderable).

# 1.17.0

Release Date: February 13, 2020<br>
API Docs: https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1047125<br>

## New Functionality

- _OData client_: Update the OData VDM to the [newest release 2002 of SAP S/4HANA Cloud](https://news.sap.com/2020/01/sap-s4hana-cloud-2002-release/). This includes completely new services (available as usual as [global modules](https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/globals.html) called `@sap/cloud-sdk-vdm-*`), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

- Consider variables `http_proxy` and `https_proxy` for configuring proxy settings for outbound requests, that do not use the SAP Cloud Connector. The `no_proxy` variables can be used to exclude certain destinations from using the proxy. See [`ProxyConfiguration`](https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/interfaces/_sap_cloud_sdk_core.proxyconfiguration.html) for more details.

## Fixed Issues

- Fix an issue with the generation of OData clients for `.edmx` files that contain entities ending with "Type".

# 1.16.0

Release Date: January 30, 2020<br>
API Docs: https://help.sap.com/doc/101ace914463482b816b6fb265daa879/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1039650<br>

## Known Issues

- Making OData requests using a proxy defined in the environment variables is not possible (see improvements). This issue is resolved with the SAP Cloud SDK version `1.17.0`.

## New Functionality

- Add common [OData V2](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) filter functions, i. e. `bool substringof(string po, string p1)`, `string substring(string p0, int pos)` and `int length(string p0)`. For filtering with those functions use: `SomeEntity.filter(length(SomeEntity.FIELD).greaterThan(10));`
- Support building custom OData filter functions for filtering. Use the [`filterFunction`](https://help.sap.com/doc/101ace914463482b816b6fb265daa879/1.0/en-US/modules/_sap_cloud_sdk_core.html#filterfunction-1) factory function to filter using any of the OData v2 filter functions generically:
  `SomeEntity.filter(filterFunction('concat', 'string', 'prefix', SomeEntity.FIELD).equals('prefixSomeName'))`. As for the common filter function, filtering over different levels of navigation is not supported.

## Improvements

- Disable the faulty Axios http_proxy parsing from environment variables used by the OData-requests, because it was not working under any circumstances. Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).

## Fixed Issues

- Fix an issue with faulty Axios `http_proxy` environment variable parsing used by the OData requests. Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).
- Fix an issue where the dependencies of the `@sap-cloud-sdk/core` module were recorded by analytics instead of the dependencies of the project that installed the SDK.

# 1.15.1

Release Date: January 16, 2020<br>
API Docs: https://help.sap.com/doc/b2233eb282ec40e49a8661febf18348a/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1031865<br>

## Fixed Issues

- Fix an issue when creating `batch` request with `changeset`. Now a `batch` can contain `changeset` regarding one service instead of different services.
- Fix an issue regarding serialization and deserialization of OData payloads that contain numbers. Number types are correctly supported now.
- Fix `HttpRequestConfig` interface which previously used `body` instead of `data`. This led to data not being added to the request.
- Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.

# 1.15.0

Release Date: December 19, 2019<br>
API Docs: https://help.sap.com/doc/1fd0ac329d664076acfd210249536594/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=1019658<br>

## New Functionality

- Add new scaffold to [SAP Cloud SDK CLI](https://github.com/SAP/cloud-sdk-cli) offering out-of-the-box support for the [CI/CD toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline), including coverage reports. Further improvements to the CLI are listed in the [CLI release notes](https://github.com/SAP/cloud-sdk-cli/releases).

## Improvements

- Disable the faulty axios http_proxy parsing from environment variables used by the odata-requests, because it was not working under any circumstances.
  Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).

## Fixed Issues

- Fix an issue in retrieving cached destinations with certificates, additional OAuth tokens and proxy configurations.
- Fix an issue where collecting usage analytics data was prevented on Windows systems by an incompatible path manipulation.
- Correct the default path for the `service-mapping.json` file in the VDM generator. It failed on Windows systems due to a hard coded `/`.
- Increase the version of the http-proxy-agent to 3.0.0, to fix a side effect with the `https` node module. This affected GET requests built from a URL object.
- Enable applications on Kubernetes to use the SDK to integrate with SAP Cloud Platform services (experimental).

# 1.14.0

Release Date: December 5, 2019<br>
API Docs: https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=906845<br>

## Compatibility Notes

- _OData client generator_: Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties](https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.
- _OData client generator_: Running the generator on Windows without providing a path to the `service-mapping.json` fails. This is fixed in version 1.15.0.

## New Functionality

- _OData client generator_: Support the generation of clients for services using nested complex types.

## Improvements

- Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel()`](https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel).

## Fixed Issues

- Allow setting empty string and other falsy values for non nullable properties as this is supported by SAP S/4HANA Cloud.
- Fix an issue when the literal `fieldName` is defined as the name of a property in an entity.
- Allow http-agent to be used without `esModuleInterop` compilation flag.
- Remove unsupported `contains()` function from filter expressions in the OData request builder.

# 1.13.1

Release Date: November 21, 2019<br>
API Docs: https://help.sap.com/doc/7e044f5dba0c4007afa148c74ff79a33/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/?p=899516<br>

## Compatibility Notes

- Introduce new module `@sap-cloud-sdk/analytics` to provide insights into the SDK usage for further improving the SDK in the future.
  - To review what data is collected and enable analytics, you need to opt-in as described [here](https://github.com/SAP/cloud-sdk-cli/blob/main/usage-analytics.md).
  - No data about your projects will be collected as long as you don't opt-in. We never collect personal data.
- Due to a change of the naming strategy for entity classes in the OData client generator, entities that were previously named using the pattern `EntityType_<number>` might now have a different name when regenerated.

## New Functionality

- _OData client_: Update the OData VDM to the [newest release 1911 of SAP S/4HANA Cloud](https://news.sap.com/2019/11/sap-s4hana-cloud-1911-intelligent-enterprise-experience-economy/). The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

## Improvements

- _OData client generator_: Consistently use the entity set name instead of the entity type name for determining the generated entity class name.

## Fixed Issues

- Fix a bug where the location ID of a destination for on-premise connectivity was ignored when trying to fetch CSRF tokens.
- Fix a bug with the lookup of test destination files on windows systems related to a hard coded `/`.
- Fix an issue when [`sanitizeDestination`](https://help.sap.com/doc/7e044f5dba0c4007afa148c74ff79a33/1.0/en-US/modules/_sap_cloud_sdk_core.html#sanitizedestination) led to an error when called multiple times on the same destination object.
- Fix an OData client generation bug where the number of generated entities with default name pattern was unintenionally limited to 10.

# 1.12.0

Release Date: November 7, 2019<br>
API Docs: https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/11/08/new-versions-of-sap-cloud-sdk-3.7.0-for-java-and-1.12.0-for-javascript/<br>

## Compatibility Notes

- Due to the introduction of an SDK-specific logger, the format of log messages created by the SAP Cloud SDK has changed.

## New Functionality

- Release SAP Cloud SDK Command Line Interface (CLI) `@sap-cloud-sdk/cli` on the [central registry npmjs.com](https://www.npmjs.com/package/@sap-cloud-sdk/cli). The CLI makes it easy to add the SAP Cloud SDK for JavaScript to an existing project and simplifies several other tasks when building applications on SAP Cloud Platform.
  - Install the CLI via [npm](https://www.npmjs.com/package/@sap-cloud-sdk/cli) (`npm install @sap-cloud-sdk/cli`).
  - For more information on how to use the CLI, take a look at the [Readme](https://github.com/SAP/cloud-sdk-cli/blob/main/README.md) or call `sap-cloud-sdk --help` after installing.
  - The CLI is available as open source under Apache License 2.0 from the [github.com repository](https://github.com/SAP/cloud-sdk-cli). Contributions are welcome.
- Add an [SDK-specific logger](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/modules/_sap_cloud_sdk_util.html#createlogger) based on [winston](https://github.com/winstonjs/winston) that produces filterable logs in Kibana / on SAP Cloud Platform as well as better formatted logs locally. It is consistently used within the SDK and can be used for application code as well.
- Support the handling of destinations with `OAuth2SAMLBearerAssertion` authentication type that include a property `SystemUser`. The system user will be used instead of the currently logged in user to retrieve an access token to the destination. That is, no principal propagation takes place. As a consequence, no user JWT is required.

## Improvements

- Include URL of requested service in error messages of failed OData requests.

## Fixed Issues

- Use correct type [`DestinationOptions`](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationoptions) in `execute` method of OData VDM request builders. The type used previously was overly restrictive, which prevented passing of valid objects like a [`selectionStrategy`](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationaccessoroptions.html#selectionstrategy), even though the code actually handles it.
- Improve error handling and console output for the systems and credentials defined for local testing in the `systems.json` and `credentials.json` files, respectively.

# 1.11.3

Release Date: October 24, 2019<br>
API Docs: https://help.sap.com/doc/adc5a5f757c44aa48cee5142617549b0/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/10/24/new-versions-of-sap-cloud-sdk-3.6.0-for-java-and-1.11.3-for-javascript/<br>

## New Functionality

- _OData client generator_: Support batch requests (introduced in [1.11.2](#version-1.11.2) for pre-delivered SAP S/4HANA Cloud APIs) also for generated OData clients.
- _OData client generator_: Support generating [Core Data Services Schema Notation (CSN)](https://cap.cloud.sap/docs/cds/csn) files based on the metadata of each OData service.
  - CSN files are used in [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/about/) when modeling a business domain using CDS. Having them generated by the generator of the SAP Cloud SDK allows immediately leveraging them in CDS models.
  - To generate CSN files in addition to the OData client code, pass the command line parameter `--generateCSN=true`. The default value is false.
  - The generated file is located in the folder for the service. That is, for a service named `my-service` the CSN will be in `my-service/my-service-csn.json`.

# 1.11.2

Release Date: October 10, 2019<br>
API Docs: https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/08/10/new-versions-of-sap-cloud-sdk-3.5.0-for-java-1.11.2-for-javascript-and-v25-of-continuous-delivery-toolkit/<br>

## Known Issues

- Please note that we have not released a new version 1.11.2 of the OData client generator (module `@sap-cloud-sdk/generator`) due to technical reasons. 1.10.0 remains the current version of the generator. As a consequence, the new features of the OData client mentioned below (batch and CSN files) are not yet available for custom OData clients generated by the generator.

## Compatibility Notes

- In preparation for an upcoming change to the way how the XSUAA service supplies verification keys to applications, the SAP Cloud SDK from version 1.11.2 onwards retrieves the key from the XSUAA service instead of relying on a verification key present in the XSUAA service binding credentials.
- Previous versions of the SDK only recognized an access token in the authorization header if "`Bearer`" was spelled in title case. Now, [`retrieveJwt`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#retrievejwt) does a case insensitive check for "`bearer`". That means, "bearer" and "Bearer" are now equally supported as correct authorization header.

## New Functionality

- Support [OData batch requests](https://www.odata.org/documentation/odata-version-2-0/batch-processing/>) for batch processing that allows grouping several operations into one single request, resulting in better performance.
  - Support create, update and delete requests as part of change sets within a batch request that group a set of write operations into a transaction.
  - Support retrieve requests within batch requests.
  - Use the new method `batch` that each module for a OData service exposes (see [example for business partner service](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_vdm_business_partner_service.html#batch)) to [construct a batch request](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchrequestbuilder.html). Pass prepared query and by-key request builders as parameters to the method (instead of executing them), as well as change sets.
  - Use the new method `changeset` that each module for a OData service exposes (see [example for business partner service](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_vdm_business_partner_service.html#changeset)) to construct a [change set](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchchangeset.html). Pass prepared create, update, and delete request builders as parameters to the method (instead of executing them). Then, pass the constructed change set to the `batch` method.
  - Execute the batch request like any other request builder using the method [`execute`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchrequestbuilder.html#execute), which returns a promise of a list of [`BatchResponse`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#batchresponse).
  - [`BatchResponse`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#batchresponse) is a union type, representing the response of an indiviual retrieve request or change set that was passed to the batch request. Use `isSuccess` to verify that the retrieve request or change set was successful. Then, use a type assertion like `response as ReadResponse` based on your knowledge of the expected response to further work with the response.
- _OData client for SAP S/4HANA Cloud_: Include CSN files for all SAP S/4HANA Cloud APIs out-of-the-box. They are available from the corresponding folder in `node_modules` after npm-installing an SDK module.
  - CSN files are used in [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/about/) when modeling a business domain using CDS. Having them generated by the generator of the SAP Cloud SDK allows immediately leveraging them in CDS models.

## Improvements

- Validate user access tokens issued by XSUAA with the verification key retrieved from the XSUAA service (online verification), instead of relying on a verification key present in the XSUAA service binding credentials (offline verification). The retrieved key is cached for 15 minutes (depending on feedback, the cache duration may change in the future. If you use the SDK's [`verifyJwt`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#verifyjwt) method, no action is required.
- The `fromJson` method of entity builders has been improved to properly parse a JSON in the notation used elsewhere in the SDK, with links and attributes in camel-case.

## Fixed Issues

- Fix compilation issues when using any entity builder and `"strictNullChecks": true` is set in the `tsconfig.json` file of the project.

# 1.10.0

Release Date: September 26, 2019<br>
API Docs: https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/09/26/new-versions-of-sap-cloud-sdk-3.4.0-for-java-1.10.0-for-javascript-and-v24-of-continuous-delivery-toolkit/<br>

## New Functionality

- Construct a structured representation of users as a [`Tenant` object](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/interfaces/_sap_cloud_sdk_core.tenant.html) from a JWT with the new method [`tenantFromJwt`](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/modules/_sap_cloud_sdk_core.html#tenantfromjwt).
- Construct a structured representation of users as a [`User` object](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/interfaces/_sap_cloud_sdk_core.user.html) from a JWT with the new method [`userFromJwt`](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/modules/_sap_cloud_sdk_core.html#userfromjwt).

# 1.9.0

Release Date: September 12, 2019<br>
API Docs: https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/09/12/new-versions-of-sap-cloud-sdk-3.3.1-for-java-and-1.9.0-for-javascript/<br>

## Known Issues

-

## Compatibility Notes

-

## New Functionality

- Support destinations with authentication type `ClientCertificateAuthentication`.
- Provide the option to update OData entities using PUT instead of PATCH (which is used by default) via the [`replaceWholeEntityWithPut`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.updaterequestbuilder.html#replacewholeentitywithput) method.

## Improvements

- Support response format used by SAP Cloud for Customer for retrieving a single OData entity by key (in [`GetByKeyRequestBuilder`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.getbykeyrequestbuilder.html)).
- Add an option to ignore version identifiers as part of delete requests by using the [`ignoreVersionIdentifier`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.deleterequestbuilder.html#ignoreversionidentifier) method.
- Support "Location ID" property of Cloud Connector in on-premise destinations. This previously caused the connection to fail if a Location ID was expected by the Cloud Connector.

## Fixed Issues

- Fix an issue with the OData client where it failed if the `x-csrf-token` header was ignored by the destination. Now, a warning will be logged instead and the execution continues to enable compatibility with more systems.
- Fix an issue with the OData client where it failed because a `set-cookie` header was expected but not returned by a destination. Now, a warning will be logged instead and the execution continues to enable compatibility with more systems.
- Fix an issue where TypeScript code generated with the OData client generator ([`@sap-cloud-sdk/generator`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/modules/_sap_cloud_sdk_generator.html)) did not compile when `"strict": true` is set in the project's `tsconfig.json`.

# 1.8.1

Release Date: August 29, 2019<br>
API Docs: https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/08/29/new-versions-of-sap-cloud-sdk-3.2.0-for-java-1.8.1-for-javascript-and-v23-of-continuous-delivery-toolkit/<br>

## Known Issues

-

## Compatibility Notes

-

## New Functionality

- Add additional selection strategies for retrieving destinations that only select destinations defined in the provider account ([`alwaysProvider`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#alwaysprovider)) or in the subscriber account ([`alwaysSubscriber`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#alwayssubscriber)). You pass the strategy to use as part of the [`DestinationOptions`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationoptions.html) when retrieving a destination, if you do not want to use the default, [`subscriberFirst`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#subscriberfirst). All strategies are available from an object helper [`DestinationSelectionStrategies`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationselectionstrategies).

## Improvements

-

## Fixed Issues

-

# 1.8.0

Release Date: August 15, 2019<br>
API Docs: https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/08/15/new-versions-of-sap-cloud-sdk-3.1.0-for-java-and-1.8.0-for-javascript/<br>

## Known Issues

## Compatibility Notes

- We have increased the timeout of circuit breakers used to retrieved access tokens and destinations from 3 to 10 seconds.
- As part of the update of the OData VDM to SAP S/4HANA Cloud 1908, the package `@sap/cloud-sdk-vdm-outbound-delivery-service` has been removed from the SAP API Business Hub and, as a consequence, from the SDK. Use [`@sap/cloud-sdk-vdm-outbound-delivery-v2-service`](https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/modules/_sap_cloud_sdk_vdm_outbound_delivery_v2_service.html) instead.

## New Functionality

- _OData client_: Update the OData virtual data model to the [newest release 1908 of SAP S/4HANA Cloud](https://news.sap.com/2019/08/sap-s4hana-cloud-1908-new-release/). This includes completely new services (available as usual as [global modules](https://help.sap.com/doc/dfb895df81c04bbc9e7cefc82e92dff7/1.0/en-US/globals.html) called `@sap/cloud-sdk-vdm-*`), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

## Improvements

- _OData client_: allow creating OData entities as child of another entity by using the [`asChildOf()`](https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/classes/_sap_cloud_sdk_core.createrequestbuilder.html#aschildof) method in `CreateRequestBuilder` class.

## Fixed Issues

- _OData client generator_: Fix an issue where the name of a generated OData entity class could conflict with the name of a function import.
- Correctly verify access tokens retrieved from the XSUAA service.

# 1.7.0

Release Date: August 1, 2019<br>
API Docs: https://help.sap.com/http.svc/rc/4260e18b26494846ad050d296a889781/1.0/en-US/index.html<br>
Blog: https://blogs.sap.com/2019/08/01/new-versions-of-sap-cloud-sdk-3.0.0-for-java-and-1.7.0-for-javascript/<br>

## Known Issues

- Discovered a bug where the name of a generated OData entity class could conflict with the name of an import.

## Compatibility Notes

- When executing an OData request with implicit resolution of destinations, or when using `useOrFetchDestination` or `getDestination` explicitly, service bindings represented as destinations now take precedence over querying the destination service. If you have a service binding with the same name as a destination configured in the SAP Cloud Platform cockpit, this will lead to different behavior in your application, because of the newly introduced support for service bindings. Therefore we recommend using unique names across destinations and service bindings.
- Deprecate the misnamed interface `HttpReponse`. Use [`HttpResponse`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.httpresponse.html) instead.

## New Functionality

- Support accessing destinations provided as service bindings by SAP Cloud Platform Extension Factory.
  - Transparently support using URL and authentication of service bindings wherever a destination may be resolved, including executing OData requests by supplying a [`DestinationNameAndJwt`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationnameandjwt.html) as well as in [`useOrFetchDestination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#useorfetchdestination) and [`getDestination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#getdestination).
  - Introduce a new function [`destinationForServiceBinding`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationforservicebinding) that accepts the name of a service (as string) and tries to find a service binding with the given name and builds a [`Destination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.destination.html) for that service.

## Improvements

- Verify JWTs that are passed to the destination accessor when [fetching destinations from the destination service](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#getdestinationfromdestinationservice) (explicitly or implicitly).
- _OData client_: [Create an OData delete request](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/classes/_sap_cloud_sdk_core.deleterequestbuilder.html) by passing the OData entity to delete instead of only the key values. Automatically attach the [version identifier](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html#versionidentifier) if present.

## Fixed Issues

- Fix an issue where an error was thrown when trying to build the authorization header for destinations with authentication type _NoAuthentication_.
- Fix issues where the logic to select the correct XSUAA instance differed from the standard logic, as, for example, implemented in the SAP Cloud SDK for Java.
- Rename `HttpReponse` interface to [`HttpResponse`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.httpresponse.html).
