---
id: release-notes-sap-cloud-sdk-for-java
title: Release notes - SDK for Java
sidebar_label: Release notes
description: Release notes of SAP Cloud SDK for Java, stay up to date with the recent features, fixes, dependency updates and recommendedations.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---
import MvnBadge from '../../src/sap/sdk-java/MvnBadge'

<MvnBadge />

:::info Migrate to SDK v3
Version 2.x of the SAP Cloud SDK for Java V2 has reached its end of life and is now longer maintained. To continue using the latest features outlined in the release notes for version 3 below, please [migrate to **SDK V3**](https://developers.sap.com/tutorials/s4sdk-migration-v3.html).
:::

## Should I update?
We highly recommend regularly updating to the latest SDK version. It will help you:

- ensure access to the latest Cloud SDK features
- keep up with the latest changes in SAP Cloud Platform
- update client libraries giving access to latest SAP services on SAP Cloud Platform and S4/HANA
- protect yourself from bugs and breaking changes in the future

## 3.24.0

Release date: July 16, 2020 - [Documentation](https://help.sap.com/doc/f1983b8177f447fdb4a414b0312b7c2f/1.0/en-US/index.html) - [Blog](https://blogs.sap.com/?p=1146336)

### Improvements

- Minor stability improvements
- Update [SAP Cloud Security Client](https://github.com/SAP/cloud-security-xsuaa-integration) from `2.7.2` to `2.7.3`

## 3.23.0

- Release date: July 2, 2020
- JavaDoc: https://help.sap.com/doc/e95b7f89bb45412b943760333df7a016/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1130744

### Compatibility Notes

- Method and parameter names for the SCP Workflow client library were adjusted

### Improvements

- Improved the error messages shown when JWT validation fails.
- Improved the [`AuthTokenBuilder`](https://help.sap.com/doc/e95b7f89bb45412b943760333df7a016/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/AuthTokenBuilder.html) so that public keys used for verification of authorization tokens created by it are now being cached.
- Client Library for SCP Workflow:
  - Method names improved to better reflect the Workflow domain
  - Methods return strong return types, the previous version had generic return types
  - Parameter names improved to better reflect their semantics
- Update dependencies:
  - Update `com.mikesamuel:json-sanitizer` from `1.2.0` to `1.2.1`
  - Update `org.json:json` from `20190722` to `20200518`
  - Update `commons-io:commons-io` from `2.6` to `2.7`
  - Update `org.springframework.security.oauth:spring-security-oauth2` from `2.4.1.RELEASE`  to `2.5.0.RELEASE`
  - Update `com.github.ben-manes.caffeine:caffeine` from `2.8.1` to `2.8.4`
  - Update `com.google.errorprone:error_prone_annotations` from `2.3.4` to `2.4.0`
  - Update `io.projectreactor:reactor-core` from `3.3.4.RELEASE` to `3.3.5.RELEASE`
  - Update Spring Boot from `2.2.7.RELEASE` to `2.3.0.RELEASE`
  - Update `com.squareup.okio:okio` from `2.4.3` to `2.6.0`
  - Update OK HTTP from `4.4.1` to `4.5.0`
  - Update [SAP Cloud Security Client](https://github.com/SAP/cloud-security-xsuaa-integration) from `2.6.2` to `2.7.2`

### Fixed Issues

- Fix a memory leak that occurs when repeatedly using the [`AuthTokenBuilder`](https://help.sap.com/doc/e95b7f89bb45412b943760333df7a016/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/AuthTokenBuilder.html).
- Fix an issue on SCP Neo with tenant-aware execution of a [`Callable`](https://docs.oracle.com/javase/8/docs/api/index.html?java/util/concurrent/Callable.html) when using [`TenantAccessor.executeWithTenant()`](https://help.sap.com/doc/e95b7f89bb45412b943760333df7a016/1.0/en-US/com/sap/cloud/sdk/cloudplatform/tenant/TenantAccessor.html#executeWithTenant-com.sap.cloud.sdk.cloudplatform.tenant.Tenant-java.util.concurrent.Callable-) in conjunction with a `DefaultTenant`

## 3.22.0

- Release date: June 18, 2020
- JavaDoc: https://help.sap.com/doc/09e785cb1f214f36be539d2059cc2cb1/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1126097

### Compatibility Notes

- Deprecated the constructor `SoapRequest(Class<ServiceT>, Destination)` in favor of `SoapRequest(Class<ServiceT>, HttpDestination)` because SOAP API invocation always uses the HTTP protocol.

### New Functionality

- A new, experimental API to run generic OData batch requests via `ODataRequestBatch` in version agnostic module `odata-client`.
It allows for batching entity read and modification requests. Modifications are grouped within changesets and, depending on the service implementation, they are expected to rollback if one change in the set was unsuccessful. Multiple changesets and read requests can be attached.
The class supports entity request handling for _create_, _read_, _update_ and _delete_, as well as service specific _functions_ and _actions_.
  * Notes
    * The API is not considered final yet. The class is `@Beta` annotated. Please refrain from using it in productive application code.
    * There are no helper methods on the result object yet to conveniently parse the multipart response. However the `HttpResponse` object can be accessed already.
    * The order of method invocations matters. It defines how the individual requests are serialized, when constructing the multipart batch request.
    * Sample code:
      ```
      HttpClient httpClient;
      ODataRequestRead read1;
      ODataRequestCreate create2;
      ODataRequestUpdate update3;

      ODataRequestBatch batchRequest =
        new ODataRequestBatch( "service-path/", ODataProtocol.V4 )
          .addRead( read1 )
          .beginChangeset()
          .addCreate( create2 )
          .addUpdate( update3 )
          .endChangeset();

      batchRequest.execute( httpClient );
      ```
- Add `getAllDestinations(DestinationOptions options)` in `ScpCfDestinationLoader` class to fetch all the cloud foundry destinations. The method prioritizes the destination at service instance level in case there exist a destination with the same name on service instance and on sub account level.

### Fixed Issues

- Fix an issue where subscriber tenant and principal information would not be available in asynchronous threads when running on SAP Cloud Platform Neo.


## 3.21.0

- Release date: June 4, 2020
- JavaDoc: https://help.sap.com/doc/b41a577bf05c42fdabcaab04e31b3e5c/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1115317

### New Functionality

- Enhance the interface `CloudPlatform` with the method `setEnvironmentVariableReader(Function<String, String>)` allowing adjusting the way how environment variables are read.
- Add experimental filter expressions in OData client value types of package `com.sap.cloud.sdk.datamodel.odata.client.expression` to allow for custom requests having entity-independent, yet type-safe query filters.

### Improvements

- Update dependencies:
    - Update Java JWT from `3.10.2` to `3.10.3`
    - Update Junit Pioneer from `0.5.6` to `0.6.0`
    - Update AssertJ from `3.15.0` to `3.16.1`
    - Update Spring from `5.2.5.RELEASE` to `5.2.6.RELEASE`
    - Update Spring Security from `5.3.1.RELEASE` to `5.3.2.RELEASE`
    - Update Hibernate Validator from `6.1.2.Final` to `6.1.5.Final`
    - Update Netty BOM from `4.1.49.Final` to `4.1.50.Final`
    - Update Stax2 api from `4.2`to `4.2.1`
    - Update Protocol Buffers Java from `3.11.4` to`3.12.1`
- Update dependencies in maven archetypes:
    - Archetype `scp-cf-spring`:
        - Update `spring-boot` from `2.2.6.RELEASE` to `2.3.0.RELEASE`
    - Archetype `scp-neo-javaee7`:
         - Update `scp.sdkVersion` from `1.72.13` to `1.74.10`

### Fixed Issues

- Fix an issue in the realm of HTTP destinations created through the SAP Cloud Platform Extension Factory where a `DestinationAccessException` occurs


## 3.20.0

- Release date: May 21, 2020
- JavaDoc: https://help.sap.com/doc/aca0accb170e43b280ee6443ab829d34/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1106204

### New Functionality

- New builder pattern for type `Resilience4jDecorationStrategy` to enable custom function decoration properties.
- A new, experimental interface `ServiceWithNavigableEntities` for OData v4 VDM, to allow for recursive traversal of navigation properties in entity sets. This generic type offers type-safe methods to create a request along chained entities with their navigation properties. By delegating to the existing request builder classes, the interface supports all basic CRUD operations, plus count. You can use all existing request modifiers, e.g. _filter_ or _select_ statements in _Read_. The interface type is `@Beta` annotated to declare methods and sub-types are still open for changes in the future.
  * Example
    * Create a new Trip in Vacation (id 2020) of Person (username "John")
    * HTTP request: `POST /ODataService/People('John')/Vacations(2020)/Trips`
    * Sample code:
      ```
      Trip tripItem;

      CreateRequestBuilder<Trip> createRequest = service
        .forEntity( Person.builder().username("John").build() )
        .navigateTo( Person.VACATIONS )
        .forEntity( Vacation.builder().id(2020).build() )
        .navigateTo( Vacation.TRIPS )
        .create( tripItem );

      createRequest.execute( destination );
      ```
- Add public methods `String getApplicationUrl()` and `String getApplicationProcessId()` to `ScpCfCloudPlatform` and expose them in `CloudPlatform` to partially match the existing public API of subtype `ScpNeoCloudPlatform`.

### Improvements

- Renamed module `odata-v4-client` to `odata-client` and packages contained from `c.s.c.s.datamodel.odatav4.client` to `c.s.c.s.datamodel.odata.client`. Only API that is declared unstable is affected so changes are only required if unstable parts of the API are being used explicitly.
- The OData generator (so the `odata-generator`, `odata-generator-cli`, and `odata-generator-maven-plugin` modules) are now able to also parse swagger files according to the OpenAPI v3 spec (in addition to the already supported OpenAPI v2 spec).


## 3.19.1

- Release date: May 7, 2020
- JavaDoc: https://help.sap.com/doc/8acea3c74bce484ea95dc9483aad4d81/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1095583

### Compatibility Notes

- As part of the update of the OData VDM to SAP S/4HANA Cloud 2005, in the `Inbound Delivery (A2X) - API_INBOUND_DELIVERY_SRV_0002` API, some previously published methods that were not actually supported by the S/4 system (like CRUD support for entity `MaintenanceItemObjList`) were removed from the SAP API Business Hub and as a consequence, from the SDK.

### New Functionality

- OData client: Update the OData VDM to the [newest release 2005 of SAP S/4HANA Cloud](https://news.sap.com/2020/04/sap-s4hana-cloud-release-2005/). The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/package/SAPS4HANACloud?section=Artifacts).
- Update the Message VDM to the newest release 2005 of SAP S/4HANA Cloud.


## 3.19.0

- Release date: April 30, 2020

### New Functionality

- Introducing the client library for the Workflow API on SAP Cloud Platform, Cloud Foundry
  - Example usage:
  ```
  final HttpDestination httpDestination = DestinationAccessor.getDestination(destinationName).asHttp();

  final List<WorkflowDefinition> workflowDefinitions =
                  new WorkflowDefinitionsApi(httpDestination).getWorkflowDefinitions();
  ```
  - Maven dependency:
  ```
  <dependency>
      <groupId>com.sap.cloud.sdk.services</groupId>
      <artifactId>scp-workflow-cf</artifactId>
  </dependency>
  ```
- New VDM request builder for OData v4 to fetch the count of entries in an entity collection endpoint. The result is a non-null Long, the number of matching entries according to optional filter and search expressions.
  - Example for the VDM usage:
    ```
    long numEntries = new DefaultEntityService()
      .countEntities()
      .filter(SomeEntity.FIELDNAME.contains("foo"))
      .search("bar")
      .execute(someDestination);
    ```
  - Example for the generic usage:
    ```
    long numEntries = new CountRequestBuilder<>("/odata/service/path/", SomeEntity.class)
      .filter(SomeEntity.FIELDNAME.contains("foo"))
      .search("bar")
      .execute(someDestination);
    ```
- Provide support for unbound actions in OData v4. The OData v4 generator generates unbound actions at the service level. Etag handling in actions is still not supported.
  - Note: Regenerate the VDM to enable these features on your classes.
- The VDM request builders for OData v4 to delete and update entities `DeleteRequestBuilder` and `UpdateRequestBuilder`
allow to influence the submission of the version identifier (ETag) of the respective entity in the remote system.
  - The method `disableVersionIdentifier` allows to avoid that the request header `If-Match` is sent at all.
  - The method `matchAnyVersionIdentifier` allows to control that the request header `If-Match` is sent with the value `*`.
  - Note that if both methods are invoked on the same request builder, the latest invocation takes precedence.
  - Example for the VDM usage to delete an entity without sending a version identifier:
  ```
  new DefaultEntityService()
  .deleteEntity(entity)
  .disableVersionIdentifier()
  .execute(destination);
  ```
  - Example for the VDM usage to update an entity while sending the `*` value in the request header:
    ```
    new DefaultEntityService()
    .updateEntity(entity)
    .matchAnyVersionIdentifier()
    .execute(destination);
    ```

### Improvements

- Update dependencies:
  - Update Guava from `28.2-jre` to `29.0-jre`
  - Update Apache CXF from `3.3.5` to `3.3.6`
  - [SAP Cloud Security Client](https://github.com/SAP/cloud-security-xsuaa-integration) from `2.6.1` to `2.6.2`
  - Update Jackson from `2.10.3` to `2.11.0`
  - Update Resilience4J from `1.3.1` to `1.4.0`
  - Update AssertJ Guava from `3.3.0` to `3.4.0`
  - Update Spring Security OAuth from `2.4.0.RELEASE` to `2.4.1.RELEASE`
  - Update Fabric SDK from `2.0.0` to `2.1.0`
  - Update Netty BOM from `4.1.48.Final` to `4.1.49.Final`
- Update Maven plugins in Maven archetypes:
  - Archetype `scp-cf-tomee`:
    - Update `tomee-maven-plugin` from `7.0.5` to `8.0.1`
  - Archetype `scp-cf-spring`:
      - Update `spring-boot-maven-plugin` from `2.2.5.RELEASE` to `2.2.6.RELEASE`
  - Archetype `scp-neo-javaee7`:
      - Update `jacoco-maven-plugin` from `0.8.2` to `0.8.5`
      - Update `maven-surefire-plugin` from `3.0.0-M3` to `3.0.0-M4`


## 3.18.0

- Release date: April 23, 2020
- JavaDoc: https://help.sap.com/doc/2e07eccb70364934adc2e01239828e6b/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1086336

### Compatibility Notes

- The custom pmd plugin (com.sap.cloud.sdk.quality:pmd-plugin) was removed. The ruleset (com.sap.cloud.sdk.quality:pmd-rules) from now on contains only the rules shipped with the SAP Cloud SDK. All other imported rules were removed.
To still use the ruleset with standard pmd plugin, especially in the SAP Cloud SDK for Continuous Delivery, we recommend adding the following configuration to the root pom of your project:
```
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-pmd-plugin</artifactId>
                <configuration>
                    <rulesets>
                        <ruleset>rulesets/cloud-sdk-qualities.xml</ruleset>
                        <ruleset>rulesets/java/maven-pmd-plugin-default.xml</ruleset>
                    </rulesets>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>com.sap.cloud.sdk.quality</groupId>
                        <artifactId>pmd-rules</artifactId>
                        <version>3.18.0</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </pluginManagement>
    ...
</build>
```

### Improvements

- Update Dependencies:
  - Spring Security from `5.3.0.RELEASE` to `5.3.1.RELEASE`
  - JUnit Pioneer from `0.5.5` to `0.5.6`
  - Java JWT from `3.10.1` to `3.10.2`
  - [SAP Cloud Security Client](https://github.com/SAP/cloud-security-xsuaa-integration) from `2.5.3` to `2.6.0`


## 3.17.2

- Release date: Apr 15, 2020

### Compatibility Notes

- The beta annotated `CustomOperationRequestBuilder` class has been renamed as `FunctionRequestBuilder`

### Fixed Issues

- Fix an issue with access token validation in a provider/subscriber setup, when having multiple XSUAA service bindings, e.g. one with service plan `broker` and one with service plan `application`.


## 3.17.1

- Release date: April 9, 2020
- JavaDoc: https://help.sap.com/doc/a3be0ed889004b9485c980357ab6ad52/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1075911

### Improvements

- The interface `ResilienceDecorationStrategy` now provides an additional, optional argument to pass a custom `ExecutorService` in methods `decorateCallable` and `decorateSupplier`. This way the thread pool and task execution can be adjusted upon decoration. If the time limiter is enabled, it will be running in a thread through the passed executor. If `Callable` or `Supplier` lambda is queued, then the asynchronous task will be run with the given `ExecutorService` as well.

- For communication with XSUAA, the recommended [JWT Bearer Token Grant](https://docs.cloudfoundry.org/api/uaa/version/74.16.0/index.html#saml2-bearer-grant) is now preferred over (discouraged) combination of [User Token Grant](https://docs.cloudfoundry.org/api/uaa/version/74.16.0/index.html#user-token-grant) and [Refresh Token](https://docs.cloudfoundry.org/api/uaa/version/74.16.0/index.html#refresh-token). This saves one internal HTTP request and the "uaa.user" scope is not necessary any longer in the `xs-security.json` configuration of the XSUAA service instance.

### Fixed Issues

- Fix unnecessary second request to destination service, when using proxy type "OnPremise" and authentication type "Principal Propagation".

- Fix a regression introduced in `3.16.1` where public keys for token validation are not cached.


## 3.17.0

- Release date: April 2, 2020

### New Functionality

- New support for [OData V4 - Deep Update](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_UpdateRelatedEntitiesWhenUpdatinganE).
  - Single and collection-based entity navigation properties can be used when updating a base entity. This way nested entities can be updated and created, while performing a single OData request.
  - **Note:** This feature can only be used with `UpdateRequestBuilder#modifyingEntity()` (default), and not with `UpdateRequestBuilder#replacingEntity()` (custom).
  - **Note:** Removing an existing element from a collection-based entity navigation property is not yet supported.

### Improvements

- The OData v4 VDM now allows for ordering by multiple fields through calling `orderBy` and passing fields to it with the corresponding order.
  ```java
    getPersons().orderBy(Person.FIRST_NAME.asc(), Person.LAST_NAME.desc());
  ```

- Update Dependencies
  - Update Java JWT from `3.10.0` to `3.10.1`
  - Update Mockito from `3.3.0` to `3.3.1`
  - Update Wiremock from `2.26.2` to `2.26.3`
  - Update Spring Security from `5.2.2.RELEASE` to `5.3.0.RELEASE`
  - Update Netty BOM from `4.1.47.Final` to `4.1.48.Final`
  - Update Apache TomEE libraries from version `7.0.6` to `7.0.7`
  - Update [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version `1.38.0` to `1.39.0`
  - Update [SAP Cloud Security Client](https://github.com/SAP/cloud-security-xsuaa-integration) from `2.5.1` to `2.5.3`
  - Update Apache Commons Lang from version `3.9` to `3.10`
  - Update JUnit from version `5.6.0` to `5.6.1`
  - Update JUnit Pioneer from version `0.5.4` to `0.5.5`
  - Update Spring from version ``5.2.4.RELEASE`` to `5.2.5.RELEASE`

- Dependencies and Maven plugin versions in the archetypes `scp-cf-spring`, `scp-cf-tomee` and `scp-neo-javaee7` updated.
  - `jacoco-maven-plugin` updated to `0.8.5`
  - `maven-surefire-plugin` updated to `3.0.0-M4`
  - `maven-enforcer-plugin` updated to `3.0.0-M3`
  - `maven-war-plugin` updated to `3.2.3`
  - `maven-dependency-plugin` updated to `3.1.2`
  - Spring Boot updated from `2.2.1.RELEASE` to `2.2.5.RELEASE`

### Fixed Issues

- Fix a bug in the `odata-v4-generator` that causes fields of type `Edm.TimeOfDay` to not be recognized and thus generated properly, leading to missing `SimpleProperty` fields on the generated entity.


## 3.16.1

- Release date: March 26, 2019
- JavaDoc: https://help.sap.com/doc/059aaed870b44d8e8e24938c505b8120/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1068438

### Compatibility Notes

- As the Olingo dependency was removed from the Virtual Data Model (VDM), Olingo types are now set as custom fields and can be accessed by method [`getCustomField("fieldName")`](https://help.sap.com/doc/059aaed870b44d8e8e24938c505b8120/1.0/en-US/com/sap/cloud/sdk/datamodel/odata/helper/VdmObject.html#getCustomField-java.lang.String-).

### New Functionality

- Introduce the module _SCP Blockchain Client Fabric_ for easy interaction with a Hyperledger Fabric network using all necessary configuration and credentials from a standardized user-provided service in the Cloud Foundry environment.
- JSON Web Tokens (JWT) are now validated using their `issuer` and `jku` properties. Public keys for signature verification are fetched from the URL specified by the `jku` property. This only works if the `issuer` domain matches the domain of the XSUAA service. In case this fails or if the properties are not set, the implementation falls back to the previous validation mechanisms (e.g. verification key of XSUAA service binding, XSUAA token endpoint provider).

### Improvements

- Update Dependencies
  - Update Slf4J from version `1.7.26` to `1.7.30`
  - Update Jackson from version `2.10.2` to `2.10.3`
  - Update Wiremock from version `2.26.1` to `2.26.2`
  - Update Jetty from version `9.4.26.v20200117` to `9.4.27.v20200227`
  - Update Spring from version `5.2.3.RELEASE` to `5.2.4.RELEASE`
  - Update Apache HttpComponents from version `4.5.11` to `4.5.12`

### Fixed Issues

- Fix missing authorization header with Principal Propagation for OnPremise connectivitiy on CloudFoundry.
- Fix several special characters escaping and encoding issues.
  - `?` in the service path
  - `#` and `&` in filter and select expressions
  - `'` in string literals and in string parameters being passed in functions and `GetByKey` requests
  - `"` and `\` in search expressions


## 3.15.1

- Release date: March 12, 2020
- JavaDoc: https://help.sap.com/doc/19838225037e4e52ba36d2bb95176126/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1060707

### Compatibility Notes

- Use the library [XSUAA Token Client and Token Flow API](https://github.com/SAP/cloud-security-xsuaa-integration/tree/master/token-client) for handling communication with [XSUAA](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/ea0281368f11472b8d2b145a2a28666c.html) service instances.
  - If you mock XSUAA service requests in your tests, some assertions might need to be updated. When using the new library, XSUAA request parameters should be passed as _HTTP body content_ instead of query arguments.
  - The internally used types `SubdomainReplacer` and `DefaultSubdomainReplacer` became obsolete and were removed. The usage of this classes was replaced by the new library.
  - The behavior of following methods in the utility class `XsuaaService` has been changed.
    - `retrieveAccessTokenViaUserTokenGrant()`
    - `retrieveAccessTokenHeaderViaUserTokenGrant()`
  The old behavior is implemented in following methods.
    - `retrieveAccessTokenViaUserTokenExchange()`
    - `retrieveAccessTokenHeaderViaUserTokenExchange()`
  The change was made in order to better reflect on the internal logic of these methods. In addition to "Token Grant", the "Token Exchange" flavored operation will perform an authorization request with "Refresh Token" flow, which is required for [Principal Propagation](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/67b0b94f09f2446598787eea0855e56b.html) when manually consuming the CloudFoundry _Connectivity Service_. Please update your code accordingly.

- The module `com.sap.cloud.sdk.services:blockchain` has been renamed to `com.sap.cloud.sdk.services:blockchain-client-multichain` to better reflect its focus on the Multichain Service.

### New Functionality

- Stabilize OData v4 Virtual Data Model (VDM). Following parts are considered stable as of this release:
  - `execute()` on all request builders (e.g., `CreateRequestBuilder)
  - `select()`, `filter()`, `top()`, `skip()`, and `search()` on `GetAllRequestBuilder`
  - `GetByKeyRequestBuilder.select()`
  - `of()`, `and()`, `or()`, `not()` for defining a `SearchExpression`
  - `includingFields()`, `replacingEntity()`, `modifyingEntity()` on `UpdateRequestBuilder`
  - The generic exception class `ODataException`
  - The classes `NavigationProperty`, `ComplexProperty` and `SimpleProperty`
  - The OData v4 generator now generates `ComplexProperty` fields on entities that can be used to build queries. Single instances and collections of complex types are supported.
- Provide support for unbound functions in OData v4. The Odata v4 generator generates unbound functions at the service level.
- The OData v4 generator now creates entity classes that are only referenced by navigation properties and functions (not part of an entity set).

### Improvements

- Introduce snakeyaml version `1.26` as direct dependency and exclude the one used by the jackson library to overcome the security vulnerability [CVE-2017-18640](https://bitbucket.org/asomov/snakeyaml/issues/377/allow-configuration-for-preventing-billion).
- Replace the SAP Cloud SDK implementation for handling authentication and authorization within the SAP Cloud Platform landscape by the library [XSUAA Token Client and Token Flow API](https://github.com/SAP/cloud-security-xsuaa-integration/tree/master/token-client) version `2.5.1`. See the compatibility notes for details.
- Update Dependencies
  - [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version `1.37.1` to `1.38.0`
  - Lombok from version `1.18.10` to `1.18.12`
  - Caffeine from version `2.8.0` to `2.8.1`
  - Commons CSV from version `1.7` to `1.8`
  - Apache HTTP Components CSV from version `4.5.10` to `4.5.11`
  - EclipseLink CSV from version `2.7.5` to `2.7.6`
  - Liquibase CSV from version `3.6.3` to `3.8.6`
  - Resilience4J CSV from version `1.2.0` to `1.3.1`
  - JUnit CSV from version `5.5.2` to `5.6.0`
  - JUnit Pioneer from version `0.5.1` to `0.5.4`
  - Jetty from version `9.4.25.v20191220` to `9.4.26.v20200117`
  - Spring Security from version `5.2.1.RELEASE` to `5.2.2.RELEASE`
  - Hibernate Validator from version `6.0.17.Final` to `6.1.2.Final`
  - Java JWT from version `3.9.0` to `3.10.0`
  - AssertJ from version `3.14.0` to `3.15.0`
  - Mockito from version `3.2.4` to `3.3.0`
  - Wiremock from version `2.20.0` to `2.26.1`
  - SAP Cloud Platform SDK For Neo Environment (Java EE 7 Web Profile TomEE 7) to version `1.69.18`

### Fixed Issues

- Fix an issue where the OData v2 URL query generation was not escaping single-quotes `'` in String literals correctly. This character can now be used as part of entity keys and filter expressions.
- Fix an issue with `Decimal` OData values being formatted in unexpected scientific notation (e.g. `4.2e-7`) instead of expected decimal form (e.g. `0.00000042`). The solution is provided for serializing entity properties of Java type `BigDecimal`.


## 3.14.0

- Release date: February 27, 2020
- JavaDoc: https://help.sap.com/doc/65849d56440245959d8929e0db23d3c4/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1053508

### Compatibility Notes

- Remove the public enum `com.sap.cloud.sdk.cloudplatform.connectivity.DestinationRetrievalStrategy` as it had no usage in the realm of the SAP Cloud SDK version 3.

### New Functionality

- _OData VDM client_: Add preview support for OData v4 services.
   - The new OData client implementation is capable of the basic Create, Read, Update, Delete (CRUD) operations on OData v4 services.
   - Include an updated, dedicated generator that is capable of creating virtual data models through a command line interface or Maven plugin. Reference the artifact id `odata-v4-generator` in your `.pom` file.
   - Advanced features like functions, actions or batch requests are not yet supported.
   - The implementation is initially in beta and thus does not guarantee a stable API.

### Improvements

- Update [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version `1.36.2` to `1.37.1`


## 3.13.0

- Release date: February 13, 2020
- JavaDoc: https://help.sap.com/doc/e03ee6cbe2ea468f88e1970b61d55b62/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1047125

### Compatibility Notes

- Updating [`WorkItems`](https://help.sap.com/doc/e03ee6cbe2ea468f88e1970b61d55b62/1.0/en-US/com/sap/cloud/sdk/s4hana/datamodel/odata/namespaces/commercialproject/WorkItem.html) in the service [Commercial Project - Read](https://api.sap.com/api/_CPD_SC_EXTERNAL_SERVICES_SRV/resource) is no longer allowed as of SAP S/4HANA Cloud release 2002. The method `updateWorkItem()` was removed from [`CommercialProjectService`](https://help.sap.com/doc/e03ee6cbe2ea468f88e1970b61d55b62/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/datamodel/odata/services/CommercialProjectService.html).

### New Functionality

- _OData client_: Update the OData VDM to the [newest release 2002 of SAP S/4HANA Cloud](https://news.sap.com/2020/01/sap-s4hana-cloud-2002-release/). This includes completely new services (available as usual in package [com.sap.cloud.sdk.s4hana.datamodel.odata.services](https://help.sap.com/doc/e03ee6cbe2ea468f88e1970b61d55b62/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/datamodel/odata/services/package-summary.html)), new operations in previously existing services, and new entity types. The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

### Improvements

- Update the Spring dependency for the SAP Cloud Platform multitenancy implementation module to version `4.3.26.RELEASE` to overcome the security vulnerability [CVE-2020-5397](https://bugs.chromium.org/p/chromium/issues/detail?id=775438).


## 3.12.0

- Release date: January 30, 2020
- JavaDoc: https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1039650

### New Functionality

- _SCP Blockchain Module_: Allow the usage of custom HTTP clients by adding support for a custom HTTP request factory for the rest template in [`MultichainRequest`](https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainRequest.html).
- When creating a [`MultichainService`](https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainService.html) instance using a SAP Cloud Platform destination, the destination's HTTP client will now be used as a pre-configured `HttpClient` instance with authentication, HTTP connection pooling, etc. for each [`MultichainRequest`](https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainRequest.html).

### Improvements

- Update dependencies:
  - Jackson from version `2.10.1` to `2.10.2`
  - Commons Codec from version `1.13` to `1.14`
  - Apache HttpComponents Core from version `4.4.12` to `4.4.13`.
  - Apache CXF from version `3.3.4` to `3.3.5`
  - JUnit Pioneer from version `0.4.2` to `0.5.1`
  - Spring from version `5.2.2.RELEASE` to `5.2.3.RELEASE`

### Fixed Issues

- _OData Generator_: Fix an issue where if only some of the declared EntitySets contained related service operations annotations in the `.edmx` file, the ones without such annotations got no operations resolved at all.
- Fix an issue with [`BapiRequest`](https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/connectivity/rfc/BapiRequest.html) where a `NoSuchElementException` was thrown in case a [`Destination`](https://help.sap.com/doc/3ef4616701f642658f0a7be6b2aaf587/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/Destination.html) without a name was used.
- Fix an issue concerning the encoding of special characters such as `#`, `&`, etc. in OData filter expressions.


## 3.11.0

- Release date: January 16, 2020
- JavaDoc: https://help.sap.com/http.svc/rc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1031865

### Compatibility Notes

- The existence of a principal as retrieved by the [`PrincipalAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/principal/PrincipalAccessor.html) is no longer an indicator for a JWT to be present. Due to the introduction of [`BasicAuthenticationAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/BasicAuthenticationAccessor.html) a principal can also originate from the Basic Authentication header on the current request. As before verifying authentication and authorizations needs to be done explicitly by the application using the SAP Cloud SDK.

- The behavior for principal propagation when accessing on-premise systems has changed as explained below in the Improvements section.

### New Functionality

- Introduce a new [`BasicAuthenticationAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/BasicAuthenticationAccessor.html) to read the username and password from the Basic Authentication header of the currently incoming request on Cloud Foundry.

  - Use it like the other `*Accessor` classes:
    ```
    Try<BasicCredentials> basicCredentials = BasicAuthenticationAccessor.tryGetCurrentBasicCredentials();
    ```
  - To handle the `Try` gracefully you can write something like the following:
    ```
    BasicCredentials basicCredentials  = BasicAuthenticationAccessor.tryGetCurrentBasicCredentials().getOrElseGet(this::useFallbackCredentials);
    ```
  - To provide custom logic into the accessor the default logic can be overwritten by using the [`setBasicAuthenticationFacade()`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/BasicAuthenticationAccessor.html#setBasicAuthenticationFacade-com.sap.cloud.sdk.cloudplatform.security.BasicAuthenticationFacade-) method:
    ```
    BasicAuthenticationAccessor.setBasicAuthenticationFacade(new CustomBasicAuthenticationFacade());
    ```
- Enable the [`PrincipalAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/principal/PrincipalAccessor.html) to also read the current principal from the newly introduced [`BasicAuthenticationAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/BasicAuthenticationAccessor.html), in addition to the already existing way to read it from the current JWT. This functionality applies to Cloud Foundry. A valid JWT takes precedence over a Basic Authentication header.

  The order of resolution is
    1. If a principal is given in the current context (e.g. via [`PrincipalAccessor.executeWithPrincipal()`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/principal/PrincipalAccessor.html#executeWithPrincipal-com.sap.cloud.sdk.cloudplatform.security.principal.Principal-java.util.concurrent.Callable-)), this will we be used.
    2. Otherwise, if a JWT is given in the current context (e.g. via an incoming request or manually set via the [`AuthTokenAccessor.executeWithAuthToken()`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/AuthTokenAccessor.html#executeWithAuthToken-com.sap.cloud.sdk.cloudplatform.security.AuthToken-java.util.concurrent.Callable-) methods) the principal is read from there.
    3. Otherwise, If there is no JWT or the resolution fails the user retrieved via the [`BasicAuthenticationAccessor`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/BasicAuthenticationAccessor.html) used (if existent).
    4. If no principal could be found with the steps above the `Try` returned by [`PrincipalAccessor.tryGetCurrentPrincipal()`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/principal/PrincipalAccessor.html#tryGetCurrentPrincipal--) will contain an Exception.

- Support self-signed certificates (file extensions `.cer`, `.crt`, and `.der`) as trust store locations for HTTPS destinations.

### Improvements

- The connectivity to on-premise systems from SCP Cloud Foundry is updated, so that the [authentication](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39f538ad62e144c58c056ebc34bb6890.html) now follows the [recommended](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39f538ad62e144c58c056ebc34bb6890.html) protocol for principal propagation.
  - Instead of populating two headers `SAP-Connectivity-Authentication` and `Proxy-Authorization` for on-premise requests, the SAP Cloud SDK now takes the recommended approach of just using `Proxy-Authorization` with a dynamicly resolved _User Exchange Access Token_.
  - Introduce `PrincipalPropagationStrategy` for configuring that the previous behavior should be used.

  If for compatibility reasons the previous approach should be used, you can adjust strategy with the following code snippet:
  ```java
  import com.sap.cloud.sdk.cloudplatform.connectivity.PrincipalPropagationStrategy;

  PrincipalPropagationStrategy.setDefaultStrategy(PrincipalPropagationStrategy.COMPATIBILITY);
  ```

- Support reading the principal from an OAuth SAML Bearer token on Cloud Foundry.

- Update dependencies:
  - Apache TomEE libraries from version `7.0.5` to `7.0.6`
  - [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version `1.36.1` to `1.36.2`
  - AssertJ Vavr from version `0.1.0` to `0.2.0`
  - Mockito from version `3.2.0` to `3.2.4`
  - Spring from version `5.2.1.RELEASE` to `5.2.2.RELEASE`
  - Guava from version `28.1-jre` to `28.2-jre`
  - Java JWT from version `3.8.3` to `3.9.0`
  - JUnit from version `4.12` to `4.13`
  - Jetty from version `9.4.19.v20190610` to `9.4.25.v20191220`
  - [SAP Cloud Platform Neo Environment SDK for Java EE 7 Web Profile TomEE 7](https://tools.hana.ondemand.com/#cloud) from version `1.44.12` to `1.65.15`

### Fixed Issues

- Fix an issue with the cache of [`ResilienceDecorator`](https://help.sap.com/doc/4cc23f4c3bf147fe834fbd0e3413e5d5/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html) invalidating itself upon calling, when using a JCache SPI different from JCache RI.
- _OData VDM client_: Fix an issue concerning update requests with `PATCH` semantics where `null` values were being filtered out before the update. Explicitly set `null` values are being retained now.
- Fix an issue with the deserialization of function import responses returning objects creatable by a single `String` parameter as reported [here](https://stackoverflow.com/questions/59402150).
- Fix a regression in the OData VDM Generator where anotations within EDMX metadata files were interpreted in an unexpected way leading to missing operations in the generated classes as reported [here](https://stackoverflow.com/questions/59267237).


## 3.10.0

- Release date: December 19, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=1019658

### Compatibility Notes

- The method `uri()` in builders of [`ScpCfHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/ScpCfHttpDestination.html), [`DefaultHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/DefaultHttpDestination.html) and [`DefaultErpHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/connectivity/DefaultErpHttpDestination.html) has been deprecated, as this parameter is already passed to create the builder instance.
- The method `network()` in builders of [`DefaultHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/DefaultHttpDestination.html) and [`DefaultErpHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/connectivity/DefaultErpHttpDestination.html) has been deprecated in favour of using `proxyType` instead.
- The method `keyStorePassword()` in builders of [`DefaultHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/DefaultHttpDestination.html) and [`DefaultErpHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/connectivity/DefaultErpHttpDestination.html) has been deprecated.

### Improvements

- Update dependencies:
  - [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version 1.35.2 to 1.36.1
  - Spring from version 5.1.2-RELEASE to 5.2.1-RELEASE
  - Spring Security OAuth from version 2.3.6-RELEASE to 2.4.0-RELEASE
  - Eclipse Link from version 2.7.4 to 2.7.5
  - Resilience4J from version 1.1.0 to 1.2.0
  - JUnit Pioneer from version 0.3.3 to 0.4.2
  - Mockito from version 2.22.0 to 3.2.0
  - Spring Boot from version 2.1.1-RELEASE to 2.2.1-RELEASE
- Introduce more consistency in builders for destinations.
    - Add builder methods in [`ScpCfHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/ScpCfHttpDestination.Builder.html) for the properties `header`, `user`, `password`.
    - Add builder methods in [`ScpNeoHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/ScpNeoHttpDestination.Builder.html) for the properties `user`, `password`, `trustAllCertificates`, `header`, `authenticationHeaders`, `basicCredentials`, `authenticationType`, `proxyType`, `proxyConfiguration`.
    - Add builder methods in [`DefaultHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/DefaultHttpDestination.Builder.html) and [`DefaultErpHttpDestination`](https://help.sap.com/doc/0786ec6134c04c9bbafec959b6b737de/1.0/en-US/index.html?com/sap/cloud/sdk/s4hana/connectivity/DefaultErpHttpDestination.Builder.html) for the properties `basicCredentials`, `proxyType`.

### Fixed Issues

- Fix an issue concerning HTTP destinations on Cloud Foundry where the default JDK trust store was mistakenly taken into account even if an own trust store is defined.
- Fix OData query formatting for filter expressions with temporal values. This affects queries comparing entity properties based on `Edm.Time`, `Edm.DateTime` or `Edm.DateTimeOffset`.


## 3.9.0

- Release date: December 5, 2019
- JavaDoc: https://help.sap.com/doc/0fb0e3755a6346ecbe5d8f62d34121f0/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=906845

### Compatibility Notes

- _[`scp-blockchain`](https://search.maven.org/artifact/com.sap.cloud.sdk.services/scp-blockchain) module_: The return type of [`MultichainService.getDestination()`](https://help.sap.com/doc/0fb0e3755a6346ecbe5d8f62d34121f0/1.0/en-US/com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainService.html#getDestination--) changes to [`MultichainBasicAuthDestination`](https://help.sap.com/doc/0fb0e3755a6346ecbe5d8f62d34121f0/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/model/MultichainBasicAuthDestination.html) to support Basic Authentication. If you use this method please adapt to the new return type.

### Improvements

- _SCP blockchain_: Add support for Basic Authentication to [`MultichainRequest`](https://help.sap.com/doc/0fb0e3755a6346ecbe5d8f62d34121f0/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainRequest.html), allowing the request to be used with AWS and Azure Multichain nodes.
- _Resilience framework_: Use new name format for threads spawned by asynchronous calls: `cloudsdk-resilience-<number>`
- Add new method [`DestinationProperties.getPropertyNames()`](https://help.sap.com/doc/0fb0e3755a6346ecbe5d8f62d34121f0/1.0/en-US/com/sap/cloud/sdk/cloudplatform/connectivity/DestinationProperties.html#getPropertyNames--) to retrieve the set of properties of a destination. This allows you to enumerate the names of all properties retrieved from the destination service and their values.
- Update dependencies:
  - Jackson from version 2.10.0 to 2.10.1, fixing the vulnerabilities [CVE-2019-17267](https://nvd.nist.gov/vuln/detail/CVE-2019-17267) and [CVE-2019-17531](https://nvd.nist.gov/vuln/detail/CVE-2019-17531)
  - [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) from version 1.33.0 to 1.35.2
  - Joda Time from version 2.10.4 to 2.10.5
  - Vavr from version 0.9.3 to 0.10.2
  - Commons CSV from version 1.6 to 1.7
  - Java JSON from version 20180813 to 20190722
  - Apache CXF from version 3.3.2 to 3.3.4
  - AssertJ Core from version 3.13.2 to 3.14.0
  - AssertJ Guava from version 3.2.1 to 3.3.0
  - JUnit Pioneer from version 0.3.0 to 0.3.3

### Fixed Issues

- Fix an issue that caused the OData VDM generator to wrongly identify available operations on a service entity.
- Fix an issue where special characters (e.g. `/`) were incorrectly escaped in OData requests made when dynamically fetching a navigation property of an entity whose key contains such characters.


## 3.8.0

- Release date: November 21, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/76f123ce6fae40df911590552579e523/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/?p=899516

### Compatibility Notes

- Create, update, and delete operations have been removed from some VDM services, as they are no longer available on the SAP API Business Hub.
- The custom constructor parameters of [`Resilience4jDecorationStrategy`](https://help.sap.com/doc/76f123ce6fae40df911590552579e523/1.0/en-US/com/sap/cloud/sdk/frameworks/resilience4j/Resilience4jDecorationStrategy.html) have been changed to accept generic modular decorators for the following properties. The default behavior has not been changed. This should not affect existing code, but you may need to recompile your code.
  - time limiter
  - bulkhead
  - circuit breaker
  - retry
  - caching

### New Functionality

- _OData client_: Update the OData VDM to the [newest release 1911 of SAP S/4HANA Cloud](https://news.sap.com/2019/11/sap-s4hana-cloud-1911-intelligent-enterprise-experience-economy/). The SDK supports all OData services listed in the [SAP API Business Hub for SAP S/4HANA Cloud](https://api.sap.com/shell/discover/contentpackage/SAPS4HANACloud).

### Fixed Issues

- Fix an issue that caused unnecessary requests to the XSUAA service when accessing auth tokens in requests.


## 3.7.0

- Release date: November 7, 2019
- JavaDoc: https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/11/07/new-versions-of-sap-cloud-sdk-3.7.0-and-for-java-1.12.0-for-javascript/

### Known Issues

- SDK version 3.7.0 references Jackson 2.10.0 which has two known security vulnerabilities, which were not yet fixed in time for version 3.7.0 of the SDK. Note that the SDK does not use the vulnerable functionality and is thus not vulnerable itself. If you use Jackson yourself, you should consider the relevant recommendations [CVE-2019-17267](https://nvd.nist.gov/vuln/detail/CVE-2019-17267) and [CVE-2019-17531](https://nvd.nist.gov/vuln/detail/CVE-2019-17531). For more details, also consider [this article with more background](https://medium.com/@cowtowncoder/on-jackson-cves-dont-panic-here-is-what-you-need-to-know-54cd0d6e8062).

### Compatibility Notes

- The resilience configuration API has been adjusted as follows:
  - The parameter-less static factory method `RetryConfiguration.ofDefaults()` has been deprecated in favor of [`RetryConfiguration.of(maxAttempts)`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.RetryConfiguration.html#of-int-) to avoid unexpected, implicit behavior.
  - The deprecated methods `executeFutureSupplier` and `decorateFutureSupplier` have been removed from [`ResilienceDecorationStrategy`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorationStrategy.html) and [`ResilienceDecorator`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html).
- The default buffer sizes for circuit breakers in [`CircuitBreakerConfiguration`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CircuitBreakerConfiguration.html) have been changed as follows:
  - From 100 to 10 for transitioning from _CLOSED_ to _OPEN_ state.
  - From 10 to 5 for transitioning from _HALF-OPEN_ back to _CLOSED_ state.

### New Functionality

- Allow clearing the cache for future requests when using a [`ResilienceConfiguration`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html) with a [`CacheConfiguration`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.html) in place. Use [`ResilienceDecorator.invalidateCache(configuration)`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html#invalidateCache-com.sap.cloud.sdk.cloudplatform.resilience.ResilienceConfiguration-) to clear the cache associated with a specific configuration.
- _OData VDM generator_: allow to specify the copyright header for generated files by supplying the parameter `--copyright-header your-custom-header`. By default, no header is generated.

### Improvements

- Allow to explicitly specify buffer sizes for the [circuit breaker](https://resilience4j.readme.io/v0.17.0/docs/circuitbreaker) in `CircuitBreakerConfiguration`. Use [`CircuitBreakerConfiguration.closedBufferSize`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CircuitBreakerConfiguration.html#closedBufferSize-int-) and [`CircuitBreakerConfiguration.halfOpenBufferSize`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CircuitBreakerConfiguration.html#halfOpenBufferSize-int-) to provide custom values for the respective buffer size.
- Allow to specify the cache expiration strategy for a [`CacheConfiguration`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.html) in [`ResilienceConfiguration`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html). Use [`withExpirationStrategy(strategy)`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.CacheConfigurationBuilder.html#withExpirationStrategy-com.sap.cloud.sdk.cloudplatform.resilience.CacheExpirationStrategy-) on the [builder for a CacheConfiguration](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.CacheConfigurationBuilder.html) with the enum constants available from [`CacheExpirationStrategy`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/CacheExpirationStrategy.html). [`WHEN_LAST_MODIFIED`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/CacheExpirationStrategy.html#WHEN_LAST_MODIFIED) remains the default value for the expiration strategy.
- Allow to initialize a resilience configuration with disabled individual properties by providing methods for instantiating a invidual configuration as disabled. Introduce the following factory methods in addition to the previously existing ones that instantiate an enabled configuration:
  - [`CircuitBreakerConfiguration.disabled()`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CircuitBreakerConfiguration.html#disabled--)
  - [`TimeLimiterConfiguration.disabled()`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.TimeLimiterConfiguration.html#disabled--)
  - [`BulkheadConfiguration.disabled()`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.BulkheadConfiguration.html#disabled--)
  - [`RetryConfiguration.disabled()`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.RetryConfiguration.html#disabled--)
  - [`CacheConfiguration.disabled()`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.CacheConfiguration.html#disabled--)
- Provide method [`ResilienceConfiguration.empty`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html#empty-java.lang.Class-) to initialize a new resilience configuration with all properties being disabled by default.
- Provide method [`TimeLimiterConfiguration.of(duration)`](https://help.sap.com/doc/e1e40a06a99c4b858481f11dcf336749/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.TimeLimiterConfiguration.html#of-java.time.Duration-) as a convenience instead of `TimeLimiterConfiguration.of().timeoutDuration(duration)`.


## 3.6.0

- Release date: October 24, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/928ed32b5bb9437db72a90ee0c096f41/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/10/24/new-versions-of-sap-cloud-sdk-3.6.0-for-java-and-1.11.3-for-javascript/

### Known Issues

- SDK version 3.6.0 references Jackson 2.10.0 which has two known security vulnerabilities, which were not yet fixed in time for version 3.6.0 of the SDK. For your reference, this concerned the following recommendations:
  - [CVE-2019-17267](https://nvd.nist.gov/vuln/detail/CVE-2019-17267)
  - [CVE-2019-17531](https://nvd.nist.gov/vuln/detail/CVE-2019-17531)

### Compatibility Notes

- The overridable method `getJsonResponseObjectName()` of base class [`FluentHelperFunction`](https://help.sap.com/doc/928ed32b5bb9437db72a90ee0c096f41/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odata/helper/FluentHelperFunction.html) has been deprecated in favor of its successor [`refineJsonResponse`](https://help.sap.com/doc/928ed32b5bb9437db72a90ee0c096f41/1.0/en-US/com/sap/cloud/sdk/datamodel/odata/helper/FluentHelperFunction.html#refineJsonResponse-com.google.gson.JsonElement-). Both reside in `protected` scope and are therefore only used to customize the default behavior. The new method allows limitless modification of the response JSON element during the refinement step of the deserialization process for function import responses.

### New Functionality

- Offer retries as part of [`ResilienceConfiguration`](https://help.sap.com/doc/928ed32b5bb9437db72a90ee0c096f41/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.html) via a [`RetryConfiguration`](https://help.sap.com/doc/928ed32b5bb9437db72a90ee0c096f41/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceConfiguration.RetryConfiguration.html).
  - Retries allow for re-attempting a request in case it fails a limited number of times.
  - The feature offers to specify the maximum amount of attempts, a wait duration between attempts and a predicate that determines, whether or not a failure should be retried.

### Improvements

- _OData VDM generator_: Mark generated sources for compilation when using `odata-generator-maven-plugin`. For this feature just add the property `<compileScope>...</compileScope>` with the compilation phase to your configuration. Valid values are `COMPILE`, `TEST_COMPILE`, and `NONE`, representing the different compile phases or no automatic compilation at all. The default value (for backwards compatibility reasons) is `NONE`.
- Update dependencies:
  - Jackson from version 2.9.10 to 2.10.0.
  - Lombok from version 1.18.8 to 1.18.10.
  - Guava from version 28.0-jre to 28.1-jre.
  - GSON from version 2.8.5 to 2.8.6.
  - Java JWT from version 3.8.1 to 3.8.3.
  - Commons-Text from version 1.7 to 1.8.
  - Http Core from version 4.4.11 to 4.4.12.
  - Http Components Client from version 4.5.9 to 4.5.10.
  - Resilience4J from version 0.17.0 to 1.1.0.

### Fixed Issues

- _OData VDM_: Fix an issue where the response of function imports was not correctly handled. The response is now parsed according to OData specification. The deviating behavior of OData services in some SAP solution is still supported as in previous versions, via a (modifiable) refinement step.
- _OData VDM generator_: Parse allowed requests in a more careful manner when handling an EDMX file. The generator will no longer throw an exception for missing XML attributes.
- Fix an issue regarding timeouts in the execution of resilient requests. The issue prevented threads from being terminated when a timeout occurs.


## 3.5.0

- Release date: October 10, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/2656a317c96d481b9216b8882f1eadad/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/08/10/new-versions-of-sap-cloud-sdk-3.5.0-for-java-1.11.2-for-javascript-and-v25-of-continuous-delivery-toolkit/

### Compatibility Notes

- Previous versions of the SDK only recognized an access token in the authorization header if "`Bearer`" was spelled in title case. Now, corresponding methods do a case insensitive check for "`bearer`". That means, "bearer" and "Bearer" are now equally supported as correct authorization header.
- _OData VDM generator_: The generator now identifies which CRUD operations an entity set supports by first consulting the [annotations based on the OData specification](https://oasis-tcs.github.io/odata-vocabularies/vocabularies/Org.OData.Capabilities.V1.html). Only when these annotations are not declared, the custom SAP specifications are considered.

### Improvements

- No longer require a binding to an XSUAA service instance when consuming the destination or connectivity service via the SDK.
- Automatically read the principal ID from the `user_name` claim of the current JWT in [`ScpCfPrincipalFacade`](https://help.sap.com/doc/2656a317c96d481b9216b8882f1eadad/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/security/principal/ScpCfPrincipalFacade.html) when the JWT has the `user_token` grant type.
- Update dependencies on Jackson from `2.9.9`/`2.9.9.2` to `2.9.10`.
- Verify that the Maven `artifactId` does not contain an underscore character when creating a project using the `scp-cf-spring` and `scp-cf-tomee` archetypes. This is necessary as the artifact ID will also be used as Cloud Foundry application name and the deployment to Cloud Foundry will fail if the application name contains an underscore.


## 3.4.0

- Release date: September 26, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/d17b8bdb22f84c7eb7924408abeea492/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/09/26/new-versions-of-sap-cloud-sdk-3.4.0-for-java-1.10.0-for-javascript-and-v24-of-continuous-delivery-toolkit/

### Compatibility Notes

- In preparation for an upcoming change to the way how the XSUAA service supplies verification keys to applications, the SAP Cloud SDK from version 3.4.0 onwards retrieves the key from the XSUAA service instead of relying on a verification key present in the XSUAA service binding credentials.
- Remove dependency `rest-assured` from the [`sdk-bom`](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom/3.4.0/pom). Projects that depends on it must now declare a version explicitly. This also removes the need to explicitly declare a version of `hamcrest-core` and `hamcrest-library` since they were previously both introduced as transitive dependencies via `jUnit` and `rest-assured` but had conflicting versions.

### Improvements

- Validate user access tokens issued by XSUAA with the verification key retrieved from the XSUAA service, instead of relying on a verification key present in the XSUAA service binding credentials. The retrieved key is cached for 5 minutes (depending on feedback, the cache duration may change in the future).
- Support `SystemUser` property in destinations with authentication type "OAuth2SAMLBearerAssertion". The system user will be used instead of the currently logged in principal to retrieve an access token to the destination. That is, no principal propagation takes place. As a consequence, no user JWT is required.


## 3.3.1

- Release date: September 12, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/6599292dcb7243bc95071d9d1757a30f/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/09/12/new-versions-of-sap-cloud-sdk-3.3.1-for-java-and-1.9.0-for-javascript/

### Compatibility Notes

- The OData VDM Generator now constructs the service URL based on the service name from the namespace provided in the metadata file. The previously used filename is only considered as the service name in case the namespace does not not provide the information.

### Improvements

- _OData VDM Generator_: use the service name from the namespace provided in the metadata file to construct the service name part of the OData request URL. Fall back to the filename of the metadata file as the service name only if the namespace information is not available.
- Update dependency to Java libraries of [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) (`com.sap.cloud.servicesdk.*`) from version 1.32.5 to 1.33.0.
- Remove `listeners-all` dependencies from projects generated via archetypes since the SAP Cloud SDK Pipeline will inject this dependency during a pipeline run.


## 3.2.0

- Release date: August 29, 2019
- JavaDoc: https://help.sap.com/http.svc/rc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html
- Release blog: https://blogs.sap.com/2019/08/29/new-versions-of-sap-cloud-sdk-3.2.0-for-java-1.8.1-for-javascript-and-v23-of-continuous-delivery-toolkit/

### Compatibility Notes

- The following methods in the resilience module have been deprecated in favor of the new methods introduced for asynchronous resilient execution: `decorateFutureSupplier` and `executeFutureSupplier` in [`ResilienceDecorator`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html), `decorateFutureSupplier` and `executeFutureSupplier` in [`ResilienceDecorationStrategy`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorationStrategy.html).
- _OData VDM_: we have added deprecation information to service classes that represent SAP S/4HANA Cloud APIs which are deprecated on the SAP API Business Hub, such as `ChangeMasterService`, `ProcessOrderConfirmationService`, and `ProductionOrderConfirmationService`. Take a look at the corresponding Javadoc and use the appropriate successor service listed therein.

### New Functionality

- Execute code asynchronously while making it resilient, using the new methods [`queueCallable`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html#queueCallable-java.util.concurrent.Callable-com.sap.cloud.sdk.cloudplatform.resilience.ResilienceConfiguration-) and [`queueSupplier`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html#queueSupplier-java.util.function.Supplier-com.sap.cloud.sdk.cloudplatform.resilience.ResilienceConfiguration-) of [`ResilienceDecorator`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorator.html) that return instances of `CompletableFuture`. Corresponding methods are also available from [`ResilienceDecorationStrategy`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/resilience/ResilienceDecorationStrategy.html).

### Improvements

- _OData VDM Generator_: add deprecation information contained in the provided Swagger file of a service to generated service classes.
- Update dependencies:
    - Java libraries of [SAP Cloud Application Programming Model](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/00823f91779d4d42aa29a498e0535cdf.html) (`com.sap.cloud.servicesdk.*`) from version 1.32.0 to 1.32.5
    - Caffeine from 2.7.0 to 2.8.0
    - Commons Codec from 1.12.0 to 1.13.0
    - CXF from 3.2.6 to 3.3.2
    - Resilience4J from 0.16.0 to 0.17.0
    - JUnit from 5.5.0-M1 to 5.5.1
    - AssertJ Core from 3.12.2 to 3.13.2
    - Joda Time from 2.10.2 to 2.10.3
- Reduce log verbosity of [`ThreadContextExecutor`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/thread/ThreadContextExecutor.html) and the accessor classes that use it (e.g. `execute...` methods in [`TenantAccessor`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/tenant/TenantAccessor.html)).

### Fixed Issues

- _OData VDM_: Fix an issue with function imports where special characters in query parameters, e.g. spaces, led to wrong URLs.
- Fix an issue with [`XsuaaService`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/cloudplatform/connectivity/XsuaaService.html) where it always forcibly used the provider tenant when calling `retrieveAccessToken...` methods. Now the methods retrieve access tokens for the tenant that called the method.
- Fix an issue with error handling in functions of [`MultichainService`](https://help.sap.com/doc/ef9bbec49d7d4c229d5e4e6295476572/1.0/en-US/index.html?com/sap/cloud/sdk/services/blockchain/multichain/service/MultichainService.html) so that it appropriately throws instances of `MultichainException`.
