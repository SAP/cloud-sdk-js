---
id: use-generated-odata-vdm-v2-v4
title: Use the VDM to consume OData Services
hide_title: false
hide_table_of_contents: false
sidebar_label: Consume OData Services
description: This article describes how the SAP Cloud SDK for Java can be used to build and run OData requests.
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

# Build and execute OData Requests with the Virtual Data Model #

The Virtual Data Model (VDM) allows to build type-safe OData requests for a given service. The java classes represent the _data model_ and the available _operations_ of the service. As a consequence all requests that are build through the VDM are not only _syntactically valid_ but also _semantically valid_.

## Using the Fluent API ##

The VDM consistes of _service_ and _data model_ classes. The service classes mirror the API provided by the OData service and serve as entry point for creating requests. They provide a builder which allows for adding further parameters in a fluent way.

To execute HTTP requests the OData client leverages _Destinations_ and are documented in more detail [here](/docs/java/features/connectivity). The following code snippits assume that such a destination is in place:

```JAVA
HttpDestination destination;
```

On an abstract level requests are generally build up according to the following pattern:

```JAVA
result = service.operation()
    .withParameter(...)
    .execute(destination);
```

- _operation_ corresponds to the service's capabilities for entities e.g. `createEntity` or `readEntities`.
- _withParameter_ corresponds to:
    - OData query parameters e.g. `filter` or `orderby`
    - Or other modifiers like custom headers
- Which OData parameters are available depends on the operation. For example when updating entities the `$filter` parameter is not available.

Below different OData features are documented using the [Business Partner Service](https://api.sap.com/api/API_BUSINESS_PARTNER/resource) on S/4HANA as an example. It is represented by the `BusinessPartnerService` class which is part of the pre-generated S/4HANA VDM. The following code snippits assume that an instance of this service is setup:

```JAVA
BusinessPartnerService service = new DefaultBusinessPartnerService();
```

## OData Features ##

### Basic CRUD Operations ###

Create, Read, Update and Delete operations on entities are build from the associated service class:

```JAVA
service.createBusinessPartner(partner);
service.getBusinessPartnerByKey("id");
service.getAllBusinessPartner();
service.updateBusinessPartner(partner);
service.deleteBusinessPartner(partner);
```

Each of the above statements returns a builder object that allows for specifying certain request parameters, depending on the operation.

The following query parameters and request options are available for these operations:

<Tabs defaultValue="v4" values={[
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
```JAVA
partner = service.getBusinessPartnerByKey("id")
                 .execute(destination);
service.updateBusinessPartner(partner)
                 .execute(destination);
```

On the read request the SDK will automatically try to extract the version identifier from the response and store it within the `partner` object. When updating it will be taken from there and sent with the `If-match` header.

:::note
If a service requires this header to be sent: Fetching the entity from the service first is essential to ensure that the ETag is present and up to date.
:::

#### Handling of CSRF tokens ####

For create, update and delete requests the SDK will try to send a [CSRF token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token). Upon execution the request will try to fetch a token first before issuing the actual create request. Many services require this behaviour for security reasons. However, the create request will be made without a CSRF token if none could be obtained.

### Select ###

<Tabs defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

```JAVA
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME)
    .filter(BusinessPartner.FIRST_NAME.substring("substr"))
    .execute(destination);
```

</TabItem>
<TabItem value="v2">

```JAVA
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME)
    .filter(BusinessPartner.FIRST_NAME.ne("substr"))
    .execute(destination);
```

</TabItem>
</Tabs>


### Filter ###

<Tabs defaultValue="v4" values={[
{ label: 'OData V2', value: 'v2', },
{ label: 'OData V4', value: 'v4', }]}>
<TabItem value="v4">

```JAVA
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME)
    .filter(BusinessPartner.FIRST_NAME.substring("substr"))
    .execute(destination);
```

</TabItem>
<TabItem value="v2">

```JAVA
service.getBusinessPartnerByKey("id")
    .select(BusinessPartner.FIRST_NAME)
    .filter(BusinessPartner.FIRST_NAME.ne("substr"))
    .execute(destination);
```

</TabItem>
</Tabs>

### Update ###

```JAVA
service.updateBusinessPartner(partner)
    .replacingEntity()
    .execute(destination);
```

### Delete ###

```JAVA
service.deleteBusinessPartner(partner)
    .execute(destination);
```

<!--
## Error Handling

```Java
private static final HttpDestination destination = DefaultHttpDestination.builder("https://my.service.url").build();
private static final MyService service = new DefaultMyService().withServicePath("/my/base/path");

@Test
public void testGetAll() {
    service.getAllItem()
            .select(Item.ID,
                    Item.DESCRIPTION,
                    Item.TO_SUB_ITEMS
                            .select(SubItem.DESCRIPTION))
            .filter(Item.ID.lessThan(10), Item.DESCRIPTION.length().greaterThan(20))
            .top(5)
            .skip(5)
            .execute(destination);
}
```

### Using OData v4 features in queries

The VDM offers a fluent API so you can discover the service API through the VDM.

Below are a few more examples that were build for one of the [OData reference services](https://www.odata.org/odata-services/).

Assuming that `destination` points towards the `TripPin` reference service the following requests could be performed:
* To fetch all Persons:
  ```java
  final List<Persons> persons = new DefaultPersonService().getPersons().execute(destination);
  ```
* To fetch a paticular person by key:
    ```java
    final Person person = new DefaultPersonService().getPersonsByKey("userName").execute(destination);
    ```
* Using `select` and `filter` query options:
    ```java
    final List<Persons> personList = new DefaultPersonService()
        .getPersons()
        .select(Person.GENDER, Person.USER_NAME)
        .select(Person.TRIPS.select(Trip.NAME),
            Person.FRIENDS.top(2).skip(1))
        .filter(Person.EMAILS.contains(Collections.singletonList("ASD")))
        .execute(destination);
    ```
  The above query also shows how to perform nested operations on navigation properties `Person.TRIPS` and `Person.FRIENDS`.
  This is a new functionality introduced as part of supporting OData v4. In addition we aslo see new type-sensitive filter expressions on entity fields.

### Handling and debugging failures

Sometimes requests fail and the SDK provides a flexible way to deal with such failures on multiple levels. All `execute` methods may throw a runtime exception (extending) `ODataException`. This will always contain the request which was (attempted to be) sent out as well as the cause of the exception. To handle all kind of failures consider the following code:

```java
try { ... }
 catch( final ODataException e ) {
    logger.error("Failed to execute OData query.", e);
    ODataQueryGeneric query = e.getQuery();
    logger.debug("The following query failed: {}", query);
    // do something else
}
```

This handling is very generic and does not really give a lot of information, except for the request that was (to be) sent out. For more specific information there are dedicated exceptions. Please tend to the documentation of `ODataException` for all the exception types. The following code presents one example which deals with the case that the OData service responded with an HTTP status code indicating an error:

 ```java
try { ... }
catch( final ODataServiceException e ) {
    // ODataQueryGeneric query = e.getQuery();
    int httpCode = e.getHttpCode();
    Header[] httpHeaders = e.getHttpHeaders():
    // react based on the response code
 }
 ```

Finally, the OData service might also include an OData error in the payload of the response:

```java
    try { ... }
    catch( ODataErrorResponseException e ) {
      // ODataQueryGeneric query = e.getQuery();
      // int httpCode = e.getHttpCode();
      // Header[] httpHeaders = e.getHttpHeaders():
      String oDataCode = e.getError().getODataCode();
      String oDataMessage = e.getError().getODataMessage();
      String target = e.getError().getTarget();
      List<ODataServiceError> details = e.getError().getDetails();
      Map<String, Object> innerError = e.getError().getInnerError();
    }
```

You can also list multiple catch clauses to cover different levels or cases that might occur, e.g.:

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

Note that instead of applying `try/catch` you can also make use of `tryExecute` on the request builders.


## The following features are not yet supported in the implementation of the OData v4 standard:
* Error handling for failed OData requests
* Complex Type properties are not available in query builders
* Order By parameter must be set manually
* Functions & Actions are both unavailable
* Batch Requests are not available
* Media entities are not available
* Stream properties are not available

-->