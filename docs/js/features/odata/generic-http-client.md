---
title: Generic Http Client
sidebar_label: Generic Http Client
keywords:
- sap
- cloud
- sdk
- odata
- http
- JavaScript
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## What is the Generic Http Client

In the [Executing a request using a generated OData client](./execute-odata-request.mdx) document we explained how to create OData requests using a generated OData client.
This client is the highest layer of convenience and safety for the user.
But there are two layers underneath: The generic http client and the Axios client.

<img alt="Destination in CF" src={useBaseUrl('img/odata-client-layers.png')} class="center" />

**OData Client:** Provides strong typing with respect to the request (payload,select,filter,...) and response. 
It taks care of deserializing your request to a URL and JSON payload as well as serializing the response.

**Generic Http Client:** Adds SAP infrastructure specific functionality on top of a standard Http Client.
The central aspect of this functionality is connectivity based on [destination lookup](../connectivity/destination.md) and [web proxy handling](../connectivity/proxy.md).
The two linked documents explain in great detail how the client fetches a destination  from a name and JWT and how it considers web proxies.
In the end all informations from the destination and proxy configuration end up in header-fields and [proxy-agents](https://www.npmjs.com/package/proxy-agent), which are passed one level down.

**Axios Http Client:**  Is a widely used open source [http client for node](https://www.npmjs.com/package/axios). 
This client execute the actual HTTP reuqest in the end.
 
So to quickly summerize the 
The central aspect is connectivity.
-destination (lookup,header see below)
-proxy
-headers (sap-client, SAP-Connectivity-SCC-Location_ID)
After you built your typesafe 

## When To Use it

## How To Use it

- mention headers.
