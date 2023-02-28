[//]: # "Please don't delete the following comments and keep them in the beginning of this document. Also, keep the first line empty."

[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: [core] Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.)
[//]: # (Example new functionality: [generator] Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.)
[//]: # (Example function removed: [generator] Remove the option: `aggregatorDirectoryName`)
[//]: # (Example function moved: Move the following functions to `connectivity` package)

# Next

## Breaking Changes

### Function removed

- 

### Function moved

- 

### Signature changed

-

### Implementation changed

- 

# 2.10.0

API Docs: https://sap.github.io/cloud-sdk/api/2.10.0

## Compatibility Notes

- [odata-common, odata-v2, odata-v4] Changed constructor argument of class `EntityBase` from `schema` to `_entityApi`. (144ff66f4)

## Improvements

- [openapi-generator] Add `force` option to`rm` commands, when setting `clearOutputDir` to true. (f76da3060)

## Fixed Issues

- [odata-v2, odata-v4] Fix the "entity generic type" of the "delete request builder". (f76da3060)
- [generator, openapi-generator] Show detailed error message of compilation errors instead of `[object Object]`. (f76da3060)
- [generator-common] Show detailed error message of compilation errors instead of `[object Object]`.
  - @sap-cloud-sdk/util@2.10.0 (f76da3060)

# 2.11.0

API Docs: https://sap.github.io/cloud-sdk/api/2.11.0

## New Functionalities

- [odata-common] Add `getBatchReference()` and `setBatchId()` in request builders to use the batch ID as a reference to an entity in a batch request changeset.
  Batch reference are available in `create`, `delete`, `getByKey`, `update` and `actions/functions` request builder. (79e0fe811)
- [odata-v4, generator] Support parsing and generating OData bound functions and actions in OData v4 (8ea28151b)
- [generator, openapi-generator, generator-common] Generated sources are formatted using prettier with default config. Use the CLI option `prettierConfigPath` to provide a custom config. (74e14427a)

## Improvements

- [odata-common] Change the place where batch ID is generated from on serialization to request creation. (79e0fe811)

# 2.7.1

API Docs: https://sap.github.io/cloud-sdk/api/2.7.1

## Fixed Issues

- [mail-client] Fix proxy authorization for sending emails.
  - @sap-cloud-sdk/connectivity@2.7.1
  - @sap-cloud-sdk/util@2.7.1 (e7fa8d35)

# 2.5.0

API Docs: https://sap.github.io/cloud-sdk/api/2.5.0

## Compatibility Notes

- [odata-common, generator] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes. (c3166ff6)
- [util] Stop using `VCAP_SERVICES` to determine the log format. Use `setLogFormat` and `setGlobalLogFormat` to specify the log format. By default, the log format is set to `kibana` for `NODE_ENV=production` and `local` otherwise. (89f1c423)

## Fixed Issues

- [http-client] Fix the `executeHttpRequest` function, so it accepts the same parameters as in version 1.
  [Compatibility Note] Deprecate one overload of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
  [New Functionality] Support defining header options and query parameter options with origins. (9481ec69)

# 2.4.0

API Docs: https://sap.github.io/cloud-sdk/api/2.4.0

## Compatibility Notes

- [connectivity] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level. (04726a35)
- [connectivity] Mark the function `noDestinationErrorMessage` as internal API. (0a008674)
- [odata-v4] Mark the function `uriConverter` as internal API. (0a008674)
- [eslint-config] Switch the following `jsdoc` related levels from `warn` to `error`:
  - `jsdoc/check-param-names`
  - `jsdoc/require-description-complete-sentence`
  - `jsdoc/require-jsdoc`
  - `jsdoc/require-param`
  - `jsdoc/require-returns` (0a008674)

## New Functionalities

- [connectivity] Support self-signed certificate using the `trustStore` property of the destination object. (0a008674)

## Improvements

- [connectivity] Reduce default log output on the `info` level significantly. (04726a35)
- [http-client] Reduce default log output on the `info` level significantly.
  [Compatibility Note] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level. (04726a35)

## Fixed Issues

- [util] Fix a bug in the implementation of the trim method. (0a008674)

# 2.6.0

API Docs: https://sap.github.io/cloud-sdk/api/2.6.0

## Compatibility Notes

- [odata-v4, temporal-de-serializers] Adjust parsing of `Edm.Date`, `Edm.DateTimeOffset`, `Edm.Time`, and `Edm.Duration` to be closer to the OData v4 specification.
  There may be loss of precision if using the default (de-)serializers with high-precision fractional seconds. (de851289)
- [generator] Deprecate generator option `versionInPackageJson`. If you need to set the version, use the new `include` option to add your own `package.json` file instead. (069aa168)
- [generator] The hidden generator option `additionalFiles` is renamed to `include`. (069aa168)

## New Functionalities

- [connectivity] Support JWTs without a `JKU` property. (cb598c16)
- [connectivity] Add interface `DestinationCacheInterface` and method `setDestinationCache` to support implementation of custom destination cache. (09094607)
- [connectivity] Fetch client credential token for destinations created by service bindings. (93d41281)
- [generator] New generator option `include` which allows to add files to generated packages. (069aa168)

## Improvements

- [http-client] Make `requestConfig` of `OriginOptions` optional. (e46bb51d)

## Fixed Issues

- [connectivity] Fix `getDestination()` to allow passing an async transform function `serviceBindingTransformFn` in `options`. The transform function can also be passed by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
  [Compatibility Note] Rename `transformationFn` into `serviceBindingTransformFn` in `DestinationForServiceBindingsOptions` to avoid ambiguity and make the function async. (8fdfebd6)
- [http-client] Fix the `executeHttpRequest`/`executeHttpRequestWithOrigin` function, so the warning is only shown when overwriting headers by using custom headers. (e44c214a)
- [odata-common, odata-v4, temporal-de-serializers] Fix parsing of `Edm.DateTimeOffset` with high-precision fractional seconds and edge-cases like 5-digit years. (de851289)
- [odata-common, generator] Allow OData service to contain an entity name 'entity'. (0675ee3b)
- [odata-v2] Support negative epoch timestamps in serialization. (9ffe0824)

# 2.7.0

API Docs: https://sap.github.io/cloud-sdk/api/2.7.0

## New Functionalities

- [openapi-generator] Support globs in the `input` option. (3f70b0c9)

## Improvements

- [connectivity] Support consumption of the XSUAA API via destinations. (010a46fa)

## Fixed Issues

- [connectivity] Fix a breaking change of `serviceToken` introduced in 2.0, so it accepts `XsuaaServiceCredentials` again as an option. (3bff42e1)

# 2.8.0

API Docs: https://sap.github.io/cloud-sdk/api/2.8.0

## Compatibility Notes

- [eslint-config] Activated the eslint rule 'check-tag-names' to allowed jsdoc tags. If you use custom tags add them via the 'definedTags' in the eslint options. (15e9ef4b)
- [generator] Deprecated `generateNpmrc` cli option. This option was only used to configure the now defunct npm registry hosted by SAP. It now has no effect anymore and should be removed in all invocations of the generator cli. (15e9ef4b)
- [generator, openapi-generator, generator-common] Description for package.json in a generated client has changed. (15e9ef4b)

## New Functionalities

- [mail-client] Support defining the strategy of sending emails. By default, the emails are sent "in parallel" and can be set to "in sequential". (15e9ef4b)
- [odata-common, generator] Allow function imports using GET http method in batch requests. (15e9ef4b)

## Improvements

- [connectivity] Reduce default logs for failing requests in @sap-cloud-sdk/http-client.
  - @sap-cloud-sdk/util@2.8.0 (15e9ef4b)

## Fixed Issues

- [connectivity] Remove last explicit references to 'VCAP_SERVICES' and replace them with '@sap/xsenv'. (15e9ef4b)
- [connectivity] Fix that unparsable destinations in the subaccount prevent other destinations from beeing fetched. (15e9ef4b)

# 2.9.0

API Docs: https://sap.github.io/cloud-sdk/api/2.9.0

## New Functionalities

- [connectivity] Support fetching all subaccount- and service instance destinations from the destination service simultaneously. (24029503)
- [mail-client] Expose SMTP transport options of `nodemailer`. (d1bf2dee)
- [util] Add method `setGlobalTransports` to support setting custom transport globally. (4c51d3dc)

## Improvements

- [odata-common] Make OderBy() set in ascending order by default. (f62eb0d3)

# 3.0.0

API Docs: https://sap.github.io/cloud-sdk/api/3.0.0

## Compatibility Notes

- [connectivity] The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings. (350843baa)
- [connectivity] The `Protocol` enum was replaced with a string literal union type. Now, instead of passing `Protocol.HTTPS` pass 'https'. (b25bcbbf4)
- [connectivity, http-client, openapi, odata-common, odata-v2, resilience] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching. (afaf93408)
- [connectivity, http-client, mail-client, openapi, odata-common, odata-v2, odata-v4, eslint-config, generator, test-util, util, openapi-generator, generator-common, temporal-de-serializers, resilience] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed. (f9a5a766c)
- [connectivity] The enum `IsolationStrategy` was replaced with a string literal union type of the same name. Use 'tenant' and 'tenant-user' instead of `IsolationStrategy.Tenant` and `IsolationStrategy.Tenant_User`. (44a165ef4)
- [connectivity, http-client, odata-common] ] The `url` property in `Destination` is now optional as destinations of type `MAIL` do not have a URL. (29d804ebd)
- [http-client, openapi, odata-common] Remove `timeout()` method from the request builders and the `timeout` options from the `executeHttpRequest()` function.
  Visit the [documentation portal](https://sap.github.io/cloud-sdk/docs/js/guides/resilience) to see how to add a timeout using middlewares. (fabe2cd96)
- [http-client] Removed overload of executeHttpRequest
  The overload, that accepted `HttpRequestConfigWithOrigin` as a parameter, is removed and replaced by the function `executeHttpRequestWithOrigin`. (350843baa)
- [odata-common, generator, util] By default, generation of OData clients fails if a service path cannot be determined. Either provide `servicePath` value in the `options-per-service.json` or set `skipValidation` to true, in which case, `/` will be used. (7cc8dab4b)
- [odata-common] The constructor of `ODataRequestConfig` was changed so that the third parameter cannot be a `string` anymore.
  Passing in a string which was then interpreted as the value for the `Content-Type` HTTP header was deprecated.
  The type of the parameter is now `Record<string, any>`, and if only want to set the `Content-Type` HTTP header you can do so by passing `{'content-type': 'some-value'}` to the constructor. (350843baa)
- [odata-common] The constructor of the entity API is private to avoid accidental usage. Use the service object to get a API instance. (714556c4d)
- [odata-common, generator, openapi-generator] The `serviceMapping` option of the OData generator has been renamed to `optionsPerService`. The mapping file, `service-mapping.json` has also been renamed to `options-per-service.json`. By default, an options file will not be generated. (a50c96b66)
- [odata-common] Setting custom fields in `fromJson` through the `_customFields` property has been removed.
  Add custom properties to your JSON object instead. (350843baa)
- [generator] The options per service behavior is now the same as for the OpenApi generator.
  For details on how to migrate and what has change look at the migration guide. (4f1a255ac)
- [generator] The deprecated `forceOverwrite` option of the generator is removed. Use the `overwrite` option instead.
  [Compatibility Note] The deprecated `generatePackageJson` option of the generator is removed. Use the `packageJson` option instead.
  [Compatibility Note] The deprecated `writeReadme` option of the generator is removed. Use the `readme` option instead.
  [Compatibility Note] The deprecated `processesJsGeneration` option of the generator is removed. Use the `transpilationProcesses` option instead.
  [Compatibility Note] The internal options `sdkAfterVersionScript`, `s4HanaCloud` and `packageVersion` of the generator are removed.
  These were hidden options never meant for external usage and there is no replacement.
  [Compatibility Note] The deprecated `generateNpmrc` option of the generator is removed. Use the `include` option to add a `.npmrc` to the generated code if needed. (67ee59ec1)
- [generator] Add `verbose` generator option. By default, only error and warning logs will be displayed. If `verbose` is set to `true`, all logs will be displayed. (f6bdbeade)
- [generator] The `generateJs` option has been replaced with the `transpile` option. Transpilation is not enabled by default. (db5bcf8da)
- [generator] The command line argument `inputDir` of the OData generator is renamed to `input`.
  The new `input` options accepts now also file paths and glob patterns. (248c02d7b)
- [generator] The OData generator won't automatically rename identifiers to avoid name conflicts.
  The generation process will fail if identifiers have conflicting names.
  Switch on the `skipValidation` flag if you want to generate despite name conflicts and are okay with changed identifier names to avoid conflicts. (e9b5bc9cc)
- [generator, openapi-generator, generator-common] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
  [Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
  If necessary use the `include` option to add a `package.json` with a custom value. (9cc19716f)
- [generator, openapi-generator] Rename servicePath to basePath. (98960982e)
- [generator] The option `generateCSN` is removed. There is no replacement. (7340703e0)
- [generator] The type for paths in the `GeneratorOptions` is changed from `fs.PathLike` to `string`.
  In case you passed a buffer object please resolve it to a string before passing it to the SAP Cloud SDK. (b1eb72868)
- [generator, openapi-generator, generator-common] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
  In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths. (b1eb72868)
- [util] The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`. (350843baa)
- [util] The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface. (350843baa)
- [openapi-generator] The internal option `packageVersion` of the OpenAPI generator is removed. (b1eb72868)
- [openapi-generator] `tsConfig` option has been renamed to `tsconfig`. (db5bcf8da)
- [generator-common] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
  [Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` files from now on.
  Modern IDEs don't require those files for code navigation, thus they are removed to decrease download size of the SDK. (0bc92f0e2)

## New Functionalities

- [connectivity] Support `OAuth2RefreshToken` authentication type (db7c5ef2e)
- [connectivity] Add a `retry` option in the `DestinationFetchOption`.
  Enable this options if the token exchange done by the destination service is unstable. (4e6fe1086)
- [connectivity, resilience] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options. (a47ebcfd7)
- [http-client, resilience] The request configuration used in the final request is now part of the middleware context.
  User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
  The request configuration contains the `url`, `headers` and all other properties of the HTTP request. (fe1ef5419)
- [http-client, openapi, odata-common] Introduce the middleware on the request builders and http-client.
  Visit the [documentation portal](https://sap.github.io/cloud-sdk/docs/js/guides/resilience) to see how to use middlewares. (fabe2cd96)
- [generator, generator-common] Introduced options `transpile` and `tsconfig` to configure transpilation for generated OData clients. (db5bcf8da)

## Improvements

- [connectivity] Replace `Protocol` enum with a string literal union type. (b25bcbbf4)
- [connectivity] Replace `IsolationStrategy` enum with union type. (44a165ef4)
- [generator] Align naming rules for operations and properties in OData clients by removing `_` prefix (3a1cc7f72)

## Fixed Issues

- [connectivity] Fix the combination of providing the `iss` together with `OnPremise` basic destinations. (f703b6e4b)
- [odata-v2] Allow to update OData v2 entities to `null`. Fixes [3204](https://github.com/SAP/cloud-sdk-js/issues/3204). (72817ee93)
- [generator] Allow OData service to contain an entity name 'Service'. (d1e33228e)
- [generator] Now links to the correct generator binary. (622e7eba6)

## Known Issues

-

## Compatibility Notes

- 

## New Functionality

- 

## Improvements

-

## Fixed Issues

-
