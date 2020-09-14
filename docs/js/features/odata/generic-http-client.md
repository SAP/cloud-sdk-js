---
title: Generic HTTP Client
sidebar_label: Generic HTTP Client
description: How to use the generic http client for untyped  
keywords:
- sap
- cloud
- sdk
- odata
- HTTP
- JavaScript
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## What is the Generic HTTP Client?

In the [Executing a request using a generated OData client](./execute-odata-request.mdx) section, we explained how to make OData requests using the generated OData client.
This client is the highest layer of convenience and type-safety for the user.
Below the OData client uses the Generic HTTP client of the SDK.
For the final HTTP calls we have decided to use the Axios library.

<img alt="The layers of HTTP clients in the SDK." src={useBaseUrl('img/odata-client-layers.png')} class="center" width="50%"/>

In this document we explain when and how to use the middle layer directly.
The different clients serve different purposes:

**OData Client:** Provides strong typing with respect to the request (payload, select, filter, ...) and response. 
For each OData service, a separate client needs to be generated which defines the types and methods for this service.
The client takes care of deserializing your request to a URL and JSON payload as well as serializing the response.
The generated payload and URL are passed to the Generic HTTP Client.

**Generic HTTP Client:** Adds SAP infrastructure specific functionality on top of a standard HTTP Client.
All OData services use the same generic HTTP client, so it contains no service specific information.
The client handles connectivity related issues such as:
- [destination lookup](../connectivity/destination.md) 
- Connections to [On-Premise](../connectivity/on-premise.md)  system via the connectivity service 
- [web proxies](../connectivity/proxy.md).

In the end, all information from the destination, connectivity service and proxy configuration ends up in header-fields and [proxy-agents](https://www.npmjs.com/package/proxy-agent).
The information goes one level down to the Axios client.

**Axios HTTP Client:**  Is a widely used open source [HTTP client for node](https://www.npmjs.com/package/axios). 
This client executes the actual HTTP requests in the end.
 
## How to use it

To make a request using the Generic HTTP client use the `executeHttpRequest` function.

```ts
executeHttpRequest(destination, requestConfig)
```

The `destination` argument is either a full destination object you have already fetched or an object containing a destination name and JWT.
In the latter case the SDK [fetches the destination](../connectivity/destination.md) for you.
The [request config](pathname:///api/1.28.1/interfaces/sap_cloud_sdk_core.httprequestconfig) argument contains the request configuration. 
A minimal config would look like this:
```JSON
{
     method: 'get',
     params: {
          a: 'a',
          b: 'b'
     },
    ...
}
```

Note that you can also give values for `url` in the request config. 
The values you give in the request config [will be merged](https://github.com/SAP/cloud-sdk/blob/master/packages/core/src/http-client/http-client.ts#L136-L148) with ones related to the destination:
```ts
{
  ...destinationRequestConfig,
  ...customRequestConfig,
  headers: {
   ...destinationRequestConfig.headers,
   ...customRequestConfig.headers
}
```
For keys which exist for both object the value from the custom requestion config will be used.
For example, a request config with `authorization` headers will overwrite the authorization header information from the destination.

## When to use it

You should consider the Generic HTTP client if:
- you need to use an unsupported feature by the typed OData Client like `upsert` for example. 
With this you can profit from the aforementioned convenience in connectivity.
- you only want to ping a service or trigger a function import without a complicated payload. 
In such a case the size of a full data model of the typed client is perhaps not worth the benefits. 
- you want to call a non OData service which has no service definition.

You should consider the OData client if:
- you have to build complicated filter, selection and/or expand conditions. 
Here you will highly benefit from the help of the OData client.
- you want to update or create new entities. 
The OData Client has built-in `ETag` versions handling and takes also care of `CSRF` token fetching for you. 
With the generic client you have to mange versions and tokens on your own.
