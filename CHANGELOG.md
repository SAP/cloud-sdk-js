[//]: # (Please don't delete the following comments and keep them in the beginning of this document.)
[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: "_OData client generator_: Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.")
[//]: # (Example new functionality: _OData client generator_: Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: "Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.")

# 1.X.Y

release-date:
docs:
blog:

## knownIssues

-

## compatibilityNotes

-

## newFunctionality

-

## improvements

-

## fixedIssues

-

# 1.18.1

release-date:
docs:
blog:

## knownIssues

-

## compatibilityNotes

- Parsing destinations now also checks for validity of the destination. All destinations of type 'HTTP' are expected to contain a `url` or `URL` property. When retrieving a destination from the `destinations` environment variable by name, all destinations are parsed, therefore this validation applies to all available destination, even those that are not read.

## newFunctionality

-

## improvements

- Validate destinations retrieved from environment variable or destination service.
- Allow setting the format for the keys of a destination in the `destinations` environment variable as known from the destination service - e. g. `URL` in addition to previously only `url`.

## fixedIssues

- Fix ordering for complex properties including nested complex properties.
- Fix the generator crashing for services containing function imports without a return type.
- Fix the destination processing so that the user can set `PrincipalPropagation` as authentication scheme for OnPremise connectivity.

# 1.18.0

release-date: March 12, 2020
docs: https://help.sap.com/doc/69202ef7e0a64767833782132648b855/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1060707

## compatibilityNotes

- Some packages of the SAP Cloud SDK for JavaScript have been migrated to [external GitHub](https://github.com/SAP/cloud-sdk) and are now available as open-source software.
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

## improvements

- Allow the definition of a custom version for the gerated `package.json` by passing the desired version to the generator as an argument `versionInPackageJson`.

# 1.17.2

release-date: February 27, 2020
docs: https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1053508

## knownIssues

- Using destinations with authentication type `PrincipalPropagation` and proxy type `OnPremise` (as configured in the SAP Cloud Platform cockpit) will currently throw errors. This can be worked around by setting the authentication type to `NoAuthentication` instead.

## improvements

- Make the retrieval of constructors for batch responses more reliable.

## fixedIssues

- Consider proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`, `http_proxy`, `https_proxy`) for destinations configured in VCAP service bindings (e.g. when using SAP Extension Factory).
- _OData client generator_ Fix a generation issue, where wrong type names were generated for nested complex types in certain circumstances.
- Fix the return value of OData DELETE requests. It now returns a Promise<void> as indicated by the type instead of the full Axios response.
- Fix the return type of the functions [`asc`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#asc) and [`desc`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#desc) to be more specific, now returning [`Order`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/classes/_sap_cloud_sdk_core.order.html) insteaf of [`Orderable`](https://help.sap.com/doc/a7b688ee8d9441a8b70da5d384b4248a/1.0/en-US/modules/_sap_cloud_sdk_core.html#orderable).

# 1.17.0

release-date: February 13, 2020
docs: https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1047125

## newFunctionality

- _OData client_: Update the OData VDM to the [newest release 2002 of SAP S/4HANA Cloud](https://news.sap.com/2020/01/sap-s4hana-cloud-2002-release/). This includes completely new services (available as usual as [global modules](https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/globals.html) called `@sap/cloud-sdk-vdm-*`), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

- Consider variables `http_proxy` and `https_proxy` for configuring proxy settings for outbound requests, that do not use the SAP Cloud Connector. The `no_proxy` variables can be used to exclude certain destinations from using the proxy. See [`ProxyConfiguration`](https://help.sap.com/doc/96ad709a1b7e41f3804fa5040bc83167/1.0/en-US/interfaces/_sap_cloud_sdk_core.proxyconfiguration.html) for more details.

## fixedIssues

- Fix an issue with the generation of OData clients for `.edmx` files that contain entities ending with "Type".

# 1.16.0

release-date: January 30, 2020
docs: https://help.sap.com/doc/101ace914463482b816b6fb265daa879/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1039650

## knownIssues

- Making OData requests using a proxy defined in the environment variables is not possible (see improvements). This issue is resolved with the SAP Cloud SDK version `1.17.0`.

## newFunctionality

- Add common [OData V2](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) filter functions, i. e. `bool substringof(string po, string p1)`, `string substring(string p0, int pos)` and `int length(string p0)`. For filtering with those functions use: `SomeEntity.filter(length(SomeEntity.FIELD).greaterThan(10));`
- Support building custom OData filter functions for filtering. Use the [`filterFunction`](https://help.sap.com/doc/101ace914463482b816b6fb265daa879/1.0/en-US/modules/_sap_cloud_sdk_core.html#filterfunction-1) factory function to filter using any of the OData v2 filter functions generically:
`SomeEntity.filter(filterFunction('concat', 'string', 'prefix', SomeEntity.FIELD).equals('prefixSomeName'))`. As for the common filter function, filtering over different levels of navigation is not supported.

## improvements

- Disable the faulty Axios http_proxy parsing from environment variables used by the OData-requests, because it was not working under any circumstances. Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).

## fixedIssues

- Fix an issue with faulty Axios `http_proxy` environment variable parsing used by the OData requests. Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).
- Fix an issue where the dependencies of the `@sap-cloud-sdk/core` module were recorded by analytics instead of the dependencies of the project that installed the SDK.

# 1.15.1

release-date: January 16, 2020
docs: https://help.sap.com/doc/b2233eb282ec40e49a8661febf18348a/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1031865

## fixedIssues

- Fix an issue when creating `batch` request with `changeset`. Now a `batch` can contain `changeset` regarding one service instead of different services.
- Fix an issue regarding serialization and deserialization of OData payloads that contain numbers. Number types are correctly supported now.
- Fix `HttpRequestConfig` interface which previously used `body` instead of `data`. This led to data not being added to the request.
- Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.

# 1.15.0

release-date: December 19, 2019
docs: https://help.sap.com/doc/1fd0ac329d664076acfd210249536594/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=1019658

## newFunctionality

- Add new scaffold to [SAP Cloud SDK CLI](https://github.com/SAP/cloud-sdk-cli) offering out-of-the-box support for the [CI/CD toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline), including coverage reports. Further improvements to the CLI are listed in the [CLI release notes](https://github.com/SAP/cloud-sdk-cli/releases).

## improvements

- Disable the faulty axios http_proxy parsing from environment variables used by the odata-requests, because it was not working under any circumstances.
  Requests that do not need a proxy will now not be broken due to environment variables (see also known issues).

## fixedIssues

- Fix an issue in retrieving cached destinations with certificates, additional OAuth tokens and proxy configurations.
- Fix an issue where collecting usage analytics data was prevented on Windows systems by an incompatible path manipulation.
- Correct the default path for the `service-mapping.json` file in the VDM generator. It failed on Windows systems due to a hard coded `/`.
- Increase the version of the http-proxy-agent to 3.0.0, to fix a side effect with the `https` node module. This affected GET requests built from a URL object.
- Enable applications on Kubernetes to use the SDK to integrate with SAP Cloud Platform services (experimental).

# 1.14.0

release-date: December 5, 2019
docs: https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=906845

## compatibilityNotes

- _OData client generator_: Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties](https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.
- _OData client generator_: Running the generator on Windows without providing a path to the `service-mapping.json` fails. This is fixed in version 1.15.0.

## newFunctionality

- _OData client generator_: Support the generation of clients for services using nested complex types.

## improvements

- Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel()`](https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel).

## fixedIssues

- Allow setting empty string and other falsy values for non nullable properties as this is supported by SAP S/4HANA Cloud.
- Fix an issue when the literal `fieldName` is defined as the name of a property in an entity.
- Allow http-agent to be used without `esModuleInterop` compilation flag.
- Remove unsupported `contains()` function from filter expressions in the OData request builder.

# 1.13.1

release-date: November 21, 2019
docs: https://help.sap.com/doc/7e044f5dba0c4007afa148c74ff79a33/1.0/en-US/index.html
blog: https://blogs.sap.com/?p=899516

## compatibilityNotes

- Introduce new module `@sap-cloud-sdk/analytics` to provide insights into the SDK usage for further improving the SDK in the future.
  - To review what data is collected and enable analytics, you need to opt-in as described [here](https://github.com/SAP/cloud-sdk-cli/blob/master/usage-analytics.md).
  - No data about your projects will be collected as long as you don't opt-in. We never collect personal data.
- Due to a change of the naming strategy for entity classes in the OData client generator, entities that were previously named using the pattern `EntityType_<number>` might now have a different name when regenerated.

## newFunctionality

- _OData client_: Update the OData VDM to the [newest release 1911 of SAP S/4HANA Cloud](https://news.sap.com/2019/11/sap-s4hana-cloud-1911-intelligent-enterprise-experience-economy/). The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

## improvements

- _OData client generator_: Consistently use the entity set name instead of the entity type name for determining the generated entity class name.

## fixedIssues

- Fix a bug where the location ID of a destination for on-premise connectivity was ignored when trying to fetch CSRF tokens.
- Fix a bug with the lookup of test destination files on windows systems related to a hard coded `/`.
- Fix an issue when [`sanitizeDestination`](https://help.sap.com/doc/7e044f5dba0c4007afa148c74ff79a33/1.0/en-US/modules/_sap_cloud_sdk_core.html#sanitizedestination) led to an error when called multiple times on the same destination object.
- Fix an OData client generation bug where the number of generated entities with default name pattern was unintenionally limited to 10.

# 1.12.0

release-date: November 7, 2019
docs: https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/11/08/new-versions-of-sap-cloud-sdk-3.7.0-for-java-and-1.12.0-for-javascript/

## compatibilityNotes

- Due to the introduction of an SDK-specific logger, the format of log messages created by the SAP Cloud SDK has changed.

## newFunctionality

- Release SAP Cloud SDK Command Line Interface (CLI) `@sap-cloud-sdk/cli` on the [central registry npmjs.com](https://www.npmjs.com/package/@sap-cloud-sdk/cli). The CLI makes it easy to add the SAP Cloud SDK for JavaScript to an existing project and simplifies several other tasks when building applications on SAP Cloud Platform.
  - Install the CLI via [npm](https://www.npmjs.com/package/@sap-cloud-sdk/cli) (`npm install @sap-cloud-sdk/cli`).
  - For more information on how to use the CLI, take a look at the [Readme](https://github.com/SAP/cloud-sdk-cli/blob/master/README.md) or call `sap-cloud-sdk --help` after installing.
  - The CLI is available as open source under Apache License 2.0 from the [github.com repository](https://github.com/SAP/cloud-sdk-cli). Contributions are welcome.
- Add an [SDK-specific logger](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/modules/_sap_cloud_sdk_util.html#createlogger) based on [winston](https://github.com/winstonjs/winston) that produces filterable logs in Kibana / on SAP Cloud Platform as well as better formatted logs locally. It is consistently used within the SDK and can be used for application code as well.
- Support the handling of destinations with `OAuth2SAMLBearerAssertion` authentication type that include a property `SystemUser`. The system user will be used instead of the currently logged in user to retrieve an access token to the destination. That is, no principal propagation takes place. As a consequence, no user JWT is required.

## improvements

- Include URL of requested service in error messages of failed OData requests.

## fixedIssues

- Use correct type [`DestinationOptions`](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationoptions) in `execute` method of OData VDM request builders. The type used previously was overly restrictive, which prevented passing of valid objects like a [`selectionStrategy`](https://help.sap.com/doc/15b6f206672d42ad852fa1466d6ad0d5/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationaccessoroptions.html#selectionstrategy), even though the code actually handles it.
- Improve error handling and console output for the systems and credentials defined for local testing in the `systems.json` and `credentials.json` files, respectively.

# 1.11.3

release-date: October 24, 2019
docs: https://help.sap.com/doc/adc5a5f757c44aa48cee5142617549b0/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/10/24/new-versions-of-sap-cloud-sdk-3.6.0-for-java-and-1.11.3-for-javascript/

## newFunctionality

- _OData client generator_: Support batch requests (introduced in [1.11.2](#version-1.11.2) for pre-delivered SAP S/4HANA Cloud APIs) also for generated OData clients.
- _OData client generator_: Support generating [Core Data Services Schema Notation (CSN)](https://cap.cloud.sap/docs/cds/csn) files based on the metadata of each OData service.
  - CSN files are used in [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/about/) when modeling a business domain using CDS. Having them generated by the generator of the SAP Cloud SDK allows immediately leveraging them in CDS models.
  - To generate CSN files in addition to the OData client code, pass the command line parameter `--generateCSN=true`. The default value is false.
  - The generated file is located in the folder for the service. That is, for a service named `my-service` the CSN will be in `my-service/my-service-csn.json`.

# 1.11.2

release-date: October 10, 2019
docs: https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/08/10/new-versions-of-sap-cloud-sdk-3.5.0-for-java-1.11.2-for-javascript-and-v25-of-continuous-delivery-toolkit/

## knownIssues

- Please note that we have not released a new version 1.11.2 of the OData client generator (module `@sap-cloud-sdk/generator`) due to technical reasons. 1.10.0 remains the current version of the generator. As a consequence, the new features of the OData client mentioned below (batch and CSN files) are not yet available for custom OData clients generated by the generator.

## compatibilityNotes

- In preparation for an upcoming change to the way how the XSUAA service supplies verification keys to applications, the SAP Cloud SDK from version 1.11.2 onwards retrieves the key from the XSUAA service instead of relying on a verification key present in the XSUAA service binding credentials.
- Previous versions of the SDK only recognized an access token in the authorization header if "`Bearer`" was spelled in title case. Now, [`retrieveJwt`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#retrievejwt) does a case insensitive check for "`bearer`". That means, "bearer" and "Bearer" are now equally supported as correct authorization header.

## newFunctionality

- Support [OData batch requests](https://www.odata.org/documentation/odata-version-2-0/batch-processing/>) for batch processing that allows grouping several operations into one single request, resulting in better performance.
  - Support create, update and delete requests as part of change sets within a batch request that group a set of write operations into a transaction.
  - Support retrieve requests within batch requests.
  - Use the new method `batch` that each module for a OData service exposes (see [example for business partner service](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_vdm_business_partner_service.html#batch)) to [construct a batch request](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchrequestbuilder.html). Pass prepared query and by-key request builders as parameters to the method (instead of executing them), as well as change sets.
  - Use the new method `changeset` that each module for a OData service exposes (see [example for business partner service](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_vdm_business_partner_service.html#changeset)) to construct a [change set](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchchangeset.html). Pass prepared create, update, and delete request builders as parameters to the method (instead of executing them). Then, pass the constructed change set to the `batch` method.
  - Execute the batch request like any other request builder using the method [`execute`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/classes/_sap_cloud_sdk_core.odatabatchrequestbuilder.html#execute), which returns a promise of a list of [`BatchResponse`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#batchresponse).
  - [`BatchResponse`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#batchresponse) is a union type, representing the response of an indiviual retrieve request or change set that was passed to the batch request. Use `isSuccess` to verify that the retrieve request or change set was successful. Then, use a type assertion like `response as ReadResponse` based on your knowledge of the expected response to further work with the response.
- _OData client for SAP S/4HANA Cloud_: Include CSN files for all SAP S/4HANA Cloud APIs out-of-the-box. They are available from the corresponding folder in `node_modules` after npm-installing an SDK module.
  - CSN files are used in [SAP Cloud Application Programming Model (CAP)](https://cap.cloud.sap/docs/about/) when modeling a business domain using CDS. Having them generated by the generator of the SAP Cloud SDK allows immediately leveraging them in CDS models.

## improvements

- Validate user access tokens issued by XSUAA with the verification key retrieved from the XSUAA service (online verification), instead of relying on a verification key present in the XSUAA service binding credentials (offline verification). The retrieved key is cached for 15 minutes (depending on feedback, the cache duration may change in the future. If you use the SDK's [`verifyJwt`](https://help.sap.com/doc/505cd8d2cbd340a38eeae8b63b5df753/1.0/en-US/modules/_sap_cloud_sdk_core.html#verifyjwt) method, no action is required.
- The `fromJson` method of entity builders has been improved to properly parse a JSON in the notation used elsewhere in the SDK, with links and attributes in camel-case.

## fixedIssues

- Fix compilation issues when using any entity builder and `"strictNullChecks": true` is set in the `tsconfig.json` file of the project.

# 1.10.0

release-date: September 26, 2019
docs: https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/09/26/new-versions-of-sap-cloud-sdk-3.4.0-for-java-1.10.0-for-javascript-and-v24-of-continuous-delivery-toolkit/

## newFunctionality

- Construct a structured representation of users as a [`Tenant` object](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/interfaces/_sap_cloud_sdk_core.tenant.html) from a JWT with the new method [`tenantFromJwt`](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/modules/_sap_cloud_sdk_core.html#tenantfromjwt).
- Construct a structured representation of users as a [`User` object](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/interfaces/_sap_cloud_sdk_core.user.html) from a JWT with the new method [`userFromJwt`](https://help.sap.com/doc/eb571f4aff6f49d2a7fd385b5663ec88/1.0/en-US/modules/_sap_cloud_sdk_core.html#userfromjwt).

# 1.9.0

release-date: September 12, 2019
docs: https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/09/12/new-versions-of-sap-cloud-sdk-3.3.1-for-java-and-1.9.0-for-javascript/

## knownIssues

-

## compatibilityNotes

-

## newFunctionality

- Support destinations with authentication type `ClientCertificateAuthentication`.
- Provide the option to update OData entities using PUT instead of PATCH (which is used by default) via the [`replaceWholeEntityWithPut`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.updaterequestbuilder.html#replacewholeentitywithput) method.

## improvements

- Support response format used by SAP Cloud for Customer for retrieving a single OData entity by key (in [`GetByKeyRequestBuilder`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.getbykeyrequestbuilder.html)).
- Add an option to ignore version identifiers as part of delete requests by using the [`ignoreVersionIdentifier`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/classes/_sap_cloud_sdk_core.deleterequestbuilder.html#ignoreversionidentifier) method.
- Support "Location ID" property of Cloud Connector in on-premise destinations. This previously caused the connection to fail if a Location ID was expected by the Cloud Connector.

## fixedIssues

- Fix an issue with the OData client where it failed if the `x-csrf-token` header was ignored by the destination. Now, a warning will be logged instead and the execution continues to enable compatibility with more systems.
- Fix an issue with the OData client where it failed because a `set-cookie` header was expected but not returned by a destination. Now, a warning will be logged instead and the execution continues to enable compatibility with more systems.
- Fix an issue where TypeScript code generated with the OData client generator ([`@sap-cloud-sdk/generator`](https://help.sap.com/doc/c3eb465862914a45adb2c0963287fe0d/1.0/en-US/modules/_sap_cloud_sdk_generator.html)) did not compile when `"strict": true` is set in the project's `tsconfig.json`.

# 1.8.1

release-date: August 29, 2019
docs: https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/08/29/new-versions-of-sap-cloud-sdk-3.2.0-for-java-1.8.1-for-javascript-and-v23-of-continuous-delivery-toolkit/

## knownIssues

-

## compatibilityNotes

-

## newFunctionality

- Add additional selection strategies for retrieving destinations that only select destinations defined in the provider account ([`alwaysProvider`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#alwaysprovider)) or in the subscriber account ([`alwaysSubscriber`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#alwayssubscriber)). You pass the strategy to use as part of the [`DestinationOptions`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationoptions.html) when retrieving a destination, if you do not want to use the default, [`subscriberFirst`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#subscriberfirst). All strategies are available from an object helper [`DestinationSelectionStrategies`](https://help.sap.com/doc/48040536eea541f28499a14a27d976fa/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationselectionstrategies).

## improvements

-

## fixedIssues

-

# 1.8.0

release-date: August 15, 2019
docs: https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/08/15/new-versions-of-sap-cloud-sdk-3.1.0-for-java-and-1.8.0-for-javascript/

## knownIssues

## compatibilityNotes

- We have increased the timeout of circuit breakers used to retrieved access tokens and destinations from 3 to 10 seconds.
- As part of the update of the OData VDM to SAP S/4HANA Cloud 1908, the package `@sap/cloud-sdk-vdm-outbound-delivery-service` has been removed from the SAP API Business Hub and, as a consequence, from the SDK. Use [`@sap/cloud-sdk-vdm-outbound-delivery-v2-service`](https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/modules/_sap_cloud_sdk_vdm_outbound_delivery_v2_service.html) instead.

## newFunctionality

- _OData client_: Update the OData virtual data model to the [newest release 1908 of SAP S/4HANA Cloud](https://news.sap.com/2019/08/sap-s4hana-cloud-1908-new-release/). This includes completely new services (available as usual as [global modules](https://help.sap.com/doc/dfb895df81c04bbc9e7cefc82e92dff7/1.0/en-US/globals.html) called `@sap/cloud-sdk-vdm-*`), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

## improvements

- _OData client_: allow creating OData entities as child of another entity by using the [`asChildOf()`](https://help.sap.com/doc/387c59ceff9840e48572a430b12d9fe2/1.0/en-US/classes/_sap_cloud_sdk_core.createrequestbuilder.html#aschildof) method in `CreateRequestBuilder` class.

## fixedIssues

- _OData client generator_: Fix an issue where the name of a generated OData entity class could conflict with the name of a function import.
- Correctly verify access tokens retrieved from the XSUAA service.

# 1.7.0

release-date: August 1, 2019
docs: https://help.sap.com/http.svc/rc/4260e18b26494846ad050d296a889781/1.0/en-US/index.html
blog: https://blogs.sap.com/2019/08/01/new-versions-of-sap-cloud-sdk-3.0.0-for-java-and-1.7.0-for-javascript/

## knownIssues

- Discovered a bug where the name of a generated OData entity class could conflict with the name of an import.

## compatibilityNotes

- When executing an OData request with implicit resolution of destinations, or when using `useOrFetchDestination` or `getDestination` explicitly, service bindings represented as destinations now take precedence over querying the destination service. If you have a service binding with the same name as a destination configured in the SAP Cloud Platform cockpit, this will lead to different behavior in your application, because of the newly introduced support for service bindings. Therefore we recommend using unique names across destinations and service bindings.
- Deprecate the misnamed interface `HttpReponse`. Use [`HttpResponse`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.httpresponse.html) instead.

## newFunctionality

- Support accessing destinations provided as service bindings by SAP Cloud Platform Extension Factory.
  - Transparently support using URL and authentication of service bindings wherever a destination may be resolved, including executing OData requests by supplying a [`DestinationNameAndJwt`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.destinationnameandjwt.html) as well as in [`useOrFetchDestination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#useorfetchdestination) and [`getDestination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#getdestination).
  - Introduce a new function [`destinationForServiceBinding`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#destinationforservicebinding) that accepts the name of a service (as string) and tries to find a service binding with the given name and builds a [`Destination`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.destination.html) for that service.

## improvements

- Verify JWTs that are passed to the destination accessor when [fetching destinations from the destination service](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/modules/_sap_cloud_sdk_core.html#getdestinationfromdestinationservice) (explicitly or implicitly).
- _OData client_: [Create an OData delete request](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/classes/_sap_cloud_sdk_core.deleterequestbuilder.html) by passing the OData entity to delete instead of only the key values. Automatically attach the [version identifier](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html#versionidentifier) if present.

## fixedIssues

- Fix an issue where an error was thrown when trying to build the authorization header for destinations with authentication type _NoAuthentication_.
- Fix issues where the logic to select the correct XSUAA instance differed from the standard logic, as, for example, implemented in the SAP Cloud SDK for Java.
- Rename `HttpReponse` interface to [`HttpResponse`](https://help.sap.com/doc/4260e18b26494846ad050d296a889781/1.0/en-US/interfaces/_sap_cloud_sdk_core.httpresponse.html).
