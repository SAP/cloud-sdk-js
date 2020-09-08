---
id: proxy-js-sdk
title: Proxies in the SAP Cloud SDK for JavaScript / TypeScript
hide_title: false
hide_table_of_contents: false
sidebar_label: Proxies
description: This article describes how the SDK handles the different proxy options and how they are configured.
keywords:
- sap
- cloud
- sdk
- proxy
- connectivity
- JavaScript
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## Introduction ##

The Cloud SDK for JavaScript offers a convenient way to connect to various systems offering public APIs. The most famous one is S/4HANA which comes in two flavors Cloud and OnPremise. We pre-generate type-safe clients for S/4HANA APIs and publish them to [NPM](https://www.npmjs.com/search?q=%40sap%2Fcloud-sdk-vdm-*) for your convenience.

For different systems like SuccessFactors, C4C, and many others you can generate a type-safe client yourself. All you have to do it look up an API definition on [SAP API BusinessHub](https://api.sap.com/) and invoke a [generator](../odata/generate-typed-odata-v2-and-v4-client-for-javascript-and-typescript) supplied with [SAP Cloud SDK for JavaScript](https://github.com/SAP/cloud-sdk). This [comprehensive tutorial](https://developers.sap.com/tutorials/cloudsdk-js-generator.html) and will guide you through this process step by step.

## Making a first API call ##

Once you have generated a type-safe client, this is how you make your first API call. This example uses **BusinessPartner** service from the S/4HANA suit.

```js
BusinessPartner.requestBuilder()
  .getAll().filter(BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1'))
  .top(5)
  .execute(yourDestination);
```

SDK does a lot of heavy lifting under the hood to take care of complexity so that you can fully concentrate on your App's logic. A detailed step by step guide on using a type-safe client is provided in this [tutorial series](https://developers.sap.com/group.s4sdk-js-cloud-foundry.html).

**To name a few things handled by Cloud SDK for JavaScript:**

- destination fetching
- handling of ETag
- handling of CSRF token
- serializing and deserializing of the request
- and more...

In this document, we focus on the **proxy** part and explain how proxies are handled by the SDK.

## What kind of Proxies are there? ##

Before we get into the details it is important to have an overview of the different proxy types.
There are two possible types of proxies:
1. A local proxy running on the cloud platform used to connect to S/4 HANA OnPremise systems.
The proxy information like host and port are provided by the [connectivity service](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/daca64dacc6148fcb5c70ed86082ef91.html#loiodaca64dacc6148fcb5c70ed86082ef91__services).
This proxy will be referred to as `connectivity proxy`.
2. A proxy running in some landscape used to make requests to the internet.
This proxy will be referred to as `web proxy`.

## Manual Configuration ##

In the `execute()` you can either give an object containing the destination name or you can configure the full destination manually.
If you provide the destination name the SDK will try to lookup as described [here](destination.md).

In productive use, the manual configuration will not be useful, but for testing, it might be valuable.
The destination object contains a field `proxyConfiguration` in which you can configure a proxy.

```js
{
url: "https://MyDestinationURL.com"
proxyConfiguration?: {
  host:"my.proxy.host.com"
  port:123
  protocol:"http"
  headers?: {
      Proxy-Authorization: 'yourAuthHeader could be basic or some bearer token'
      SAP-Connectivity-Authentication?: ''
    };,
  }
}
```

The `SAP-Connectivity-Authentication` field contains the `JWT` issued for the user on application login. This is mandatory if principal propagation is used i.e. identity propagation from the cloud application to the S/4HANA system.

## The Automatic Flow ##

For productive use, you do not want to include a specific proxy configuration in your code.
Here you should let the SDK handle everything.
Hence, you will provide in the `.execute()` method only the destination name.
This will trigger the destination lookup as described [here](destination-js-sdk).

The result of the lookup is a destination object which contains a property `Proxy Type`.
This property can have two values: `Internet` and `OnPremise`:

<img alt="Destination in CF" src={useBaseUrl('img/proxyTypeDestination.png')} />

if `OnPremise` is selected it is assumed that this destination points to an OnPremise S/4 HANA system.
In this case, you need the `connectivity proxy`.
The SDK will request the proxy host and port from the connectivity service and make a request using this proxy.
From there the request will pass via the **SAP Cloud Connector** to the S/4HANA On-Premise system.

If `Internet` is selected it is assumed that this destination points to something on the Internet and in most cases, no proxy is needed.
However, if a proxy is needed to reach this destination it is configured in the following way.

The SDK considers the environment variables `HTTP_PROXY` and `HTTPS_PROXY`.
The variable `HTTP_PROXY` is used for destinations using `http://` in their URL and `HTTPS_PROXY` for the ones using `https://`.
`https` is the default protocol if the protocol is not set in the URL field of the destination.

The value of the two proxy variables is just a simple string following this pattern:
```
<protocol>://<user>:<password>?@<host>:<port>
```
The user and password are optional and if they are left out no authentication header is added.
The protocol is also optional and the default value is `http` since most proxies do not use an encryption layer for communication.
The default for the port is `80` for `http` and `443` for `https`. Example of a valid values would be:
```bash script
http://John:SecurePassword@some.host.com:1234
https://some.host.com:1234 -> will use 443 as default
some.host.com:1234 -> will use http as default
some.host.com -> will use http and 80 as default
```

:::note
If you use any special character in your username or password you need to encode them using [percent encoding](https://en.wikipedia.org/wiki/Percent-encoding)
:::

Since environment variables are a global setting, it might become necessary to exclude some destinations from using the proxy.
This is possible using the `NO_PROXY` environment variable.
The `NO_PROXY` variable contains a list of comma-separated URLs for which no proxy is used.
Currently, wild cards like `*` are supported in the list.

## A Word on the Used Libraries and Implementation Details ##

The SDK uses `axios` to execute http requests.
In principle `axios` should support  `web proxies` based on the environment variables.
However, we found that request URL using a proxy was not correctly constructed and for the `connectivity proxy` an entry point was necessary anyhow.

Hence, the SDK switches off the build-in proxy handling by `axios` completely by using:

```json
{
    proxy: false
}

```
in the `axios` request config.
If a proxy becomes necessary or is configured by the discussed environment variables the SDK builds directly the http or https-agent:

```json
{
  proxy: false,
  httpAgent: httpProxAgent || new http.Agent(),
  httpsAgent: httpsProxyAgent || new https.Agent()
}

```
and adds them to the axios config. The agents contain the proxy configuration.
The standard [http and https agents](https://www.npmjs.com/package/http-proxy-agent) are used.
