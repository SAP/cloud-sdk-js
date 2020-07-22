---
id: use-typed-odata-v2-and-v4-client-for-java
title: Typed client to consume OData Services for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Type-safe consumption of OData services
description: Use SAP Cloud SDK for Java to build and run OData requests in a type-safe way.
keywords:
- sap
- cloud
- sdk
- odata
- java
- VDM
- generate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Build and execute OData Requests with the typed OData client

The typed OData client allows to build type-safe OData requests for a given service. The java classes represent the _data model_ and the available _operations_ of the service. As a consequence all requests that are build through the typed OData client are not only _syntactically valid_ but also _semantically valid_.

## Using the Fluent API ##

The typed OData client consists of _service_ and _data model_ classes. The service classes mirror the API provided by the OData service and serve as entry point for creating requests. They provide a builder which allows for adding further parameters in a fluent way.

To execute HTTP requests the OData client leverages _Destinations_ and are documented in more detail [here](/cloud-sdk/docs/java/features/connectivity/sdk-connectivity-destination-service). The following code snippets assume that such a destination is in place:

```java
HttpDestination destination;
```

On an abstract level requests are generally build up according to the following pattern:

```java
result = service.operation()
    .withParameter(...)
    .execute(destination);
```

- _operation_ corresponds to the service's capabilities for entities e.g. `createEntity` or `readEntities`.
- _withParameter_ corresponds to:
    - OData query parameters e.g. `filter` or `orderby`
    - Or other modifiers like custom headers
- Which OData parameters are available depends on the operation. For example when updating entities the `$filter` parameter is not available.

Below different OData features are documented using the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER/resource) on S/4HANA as an example. It is represented by the `BusinessPartnerService` class which is part of the pre-generated S/4HANA Virtual Data Model (VDM). The following code snippets assume that an instance of this service is set up:

```java
BusinessPartnerService service = new DefaultBusinessPartnerService();
```

## OData Features ##

### Basic CRUD Operations ###

Create, Read, Update and Delete operations on entities are build from the associated service class:

```java
service.createBusinessPartner(partner);
service.getBusinessPartnerByKey("id");
service.getAllBusinessPartner();
service.updateBusinessPartner(partner);
service.deleteBusinessPartner(partner);
```

Each of the above statements returns a builder object that allows for specifying certain request parameters, depending on the operation.

The following query parameters and request options are available for these operations:

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

Query parameters:
- `$select`, `$expand` and `$search` are available on reading a single or multiple entities
- `$filter`, `$top`, `$skip` and `$orderby` are available only when reading a collection of entities

Request parameters:
- Update operations allow to set either `modifyingEntity()` or `replacingEntity()` which will result in `HTTP PATCH` or `HTTP PUT` respectively. By default entities are modified via `PATCH`.
- Update and delete operations allow to modify how ETags are handled:
   - By default an ETag is send if one is present on the entity being modified.
   - `matchAnyVersionIdentifier()` will instead always send a `*` which acts as a wildcard to match all ETags.
   - `ignoreAnyVersionIdentifier()` will ensure that no ETag is sent.
- All operations allow for adding custom headers via `withheader(...)`

</TabItem>
<TabItem value="v2">

Query parameters:
- `$select` and `$expand` are available on reading a single or multiple entities
- `$filter`, `$top`, `$skip` and `$orderby` are available only when reading a collection of entities

Request parameters:
- Update operations allow to set either `modifyingEntity()` or `replacingEntity()` which will result in `HTTP PATCH` or `HTTP PUT` respectively. By default entities are modified via `PATCH`.
- Update and delete operations allow to modify how ETags are handled:
   - By default an ETag is send if one is present on the entity being modified.
   - `ignoreAnyVersionIdentifier()` will instead always send a `*` which acts as a wildcard to match all ETags.
- All operations allow for adding custom headers via `withheader(...)`

</TabItem>
</Tabs>

#### Handling of ETags ####

An [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) is a version identifier which is often used to implement an optimistic locking mechanism. The SDK will try to read version identifiers from responses and set them when sending OData requests.

Consider the following example:

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

```java
partner = service.getBusinessPartnerByKey("id")
                 .execute(destination);
response = service.updateBusinessPartner(partner)
                 .execute(destination);
partner = response.getModifiedEntity();
```

</TabItem>
<TabItem value="v2">

```java
partner = service.getBusinessPartnerByKey("id")
                 .execute(destination);
service.updateBusinessPartner(partner)
                 .execute(destination);
```

</TabItem>
</Tabs>

On the read request the SDK will automatically try to extract the version identifier from the response and store it within the `partner` object. When updating it will be taken from there and sent with the `If-match` header.

:::note
If a service requires this header to be sent: Fetching the entity from the service first is essential to ensure that the ETag is present and up to date.
:::

#### Handling of CSRF tokens ####

For create, update and delete requests the SDK will try to send a [CSRF token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token). Upon execution the request will try to fetch a token first before issuing the actual create request. Many services require this behavior for security reasons. However, the create request will be made without a CSRF token if none could be obtained.

### Select ###

When reading entities the API offers `select( ... )` on the builders. Through it the query parameters `$select` and `$expand` are set. It takes in properties of the entity being queried. Primitive properties are added to `$select` while complex and navigational properties are added to `$expand`. This handling is done automatically by the SDK.

The properties that can be selected or expanded are represented via static _fields on the entity_ class. So there will be a field for each property. E.g. for the business partner entity one can find `BusinessPartner.FIRST_NAME` and `BusinessPartner.LAST_NAME`.

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>

<TabItem value="v4">

```java
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME, BusinessPartner.LAST_NAME, BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS)
    .execute(destination);
```

The above translates to the following query parameters:

```
$select=FirstName,LastName&$expand=to_BusinessPartnerAddress
```

OData v4 allows for formulating nested, fully featured queries on complex and navigational properties. Querying nested objects is possible within expand. That means the following query is possible:

```java
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS
        .select(BusinessPartnerAddress.CITY_CODE, BusinessPartnerAddress.COUNTRY)
        .filter(BusinessPartnerAddress.CITY_CODE.notEqualTo("1234"))
        .orderBy(BusinessPartnerAddress.COUNTRY.desc())
    )
    .execute(destination);
```

The above translates to the following `expand` query parameter:

```
$expand=to_BusinessPartnerAddress($select=CityCode,Country;$filter=CityCode eq '1234';$orderby=Country desc)
```

</TabItem>
<TabItem value="v2">

```java
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME, BusinessPartner.LAST_NAME, BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS)
    .execute(destination);
```

The above translates to the following query parameters:

```
$select=FirstName,LastName,to_BusinessPartnerAddress/*&$expand=to_BusinessPartnerAddress
```

One can also apply select again to the expanded object:

```java
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME,
        BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS
            .select(BusinessPartnerAddress.ADDRESS_ID,
                BusinessPartnerAddress.CITY_CODE))
    .execute(destination);
```

The above translates to the following query parameters:

```
$select=FirstName,to_BusinessPartnerAddress/AddressID,to_BusinessPartnerAddress/CityCode&$expand=to_BusinessPartnerAddress
```

</TabItem>
</Tabs>


### Filter ###

When operating on a collection of entities the API offers `filter( ... )` on the builders. It directly corresponds to the `$filter` parameter of the request. Filters are also build via the static property fields on entities.

The following example:

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

```java
/*
Get all business partners that either:
  - Have first name 'Alice' but not last name 'Bob'
  - Or have first name 'Mallory'
*/
service.getAllBusinessPartner()
    .filter(BusinessPartner.FIRST_NAME.equalTo("Alice")
        .and(BusinessPartner.LAST_NAME.notEqualTo("Bob"))
        .or(BusinessPartner.FIRST_NAME.equalTo("Mallory"))
    )
    .execute(destination);
```

</TabItem>
<TabItem value="v2">

```java
/*
Get all business partners that either:
  - Have first name 'Alice' but not last name 'Bob'
  - Or have first name 'Mallory'
*/
service.getAllBusinessPartner()
    .filter(BusinessPartner.FIRST_NAME.eq("Alice")
        .and(BusinessPartner.LAST_NAME.ne("Bob"))
        .or(BusinessPartner.FIRST_NAME.eq("Mallory"))
    )
    .execute(destination);
```

</TabItem>
</Tabs>

Will translate to this filter parameter:
```
$filter=(((FirstName eq 'Alice') and (LastName ne 'Bob')) or (FirstName eq 'Mallory'))
```

Take note of the order of `and` and `or`. As `or` is invoked on the result of `and` it will form the outer expression while `and` is an inner expression in the first branch of `or`.

To achieve a different order with `and` as the top level statement one would nest the `or` within `and(...)`:

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

```java
.and(BusinessPartner.LAST_NAME.notEqualTo("Bob")
    .or(BusinessPartner.FIRST_NAME.equalTo("Mallory"))
)
```
</TabItem>
<TabItem value="v2">
```java
.and(BusinessPartner.LAST_NAME.ne("Bob")
    .or(BusinessPartner.FIRST_NAME.eq("Mallory"))
)
```
</TabItem>
</Tabs>

#### Available Filter Expressions ####

<!-- TODO: Explain filters on complex types and navigational properties -->

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

The [OData v4 standard](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter) allows for a wide range of filter expressions. A detailed list of what is available in the SDK can be obtained from [the Javadoc](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/datamodel/odatav4/expression/package-summary.html). The functionality can also be discovered through the fluent API.

The below example leverages OData v4 exclusive features to build a more complex request:

```java
/*
Fetch all business partners where:
- the last name is at least twice as long as the first name
- AND the combined string of first and last name does not contain 'bob'
*/
service.getAllBusinessPartner()
    .filter(BusinessPartner.FIRST_NAME.length().multiply(2).lessThan(BusinessPartner.LAST_NAME.length())
        .and(BusinessPartner.FIRST_NAME.concat(BusinessPartner.LAST_NAME).contains("bob"))
    )
    .execute(destination);
```

</TabItem>
<TabItem value="v2">

The [OData v2 standard](https://www.odata.org/documentation/odata-version-2-0/uri-conventions/) allows for a limited range of filter expressions compared to OData v4. A detailed list of what is available in the SDK can be obtained from [the Javadoc](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/datamodel/odata/helper/package-summary.html). The functionality can also be discovered through the fluent API.

</TabItem>

</Tabs>

<!--
### Count ###

### Batch Requests ###

### Advanced OData Features ###

Function Imports / Functions & Actions

-->

## Error Handling

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

Sometimes requests fail and the SDK provides a flexible way to deal with such failures on multiple levels. All `execute` methods may throw a runtime exception (extending) `ODataException`. This will always contain the request which was (attempted to be) sent out as well as the cause of the exception. To handle all kind of failures consider the following code:

```java
try { ... }
 catch( final ODataException e ) {
    ODataQueryGeneric query = e.getQuery();
    logger.debug("The following query failed: {}", query);
    // do something else
}
```

This handling is the most generic, handling all possible failures. For more specific information there are dedicated exceptions inheriting from `ODataException`. Please tend to the [documentation](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/datamodel/odatav4/exception/ODataException.html) for all the exception types.

In order to handle different kinds of failure one can list multiple catch clauses to cover different levels or cases that might occur, e.g.:

```java
try { ... }
catch( ODataErrorResponseException e ) {
    // ...
} catch( ODataRequestException e ) {
    // ...
} catch( ODataDeserializationException e ) {
    // ...
}
```

Note that instead of applying `try/catch` one can also make use of `tryExecute` on the request builders.

</TabItem>
<TabItem value="v2">

Coming soon

</TabItem>
</Tabs>

## Navigation properties

A navigation property describes a unidirectional relationship between two entity types.
Like other properties it has a name and declares a multiplicity, i.e. whether to expect a single or multiple values.
Additionally a navigation property allows for dedicated CRUD operations, that may not be exposed by default on entity sets of the service root.
Such operations also provide a convenient way to access the nested resources of entities.   

<Tabs groupId="odataProtocol" defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>

<TabItem value="v2">

The typed OData client for OData v2 supports the following operations on (first-level only) navigation properties:
- Create

The below example leverages the creation of a nested entity in relation to an existing entity:

```java
/*
Create a new address for a specific business partner.
*/
BusinessPartner businessPartnerById = BusinessPartner.builder().businessPartner("123").build();
BusinessPartnerAddress addressItem = BusinessPartnerAddress.builder().country("DE").build();

service.createBusinessPartnerAddress( addressItem )
    .asChildOf( businessPartnerById, BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS )
    .execute( destination );
```

This sample API call translates to the following service request:
```
POST /ODataService/API_BUSINESS_PARTNER/A_BusinessPartner(123)/to_BusinessPartnerAddress
{
  "country": "de"
}
```

</TabItem>
<TabItem value="v4">

The typed OData client for OData v4 supports the following operations on (arbitrarily nested) navigation properties:
- Create
- Read
- Update
- Delete
- Count


The below example leverages the creation of a nested entity in relation to an existing entity:

```java
/*
Create a new address for a specific business partner.
*/
BusinessPartner businessPartnerById = BusinessPartner.builder().businessPartner("123").build();
BusinessPartnerAddress addressItem = BusinessPartnerAddress.builder().country("DE").build();

service.forEntity( businessPartnerById )
    .navigateTo( BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS )
    .create( addressItem )
    .execute( destination );
```

This sample API call translates to the following service request:
```
POST /ODataService/API_BUSINESS_PARTNER/A_BusinessPartner(123)/to_BusinessPartnerAddress
{
  "country": "de"
}
```

</TabItem>
</Tabs>
