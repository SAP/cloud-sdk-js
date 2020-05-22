---
id: proxy-js-sdk
title: Proxies in the Cloud SDK for JS
hide_title: false
hide_table_of_contents: false
sidebar_label: Proxy
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
Under the hood it takes care of destination fetching, etag handling, serializing and deserializing the request etc.. 
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


:::Note switch off:::

## The Automatic Flow ##

