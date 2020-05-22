---
id: proxy-js-sdk
title: Proxies in the Cloud SDK for JS
hide_title: false
hide_table_of_contents: false
sidebar_label: Proxies
description: This article describes how the SDK handles the different proxy options and how they are configured.
keywords:
- sap
- cloud
- sdk
- proxy
- JavaScript 
- TypeScript
- connectivity
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## Introduction ##

The Cloud SDK for JavaScript offers a convenient way for connection to various systems offering public APIs.
The most prominent one is of course the S/4 Hana which comes in two flavors Cloud and OnPremise. 
But there are also other systems like SuccessFactors, C4C, etc. where the SDK helps you with the connection.
This is done by generating a data model or client based on the service definition of the API. 
For S/4 Hana these clients are generated for every S/4 release and published to `https://npm.sap.com`.

Once you have the client you describe the desried call using the fluid API like:
```TypeScript
BusinessPartner.requestBuilder()
  .getAll().filter(BusinessPartner.BUSINESS_PARTNER_CATEGORY.equals('1'))
  .top(5)
  .execute(yourDestination);
```

and the SDK hides away many things from you. 
Under the hood it takes care of destination fetching, etag handling, serializing and deserializing of the request etc.. 
In this document we focus on the proxy and will explain how proxies are handled by the SDK.

## What kind of Proxies are there? ##

Before we get into the details it is important to have an overview on the different proxy types.
There are two possible types of proxies:
1. A local proxy running on the cloud platform used to connect to S/4 Hana OnPremise systems.
The proxy information like host and port are provided by the [connectivity service](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/daca64dacc6148fcb5c70ed86082ef91.html#loiodaca64dacc6148fcb5c70ed86082ef91__services).
This proxy will be referred to as `connectivity proxy`. 
2. A proxy running in some landscape used to make requests to the internet. 
This proxy will be referred to as `web proxy`. 

## Manual Configuration ##

In the `execute()` you can either give a object containing the destination name or you can configure a destination manually.
In productive use the manual configuration will not be useful, but for testing it might be valuable. 
The destination object contains a field `proxyConfiguration` in which you can configure a proxy.
```TypeScript
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
The SAP-Connectivity-Authentication header field contains the JWT issued for the user on application login and is mandatory if principal propagation is used i.e. identity propagation from the cloud application to the S/4 system.

## The Automatic Flow ##

For productive use you do not want to include specific proxy details in your code.
Here you should let the SDK handle everything.
In production you will provide the `.execute()` method with an destination name. 
This will trigger the destination lookup as described [here](destination.md).

The destination object contains a property `Proxy Type` which can have two valhes: `Internet` and `OnPremise`:

![](../../img/proxyTypeDestination.png)

if `OnPremise` is selected it is assumed that this destination points to an OnPremise S/4 Hana system.
In this case you need a cloud connector and the `connectivity proxy`. 
The SDK will request the proxy host and port from the connectivity service and make a request using this proxy.

If `Internet` is selected it is assumed that this destination points to something in the free intern and in most cases no proxy is needed.
However, if a proxy is needed no reach this destination it is configured in the following way.

The SDK considers the environment variables `HTTP_PROXY` and `HTTPS_PROXY`. 
The variable `HTTP_PROXY` is used for destinations using `http://` in their URL and `HTTPS_PROXY` for the ones using `https://`.
`https` is the default protocol if the protocol is not set in the URL field of the destination.

The value of the two proxy variables is just a simple string following this pattern:
```shell script
<protocol>://<user>:<password>?@<host>:<port>
``` 
The user and password are obviously optional and if they are left auth no authentication header is added.
The protocol is also optional and the default value is `http` since most proxies do not use encryption layer for communication.
The default for the port is `80` for `http` and `443` for `https`. An example of a valid values for the variable would be:
```shell script
http://John:SecurePassword@some.host.com:1234
https://some.host.com:1234 -> will use 443 as default
some.host.com:1234 -> will use http as default
some.host.com -> will use http and 80 as default
```

::::Note
If you use any special character in your username or password you need to encode them using [percent encoding](https://en.wikipedia.org/wiki/Percent-encoding)
::::

Since enviroment varialbes are a global setting, it might become necessary to exclude some destinations from using the proxy.
This is possible using the `NO_PROXY` environment variable.
The `NO_PROXY` variable contains a list of comma separated URL for which no proxy is used.
Currently now wild cards like `*` are supported in the list.
 

## A Word on the Used Libraries and Implementation Details ##

The SDK uses `axios` to execute http requests. 
In principle `axios` should support at least `web proxies` based on the environment variables. 
However we found that proxy URL were not correctly passed and for the `connectivity proxy` an entry point was necessary anyhow.

Hence, the SDK switches off the build in proxy handling by `axios` completely by using:
```json
{
    proxy: false
}
```
in the axios request config.
If a proxy becomes necessary or is asked the SDK builds the http or https-agent containing the proxy configuration as described above:
```json
{
  proxy: false,
  httpAgent: httpProxAgent || new http.Agent(),
  httpsAgent: httpsProxyAgent || new https.Agent()
}
``` 
The standard [http and https agents](https://www.npmjs.com/package/http-proxy-agent) are used.
 



