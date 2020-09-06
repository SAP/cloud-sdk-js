---
id: odata-v4-client
title: Use the OData v4 client for JavaScript / TypeScript
sidebar_label: Typed OData v4 client
description: Use the SAP Cloud SDK for JavaScript to build and run OData v4 requests in a type-safe way.
keywords:
- sap
- cloud
- sdk
- odata
- JavaScript
- TypeScript
- consume
---

:::danger OData v4 is experimental and not ready for production
Typed client for OData v4 is under heavy development and was released only as `experimental/Beta`. Please, use it on you own discretion. We'll explicitly communicate in the release notes when it's stable and general availability.
:::

## Making a request using a generated OData v4 client

Be patient, we are working on it.

### Filter

##### Filter on One-To-Many Navigation Properties

OData V4 introduces the [lambda operators](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part2-url-conventions.html#sec_LambdaOperators) e.g., `any`/`all`, so that the root property of the one-to-many navigation properties can be filtered. Below is an example that demonstrates how to use the lambda operator [any](/cloud-sdk/api/1.28.0/modules/sap_cloud_sdk_core#any)).

```ts
/*
  Get all people that have at least one friend that matches all the following conditions:
    - Has first name 'firstName'
    - Has last name 'lastName'
*/
.filter(
  any(
    People.FRIENDS.filter(
      People.FIRST_NAME.equals('firstName'),
      People.LAST_NAME.equals('lastName')
    )
  )
)
```
The `$filter`parameter of the URL will be generated like below:
```sql
$filter=(/any(a0:((a0/Friends/FirstName eq 'firstName' and a0/Friends/LastName eq 'lastName'))))
```
