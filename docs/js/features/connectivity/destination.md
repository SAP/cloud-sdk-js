---
id: destination-js-sdk
title: Destinations in the SAP Cloud SDK for JavaScript / TypeScript
hide_title: false
hide_table_of_contents: false
sidebar_label: Destinations
description: This article describes how destinations are fetched in the SDK and how they can be configured.
keywords:
- sap
- cloud
- sdk
- destination
- connectivity
- JavaScript
- TypeScript
---

## Introduction ##

Most applications developed on SAP Cloud Platform (SCP) will integrate in some way with other LoB solutions and systems.
Integration means the exchange of data and it is necessary to abstract the details on the data exchange from your code base.
The reasons for this abstraction are manifold: URLs defining a resource may change, authentication information should not be part of code, in case of a multi customer application the locations depends on the customer, etc.

On SCP this abstraction is provided by a so called destination object.
This object can be obtained at runtime of the application and contains information like:
- URL
- Authentication
- Proxy Settings (see the [proxy documentation](./proxy.md) for more details)
- ...

The SAP Cloud SDK helps you receiving this object and provides also options for local testing outside the SCP.

The SDK provides a generator to create a client or data model based on a service definition.
For S/4HANA this client has been created and published to npm.
In this [tutorial series](https://developers.sap.com/group.s4sdk-js-cloud-foundry.html) a detailed step-by-step guide how to use the data model is presented.
A simple request to receive some business-partners from an S/4 HANA system would look like:
```js
BusinessPartner.requestBuilder()
  .getAll().filter(BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1'))
  .top(5)
  .execute(yourDestination);
```
where `yourDestination` is a [`Destination` object](pathname:///api/1.21.0/interfaces/sap_cloud_sdk_core.destination).
In principle, you could create a destination object yourself or read it from somewhere and then pass it to the `execute()` method.
However, this would not be very flexible and convenient as discussed above.
The SDK provides some help for this problem.
If just a destinationName is provided i.e.:
```js
.execute({"destinationName": 'myDestination'})
```
the SDK tries to look the destination up for you.
The details on this process are explained in the next chapters.

## The Lookup Flow ##

When given a `destinationName` the SDK tries three things to find a destination:
1. Checking local environment variables
2. Checking a service instance
3. Using the destination service

Once a destination is found, the flow is stopped and the destination is returned.
So local env beats service instance beats destination service in case all contain a destination with the given name.

### Local Environment Variable ###

This option is present for deployment and testing in a local environment outside the SCP where no destination services are available.
The SDK provides a `mockDestinationsEnv(...destinations)` method which takes a list of destination objects, transforms it to a JSON array and assigns it to the `process.env.destinations`.
At runtime, the SDK will check whether a destination with the given is present and use it, if it is.
If a destination with the same name as the one given as `destinationName` is found it is taken for example:
```js
mockDestinationsEnv({
  authTokens: [],
  authentication: 'NoAuthentication',
  name: 'TESTINATION',
  isTrustingAllCertificates: false,
  url: 'https://mys4hana.com'
})
```
would set a destination with name `TESTINATION`.

### Service Instance ###

It is possible that the service credentials in other words `VCAP_SERVICES` environment variables contain a destination.
If you want to use this information the name of the service instance must be provided as destination name.
Currently two services types are supported out of the box `business-logging` and `s4-hana-cloud` with the following transformation functions:
```js
//business-logging
(serviceBinding) => {
    url: serviceBinding.credentials.writeUrl,
    authentication: 'OAuth2ClientCredentials',
    username: serviceBinding.credentials.uaa.clientid,
    password: serviceBinding.credentials.uaa.clientsecret
};

//s4-hana-cloud
(serviceBinding) => {
    url: serviceBinding.credentials.URL,
    authentication: 'BasicAuthentication',
    username: serviceBinding.credentials.User,
    password: serviceBinding.credentials.Password
};
```

### Destination Service ###

This is the normal case in a productive environment.
In order to access the destination service, the SDK will first fetch an access token from the XSUAA service.
This token is used to make a call to the destination service returning the destinations.
For a simple service this would be the end of the story.
However, the destination service is special in a way that it is a `tenant aware serive`.
Such services make it possible to build multi tenant applications.
So what defines a tenant aware service?

Assume you want to build a simple application showing the 5 newest business-partner in an S/4 system.
You want to offer this application as a service to customers.
Of course you want to make this service cost efficient and host it only once and let multiple customers use it.
This leads now naturally to the requirement that your service needs to return the data related to the specific customers.
A customer is represented by an account on SCP and a service considering the account is a `tenant aware service`.

Tenant aware services on SCP are offered to customers via an `subscription` which works on a high level as follows:
If a customer wants to use a service, a subscription is created linking the customer account and the one account hosting the service.
In the following the term `subscriber account` will be used for the accounts using a service and `provider account` for the one hosting it.

After this little definition detour, let's go back to the destination service and the SDK.
For simplicity an optional argument of the destination lookup has been neglected in the beginning:
```js
.execute({destinationName: 'myDestination', jwt: 'yourJWT'})
```
The `jwt` argument takes the JSON web token (JWT) issued by an XSUAA as input.
This token contains a field `zid` holding the tenant id which will be used in the lookup process.
The lookup process done by the SDK involves the following steps:
- Request an access token for the destination service and a given tenant id from the XSUAA.
- Due to the subscription between provider and subscriber, the XSUAA is allowed to issue the token.
- The token allows for calling the destination service on behalf of the given tenant.
The tenant and service information are encoded in the access token.
- Make a call to the destination service using the obtained access token.
- The destination maintained in the given tenant are returned.

If no token is given or the destination is not found in the subscriber account the provider account is used as a fallback.
In order to control this fallback behaviour a selection strategy can be passed to the destination lookup:
```js
.execute({destinationName: 'myDestination', jwt: 'yourJWT'},{selectionStrategy:'alwaysSubscriber'})
```
There are three selection strategies defined in the SDK: `alwaysSubscriber`, `alwaysProvider` and `subscriberFirst`.
The selection strategy can be passed as an optional argument to the `.execute()` method.
The default value is `subscriberFirst`.
The selection strategies can be used to control for which account a destination lookup is attempted:
- alwaysSubscriber: Only try to get destinations from the subscriber account.
A valid JWT is mandatory to receive something.
- alwaysProvider: Only try to get destination from the provider account.
A JWT is not needed.
Even if you present a subscriber JWT the provider destination will be returned if present.
- subscriberFirst: Tries to get from the subscriber first using the JWT.
If no valid JWT is provided or the destination is not found it tries the provider as described for alwaysProvider.

:::note
One aspect has been left out for simplicity.
In principle it is possible to define destinations not only on the account level but also on the destination service level.
These destinations are called `instance destinations` since they are tied to an service binding called instance on SCP.
In every request these destinations are added to the destinations returned by the destination service.
:::


