---
id: destination-js-sdk
title: Destinations in the Cloud SDK for JS
hide_title: false
hide_table_of_contents: false
sidebar_label: Destinations
description: This article describes how the SDK handles the destination lookup and what the different options to configure destinations are.
keywords:
- sap
- cloud
- sdk
- destination
- connectivity
- JavaScript 
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## Introduction ##

When developing cloud applications it is necessary to abstract the details where something is retrieved from your code base.
The reasons for this abstraction are manifold: URLs defining a resource may change, in case of a multi customer application the locations depends on the customer, etc..

On SAP Cloud Platform (SCP) this abstraction is provided by a so called destination object. 
This object can be obtained at runtime of the application and contains information like:
- URL
- Authentication
- Proxy Settings (see the [proxy documentation](./proxy.md) for more details)   
...
The Cloud SDK helps you receiving this object and provides also options for local testing outside the SCP.

The SDK provides a generator to create a client or data model based on a service definition.
For S/4 HANA this client has been created and published to npm. 
In this [tutorial series](https://developers.sap.com/group.s4sdk-js-cloud-foundry.html) a detailed step-by-step guide how to use the data model is presented.
A simple request to receive some business-partners from an S/4 HANA system would look like:
```TypeScript
BusinessPartner.requestBuilder()
  .getAll().filter(BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1'))
  .top(5)
  .execute(yourDestination);
```
where `yourDestination` is a [`Destination` object](https://sap.github.io/cloud-sdk/api/1.21.0/interfaces/sap_cloud_sdk_core.destination).
In principle you could create a destination object or read it from somewhere and then pass it to the `execute()` method.
However, this would not be very flexible and convenient as discussed above.
The SDK provides some help for this problem. 
If just a destinationName is provided i.e.:
```
.execute({"destinationName": 'myDestination'})
```
the SDK tries to look the destination up for you.
The details on this process are explained in the next chapters.

## The Lookup Flow ##

When given a destinationName the SDK tries three things to find a destination:
1. Checking local environment variables
2. Checking a service instance
3. Using the destination service

Once a destination is found, the flow is stopped and the destination is returned. 
So local env beats service instance beats destination service in case all contain a destination with the given name.

### Local Environment Variable ###

This options is present for deployment and testing in an local environment outside the SCP where no destination services are available.
The SDK provides a `mockDestinationsEnv(...destinations)` method which takes a list of destination objects, transforms it to a JSON array and assigns it to the `process.env.destinations`.
From there they are read in at runtime and found by the request executor.
If a destination with the same name as the one given as `destinationName` is found it is taken for example:
```
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
```
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
The SDK will get an access token from the XSUAA. 
This token is used to make a call to the destination service returning the destinations.
Up to now, we have not discussed which destination are returned by the service.

Depending on the access token issued by the XSUAA this can be either a destination from the provider or subscriber account.
We define an subscriber account as one using an application hosted within a provider account. 
In this document we can not explain all details on multi-tenant applications.
Assume a simple example of an application showing the 5 newes business-partner in an S/4 system.
Of course every subscriber/customer will have its own S/4 system and a destination with a defined name is maintained in their account to pointing to that system.

At runtime the application has to lookup the right destination which is the one related to the subscriber account the request is coming from.
The question is now, how does the service return the right destination?

For simplicity an optional argument of the destination lookup has been neglected in the beginning:
```
.execute({"destinationName": 'myDestination', jwt: 'yourJWT})
```  
The `jwt` argument takes the JSON web token (JWT) issued by an XSUAA as an input.  
If the JWT was issued by a XSUAA of a subscriber account it is possible to fetch the destination of this account.
For fetching destinations of the provider accounts no JWT is needed because the application has a service binding to the destination service instance. 

There are three selection strategies defined in the SDK: `alwaysSubscriber`, `alwaysProvider` and `subscriberFirst`.
The selection strategy can be passed as an optional option to the `.execute()` method. 
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

 
